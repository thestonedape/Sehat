
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, X, Image } from "lucide-react";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

export const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
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
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setUploadedImage(imageUrl);
        onImageUpload(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        aria-label="Upload image"
      />

      {!uploadedImage ? (
        <Card
          className={`bg-gray-900/30 border-2 border-dashed transition-all duration-300 cursor-pointer hover:bg-gray-900/50 rounded-3xl ${
            dragActive 
              ? "border-emerald-400 bg-emerald-500/10" 
              : "border-gray-700 hover:border-emerald-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <CardContent className="flex flex-col items-center justify-center py-24 px-8">
            <div className="p-8 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-2xl border border-emerald-500/30 mb-8">
              <Upload className="w-16 h-16 text-emerald-400" />
            </div>
            
            <h3 className="text-3xl font-bold text-white mb-4">
              Upload Your Image
            </h3>
            
            <p className="text-gray-300 text-center mb-10 text-lg max-w-md">
              Drag and drop your skin image here, or click to browse your files
            </p>
            
            <div className="flex gap-6">
              <Button 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl px-8 py-4 text-lg"
              >
                <Upload className="w-5 h-5 mr-3" />
                Choose File
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl px-8 py-4 text-lg"
              >
                <Camera className="w-5 h-5 mr-3" />
                Take Photo
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 mt-8">
              Supported formats: JPG, PNG, GIF • Max size: 10MB
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm rounded-3xl shadow-xl">
          <CardContent className="p-8">
            <div className="relative group">
              <img
                src={uploadedImage}
                alt="Uploaded skin photo"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              
              <Button
                onClick={removeImage}
                variant="destructive"
                size="icon"
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 shadow-xl"
              >
                <X className="w-6 h-6" />
              </Button>
              
              <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-gray-900/90 backdrop-blur-sm rounded-full px-6 py-3 border border-green-500/30">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-semibold">Ready for AI Analysis</span>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Image className="w-6 h-6 text-emerald-400" />
                <p className="text-emerald-400 font-semibold text-lg">
                  Image uploaded successfully!
                </p>
              </div>
              <p className="text-gray-400">
                Click "Analyze with AI" to begin the skin analysis process.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
