import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { auth } from '../config/firebase';

export interface AnalysisHistory {
  id: string;
  image: string;
  prediction: string;
  confidence: number;
  extractedText?: string;
  date: string;
  time: string;
  userId?: string;
}

// Helper function to compress base64 images to under 1MB
const compressImage = async (base64String: string, maxSizeKB: number = 800): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Calculate new dimensions to keep aspect ratio
      let width = img.width;
      let height = img.height;
      const maxDimension = 1200; // Max width or height
      
      if (width > height) {
        if (width > maxDimension) {
          height = (height * maxDimension) / width;
          width = maxDimension;
        }
      } else {
        if (height > maxDimension) {
          width = (width * maxDimension) / height;
          height = maxDimension;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Start with quality 0.8 and reduce if needed
      let quality = 0.8;
      let compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      
      // Check size and reduce quality if needed
      const sizeKB = (compressedDataUrl.length * 3) / 4 / 1024;
      
      if (sizeKB > maxSizeKB) {
        quality = 0.6;
        compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        
        const newSizeKB = (compressedDataUrl.length * 3) / 4 / 1024;
        if (newSizeKB > maxSizeKB) {
          quality = 0.4;
          compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        }
      }

      console.log(`🖼️ Image compressed: ${Math.round(sizeKB)}KB → ${Math.round((compressedDataUrl.length * 3) / 4 / 1024)}KB`);
      resolve(compressedDataUrl);
    };

    img.onerror = () => {
      reject(new Error('Failed to load image for compression'));
    };

    img.src = base64String;
  });
};

export const saveAnalysisToHistory = async (
  imageUrl: string,
  prediction: string,
  confidence: number,
  extractedText?: string
) => {
  const now = new Date();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.log('⚠️ No user logged in, analysis will not be saved permanently');
    throw new Error('Please login to save your analysis history');
  }

  try {
    let storedImageUrl = 'no-image'; // Default

    // Try to compress and upload image to Firebase Storage
    if (imageUrl.startsWith('data:')) {
      try {
        console.log('🔄 Compressing image...');
        const compressedImage = await compressImage(imageUrl, 800);
        
        console.log('📤 Uploading compressed image to Firebase Storage...');
        const imageRef = ref(storage, `analysis-images/${currentUser.uid}/${Date.now()}.jpg`);
        
        await uploadString(imageRef, compressedImage, 'data_url');
        storedImageUrl = await getDownloadURL(imageRef);
        console.log('✅ Image uploaded to Storage:', storedImageUrl);
      } catch (uploadError: any) {
        console.warn('⚠️ Storage upload failed (will save without image):', uploadError.message);
        // Continue without image - don't fail the whole save
        storedImageUrl = 'upload-failed';
      }
    }

    const analysis = {
      image: storedImageUrl,
      prediction,
      confidence,
      extractedText,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      userId: currentUser.uid,
      createdAt: Timestamp.fromDate(now),
    };

    console.log('💾 Saving analysis to Firestore...');
    const docRef = await addDoc(collection(db, 'analysisHistory'), analysis);
    console.log('✅ Analysis saved to Firestore:', docRef.id);

    return {
      id: docRef.id,
      ...analysis,
    };
  } catch (error: any) {
    console.error('❌ Error saving analysis:', error);
    throw new Error(`Failed to save: ${error.message}`);
  }
};

const saveToLocalStorage = (analysis: AnalysisHistory) => {
  // Get existing history
  const existingHistory = localStorage.getItem('analysisHistory');
  let history: AnalysisHistory[] = [];
  
  if (existingHistory) {
    try {
      history = JSON.parse(existingHistory);
    } catch (error) {
      console.error('Error parsing existing history:', error);
      history = [];
    }
  }

  // Add new analysis to beginning of array
  history.unshift(analysis);

  // Keep only last 50 analyses to prevent localStorage from getting too large
  history = history.slice(0, 50);

  // Save to localStorage
  localStorage.setItem('analysisHistory', JSON.stringify(history));
  
  // Dispatch custom event to notify other components
  window.dispatchEvent(new CustomEvent('historyUpdated'));
  
  console.log('Analysis saved to localStorage:', analysis);
};

