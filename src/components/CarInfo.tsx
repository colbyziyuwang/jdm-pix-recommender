
import React from 'react';
import { motion } from 'framer-motion';
import { CarInfo as CarInfoType } from '../types/car';
import { Gauge, Car, Zap, Timer, MapPin, Phone, Globe } from 'lucide-react';

interface CarInfoProps {
  car: CarInfoType;
}

const CarInfo: React.FC<CarInfoProps> = ({ car }) => {
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
          <h3 className="text-xl font-medium mb-4">Available Dealers</h3>
          
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
