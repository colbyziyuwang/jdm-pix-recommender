
import React from 'react';
import { Bot } from 'lucide-react';
import { Button } from '../ui/button';
import { CarInfo } from '../../types/car';

interface ChatSuggestionsProps {
  car: CarInfo;
  onSuggestionClick: (suggestion: string) => void;
}

const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({ car, onSuggestionClick }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-white/70">
      <Bot size={32} className="mb-3 text-jdm-red" />
      <p className="mb-2 font-medium">JDM Car Assistant</p>
      <p className="text-sm">Ask me anything about the {car.manufacturer} {car.name}!</p>
      <div className="mt-4 grid grid-cols-2 gap-2 w-full max-w-sm">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs justify-start h-auto py-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
          onClick={() => onSuggestionClick(`Tell me about the engine in the ${car.name}`)}
        >
          Engine specs?
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs justify-start h-auto py-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
          onClick={() => onSuggestionClick(`How fast is the ${car.name}?`)}
        >
          Performance?
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs justify-start h-auto py-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
          onClick={() => onSuggestionClick(`When was the ${car.name} produced?`)}
        >
          Production years?
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs justify-start h-auto py-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
          onClick={() => onSuggestionClick(`Where can I buy a ${car.name}?`)}
        >
          Where to buy?
        </Button>
      </div>
    </div>
  );
};

export default ChatSuggestions;
