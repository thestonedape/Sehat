
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AnalysisResult {
  name: string;
  confidence: number;
  recommendation: string;
  description: string;
}

interface AnalysisHistory {
  id: string;
  image: string;
  results: AnalysisResult[];
  timestamp: Date;
}

interface AppContextType {
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  analysisResults: AnalysisResult[];
  setAnalysisResults: (results: AnalysisResult[]) => void;
  analysisHistory: AnalysisHistory[];
  addToHistory: (image: string, results: AnalysisResult[]) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
  canAccessResults: boolean;
  setCanAccessResults: (canAccess: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisHistory[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [canAccessResults, setCanAccessResults] = useState(false);

  const addToHistory = (image: string, results: AnalysisResult[]) => {
    const newHistoryItem: AnalysisHistory = {
      id: Date.now().toString(),
      image,
      results,
      timestamp: new Date()
    };
    setAnalysisHistory(prev => [newHistoryItem, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      uploadedImage,
      setUploadedImage,
      analysisResults,
      setAnalysisResults,
      analysisHistory,
      addToHistory,
      isAnalyzing,
      setIsAnalyzing,
      canAccessResults,
      setCanAccessResults
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
