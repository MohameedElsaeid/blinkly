
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import SignupForm from "@/components/signup/SignupForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Signup = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Join Blinkly
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Create your free account and start transforming your links today
            </p>
          </div>
          
          <Card className="shadow-lg border-0 overflow-hidden bg-white/80 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/30 to-purple-100/30 opacity-50 z-0"></div>
            
            <CardHeader className="relative z-10 space-y-1 pb-6 border-b">
              <CardTitle className="text-2xl font-bold text-center text-gray-800">Create an Account</CardTitle>
              <CardDescription className="text-center text-gray-600">
                Fill in your information to get started
              </CardDescription>
            </CardHeader>
            
            <CardContent className="relative z-10 pt-6">
              <SignupForm />
            </CardContent>
            
            <CardFooter className="flex justify-center border-t p-6 bg-gray-50/80 relative z-10">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
