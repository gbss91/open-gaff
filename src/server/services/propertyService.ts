import prisma from "../prisma";

export const getAllProperties = async () => {
  return prisma.property.findMany();
};
