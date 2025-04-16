import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {BarChart3, Link2, MousePointerClick, TrendingUp} from "lucide-react";

const statsData = [
    {
        title: "Total Links",
        value: "25",
        description: "Created so far",
        icon: Link2,
        change: "+4",
        changeType: "increase",
    },
    {
        title: "Total Clicks",
        value: "1,238",
        description: "Across all links",
        icon: MousePointerClick,
        change: "+12%",
        changeType: "increase",
    },
    {
        title: "CTR",
        value: "3.2%",
        description: "Average rate",
        icon: TrendingUp,
        change: "+0.5%",
        changeType: "increase",
    },
    {
        title: "Active Links",
        value: "18",
        description: "Currently active",
        icon: BarChart3,
        change: "-2",
        changeType: "decrease",
    },
];

const StatsCards = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => (
                <Card key={index} className="overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span className={stat.changeType === "increase" ? "text-green-500" : "text-red-500"}>
                {stat.change}
              </span>
                            <span className="ml-1">{stat.description}</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default StatsCards;
