import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";
import {useState} from "react";
import {CalendarDays, Copy, Edit, ExternalLink, MoreHorizontal, QrCode, Trash2} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";

interface RecentLinksProps {
    showAllLinks?: boolean;
}

// In a real app, this would come from an API
const links = [
    {
        id: "1",
        originalUrl: "https://example.com/very/long/url/that-needs-shortening/for-better-sharing",
        shortUrl: "link.ly/abc123",
        alias: "example-promo",
        clicks: 245,
        createdAt: "2023-04-01T12:00:00Z",
        tags: ["marketing", "promo"],
        status: "active",
    },
    {
        id: "2",
        originalUrl: "https://anotherexample.com/product/item-123456",
        shortUrl: "link.ly/def456",
        alias: "spring-sale",
        clicks: 187,
        createdAt: "2023-04-05T15:30:00Z",
        tags: ["sales", "spring"],
        status: "active",
    },
    {
        id: "3",
        originalUrl: "https://testsite.com/blog/article-about-important-things",
        shortUrl: "link.ly/ghi789",
        alias: "blog-post",
        clicks: 56,
        createdAt: "2023-04-10T09:15:00Z",
        tags: ["blog", "content"],
        status: "inactive",
    },
    {
        id: "4",
        originalUrl: "https://docs.example.org/technical/documentation",
        shortUrl: "link.ly/jkl012",
        alias: "tech-docs",
        clicks: 327,
        createdAt: "2023-04-15T11:45:00Z",
        tags: ["technical", "documentation"],
        status: "active",
    },
    {
        id: "5",
        originalUrl: "https://webinar.example.net/registration/form",
        shortUrl: "link.ly/mno345",
        alias: "webinar-reg",
        clicks: 92,
        createdAt: "2023-04-20T14:00:00Z",
        tags: ["event", "webinar"],
        status: "active",
    },
];

const RecentLinks = ({showAllLinks = false}: RecentLinksProps) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter links based on search query
    const filteredLinks = links.filter(
        (link) =>
            link.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
            link.originalUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
            link.shortUrl.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Display all links if showAllLinks is true, otherwise only show 3
    const displayedLinks = showAllLinks ? filteredLinks : filteredLinks.slice(0, 3);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // In a real app, you would show a toast notification here
        console.log("Copied to clipboard:", text);
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{showAllLinks ? "All Links" : "Recent Links"}</CardTitle>
                <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input
                        type="text"
                        placeholder="Search links..."
                        className="max-w-[250px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {showAllLinks && (
                        <Button variant="outline" size="sm">
                            Filter
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {displayedLinks.length > 0 ? (
                        displayedLinks.map((link) => (
                            <div
                                key={link.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center mb-1">
                    <span className="font-medium truncate mr-2">
                      {link.alias}
                    </span>
                                        <Badge variant={link.status === "active" ? "outline" : "secondary"}>
                                            {link.status}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate mb-1">
                                        {link.originalUrl}
                                    </p>
                                    <div className="flex items-center text-sm text-alchemy-purple">
                                        <span className="font-medium">{link.shortUrl}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 ml-1"
                                            onClick={() => copyToClipboard(link.shortUrl)}
                                        >
                                            <Copy className="h-3 w-3"/>
                                        </Button>
                                    </div>
                                    <div className="flex gap-1 mt-1">
                                        {link.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center mt-3 sm:mt-0 space-x-2">
                                    <div className="flex items-center text-sm text-gray-600 mr-3">
                                        <CalendarDays className="h-4 w-4 mr-1"/>
                                        {formatDate(link.createdAt)}
                                    </div>
                                    <div className="text-sm font-medium">
                                        {link.clicks} clicks
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4"/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Edit className="h-4 w-4 mr-2"/>
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <QrCode className="h-4 w-4 mr-2"/>
                                                QR Code
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <ExternalLink className="h-4 w-4 mr-2"/>
                                                Open
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer text-destructive">
                                                <Trash2 className="h-4 w-4 mr-2"/>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-6 text-gray-500">
                            No links found matching your search.
                        </div>
                    )}

                    {!showAllLinks && links.length > 3 && (
                        <div className="text-center pt-2">
                            <Button variant="link" asChild>
                                <Link to="/dashboard/links">View All Links</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentLinks;
