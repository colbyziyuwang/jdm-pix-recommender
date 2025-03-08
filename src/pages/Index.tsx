
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import CarSearch from '../components/CarSearch';
import CarInfo from '../components/CarInfo';
import Footer from '../components/Footer';
import { CarInfo as CarInfoType } from '../types/car';
import { useToast } from '../components/ui/use-toast';
import { findCarByModel } from '../utils/carIdentification';

const Index: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [carData, setCarData] = useState<CarInfoType | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      toast({
        title: "Search error",
        description: "Please enter a car model to search",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setSearchQuery(query);
    setIsSearching(true);
    
    try {
      // Simulate a brief loading state for better UX
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 800));
      
      // Search both local database and Japan Car Guide
      const result = await findCarByModel(query);
      
      // Wait for minimum load time to complete
      await minLoadTime;
      
      if (result) {
        setCarData(result);
        toast({
          title: "Car found!",
          description: `We found information about the ${result.manufacturer} ${result.name}`,
          duration: 5000,
        });
      } else {
        toast({
          title: "No results found",
          description: "We couldn't find this car model. Try another search term like 'Skyline' or 'Silvia'.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred",
        description: "Something went wrong during the search. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSearching(false);
    }
  };

  const resetSearch = () => {
    setSearchQuery('');
    setCarData(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("/bg-jdm.jpg")' }}>
      <div className="min-h-screen flex flex-col bg-black/40 backdrop-blur-sm">
        <Header />
        
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            {!carData ? (
              <div className="py-12">
                <CarSearch onSearch={handleSearch} isSearching={isSearching} />
                
                <motion.div 
                  className="mt-20 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <h3 className="text-lg font-medium mb-4 text-white">Popular JDM Legends</h3>
                  <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
                    {['Nissan GT-R', 'Toyota Supra', 'Mazda RX-7', 'Subaru WRX STI', 'Mitsubishi Evo'].map((car, index) => (
                      <motion.div
                        key={index}
                        className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm text-sm cursor-pointer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + (index * 0.1), duration: 0.4 }}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                        onClick={() => handleSearch(car)}
                      >
                        {car}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-8 bg-white/90 backdrop-blur-md rounded-lg p-6"
                >
                  <motion.div 
                    className="flex justify-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <button
                      onClick={resetSearch}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      ← Search Another Model
                    </button>
                  </motion.div>
                  <CarInfo car={carData} />
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Index;
