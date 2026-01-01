import OpenAI from "openai";

const classifySeverity = async (description) => {
  try {
    if (!process.env.OPENAI_API_KEY) return "medium";

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Classify as low, medium, or high." },
        { role: "user", content: description },
      ],
      temperature: 0,
      max_tokens: 5,
    });

    const result = response.choices[0].message.content.trim().toLowerCase();
    return ["low", "medium", "high"].includes(result) ? result : "medium";
  } catch {
    return "medium";
  }
};

export default classifySeverity;
