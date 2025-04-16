import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {toast} from "sonner";
import {CopyIcon, Link2} from "lucide-react";

const LinkCreator = () => {
    const [longUrl, setLongUrl] = useState("");
    const [customAlias, setCustomAlias] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [shortLink, setShortLink] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!longUrl) {
            toast.error("Please enter a URL to shorten");
            return;
        }

        setIsSubmitting(true);

        // Mock API call - in a real app, this would be an actual API request
        setTimeout(() => {
            const domain = "blinkly.app";
            const alias = customAlias || Math.random().toString(36).substring(2, 8);
            setShortLink(`${domain}/${alias}`);
            setIsSubmitting(false);
            toast.success("Link created successfully!");
        }, 1000);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`https://${shortLink}`);
        toast.success("Link copied to clipboard!");
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Create New Link</CardTitle>
                <CardDescription>
                    Shorten your URL and customize it to match your brand
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="long-url">Long URL</Label>
                        <Input
                            id="long-url"
                            type="url"
                            placeholder="https://example.com/your/long/url"
                            value={longUrl}
                            onChange={(e) => setLongUrl(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="custom-alias">Custom Alias (Optional)</Label>
                        <div className="flex">
                            <div
                                className="bg-alchemy-purple/10 text-alchemy-purple px-3 py-2 text-sm rounded-l-md border border-r-0 border-input flex items-center">
                                blinkly.app/
                            </div>
                            <Input
                                id="custom-alias"
                                type="text"
                                placeholder="your-brand"
                                value={customAlias}
                                onChange={(e) => setCustomAlias(e.target.value)}
                                className="rounded-l-none"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Leave empty to generate a random alias
                        </p>
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-alchemy-purple hover:bg-alchemy-purple-dark"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Creating..." : "Create Short Link"}
                    </Button>
                </form>

                {shortLink && (
                    <div className="mt-6 p-4 bg-alchemy-purple/5 rounded-md">
                        <div className="flex items-center justify-between mb-2">
                            <Label>Your Short Link</Label>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-alchemy-purple"
                                onClick={copyToClipboard}
                            >
                                <CopyIcon className="h-4 w-4 mr-1"/>
                                Copy
                            </Button>
                        </div>
                        <div className="flex items-center bg-white p-2 rounded border">
                            <Link2 className="h-4 w-4 text-alchemy-purple mr-2"/>
                            <span className="text-sm font-medium">https://{shortLink}</span>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default LinkCreator;
