// Custom types

export type Property = {
  id?: number | null;
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
  id?: number | null;
  rentValue: number;
  rentPeriod: string;
  propertyId?: number | null;
};

export type Review = {
  id?: number | null;
  rating: number;
  review?: string | null;
  propertyId?: number | null;
};

export type PropertyRelations = Array<"reviews" | "rents">;
