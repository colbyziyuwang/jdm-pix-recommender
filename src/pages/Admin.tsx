
import React from 'react';
import { useToast } from '../components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CarDataUploader from '../components/car-uploader';
import { motion } from 'framer-motion';
import { ChevronLeft, Search } from 'lucide-react';

const Admin: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCarAdded = () => {
    toast({
      title: "Car added successfully",
      description: "Car has been added to the database. View it by searching on the home page.",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url("/lovable-uploads/be904234-5f43-47a4-9dd1-ee57e1e152b8.png")' }}>
      <div className="min-h-screen flex flex-col bg-black/60 backdrop-blur-sm">
        <Header />
        
        <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="mb-8 bg-white/90 backdrop-blur-md rounded-lg p-6">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft size={16} className="mr-1" />
                Back to Home
              </button>
              
              <h1 className="text-2xl font-bold mt-4 mb-6">JDM Database Management</h1>
              <p className="text-gray-600 mb-4">
                Add new cars to the database. All data will be saved locally in your browser and will persist between visits.
              </p>
              
              <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-md">
                <div className="flex items-start">
                  <Search size={20} className="text-blue-500 mr-2 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-700">How to view your cars</h3>
                    <p className="text-sm text-blue-600">
                      After adding a car, go to the home page and search for it by name or manufacturer.
                      The image and details you uploaded will be displayed in the search results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-md rounded-lg p-6">
              <CarDataUploader onCarAdded={handleCarAdded} />
            </div>
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Admin;
