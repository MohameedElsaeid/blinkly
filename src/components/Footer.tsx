import { Link } from "react-router-dom";
import { Mail, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-center lg:justify-between items-center mb-8">
          <Link to="/" className="flex items-center text-lg font-semibold">
            <img src="/logo.svg" alt="Blinkly Logo" className="h-8 mr-2" />
            Blinkly
          </Link>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:support@blinkly.app" className="hover:text-gray-300">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/" className="text-base text-gray-300 hover:text-white">Features</Link></li>
              <li><Link to="/pricing" className="text-base text-gray-300 hover:text-white">Pricing</Link></li>
              <li><Link to="/api-docs" className="text-base text-gray-300 hover:text-white">API</Link></li>
              <li><Link to="/contact" className="text-base text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/about" className="text-base text-gray-300 hover:text-white">About</Link></li>
              <li><Link to="/" className="text-base text-gray-300 hover:text-white">Customers</Link></li>
              <li><Link to="/" className="text-base text-gray-300 hover:text-white">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/api-docs" className="text-base text-gray-300 hover:text-white">Documentation</Link></li>
              <li><Link to="/" className="text-base text-gray-300 hover:text-white">Support</Link></li>
              <li><Link to="/privacy" className="text-base text-gray-300 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-base text-gray-300 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="mailto:support@blinkly.app" className="text-base text-gray-300 hover:text-white">support@blinkly.app</a></li>
              <li><Link to="/contact" className="text-base text-gray-300 hover:text-white">Contact Form</Link></li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-6 text-center">
          <p className="text-base text-gray-500">
            &copy; {currentYear} Blinkly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
