
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="h-8 w-8 mr-2 bg-alchemy-purple rounded-md flex items-center justify-center">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 text-white"
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
      <span className="text-xl font-bold text-alchemy-purple">Blinkly</span>
    </div>
  );
};

export default Logo;
