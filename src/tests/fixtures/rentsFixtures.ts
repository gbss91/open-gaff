export const rentsFixtures = [
  {
    id: 1,
    propertyId: 1,
    amount: 1200,
    arrangementType: "private_room",
    occupantsCount: 3,
    addedAt: new Date("2024-01-15"),
  },
  {
    id: 2,
    propertyId: 1,
    amount: 1250,
    occupantsCount: 0,
    arrangementType: "private_room",
    addedAt: new Date("2023-06-01"),
  },
  {
    id: 3,
    propertyId: 2,
    amount: 3200,
    occupantsCount: 4,
    arrangementType: "whole_unit",
    addedAt: new Date("2024-03-10"),
  },
];
