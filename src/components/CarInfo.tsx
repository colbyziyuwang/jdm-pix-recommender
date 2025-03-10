
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Car, DollarSign, Image, MapPin, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { CarInfo as CarInfoType } from '../types/car';
import CarSpecs from './car-details/CarSpecs';
import DealerLocator from './car-details/DealerLocator';
import CarLLMChat from './CarLLMChat';

interface CarInfoProps {
  car: CarInfoType;
}

const CarInfo: React.FC<CarInfoProps> = ({ car }) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="relative mb-6 rounded-lg overflow-hidden shadow-md">
          {car.imageUrl ? (
            <img 
              src={car.imageUrl} 
              alt={`${car.manufacturer} ${car.name}`}
              className="w-full h-64 md:h-80 object-cover"
            />
          ) : (
            <div className="w-full h-64 md:h-80 bg-gray-200 flex items-center justify-center">
              <Car size={64} className="text-gray-400" />
            </div>
          )}
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>Overview</TabsTrigger>
            <TabsTrigger value="specs" onClick={() => setActiveTab("specs")}>Specs</TabsTrigger>
            <TabsTrigger value="dealers" onClick={() => setActiveTab("dealers")}>Dealers</TabsTrigger>
            <TabsTrigger value="chat" onClick={() => setActiveTab("chat")}>Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    const searchQuery = `${car.manufacturer} ${car.name}`;
                    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch`;
                    window.open(searchUrl, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <Image size={16} className="mr-1" /> Search Google Images
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="specs">
            <CarSpecs car={car} />
          </TabsContent>
          <TabsContent value="dealers">
            <DealerLocator car={car} />
          </TabsContent>
          <TabsContent value="chat">
            <CarLLMChat car={car} />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="md:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold">{car.name}</h2>
          <p className="text-sm text-gray-500">{car.manufacturer}</p>
          <div className="mt-4">
            <Badge variant="outline" className="mr-2">{car.yearRange}</Badge>
            <Badge variant="outline" className="mr-2">{car.engineInfo}</Badge>
            <Badge variant="outline">{car.power}</Badge>
          </div>
          <div className="mt-4">
            <p className="text-sm">{car.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarInfo;
