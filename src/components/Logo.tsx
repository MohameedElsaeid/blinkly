
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <img 
        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=200&h=200&fit=crop" 
        alt="Blinkly Logo" 
        className="h-8 mr-2 rounded" 
      />
      <span className="text-xl font-bold text-alchemy-purple">Blinkly</span>
    </div>
  );
};

export default Logo;
