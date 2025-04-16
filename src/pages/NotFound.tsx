import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="max-w-md w-full text-center">
                <h1 className="text-6xl font-bold text-alchemy-purple">404</h1>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">Page not found</h2>
                <p className="mt-4 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
                <div className="mt-8">
                    <Button className="bg-alchemy-purple hover:bg-alchemy-purple-dark" asChild>
                        <Link to="/">
                            Back to home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
