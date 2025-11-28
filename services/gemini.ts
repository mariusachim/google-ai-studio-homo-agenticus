import { GoogleGenAI } from "@google/genai";
import { awsServicesData } from "../data/services";

// Flatten the service data for the context prompt
const getServiceListContext = () => {
  const services: string[] = [];
  const traverse = (node: any) => {
    if (node.children && node.children.length > 0) {
      node.children.forEach(traverse);
    } else {
      services.push(`${node.name}: ${node.description} (Category: ${node.category})`);
    }
  };
  traverse(awsServicesData);
  return services.join("\n");
};

const SYSTEM_INSTRUCTION = `You are an intelligent assistant. 
Your goal is to help users select the right option from the provided list based on their needs.
You have access to the following list:

${getServiceListContext()}

When a user describes their situation or feeling:
1. Analyze their input.
2. Recommend the best 1-3 options from the list.
3. Briefly explain WHY each option is a good fit.
4. Keep answers concise and helpful.`;

let aiClient: GoogleGenAI | null = null;

export const getGeminiResponse = async (userPrompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Error: API Key is missing. Please check your environment configuration.";
  }

  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  try {
    const response = await aiClient.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error communicating with the AI service.";
  }
};