
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useAuth } from "@/hooks";
import { useIsMobile } from "@/hooks";
import Logo from "./Logo";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to landing page after logout
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" asChild>
              <Link to="/#features" className="text-gray-700 font-medium hover:text-blinkly-purple">
                Features
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/pricing" className="text-gray-700 font-medium hover:text-blinkly-purple">
                Pricing
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/api-docs" className="text-gray-700 font-medium hover:text-blinkly-purple">
                API
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/about" className="text-gray-700 font-medium hover:text-blinkly-purple">
                About
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/blog" className="text-gray-700 font-medium hover:text-blinkly-purple">
                Blog
              </Link>
            </Button>
            
            <div className="ml-4 flex items-center space-x-2">
              <Button variant="outline" className="text-blinkly-teal border-blinkly-teal hover:bg-blinkly-teal/10" asChild>
                <Link to="/contact" className="text-blinkly-teal">
                  Contact
                </Link>
              </Button>
              <Button variant="outline" className="text-blinkly-purple border-blinkly-purple hover:bg-blinkly-purple/10" asChild>
                <Link to="/login" className="text-blinkly-purple">
                  Log in
                </Link>
              </Button>
              <Button className="bg-blinkly-purple hover:bg-blinkly-purple-dark text-white shadow-sm" asChild>
                <Link to="/signup" className="text-white">
                  Sign up
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5 text-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-64">
                <div className="flex flex-col space-y-4">
                  <Link to="/" className="font-semibold text-lg text-gray-800">
                    Home
                  </Link>
                  <Link to="/#features" className="font-semibold text-lg text-gray-800">
                    Features
                  </Link>
                  <Link to="/pricing" className="font-semibold text-lg text-blinkly-teal">
                    Pricing
                  </Link>
                  <Link to="/api-docs" className="font-semibold text-lg text-blinkly-teal">
                    API
                  </Link>
                  <Link to="/about" className="font-semibold text-lg text-blinkly-orange">
                    About
                  </Link>
                  <Link to="/blog" className="font-semibold text-lg text-blinkly-orange">
                    Blog
                  </Link>
                  <Link to="/contact" className="font-semibold text-lg text-blinkly-green">
                    Contact
                  </Link>
                  {!user ? (
                    <>
                      <Link to="/login" className="font-semibold text-lg text-blinkly-purple">
                        Log in
                      </Link>
                      <Link to="/signup" className="font-semibold text-lg text-blinkly-teal">
                        Sign up
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/dashboard" className="font-semibold text-lg">
                        Dashboard
                      </Link>
                      <Button variant="destructive" onClick={handleLogout}>Logout</Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
