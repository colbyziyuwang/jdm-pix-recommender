
import React from 'react';
import { motion } from 'framer-motion';
import { CarInfo as CarInfoType } from '../types/car';
import CarSpecs from './car-details/CarSpecs';
import DealerLocator from './car-details/DealerLocator';
import CarLLMChat from './CarLLMChat';

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
      <CarSpecs car={car} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl mb-8"
      >
        <CarLLMChat car={car} />
      </motion.div>
      
      {car.dealers && car.dealers.length > 0 && (
        <DealerLocator car={car} />
      )}
    </motion.div>
  );
};

export default CarInfo;
