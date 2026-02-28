
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getGeminiResponse = async (prompt: string, context: string = "") => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: Tu es un mentor expert en Adlam (langue Peul) et en Cybersécurité/Programmation. 
                 Aide l'utilisateur à comprendre ce qui suit en français.
                 Question/Prompt: ${prompt}
                 Informations additionnelles: ${context}`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Une erreur est survenue lors de la communication avec l'IA. Vérifiez votre connexion.";
  }
};

export const explainCode = async (code: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Explique ce code ligne par ligne pour un débutant, et s'il y a des vulnérabilités de sécurité, mentionne-les: \n\n${code}`,
    });
    return response.text;
  } catch (error) {
    return "Erreur lors de l'explication du code.";
  }
};
