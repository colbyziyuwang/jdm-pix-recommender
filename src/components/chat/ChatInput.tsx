
import React from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  handleSendMessage: () => void;
  isLoading: boolean;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isLoading,
  handleKeyDown
}) => {
  return (
    <div className="p-3 border-t border-white/10 bg-black/30">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Ask about this car model..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="bg-white/10 border-white/20 text-black placeholder:text-black/50"
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
  );
};

export default ChatInput;
