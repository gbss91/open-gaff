// Custom types
export type ArrangementType = "whole_unit" | "private_room" | "shared_room";

export type Property = {
  id?: number;
  address1: string;
  address2: string | null;
  address3: string | null;
  address4: string | null;
  county: string;
  eircode: string;
  bedroomNo: number;
  type: string;
  isRegistered: boolean;
  rents?: Rent[];
};

export type Rent = {
  id?: number;
  amount: number;
  arrangementType: string;
  occupantsCount: number | null;
  addedAt?: Date;
  propertyId: number;
};

export type PropertyWithRents = Property & {
  rents: Rent[];
};

export type PropertySuggestion = {
  id: number;
  address1: string;
  eircode: string;
};

// Request and Response types
export type PropertySearchResponse = {
  properties: Property[];
  total: number;
  page: number;
  pageSize: number;
};

export type NewPropertyWithRent = Property & {
  rents: Omit<Rent, "propertyId">;
};
