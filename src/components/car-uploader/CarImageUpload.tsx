
import React, { useRef } from 'react';
import { Upload, X, Car } from 'lucide-react';

interface CarImageUploadProps {
  carImage: string | null;
  setCarImage: (image: string | null) => void;
  setFormData: (callback: (prev: any) => any) => void;
}

const CarImageUpload: React.FC<CarImageUploadProps> = ({ 
  carImage, 
  setCarImage, 
  setFormData 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File is too large. Maximum size is 5MB.');
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageData = event.target.result as string;
          setCarImage(imageData);
          setFormData(prev => ({ ...prev, imageUrl: imageData }));
          console.log("Image data loaded, length:", imageData.length);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File is too large. Maximum size is 5MB.');
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageData = event.target.result as string;
          setCarImage(imageData);
          setFormData(prev => ({ ...prev, imageUrl: imageData }));
          console.log("Image data loaded via drag and drop, length:", imageData.length);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
        <Car size={16} className="mr-1" /> Car Image
      </label>
      
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-jdm-red transition-colors"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
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
  );
};

export default CarImageUpload;
