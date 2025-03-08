
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface CarSearchProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

const CarSearch: React.FC<CarSearchProps> = ({ onSearch, isSearching }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.h2 
          className="text-2xl md:text-3xl font-light tracking-tight mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Discover Your <span className="font-medium">JDM Legend</span>
        </motion.h2>
        <motion.p 
          className="text-muted-foreground max-w-md mx-auto text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Enter a Japanese Domestic Market car model to get detailed specifications and information
        </motion.p>
      </div>
      
      <form 
        onSubmit={handleSubmit}
        className={`${isSearching ? 'opacity-60 pointer-events-none' : ''}`}
      >
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="e.g. Nissan GT-R, Supra MK4, RX-7..."
            className="w-full h-14 pl-5 pr-16 rounded-lg border border-gray-300 focus:border-jdm-red focus:ring-2 focus:ring-jdm-red/20 transition-all shadow-sm"
            disabled={isSearching}
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 h-10 w-10 flex items-center justify-center bg-jdm-red text-white rounded-md hover:bg-jdm-red/90 transition-colors"
            disabled={isSearching}
          >
            {isSearching ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Search size={18} />
            )}
          </button>
        </div>
      </form>
      
      {isSearching && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center justify-center">
            <div className="w-8 h-8 border-3 border-gray-200 border-t-jdm-red rounded-full animate-spin mr-3"></div>
            <p className="text-muted-foreground">Searching for car details...</p>
          </div>
        </motion.div>
      )}
      
      <motion.p 
        className="text-xs text-center mt-3 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Try searching for popular models like "GT-R", "Supra", or "RX-7"
      </motion.p>
    </motion.div>
  );
};

export default CarSearch;
