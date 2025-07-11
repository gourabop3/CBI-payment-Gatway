const ApiError = require("../utils/ApiError");

let OpenAIApi, Configuration;
try {
  ({ OpenAIApi, Configuration } = require("openai"));
} catch (_) {
  // openai not installed yet – will be added to package.json
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

class SupportService {
  static async chat(message) {
    if (!message || message.trim() === "") {
      throw new ApiError(400, "Message is required");
    }

    // If OPENAI_API_KEY is not provided, return a canned response
    if (!OPENAI_API_KEY || !OpenAIApi) {
      return {
        reply:
          "Thank you for reaching out! Our support team will get back to you shortly regarding your query.",
      };
    }

    try {
      const openai = new OpenAIApi(new Configuration({ apiKey: OPENAI_API_KEY }));
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful customer support assistant for CBI Bank. Provide concise, friendly answers to banking-related queries. If the question is outside banking scope, politely decline.",
          },
          { role: "user", content: message },
        ],
        temperature: 0.4,
      });

      const reply = completion.choices?.[0]?.message?.content?.trim() ||
        "I'm sorry, I couldn't process that. Could you please rephrase?";

      return { reply };
    } catch (err) {
      console.error("OpenAI chat error", err);
      return {
        reply:
          "We're experiencing high load at the moment. Please try again later or contact support@cbibank.com.",
      };
    }
  }
}

module.exports = SupportService;