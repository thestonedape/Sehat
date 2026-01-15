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
  // Format all predictions equally without hierarchy
  const allPredictionsFormatted = allPredictions
    .slice(0, 5)
    .map((p, idx) => `   ${idx + 1}. ${p.class_name}: ${(p.confidence * 100).toFixed(1)}% confidence`)
    .join('\n');

  return `You are a medical assistant analyzing possible skin conditions. Your role is to discuss what diseases these could be and why, NOT to provide treatment recommendations or solutions.

CRITICAL INSTRUCTION: Do NOT assume the first prediction is more likely to be correct. The AI model has identified multiple possibilities with similar confidence levels. ANY of these predictions could be the actual diagnosis. Some may be prioritized for clinical urgency rather than likelihood.

**AI Model Predictions (Listed by Clinical Priority, NOT Accuracy):**
${allPredictionsFormatted}

⚠️ IMPORTANT: The order above reflects clinical urgency or risk level, NOT diagnostic confidence. A prediction with lower confidence but higher risk may be listed first. Analyze ALL possibilities objectively based on the patient's clinical presentation.

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

Please provide an UNBIASED DIAGNOSTIC ANALYSIS:

1. **SUMMARY**: Neutral overview considering ALL predictions equally. Mention which symptoms support which diagnoses without favoring any particular prediction. (2-3 sentences)

2. **PRIMARY_ANALYSIS**: Analyze the TOP 2-3 most likely diagnoses based SOLELY on:
   - How well they match the patient's symptoms
   - Clinical prevalence in the patient's demographics
   - Confidence scores
   Do NOT favor the first-listed prediction. Focus on clinical reasoning. (3-4 points total across all likely diagnoses)

3. **ALTERNATIVES**: Discuss other plausible diagnoses from the list that shouldn't be ruled out. Explain what clinical features would support these diagnoses. (2-3 points)

4. **CLINICAL_CONSIDERATIONS**: Key diagnostic features, tests, or examination findings that would help differentiate between ALL these conditions. Focus on discriminating factors. (2-3 points)

DO NOT:
- Assume the first prediction is correct
- Provide treatment recommendations
- Give lifestyle advice or solutions
- Favor high-risk conditions just because they're urgent

DO:
- Analyze based on symptom match and clinical reasoning
- Treat predictions with similar confidence as equally viable
- Consider epidemiological factors (age, location, climate)

Format your response EXACTLY like this:

SUMMARY:
[Your unbiased summary considering all predictions]

PRIMARY_ANALYSIS:
- [Most likely diagnosis #1 based on symptoms/demographics: reasoning]
- [Most likely diagnosis #2 based on symptoms/demographics: reasoning]
- [Supporting evidence for top diagnoses]

ALTERNATIVES:
- [Other diagnosis to consider and why]
- [Another plausible diagnosis and supporting factors]

CLINICAL_CONSIDERATIONS:
- [Key differentiating factor #1]
- [Key differentiating factor #2]
- [Diagnostic approach or examination finding]

Remember: This is educational information only. A healthcare professional must make the final diagnosis through proper clinical examination.
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
