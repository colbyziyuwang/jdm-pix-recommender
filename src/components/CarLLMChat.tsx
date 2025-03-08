
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { CarInfo } from '../types/car';

interface CarLLMChatProps {
  car: CarInfo;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const CarLLMChat: React.FC<CarLLMChatProps> = ({ car }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Simulate LLM response based on user query and car information
  const generateResponse = (question: string, carInfo: CarInfo): string => {
    // Convert question to lowercase for easier matching
    const lowerQuestion = question.toLowerCase();
    
    // Basic response templates based on question keywords
    if (lowerQuestion.includes('engine') || lowerQuestion.includes('motor')) {
      return `The ${carInfo.manufacturer} ${carInfo.name} features ${carInfo.engineInfo || 'an engine with specifications not currently in our database'}. This powerplant was designed to deliver both performance and reliability, characteristic of Japanese engineering.`;
    } 
    else if (lowerQuestion.includes('power') || lowerQuestion.includes('hp') || lowerQuestion.includes('horsepower')) {
      return `The ${carInfo.manufacturer} ${carInfo.name} produces ${carInfo.power || 'power output not specified in our database'}. This was impressive for its era and helped establish the car's reputation among enthusiasts.`;
    }
    else if (lowerQuestion.includes('speed') || lowerQuestion.includes('fast')) {
      return `The ${carInfo.manufacturer} ${carInfo.name} has a top speed of ${carInfo.topSpeed || 'a top speed not specified in our database'}. Its performance capabilities made it a standout in the Japanese Domestic Market.`;
    }
    else if (lowerQuestion.includes('acceleration') || lowerQuestion.includes('0-60') || lowerQuestion.includes('0 to 60')) {
      return `The ${carInfo.manufacturer} ${carInfo.name} accelerates from 0-60 mph in ${carInfo.acceleration || 'a time not specified in our database'}. This acceleration performance contributed to its popularity in both street and motorsport applications.`;
    }
    else if (lowerQuestion.includes('year') || lowerQuestion.includes('when')) {
      return `The ${carInfo.manufacturer} ${carInfo.name} was produced during ${carInfo.yearRange || 'years not specified in our database'}. This era was significant in the development of Japanese performance cars.`;
    }
    else if (lowerQuestion.includes('dealer') || lowerQuestion.includes('buy') || lowerQuestion.includes('purchase')) {
      const dealerCount = carInfo.dealers?.length || 0;
      return `There are ${dealerCount} dealers listed for the ${carInfo.manufacturer} ${carInfo.name}. You can use the "Find Nearby Dealers" feature to locate dealers in your area, or view the complete list in the dealers section.`;
    }
    else if (lowerQuestion.includes('manufacturer') || lowerQuestion.includes('brand') || lowerQuestion.includes('make')) {
      return `The ${carInfo.name} was manufactured by ${carInfo.manufacturer}, a company known for its ${carInfo.manufacturer === 'Nissan' ? 'innovation and performance engineering' : 
        carInfo.manufacturer === 'Toyota' ? 'reliability and quality craftsmanship' : 
        carInfo.manufacturer === 'Honda' ? 'engineering excellence and efficiency' : 
        carInfo.manufacturer === 'Mazda' ? 'rotary engine technology and driving dynamics' : 
        carInfo.manufacturer === 'Subaru' ? 'all-wheel drive systems and boxer engines' : 
        carInfo.manufacturer === 'Mitsubishi' ? 'rally-bred performance and advanced technology' : 
        'contribution to Japanese automotive excellence'}.`;
    }
    else if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
      return `Hello! I'm your JDM car assistant. Feel free to ask me anything about the ${carInfo.manufacturer} ${carInfo.name}, such as its engine specifications, performance figures, or production history.`;
    }
    else {
      // Default response when the question doesn't match predefined categories
      return `The ${carInfo.manufacturer} ${carInfo.name} is a celebrated JDM vehicle from the ${carInfo.yearRange || 'Japanese domestic market'}. If you have specific questions about its engine, performance, or history, feel free to ask!`;
    }
  };

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
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-white/70">
            <Bot size={32} className="mb-3 text-jdm-red" />
            <p className="mb-2 font-medium">JDM Car Assistant</p>
            <p className="text-sm">Ask me anything about the {car.manufacturer} {car.name}!</p>
            <div className="mt-4 grid grid-cols-2 gap-2 w-full max-w-sm">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs justify-start h-auto py-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
                onClick={() => setInputMessage(`Tell me about the engine in the ${car.name}`)}
              >
                Engine specs?
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs justify-start h-auto py-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
                onClick={() => setInputMessage(`How fast is the ${car.name}?`)}
              >
                Performance?
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs justify-start h-auto py-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
                onClick={() => setInputMessage(`When was the ${car.name} produced?`)}
              >
                Production years?
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs justify-start h-auto py-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
                onClick={() => setInputMessage(`Where can I buy a ${car.name}?`)}
              >
                Where to buy?
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
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
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <div className="p-3 border-t border-white/10 bg-black/30">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Ask about this car model..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isLoading || !inputMessage.trim()} 
            size="icon"
            className="bg-jdm-red hover:bg-jdm-red/80"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarLLMChat;
