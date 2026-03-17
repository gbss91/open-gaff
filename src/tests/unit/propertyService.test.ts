import { propertyService } from "@/server/services/propertyService";
import { prismaMock } from "@/tests/prisma";
import { propertyFixtures } from "../fixtures/propertiesFixtures";
import { rentsFixtures } from "../fixtures/rentsFixtures";

describe("Unit | propertyService", () => {
  describe("getAllProperties", () => {
    it("returns properties and metadata", async () => {
      prismaMock.property.findMany.mockResolvedValue(propertyFixtures);
      prismaMock.property.count.mockResolvedValue(3);

      const result = await propertyService.getAllProperties(1);

      expect(prismaMock.property.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { rents: { _count: "desc" } },
        skip: 0,
        take: 10,
        include: { rents: true },
      });
      expect(prismaMock.property.count).toHaveBeenCalledWith({
        where: {},
      });
      expect(result).toEqual({
        properties: propertyFixtures,
        total: 3,
        page: 1,
        pageSize: 10,
      });
    });

    it("returns empty array when no properties exist", async () => {
      prismaMock.property.findMany.mockResolvedValue([]);
      prismaMock.property.count.mockResolvedValue(0);

      const result = await propertyService.getAllProperties(1);

      expect(result).toEqual({
        properties: [],
        total: 0,
        page: 1,
        pageSize: 10,
      });
    });

    it("filters by type when provided", async () => {
      propertyService.getAllProperties(1, 10, "apartment");

      expect(prismaMock.property.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { type: "apartment" },
        }),
      );
    });

    it("sorts by least entries when specified", async () => {
      propertyService.getAllProperties(1, 10, undefined, "least_entries");

      expect(prismaMock.property.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { rents: { _count: "asc" } },
        }),
      );
    });
  });

  describe("getPropertyById", () => {
    it("returns a property with rents, if available", async () => {
      const propertyWithRents = {
        ...propertyFixtures[1],
        rents: rentsFixtures[2],
      };

      prismaMock.property.findUnique.mockResolvedValue(propertyWithRents);

      const result = await propertyService.getPropertyById(1);

      expect(prismaMock.property.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { rents: true },
      });
      expect(result).toEqual(propertyWithRents);
    });

    it("returns null when property is not found", async () => {
      prismaMock.property.findUnique.mockResolvedValue(null);

      const result = await propertyService.getPropertyById(10);

      expect(prismaMock.property.findUnique).toHaveBeenCalledWith({
        where: { id: 10 },
        include: { rents: true },
      });

      expect(result).toBeNull();
    });
  });

  describe("searchProperties", () => {
    it("returns matching properties and metadata", async () => {
      prismaMock.property.findMany.mockResolvedValue(propertyFixtures);
      prismaMock.property.count.mockResolvedValue(3);

      const result = await propertyService.searchProperties("Dublin  ", 1);

      const where = {
        OR: [
          { address1: { contains: "Dublin", mode: "insensitive" as const } },
          { eircode: { contains: "Dublin", mode: "insensitive" as const } },
          { county: { contains: "Dublin", mode: "insensitive" as const } },
        ],
      };

      expect(prismaMock.property.findMany).toHaveBeenCalledWith({
        where,
        orderBy: { rents: { _count: "desc" } },
        skip: 0,
        take: 10,
        include: { rents: true },
      });

      expect(prismaMock.property.count).toHaveBeenCalledWith({ where });

      expect(result).toEqual({
        properties: propertyFixtures,
        total: 3,
        page: 1,
        pageSize: 10,
      });
    });

    it("returns empty array when no properties match the query", async () => {
      prismaMock.property.findMany.mockResolvedValue([]);
      prismaMock.property.count.mockResolvedValue(0);

      const result = await propertyService.searchProperties("Invalid", 1);

      const where = {
        OR: [
          { address1: { contains: "Invalid", mode: "insensitive" as const } },
          { eircode: { contains: "Invalid", mode: "insensitive" as const } },
          { county: { contains: "Invalid", mode: "insensitive" as const } },
        ],
      };

      expect(prismaMock.property.findMany).toHaveBeenCalledWith({
        where,
        orderBy: { rents: { _count: "desc" } },
        skip: 0,
        take: 10,
        include: { rents: true },
      });

      expect(result).toEqual({
        properties: [],
        total: 0,
        page: 1,
        pageSize: 10,
      });
    });

    it("filters by type when provided", async () => {
      await propertyService.searchProperties("Dublin", 1, 10, "apartment");

      const where = {
        OR: [
          { address1: { contains: "Dublin", mode: "insensitive" as const } },
          { eircode: { contains: "Dublin", mode: "insensitive" as const } },
          { county: { contains: "Dublin", mode: "insensitive" as const } },
        ],
        type: "apartment",
      };

      expect(prismaMock.property.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where }),
      );
    });

    it("sorts by least entries when specified", async () => {
      await propertyService.searchProperties(
        "Dublin",
        1,
        10,
        undefined,
        "least_entries",
      );

      expect(prismaMock.property.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { rents: { _count: "asc" } },
        }),
      );
    });
  });

  describe("getSuggestions", () => {
    it("returns properties matching query and limit", async () => {
      await propertyService.searchProperties("Dublin 12", 3);
    });
  });

  describe("addProperty", () => {
    it("creates and returns a new property", async () => {
      prismaMock.property.create.mockResolvedValue({
        ...propertyFixtures[0],
        isRegistered: true,
      });

      const result = await propertyService.addProperty(propertyFixtures[0]);

      expect(result.isRegistered).toBe(true);
      expect(prismaMock.property.create).toHaveBeenCalledTimes(1);
    });
  });

  describe("addPropertyWithRent", () => {
    it("created new property with rent", async () => {
      const { id, ...property } = propertyFixtures[1];
      const newPropertyWithRent = {
        ...property,
        rents: [
          { amount: 1200, arrangementType: "private_room", occupantsCount: 3 },
        ],
      };

      const createdPropertyMock = {
        id: 42,
        ...newPropertyWithRent,
        rents: [{ ...newPropertyWithRent.rents[0], propertyId: 42 }],
      };

      prismaMock.property.create.mockResolvedValue(createdPropertyMock);

      const result =
        await propertyService.addPropertyWithRent(newPropertyWithRent);

      expect(prismaMock.property.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            address1: newPropertyWithRent.address1,
            rents: {
              create: expect.objectContaining(newPropertyWithRent.rents[0]),
            },
          }),
          include: { rents: true },
        }),
      );

      expect(result).toEqual(
        expect.objectContaining({
          id: 42,
          address1: newPropertyWithRent.address1,
          rents: [
            expect.objectContaining({
              ...newPropertyWithRent.rents[0],
              propertyId: createdPropertyMock.id,
            }),
          ],
        }),
      );
    });

    it("throws error wwhen rent is missing", async () => {
      const property = {
        ...propertyFixtures[2],
        rents: [],
      };

      await expect(
        propertyService.addPropertyWithRent(property),
      ).rejects.toThrow("Requires at least one rent record");
    });
  });
});
