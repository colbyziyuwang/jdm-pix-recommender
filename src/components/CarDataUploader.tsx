import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plus, Car, Upload, X, Check, Trash2 } from 'lucide-react';
import { useToast } from './ui/use-toast';
import { carDatabase, saveCarToDatabase } from '../data/carDatabase';
import { CarInfo, Dealer } from '../types/car';

const CarDataUploader: React.FC = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          setCarImage(event.target.result as string);
          setFormData(prev => ({ ...prev, imageUrl: event.target?.result as string }));
        }
      };
      
      reader.readAsDataURL(file);
    }
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
      
      // Save the car to the database (which now handles localStorage persistence)
      saveCarToDatabase(newCar);
      
      // Show success message
      toast({
        title: "Car added successfully",
        description: `${manufacturer} ${name} has been added to the database and will persist across page refreshes.`,
        duration: 5000,
      });
      
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              value={formData.manufacturer || ''}
              onChange={handleInputChange}
              placeholder="e.g. Toyota, Nissan, Honda"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-jdm-red focus:border-jdm-red"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Model Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              placeholder="e.g. Supra, GT-R, NSX"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-jdm-red focus:border-jdm-red"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year Range</label>
            <input
              type="text"
              name="yearRange"
              value={formData.yearRange || ''}
              onChange={handleInputChange}
              placeholder="e.g. 1993-2002"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-jdm-red focus:border-jdm-red"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Engine</label>
            <input
              type="text"
              name="engineInfo"
              value={formData.engineInfo || ''}
              onChange={handleInputChange}
              placeholder="e.g. 3.0L Twin-Turbocharged Inline-6"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-jdm-red focus:border-jdm-red"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Power</label>
            <input
              type="text"
              name="power"
              value={formData.power || ''}
              onChange={handleInputChange}
              placeholder="e.g. 320 HP"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-jdm-red focus:border-jdm-red"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Top Speed</label>
            <input
              type="text"
              name="topSpeed"
              value={formData.topSpeed || ''}
              onChange={handleInputChange}
              placeholder="e.g. 285 km/h"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-jdm-red focus:border-jdm-red"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Acceleration</label>
            <input
              type="text"
              name="acceleration"
              value={formData.acceleration || ''}
              onChange={handleInputChange}
              placeholder="e.g. 0-100 km/h in 4.6s"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-jdm-red focus:border-jdm-red"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleInputChange}
            rows={4}
            placeholder="Enter detailed description of the car..."
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-jdm-red focus:border-jdm-red"
            required
          />
        </div>
        
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <Car size={16} className="mr-1" /> Car Image
          </label>
          
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-jdm-red transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            
            {carImage ? (
              <div className="relative w-full">
                <img 
                  src={carImage} 
                  alt="Car preview" 
                  className="w-full h-48 object-contain rounded-md" 
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCarImage(null);
                    setFormData(prev => ({ ...prev, imageUrl: '' }));
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <Upload size={24} className="text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to upload an image or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, or JPEG (max 5MB)</p>
              </>
            )}
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Dealer Information</label>
            <button
              type="button"
              onClick={() => setShowDealerFields(!showDealerFields)}
              className="text-sm text-jdm-red hover:text-jdm-red/80"
            >
              {showDealerFields ? 'Hide Dealer Fields' : 'Show Dealer Fields'}
            </button>
          </div>
          
          {showDealerFields && (
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              {formData.dealers?.map((dealer, index) => (
                <div key={index} className="border border-gray-200 p-4 rounded-md relative">
                  <h4 className="text-sm font-medium mb-3">Dealer {index + 1}</h4>
                  
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeDealer(index)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Dealer Name</label>
                      <input
                        type="text"
                        value={dealer.name}
                        onChange={(e) => handleDealerChange(index, 'name', e.target.value)}
                        placeholder="Dealer name"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Location</label>
                      <input
                        type="text"
                        value={dealer.location}
                        onChange={(e) => handleDealerChange(index, 'location', e.target.value)}
                        placeholder="City, Country"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Contact</label>
                      <input
                        type="text"
                        value={dealer.contact}
                        onChange={(e) => handleDealerChange(index, 'contact', e.target.value)}
                        placeholder="Phone number"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Website</label>
                      <input
                        type="text"
                        value={dealer.website}
                        onChange={(e) => handleDealerChange(index, 'website', e.target.value)}
                        placeholder="https://example.com"
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addDealer}
                className="flex items-center text-sm text-jdm-red hover:text-jdm-red/80"
              >
                <Plus size={16} className="mr-1" />
                Add Another Dealer
              </button>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Reset
          </button>
          
          <button
            type="submit"
            disabled={isUploading}
            className="px-6 py-2 bg-jdm-red text-white rounded-md hover:bg-jdm-red/90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Uploading...
              </>
            ) : (
              <>
                <Check size={16} className="mr-2" />
                Add Car to Database
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default CarDataUploader;
