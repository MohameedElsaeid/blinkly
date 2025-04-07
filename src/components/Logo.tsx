
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="h-9 w-9 mr-2 bg-gradient-to-r from-blinkly-purple to-blinkly-teal rounded-lg flex items-center justify-center shadow-sm">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-white"
        >
          <path 
            d="M3 9L12 4.5L21 9L12 13.5L3 9Z" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          <path 
            d="M3 14L12 18.5L21 14" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-gray-900">Blink</span>
        <span className="text-2xl font-bold bg-gradient-to-r from-blinkly-purple to-blinkly-teal bg-clip-text text-transparent">ly</span>
      </div>
    </div>
  );
};

export default Logo;
