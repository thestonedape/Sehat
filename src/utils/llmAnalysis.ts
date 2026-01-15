import { MedicalInfo } from './historyUtils';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface LLMAnalysisResult {
  summary: string;
  recommendations: string[];
  riskFactors: string[];
  nextSteps: string[];
}

export const analyzeDiseaseWithLLM = async (
  prediction: string,
  confidence: number,
  allPredictions: Array<{ class_name: string; confidence: number }>,
  medicalInfo?: MedicalInfo
): Promise<LLMAnalysisResult | null> => {
  if (!medicalInfo) {
    return null; // Only analyze if we have medical context
  }

  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn('⚠️ VITE_GEMINI_API_KEY not found in environment variables');
      return null;
    }

    // Initialize the Google AI SDK
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = buildAnalysisPrompt(prediction, confidence, allPredictions, medicalInfo);
    
    // Generate content using the SDK
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();

    if (!analysisText) {
      console.error('No text generated from Gemini');
      throw new Error('No text generated from Gemini');
    }

    // Parse the structured response
    return parseAnalysisResponse(analysisText);
  } catch (error) {
    console.error('❌ LLM analysis failed:', error);
    return null; // Gracefully fail - don't break the app
  }
};

const buildAnalysisPrompt = (
  prediction: string,
  confidence: number,
  allPredictions: Array<{ class_name: string; confidence: number }>,
  medicalInfo: MedicalInfo
): string => {
  const topPredictions = allPredictions
    .slice(0, 3)
    .map(p => `${p.class_name} (${(p.confidence * 100).toFixed(1)}%)`)
    .join(', ');

  return `You are a medical assistant helping to provide educational information about skin conditions. Always emphasize that this is for informational purposes only and users should consult healthcare professionals for proper diagnosis and treatment.

I have an AI model prediction for a skin condition. Please provide a comprehensive analysis considering the patient's medical information.

**AI Prediction:**
- Primary diagnosis: ${prediction} (${(confidence * 100).toFixed(1)}% confidence)
- Alternative possibilities: ${topPredictions}

**Patient Information:**
${medicalInfo.age ? `- Age: ${medicalInfo.age}` : ''}
${medicalInfo.gender ? `- Gender: ${medicalInfo.gender}` : ''}
${medicalInfo.region ? `- Location: ${medicalInfo.region}` : ''}
${medicalInfo.duration ? `- Duration: ${medicalInfo.duration}` : ''}
${medicalInfo.symptoms ? `- Symptoms: ${medicalInfo.symptoms}` : ''}
${medicalInfo.pastMedicalHistory ? `- Medical History: ${medicalInfo.pastMedicalHistory}` : ''}
${medicalInfo.medications ? `- Current Medications: ${medicalInfo.medications}` : ''}
${medicalInfo.allergies ? `- Allergies: ${medicalInfo.allergies}` : ''}
${medicalInfo.familyHistory ? `- Family History: ${medicalInfo.familyHistory}` : ''}

Please provide:
1. **SUMMARY**: A brief analysis considering the AI prediction and patient context (2-3 sentences)
2. **RECOMMENDATIONS**: 3-5 specific lifestyle or care recommendations
3. **RISK_FACTORS**: 2-4 factors that may worsen or trigger this condition
4. **NEXT_STEPS**: 3-4 actionable next steps for the patient

Format your response EXACTLY like this:

SUMMARY:
[Your summary here]

RECOMMENDATIONS:
- [Recommendation 1]
- [Recommendation 2]
- [Recommendation 3]

RISK_FACTORS:
- [Risk factor 1]
- [Risk factor 2]

NEXT_STEPS:
- [Next step 1]
- [Next step 2]
- [Next step 3]

Remember: This is educational information only. Always emphasize consulting healthcare professionals.
`.trim();
};

const parseAnalysisResponse = (text: string): LLMAnalysisResult => {
  const sections = {
    summary: '',
    recommendations: [] as string[],
    riskFactors: [] as string[],
    nextSteps: [] as string[],
  };

  try {
    // Extract summary
    const summaryMatch = text.match(/SUMMARY:\s*([\s\S]*?)(?=RECOMMENDATIONS:|$)/i);
    if (summaryMatch) {
      sections.summary = summaryMatch[1].trim();
    }

    // Extract recommendations
    const recsMatch = text.match(/RECOMMENDATIONS:\s*([\s\S]*?)(?=RISK_FACTORS:|$)/i);
    if (recsMatch) {
      sections.recommendations = recsMatch[1]
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace(/^-\s*/, '').trim());
    }

    // Extract risk factors
    const riskMatch = text.match(/RISK_FACTORS:\s*([\s\S]*?)(?=NEXT_STEPS:|$)/i);
    if (riskMatch) {
      sections.riskFactors = riskMatch[1]
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace(/^-\s*/, '').trim());
    }

    // Extract next steps
    const stepsMatch = text.match(/NEXT_STEPS:\s*([\s\S]*?)$/i);
    if (stepsMatch) {
      sections.nextSteps = stepsMatch[1]
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace(/^-\s*/, '').trim());
    }
  } catch (error) {
    console.error('Error parsing LLM response:', error);
  }

  return sections;
};

// Alternative: Use your own backend endpoint
export const analyzeDiseaseWithCustomAPI = async (
  prediction: string,
  confidence: number,
  allPredictions: Array<{ class_name: string; confidence: number }>,
  medicalInfo?: MedicalInfo
): Promise<LLMAnalysisResult | null> => {
  if (!medicalInfo) return null;

  try {
    const response = await fetch('https://your-backend.com/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prediction,
        confidence,
        allPredictions,
        medicalInfo,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Custom API analysis failed:', error);
    return null;
  }
};
