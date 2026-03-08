import { render, screen, fireEvent } from "@testing-library/react";

describe("Integration | SearchBar", () => {
  beforeEach(() => {
    render(<SearchBar action='/properties' />);
  });

  it("renders the search input", () => {
    expect(
      screen.getAllByTestId("search-bar")
    ).toBeInTheDocument();
  });

  it("renders the search correct icon", () => {
    expect(
      screen.getByTestId("search-bar-icon")
    ).toBeInTheDocument();
  });

  it("renders the search button", () => {
    expect(
      screen.getByTestId("search-bar-button")
    ).toBeInTheDocument();
  });

  it("accepts user input", () => {
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "Dublin" } });
    expect(input).toHaveValue("Dublin");
  });
});