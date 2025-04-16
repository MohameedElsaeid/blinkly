import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import {useAuth, useIsMobile} from "@/hooks";
import Logo from "./Logo";

const Navbar = () => {
    const {user, logout} = useAuth();
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
                            <Logo size={isMobile ? "small" : "medium"}/>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center justify-center flex-grow">
                        <div className="space-x-3">
                            <Button variant="ghost" asChild>
                                <Link to="/" className="nav-link">
                                    Home
                                </Link>
                            </Button>
                            <Button variant="ghost" asChild>
                                <Link to="/#features" className="nav-link">
                                    Features
                                </Link>
                            </Button>
                            <Button variant="ghost" asChild>
                                <Link to="/pricing" className="nav-link">
                                    Pricing
                                </Link>
                            </Button>
                            <Button variant="ghost" asChild>
                                <Link to="/about" className="nav-link">
                                    About
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-3">
                        {!user ? (
                            <>
                                <Button variant="outline"
                                        className="text-brand-purple border-brand-purple hover:bg-brand-purple/10"
                                        asChild>
                                    <Link to="/login">
                                        Log in
                                    </Link>
                                </Button>
                                <Button className="bg-brand-purple hover:bg-brand-purple/90 shadow-sm" asChild>
                                    <Link to="/signup" className="text-white">
                                        Sign up
                                    </Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline" asChild>
                                    <Link to="/dashboard">Dashboard</Link>
                                </Button>
                                <Button variant="destructive" onClick={handleLogout}>Logout</Button>
                            </>
                        )}
                    </div>

                    <div className="md:hidden">
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-5 w-5 text-gray-700"/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:w-64">
                                <div className="pt-6 pb-8 flex justify-center">
                                    <Logo size="large"/>
                                </div>
                                <div className="flex flex-col space-y-4">
                                    <Link to="/" className="font-semibold text-lg text-gray-800"
                                          onClick={() => setOpen(false)}>
                                        Home
                                    </Link>
                                    <Link to="/#features" className="font-semibold text-lg text-gray-800"
                                          onClick={() => setOpen(false)}>
                                        Features
                                    </Link>
                                    <Link to="/pricing" className="font-semibold text-lg text-brand-teal"
                                          onClick={() => setOpen(false)}>
                                        Pricing
                                    </Link>
                                    <Link to="/about" className="font-semibold text-lg text-brand-gold"
                                          onClick={() => setOpen(false)}>
                                        About
                                    </Link>
                                    {!user ? (
                                        <>
                                            <Link to="/login" className="font-semibold text-lg text-brand-purple"
                                                  onClick={() => setOpen(false)}>
                                                Log in
                                            </Link>
                                            <Link to="/signup" className="font-semibold text-lg text-brand-teal"
                                                  onClick={() => setOpen(false)}>
                                                Sign up
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/dashboard" className="font-semibold text-lg"
                                                  onClick={() => setOpen(false)}>
                                                Dashboard
                                            </Link>
                                            <Button variant="destructive" onClick={() => {
                                                handleLogout();
                                                setOpen(false);
                                            }}>Logout</Button>
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
