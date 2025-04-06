
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  CopyIcon, 
  ExternalLink, 
  MoreHorizontal, 
  QrCode, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  CheckCircle,
  AlertCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Mock data for links
const recentLinks = [
  {
    id: 1,
    originalUrl: "https://example.com/very/long/url/path/that/is/hard/to/remember",
    shortUrl: "linkalchemy.co/brand1",
    clicks: 128,
    createdAt: "2023-04-02",
    tags: ["marketing", "social"],
    status: "active",
    isVerified: true
  },
  {
    id: 2,
    originalUrl: "https://another-example.com/blog/top-10-tips-for-productivity",
    shortUrl: "linkalchemy.co/tips10",
    clicks: 75,
    createdAt: "2023-04-01",
    tags: ["blog", "content"],
    status: "active",
    isVerified: true
  },
  {
    id: 3,
    originalUrl: "https://third-example.com/products/new-tech-gadget-2023",
    shortUrl: "linkalchemy.co/gadget",
    clicks: 42,
    createdAt: "2023-03-28",
    tags: ["product", "tech"],
    status: "inactive",
    isVerified: false
  },
];

const RecentLinks = () => {
  const [links, setLinks] = useState(recentLinks);
  const [searchTerm, setSearchTerm] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [selectedLinkForEdit, setSelectedLinkForEdit] = useState<any>(null);
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<number | null>(null);

  // Filter links based on search term
  const filteredLinks = links.filter(link => 
    link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) || 
    link.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    link.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(`https://${url}`);
    toast.success("Link copied to clipboard!");
  };

  const handleShowQrCode = (url: string) => {
    setQrCodeUrl(url);
    setIsQrDialogOpen(true);
  };

  const handleEditLink = (link: any) => {
    setSelectedLinkForEdit({...link});
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedLinkForEdit) {
      setLinks(prevLinks => 
        prevLinks.map(link => 
          link.id === selectedLinkForEdit.id ? selectedLinkForEdit : link
        )
      );
      setIsEditDialogOpen(false);
      toast.success("Link updated successfully!");
    }
  };

  const confirmDelete = (id: number) => {
    setLinkToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (linkToDelete) {
      setLinks(prevLinks => prevLinks.filter(link => link.id !== linkToDelete));
      setIsDeleteDialogOpen(false);
      toast.success("Link deleted successfully!");
    }
  };

  const toggleLinkStatus = (id: number) => {
    setLinks(prevLinks => 
      prevLinks.map(link => 
        link.id === id 
          ? {...link, status: link.status === "active" ? "inactive" : "active"}
          : link
      )
    );
    toast.success("Link status updated!");
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div>
          <CardTitle>Link Management</CardTitle>
          <CardDescription>
            Manage and organize your shortened links
          </CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search links or tags..."
              className="pl-9 w-[200px] lg:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Active Links</DropdownMenuItem>
              <DropdownMenuItem>Inactive Links</DropdownMenuItem>
              <DropdownMenuItem>Most Clicked</DropdownMenuItem>
              <DropdownMenuItem>Recently Created</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Clear Filters</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <div className="grid grid-cols-12 bg-muted py-2 px-4 text-xs font-medium text-muted-foreground">
            <div className="col-span-4 md:col-span-4">Original URL</div>
            <div className="col-span-3 md:col-span-2">Short Link</div>
            <div className="col-span-2 md:col-span-1 text-center">Status</div>
            <div className="col-span-1 md:col-span-1 text-center">Clicks</div>
            <div className="hidden md:block md:col-span-2">Tags</div>
            <div className="col-span-2 md:col-span-2 text-right">Actions</div>
          </div>
          <div className="divide-y">
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link) => (
                <div key={link.id} className="grid grid-cols-12 py-3 px-4 items-center text-sm">
                  <div className="col-span-4 md:col-span-4 truncate" title={link.originalUrl}>
                    <div className="flex items-center">
                      {link.isVerified ? (
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                      )}
                      <span className="truncate">{link.originalUrl}</span>
                    </div>
                  </div>
                  <div className="col-span-3 md:col-span-2 font-medium text-alchemy-purple truncate">
                    {link.shortUrl}
                  </div>
                  <div className="col-span-2 md:col-span-1 text-center">
                    <Badge variant={link.status === "active" ? "outline" : "secondary"} className={
                      link.status === "active" ? "bg-green-50 text-green-700 hover:bg-green-100" : "bg-gray-100"
                    }>
                      {link.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="col-span-1 md:col-span-1 text-center">{link.clicks}</div>
                  <div className="hidden md:flex md:col-span-2 gap-1 flex-wrap">
                    {link.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-alchemy-purple/10 text-alchemy-purple hover:bg-alchemy-purple/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
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
                      onClick={() => handleShowQrCode(link.shortUrl)}
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
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleEditLink(link)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => toggleLinkStatus(link.id)}
                        >
                          {link.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="cursor-pointer text-destructive"
                          onClick={() => confirmDelete(link.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                No links found matching your search
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <Button variant="outline" className="text-alchemy-purple">
            View All Links
          </Button>
        </div>

        {/* QR Code Dialog */}
        <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>QR Code for your Link</DialogTitle>
              <DialogDescription>
                Scan this QR code to access your shortened link or download it to use in print materials.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center p-4">
              {/* Placeholder for QR code image */}
              <div className="w-64 h-64 bg-gray-100 border flex items-center justify-center">
                <QrCode className="h-32 w-32 text-gray-400" />
              </div>
              <p className="mt-4 text-sm text-center text-muted-foreground">
                https://{qrCodeUrl}
              </p>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
              <Button 
                variant="outline"
                className="sm:w-auto w-full" 
                onClick={() => copyToClipboard(qrCodeUrl)}
              >
                <CopyIcon className="h-4 w-4 mr-2" />
                Copy URL
              </Button>
              <Button className="sm:w-auto w-full bg-alchemy-purple hover:bg-alchemy-purple-dark">
                Download QR Code
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Link Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Link</DialogTitle>
              <DialogDescription>
                Update details for your shortened link.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="originalUrl" className="text-sm font-medium">Original URL</label>
                <Input 
                  id="originalUrl" 
                  value={selectedLinkForEdit?.originalUrl || ''} 
                  onChange={(e) => setSelectedLinkForEdit({...selectedLinkForEdit, originalUrl: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="shortUrl" className="text-sm font-medium">Custom Alias</label>
                <div className="flex">
                  <div className="bg-alchemy-purple/10 text-alchemy-purple px-3 py-2 text-sm rounded-l-md border border-r-0 border-input flex items-center">
                    linkalchemy.co/
                  </div>
                  <Input 
                    id="shortUrl" 
                    className="rounded-l-none"
                    value={selectedLinkForEdit?.shortUrl.replace('linkalchemy.co/', '') || ''} 
                    onChange={(e) => setSelectedLinkForEdit({...selectedLinkForEdit, shortUrl: `linkalchemy.co/${e.target.value}`})}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="tags" className="text-sm font-medium">Tags (comma separated)</label>
                <Input 
                  id="tags" 
                  value={selectedLinkForEdit?.tags.join(', ') || ''} 
                  onChange={(e) => setSelectedLinkForEdit({
                    ...selectedLinkForEdit, 
                    tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                  })}
                />
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="status" className="text-sm font-medium">Status</label>
                <select 
                  id="status"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background"
                  value={selectedLinkForEdit?.status || 'active'}
                  onChange={(e) => setSelectedLinkForEdit({...selectedLinkForEdit, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button 
                className="bg-alchemy-purple hover:bg-alchemy-purple-dark"
                onClick={handleSaveEdit}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this link? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:justify-end">
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDelete}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default RecentLinks;
