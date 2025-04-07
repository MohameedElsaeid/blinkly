
// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  countryCode: string;
  phone: string;
}

// Link types
export interface Link {
  id: string;
  originalUrl: string;
  alias: string;
  isActive: boolean;
  tags?: string[];
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

// Analytics types
export interface ClickEvent {
  id: string;
  linkId: string;
  timestamp: Date;
  browser?: string;
  device?: string;
  country?: string;
  referrer?: string;
}

export interface ClicksByDate {
  date: string;
  count: number;
}

export interface ClicksByProperty {
  [key: string]: number;
}