export const getAnalysisHistory = async (): Promise<AnalysisHistory[]> => {
  const currentUser = auth.currentUser;

  try {
    // If user is logged in, fetch from Firestore
    if (currentUser) {
      console.log('🔍 Fetching history from Firestore for user:', currentUser.uid);
      
      try {
        // Try with orderBy first
        const q = query(
          collection(db, 'analysisHistory'),
          where('userId', '==', currentUser.uid),
          orderBy('createdAt', 'desc'),
          limit(50)
        );
        
        const querySnapshot = await getDocs(q);
        const history: AnalysisHistory[] = [];
        
        querySnapshot.forEach((doc) => {
          history.push({
            id: doc.id,
            image: doc.data().image,
            prediction: doc.data().prediction,
            confidence: doc.data().confidence,
            extractedText: doc.data().extractedText,
            date: doc.data().date,
            time: doc.data().time,
            userId: doc.data().userId,
          });
        });

        console.log(`✅ Loaded ${history.length} records from Firestore`);

        // Update localStorage cache
        if (history.length > 0) {
          localStorage.setItem('analysisHistory', JSON.stringify(history));
        }

        return history;
      } catch (indexError: unknown) {
        // If index error, try without orderBy
        const errorMessage = indexError instanceof Error ? indexError.message : 'Unknown error';
        console.warn('⚠️ Firestore index not found, fetching without ordering:', errorMessage);
        
        const q = query(
          collection(db, 'analysisHistory'),
          where('userId', '==', currentUser.uid),
          limit(50)
        );
        
        const querySnapshot = await getDocs(q);
        const history: AnalysisHistory[] = [];
        
        querySnapshot.forEach((doc) => {
          history.push({
            id: doc.id,
            image: doc.data().image,
            prediction: doc.data().prediction,
            confidence: doc.data().confidence,
            extractedText: doc.data().extractedText,
            date: doc.data().date,
            time: doc.data().time,
            userId: doc.data().userId,
          });
        });

        // Sort locally by date/time
        history.sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.time}`).getTime();
          const dateB = new Date(`${b.date} ${b.time}`).getTime();
          return dateB - dateA; // desc order
        });

        console.log(`✅ Loaded ${history.length} records from Firestore (sorted locally)`);

        // Update localStorage cache
        if (history.length > 0) {
          localStorage.setItem('analysisHistory', JSON.stringify(history));
        }

        return history;
      }
    } else {
      console.log('⚠️ No user logged in, loading from localStorage');
      // If not logged in, fetch from localStorage
      const savedHistory = localStorage.getItem('analysisHistory');
      if (savedHistory) {
        try {
          return JSON.parse(savedHistory);
        } catch (error) {
          console.error('Error parsing history:', error);
          return [];
        }
      }
      return [];
    }
  } catch (error) {
    console.error('❌ Error fetching history from Firestore:', error);
    // Fallback to localStorage
    const savedHistory = localStorage.getItem('analysisHistory');
    if (savedHistory) {
      try {
        return JSON.parse(savedHistory);
      } catch (error) {
        console.error('Error parsing history:', error);
        return [];
      }
    }
    return [];
  }
};

export const deleteAnalysisFromHistory = async (id: string): Promise<void> => {
  const currentUser = auth.currentUser;

  try {
    // If user is logged in, delete from Firestore
    if (currentUser) {
      await deleteDoc(doc(db, 'analysisHistory', id));
      console.log('Analysis deleted from Firestore:', id);
    }
  } catch (error) {
    console.error('Error deleting from Firestore:', error);
  }

  // Also delete from localStorage
  const existingHistory = localStorage.getItem('analysisHistory');
  if (existingHistory) {
    try {
      let history: AnalysisHistory[] = JSON.parse(existingHistory);
      history = history.filter(item => item.id !== id);
      localStorage.setItem('analysisHistory', JSON.stringify(history));
      console.log('Analysis deleted from localStorage:', id);
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  }

  window.dispatchEvent(new CustomEvent('historyUpdated'));
};

export const clearAnalysisHistory = async (): Promise<void> => {
  const currentUser = auth.currentUser;

  try {
    // If user is logged in, delete all their analyses from Firestore
    if (currentUser) {
      const q = query(
        collection(db, 'analysisHistory'),
        where('userId', '==', currentUser.uid)
      );
      
      const querySnapshot = await getDocs(q);
      
      for (const doc of querySnapshot.docs) {
        await deleteDoc(doc.ref);
      }
      
      console.log('All Firestore analyses cleared for user:', currentUser.uid);
    }
  } catch (error) {
    console.error('Error clearing Firestore history:', error);
  }

  // Clear localStorage
  localStorage.removeItem('analysisHistory');
  window.dispatchEvent(new CustomEvent('historyUpdated'));
  console.log('Analysis history cleared');
};
