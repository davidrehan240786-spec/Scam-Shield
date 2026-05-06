import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { audioData, mimeType } = req.body;

  if (!audioData) {
    return res.status(400).json({ error: "Audio data is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Transcribe this audio and analyze it for potential scam or fraudulent activity. Return a JSON response with the following format: { \"transcription\": \"...\", \"riskLevel\": \"safe\" | \"suspicious\" | \"danger\", \"analysis\": \"...\", \"recommendation\": \"...\" } Only return the JSON. No markdown formatting.";

    const result = await model.generateContent([
      {
        inlineData: {
          data: audioData,
          mimeType: mimeType || "audio/mpeg"
        }
      },
      { text: prompt }
    ]);

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
