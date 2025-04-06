
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyIcon, ExternalLink, MoreHorizontal, QrCode } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Mock data
const recentLinks = [
  {
    id: 1,
    originalUrl: "https://example.com/very/long/url/path/that/is/hard/to/remember",
    shortUrl: "linkalchemy.co/brand1",
    clicks: 128,
    createdAt: "2023-04-02",
  },
  {
    id: 2,
    originalUrl: "https://another-example.com/blog/top-10-tips-for-productivity",
    shortUrl: "linkalchemy.co/tips10",
    clicks: 75,
    createdAt: "2023-04-01",
  },
  {
    id: 3,
    originalUrl: "https://third-example.com/products/new-tech-gadget-2023",
    shortUrl: "linkalchemy.co/gadget",
    clicks: 42,
    createdAt: "2023-03-28",
  },
];

const RecentLinks = () => {
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(`https://${url}`);
    toast.success("Link copied to clipboard!");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Links</CardTitle>
        <CardDescription>
          Your most recently created short links
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <div className="grid grid-cols-12 bg-muted py-2 px-4 text-xs font-medium text-muted-foreground">
            <div className="col-span-5 md:col-span-5">Original URL</div>
            <div className="col-span-3 md:col-span-3">Short Link</div>
            <div className="col-span-2 md:col-span-2 text-center">Clicks</div>
            <div className="col-span-2 md:col-span-2 text-right">Actions</div>
          </div>
          <div className="divide-y">
            {recentLinks.map((link) => (
              <div key={link.id} className="grid grid-cols-12 py-3 px-4 items-center text-sm">
                <div className="col-span-5 md:col-span-5 truncate" title={link.originalUrl}>
                  {link.originalUrl}
                </div>
                <div className="col-span-3 md:col-span-3 font-medium text-alchemy-purple">
                  {link.shortUrl}
                </div>
                <div className="col-span-2 md:col-span-2 text-center">{link.clicks}</div>
                <div className="col-span-2 md:col-span-2 flex justify-end space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(link.shortUrl)}
                  >
                    <CopyIcon className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <QrCode className="h-4 w-4" />
                    <span className="sr-only">QR Code</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        View Analytics
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <Button variant="outline" className="text-alchemy-purple">
            View All Links
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentLinks;
