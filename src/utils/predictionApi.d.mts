export interface PredictionResponse {
  predicted_class: string;
  confidence: number;
  all_predictions: Array<{class_name: string; confidence: number}>;
}
export function requestPrediction(baseUrl: string, formData: FormData, fetchImpl?: typeof fetch): Promise<PredictionResponse>;
