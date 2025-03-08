
import React from 'react';
import { User, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { Message } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[80%] flex gap-2 items-start ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          message.sender === 'user' ? 'bg-jdm-red/20' : 'bg-white/20'
        }`}>
          {message.sender === 'user' ? (
            <User size={14} className="text-white" />
          ) : (
            <Bot size={14} className="text-white" />
          )}
        </div>
        <div className={`rounded-2xl px-4 py-2 ${
          message.sender === 'user' 
            ? 'bg-jdm-red text-white rounded-tr-none' 
            : 'bg-white/20 text-white rounded-tl-none'
        }`}>
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
