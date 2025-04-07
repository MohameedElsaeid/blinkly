
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-alchemy-purple-dark font-heading font-bold text-xl">
                Blinkly
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <a href="#features" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-alchemy-purple transition-colors">
              Features
            </a>
            <a href="#pricing" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-alchemy-purple transition-colors">
              Pricing
            </a>
            <Link to="/about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-alchemy-purple transition-colors">
              About
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-alchemy-purple transition-colors">
                Dashboard
              </Link>
            )}
          </div>
          
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <Button variant="outline" className="text-gray-700 hover:text-alchemy-purple" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            ) : (
              <>
                <Button variant="outline" className="mr-3" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button className="bg-alchemy-purple hover:bg-alchemy-purple-dark" asChild>
                  <Link to="/signup">Sign up</Link>
                </Button>
              </>
            )}
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
            <a 
              href="#features"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-alchemy-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-alchemy-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-alchemy-purple hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-alchemy-purple hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="flex items-center px-5">
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
