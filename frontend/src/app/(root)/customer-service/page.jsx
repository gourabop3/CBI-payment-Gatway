"use client";
import { useState, useRef, useEffect } from 'react';
import { axiosClient } from '@/utils/AxiosClient';
import { toast } from 'react-toastify';
import { AiOutlineRobot } from 'react-icons/ai';
import HeaderName from '@/components/HeaderName';

export default function CustomerServicePage() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! I am CBI Bank assistant. How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
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
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      toast.error(err.response?.data?.msg || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="container py-10 flex flex-col h-[calc(100vh-80px)]">
      <HeaderName />
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <AiOutlineRobot /> Customer Service
      </h2>
      <div className="flex-1 overflow-y-auto bg-white shadow rounded-xl p-6 space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`max-w-lg whitespace-pre-wrap ${
              m.sender === 'user' ? 'ml-auto text-right' : 'mr-auto'
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg shadow text-sm ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="mt-4 flex items-center gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 border rounded-lg resize-none focus:ring-rose-500"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 transition text-white rounded-lg disabled:bg-gray-400"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}