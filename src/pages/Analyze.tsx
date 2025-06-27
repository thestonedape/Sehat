
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ImageUpload";
import { PredictionResults } from "@/components/PredictionResults";
import { Activity, ArrowLeft, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const Analyze = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setPrediction(null);
  };

  const handleAnalyze = async () => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    // Simulate API call - replace with actual FastAPI endpoint
    setTimeout(() => {
      setPrediction({
        condition: "Benign Nevus",
        confidence: 0.92,
        recommendations: [
          "Monitor for any changes in size, color, or texture",
          "Schedule routine dermatological check-ups",
          "Use broad-spectrum sunscreen daily",
          "Consider professional evaluation if changes occur"
        ],
        severity: "Low"
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                SEHAT
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">
                Home
              </Link>
              <Link to="/analyze" className="text-emerald-400 font-semibold">
                Analyze
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Main Analysis Section */}
        <div className="max-w-5xl mx-auto">
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm rounded-3xl shadow-2xl">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-2xl border border-emerald-500/30">
                  <Brain className="w-16 h-16 text-emerald-400" />
                </div>
              </div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-4">
                AI Skin Analysis
              </CardTitle>
              <CardDescription className="text-xl text-gray-300 max-w-2xl mx-auto">
                Upload a clear, well-lit image of the skin area you'd like analyzed. 
                Our AI will provide professional-grade insights within seconds.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10 px-8 pb-8">
              <ImageUpload onImageUpload={handleImageUpload} />
              
              {uploadedImage && (
                <div className="text-center">
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={isAnalyzing}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-16 py-6 text-xl font-semibold rounded-2xl shadow-2xl shadow-emerald-500/20 transition-all duration-300 hover:scale-105"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center gap-4">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Analyzing with AI...
                      </div>
                    ) : (
                      <>
                        <Brain className="w-6 h-6 mr-3" />
                        Analyze with AI
                      </>
                    )}
                  </Button>
                </div>
              )}

              {prediction && (
                <div>
                  <PredictionResults prediction={prediction} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
