export async function requestPrediction(baseUrl, formData, fetchImpl = fetch) {
  const response = await fetchImpl(`${baseUrl}/predict`, {
    method: 'POST', body: formData, signal: AbortSignal.timeout(120_000),
  });
  if (!response.ok) {
    const messages = {
      413: 'The image exceeds the upload limit.',
      415: 'Please upload a JPEG or PNG image.',
      422: 'The image could not be decoded or exceeds the dimension limits.',
      429: 'The service is busy. Please wait and try again.',
      503: 'The prediction service is unavailable. Please try again later.',
    };
    throw new Error(messages[response.status] || 'Prediction failed. Please try again later.');
  }
  const result = await response.json();
  if (typeof result.predicted_class !== 'string' || !Number.isFinite(result.confidence) ||
      !Array.isArray(result.all_predictions) || result.all_predictions.length === 0 ||
      result.all_predictions.some(p => typeof p.class_name !== 'string' || !Number.isFinite(p.confidence))) {
    throw new Error('The service returned an invalid prediction. Please try again later.');
  }
  return result;
}
