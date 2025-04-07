
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Link as LinkIcon } from "lucide-react";

const ApiDocs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>API Documentation - Blinkly</title>
        <meta name="description" content="Documentation for Blinkly's RESTful APIs for URL shortening and link management." />
      </Helmet>
      <Navbar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">API Documentation</h1>
            <p className="text-gray-600">Use our powerful APIs to create and manage short links programmatically.</p>
          </div>

          <div className="space-y-12">
            {/* Authentication Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-4">
                <FileText className="mr-2 h-6 w-6 text-alchemy-purple-dark" />
                Authentication
              </h2>
              <p className="mb-4">All API requests require authentication using a JWT token.</p>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Login</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-mono text-sm mb-2">POST /auth/login</p>
                  <div className="mb-2">
                    <h4 className="font-semibold">Request Body:</h4>
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{`{
  "email": "user@example.com",
  "password": "yourpassword"
}`}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-semibold">Response:</h4>
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{`{
  "access_token": "eyJhbGc...",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Register</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-mono text-sm mb-2">POST /auth/register</p>
                  <div className="mb-2">
                    <h4 className="font-semibold">Request Body:</h4>
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{`{
  "email": "user@example.com",
  "password": "yourpassword",
  "firstName": "John",
  "lastName": "Doe"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Links API Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-4">
                <LinkIcon className="mr-2 h-6 w-6 text-alchemy-purple-dark" />
                Links API
              </h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Create a Short Link</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-mono text-sm mb-2">POST /links</p>
                  <div className="mb-2">
                    <h4 className="font-semibold">Request Headers:</h4>
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{`Authorization: Bearer {your_access_token}`}
                    </pre>
                  </div>
                  <div className="mb-2">
                    <h4 className="font-semibold">Request Body:</h4>
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{`{
  "originalUrl": "https://example.com/very/long/url/that/needs/shortening",
  "alias": "custom-name",  // optional
  "tags": ["marketing", "campaign"]  // optional
}`}
                    </pre>
                  </div>
                  <div>
                    <h4 className="font-semibold">Response:</h4>
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{`{
  "id": "link-id",
  "originalUrl": "https://example.com/very/long/url/that/needs/shortening",
  "alias": "custom-name",
  "isActive": true,
  "tags": ["marketing", "campaign"],
  "clicks": 0,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Get All Links</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-mono text-sm mb-2">GET /links</p>
                  <div className="mb-2">
                    <h4 className="font-semibold">Request Headers:</h4>
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{`Authorization: Bearer {your_access_token}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Update a Link</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-mono text-sm mb-2">PATCH /links/{'{link_id}'}</p>
                  <div className="mb-2">
                    <h4 className="font-semibold">Request Headers:</h4>
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{`Authorization: Bearer {your_access_token}`}
                    </pre>
                  </div>
                  <div className="mb-2">
                    <h4 className="font-semibold">Request Body:</h4>
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{`{
  "originalUrl": "https://new-url.com",  // optional
  "alias": "new-alias",  // optional
  "isActive": false,  // optional
  "tags": ["updated", "tags"]  // optional
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Delete a Link</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-mono text-sm mb-2">DELETE /links/{'{link_id}'}</p>
                  <div className="mb-2">
                    <h4 className="font-semibold">Request Headers:</h4>
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{`Authorization: Bearer {your_access_token}`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Analytics API Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-4">
                <FileText className="mr-2 h-6 w-6 text-alchemy-purple-dark" />
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
                  <p className="font-mono text-sm mb-2">GET /analytics/link/{'{link_id}'}/date-range?start={'{start_date}'}&end={'{end_date}'}</p>
                  <div className="mb-2">
                    <h4 className="font-semibold">Request Headers:</h4>
                    <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{`Authorization: Bearer {your_access_token}`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApiDocs;
