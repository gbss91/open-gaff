// Custom types

export type Property = {
  id: string;
  address1: string;
  address2?: string;
  address3?: string;
  address4?: string;
  address5?: string;
  county: string;
  eircode: string;
  bedroomNo: number;
  isRegistered?: boolean;
  rentPrices?: Rent;
  reviews?: Review;
};

export type Rent = {
  id: string;
  rentValue: number;
  rentPeriod: string;
  propertyId?: number;
};

export type Review = {
  id: string;
  rating: number;
  review?: string;
  propertyId?: number;
};
