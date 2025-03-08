
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CarInfo as CarInfoType } from '../types/car';
import { Gauge, Car, Zap, Timer, MapPin, Phone, Globe, Navigation } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

interface CarInfoProps {
  car: CarInfoType;
}

const CarInfo: React.FC<CarInfoProps> = ({ car }) => {
  const [nearbyDealers, setNearbyDealers] = useState<Array<{ name: string; distance: number }>>([]);
  const [isLocating, setIsLocating] = useState(false);
  const { toast } = useToast();

  const findNearbyDealers = () => {
    setIsLocating(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation features.",
        variant: "destructive",
        duration: 3000,
      });
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        // In a real app, we would use these coordinates to query a database of dealers
        // For demo purposes, we'll simulate finding dealers near the user
        
        // Simulate checking which dealers are nearby (in a real app, this would be a backend API call)
        const nearbyResults = car.dealers?.map(dealer => {
          // Generate a random distance between 1 and 20 km for simulation
          const randomDistance = (Math.random() * 19 + 1).toFixed(1);
          return {
            name: dealer.name,
            distance: parseFloat(randomDistance)
          };
        }).sort((a, b) => a.distance - b.distance) || [];
        
        setNearbyDealers(nearbyResults);
        
        toast({
          title: "Location found!",
          description: `Found ${nearbyResults.length} ${car.manufacturer} dealers near you.`,
          duration: 3000,
        });
        
        setIsLocating(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        toast({
          title: "Location error",
          description: "Unable to get your location. Please ensure location services are enabled.",
          variant: "destructive",
          duration: 3000,
        });
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto my-12"
    >
      <div className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl mb-8">
        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-jdm-red text-white text-xs font-medium rounded-full mb-2">
            {car.manufacturer}
          </div>
          <h3 className="text-3xl font-semibold mb-1">{car.name}</h3>
          <p className="text-muted-foreground text-sm">{car.yearRange}</p>
        </div>
        
        <h3 className="text-xl font-medium mb-4">Specifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-jdm-red/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Car size={16} className="text-jdm-red" />
            </div>
            <div>
              <p className="text-sm font-medium">Engine</p>
              <p className="text-sm text-muted-foreground">{car.engineInfo || "Information not available"}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-8 h-8 bg-jdm-red/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Zap size={16} className="text-jdm-red" />
            </div>
            <div>
              <p className="text-sm font-medium">Power</p>
              <p className="text-sm text-muted-foreground">{car.power || "Information not available"}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-8 h-8 bg-jdm-red/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Gauge size={16} className="text-jdm-red" />
            </div>
            <div>
              <p className="text-sm font-medium">Top Speed</p>
              <p className="text-sm text-muted-foreground">{car.topSpeed || "Information not available"}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-8 h-8 bg-jdm-red/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Timer size={16} className="text-jdm-red" />
            </div>
            <div>
              <p className="text-sm font-medium">Acceleration</p>
              <p className="text-sm text-muted-foreground">{car.acceleration || "Information not available"}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Description</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{car.description || "No description available."}</p>
        </div>
      </div>
      
      {car.dealers && car.dealers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="p-6 bg-jdm-dark/5 backdrop-blur-sm rounded-2xl border border-jdm-dark/10"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-medium">Available Dealers</h3>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={findNearbyDealers}
              disabled={isLocating}
              className="flex items-center gap-2 bg-white hover:bg-gray-100"
            >
              <Navigation size={14} className="text-jdm-red" />
              {isLocating ? "Locating..." : "Find Nearby Dealers"}
            </Button>
          </div>
          
          {nearbyDealers.length > 0 && (
            <div className="bg-white/90 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-sm mb-3 text-gray-700">Nearby {car.manufacturer} Dealers</h4>
              <div className="space-y-2">
                {nearbyDealers.map((dealer, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm font-medium">{dealer.name}</span>
                    <span className="text-xs bg-jdm-red/10 text-jdm-red px-2 py-1 rounded-full">
                      {dealer.distance} km away
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {car.dealers.map((dealer, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + (index * 0.1) }}
                className="p-4 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <h4 className="font-medium text-base mb-3">{dealer.name}</h4>
                
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <MapPin size={14} className="mr-2 text-jdm-red" />
                    <span className="text-muted-foreground">{dealer.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Phone size={14} className="mr-2 text-jdm-red" />
                    <span className="text-muted-foreground">{dealer.contact}</span>
                  </div>
                  
                  {dealer.website && (
                    <div className="flex items-center text-sm">
                      <Globe size={14} className="mr-2 text-jdm-red" />
                      <a 
                        href={dealer.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-jdm-red hover:underline"
                      >
                        Visit website
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CarInfo;
