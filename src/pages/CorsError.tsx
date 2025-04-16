import React from 'react';
import {Button} from "@/components/ui/button";
import {useNavigate} from 'react-router-dom';
import {AlertTriangle} from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CorsError = () => {
    const navigate = useNavigate();
    const allowedOrigins = import.meta.env.VITE_ALLOWED_ORIGINS?.split(',') || ['https://blinkly.app'];

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar/>
            <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full text-center">
                    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle className="h-12 w-12 text-red-600"/>
                    </div>

                    <h1 className="mt-6 text-3xl font-bold text-gray-900">
                        Cross-Origin Request Blocked
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Your request was blocked due to Cross-Origin Resource Sharing (CORS) restrictions.
                    </p>

                    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <h2 className="text-lg font-semibold text-amber-800">Possible Reasons:</h2>
                        <ul className="mt-2 text-sm text-amber-700 text-left list-disc list-inside">
                            <li>You're accessing from an unauthorized domain</li>
                            <li>Your browser has an extension interfering with requests</li>
                            <li>There's a network proxy intercepting requests</li>
                        </ul>
                    </div>

                    <div className="mt-6">
                        <h3 className="font-semibold text-gray-700">Allowed Origins:</h3>
                        <ul className="mt-2 space-y-1">
                            {allowedOrigins.map((origin, index) => (
                                <li key={index} className="text-sm text-gray-600">
                                    {origin}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-8 space-y-4">
                        <Button
                            onClick={() => navigate('/')}
                            className="w-full"
                        >
                            Return to Homepage
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => window.location.reload()}
                            className="w-full"
                        >
                            Retry Request
                        </Button>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default CorsError;
