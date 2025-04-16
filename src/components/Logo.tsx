import React from "react";

type LogoProps = {
    size?: "small" | "medium" | "large" | "custom";
    customSize?: string;
    className?: string;
}

const Logo: React.FC<LogoProps> = ({
                                       size = "medium",
                                       customSize,
                                       className = ""
                                   }) => {
    const sizeMap = {
        small: "h-6 w-6",
        medium: "h-9 w-9",
        large: "h-12 w-12",
        custom: customSize || "h-9 w-9"
    };

    const containerSizeClass = sizeMap[size];

    return (
        <div className={`flex items-center ${className}`}>
            <div className={`${containerSizeClass} mr-2 flex items-center justify-center`}>
                <img
                    src="/lovable-uploads/de393ef5-a1f3-4b87-b5aa-2d0886d80447.png"
                    alt="Blinkly Logo"
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">Blink</span>
                <span
                    className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">ly</span>
            </div>
        </div>
    );
};

export default Logo;
