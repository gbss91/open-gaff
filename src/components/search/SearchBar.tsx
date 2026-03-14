"use client";

import { PropertySuggestion } from "@/types";
import { Search } from "lucide-react";
import Form from "next/form";
import { useEffect, useRef, useState } from "react";
import "./searchBar.css";

type SearchBarProps = {
  action: string;
  includeSuggestions: boolean;
  className?: string;
};

const SearchBar = ({
  action,
  includeSuggestions,
  className,
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<PropertySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const getSuggestions = async () => {
    try {
      const response = await fetch(
        `/api/properties/suggestions?q=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch suggestions");
      }

      const results = await response.json();
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch suggestions with debouncing
  useEffect(() => {
    if (!includeSuggestions || query.length < 4) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(async () => {
      setIsLoading(true);
      getSuggestions();
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
  };

  // const handleSuggestionClick = (property: PropertySuggestion) => {
  //   setQuery(property.address);
  //   setShowSuggestions(false);

  //   if (onSuggestionSelect) {
  //     // Client-side navigation via callback
  //     onSuggestionSelect(property);
  //   } else {
  //     // Server-side navigation - submit form with eircode
  //     const form = wrapperRef.current?.querySelector("form");
  //     if (form) {
  //       const input = form.querySelector('input[name="q"]') as HTMLInputElement;
  //       if (input) {
  //         input.value = property.eircode; // Use eircode for precise search
  //         form.requestSubmit();
  //       }
  //     }
  //   }
  // };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (!showSuggestions || suggestions.length === 0) return;

  //   switch (e.key) {
  //     case "ArrowDown":
  //       e.preventDefault();
  //       setSelectedIndex((prev) =>
  //         prev < suggestions.length - 1 ? prev + 1 : prev,
  //       );
  //       break;
  //     case "ArrowUp":
  //       e.preventDefault();
  //       setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
  //       break;
  //     case "Enter":
  //       if (selectedIndex >= 0) {
  //         e.preventDefault();
  //         handleSuggestionClick(suggestions[selectedIndex]);
  //       }
  //       // If selectedIndex is -1, let the form submit normally
  //       break;
  //     case "Escape":
  //       setShowSuggestions(false);
  //       setSelectedIndex(-1);
  //       break;
  //   }
  // };

  // const handleClear = () => {
  //   setQuery("");
  //   setSuggestions([]);
  //   setShowSuggestions(false);
  // };

  // const highlightMatch = (text: string, query: string) => {
  //   if (!query) return text;

  //   const regex = new RegExp(
  //     `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
  //     "gi",
  //   );
  //   const parts = text.split(regex);

  //   return parts.map((part, index) =>
  //     regex.test(part) ? (
  //       <strong key={index} className="font-semibold text-primary">
  //         {part}
  //       </strong>
  //     ) : (
  //       part
  //     ),
  //   );
  // };

  return (
    <div className="relative">
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
            className={`input bg-white text-sm block w-full px-8 py-4 ${
              showSuggestions || isLoading ? "has-suggestions" : ""
            }`}
            onChange={handleInputChange}
            placeholder="Search by address or Eircode..."
            data-testid="search-bar"
          />
          <button
            type="submit"
            className={`search-btn bg-primary absolute right-2.5 top-1/2 -translate-y-1/2 text-white text-sm px-4 py-2`}
            data-testid="search-bar-btn"
          >
            Search
          </button>
        </div>
      </Form>

      {/* Suggestions Dropdown */}
      {(showSuggestions || isLoading) && (
        <div
          className="suggestions-box bg-white text-sm overflow-y-auto"
          data-testid="suggestion-box"
        >
          {isLoading ? (
            <div className="text-start py-3 px-8 text-sm text-muted">
              Loading suggestions...
            </div>
          ) : suggestions.length > 0 ? (
            <ul>
              {suggestions.map((property, index) => (
                <li
                  key={property.id}
                  // onClick={() => handleSuggestionClick(property)}
                  className={`suggestion-item py-3 px-8 cursor-pointer transition-colors text-start ${
                    index === selectedIndex
                      ? "bg-primary/10"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="font-medium text-text-dark">
                      {property.address1}
                    </div>
                    <div className=" text-text-light">{property.eircode}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
function async() {
  throw new Error("Function not implemented.");
}
