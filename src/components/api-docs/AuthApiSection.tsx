
import { FileText } from "lucide-react";

const AuthApiSection = () => {
  return (
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
  );
};

export default AuthApiSection;
