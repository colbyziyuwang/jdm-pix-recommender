
import React from 'react';
import { useToast } from '../components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CarDataUploader from '../components/car-uploader';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

const Admin: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-jdm-light to-white">
      <Header />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="mb-8">
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
          </div>
          
          <CarDataUploader />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
