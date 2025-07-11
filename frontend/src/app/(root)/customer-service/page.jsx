"use client";
import { useState, useRef, useEffect } from 'react';
import { axiosClient } from '@/utils/AxiosClient';
import { toast } from 'react-toastify';
import { AiOutlineRobot, AiOutlineSend, AiOutlineUser } from 'react-icons/ai';
import { MdSupportAgent, MdHelp, MdAccountBalance, MdCreditCard, MdPhoneAndroid, MdTransferWithinAStation } from 'react-icons/md';
import { FaRobot, FaShieldAlt, FaClock } from 'react-icons/fa';
import HeaderName from '@/components/HeaderName';

export default function CustomerServicePage() {
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: 'Hello! I\'m CBI Assistant, your intelligent banking chatbot created by Gourab. I\'m here to help you 24/7 with all your banking needs. How can I assist you today?',
      timestamp: new Date()
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const quickActions = [
    { text: 'Check Account Balance', icon: MdAccountBalance },
    { text: 'Transfer Money', icon: MdTransferWithinAStation },
    { text: 'ATM Card Help', icon: MdCreditCard },
    { text: 'Mobile Recharge', icon: MdPhoneAndroid },
    { text: 'KYC Verification', icon: MdHelp },
    { text: 'Customer Support', icon: MdSupportAgent }
  ];

  const sendMessage = async (messageText = null) => {
    const userMessage = messageText || input.trim();
    if (!userMessage) return;
    
    const newMessage = { 
      sender: 'user', 
      text: userMessage,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const res = await axiosClient.post(
        '/support/chat',
        { message: userMessage },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      const data = await res.data;
      
      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          sender: 'bot', 
          text: data.reply,
          timestamp: new Date()
        }]);
        setLoading(false);
      }, 1000); // Add realistic typing delay
      
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Connection error. Please try again.');
      setMessages((prev) => [...prev, { 
        sender: 'bot', 
        text: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment or contact our support team at 1800-123-4567.',
        timestamp: new Date()
      }]);
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container py-6 md:py-10 px-4 md:px-6">
        <HeaderName />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 md:p-8 text-white mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white bg-opacity-20 p-3 rounded-xl">
              <FaRobot className="text-2xl md:text-3xl" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">CBI Assistant</h2>
              <p className="text-blue-100">Intelligent Banking Chatbot • Created by Gourab</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaClock className="text-xl" />
                <span className="text-sm opacity-90">Availability</span>
              </div>
              <div className="text-lg font-semibold">24/7 Support</div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <FaShieldAlt className="text-xl" />
                <span className="text-sm opacity-90">Security</span>
              </div>
              <div className="text-lg font-semibold">Bank-Grade</div>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <AiOutlineRobot className="text-xl" />
                <span className="text-sm opacity-90">AI Powered</span>
              </div>
              <div className="text-lg font-semibold">Smart Assistant</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => sendMessage(action.text)}
                  className="flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  <IconComponent className="text-xl" />
                  <span className="text-xs font-medium text-center">{action.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Container */}
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
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Online • Developed by Gourab
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-96 overflow-y-auto bg-gray-50 p-6 space-y-4">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gradient-to-br from-green-500 to-teal-500 text-white'
                }`}>
                  {message.sender === 'user' ? (
                    <AiOutlineUser className="text-sm" />
                  ) : (
                    <FaRobot className="text-sm" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-md ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}>
                  <div className={`inline-block px-4 py-3 rounded-2xl shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.text}
                    </p>
                  </div>
                  <p className={`text-xs text-gray-500 mt-1 ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {loading && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 text-white flex items-center justify-center">
                  <FaRobot className="text-sm" />
                </div>
                <div className="bg-white rounded-2xl rounded-bl-sm border border-gray-200 px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={bottomRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  rows={1}
                  placeholder="Type your banking question here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{ maxHeight: '100px' }}
                />
              </div>
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-3 rounded-xl transition-colors duration-300 transform hover:scale-105 disabled:transform-none"
              >
                <AiOutlineSend className="text-lg" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaRobot className="text-blue-600" />
              <span className="font-semibold text-gray-800">CBI Assistant</span>
            </div>
            <p className="text-sm text-gray-600">
              Intelligent Banking Chatbot developed by <span className="font-semibold text-blue-600">Gourab</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Powered by AI • Available 24/7 • Secure & Confidential
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}