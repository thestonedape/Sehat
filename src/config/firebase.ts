
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAEP90TQEg7FZm_W0MDnQxbp3lR-SsEQKk",
  authDomain: "givzo-7b792.firebaseapp.com",
  projectId: "givzo-7b792",
  storageBucket: "givzo-7b792.firebasestorage.app",
  messagingSenderId: "864600122715",
  appId: "1:864600122715:web:b2475ea5fce97366e7e67e",
  measurementId: "G-LJLL7H7RLV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
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
