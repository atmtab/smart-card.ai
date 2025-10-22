import { GoogleGenAI } from "@google/genai";

// Fix: Aligned with @google/genai guidelines to assume API_KEY is always available.
// Removed conditional initialization and checks for the API key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBio = async (name: string, title: string, company: string): Promise<string> => {
  if (!name.trim() || !title.trim() || !company.trim()) {
    return "";
  }

  const prompt = `
    Based on the following information, generate a concise and professional one-sentence bio for a digital business card. The tone should be confident and modern. Do not use markdown.
    - Name: ${name}
    - Title: ${title}
    - Company: ${company}
    
    Example: "Driving innovation in fintech as a Senior Software Engineer at TechCorp."
    
    Generate a unique bio for the person described above.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating bio with Gemini API:", error);
    return "Failed to generate AI bio. Please check your connection or API key.";
  }
};
