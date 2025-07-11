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

    // If OPENAI_API_KEY is not provided, use a simple rule-based response system
    if (!OPENAI_API_KEY || !OpenAIApi) {
      return {
        reply: this.generateBasicResponse(message.toLowerCase().trim())
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

  static generateBasicResponse(message) {
    // Simple rule-based responses for common banking queries
    if (message.includes('balance') || message.includes('account balance')) {
      return "You can check your account balance by visiting the Amount section in your dashboard. Your current balance is displayed there.";
    }
    
    if (message.includes('transfer') || message.includes('send money')) {
      return "To transfer money, go to the Transfer section in your dashboard. You can perform NEFT, RTGS, or IMPS transfers to other accounts.";
    }
    
    if (message.includes('atm') || message.includes('card')) {
      return "You can manage your ATM cards in the ATM Cards section. View your cards, check their status, and request new ones.";
    }
    
    if (message.includes('recharge') || message.includes('mobile') || message.includes('bill')) {
      return "For mobile recharges and bill payments, please visit the Mobile & Bills section in your dashboard.";
    }
    
    if (message.includes('kyc') || message.includes('verification')) {
      return "KYC verification is required to access all banking features. Please visit the KYC section to complete your verification.";
    }
    
    if (message.includes('help') || message.includes('support')) {
      return "I'm here to help! You can ask me about account balance, money transfers, ATM cards, mobile recharges, or KYC verification. What would you like to know?";
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Welcome to CBI Bank customer support. How can I assist you today? You can ask me about your account, transfers, cards, or any banking services.";
    }
    
    if (message.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with today?";
    }
    
    if (message.includes('bye') || message.includes('goodbye')) {
      return "Thank you for contacting CBI Bank! Have a great day and feel free to reach out if you need any assistance.";
    }
    
    // Default responses for unrecognized queries
    const defaultResponses = [
      "I understand you need help. Could you please be more specific about your banking query? I can assist with account balance, transfers, ATM cards, mobile recharges, or KYC verification.",
      "Thank you for your question. For specific account details or complex issues, please visit your nearest CBI Bank branch or call our customer service at 1800-XXX-XXXX.",
      "I'm here to help with your banking needs. Could you please rephrase your question? I can provide information about our services like account management, transfers, and card services.",
      "For the best assistance, please let me know what banking service you need help with. I can guide you through our digital banking features.",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
}

module.exports = SupportService;