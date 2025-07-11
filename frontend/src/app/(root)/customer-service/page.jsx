"use client";
import { useState, useRef, useEffect } from "react";
import { axiosClient } from "@/utils/AxiosClient";
import { toast } from "react-toastify";
import {
  AiOutlineSend,
  AiOutlineUser
} from "react-icons/ai";
import {
  MdSupportAgent,
  MdHelp,
  MdAccountBalance,
  MdCreditCard,
  MdPhoneAndroid,
  MdTransferWithinAStation
} from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import HeaderName from "@/components/HeaderName";

export default function CustomerServicePage() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "Hello! I'm CBI Assistant, your intelligent banking chatbot created by Gourab. I'm here to help you 24/7 with all your banking needs.\n\n👨‍💻 Developer: Gourab | Email: gourabmop@gmail.com | Mobile: +91 9263839602 | West Bengal, India\n\nI can assist you with account balance, money transfers, ATM cards, mobile recharge, KYC verification, and much more. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const quickActions = [
    { text: "Check Account Balance", icon: MdAccountBalance },
    { text: "Transfer Money", icon: MdTransferWithinAStation },
    { text: "ATM Card Help", icon: MdCreditCard },
    { text: "Mobile Recharge", icon: MdPhoneAndroid },
    { text: "KYC Verification", icon: MdHelp },
    { text: "Developer Details", icon: AiOutlineUser },
    { text: "Customer Support", icon: MdSupportAgent }
  ];

  const sendMessage = async (messageText = null) => {
    const userMessage = messageText || input.trim();
    if (!userMessage) return;

    const newMessage = {
      sender: "user",
      text: userMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axiosClient.post(
        "/support/chat",
        { message: userMessage },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );
      const data = await res.data;

      // simulate typing delay
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            sender: "bot",
            text: data.reply,
            timestamp: new Date()
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      toast.error(
        err.response?.data?.msg || "Connection error. Please try again."
      );
      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text:
            "I apologize, but I'm experiencing technical difficulties. Please try again in a moment or contact our support team at 1800-123-4567.",
          timestamp: new Date()
        }
      ]);
      setLoading(false);
    }
  };

  /* auto-scroll on new messages */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const onKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = ts =>
    ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container py-6 md:py-10 px-4 md:px-6">
        <HeaderName />

        {/* -------- Quick Actions -------- */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => sendMessage(action.text)}
                  className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Icon className="text-xl" />
                  <span className="text-xs font-medium text-center">
                    {action.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* -------- Chat Container -------- */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <MdSupportAgent className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Live Chat Support</h3>
                <p className="text-blue-100 text-sm">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2" />
                  Online • Developed by Gourab
                </p>
                <p className="text-blue-200 text-xs">
                  📧 gourabmop@gmail.com • 📱 +91 9263839602 • 📍 West Bengal
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto bg-gray-50 p-6 space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 ${
                  m.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gradient-to-br from-green-500 to-teal-500 text-white"
                  }`}
                >
                  {m.sender === "user" ? (
                    <AiOutlineUser className="text-sm" />
                  ) : (
                    <FaRobot className="text-sm" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-md ${
                    m.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-3 rounded-2xl shadow-sm ${
                      m.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm border border-gray-200"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {m.text}
                    </p>
                  </div>
                  <p
                    className={`text-xs text-gray-500 mt-1 ${
                      m.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {formatTime(m.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 text-white flex items-center justify-center">
                  <FaRobot className="text-sm" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-sm border border-gray-200 px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-end gap-3">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                placeholder="Type your banking question here..."
                className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ maxHeight: "100px" }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-3 rounded-xl transition-colors duration-300 transform hover:scale-105 disabled:transform-none"
              >
                <AiOutlineSend className="text-lg" />
              </button>
            </div>
          </div>

          {/* Chat Footer with Developer Info */}
          <div className="bg-gray-50 border-t border-gray-200 px-6 py-3">
            <div className="text-center">
              <p className="text-xs text-gray-600">
                🤖 CBI Assistant - Developed with ❤️ by{" "}
                <span className="font-semibold text-blue-600">Gourab</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                For technical support: gourabmop@gmail.com | +91 9263839602 | West Bengal, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}