// src/tests/fixtures/properties.ts
import { Property } from "@/types";

export const propertyFixtures: Property[] = [
  {
    id: 1,
    address1: "10 Green Street",
    county: "Dublin",
    eircode: "D01 ABC",
    bedroomNo: 2,
    isRegistered: true,
    rentPrices: [
      {
        id: 1,
        rentValue: 1800,
        rentPeriod: "Monthly",
        propertyId: 1,
      },
    ],
    reviews: [
      {
        id: 1,
        rating: 5,
        review: "Amazing place!",
        propertyId: 1,
      },
    ],
  },
  {
    id: 2,
    address1: "22 Blue Avenue",
    county: "Cork",
    eircode: "T12 XYZ",
    bedroomNo: 3,
    isRegistered: true,
    rentPrices: [],
    reviews: [
      {
        id: 2,
        rating: 3,
        review: "Decent for the price.",
        propertyId: 2,
      },
    ],
  },
  {
    id: 3,
    address1: "8 Red Lane",
    county: "Galway",
    eircode: "H91 DEF",
    bedroomNo: 1,
    isRegistered: false,
    rentPrices: [
      {
        id: 2,
        rentValue: 950,
        rentPeriod: "Monthly",
        propertyId: 3,
      },
    ],
    reviews: [],
  },
];
