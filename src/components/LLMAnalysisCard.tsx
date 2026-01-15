import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Lightbulb, TrendingUp } from "lucide-react";
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
          🤖 Personalized AI Analysis
        </CardTitle>
        <p className="text-sm text-slate-600 mt-1">
          Based on your medical information and AI prediction
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary */}
        {analysis.summary && (
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <div className="flex items-start gap-3">
              <Lightbulb className="text-purple-600 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Summary</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{analysis.summary}</p>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {analysis.recommendations && analysis.recommendations.length > 0 && (
          <div className="bg-white rounded-lg p-4 border border-green-100">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-600 mt-1 flex-shrink-0" size={20} />
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-3">Recommendations</h4>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Risk Factors */}
        {analysis.riskFactors && analysis.riskFactors.length > 0 && (
          <div className="bg-white rounded-lg p-4 border border-orange-100">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-orange-600 mt-1 flex-shrink-0" size={20} />
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-3">Risk Factors to Avoid</h4>
                <ul className="space-y-2">
                  {analysis.riskFactors.map((risk, idx) => (
                    <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-orange-600 mt-0.5">⚠</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        {analysis.nextSteps && analysis.nextSteps.length > 0 && (
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <div className="flex items-start gap-3">
              <TrendingUp className="text-blue-600 mt-1 flex-shrink-0" size={20} />
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-3">Next Steps</h4>
                <ol className="space-y-2">
                  {analysis.nextSteps.map((step, idx) => (
                    <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-blue-600 font-semibold mt-0.5">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-xs text-yellow-800">
            <strong>⚕️ Medical Disclaimer:</strong> This AI analysis is for educational purposes only. 
            Always consult with qualified healthcare professionals for proper medical diagnosis and treatment.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LLMAnalysisCard;
