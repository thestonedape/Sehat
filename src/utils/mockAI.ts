
interface AnalysisResult {
  name: string;
  confidence: number;
  recommendation: string;
  description: string;
}

const mockDiseases = [
  {
    name: "Eczema (Atopic Dermatitis)",
    description: "A chronic inflammatory skin condition characterized by dry, itchy, and inflamed skin.",
    recommendation: "Use gentle, fragrance-free moisturizers and avoid known triggers. Consult a dermatologist for proper treatment."
  },
  {
    name: "Psoriasis",
    description: "An autoimmune condition that causes rapid buildup of skin cells, resulting in scaling and inflammation.",
    recommendation: "Maintain skin moisture and avoid stress triggers. Seek dermatological care for specialized treatment options."
  },
  {
    name: "Acne Vulgaris",
    description: "A common skin condition occurring when hair follicles become clogged with oil and dead skin cells.",
    recommendation: "Use gentle cleansers, avoid picking at lesions, and consider over-the-counter treatments. Consult a dermatologist if severe."
  },
  {
    name: "Seborrheic Dermatitis",
    description: "A chronic inflammatory condition affecting areas rich in sebaceous glands, causing scaling and redness.",
    recommendation: "Use antifungal shampoos or treatments as directed. Avoid harsh products and manage stress levels."
  },
  {
    name: "Contact Dermatitis",
    description: "An inflammatory reaction caused by direct contact with an irritant or allergen.",
    recommendation: "Identify and avoid the triggering substance. Use cool compresses and gentle moisturizers. See a doctor if severe."
  },
  {
    name: "Rosacea",
    description: "A chronic inflammatory condition primarily affecting the central face, causing redness and visible blood vessels.",
    recommendation: "Identify and avoid triggers like spicy foods, alcohol, and sun exposure. Use gentle skincare products."
  }
];

export const analyzeImage = async (imageData: string): Promise<AnalysisResult[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate 2-4 random results with confidence scores
  const numResults = Math.floor(Math.random() * 3) + 2;
  const shuffled = [...mockDiseases].sort(() => 0.5 - Math.random());
  const selectedDiseases = shuffled.slice(0, numResults);

  return selectedDiseases.map((disease, index) => ({
    name: disease.name,
    confidence: Math.round((Math.random() * 30 + 60 - index * 5) * 100) / 100, // 60-90% range, decreasing
    recommendation: disease.recommendation,
    description: disease.description
  })).sort((a, b) => b.confidence - a.confidence); // Sort by confidence descending
};
