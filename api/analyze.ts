import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { content, type } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a cybersecurity expert specializing in scam detection and fraud prevention.
      Analyze the following ${type || "message/content"} for potential scams, phishing, or fraud.
      
      Content to analyze:
      "${content}"
      
      Return a JSON response with the following format:
      {
        "riskLevel": "safe" | "suspicious" | "danger",
        "confidence": number (0-100),
        "analysis": "A detailed explanation of why it was flagged or why it is safe.",
        "redFlags": ["flag 1", "flag 2"],
        "recommendation": "What the user should do next."
      }
      
      Only return the JSON. No markdown formatting.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, "").trim();
    
    try {
      const jsonResponse = JSON.parse(text);
      return res.status(200).json(jsonResponse);
    } catch (parseError) {
      console.error("Parse Error:", text);
      return res.status(500).json({ error: "Failed to parse AI response", raw: text });
    }
  } catch (error: any) {
    console.error("AI Error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
}
