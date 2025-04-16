import React, {useEffect, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Cookie, Shield} from "lucide-react";

// Cookie preferences type
interface CookiePreferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
}

// Default cookie preferences (necessary cookies always enabled)
const defaultPreferences: CookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
};

const CookieConsent = () => {
    const [open, setOpen] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

    useEffect(() => {
        // Check if user has already made a choice
        const consentGiven = localStorage.getItem("cookieConsent");

        // If no consent has been given, show the dialog
        if (!consentGiven) {
            setOpen(true);
        } else {
            // Load saved preferences
            try {
                const savedPreferences = JSON.parse(consentGiven);
                setPreferences(savedPreferences);
            } catch (error) {
                console.error("Error parsing saved cookie preferences", error);
            }
        }
    }, []);

    const handleAcceptAll = () => {
        const allAccepted = {
            necessary: true,
            analytics: true,
            marketing: true,
        };

        savePreferences(allAccepted);
    };

    const handleReject = () => {
        // Only accept necessary cookies
        savePreferences(defaultPreferences);
    };

    const handleSavePreferences = () => {
        savePreferences(preferences);
    };

    const savePreferences = (prefs: CookiePreferences) => {
        // Save to localStorage
        localStorage.setItem("cookieConsent", JSON.stringify(prefs));

        // Apply cookie settings based on preferences
        applyCookieSettings(prefs);

        // Close the dialog
        setOpen(false);
    };

    const applyCookieSettings = (prefs: CookiePreferences) => {
        // Necessary cookies are always enabled

        // For analytics cookies
        if (prefs.analytics) {
            // Enable analytics cookies
            console.log("Analytics cookies enabled");
            // Here you would implement your analytics cookie setup
        } else {
            // Disable analytics cookies
            console.log("Analytics cookies disabled");
            // Here you would implement your analytics cookie removal
        }

        // For marketing cookies
        if (prefs.marketing) {
            // Enable marketing cookies
            console.log("Marketing cookies enabled");
            // Here you would implement your marketing cookie setup
        } else {
            // Disable marketing cookies
            console.log("Marketing cookies disabled");
            // Here you would implement your marketing cookie removal
        }
    };

    const openCookieSettings = () => {
        setOpen(true);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="flex flex-row items-center gap-2">
                        <Cookie className="h-5 w-5 text-primary"/>
                        <div>
                            <DialogTitle>Cookie Preferences</DialogTitle>
                            <DialogDescription>
                                We use cookies to enhance your browsing experience, serve personalized ads or content,
                                and analyze our traffic.
                            </DialogDescription>
                        </div>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="flex items-start space-x-3 rounded-md border p-3">
                            <Checkbox id="necessary" checked disabled/>
                            <div className="flex-1 space-y-1">
                                <label htmlFor="necessary" className="font-medium">
                                    Necessary Cookies
                                </label>
                                <p className="text-xs text-muted-foreground">
                                    These cookies are essential for the website to function properly and cannot be
                                    disabled.
                                </p>
                            </div>
                            <Shield className="h-4 w-4 text-muted-foreground"/>
                        </div>

                        <div className="flex items-start space-x-3 rounded-md border p-3">
                            <Checkbox
                                id="analytics"
                                checked={preferences.analytics}
                                onCheckedChange={(checked) =>
                                    setPreferences(prev => ({...prev, analytics: !!checked}))
                                }
                            />
                            <div className="flex-1 space-y-1">
                                <label htmlFor="analytics" className="font-medium">
                                    Analytics Cookies
                                </label>
                                <p className="text-xs text-muted-foreground">
                                    These cookies help us understand how visitors interact with our website, helping us
                                    improve our site and services.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3 rounded-md border p-3">
                            <Checkbox
                                id="marketing"
                                checked={preferences.marketing}
                                onCheckedChange={(checked) =>
                                    setPreferences(prev => ({...prev, marketing: !!checked}))
                                }
                            />
                            <div className="flex-1 space-y-1">
                                <label htmlFor="marketing" className="font-medium">
                                    Marketing Cookies
                                </label>
                                <p className="text-xs text-muted-foreground">
                                    These cookies are used to track visitors across websites to display relevant
                                    advertisements.
                                </p>
                            </div>
                        </div>
                    </div>

                    <DialogFooter
                        className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-between sm:space-x-2">
                        <Button variant="outline" onClick={handleReject} className="sm:order-1">
                            Reject All
                        </Button>
                        <div
                            className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 space-x-0 sm:space-x-2 sm:order-2">
                            <Button onClick={handleSavePreferences} variant="outline">
                                Save Preferences
                            </Button>
                            <Button onClick={handleAcceptAll}>
                                Accept All
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Floating button to reopen cookie settings */}
            {!open && (
                <button
                    onClick={openCookieSettings}
                    className="fixed bottom-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:opacity-90 transition-opacity"
                    aria-label="Cookie Settings"
                >
                    <Cookie className="h-5 w-5"/>
                </button>
            )}
        </>
    );
};

export default CookieConsent;
