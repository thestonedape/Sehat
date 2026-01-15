
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Set language code for SMS messages (optional)
auth.languageCode = 'en';

// For phone authentication with better reCAPTCHA handling
export const setupRecaptcha = (containerId: string) => {
  // Clear any existing reCAPTCHA
  const existingContainer = document.getElementById(containerId);
  if (existingContainer) {
    existingContainer.innerHTML = '';
  }

  return new RecaptchaVerifier(auth, containerId, {
    size: 'normal', // Changed from 'invisible' to 'normal' to ensure it's always visible
    callback: () => {
      console.log('reCAPTCHA solved');
    },
    'expired-callback': () => {
      console.log('reCAPTCHA expired');
    },
    'error-callback': () => {
      console.log('reCAPTCHA error');
    }
  });
};
