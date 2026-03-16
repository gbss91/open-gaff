import prisma from "@/server/prisma";
import { Rent } from "@/types";

export const rentService = {
  /**
   * Creates rent entry
   * @param data - Rent data to insert
   * @returns Newly created rent entry
   */
  async addRent(data: Rent) {
    return prisma.rent.create({
      data: {
        amount: data.amount,
        arrangementType: data.arrangementType,
        occupantsCount: data.occupantsCount,
        propertyId: data.propertyId,
      },
    });
  },

  /**
   * Fetches a single rent with its ID
   * @param id - Rent ID
   * @returns Single rent record
   */
  async getRentById(id: number) {
    return prisma.rent.findUnique({
      where: { id },
    });
  },

  /**
   * Fetches all rent entries
   * @param page - Current page number (1-indexed)
   * @param pageSize - Number of entries per page - default: 10
   * @returns Object containing rents array, total count, current page and page size
   */
  async getAllRents(page: number, pageSize: number = 10) {
    const [rents, total] = await Promise.all([
      prisma.rent.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.rent.count(),
    ]);

    return { rents, total, page, pageSize };
  },

  /**
   * Fetches all rent entries by property using pagination
   * @param propertyId - Property ID
   * @param page - Current page number (1-indexed)
   * @param pageSize - Number of entries per page - default: 10
   * @returns Array with all rents by property
   */
  async getRentsByProperty(
    propertyId: number,
    page: number,
    pageSize: number = 10,
  ) {
    const [rents, total] = await Promise.all([
      prisma.rent.findMany({
        where: { propertyId },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.rent.count({
        where: { propertyId },
      }),
    ]);

    return { rents, total, page, pageSize };
  },
};
