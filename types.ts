
export enum TransportType {
  PLANE = 'PLANE',
  TRAIN = 'TRAIN',
  BUS = 'BUS',
  SEA = 'SEA'
}

export enum PreferenceType {
  CHEAPEST = 'TERMURAH',
  FASTEST = 'TERCEPAT',
  BEST_VALUE = 'NILAI_TERBAIK'
}

export interface TravelOption {
  id: string;
  otaName: string;
  otaLogo: string;
  providerName: string; // Maskapai/Operator
  providerLogo: string;
  type: TransportType;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  class: string;
  availableSeats: number;
  affiliateUrl: string;
  tags: ('CHEAPEST' | 'FASTEST' | 'BEST_VALUE')[];
  score: number;
  upsellOptions?: {
    label: string;
    price: number;
  }[];
}

export interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  maxBudget: number;
  preference: PreferenceType;
  transportType?: TransportType | 'ALL';
}

export interface SearchResult {
  options: TravelOption[];
  aiAnalysis: string;
  suggestedUpsell: string;
}
