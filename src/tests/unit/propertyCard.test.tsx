import { cleanup, render, screen } from "@testing-library/react";
import { Property } from "@/types";
import PropertyCard from "@/app/property/components/PropertyCard";
import "@testing-library/jest-dom";

const mockProperty: Property = {
  id: 1,
  address1: "123 Main St ",
  county: "Dublin ",
  eircode: "D01 XYZ ",
  bedroomNo: 1,
  isRegistered: true,
  rentPrices: [
    {
      id: 1,
      rentValue: 1500,
      rentPeriod: "monthly",
      propertyId: 1,
    },
  ],
};

afterEach(() => {
  cleanup();
});

describe("Property card unit tests", () => {
  test("renders property data correctly", () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText("Registered")).toBeInTheDocument();
    expect(screen.getByText("123 Main St")).toBeInTheDocument();
    expect(screen.getByText("Dublin, D01 XYZ")).toBeInTheDocument();
    expect(screen.getByText("1500")).toBeInTheDocument();
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
