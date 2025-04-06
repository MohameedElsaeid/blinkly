
import Sidebar from "@/components/dashboard/Sidebar";
import StatsCards from "@/components/dashboard/StatsCards";
import LinkCreator from "@/components/dashboard/LinkCreator";
import RecentLinks from "@/components/dashboard/RecentLinks";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
            <StatsCards />
            
            <div className="mt-8 grid gap-6 md:grid-cols-12">
              <div className="md:col-span-5">
                <LinkCreator />
              </div>
              <div className="md:col-span-7">
                <RecentLinks />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
