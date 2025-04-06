
import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Link2 } from "lucide-react";

const QRCodes = () => {
  // Sample QR data - would be fetched from API in a real app
  const qrCodes = [
    { id: 1, name: "Blog Post Link", url: "https://example.com/blog/post-1" },
    { id: 2, name: "Product Page", url: "https://example.com/product/123" },
    { id: 3, name: "Contact Form", url: "https://example.com/contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">QR Codes</h1>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {qrCodes.map((qr) => (
                <Card key={qr.id} className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="truncate text-base">{qr.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center p-6">
                    {/* This would be a real QR code component in production */}
                    <div className="bg-gray-200 w-40 h-40 flex items-center justify-center">
                      <Link2 className="text-gray-500" size={40} />
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 px-6 py-3 flex justify-between items-center text-sm">
                    <div className="truncate max-w-[150px]">{qr.url}</div>
                    <Button size="sm" variant="ghost">
                      <Download size={16} className="mr-1" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QRCodes;
