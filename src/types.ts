// Custom types

export type Property = {
  id?: string;
  address1: string;
  address2?: string | null;
  address3?: string | null;
  address4?: string | null;
  address5?: string | null;
  county: string;
  eircode: string;
  bedroomNo: number;
  isRegistered?: boolean | null;
  rentPrices?: Rent[] | null;
  reviews?: Review[] | null;
};

export type Rent = {
  id: string;
  rentValue: number;
  rentPeriod: string;
  propertyId?: number | null;
};

export type Review = {
  id: string;
  rating: number;
  review?: string | null;
  propertyId?: number | null;
};
