
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useToast } from './ui/use-toast';
import { ChatProps, Message } from '../types/chat';
import { generateResponse } from '../utils/responseGenerator';
import ChatMessage from './chat/ChatMessage';
import ChatSuggestions from './chat/ChatSuggestions';
import ChatInput from './chat/ChatInput';

const CarLLMChat: React.FC<ChatProps> = ({ car }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    // Simulate network delay for AI response
    setTimeout(() => {
      try {
        const aiResponse = generateResponse(inputMessage, car);
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          sender: 'ai',
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error('Error generating response:', error);
        toast({
          title: "Error",
          description: "Failed to generate a response. Please try again.",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl overflow-hidden">
      <div className="p-4 bg-jdm-red/90 text-white font-medium flex items-center justify-between">
        <span>JDM Car Assistant</span>
        <small className="text-white/70 text-xs">Ask about the {car.manufacturer} {car.name}</small>
      </div>
      
      <div className="h-[320px] overflow-y-auto p-4 bg-white/10 backdrop-blur-md">
        {messages.length === 0 ? (
          <ChatSuggestions car={car} onSuggestionClick={handleSuggestionClick} />
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <ChatInput 
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default CarLLMChat;
