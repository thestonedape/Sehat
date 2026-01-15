import React, { useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { AuthContext, AuthContextType } from './AuthContextType'; // Update to the correct file name if necessary
import { clearAnalysisHistory } from '../utils/historyUtils';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    // Clear analysis history from localStorage when user logs out
    clearAnalysisHistory();
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      
      // Trigger history reload when auth state changes (login/logout)
      if (user) {
        console.log('🔐 User logged in, triggering history reload');
        window.dispatchEvent(new CustomEvent('historyUpdated'));
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={value as AuthContextType}>
      {children}
    </AuthContext.Provider>
  );
};