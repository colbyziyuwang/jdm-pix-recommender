
import { CarInfo } from './car';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface ChatProps {
  car: CarInfo;
}
