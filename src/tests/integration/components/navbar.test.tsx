import Navbar from "@/components/Navbar";
import { fireEvent, render, screen } from "@testing-library/react";

const mockPathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname: () => mockPathname(),
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Integration | Navbar", () => {
  beforeEach(() => {
    mockPathname.mockReturnValue("/");
  });

  it("renders the logo and brand name", () => {
    render(<Navbar />);
    expect(screen.getByTestId("nav-logo")).toBeInTheDocument();
    expect(screen.getByText("OpenGaff")).toBeInTheDocument();
  });

  it("renders all nav items", () => {
    render(<Navbar />);
    expect(screen.getByText("Properties")).toBeInTheDocument();
  });

  it("renders the Add Rent button", () => {
    render(<Navbar />);
    expect(screen.getByTestId("add-rent-btn")).toBeInTheDocument();
  });

  it("renders the mobile menu button", () => {
    render(<Navbar />);
    expect(screen.getByTestId("nav-menu-btn")).toBeInTheDocument();
  });

  it("opens the menu when mobile button is clicked", () => {
    render(<Navbar />);
    const menuBtn = screen.getByTestId("nav-menu-btn");
    const menuDiv = screen.getByText("Properties").closest("ul")?.parentElement;

    expect(menuDiv?.className).toContain("hidden");
    fireEvent.click(menuBtn);
    expect(menuDiv?.className).toContain("nav-menu-open");
  });

  it("closes the menu when mobile button is clicked again", () => {
    render(<Navbar />);
    const menuBtn = screen.getByTestId("nav-menu-btn");

    fireEvent.click(menuBtn);
    fireEvent.click(menuBtn);

    const menuDiv = screen.getByText("Properties").closest("ul")?.parentElement;
    expect(menuDiv?.className).toContain("hidden");
  });

  it("highlights the active nav link", () => {
    mockPathname.mockReturnValue("/properties");
    render(<Navbar />);
    const link = screen.getByText("Properties").closest("a");
    expect(link?.className).toContain("border-accent");
  });

  it("does not highlight inactive nav links", () => {
    mockPathname.mockReturnValue("/");
    render(<Navbar />);
    const link = screen.getByText("Properties").closest("a");
    expect(link?.className).toContain("border-transparent");
  });
});
