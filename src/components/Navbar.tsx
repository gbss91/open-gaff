"use client";

import Link from "next/link";
import { House } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "./ui/Button";
import { Plus, Menu } from "lucide-react";

const navItems = [
  { id: "properties", label: "Properties", href: "/properties" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-primary h-16" data-testid="nav-container">
      <div className="max-w-full flex items-center justify-between mx-auto px-4 h-full">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
          data-testid="nav-logo"
        >
          <House className="stroke-accent" size="30" />
          <span className="brand text-white self-center text-2xl font-bold whitespace-nowrap">
            OpenGaff
          </span>
        </Link>
        <div
          className={`w-full md:block md:w-auto ${menuOpen ? "nav-menu-open block" : "hidden"}`}
        >
          <ul className="flex flex-col text-text-dark md:flex-row md:items-center md:gap-8 md:text-white">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`block py-2 px-3 border-b-2 md:p-0 ${
                      isActive
                        ? "border-accent"
                        : "border-transparent hover:border-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Button
                btnType="secondary"
                size="sm"
                icon={<Plus />}
                text="Add Rent"
                testId="add-rent-btn"
              />
            </li>
          </ul>
        </div>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-1 w-8 h-8 justify-center text-sm text-accent rounded-lg md:hidden focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          data-testid="nav-menu-btn"
        >
          <Menu size="24" className="stroke-accent hover:stroke-accent-hover" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
