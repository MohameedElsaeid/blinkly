
import { Zap } from "lucide-react";

const DynamicLinksApiSection = () => {
  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-4">
        <Zap className="mr-2 h-6 w-6 text-alchemy-purple-dark" />
        Dynamic Links API
      </h2>
      <p className="mb-4">Create and manage powerful dynamic links with advanced features like conditional redirects, device targeting, and deep linking.</p>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Create a Dynamic Link</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="font-mono text-sm mb-2">POST /dynamic-links</p>
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
  "name": "My Dynamic Link",
  "alias": "custom-dynamic",  // optional
  "defaultUrl": "https://example.com/fallback",
  "rules": [
    {
      "platform": "ios",
      "url": "https://apps.apple.com/app/my-app",
      "minimumVersion": "1.0.0"
    },
    {
      "platform": "android",
      "url": "https://play.google.com/store/apps/details?id=com.example.app",
      "packageName": "com.example.app",
      "minimumVersion": "1.0.0"
    },
    {
      "platform": "web",
      "url": "https://example.com/web-version"
    }
  ],
  "utmParameters": {  // optional
    "source": "email",
    "medium": "cpc",
    "campaign": "spring_sale"
  },
  "tags": ["app-install", "promotion"]  // optional
}`}
            </pre>
          </div>
          <div>
            <h4 className="font-semibold">Response:</h4>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{`{
  "id": "dynamic-link-id",
  "name": "My Dynamic Link",
  "alias": "custom-dynamic",
  "defaultUrl": "https://example.com/fallback",
  "rules": [...],
  "utmParameters": {...},
  "isActive": true,
  "tags": ["app-install", "promotion"],
  "clicks": 0,
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}`}
            </pre>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Get All Dynamic Links</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="font-mono text-sm mb-2">GET /dynamic-links</p>
          <div className="mb-2">
            <h4 className="font-semibold">Request Headers:</h4>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
{`Authorization: Bearer {your_access_token}`}
            </pre>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Update a Dynamic Link</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="font-mono text-sm mb-2">PATCH /dynamic-links/{'{link_id}'}</p>
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
  "name": "Updated Dynamic Link",  // optional
  "defaultUrl": "https://example.com/new-fallback",  // optional
  "rules": [...],  // optional
  "utmParameters": {...},  // optional
  "isActive": false,  // optional
  "tags": ["updated", "tags"]  // optional
}`}
            </pre>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Delete a Dynamic Link</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="font-mono text-sm mb-2">DELETE /dynamic-links/{'{link_id}'}</p>
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

export default DynamicLinksApiSection;
