
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Link2, 
  BarChart3, 
  QrCode, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  LayoutDashboard
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Links",
    href: "/dashboard/links",
    icon: Link2,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "QR Codes",
    href: "/dashboard/qr-codes",
    icon: QrCode,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

type SidebarProps = {
  className?: string;
};

const Sidebar = ({ className }: SidebarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b">
            <div className="text-alchemy-purple-dark font-heading font-bold text-xl">
              Bli<span className="text-alchemy-purple">nkly</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav className="space-y-1">
              {/* Home button to navigate to main landing page */}
              <Link
                to="/"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md group transition-colors text-gray-700 hover:bg-alchemy-purple/5 hover:text-alchemy-purple"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home
                  className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-alchemy-purple"
                />
                Home
              </Link>
              
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md group transition-colors",
                      isActive
                        ? "bg-alchemy-purple/10 text-alchemy-purple"
                        : "text-gray-700 hover:bg-alchemy-purple/5 hover:text-alchemy-purple"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 flex-shrink-0",
                        isActive
                          ? "text-alchemy-purple"
                          : "text-gray-400 group-hover:text-alchemy-purple"
                      )}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full justify-start text-gray-700 hover:text-alchemy-purple"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
