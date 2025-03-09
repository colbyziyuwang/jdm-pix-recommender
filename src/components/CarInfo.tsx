
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Car, DollarSign, Image, MapPin, BarChart, ExternalLink } from 'lucide-react';
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
  
  const handleGoogleImageSearch = () => {
    const searchQuery = `${car.manufacturer} ${car.name}`;
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&tbm=isch`;
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
  };

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
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-3 right-3 bg-white/90 text-black hover:bg-white"
            onClick={handleGoogleImageSearch}
          >
            <Image size={16} className="mr-1" /> Search Images
          </Button>
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
              <div className="relative rounded-lg overflow-hidden shadow-md mb-4">
                {car.imageUrl ? (
                  <img 
                    src={car.imageUrl} 
                    alt={`${car.manufacturer} ${car.name}`}
                    className="w-full h-48 md:h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 md:h-64 bg-gray-200 flex items-center justify-center">
                    <Car size={64} className="text-gray-400" />
                  </div>
                )}
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-3 right-3 bg-white/90 text-black hover:bg-white"
                  onClick={handleGoogleImageSearch}
                >
                  <Image size={16} className="mr-1" /> Search Images
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
            <Badge variant="outline" className="mr-2">{car.manufacturingYear}</Badge>
            <Badge variant="outline" className="mr-2">{car.category}</Badge>
            <Badge variant="outline">{car.estimatedPrice}</Badge>
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
