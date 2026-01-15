import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Lightbulb, TrendingUp, FileSearch } from "lucide-react";
import { LLMAnalysisResult } from "../utils/llmAnalysis";

interface LLMAnalysisCardProps {
  analysis: LLMAnalysisResult;
  isLoading?: boolean;
}

const LLMAnalysisCard = ({ analysis, isLoading }: LLMAnalysisCardProps) => {
  if (isLoading) {
    return (
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            🤖 AI Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-3 text-slate-600">Analyzing your medical information...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          🤖 Diagnostic Analysis
        </CardTitle>
        <p className="text-sm text-slate-600 mt-1">
          Understanding possible conditions based on AI predictions and your medical information
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary */}
        {analysis.summary && (
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-purple-600 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Overview</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{analysis.summary}</p>
              </div>
            </div>
          </div>
        )}

        {/* Primary Diagnosis Analysis */}
        {analysis.primaryDiagnosisAnalysis && analysis.primaryDiagnosisAnalysis.length > 0 && (
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <div className="flex items-start gap-3">
              <TrendingUp className="text-blue-600 mt-1 flex-shrink-0" size={20} />
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-3">Primary Prediction Analysis</h4>
                <p className="text-xs text-slate-500 mb-2">Why this could be the correct diagnosis:</p>
                <ul className="space-y-2">
                  {analysis.primaryDiagnosisAnalysis.map((point, idx) => (
                    <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Alternative Possibilities */}
        {analysis.alternativePossibilities && analysis.alternativePossibilities.length > 0 && (
          <div className="bg-white rounded-lg p-4 border border-indigo-100">
            <div className="flex items-start gap-3">
              <FileSearch className="text-indigo-600 mt-1 flex-shrink-0" size={20} />
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-3">Alternative Possibilities</h4>
                <p className="text-xs text-slate-500 mb-2">Other diagnoses to consider - the model's alternative predictions could be correct:</p>
                <ul className="space-y-2">
                  {analysis.alternativePossibilities.map((point, idx) => (
                    <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-indigo-600 mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Clinical Considerations */}
        {analysis.clinicalConsiderations && analysis.clinicalConsiderations.length > 0 && (
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-orange-600 mt-1 flex-shrink-0" size={20} />
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-3">Clinical Considerations</h4>
                <p className="text-xs text-slate-500 mb-2">Key factors for differential diagnosis:</p>
                <ul className="space-y-2">
                  {analysis.clinicalConsiderations.map((point, idx) => (
                    <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-orange-600 mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-xs text-yellow-800">
            <strong>⚕️ Medical Disclaimer:</strong> This AI analysis discusses possible conditions for educational purposes only. 
            A qualified healthcare professional must make the final diagnosis and prescribe appropriate treatment. Do not self-diagnose or self-treat.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LLMAnalysisCard;
