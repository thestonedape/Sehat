import { MedicalInfo } from './historyUtils';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface LLMAnalysisResult {
  summary: string;
  primaryDiagnosisAnalysis: string[];
  alternativePossibilities: string[];
  clinicalConsiderations: string[];
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
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

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

  return `You are a medical assistant analyzing possible skin conditions. Your role is to discuss what diseases these could be and why, NOT to provide treatment recommendations or solutions.

I have an AI model prediction for a skin condition. Please analyze ALL the possibilities - the primary prediction AND the alternative predictions - as any of them could be the correct diagnosis.

**AI Predictions:**
- Primary prediction: ${prediction} (${(confidence * 100).toFixed(1)}% confidence)
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

Please provide a DIAGNOSTIC ANALYSIS (NOT treatment suggestions):
1. **SUMMARY**: Overview of why these conditions are being considered based on the patient's profile (2-3 sentences)
2. **PRIMARY_ANALYSIS**: 3-4 points explaining why the primary prediction (${prediction}) could be correct based on the patient's symptoms, history, and demographics
3. **ALTERNATIVES**: 3-4 points explaining why the alternative predictions could also be correct - remember, the model's second or third prediction might be the actual diagnosis
4. **CLINICAL_CONSIDERATIONS**: 2-3 important clinical factors or characteristics that would help differentiate between these conditions

DO NOT include treatment recommendations, lifestyle advice, or solutions. Focus ONLY on diagnostic possibilities and clinical reasoning.

Format your response EXACTLY like this:

SUMMARY:
[Your summary here]

PRIMARY_ANALYSIS:
- [Why primary prediction could be correct - point 1]
- [Why primary prediction could be correct - point 2]
- [Why primary prediction could be correct - point 3]

ALTERNATIVES:
- [Why alternative prediction could be correct - point 1]
- [Why alternative prediction could be correct - point 2]
- [Why alternative prediction could be correct - point 3]

CLINICAL_CONSIDERATIONS:
- [Differentiating factor 1]
- [Differentiating factor 2]
- [Differentiating factor 3]

Remember: This is educational information only. Emphasize that a healthcare professional should make the final diagnosis.
`.trim();
};

const parseAnalysisResponse = (text: string): LLMAnalysisResult => {
  const sections = {
    summary: '',
    primaryDiagnosisAnalysis: [] as string[],
    alternativePossibilities: [] as string[],
    clinicalConsiderations: [] as string[],
  };

  try {
    // Extract summary
    const summaryMatch = text.match(/SUMMARY:\s*([\s\S]*?)(?=PRIMARY_ANALYSIS:|$)/i);
    if (summaryMatch) {
      sections.summary = summaryMatch[1].trim();
    }

    // Extract primary diagnosis analysis
    const primaryMatch = text.match(/PRIMARY_ANALYSIS:\s*([\s\S]*?)(?=ALTERNATIVES:|$)/i);
    if (primaryMatch) {
      sections.primaryDiagnosisAnalysis = primaryMatch[1]
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace(/^-\s*/, '').trim());
    }

    // Extract alternative possibilities
    const altMatch = text.match(/ALTERNATIVES:\s*([\s\S]*?)(?=CLINICAL_CONSIDERATIONS:|$)/i);
    if (altMatch) {
      sections.alternativePossibilities = altMatch[1]
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.replace(/^-\s*/, '').trim());
    }

    // Extract clinical considerations
    const clinicalMatch = text.match(/CLINICAL_CONSIDERATIONS:\s*([\s\S]*?)$/i);
    if (clinicalMatch) {
      sections.clinicalConsiderations = clinicalMatch[1]
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
