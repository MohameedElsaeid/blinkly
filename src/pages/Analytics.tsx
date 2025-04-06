import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, 
  Legend, Sector, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from "recharts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("week");
  
  const clicksData = [
    { name: 'Mon', clicks: 12, mobile: 8, desktop: 4 },
    { name: 'Tue', clicks: 19, mobile: 10, desktop: 9 },
    { name: 'Wed', clicks: 7, mobile: 5, desktop: 2 },
    { name: 'Thu', clicks: 15, mobile: 8, desktop: 7 },
    { name: 'Fri', clicks: 21, mobile: 13, desktop: 8 },
    { name: 'Sat', clicks: 16, mobile: 11, desktop: 5 },
    { name: 'Sun', clicks: 11, mobile: 7, desktop: 4 }
  ];
  
  const deviceData = [
    { name: 'Desktop', value: 54 },
    { name: 'Mobile', value: 38 },
    { name: 'Tablet', value: 8 },
  ];
  
  const browserData = [
    { name: 'Chrome', value: 62 },
    { name: 'Safari', value: 21 },
    { name: 'Firefox', value: 8 },
    { name: 'Edge', value: 6 },
    { name: 'Other', value: 3 },
  ];
  
  const countryData = [
    { name: 'USA', value: 45 },
    { name: 'UK', value: 15 },
    { name: 'Germany', value: 10 },
    { name: 'Canada', value: 8 },
    { name: 'France', value: 7 },
    { name: 'Others', value: 15 },
  ];

  const linkPerformanceData = [
    { name: '/product', visits: 1245, conversion: 12.4 },
    { name: '/blog', visits: 932, conversion: 8.1 },
    { name: '/signup', visits: 758, conversion: 24.6 },
    { name: '/pricing', visits: 621, conversion: 15.3 },
    { name: '/about', visits: 483, conversion: 6.7 },
  ];
  
  const referrerData = [
    { name: 'Direct', value: 38 },
    { name: 'Social', value: 25 },
    { name: 'Search', value: 22 },
    { name: 'Email', value: 10 },
    { name: 'Other', value: 5 },
  ];
  
  const timeData = [
    { name: '12am', visits: 820 },
    { name: '3am', visits: 400 },
    { name: '6am', visits: 580 },
    { name: '9am', visits: 780 },
    { name: '12pm', visits: 1290 },
    { name: '3pm', visits: 1430 },
    { name: '6pm', visits: 1180 },
    { name: '9pm', visits: 950 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9c27b0', '#673ab7'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
              <div className="flex items-center space-x-4">
                <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Last 24 Hours</SelectItem>
                    <SelectItem value="week">Last 7 Days</SelectItem>
                    <SelectItem value="month">Last 30 Days</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Download Report</Button>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              {[
                { title: "Total Clicks", value: "12,345", change: "+12%", description: "vs. previous period" },
                { title: "Unique Visitors", value: "3,890", change: "+8%", description: "vs. previous period" },
                { title: "Conversion Rate", value: "3.2%", change: "+0.5%", description: "vs. previous period" },
                { title: "Avg. Click Time", value: "14:30", change: "-2%", description: "vs. previous period" }
              ].map((stat, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <span className={stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                        {stat.change}
                      </span>
                      <span className="ml-1">{stat.description}</span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sources">Traffic Sources</TabsTrigger>
                <TabsTrigger value="geography">Geography</TabsTrigger>
                <TabsTrigger value="links">Link Performance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid gap-4 md:grid-cols-2 mb-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Clicks Over Time</CardTitle>
                      <CardDescription>Daily click trends for all your links</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ChartContainer 
                        config={{
                          clicks: { theme: { light: "#0088FE", dark: "#30a0f8" } },
                          mobile: { theme: { light: "#00C49F", dark: "#2ee3b6" } },
                          desktop: { theme: { light: "#FFBB28", dark: "#ffc846" } }
                        }}
                      >
                        <AreaChart
                          data={clicksData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <ChartTooltip content={props => <ChartTooltipContent {...props} indicator="line" />} />
                          <Area 
                            type="monotone" 
                            dataKey="clicks" 
                            name="Total Clicks"
                            stackId="1" 
                            stroke="var(--color-clicks)" 
                            fill="var(--color-clicks)"
                            fillOpacity={0.6}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="mobile" 
                            name="Mobile"
                            stackId="2" 
                            stroke="var(--color-mobile)" 
                            fill="var(--color-mobile)" 
                            fillOpacity={0.6}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="desktop" 
                            name="Desktop"
                            stackId="2" 
                            stroke="var(--color-desktop)" 
                            fill="var(--color-desktop)" 
                            fillOpacity={0.6}
                          />
                          <Legend />
                        </AreaChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Device Distribution</CardTitle>
                      <CardDescription>Clicks by device type</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={deviceData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {deviceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Browser Distribution</CardTitle>
                      <CardDescription>Clicks by browser</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={browserData}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8884d8">
                            {browserData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Hourly Traffic</CardTitle>
                      <CardDescription>Visits by time of day</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={timeData}
                          margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="visits" stroke="#0088FE" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="sources">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Traffic Sources</CardTitle>
                      <CardDescription>Where your visitors are coming from</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={referrerData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {referrerData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Referral Performance</CardTitle>
                      <CardDescription>Conversion rates by source</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius={100} width={500} height={500} data={referrerData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" />
                          <PolarRadiusAxis />
                          <Radar name="Value" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="geography">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Geographic Distribution</CardTitle>
                      <CardDescription>Clicks by country</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={countryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {countryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Countries</CardTitle>
                      <CardDescription>Performance by region</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={countryData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8884d8">
                            {countryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="links">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Link Performance</CardTitle>
                      <CardDescription>Visits per shortlink</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={linkPerformanceData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="visits" fill="#0088FE" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Conversion Rates</CardTitle>
                      <CardDescription>Conversion % by link</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={linkPerformanceData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="conversion" fill="#00C49F" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;
