
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageSelected: (image: string) => void;
  isProcessing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected, isProcessing }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };
  
  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  
  const handleFiles = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        onImageSelected(e.target.result);
      }
    };
    reader.readAsDataURL(file);
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
          Identify Your <span className="font-medium">JDM Legend</span>
        </motion.h2>
        <motion.p 
          className="text-muted-foreground max-w-md mx-auto text-sm md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Upload an image of a Japanese Domestic Market car to get detailed specifications and information
        </motion.p>
      </div>
      
      <div
        className={`relative h-64 rounded-xl border-2 border-dashed transition-all duration-300 ease-in-out flex flex-col justify-center items-center p-6 ${
          dragActive ? 'border-jdm-red bg-jdm-red/5' : 'border-gray-300 hover:border-gray-400'
        } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
          disabled={isProcessing}
        />
        
        <AnimatePresence>
          {isProcessing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 border-4 border-gray-200 border-t-jdm-red rounded-full animate-spin mb-4"></div>
              <p className="text-sm text-gray-500">Analyzing your JDM car...</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="mb-4 text-jdm-gray">
                <ImageIcon size={48} strokeWidth={1} />
              </div>
              <p className="text-center mb-4 text-sm md:text-base">
                Drag and drop your JDM car image here, or click to browse
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 bg-jdm-dark text-white rounded-md text-sm flex items-center space-x-2 transition-all hover:bg-black"
                onClick={onButtonClick}
              >
                <Upload size={16} />
                <span>Upload Image</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <motion.p 
        className="text-xs text-center mt-3 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Supported formats: JPG, PNG, WEBP • Max file size: 10MB
      </motion.p>
    </motion.div>
  );
};

export default ImageUpload;
