"use client";

import { Search } from "lucide-react";
import Form from "next/form";
import styles from "./searchBar.module.css";

type SearchBarProps = {
  action: string;
  className?: string;
};

const SearchBar = ({ action, className }: SearchBarProps) => {
  return (
    <Form action={action} className={className}>
      <div className="relative">
        <Search
          name="search"
          size="18"
          className="stroke-muted absolute left-2.5 top-1/2 -translate-y-1/2"
          data-testid="search-bar-icon"
        />
        <input
          type="search"
          id="search-bar"
          name="q"
          className={`${styles.input} bg-white text-sm block w-full px-8 py-4`}
          placeholder="Search by address or Eircode..."
          data-testid="search-bar"
        />
        <button
          type="submit"
          className={`${styles["search-btn"]} bg-primary absolute right-2.5 top-1/2 -translate-y-1/2 text-white text-sm px-4 py-2`}
          data-testid="search-bar-btn"
        >
          Search
        </button>
      </div>
    </Form>
  );
};

export default SearchBar;
