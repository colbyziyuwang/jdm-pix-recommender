
import React from 'react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="w-full py-6 px-8 md:px-12 flex justify-between items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div 
        className="flex items-center space-x-2"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <div className="h-8 w-8 bg-jdm-red rounded-full"></div>
        <h1 className="text-xl font-medium tracking-tight">JDM<span className="font-light">PIX</span></h1>
      </motion.div>
      
      <nav>
        <ul className="flex space-x-8 text-sm font-light">
          <motion.li 
            whileHover={{ scale: 1.05, color: '#D40000' }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="cursor-pointer"
          >
            Home
          </motion.li>
          <motion.li 
            whileHover={{ scale: 1.05, color: '#D40000' }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="cursor-pointer"
          >
            Gallery
          </motion.li>
          <motion.li 
            whileHover={{ scale: 1.05, color: '#D40000' }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="cursor-pointer"
          >
            About
          </motion.li>
        </ul>
      </nav>
    </motion.header>
  );
};

export default Header;
