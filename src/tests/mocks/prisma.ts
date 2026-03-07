import { PrismaClient } from "@/server/generated/prisma";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import prisma from "@/server/prisma";

jest.mock("@/server/prisma", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
