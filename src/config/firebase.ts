
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAEP90TQEg7FZm_W0MDnQxbp3lR-SsEQKk",
  authDomain: "givzo-7b792.firebaseapp.com",
  projectId: "givzo-7b792",
  storageBucket: "givzo-7b792.firebasestorage.app",
  messagingSenderId: "864600122715",
  appId: "1:864600122715:web:b2475ea5fce97366e7e67e",
  measurementId: "G-LJLL7H7RLV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// For phone authentication
export const setupRecaptcha = (containerId: string) => {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved
    }
  });
};

export default app;



