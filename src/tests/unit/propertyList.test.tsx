import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom";
import { propertyFixtures } from "../fixtures/properties";
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
    fetchMock.mockResponse(() =>
      Promise.resolve(JSON.stringify(propertyFixtures))
    );

    render(<PropertyList />);

    await waitFor(() =>
      expect(screen.getByText("10 Green Street")).toBeInTheDocument()
    );

    expect(screen.getByText("Dublin, D01 ABC")).toBeInTheDocument();
    const cards = screen.getAllByText(/Registered|Not Registered/);
    expect(cards).toHaveLength(3);
  });

  test("renders empty list if no properties", async () => {
    fetchMock.mockResponse(() => Promise.resolve(JSON.stringify({})));

    render(<PropertyList />);

    await waitFor(() =>
      expect(screen.getByText("Nothing found")).toBeInTheDocument()
    );
  });

  // test("", () => {});
  // test("", () => {});
  // test("", () => {});
  // test("", () => {});
  // test("", () => {});
});
