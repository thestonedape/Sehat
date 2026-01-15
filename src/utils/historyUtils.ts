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
import { db } from '../config/firebase';
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

export const saveAnalysisToHistory = async (
  imageUrl: string,
  prediction: string,
  confidence: number,
  extractedText?: string
) => {
  const now = new Date();
  const currentUser = auth.currentUser;

  const analysis: Omit<AnalysisHistory, 'id'> = {
    image: imageUrl,
    prediction,
    confidence,
    extractedText,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString(),
    userId: currentUser?.uid,
  };

  try {
    // Save to Firestore if user is logged in
    if (currentUser) {
      const docRef = await addDoc(collection(db, 'analysisHistory'), {
        ...analysis,
        createdAt: Timestamp.fromDate(now),
      });
      console.log('Analysis saved to Firestore:', docRef.id);

      // Also save to localStorage as backup
      const localAnalysis: AnalysisHistory = {
        id: docRef.id,
        ...analysis,
      };
      saveToLocalStorage(localAnalysis);
      
      return localAnalysis;
    } else {
      // If not logged in, save only to localStorage
      const localAnalysis: AnalysisHistory = {
        id: `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...analysis as any,
      };
      saveToLocalStorage(localAnalysis);
      return localAnalysis;
    }
  } catch (error) {
    console.error('Error saving analysis:', error);
    // Fallback to localStorage
    const localAnalysis: AnalysisHistory = {
      id: `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...analysis as any,
    };
    saveToLocalStorage(localAnalysis);
    return localAnalysis;
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

      // Update localStorage cache
      if (history.length > 0) {
        localStorage.setItem('analysisHistory', JSON.stringify(history));
      }

      return history;
    } else {
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
    console.error('Error fetching history from Firestore:', error);
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
