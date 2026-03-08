import Form from "next/form";
import styles from "./SearchBar.module.css";
import { Search } from "lucide-react";

type SearchBarProps = {
  onSearch: (formData: FormData) => void | Promise<void>;
  className?: string;
};

const SearchBar = ({ onSearch, className }: SearchBarProps) => {
  return (
    <Form action={onSearch} className={className}>
      <div className="relative">
        <Search
          name="search"
          size="18"
          className="stroke-muted absolute left-2.5 top-1/2 -translate-y-1/2"
        />
        <input
          type="search"
          id="search-bar"
          name="search"
          className={`${styles.input} bg-white text-sm block w-full px-8 py-4`}
          placeholder="Search by address or Eircode..."
        />
        <button
          type="submit"
          className={`${styles.searchBtn} bg-primary absolute right-2.5 top-1/2 -translate-y-1/2 text-white text-sm px-4 py-2`}
        >
          Search
        </button>
      </div>
    </Form>
  );
};

export default SearchBar;
