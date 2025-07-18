import { useState, useEffect } from "react";
import { Calendar, Download, Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { generateAnalysisPDF } from "../utils/pdfGenerator";

interface AnalysisHistory {
  id: string;
  image: string;
  prediction: string;
  confidence: number;
  extractedText?: string;
  date: string;
  time: string;
}

const History = () => {
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisHistory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('analysisHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setHistory(parsedHistory);
        console.log('Loaded history:', parsedHistory);
      } catch (error) {
        console.error('Error parsing history:', error);
        setHistory([]);
      }
    }
  }, []);

  const downloadPDF = (analysis: AnalysisHistory) => {
    try {
      const doc = generateAnalysisPDF(analysis);
      const fileName = `sehat-analysis-${analysis.id}-${analysis.date.replace(/\//g, '-')}.pdf`;
      doc.save(fileName);

      toast({
        title: "PDF Downloaded",
        description: "Analysis report has been downloaded as PDF successfully",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Download Failed",
        description: "There was an error generating the PDF report",
        variant: "destructive",
      });
    }
  };

  const deleteAnalysis = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('analysisHistory', JSON.stringify(updatedHistory));
    toast({
      title: "Analysis Deleted",
      description: "Analysis has been removed from your history",
    });
  };

  const handleViewAnalysis = (analysis: AnalysisHistory) => {
    setSelectedAnalysis(analysis);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAnalysis(null);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600 bg-green-50";
    if (confidence >= 0.6) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Analysis History
          </h1>
          <p className="text-xl text-slate-600">
            View and manage your past skin analysis results
          </p>
        </div>

        {history.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="mx-auto h-12 w-12 text-slate-400 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No Analysis History
              </h3>
              <p className="text-slate-600 mb-6">
                You haven't performed any analyses yet. Start by uploading an image for analysis.
              </p>
              <Button onClick={() => navigate('/prediction')}>
                Start Analysis
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {history.map((analysis) => (
              <Card key={analysis.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="aspect-video bg-slate-100 rounded-lg mb-3 overflow-hidden">
                    <img
                      src={analysis.image}
                      alt="Analysis"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg">{analysis.prediction}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar size={14} />
                    {analysis.date} at {analysis.time}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className={`rounded-lg px-3 py-2 text-sm font-medium ${getConfidenceColor(analysis.confidence)}`}>
                    Confidence: {(analysis.confidence * 100).toFixed(1)}%
                  </div>
                  
                  {analysis.extractedText && (
                    <div className="text-xs text-slate-600 bg-slate-50 rounded p-2">
                      <strong>Notes:</strong> {analysis.extractedText}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewAnalysis(analysis)}
                      className="flex-1"
                    >
                      <Eye size={14} className="mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadPDF(analysis)}
                      className="flex-1"
                    >
                      <Download size={14} className="mr-1" />
                      PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteAnalysis(analysis.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Detailed View Modal with proper accessibility */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedAnalysis?.prediction || 'Analysis Details'}
              </DialogTitle>
              <DialogDescription>
                Analysis performed on {selectedAnalysis?.date} at {selectedAnalysis?.time}
              </DialogDescription>
            </DialogHeader>
            
            {selectedAnalysis && (
              <div className="space-y-6">
                <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden">
                  <img
                    src={selectedAnalysis.image}
                    alt="Analysis"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className={`rounded-lg px-4 py-3 ${getConfidenceColor(selectedAnalysis.confidence)}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      Confidence: {(selectedAnalysis.confidence * 100).toFixed(1)}%
                    </span>
                    <div className="w-24 bg-white bg-opacity-50 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-current opacity-75"
                        style={{ width: `${selectedAnalysis.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                {selectedAnalysis.extractedText && (
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h4 className="font-medium text-slate-900 mb-2">Extracted Text:</h4>
                    <p className="text-sm text-slate-700">{selectedAnalysis.extractedText}</p>
                  </div>
                )}
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Important:</strong> This analysis is for educational purposes only. 
                    Please consult a healthcare professional for proper medical diagnosis.
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={() => downloadPDF(selectedAnalysis)}
                    className="flex-1"
                  >
                    <Download size={16} className="mr-2" />
                    Download PDF Report
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCloseModal}
                    className="flex-1"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default History;
