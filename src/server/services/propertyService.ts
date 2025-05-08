import { Property } from "@/types";
import prisma from "../prisma";

export const propertyService = {
  getAllProperties: async (page: number, pageSize: number = 5) => {
    return await prisma.property.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  },

  getPropertiesByQuery: async (
    query: string,
    page: number,
    pageSize: number = 5
  ) => {
    const properties = await prisma.property.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        OR: [
          { address1: { contains: query, mode: "insensitive" } },
          { address2: { contains: query, mode: "insensitive" } },
          { address3: { contains: query, mode: "insensitive" } },
          { address4: { contains: query, mode: "insensitive" } },
          { address5: { contains: query, mode: "insensitive" } },
          { county: { contains: query, mode: "insensitive" } },
          { eircode: { contains: query, mode: "insensitive" } },
        ],
      },
    });

    return properties;
  },

  getPropertyById: async (id: number) => {
    const property = await prisma.property.findUnique({ where: { id: id } });
    return property;
  },

  addProperty: async (data: Property) => {
    const property = await prisma.property.create({
      data: {
        address1: data.address1,
        address2: data.address2,
        address3: data.address3,
        address4: data.address4,
        address5: data.address5,
        county: data.county,
        eircode: data.eircode,
        bedroomNo: data.bedroomNo,
        isRegistered: false,
      },
    });
    return property;
  },
};
