
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, X, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { analyzeImage } from '../utils/mockAI';

const Upload = () => {
  const navigate = useNavigate();
  const { 
    setUploadedImage, 
    setAnalysisResults, 
    addToHistory,
    isAnalyzing, 
    setIsAnalyzing,
    setCanAccessResults 
  } = useApp();
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      setUploadedImage(result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!imagePreview) return;

    setIsAnalyzing(true);
    
    setTimeout(async () => {
      const results = await analyzeImage(imagePreview);
      setAnalysisResults(results);
      addToHistory(imagePreview, results);
      setCanAccessResults(true);
      setIsAnalyzing(false);
      navigate('/results');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Upload Your Skin Image
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a clear image of the skin area you'd like to analyze. Our AI will process it and provide insights.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          {!imagePreview ? (
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleChange}
                accept="image/*"
              />
              
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <UploadIcon className="h-8 w-8 text-gray-600" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Drop your image here
                  </h3>
                  <p className="text-gray-600 mb-4">
                    or click to browse files
                  </p>
                  
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Choose File
                  </button>
                </div>
                
                <p className="text-sm text-gray-500">
                  JPEG, PNG, WebP • Max 10MB • Minimum 300x300px
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative">
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10 flex items-center justify-center"
                >
                  <X className="h-4 w-4" />
                </button>
                
                <img
                  src={imagePreview}
                  alt="Uploaded skin image"
                  className="w-full max-w-md mx-auto rounded-lg shadow-sm"
                />
              </div>

              <div className="text-center">
                {!isAnalyzing ? (
                  <button
                    onClick={handleAnalyze}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                  >
                    Analyze Image
                  </button>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 max-w-sm mx-auto">
                    <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Analyzing Your Image
                    </h3>
                    <p className="text-gray-600">
                      Please wait while our AI processes your image...
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-yellow-800 mb-1">
                  Medical Disclaimer
                </h3>
                <p className="text-sm text-yellow-700">
                  This tool is for educational purposes only and should not replace professional medical advice. 
                  Always consult with a qualified dermatologist for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
