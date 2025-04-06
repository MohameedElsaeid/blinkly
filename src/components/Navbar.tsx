
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-alchemy-purple-dark font-heading font-bold text-xl">
                Blinkly<span className="text-alchemy-purple">Lab</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-alchemy-purple transition-colors">
              Home
            </Link>
            <Link to="/#features" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-alchemy-purple transition-colors">
              Features
            </Link>
            <Link to="/#pricing" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-alchemy-purple transition-colors">
              Pricing
            </Link>
            <Link to="/dashboard" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-alchemy-purple transition-colors">
              Dashboard
            </Link>
          </div>
          
          <div className="hidden md:flex items-center">
            <Button variant="outline" className="mr-3" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button className="bg-alchemy-purple hover:bg-alchemy-purple-dark" asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-alchemy-purple hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-alchemy-purple"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-alchemy-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/#features" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-alchemy-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/#pricing" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-alchemy-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/dashboard" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-alchemy-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <Button variant="outline" className="w-full mb-2" asChild>
                <Link 
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
              </Button>
            </div>
            <div className="flex items-center px-5">
              <Button className="w-full bg-alchemy-purple hover:bg-alchemy-purple-dark" asChild>
                <Link 
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
