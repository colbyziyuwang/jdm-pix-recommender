
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../ui/use-toast';
import { saveCarToDatabase } from '../../data/carDatabase';
import { CarInfo, Dealer } from '../../types/car';
import CarDetailsForm from './CarDetailsForm';
import CarImageUpload from './CarImageUpload';
import DealerForm from './DealerForm';
import FormActions from './FormActions';
import { Car } from 'lucide-react';

interface CarDataUploaderProps {
  onCarAdded?: () => void;
}

const CarDataUploader: React.FC<CarDataUploaderProps> = ({ onCarAdded }) => {
  const { toast } = useToast();
  const [carImage, setCarImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<CarInfo>>({
    dealers: [{ name: '', location: '', contact: '', website: '' }]
  });
  
  const [showDealerFields, setShowDealerFields] = useState(false);

  const resetForm = () => {
    setFormData({
      dealers: [{ name: '', location: '', contact: '', website: '' }]
    });
    setCarImage(null);
    setShowDealerFields(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDealerChange = (index: number, field: keyof Dealer, value: string) => {
    setFormData(prevData => {
      const dealers = [...(prevData.dealers || [])];
      dealers[index] = { ...dealers[index], [field]: value };
      return { ...prevData, dealers };
    });
  };

  const addDealer = () => {
    setFormData(prevData => ({
      ...prevData,
      dealers: [
        ...(prevData.dealers || []),
        { name: '', location: '', contact: '', website: '' }
      ]
    }));
  };

  const removeDealer = (index: number) => {
    setFormData(prevData => {
      const dealers = [...(prevData.dealers || [])];
      dealers.splice(index, 1);
      return { ...prevData, dealers };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      // Generate an ID from the manufacturer and name
      const manufacturer = formData.manufacturer || '';
      const name = formData.name || '';
      const id = `${manufacturer.toLowerCase()}-${name.toLowerCase().replace(/\s+/g, '-')}`;
      
      // Create the new car object
      const newCar: CarInfo = {
        id,
        name: name,
        manufacturer: manufacturer,
        yearRange: formData.yearRange || '',
        engineInfo: formData.engineInfo || '',
        power: formData.power || '',
        topSpeed: formData.topSpeed || '',
        acceleration: formData.acceleration || '',
        description: formData.description || '',
        imageUrl: formData.imageUrl || '',
        dealers: formData.dealers as Dealer[]
      };
      
      // Validate image
      if (!newCar.imageUrl) {
        toast({
          title: "Image required",
          description: "Please upload an image of the car",
          variant: "destructive",
          duration: 3000,
        });
        setIsUploading(false);
        return;
      }
      
      // Save the car to the database (which handles localStorage persistence)
      saveCarToDatabase(newCar);
      
      // Show success message
      toast({
        title: "Car added successfully",
        description: `${manufacturer} ${name} has been added to the database and will persist across page refreshes.`,
        duration: 5000,
      });
      
      // Call the onCarAdded callback if provided
      if (onCarAdded) {
        onCarAdded();
      }
      
      // Reset form
      resetForm();
    } catch (error) {
      console.error('Error adding car:', error);
      toast({
        title: "Error adding car",
        description: "There was a problem adding the car to the database.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto"
    >
      <h2 className="text-xl font-medium mb-6">Add New JDM Car</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <CarDetailsForm 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
        
        <CarImageUpload 
          carImage={carImage} 
          setCarImage={setCarImage} 
          setFormData={setFormData} 
        />
        
        <DealerForm 
          dealers={formData.dealers as Dealer[]}
          handleDealerChange={handleDealerChange}
          addDealer={addDealer}
          removeDealer={removeDealer}
          showDealerFields={showDealerFields}
          setShowDealerFields={setShowDealerFields}
        />
        
        <FormActions 
          resetForm={resetForm}
          isUploading={isUploading}
        />
      </form>
    </motion.div>
  );
};

export default CarDataUploader;
