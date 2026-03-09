import FilterPill from "@/components/filter/FilterPill";
import { fireEvent, render, screen } from "@testing-library/react";
import { Search } from "lucide-react";

describe("Integration | FilterPill", () => {
  it("renders the label", () => {
    render(<FilterPill label="Apartment" />);
    expect(screen.getByText("Apartment")).toBeInTheDocument();
  });

  it("renders icon on the left by default", () => {
    render(
      <FilterPill
        label="Apartment"
        icon={<Search data-testid="icon" size={12} />}
      />,
    );
    const pill = screen.getByTestId("filter-pill");
    const icon = screen.getByTestId("icon");
    expect(pill.firstChild).toBe(icon);
  });

  it("renders icon on the right when iconPosition is right", () => {
    render(
      <FilterPill
        label="Apartment"
        icon={<Search data-testid="icon" size={12} />}
        iconPosition="right"
      />,
    );
    const pill = screen.getByTestId("filter-pill");
    const icon = screen.getByTestId("icon");
    expect(pill.lastChild).toBe(icon);
  });

  it("calls onClick when clicked", async () => {
    const handleClick = jest.fn();

    render(<FilterPill label="Apartment" onClick={handleClick} />);

    fireEvent.click(screen.getByTestId("filter-pill"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not render icon when not provided", () => {
    render(<FilterPill label="Apartment" />);
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
  });
});
