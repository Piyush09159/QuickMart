// components/ChatbotWidget.tsx
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react'; // Optional: replace with any icon
import Chatbot from './Chatbot';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white rounded-xl shadow-lg w-80 h-[450px] p-3 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
          <Chatbot />
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-md flex items-center justify-center"
        >
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
