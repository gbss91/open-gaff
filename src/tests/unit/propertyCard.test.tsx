import { cleanup, render, screen } from "@testing-library/react";
import { Property } from "@/types";
import PropertyCard from "@/app/property/components/PropertyCard";
import "@testing-library/jest-dom";
import { propertyFixture } from "../fixtures/property";

const mockProperty = propertyFixture;

afterEach(() => {
  cleanup();
});

describe("Property card unit tests", () => {
  test("renders property data correctly", () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText("Registered")).toBeInTheDocument();
    expect(screen.getByText("10 Green Street")).toBeInTheDocument();
    expect(screen.getByText("Dublin, D01 ABC")).toBeInTheDocument();
    expect(screen.getByText("1800")).toBeInTheDocument();
  });

  test("renders fallback when rent data is missing", () => {
    const propertyWithoutRent: Property = {
      ...mockProperty,
      rentPrices: [],
    };
    render(<PropertyCard property={propertyWithoutRent} />);
    expect(screen.getByText("No Data")).toBeInTheDocument();
  });

  test("renders green icon when registered", () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText("Registered")).toBeInTheDocument();
    expect(screen.getByTestId("house-icon")).toBeInTheDocument();
    expect(screen.getByTestId("house-icon")).toHaveClass("text-green-600");
  });

  test("renders gray icon when not registereed", () => {
    render(
      <PropertyCard property={{ ...mockProperty, isRegistered: false }} />
    );
    expect(screen.getByText("Not Registered")).toBeInTheDocument();
    expect(screen.getByTestId("house-icon")).toBeInTheDocument();
    expect(screen.getByTestId("house-icon")).toHaveClass("text-gray-600");
  });
});
