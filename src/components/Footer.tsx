
import { Link } from "react-router-dom";
import { Mail, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <Link to="/" className="flex items-center text-lg font-semibold mb-4 md:mb-0">
            <div className="h-8 w-8 mr-2 bg-gradient-to-r from-blinkly-purple to-blinkly-teal rounded-md flex items-center justify-center">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-white"
              >
                <path 
                  d="M3 9L12 4.5L21 9L12 13.5L3 9Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M3 14L12 18.5L21 14" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>Blinkly</span>
          </Link>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:support@blinkly.app" className="text-gray-400 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/" className="text-base text-gray-300 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-base text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/api-docs" className="text-base text-gray-300 hover:text-white transition-colors">API</Link></li>
              <li><Link to="/blog" className="text-base text-gray-300 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/about" className="text-base text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/" className="text-base text-gray-300 hover:text-white transition-colors">Customers</Link></li>
              <li><Link to="/contact" className="text-base text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/" className="text-base text-gray-300 hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li><Link to="/api-docs" className="text-base text-gray-300 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/" className="text-base text-gray-300 hover:text-white transition-colors">Support</Link></li>
              <li><Link to="/privacy" className="text-base text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-base text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="mailto:support@blinkly.app" className="text-base text-gray-300 hover:text-white transition-colors">support@blinkly.app</a></li>
              <li><Link to="/contact" className="text-base text-gray-300 hover:text-white transition-colors">Contact Form</Link></li>
              <li><span className="text-base text-gray-300">+1 (555) 123-4567</span></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Blinkly. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
