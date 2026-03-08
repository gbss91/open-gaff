"use client";

import Link from "next/link";
import { House } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "./ui/Button";
import { Plus } from "lucide-react";

const navItems = [
  {
    id: "properties",
    label: "Properties",
    href: "/properties",
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-primary h-16" data-testid="nav-container">
      <div
        className="max-w-full flex flex-wrap items-center justify-between mx-auto p-4"
        data-testid="nav-logo"
      >
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <House className="stroke-accent" size="30" />
          <span className="brand text-white self-center text-2xl font-bold whitespace-nowrap">
            OpenGaff
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-20"
          onClick={() => setMenuOpen((prev) => !prev)}
          data-testid="nav-menu-btn"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`block py-2 px-3 md:p-0 border-b-3 text-gray-700 ${
                      isActive
                        ? "border-blue-700"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Button
          btnType="secondary"
          size="sm"
          icon={<Plus />}
          text="Add Rent"
          testId="add-rent-btn"
        />
      </div>
    </nav>
  );
};

export default Navbar;
