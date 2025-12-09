import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
// Note: In a real production app, ensure API_KEY is set in environment variables.
// The user will need to provide their own key via metadata/env or input (though input is restricted by guidelines, we assume env).
// Fallback logic is handled if key is missing to prevent crash, but functionality requires it.

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const refineWithStarMethod = async (
  role: string,
  content: string
): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Error: API Key missing.";

  const prompt = `
    Role: Professional Resume Consultant for Engineering Students.
    Task: Rewrite the following resume bullet point using the STAR method (Situation, Task, Action, Result).
    Context: The student was a ${role}.
    Original Content: "${content}"
    
    Requirements:
    1. Use professional engineering terminology (e.g., "Optimized", "Designed", "Implemented").
    2. Quantify results where possible (even if estimating based on context, e.g., "Improved efficiency by X%").
    3. Keep it concise (1-2 sentences).
    4. Return ONLY the rewritten text in Chinese.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini refinement failed:", error);
    return content; // Fallback to original
  }
};

export const polishContent = async (content: string): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Error: API Key missing.";

  const prompt = `
    Role: Resume Editor.
    Task: Polish and shorten the following resume text to be more professional and concise.
    Original Content: "${content}"
    
    Requirements:
    1. Keep the meaning but remove redundancy.
    2. Use professional phrasing suitable for a technical resume.
    3. Ensure it flows well.
    4. Return ONLY the rewritten text in Chinese.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini polish failed:", error);
    return content;
  }
};

export const suggestTechStack = async (description: string): Promise<string[]> => {
    const ai = getAiClient();
    if (!ai) return [];

    const prompt = `
      Extract relevant technical keywords (Tech Stack) from the following project description. 
      Return them as a JSON array of strings.
      Description: "${description}"
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      const json = JSON.parse(response.text.trim());
      return Array.isArray(json) ? json : [];
    } catch (error) {
      console.error("Tech extraction failed", error);
      return [];
    }
}