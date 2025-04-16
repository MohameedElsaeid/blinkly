import {LinkIcon} from "lucide-react";

const ShortLinksApiSection = () => {
    return (
        <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center mb-4">
                <LinkIcon className="mr-2 h-6 w-6 text-alchemy-purple-dark"/>
                Short Links API
            </h2>
            <p className="mb-4">Create and manage basic short links with simple redirects.</p>

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
                <h3 className="text-xl font-semibold mb-2">Get All Short Links</h3>
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
                <h3 className="text-xl font-semibold mb-2">Update a Short Link</h3>
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
                <h3 className="text-xl font-semibold mb-2">Delete a Short Link</h3>
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
    );
};

export default ShortLinksApiSection;
