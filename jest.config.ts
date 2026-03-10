import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    env: {
      DATABASE_URL: process.env.DATABASE_URL,
    },
  },
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.jest.json",
    },
  },
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/*.spec.{ts,tsx}",
    "!src/server/prisma.ts",
    "!src/generated/**",
    "!src/tests/**",
    "!src/types/**",
    "!src/app/**/page.tsx", // skip Next.js pages
    "!src/app/**/layout.tsx", // skip layouts
    "!src/app/**/loading.tsx", // skip loading states
    "!src/app/**/error.tsx", // skip error boundaries
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ["text", "html"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default config;
