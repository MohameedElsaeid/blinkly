import React from "react";
import {Facebook, Instagram, Linkedin, Mail, Twitter} from "lucide-react";

interface SocialMediaLink {
    href: string;
    icon: React.ReactNode;
    ariaLabel: string;
}

const SocialMediaLinks: React.FC = () => {
    const socialLinks: SocialMediaLink[] = [
        {
            href: "https://www.facebook.com/blinklyapp/",
            icon: <Facebook className="h-5 w-5"/>,
            ariaLabel: "Facebook"
        },
        {
            href: "https://www.instagram.com/blinklyapp/",
            icon: <Instagram className="h-5 w-5"/>,
            ariaLabel: "Instagram"
        },
        {
            href: "https://www.linkedin.com/company/blinklyapp/about",
            icon: <Linkedin className="h-5 w-5"/>,
            ariaLabel: "LinkedIn"
        },
        {
            href: "https://x.com/BlinklyApp",
            icon: <Twitter className="h-5 w-5"/>,
            ariaLabel: "X (Twitter)"
        },
        {
            href: "mailto:support@blinkly.app",
            icon: <Mail className="h-5 w-5"/>,
            ariaLabel: "Email"
        }
    ];

    return (
        <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
                <a
                    key={index}
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label={link.ariaLabel}
                >
                    {link.icon}
                </a>
            ))}
        </div>
    );
};

export default SocialMediaLinks;
