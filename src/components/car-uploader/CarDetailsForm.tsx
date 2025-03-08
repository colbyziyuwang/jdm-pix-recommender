
import React from 'react';
import { CarInfo } from '../../types/car';

interface CarDetailsFormProps {
  formData: Partial<CarInfo>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CarDetailsForm: React.FC<CarDetailsFormProps> = ({ formData, handleInputChange }) => {
  return (
    <>
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
    </>
  );
};

export default CarDetailsForm;
