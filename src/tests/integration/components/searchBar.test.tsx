import SearchBar from "@/components/search/SearchBar";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockRouter = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouter,
  }),
}));

describe("Integration | SearchBar", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    mockRouter.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the search bar with all elements", () => {
    render(<SearchBar action="/properties" includeSuggestions={false} />);
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    expect(screen.getByTestId("search-bar-icon")).toBeInTheDocument();
    expect(screen.getByTestId("search-bar-btn")).toBeInTheDocument();
  });

  it("accepts user input", () => {
    render(<SearchBar action="/properties" includeSuggestions={false} />);
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "Dublin" } });
    expect(input).toHaveValue("Dublin");
  });

  it("does not get suggestions when false", () => {
    render(<SearchBar action="/properties" includeSuggestions={false} />);
    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "Dublin 2" } });

    expect(screen.queryByTestId("suggestion-box")).not.toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("does not fetch suggestions for short queries", () => {
    render(<SearchBar action="/properties" includeSuggestions={true} />);
    const input = screen.getByRole("searchbox");

    fireEvent.change(input, { target: { value: "Dub" } });

    expect(screen.queryByTestId("suggestion-box")).not.toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("shows suggestions when API returns data", async () => {
    const mockSuggestions = [
      {
        id: 1,
        address1: "14 Grafton Street",
        eircode: "D02Y828",
        county: "Dublin",
      },
      {
        id: 2,
        address1: "22 O'Connell Street",
        eircode: "D01X5X2",
        county: "Dublin",
      },
    ];

    // Mock successful API response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSuggestions),
    });

    render(<SearchBar action="/properties" includeSuggestions={true} />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "Dublin" } });

    await waitFor(() => {
      expect(screen.getByTestId("suggestion-box")).toBeInTheDocument();
    });

    const suggestionItems = screen.getAllByRole("listitem");
    expect(suggestionItems).toHaveLength(mockSuggestions.length);

    expect(screen.getByText("14 Grafton Street")).toBeInTheDocument();
    expect(screen.getByText("22 O'Connell Street")).toBeInTheDocument();
  });

  it("navigates to property page when suggestion is clicked and no override", async () => {
    const mockSuggestions = [
      {
        id: 1,
        address1: "14 Grafton Street",
        eircode: "D02Y828",
        county: "Dublin",
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSuggestions),
    });

    render(<SearchBar action="/properties" includeSuggestions={true} />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "Dublin" } });

    await waitFor(() => {
      expect(screen.getByTestId("suggestion-box")).toBeInTheDocument();
    });

    const suggestionItem = screen.getByText("14 Grafton Street");
    fireEvent.click(suggestionItem);

    expect(mockRouter).toHaveBeenCalledWith("/properties/1");
  });

  it("calls onPropertySelect when provided instead of navigating", async () => {
    const mockSuggestions = [
      {
        id: 2,
        address1: "22 O'Connell Street",
        eircode: "D01X5X2",
        county: "Dublin",
      },
    ];

    const onPropertySelect = jest.fn();

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSuggestions),
    });

    render(
      <SearchBar
        includeSuggestions={true}
        onPropertySelect={onPropertySelect}
      />,
    );

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "Dublin" } });

    await waitFor(() => {
      expect(screen.getByTestId("suggestion-box")).toBeInTheDocument();
    });

    const suggestionItem = screen.getByText("22 O'Connell Street");
    fireEvent.click(suggestionItem);

    expect(onPropertySelect).toHaveBeenCalledWith(2);
    expect(mockRouter).not.toHaveBeenCalled();
  });

  it("shows a call-to-action link when API returns no suggestions", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(<SearchBar action="/properties" includeSuggestions={true} />);

    const input = screen.getByRole("searchbox");
    fireEvent.change(input, { target: { value: "Dublin" } });

    await waitFor(() => {
      expect(screen.getByTestId("suggestion-box")).toBeInTheDocument();
    });

    expect(screen.getByText("Can't find your property?")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /add it here/i })).toHaveAttribute(
      "href",
      "/new?step=property",
    );
  });
});
