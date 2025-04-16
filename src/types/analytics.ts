// Make sure these interfaces are exported properly
export interface IClickData {
    browser?: string;
    device?: string;
    country?: string;
    referrer?: string;
}

export interface ILinkAnalytics {
    totalClicks: number;
    clicksByDate: ClicksByDateDto[];
    clicksByDevice: ClicksByPropertyDto;
    clicksByBrowser: ClicksByPropertyDto;
    clicksByCountry: ClicksByPropertyDto;
}

export interface IDateRangeAnalytics {
    totalClicks: number;
    clicksByDate: ClicksByDateDto[];
}

export interface IAnalyticsOverview {
    totalClicks: number;
    clicksToday: number;
    clicksThisWeek: number;
    clicksThisMonth: number;
    topLinks: {
        linkId: string;
        alias: string;
        clicks: number;
    }[];
}

export interface IClicksByMetric {
    total: number;
    data: Record<string, number>;
}

// You have other exported types here that should remain
export class ClickEvent {
    id: string;
    linkId: string;
    browser: string;
    device: string;
    country: string;
    referrer: string;
    createdAt: Date;
}

export class DynamicLinkClickEvent extends ClickEvent {
    dynamicProperties: Record<string, any>;
}

export class ClicksByDateDto {
    date: string;
    count: number;
}

export class ClicksByPropertyDto {
    [key: string]: number;
}

export interface AnalyticsResponse {
    clicks: ClickEvent[];
    total: number;
}
