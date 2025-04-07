
export interface Plan {
  id: string;
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  description: string;
  popular?: boolean;
  buttonText: string;
  features: Record<string, boolean | string | number>;
}

export interface Feature {
  id: string;
  name: string;
}

export interface FeatureCategory {
  name: string;
  features: Feature[];
}
