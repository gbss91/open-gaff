import FilterBar from "@/components/filter/FilterBar";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock next/navigation
const mockPush = jest.fn();
const mockGet = jest.fn();

const mockToString = jest.fn().mockReturnValue("");

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({
    get: mockGet,
    toString: mockToString,
  }),
}));

describe("Integration | FilterBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default values when no params", () => {
    mockGet.mockReturnValue(null);

    render(<FilterBar />);

    expect(screen.getByTestId("filter-bar")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Apartment")).toBeInTheDocument();
    expect(screen.getByText("House")).toBeInTheDocument();
    expect(screen.getByText("Studio")).toBeInTheDocument();
    expect(screen.getByText("Sort: Most entries")).toBeInTheDocument();
  });

  it("highlights active type", () => {
    mockGet.mockImplementation((key: string) => {
      if (key === "type") return "apartment";
      return null;
    });

    render(<FilterBar />);

    expect(screen.getByText("All")).not.toHaveClass("active");
    expect(screen.getByText("Apartment")).toHaveClass("active");
  });

  it("handles type change", () => {
    mockGet.mockReturnValue(null);

    render(<FilterBar />);

    fireEvent.click(screen.getByText("Apartment"));

    expect(mockPush).toHaveBeenCalledWith("/properties?type=apartment");
  });

  it("clears parems when type change to all", () => {
    mockGet.mockImplementation((key: string) => {
      if (key === "type") return "apartment";
      return null;
    });

    render(<FilterBar />);

    fireEvent.click(screen.getByText("All"));

    expect(mockPush).toHaveBeenCalledWith("/properties");
  });

  it("cycles sort options", () => {
    mockGet.mockReturnValue(null);

    render(<FilterBar />);

    const sortPill = screen.getByTestId("filter-sort-pill");
    expect(sortPill).toHaveTextContent("Sort: Most entries");

    fireEvent.click(sortPill);
    expect(mockPush).toHaveBeenCalledWith("/properties?sort=least_entries");
  });

  it("preserves other params when changing type", () => {
    mockGet.mockImplementation((key: string) => {
      if (key === "sort") return "highest_rent";
      return null;
    });
    mockToString.mockReturnValue("sort=highest_rent");

    render(<FilterBar />);

    fireEvent.click(screen.getByText("House"));

    expect(mockPush).toHaveBeenCalledWith(
      "/properties?sort=highest_rent&type=house",
    );
  });
});
