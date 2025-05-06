import prisma from "../prisma";

export const propertyService = {
  getAllProperties: async () => {
    return await prisma.property.findMany();
  },

  getPropertiesByQuery: async () => {
    //Todo
  },

  getPropertyById: async (id: number) => {
    const property = await prisma.property.findUnique({ where: { id: id } });
    return property;
  },

  addProperty: async () => {
    //TODO
  },
};
