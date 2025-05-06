import prisma from "../prisma";

export const propertyService = {
  getAllProperties: async () => {
    return await prisma.property.findMany();
  },

  getPropertiesByQuery: async (query: string) => {
    const properties = await prisma.property.findMany({
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

  addProperty: async () => {
    //TODO
  },
};
