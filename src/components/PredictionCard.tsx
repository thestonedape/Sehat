
interface PredictionResult {
  prediction: string;
  confidence: number;
  extracted_text?: string;
}

interface PredictionCardProps {
  result: PredictionResult;
}

const PredictionCard = ({ result }: PredictionCardProps) => {
  const confidenceColor = result.confidence >= 0.8 
    ? "text-green-600" 
    : result.confidence >= 0.6 
    ? "text-yellow-600" 
    : "text-red-600";

  const confidenceBackground = result.confidence >= 0.8 
    ? "bg-green-50" 
    : result.confidence >= 0.6 
    ? "bg-yellow-50" 
    : "bg-red-50";

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 space-y-6 animate-fade-in">
      <div className="border-b border-slate-200 pb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Analysis Results
        </h3>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="text-sm font-semibold text-slate-600 block mb-3">
            Detected Condition
          </label>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-xl font-bold text-slate-900">
              {result.prediction}
            </p>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-600 block mb-3">
            Confidence Level
          </label>
          <div className={`${confidenceBackground} rounded-lg p-4`}>
            <div className="flex items-center justify-between">
              <span className={`text-xl font-bold ${confidenceColor}`}>
                {(result.confidence * 100).toFixed(1)}%
              </span>
              <div className="w-32 bg-slate-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    result.confidence >= 0.8 ? "bg-green-500" :
                    result.confidence >= 0.6 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {result.extracted_text && (
          <div>
            <label className="text-sm font-semibold text-slate-600 block mb-3">
              Extracted Text
            </label>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-700 font-mono leading-relaxed">
                {result.extracted_text || "No text detected"}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
        <p className="text-sm text-blue-800 leading-relaxed">
          <strong>Important:</strong> This analysis is for educational purposes only. 
          Please consult a healthcare professional for proper medical diagnosis.
        </p>
      </div>
    </div>
  );
};

export default PredictionCard;
