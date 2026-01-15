import { GoogleGenAI } from "@google/genai";
import { MagicType } from '../types';

// Initialize Gemini
// Note: In a real production app, ensure strict server-side proxying if possible, 
// but for this SPA demo we use the env key directly as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const transformToNotes = async (content: string): Promise<string> => {
  if (!process.env.API_KEY) return "Error: API Key missing.";

  const prompt = `
    You are an expert analyst assistant. 
    Transform the following raw text into a well-organized Markdown note.
    
    CRITICAL RULE: Identify key entities, dates, and important terms. 
    Wrap these keywords strictly with bold asterisks like **keyword**.
    Do NOT use HTML colors in the output, only standard Markdown bold.
    
    Structure:
    - # Executive Summary
    - ## Key Findings
    - ## Actionable Items
    - ## Raw Data Context

    Input: ${content}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error processing notes. Please try again.";
  }
};

export const runAiMagic = async (content: string, type: MagicType): Promise<string> => {
  if (!process.env.API_KEY) return "Error: API Key missing.";

  let systemInstruction = "";
  switch (type) {
    case 'SUMMARIZE': systemInstruction = "Summarize the following text in 3 bullet points."; break;
    case 'ACTION_ITEMS': systemInstruction = "Extract a checklist of action items from the text."; break;
    case 'CRITIQUE': systemInstruction = "Critique this text for clarity and logic. Be harsh but constructive."; break;
    case 'POETIFY': systemInstruction = "Rewrite the text as a Shakespearean sonnet."; break;
    case 'ELI5': systemInstruction = "Explain this text as if the reader is 5 years old."; break;
    case 'TRANSLATE_ZH': systemInstruction = "Translate the text into Traditional Chinese (Taiwan standard)."; break;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: content,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    return response.text || "No magic happened.";
  } catch (error) {
    console.error("Gemini Magic Error:", error);
    return "The magic fizzled out. Try again.";
  }
};