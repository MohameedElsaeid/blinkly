import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import SignupForm from "@/components/signup/SignupForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Signup = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join LinkAlchemy Lab and start transforming your links
            </p>
          </div>
          
          <Card className="shadow-lg border-gray-200">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Sign up</CardTitle>
              <CardDescription className="text-center">
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <SignupForm />
            </CardContent>
            
            <CardFooter className="flex justify-center border-t p-6">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-alchemy-purple hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
