
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="w-full py-8 px-8 md:px-12 mt-12 border-t border-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 bg-jdm-red rounded-full"></div>
              <h2 className="text-lg font-medium tracking-tight">JDM<span className="font-light">PIX</span></h2>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Recognize and explore Japanese automotive legends</p>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} JDMPIX. All rights reserved.</p>
            <p className="mt-1">Designed with precision, built with passion.</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
