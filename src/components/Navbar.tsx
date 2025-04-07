
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink } from "@/components/ui/navigation-menu";
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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <span className="text-alchemy-purple font-medium">Features</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <Link to="/#features" className="block p-3 hover:bg-gray-100 rounded">
                      Features
                    </Link>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <span className="text-alchemy-purple font-medium">Pricing</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <Link to="/pricing" className="block p-3 hover:bg-gray-100 rounded">
                      Pricing
                    </Link>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <span className="text-alchemy-purple font-medium">API</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <Link to="/api-docs" className="block p-3 hover:bg-gray-100 rounded">
                      API Documentation
                    </Link>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <span className="text-alchemy-purple font-medium">About</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <Link to="/about" className="block p-3 hover:bg-gray-100 rounded">
                      About Us
                    </Link>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <span className="text-alchemy-purple font-medium">Blog</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <Link to="/blog" className="block p-3 hover:bg-gray-100 rounded">
                      Blog
                    </Link>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="ml-4 flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link to="/contact" className="text-alchemy-purple font-medium">
                  Contact
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/login" className="text-alchemy-purple font-medium">
                  Log in
                </Link>
              </Button>
              <Button className="bg-alchemy-purple hover:bg-alchemy-purple-dark" asChild>
                <Link to="/signup">
                  Sign up
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5 text-gray-500" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-64">
                <div className="flex flex-col space-y-4">
                  <Link to="/" className="font-semibold text-lg">
                    Home
                  </Link>
                  <Link to="/#features" className="font-semibold text-lg">
                    Features
                  </Link>
                  <Link to="/pricing" className="font-semibold text-lg">
                    Pricing
                  </Link>
                  <Link to="/api-docs" className="font-semibold text-lg">
                    API
                  </Link>
                  <Link to="/about" className="font-semibold text-lg">
                    About
                  </Link>
                  <Link to="/blog" className="font-semibold text-lg">
                    Blog
                  </Link>
                  <Link to="/contact" className="font-semibold text-lg">
                    Contact
                  </Link>
                  {!user ? (
                    <>
                      <Link to="/login" className="font-semibold text-lg">
                        Log in
                      </Link>
                      <Link to="/signup" className="font-semibold text-lg">
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
