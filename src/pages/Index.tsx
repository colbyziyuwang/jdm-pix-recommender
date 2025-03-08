import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';
import CarInfo from '../components/CarInfo';
import Footer from '../components/Footer';
import { identifyCar } from '../utils/carIdentification';
import { useToast } from '../components/ui/use-toast';
import { CarInfo as CarInfoType } from '../types/car';

const Index: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [carData, setCarData] = useState<CarInfoType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [modelLoading, setModelLoading] = useState(false);
  const { toast } = useToast();

  const handleImageSelected = async (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsProcessing(true);
    setProcessingStage('Loading vision model...');
    setModelLoading(true);
    
    try {
      // Small delay to show the first processing message
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingStage('Analyzing image...');
      
      // Another delay for the second processing message
      await new Promise(resolve => setTimeout(resolve, 1200));
      setProcessingStage('Identifying car features with AI...');
      
      // Begin car identification
      const result = await identifyCar(imageSrc);
      setModelLoading(false);
      
      // Once model is loaded, show finalizing message
      setProcessingStage('Finalizing results...');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (result) {
        setCarData(result);
        toast({
          title: "Car identified!",
          description: `We've identified this as a ${result.manufacturer} ${result.name}`,
          duration: 5000,
        });
      } else {
        toast({
          title: "Identification failed",
          description: "We couldn't identify this car. Please try another image.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred",
        description: "Something went wrong while identifying the car. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsProcessing(false);
      setProcessingStage('');
      setModelLoading(false);
    }
  };

  const resetIdentification = () => {
    setSelectedImage(null);
    setCarData(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-jdm-light to-white">
      <Header />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          {!selectedImage ? (
            <div className="py-12">
              <ImageUpload onImageSelected={handleImageSelected} isProcessing={isProcessing} />
              
              <motion.div 
                className="mt-20 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <h3 className="text-lg font-medium mb-4">Supported JDM Legends</h3>
                <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
                  {['Nissan GT-R', 'Toyota Supra', 'Mazda RX-7', 'Subaru WRX STI', 'Mitsubishi Evo'].map((car, index) => (
                    <motion.div
                      key={index}
                      className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + (index * 0.1), duration: 0.4 }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
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
                className="py-8"
              >
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <img 
                      src={selectedImage} 
                      alt="Uploaded car" 
                      className="max-w-md w-full h-auto mb-8 rounded-xl object-cover shadow-lg"
                    />
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-jdm-red rounded-full animate-spin mb-4"></div>
                    <h3 className="text-lg font-medium mb-2">
                      {modelLoading ? 'Loading AI Vision Model' : 'Analyzing your JDM car'}
                    </h3>
                    <p className="text-muted-foreground text-sm animate-pulse">{processingStage}</p>
                    <p className="text-xs text-muted-foreground mt-6 max-w-md text-center">
                      {modelLoading 
                        ? "Our AI vision model is being loaded. This may take a moment on first use."
                        : "Our AI is analyzing shape, features, and distinctive elements to identify your car."}
                    </p>
                  </div>
                ) : (
                  <div>
                    {carData && (
                      <>
                        <motion.div 
                          className="flex justify-center mb-8"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <button
                            onClick={resetIdentification}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                          >
                            ← Upload Another Image
                          </button>
                        </motion.div>
                        <CarInfo car={carData} />
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
