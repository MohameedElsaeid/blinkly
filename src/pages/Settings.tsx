
import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { BadgeCheck, CreditCard, Shield, Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Settings = () => {
  const [currentPlan, setCurrentPlan] = useState("free");
  
  // Mock subscription data - would come from API in real app
  const subscriptionPlans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Basic link shortening for personal use",
      features: [
        "Create up to 25 short links",
        "Basic click analytics",
        "Standard QR code generation",
        "24-hour support response time"
      ],
      cta: "Current Plan",
      color: "bg-gray-100",
      textColor: "text-gray-900",
      buttonColor: "bg-gray-200 hover:bg-gray-300",
      popular: false,
      disabled: true
    },
    {
      id: "pro",
      name: "Pro",
      price: "$12",
      period: "month",
      description: "Advanced features for creators and small businesses",
      features: [
        "Create up to 500 short links",
        "Detailed analytics with geographic data",
        "Custom QR code designs",
        "Social media preview customization",
        "4-hour support response time",
        "No ads"
      ],
      cta: "Upgrade to Pro",
      color: "bg-purple-50",
      textColor: "text-purple-900",
      buttonColor: "bg-purple-600 hover:bg-purple-700 text-white",
      popular: true,
      disabled: false
    },
    {
      id: "business",
      name: "Business",
      price: "$49",
      period: "month",
      description: "Powerful tools for teams and companies",
      features: [
        "Unlimited short links",
        "Advanced analytics with API access",
        "Branded domain names",
        "Team collaboration features",
        "Priority 1-hour support",
        "Custom integrations",
        "No ads"
      ],
      cta: "Upgrade to Business",
      color: "bg-blue-50",
      textColor: "text-blue-900",
      buttonColor: "bg-blue-600 hover:bg-blue-700 text-white",
      popular: false,
      disabled: false
    }
  ];
  
  // Mock payment method
  const paymentMethod = {
    type: "Credit Card",
    last4: "4242",
    expiry: "04/25",
    brand: "Visa"
  };
  
  // Mock billing history
  const billingHistory = [
    { date: "Apr 1, 2025", amount: "$12.00", status: "Paid", invoice: "#INV-001" },
    { date: "Mar 1, 2025", amount: "$12.00", status: "Paid", invoice: "#INV-002" },
    { date: "Feb 1, 2025", amount: "$12.00", status: "Paid", invoice: "#INV-003" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>
            
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      Update your account details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john@example.com" />
                    </div>
                    <Button className="mt-4">Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>
                      Customize your experience
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email updates about your link activity
                        </p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-qr">Automatic QR Code Generation</Label>
                        <p className="text-sm text-muted-foreground">
                          Generate QR codes for all new links
                        </p>
                      </div>
                      <Switch id="auto-qr" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="subscription">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Current Subscription</CardTitle>
                    <CardDescription>
                      Manage your subscription plan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-full ${currentPlan === "pro" ? "bg-purple-100" : currentPlan === "business" ? "bg-blue-100" : "bg-gray-100"} flex items-center justify-center mr-4`}>
                        {currentPlan !== "free" ? (
                          <BadgeCheck className={`h-6 w-6 ${currentPlan === "pro" ? "text-purple-600" : "text-blue-600"}`} />
                        ) : (
                          <CreditCard className="h-6 w-6 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">
                          {subscriptionPlans.find(plan => plan.id === currentPlan)?.name} Plan
                        </h3>
                        <p className="text-sm text-gray-500">
                          {currentPlan === "free" 
                            ? "Basic features, limited usage" 
                            : `${subscriptionPlans.find(plan => plan.id === currentPlan)?.price}/${subscriptionPlans.find(plan => plan.id === currentPlan)?.period}`}
                        </p>
                      </div>
                    </div>
                    
                    {currentPlan !== "free" && (
                      <Button variant="outline" className="mt-2">Cancel Subscription</Button>
                    )}
                  </CardContent>
                </Card>
                
                <h3 className="text-lg font-medium mb-4">Available Plans</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {subscriptionPlans.map((plan) => (
                    <Card key={plan.id} className={`${plan.color} border ${plan.popular ? "border-purple-500" : "border-gray-200"} relative`}>
                      {plan.popular && (
                        <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full py-1 px-2">
                          Popular
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle>{plan.name}</CardTitle>
                        <div className="mt-2">
                          <span className="text-2xl font-bold">{plan.price}</span>
                          <span className="text-sm text-gray-600">/{plan.period}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4">{plan.description}</p>
                        <ul className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <BadgeCheck className={`h-5 w-5 ${plan.id === "pro" ? "text-purple-600" : plan.id === "business" ? "text-blue-600" : "text-gray-600"} mr-2 shrink-0`} />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              className={`w-full ${plan.buttonColor}`} 
                              disabled={plan.disabled || plan.id === currentPlan}
                            >
                              {plan.id === currentPlan ? "Current Plan" : plan.cta}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Upgrade to {plan.name} Plan</DialogTitle>
                              <DialogDescription>
                                You'll be charged {plan.price} per {plan.period}. Your first 7 days are free - cancel anytime during this period at no charge.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input id="card-number" placeholder="1234 5678 9012 3456" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="expiry">Expiry Date</Label>
                                  <Input id="expiry" placeholder="MM/YY" />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="cvc">CVC</Label>
                                  <Input id="cvc" placeholder="123" />
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <Button variant="outline">Cancel</Button>
                              <Button>Subscribe</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="billing">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                      <CardDescription>
                        Manage your payment details
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {paymentMethod ? (
                        <div className="flex items-center space-x-4">
                          <div className="bg-gray-100 p-2 rounded">
                            <CreditCard className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-medium">{paymentMethod.brand} •••• {paymentMethod.last4}</p>
                            <p className="text-sm text-gray-500">Expires {paymentMethod.expiry}</p>
                          </div>
                          <Button variant="outline" size="sm" className="ml-auto">
                            Edit
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center p-4">
                          <p className="text-muted-foreground mb-4">No payment method on file</p>
                          <Button>Add Payment Method</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Billing History</CardTitle>
                      <CardDescription>
                        View your recent invoices
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-md border">
                          <div className="grid grid-cols-5 p-4 text-sm font-medium">
                            <div>Date</div>
                            <div>Invoice</div>
                            <div>Amount</div>
                            <div>Status</div>
                            <div></div>
                          </div>
                          {billingHistory.length > 0 ? (
                            <div className="divide-y">
                              {billingHistory.map((bill, index) => (
                                <div key={index} className="grid grid-cols-5 p-4 text-sm">
                                  <div>{bill.date}</div>
                                  <div>{bill.invoice}</div>
                                  <div>{bill.amount}</div>
                                  <div>
                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                      {bill.status}
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <Button variant="ghost" size="sm">Download</Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="p-4 text-center text-muted-foreground">No billing history available</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>
                      Manage your security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button className="mt-4">Update Password</Button>
                    
                    <div className="pt-6 border-t">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="2fa" className="text-base">Two-factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Button variant="outline" className="flex items-center">
                          <Shield className="mr-2 h-4 w-4" />
                          Setup 2FA
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
