import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set. AI features might be disabled.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function askOda(prompt: string, context?: any) {
  try {
    const fullPrompt = context 
      ? `Context: ${JSON.stringify(context)}\n\nUser: ${prompt}`
      : prompt;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: fullPrompt,
      config: {
        systemInstruction: `You are Oda, the AI travel agent and guide for Odyssey. 
        You are professional, well-traveled, insightful, and culturally aware. 
        Your tone is modest classical, sophisticated yet helpful.
        
        You can:
        1. Plan complex multi-stop trips.
        2. Handle elite tier requests for exclusive access.
        3. Provide deep cultural insights (social faux pas, dress codes).
        4. Lead audio tours based on GPS coordinates.
        5. Manage emergencies (embassies, medical aid).
        6. Recommend eco-friendly and locally-owned businesses.
        
        When providing itineraries, always consider transit times and logical flow.
        User price sensitivity is represented by 1-5 dollar signs.
        
        Always respond in the context of the Odyssey app architecture.`
      }
    });

    return response.text || "I am processing your request.";
  } catch (error) {
    console.error("Error calling Oda:", error);
    return "I apologize, but I am having trouble connecting to my global databases. Please try again momentarily.";
  }
}
