
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Info, Brain, Shield, Heart } from "lucide-react";

interface PredictionResultsProps {
  prediction: {
    condition: string;
    confidence: number;
    recommendations: string[];
    severity: "Low" | "Medium" | "High";
  };
}

export const PredictionResults = ({ prediction }: PredictionResultsProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-600 hover:bg-red-700";
      case "Medium":
        return "bg-yellow-600 hover:bg-yellow-700";
      case "Low":
        return "bg-green-600 hover:bg-green-700";
      default:
        return "bg-blue-600 hover:bg-blue-700";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "High":
        return <AlertTriangle className="w-6 h-6 text-red-400" />;
      case "Medium":
        return <Info className="w-6 h-6 text-yellow-400" />;
      case "Low":
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      default:
        return <Info className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8">
      <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm rounded-3xl shadow-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-xl border border-emerald-500/30">
                <Brain className="w-10 h-10 text-emerald-400" />
              </div>
              <CardTitle className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                AI Analysis Complete
              </CardTitle>
            </div>
            <Badge className={`${getSeverityColor(prediction.severity)} text-white px-6 py-3 text-lg font-bold rounded-full shadow-lg`}>
              {prediction.severity} Priority
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-10 px-8 pb-8">
          {/* Condition Detection */}
          <div className="space-y-8">
            <div className="flex items-center gap-6 bg-gray-950/50 rounded-2xl p-8 border border-gray-800">
              {getSeverityIcon(prediction.severity)}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Detected Condition
                </h3>
                <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {prediction.condition}
                </p>
              </div>
            </div>
            
            <div className="space-y-6 bg-gray-950/50 rounded-2xl p-8 border border-gray-800">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-200 flex items-center gap-3">
                  <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
                  AI Confidence Level
                </span>
                <span className="text-3xl font-bold text-emerald-400">
                  {Math.round(prediction.confidence * 100)}%
                </span>
              </div>
              <Progress 
                value={prediction.confidence * 100} 
                className="w-full h-6 bg-gray-800 rounded-full overflow-hidden"
              />
              <p className="text-gray-400 text-sm">
                Based on deep learning analysis of dermatological patterns
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-8">
            <h4 className="text-3xl font-bold text-white flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-xl border border-blue-500/30">
                <Heart className="w-8 h-8 text-blue-400" />
              </div>
              Care Recommendations
            </h4>
            <div className="space-y-6">
              {prediction.recommendations.map((recommendation, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-6 bg-gray-950/50 rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  <p className="text-gray-200 text-xl leading-relaxed">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notice */}
          <Card className="bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm rounded-2xl shadow-xl">
            <CardContent className="pt-8">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-amber-500/20 rounded-xl border border-amber-500/30">
                  <Shield className="w-8 h-8 text-amber-400" />
                </div>
                <div>
                  <p className="text-amber-400 font-bold text-2xl mb-4">
                    Important Medical Notice
                  </p>
                  <p className="text-gray-200 leading-relaxed text-lg">
                    This AI analysis provides educational insights and should complement professional medical care. 
                    For definitive diagnosis, treatment decisions, or concerning symptoms, please consult with a 
                    qualified dermatologist or healthcare provider immediately.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
