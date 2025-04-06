
import Sidebar from "@/components/dashboard/Sidebar";
import RecentLinks from "@/components/dashboard/RecentLinks";

const MyLinks = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Links</h1>
            
            <div className="mt-4">
              <RecentLinks showAllLinks={true} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyLinks;
