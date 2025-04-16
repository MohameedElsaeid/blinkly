import Sidebar from "@/components/dashboard/Sidebar";
import RecentLinks from "@/components/dashboard/RecentLinks";
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";

const MyLinks = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar/>
            <div className="md:pl-64 flex flex-col flex-1">
                <main className="flex-1 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-900">My Links</h1>
                            <Button
                                className="bg-alchemy-purple hover:bg-alchemy-purple-dark"
                                onClick={() => window.location.href = "/dashboard/links/create"}
                            >
                                <Plus className="h-4 w-4 mr-2"/>
                                Create Dynamic Link
                            </Button>
                        </div>

                        <div className="mt-4">
                            <RecentLinks showAllLinks={true}/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MyLinks;
