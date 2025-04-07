
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <img 
        src="/logo.svg" 
        alt="Blinkly Logo" 
        className="h-8 mr-2 rounded-md" 
      />
      <span className="text-xl font-bold text-alchemy-purple">Blinkly</span>
    </div>
  );
};

export default Logo;
