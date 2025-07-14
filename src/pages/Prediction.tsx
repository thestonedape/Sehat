
import { useState, useRef } from "react";
import { Upload, X, Loader2, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { saveAnalysisToHistory } from "../utils/historyUtils";
import PredictionCard from "../components/PredictionCard";

interface PredictionResult {
  predicted_class: string;
  confidence: number;
  all_predictions: Array<{
    class_name: string;
    confidence: number;
  }>;
}

const Prediction = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file (PNG, JPEG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setResult(null);
    setShowResults(false);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setShowResults(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !previewUrl) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const apiUrl = 'https://sehatprobbackend.onrender.com';
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setShowResults(true);
      
      // Save to history
      saveAnalysisToHistory(
        previewUrl,
        data.predicted_class,
        data.confidence,
        `Top predictions: ${data.all_predictions.map(p => `${p.class_name} (${(p.confidence * 100).toFixed(1)}%)`).join(', ')}`
      );
      
      toast({
        title: "Analysis complete",
        description: "Your image has been successfully analyzed",
      });
    } catch (error) {
      console.error('Error:', error);
      
      // Mock response for demonstration when API is not available
      const mockResult: PredictionResult = {
        predicted_class: "Acne Vulgaris",
        confidence: 0.85,
        all_predictions: [
          { class_name: "Acne Vulgaris", confidence: 0.85 },
          { class_name: "Eczema", confidence: 0.10 },
          { class_name: "Psoriasis", confidence: 0.05 }
        ]
      };
      
      setResult(mockResult);
      setShowResults(true);
      
      // Save mock result to history as well
      saveAnalysisToHistory(
        previewUrl,
        mockResult.predicted_class,
        mockResult.confidence,
        `Top predictions: ${mockResult.all_predictions.map(p => `${p.class_name} (${(p.confidence * 100).toFixed(1)}%)`).join(', ')}`
      );
      
      toast({
        title: "Demo Mode",
        description: "Showing sample results (API not connected)",
        variant: "default",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToUpload = () => {
    setShowResults(false);
    setResult(null);
  };

  if (showResults && result) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Analysis Results
            </h1>
            <button
              onClick={handleBackToUpload}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Upload
            </button>
          </div>
          <PredictionCard result={result} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Skin Disease Analysis
          </h1>
          <p className="text-xl text-slate-600">
            Upload an image for AI-powered skin condition analysis
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Upload Image
            </h2>
            
            {!selectedFile ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
              >
                <Camera className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <p className="text-lg font-medium text-slate-600 mb-2">
                  Click to upload an image
                </p>
                <p className="text-sm text-slate-500">
                  PNG, JPEG up to 10MB
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src={previewUrl!} 
                    alt="Preview" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    onClick={handleRemoveFile}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="text-sm text-slate-600">
                  <strong>File:</strong> {selectedFile.name}
                </p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            {selectedFile && (
              <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-slate-400 transition-colors duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2" size={20} />
                    Analyze Image
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Guidelines */}
        <div className="bg-slate-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Guidelines for Best Results
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
            <ul className="space-y-2">
              <li>• Use clear, well-lit photos</li>
              <li>• Focus on the affected area</li>
              <li>• Avoid blurry or distorted images</li>
            </ul>
            <ul className="space-y-2">
              <li>• Include surrounding healthy skin for context</li>
              <li>• Take photos from a reasonable distance</li>
              <li>• Ensure good lighting conditions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
