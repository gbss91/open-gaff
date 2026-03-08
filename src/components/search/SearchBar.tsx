import Form from "next/form";
import styles from "./SearchBar.module.css";
import { Search } from "lucide-react";

type SearchBarProps = {
  className?: string;
};

const SearchBar = ({ className }: SearchBarProps) => {
  return (
    <div>
      <Form action="/property" className={className}>
        <div className={`${styles.searchContainer} relative`}>
          <Search
            name="search"
            size="18"
            className={`${styles.searchIcon} absolute left-2.5 top-1/2 -translate-y-1/2`}
          />
          <input
            type="search"
            id="search-bar"
            name="search"
            className={`${styles.input} bg-white text-sm block w-full px-8 py-4`}
            placeholder="Search address or Eircode..."
          />
          <button
            type="submit"
            className={`${styles.searchBtn} bg-primary absolute right-2.5 top-1/2 -translate-y-1/2 text-white text-sm font-bold px-4 py-2`}
          >
            Search
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SearchBar;
