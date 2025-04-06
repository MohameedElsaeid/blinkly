
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Globe, Smartphone, Desktop, ArrowRight, Upload, Link, Link2, Image as ImageIcon } from "lucide-react";

const CreateDynamicLink = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [primaryUrl, setPrimaryUrl] = useState("");
  const [mobileUrl, setMobileUrl] = useState("");
  const [desktopUrl, setDesktopUrl] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [additionalParams, setAdditionalParams] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [linkType, setLinkType] = useState("standard");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!primaryUrl) {
      toast.error("Primary destination URL is required");
      return;
    }

    setIsSubmitting(true);
    
    // Mock API call - would be replaced with actual API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Dynamic link created successfully!");
      navigate("/dashboard/links");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Create Dynamic Link</h1>
              <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/links")}>
                Cancel
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Destination URLs Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5" />
                        Destination URLs
                      </CardTitle>
                      <CardDescription>
                        Configure where your users will be directed when they click your link
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="primary-url" className="font-medium">
                          Primary Destination URL <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="primary-url"
                          type="url"
                          placeholder="https://example.com/landing-page"
                          value={primaryUrl}
                          onChange={(e) => setPrimaryUrl(e.target.value)}
                          required
                        />
                        <p className="text-sm text-muted-foreground">
                          The default URL where users will be directed
                        </p>
                      </div>

                      <RadioGroup value={linkType} onValueChange={setLinkType} className="grid gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="font-medium">Standard Link</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="dynamic" id="dynamic" />
                          <Label htmlFor="dynamic" className="font-medium">Dynamic Link (Platform-Specific Redirection)</Label>
                        </div>
                      </RadioGroup>

                      {linkType === "dynamic" && (
                        <div className="space-y-4 pt-4 border-t">
                          <div className="space-y-2">
                            <Label htmlFor="mobile-url" className="flex items-center gap-2 font-medium">
                              <Smartphone className="h-4 w-4" />
                              Mobile URL / Deep Link
                            </Label>
                            <Input
                              id="mobile-url"
                              type="url"
                              placeholder="app://open/content or https://m.example.com"
                              value={mobileUrl}
                              onChange={(e) => setMobileUrl(e.target.value)}
                            />
                            <p className="text-sm text-muted-foreground">
                              URL for mobile users or deep link into your app
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="desktop-url" className="flex items-center gap-2 font-medium">
                              <Desktop className="h-4 w-4" />
                              Desktop URL (Optional)
                            </Label>
                            <Input
                              id="desktop-url"
                              type="url"
                              placeholder="https://example.com/desktop-version"
                              value={desktopUrl}
                              onChange={(e) => setDesktopUrl(e.target.value)}
                            />
                            <p className="text-sm text-muted-foreground">
                              URL for desktop users if different from primary URL
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="fallback-url" className="flex items-center gap-2 font-medium">
                              <ArrowRight className="h-4 w-4" />
                              Fallback URL (Optional)
                            </Label>
                            <Input
                              id="fallback-url"
                              type="url"
                              placeholder="https://example.com/fallback"
                              value={fallbackUrl}
                              onChange={(e) => setFallbackUrl(e.target.value)}
                            />
                            <p className="text-sm text-muted-foreground">
                              Backup URL if other conditions aren't met
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Customization Options */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Link className="h-5 w-5" />
                        Customization Options
                      </CardTitle>
                      <CardDescription>
                        Personalize your link to match your brand
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="custom-alias" className="font-medium">Custom Alias (Optional)</Label>
                        <div className="flex">
                          <div className="bg-muted px-3 py-2 text-sm rounded-l-md border border-r-0 border-input flex items-center">
                            linkalchemy.co/
                          </div>
                          <Input
                            id="custom-alias"
                            type="text"
                            placeholder="your-brand-name"
                            value={customAlias}
                            onChange={(e) => setCustomAlias(e.target.value)}
                            className="rounded-l-none"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          A memorable branded alias for your link (leave empty for auto-generated)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="additional-params" className="font-medium">Additional Parameters (Optional)</Label>
                        <Input
                          id="additional-params"
                          type="text"
                          placeholder="utm_source=newsletter&utm_medium=email"
                          value={additionalParams}
                          onChange={(e) => setAdditionalParams(e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                          Query parameters for tracking or personalization (e.g., UTM parameters)
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Social Sharing Metadata */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ImageIcon className="h-5 w-5" />
                        Social Sharing Metadata
                      </CardTitle>
                      <CardDescription>
                        Enhance how your link appears when shared on social platforms
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="font-medium">Title</Label>
                        <Input
                          id="title"
                          type="text"
                          placeholder="Your compelling headline"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                          Main headline displayed in the link preview
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="font-medium">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Brief description of your content"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="min-h-24 resize-y"
                        />
                        <p className="text-sm text-muted-foreground">
                          Context or enticing information shown in the link preview
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="image-url" className="font-medium">Image URL</Label>
                        <Input
                          id="image-url"
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                        />
                        <div className="flex items-center mt-2">
                          <div className="h-px flex-1 bg-muted"></div>
                          <span className="px-2 text-xs text-muted-foreground">OR</span>
                          <div className="h-px flex-1 bg-muted"></div>
                        </div>
                        <div className="flex justify-center pt-2">
                          <Button type="button" variant="outline" size="sm" className="flex items-center gap-2">
                            <Upload className="h-4 w-4" />
                            Upload Image
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                          Image displayed in the link preview (1200×630px recommended)
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="px-6 bg-alchemy-purple hover:bg-alchemy-purple-dark"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Creating Link..." : "Create Dynamic Link"}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Preview Panel */}
              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Link Preview</CardTitle>
                      <CardDescription>
                        How your link will appear when shared
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="social" className="w-full">
                        <TabsList className="w-full">
                          <TabsTrigger value="social" className="flex-1">Social</TabsTrigger>
                          <TabsTrigger value="link" className="flex-1">Link</TabsTrigger>
                        </TabsList>
                        <TabsContent value="social" className="mt-4">
                          <div className="border rounded-md overflow-hidden">
                            {imageUrl ? (
                              <div className="aspect-[1200/630] bg-muted relative">
                                <img 
                                  src={imageUrl} 
                                  alt="Preview" 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                                  }} 
                                />
                              </div>
                            ) : (
                              <div className="aspect-[1200/630] bg-muted flex items-center justify-center">
                                <ImageIcon className="h-10 w-10 text-muted-foreground/50" />
                              </div>
                            )}
                            <div className="p-3 bg-white border-t">
                              <div className="text-xs text-muted-foreground mb-1">linkalchemy.co</div>
                              <h3 className="text-sm font-medium leading-snug line-clamp-1">{title || "Your link title will appear here"}</h3>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description || "Your description will provide context about your link here"}</p>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="link" className="mt-4">
                          <div className="space-y-4">
                            <div className="bg-muted p-3 rounded-md flex items-center gap-2">
                              <Link2 className="h-4 w-4 text-alchemy-purple shrink-0" />
                              <span className="text-sm font-medium truncate">
                                linkalchemy.co/{customAlias || "your-link"}
                              </span>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <span className="text-xs truncate">{primaryUrl || "Primary URL"}</span>
                              </div>
                              
                              {linkType === "dynamic" && (
                                <>
                                  {mobileUrl && (
                                    <div className="flex items-center gap-2">
                                      <Smartphone className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-xs truncate">{mobileUrl}</span>
                                    </div>
                                  )}
                                  
                                  {desktopUrl && (
                                    <div className="flex items-center gap-2">
                                      <Desktop className="h-4 w-4 text-muted-foreground" />
                                      <span className="text-xs truncate">{desktopUrl}</span>
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateDynamicLink;
