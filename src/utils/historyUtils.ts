export interface AnalysisHistory {
  id: string;
  image: string;
  prediction: string;
  confidence: number;
  extractedText?: string;
  date: string;
  time: string;
}

export const saveAnalysisToHistory = (
  imageUrl: string,
  prediction: string,
  confidence: number,
  extractedText?: string
) => {
  const now = new Date();
  const analysis: AnalysisHistory = {
    id: `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    image: imageUrl,
    prediction,
    confidence,
    extractedText,
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString()
  };

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
  
  console.log('Analysis saved to history:', analysis);
  return analysis;
};

export const getAnalysisHistory = (): AnalysisHistory[] => {
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
};
