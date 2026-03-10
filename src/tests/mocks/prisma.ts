import { PrismaClient } from "@/generated/prisma/client";
import prisma from "@/server/prisma";
import { DeepMockProxy, mockDeep, mockReset } from "jest-mock-extended";

jest.mock("@/server/prisma", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
