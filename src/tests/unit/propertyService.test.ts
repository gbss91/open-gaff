import { propertyService } from "@/server/services/propertyService";
import { prismaMock } from "@/tests/prisma";
import { Property } from "@/types";
import { propertyFixtures } from "../fixtures/propertiesFixtures";

describe("Unit | propertyService", () => {
  describe("getAllProperties", () => {
    it("returns paginated properties and total count", async () => {
      prismaMock.property.findMany.mockResolvedValue(propertyFixtures);
      prismaMock.property.count.mockResolvedValue(3);

      const result = await propertyService.getAllProperties(1);

      expect(result.properties).toHaveLength(3);
      expect(result.total).toBe(3);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(10);
    });

    it("returns empty array when no properties exist", async () => {
      prismaMock.property.findMany.mockResolvedValue([]);
      prismaMock.property.count.mockResolvedValue(0);

      const result = await propertyService.getAllProperties(1);

      expect(result.properties).toHaveLength(0);
      expect(result.total).toBe(0);
    });

    it("filters by type when provided", async () => {
      prismaMock.property.findMany.mockResolvedValue([propertyFixtures[0]]);
      prismaMock.property.count.mockResolvedValue(1);

      const result = await propertyService.getAllProperties(1, 10, "apartment");

      expect(result.properties).toHaveLength(1);
      expect(prismaMock.property.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { type: "apartment" },
        }),
      );
    });

    it("sorts by most entries when specified", async () => {
      prismaMock.property.findMany.mockResolvedValue([propertyFixtures[0]]);
      prismaMock.property.count.mockResolvedValue(1);

      const result = await propertyService.getAllProperties(
        1,
        10,
        undefined,
        "most_entries",
      );

      expect(result.properties).toHaveLength(1);
      expect(prismaMock.property.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { rents: { _count: "desc" } },
        }),
      );
    });

    it("sorts by least entries when specified", async () => {
      prismaMock.property.findMany.mockResolvedValue([propertyFixtures[2]]);
      prismaMock.property.count.mockResolvedValue(1);

      const result = await propertyService.getAllProperties(
        1,
        10,
        undefined,
        "least_entries",
      );

      expect(result.properties).toHaveLength(1);
      expect(prismaMock.property.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { rents: { _count: "asc" } },
        }),
      );
    });
  });

  describe("getPropertyById", () => {
    it("returns a property with rents when found", async () => {
      prismaMock.property.findUnique.mockResolvedValue(propertyFixtures[0]);

      const result = await propertyService.getPropertyById(1);

      expect(result).toEqual(propertyFixtures[0]);
      expect(prismaMock.property.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { rents: true },
      });
    });

    it("returns null when property is not found", async () => {
      prismaMock.property.findUnique.mockResolvedValue(null);

      const result = await propertyService.getPropertyById(999);

      expect(result).toBeNull();
    });
  });

  describe("searchProperties", () => {
    it("returns matching properties and total count", async () => {
      prismaMock.property.findMany.mockResolvedValue(propertyFixtures);
      prismaMock.property.count.mockResolvedValue(3);

      const result = await propertyService.searchProperties("Dublin", 1);

      expect(result.properties).toHaveLength(3);
      expect(result.total).toBe(3);
    });

    it("returns empty array when no properties match the query", async () => {
      prismaMock.property.findMany.mockResolvedValue([]);
      prismaMock.property.count.mockResolvedValue(0);

      const result = await propertyService.searchProperties("nowhere", 1);

      expect(result.properties).toHaveLength(0);
      expect(result.total).toBe(0);
    });

    it("filters by type when provided", async () => {
      prismaMock.property.findMany.mockResolvedValue([propertyFixtures[0]]);
      prismaMock.property.count.mockResolvedValue(1);

      const result = await propertyService.searchProperties(
        "Dublin",
        1,
        10,
        "apartment",
      );

      expect(result.properties).toHaveLength(1);
      expect(prismaMock.property.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            type: "apartment",
          }),
        }),
      );
    });

    it("sorts by most entries when specified", async () => {
      prismaMock.property.findMany.mockResolvedValue([propertyFixtures[0]]);
      prismaMock.property.count.mockResolvedValue(1);

      const result = await propertyService.searchProperties(
        "Dublin",
        1,
        10,
        undefined,
        "most_entries",
      );

      expect(result.properties).toHaveLength(1);
      expect(prismaMock.property.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { rents: { _count: "desc" } },
        }),
      );
    });

    it("sorts by least entries when specified", async () => {
      prismaMock.property.findMany.mockResolvedValue([propertyFixtures[2]]);
      prismaMock.property.count.mockResolvedValue(1);

      const result = await propertyService.searchProperties(
        "Dublin",
        1,
        10,
        undefined,
        "least_entries",
      );

      expect(result.properties).toHaveLength(1);
      expect(prismaMock.property.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { rents: { _count: "asc" } },
        }),
      );
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

    it("throws when required fields are missing", async () => {
      prismaMock.property.create.mockRejectedValue(
        new Error("Missing required fields"),
      );

      await expect(propertyService.addProperty({} as Property)).rejects.toThrow(
        "Missing required fields",
      );
    });
  });
});
