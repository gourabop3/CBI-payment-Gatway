import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaTimes, FaComment, FaPaperPlane, FaUser } from 'react-icons/fa';
import { MdSmartToy } from 'react-icons/md';
import { axiosClient } from '@/utils/AxiosClient';
import { toast } from 'react-toastify';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && isFirstTime) {
      // Welcome message with creator credit
      const welcomeMessage = {
        id: Date.now(),
        text: "👋 Hello! I'm your CBI Bank Assistant.\n\n💡 **Created By Gourab**\n\nI can help you with:\n• Account information\n• Transaction queries\n• Banking services\n• Payment assistance\n• General banking questions\n\nHow can I assist you today?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      setIsFirstTime(false);
    }
  }, [isOpen, isFirstTime]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axiosClient.post('/chatbot/chat', {
        message: inputMessage
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: "I apologize, but I'm having trouble connecting right now. Please try again later or contact customer support.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      toast.error('Chatbot service unavailable');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setIsFirstTime(true);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 animate-pulse"
        >
          <FaComment className="text-xl" />
        </button>
        <div className="absolute -top-12 -left-20 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 hover:opacity-100 transition-opacity">
          Bank Assistant
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-96 h-[500px] flex flex-col border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <MdSmartToy className="text-xl" />
            </div>
            <div>
              <h3 className="font-semibold">CBI Bank Assistant</h3>
              <p className="text-xs opacity-90">Always here to help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className="text-white/70 hover:text-white p-1 rounded transition-colors"
              title="Clear Chat"
            >
              <FaRobot className="text-sm" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1 rounded transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm border'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.text}
                  </div>
                  <div className={`text-xs mt-1 opacity-70 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
              <div className={`flex items-end ${message.sender === 'user' ? 'order-1 mr-2' : 'order-2 ml-2'}`}>
                {message.sender === 'user' ? (
                  <div className="bg-blue-600 text-white p-1 rounded-full">
                    <FaUser className="text-xs" />
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-1 rounded-full">
                    <FaRobot className="text-xs" />
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 p-3 rounded-2xl rounded-bl-md shadow-sm border">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-xs text-gray-500">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about banking services..."
              className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200"
            >
              <FaPaperPlane className="text-sm" />
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            🔒 Secure • Banking queries only • Created By Gourab
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;