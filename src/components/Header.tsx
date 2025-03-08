import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <span className="text-xl font-medium text-jdm-red">JDM</span>
          <span className="text-xl font-light">Archive</span>
        </a>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a 
                href="/" 
                className="text-sm text-gray-600 hover:text-jdm-red transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/admin" 
                className="text-sm text-gray-600 hover:text-jdm-red transition-colors"
              >
                Admin
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
