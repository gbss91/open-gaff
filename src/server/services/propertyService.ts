import prisma from "@/server/prisma";
import { Property } from "@/types";

export const propertyService = {
  /**
   * Fetches paginated properties with their rent history
   * @param page - Current page number (1-indexed)
   * @param pageSize - Number of properties per page (default: 10)
   * @param type - Property type filter
   * @param sort - Sort by
   * @returns Object containing properties array, total count, current page and page size
   */
  async getAllProperties(
    page: number,
    pageSize: number = 10,
    type?: string,
    sort?: string,
  ) {
    // Filter by type
    const where = {
      ...(type && { type }),
    };

    // Sorting
    const sortOptions: Record<string, object> = {
      most_entries: { _count: "desc" },
      least_entries: { _count: "asc" },
    };
    const orderBy = { rents: sortOptions[sort ?? "most_recent"] };

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { rents: true },
      }),
      prisma.property.count({ where }),
    ]);
    return { properties, total, page, pageSize };
  },

  /**
   * Fetches a single property with its rent history by ID
   * @param id - Property ID
   * @returns Property with rents or null if not found
   */
  async getPropertyById(id: number) {
    return prisma.property.findUnique({
      where: { id },
      include: { rents: true },
    });
  },

  /**
   * Searches properties by address, eircode or county with pagination
   * @param query - Search string
   * @param page - Current page number (1-indexed)
   * @param pageSize - Number of properties per page (default: 10)
   * @returns Object containing matching properties, total count, current page and page size
   */
  async searchProperties(
    query: string,
    page: number,
    pageSize: number = 10,
    type?: string,
    sort?: string,
  ) {
    const where = {
      OR: [
        { address1: { contains: query, mode: "insensitive" as const } },
        { eircode: { contains: query, mode: "insensitive" as const } },
        { county: { contains: query, mode: "insensitive" as const } },
      ],
      ...(type && { type }),
    };

    // Sorting
    const sortOptions: Record<string, object> = {
      most_entries: { _count: "desc" },
      least_entries: { _count: "asc" },
    };
    const orderBy = { rents: sortOptions[sort ?? "most_recent"] };

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { rents: true },
      }),
      prisma.property.count({ where }),
    ]);

    return { properties, total, page, pageSize };
  },

  /**
   * Creates a new unregistered property
   * @param data - Property data to insert
   * @returns Newly created property
   */
  async addProperty(data: Property) {
    return prisma.property.create({
      data: {
        address1: data.address1,
        address2: data.address2,
        address3: data.address3,
        address4: data.address4,
        county: data.county,
        eircode: data.eircode,
        bedroomNo: data.bedroomNo,
        type: data.type,
        isRegistered: data.isRegistered || false,
      },
    });
  },
};
