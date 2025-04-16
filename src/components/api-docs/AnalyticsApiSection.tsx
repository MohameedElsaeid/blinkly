import {FileText} from "lucide-react";

const AnalyticsApiSection = () => {
    return (
        <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-4">
                <FileText className="mr-2 h-6 w-6 text-alchemy-purple-dark"/>
                Analytics API
            </h2>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Get Link Clicks</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                    <p className="font-mono text-sm mb-2">GET /analytics/link/{'{link_id}'}</p>
                    <div className="mb-2">
                        <h4 className="font-semibold">Request Headers:</h4>
                        <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{`Authorization: Bearer {your_access_token}`}
            </pre>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-2">Get Clicks by Date Range</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                    <p className="font-mono text-sm mb-2">GET
                        /analytics/link/{'{link_id}'}/date-range?start={'{start_date}'}&end={'{end_date}'}</p>
                    <div className="mb-2">
                        <h4 className="font-semibold">Request Headers:</h4>
                        <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{`Authorization: Bearer {your_access_token}`}
            </pre>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnalyticsApiSection;
