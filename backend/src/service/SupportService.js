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

    // If OPENAI_API_KEY is not provided, use enhanced rule-based response system
    if (!OPENAI_API_KEY || !OpenAIApi) {
      return {
        reply: this.generateBankingResponse(message.toLowerCase().trim())
      };
    }

    try {
      const openai = new OpenAIApi(new Configuration({ apiKey: OPENAI_API_KEY }));
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are CBI Assistant, a helpful and intelligent customer support chatbot for Central Bank of India, created by Gourab. 

            Your responsibilities:
            - Provide accurate information about CBI Bank's digital banking services
            - Help customers with account management, transfers, ATM cards, mobile recharges, and KYC
            - Always be polite, professional, and solution-oriented
            - For complex issues, guide users to appropriate sections in their dashboard or suggest contacting branch
            - Occasionally mention that you were developed by Gourab when appropriate
            - Ensure responses are helpful and banking-focused
            
            Available services to help with:
            - Account Balance & Management
            - Money Transfers (NEFT, RTGS, IMPS)
            - ATM/Debit Card Services
            - Mobile Recharge & Bill Payments
            - KYC Verification
            - Transaction History
            - General Banking Queries

            If the question is outside banking scope, politely decline and redirect to banking topics.`,
          },
          { role: "user", content: message },
        ],
        temperature: 0.4,
        max_tokens: 200,
      });

      const reply = completion.choices?.[0]?.message?.content?.trim() ||
        "I'm sorry, I couldn't process that. Could you please rephrase your banking question?";

      return { reply };
    } catch (err) {
      console.error("OpenAI chat error", err);
      return {
        reply: "I'm experiencing high traffic right now. Let me help you with our standard banking services. What would you like to know about?",
      };
    }
  }

  static generateBankingResponse(message) {
    // Enhanced rule-based responses for comprehensive banking support
    
    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon') || message.includes('good evening')) {
      const greetings = [
        "Hello! Welcome to CBI Bank digital support. I'm your AI assistant created by Gourab. How can I help you with your banking needs today?",
        "Hi there! I'm CBI Assistant, developed by Gourab to help you with all your banking queries. What would you like to know?",
        "Greetings! I'm here to assist you with Central Bank of India services. How may I help you today?",
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Account Balance queries
    if (message.includes('balance') || message.includes('account balance') || message.includes('check balance')) {
      return "To check your account balance:\n\n1. Visit the 'Account' section in your dashboard\n2. Your current balance is displayed on your account cards\n3. You can also view detailed balance for each account type\n\nFor real-time balance, you can also use our mobile app or visit any CBI ATM. Is there anything specific about your account balance you'd like to know?";
    }

    // Money Transfer queries
    if (message.includes('transfer') || message.includes('send money') || message.includes('neft') || message.includes('rtgs') || message.includes('imps')) {
      return "CBI Bank offers multiple transfer options:\n\n💰 **IMPS** - Instant transfers (24/7)\n💰 **NEFT** - 2-4 hours processing\n💰 **RTGS** - Real-time (Min ₹2,00,000)\n\nTo transfer money:\n1. Go to 'Transfer' section\n2. Enter recipient account details\n3. Verify recipient information\n4. Enter amount and confirm\n\nAll transfers are secured with bank-grade encryption. Need help with a specific transfer type?";
    }

    // ATM Card queries
    if (message.includes('atm') || message.includes('card') || message.includes('debit card') || message.includes('blocked card')) {
      return "ATM/Debit Card Services:\n\n🏧 **Card Management**\n- View your card details\n- Check card status\n- Request new cards\n- Block/unblock cards\n\n🔒 **Security Features**\n- Contactless payments\n- Real-time transaction alerts\n- 24/7 fraud monitoring\n\nVisit the 'ATM Cards' section in your dashboard to manage your cards. For immediate card blocking, call our helpline: 1800-123-4567";
    }

    // Mobile Recharge & Bill Payment
    if (message.includes('recharge') || message.includes('mobile') || message.includes('bill') || message.includes('electricity') || message.includes('prepaid') || message.includes('postpaid')) {
      return "Mobile Recharge & Bill Payment Services:\n\n📱 **Mobile Recharge**\n- All major operators (Jio, Airtel, Vi)\n- Instant processing\n- Best recharge plans\n\n💡 **Bill Payments**\n- Electricity bills\n- Water bills\n- Gas bills\n- Credit card bills\n- DTH/Cable TV\n\nVisit 'Mobile & Bills' section for quick payments. All transactions are secure and get instant confirmation!";
    }

    // KYC Verification
    if (message.includes('kyc') || message.includes('verification') || message.includes('documents') || message.includes('identity')) {
      return "KYC (Know Your Customer) Verification:\n\n📋 **Required Documents**\n- Government ID (Aadhaar/PAN/Passport)\n- Address proof\n- Recent photograph\n\n✅ **Benefits of KYC**\n- Full access to banking features\n- Higher transaction limits\n- Enhanced security\n\n📱 **Complete KYC**\nVisit the 'KYC' section in your dashboard to upload documents securely. Processing usually takes 24-48 hours.";
    }

    // Transaction History
    if (message.includes('transaction') || message.includes('history') || message.includes('statement') || message.includes('passbook')) {
      return "Transaction History & Statements:\n\n📊 **View Transactions**\n- Visit 'Transactions' section\n- Filter by date, type, or amount\n- Download statements\n\n📈 **Available Records**\n- Money transfers\n- Mobile recharges\n- Bill payments\n- ATM withdrawals\n- Account deposits\n\nAll transactions are categorized and searchable. You can download monthly/quarterly statements as PDF.";
    }

    // API Keys (for developers)
    if (message.includes('api') || message.includes('integration') || message.includes('developer') || message.includes('api key')) {
      return "Developer API Services:\n\n🔑 **API Keys Management**\n- Generate secure API credentials\n- View API documentation\n- Monitor usage statistics\n\n🛡️ **Security Features**\n- Enterprise-grade encryption\n- Rate limiting\n- Real-time monitoring\n\nVisit 'API Keys' section for developer resources. All APIs follow industry security standards.";
    }

    // Customer Support & Help
    if (message.includes('help') || message.includes('support') || message.includes('problem') || message.includes('issue') || message.includes('contact')) {
      return "CBI Bank Customer Support:\n\n🎧 **24/7 Support Channels**\n- This AI chatbot (created by Gourab)\n- Phone: 1800-123-4567\n- Email: support@cbibank.com\n- Visit nearest branch\n\n💬 **I can help with:**\n- Account balance & management\n- Money transfers\n- ATM card services\n- Mobile recharge & bills\n- KYC verification\n- General banking queries\n\nWhat specific banking service do you need assistance with?";
    }

    // Interest rates & Loan information
    if (message.includes('interest') || message.includes('loan') || message.includes('rate') || message.includes('fd') || message.includes('fixed deposit')) {
      return "Banking Products & Rates:\n\n💰 **Fixed Deposits**\n- Competitive interest rates\n- Flexible tenure options\n- Online FD booking\n\n🏠 **Loan Services**\n- Home loans\n- Personal loans\n- Business loans\n- Education loans\n\nFor current interest rates and loan eligibility, please visit your nearest CBI branch or call 1800-123-4567. Our loan officers will assist you with detailed information.";
    }

    // Security & Safety
    if (message.includes('security') || message.includes('safe') || message.includes('fraud') || message.includes('phishing') || message.includes('otp')) {
      return "Banking Security & Safety:\n\n🔐 **Security Measures**\n- Two-factor authentication\n- OTP verification\n- Session timeout\n- Real-time alerts\n\n⚠️ **Safety Tips**\n- Never share OTP/PIN with anyone\n- Always logout after banking\n- Use official CBI website/app only\n- Report suspicious activities immediately\n\n🚨 **Report Fraud**\nCall: 1800-123-4567 (24/7 helpline)";
    }

    // Branch & ATM locator
    if (message.includes('branch') || message.includes('atm') || message.includes('location') || message.includes('near me') || message.includes('address')) {
      return "Branch & ATM Locator:\n\n🏦 **Find Nearest Branch/ATM**\n- Use our website branch locator\n- Google Maps integration\n- Filter by services available\n\n⏰ **Branch Timings**\n- Monday-Friday: 10 AM - 4 PM\n- Saturday: 10 AM - 2 PM\n- ATMs: 24/7 available\n\n📍 For specific locations, please visit our website or call 1800-123-4567";
    }

    // About the bot creator
    if (message.includes('gourab') || message.includes('creator') || message.includes('developer') || message.includes('who made you') || message.includes('who created')) {
      return "👨‍💻 **About My Creator**\n\nI'm CBI Assistant, an intelligent banking chatbot developed by **Gourab**. I was designed to help CBI Bank customers with their banking needs 24/7.\n\n🎯 **My Purpose**\n- Provide instant banking support\n- Guide customers through digital services\n- Offer quick solutions to common queries\n\nGourab created me to make banking more accessible and user-friendly for everyone. How can I assist you with your banking needs today?";
    }

    // Thank you responses
    if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate')) {
      const thankYouResponses = [
        "You're most welcome! I'm glad I could help. Remember, I'm available 24/7 for all your banking needs. Developed by Gourab to serve you better! 😊",
        "Happy to help! If you have any other banking questions, feel free to ask. I'm here whenever you need assistance with CBI Bank services.",
        "You're welcome! It's my pleasure to assist CBI Bank customers. Is there anything else you'd like to know about our banking services?",
      ];
      return thankYouResponses[Math.floor(Math.random() * thankYouResponses.length)];
    }

    // Goodbye responses
    if (message.includes('bye') || message.includes('goodbye') || message.includes('see you') || message.includes('exit')) {
      const goodbyeResponses = [
        "Thank you for banking with CBI! Have a wonderful day and remember, I'm here 24/7 whenever you need banking assistance. Created by Gourab to serve you better! 👋",
        "Goodbye! It was great helping you today. Feel free to return anytime for banking support. Have a great day! 🌟",
        "Take care! Remember, your CBI Assistant is always available for banking help. Wishing you a pleasant day ahead! 💫",
      ];
      return goodbyeResponses[Math.floor(Math.random() * goodbyeResponses.length)];
    }

    // Complaint or feedback
    if (message.includes('complaint') || message.includes('feedback') || message.includes('suggestion') || message.includes('improve')) {
      return "Your Feedback Matters:\n\n📝 **Submit Feedback**\n- Online feedback form\n- Customer care: 1800-123-4567\n- Email: feedback@cbibank.com\n- Visit branch manager\n\n🔄 **We Value**\n- Your suggestions for improvement\n- Service quality feedback\n- Digital banking experience\n\nAs an AI assistant created by Gourab, I'm constantly learning to serve you better. Your feedback helps improve banking services!";
    }

    // General banking terms
    if (message.includes('bank') || message.includes('banking') || message.includes('service') || message.includes('cbi')) {
      return "Central Bank of India Digital Banking:\n\n🏦 **Our Services**\n- Account management\n- Money transfers\n- ATM/Card services\n- Mobile recharge & bills\n- KYC verification\n- API services for developers\n\n🤖 **About Me**\nI'm your AI banking assistant, created by Gourab to provide 24/7 support for all CBI Bank services.\n\nWhat specific banking service can I help you with today?";
    }

    // Error handling and default responses
    const defaultResponses = [
      "I'd be happy to help with your banking query! Could you please be more specific? I can assist with:\n\n• Account balance\n• Money transfers\n• ATM card services\n• Mobile recharge & bills\n• KYC verification\n• General banking questions",
      
      "I'm here to help with CBI Bank services! As an AI assistant created by Gourab, I can provide information about:\n\n✓ Digital banking features\n✓ Account management\n✓ Transaction services\n✓ Customer support\n\nWhat would you like to know?",
      
      "Thank you for your question! For the best assistance with specific account details or complex banking matters, I recommend:\n\n📞 Calling our customer care: 1800-123-4567\n🏦 Visiting your nearest CBI branch\n💻 Using the specific section in your dashboard\n\nI can help with general banking information and guide you to the right resources!",
      
      "I understand you need banking assistance. Could you please rephrase your question? I'm programmed to help with:\n\n🏧 Account services\n💸 Transfer operations\n📱 Mobile banking\n🔐 Security queries\n📊 Transaction history\n\nWhat specific service do you need help with?",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
}

module.exports = SupportService;