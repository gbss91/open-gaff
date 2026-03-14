import { rentService } from "@/server/services/rentService";
import { Rent } from "@/types";
import { rentsFixtures } from "../fixtures/rentsFixtures";
import { prismaMock } from "../prisma";

describe("Unit | rentService", () => {
  describe("addRent", () => {
    test("creates and returns a new rent", async () => {
      prismaMock.rent.create.mockResolvedValue(rentsFixtures[0]);

      const result = await rentService.addRent(rentsFixtures[0]);

      expect(prismaMock.rent.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(rentsFixtures[0]);
    });

    it("throws when required fields are missing", async () => {
      prismaMock.rent.create.mockRejectedValue(
        new Error("Missing required fields"),
      );

      await expect(rentService.addRent({} as Rent)).rejects.toThrow(
        "Missing required fields",
      );
    });
  });

  describe("getRentById", () => {
    it("returns a rent when found", async () => {
      prismaMock.rent.findUnique.mockResolvedValue(rentsFixtures[0]);

      const result = await rentService.getRentById(1);

      expect(result).toEqual(rentsFixtures[0]);
      expect(prismaMock.rent.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it("returns null when rent is not found", async () => {
      prismaMock.rent.findUnique.mockResolvedValue(null);

      const result = await rentService.getRentById(10);

      expect(result).toBeNull();
    });
  });

  describe("getAllRents", () => {
    it("returns paginated rents and total count", async () => {
      prismaMock.rent.findMany.mockResolvedValue(rentsFixtures);
      prismaMock.rent.count.mockResolvedValue(3);

      const result = await rentService.getAllRents(1);

      expect(result.rents).toHaveLength(3);
      expect(result.total).toBe(3);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(10);
    });

    it("returns empty array when no rents exist", async () => {
      prismaMock.rent.findMany.mockResolvedValue([]);
      prismaMock.rent.count.mockResolvedValue(0);

      const result = await rentService.getAllRents(1);

      expect(result.rents).toHaveLength(0);
      expect(result.total).toBe(0);
    });
  });

  describe("getRentsByProperty", () => {
    it("returns rents by property ID", async () => {
      const mockRents = [rentsFixtures[0], rentsFixtures[1]];
      prismaMock.rent.findMany.mockResolvedValue(mockRents);
      prismaMock.rent.count.mockResolvedValue(2);

      const result = await rentService.getRentsByProperty(1, 1);

      expect(result.rents).toHaveLength(2);
      expect(result.total).toBe(2);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(10);
    });

    it("returns empty array when property has no rents", async () => {
      prismaMock.rent.findMany.mockResolvedValue([]);
      prismaMock.rent.count.mockResolvedValue(0);

      const result = await rentService.getRentsByProperty(999, 1);

      expect(result.rents).toHaveLength(0);
      expect(result.total).toBe(0);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(10);
    });

    it("handles pagination correctly", async () => {
      const mockRents = [rentsFixtures[0]];
      prismaMock.rent.findMany.mockResolvedValue(mockRents);
      prismaMock.rent.count.mockResolvedValue(15);

      const result = await rentService.getRentsByProperty(1, 2, 5);

      expect(result.page).toBe(2);
      expect(result.pageSize).toBe(5);
      expect(prismaMock.rent.findMany).toHaveBeenCalledWith({
        where: { propertyId: 1 },
        skip: 5,
        take: 5,
      });
    });
  });
});
