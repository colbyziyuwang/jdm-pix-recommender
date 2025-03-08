
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, MapPin, Phone, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { CarInfo as CarInfoType, Dealer } from '../../types/car';

interface DealerLocatorProps {
  car: CarInfoType;
}

interface NearbyDealer {
  name: string;
  distance: number;
}

const DealerLocator: React.FC<DealerLocatorProps> = ({ car }) => {
  const [nearbyDealers, setNearbyDealers] = useState<NearbyDealer[]>([]);
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

  if (!car.dealers || car.dealers.length === 0) {
    return null;
  }
  
  return (
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
          <DealerCard key={index} dealer={dealer} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

interface DealerCardProps {
  dealer: Dealer;
  index: number;
}

const DealerCard: React.FC<DealerCardProps> = ({ dealer, index }) => {
  return (
    <motion.div 
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
  );
};

export default DealerLocator;
