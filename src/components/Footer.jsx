import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-navyBlue text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <ul className="space-y-2">
              <li className="text-blue-500 hover:text-black transition-colors">Features</li>
              <li className="text-blue-500 hover:text-black transition-colors">Pricing</li>
              <li className="text-blue-500 hover:text-black transition-colors">Try Now</li>
            </ul>
          </div>
          
          <div>
            <ul className="space-y-2">
              <li className="text-blue-500 hover:text-black transition-colors">Documentation</li>
              <li className="text-blue-500 hover:text-black transition-colors">Tutorials</li>
              <li className="text-blue-500 hover:text-black transition-colors">FAQ</li>
            </ul>
          </div>
          
          <div>
            <ul className="space-y-2">
              <li className="text-blue-500 hover:text-black transition-colors">About Us</li>
              <li className="text-blue-500 hover:text-black transition-colors">Contact</li>
              <li className="text-blue-500 hover:text-black transition-colors">Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
