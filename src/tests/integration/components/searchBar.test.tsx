import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/components/search/SearchBar";

describe("Integration | SearchBar", () => {
  beforeEach(() => {
    render(<SearchBar action="/properties" />);
  });

  it("renders the search bar with all elements", () => {
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    expect(screen.getByTestId("search-bar-icon")).toBeInTheDocument();
    expect(screen.getByTestId("search-bar-btn")).toBeInTheDocument();
  });

  it("accepts user input", () => {
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "Dublin" } });
    expect(input).toHaveValue("Dublin");
  });
});
