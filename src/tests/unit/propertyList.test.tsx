import { cleanup, render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { propertiesFixtures } from "../fixtures/properties";
import PropertyList from "@/app/property/components/PropertyList";

// Mock searchParams
jest.mock("next/navigation", () => {
  return {
    __esModule: true,
    useSearchParams: () => ({
      toString: () => "",
      get: () => {},
    }),
  };
});

beforeEach(() => {
  fetchMock.resetMocks();
  fetchMock.enableMocks();
});

afterEach(() => {
  cleanup();
});

describe("Property list unit tests", () => {
  test("renders property list data", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(propertiesFixtures));
    render(<PropertyList />);

    await waitFor(() =>
      expect(screen.getByText("10 Green Street")).toBeInTheDocument()
    );

    expect(screen.getByText("22 Blue Avenue")).toBeInTheDocument();
    expect(screen.getByText("8 Red Lane")).toBeInTheDocument();

    const cards = screen.getAllByText(/Registered|Not Registered/);
    expect(cards).toHaveLength(3);
  });

  // test("", () => {});
  // test("", () => {});
  // test("", () => {});
  // test("", () => {});
  // test("", () => {});
});
