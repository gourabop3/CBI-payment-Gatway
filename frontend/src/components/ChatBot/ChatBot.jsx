"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  FaComments, 
  FaTimes, 
  FaPaperPlane, 
  FaRobot, 
  FaUser, 
  FaMinus,
  FaExpand,
  FaVolumeUp,
  FaVolumeMute
} from 'react-icons/fa';
import { axiosClient } from '@/utils/AxiosClient';
import { toast } from 'react-toastify';
import { useMainContext } from '@/context/MainContext';

const ChatBot = () => {
  const { user } = useMainContext(); // Get user context
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: user 
        ? `👋 Hello ${user.fullName || 'there'}! I'm CBI Assistant, created by Gourab to provide you personalized banking support. How can I assist you today?`
        : "👋 Hello! I'm CBI Assistant, created by Gourab to help you with all your banking needs. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      chatInputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Play notification sound
  const playNotificationSound = () => {
    if (isSoundEnabled) {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmYbBSV2x/DDeSYBIWS+7diJNggOdLDm8KdhGgU9k9n1unAcBSDUj+3xvmcaBSdyyO/Ack0CCGe+5+OXRQwNVKnn7q5WFApDnN/0v2EcBSJ2yO/AdckQCUmnzeq5Yi8ENo7U8MV4JgEcYrvs37pkHAU8ldjz1X4vAiRuwOjaqVQNCU+o3+2wXggHU6jcyqpKFgtBmt3zw2IcBSl0yO/AeSYEG0q25d6sZRsEPpfW8sZ+JgEjdMfrp1kPC0ml3OioWAwGWKfdyp1BGAsGWKXc1LJjFghNod3twmYcBSdzzO/BciUELIHO8tiJOQcZZ7zq55hMEAxSpuPwtmMcBjiS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGnt/0wGEcBSRwx+7NeCkEBUmq5OWaSRQQUaXe763DIgU8k9n1unAcBSDTku3xvWYaBSdyyO7AcUwCCGe86OOXRQwNVKnn7a5WFApDnN/0wGIbBSN2yO7AecgQCUqjzeu5YS8EM47U8MV4JgEcYrvs37pkHAU8ldjzw34vAiRuwOjaqVQNCU+o3+2wXggHU6jcyqpKFgtBmt3zw2IcBSl0yO7AeSYEG0q25d6sZRsEPpfW8sZ+JgEjdMfrp1kPC0ml3OioWAwGWKfdyp1BGAsGWKXc1LJjFghNod3twmYcBSdzzO7BciUELIHO8tiJOQcZZ7zq55hMEAxSpuPwtmMcBjiS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGnt/0wGEcBSRwx+7NeCkBBUmq5OWaSRQJUaXe765DaFQCBSdzyO/BciUELIHO8tiJOQcZZ7zq55hMEAxSpe'); 
      audio.volume = 0.3;
      audio.play().catch(() => {}); // Ignore errors if audio can't play
    }
  };

  // Quick reply suggestions based on user authentication
  const quickReplies = user ? [
    "Check my account balance",
    "How to transfer money?",
    "My ATM card services",
    "Mobile recharge",
    "My KYC status",
    "Contact developer"
  ] : [
    "How does banking work?",
    "What services do you offer?",
    "How to open an account?",
    "ATM card information",
    "About CBI Bank",
    "Contact developer"
  ];

  // Handle sending message
  const handleSendMessage = async (messageText = message) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      // Use authenticated endpoint if user is logged in, otherwise use public endpoint
      const endpoint = user ? '/support/chat' : '/support/chat/public';
      const response = await axiosClient.post(endpoint, {
        message: messageText
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.reply,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
      playNotificationSound();
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm experiencing some technical difficulties. Please try again in a moment or contact our support team.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle quick reply
  const handleQuickReply = (reply) => {
    handleSendMessage(reply);
  };

  // Clear chat
  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: user 
          ? `👋 Hello ${user.fullName || 'there'}! I'm CBI Assistant, created by Gourab to provide you personalized banking support. How can I assist you today?`
          : "👋 Hello! I'm CBI Assistant, created by Gourab to help you with all your banking needs. How can I assist you today?",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse"
          >
            <FaComments className="text-2xl" />
            
            {/* Notification Badge */}
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
              {user ? '💬' : '1'}
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {user 
                ? `Chat with your CBI Assistant` 
                : 'Chat with CBI Assistant'
              }
            </div>
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        }`}>
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <FaRobot className="text-2xl" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold text-lg">CBI Assistant</h3>
                <p className="text-xs text-blue-100">
                  {user 
                    ? `Hello ${user.fullName?.split(' ')[0] || 'User'} • Created by Gourab • Online`
                    : 'Created by Gourab • Online'
                  }
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title={isSoundEnabled ? "Disable sound" : "Enable sound"}
              >
                {isSoundEnabled ? <FaVolumeUp className="text-sm" /> : <FaVolumeMute className="text-sm" />}
              </button>
              
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? <FaExpand className="text-sm" /> : <FaMinus className="text-sm" />}
              </button>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Close chat"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>
          </div>

          {/* Chat Body - Only show when not minimized */}
          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96 bg-gray-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    }`}>
                      {msg.sender === 'user' ? <FaUser className="text-xs" /> : <FaRobot className="text-xs" />}
                    </div>
                    
                    {/* Message Bubble */}
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                      <p className={`text-xs mt-2 ${
                        msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center justify-center">
                      <FaRobot className="text-xs" />
                    </div>
                    <div className="bg-white text-gray-800 border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              {messages.length <= 1 && (
                <div className="px-4 py-2 border-t border-gray-200 bg-white">
                  <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors border border-blue-200"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                <div className="flex gap-2">
                  <input
                    ref={chatInputRef}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your banking question..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !message.trim()}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <FaPaperPlane className="text-sm" />
                  </button>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                  <span>Press Enter to send</span>
                  <button
                    onClick={clearChat}
                    className="hover:text-blue-600 transition-colors"
                  >
                    Clear chat
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;