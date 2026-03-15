"use client";

import { PropertySuggestion } from "@/types";
import { Search } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<PropertySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
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
      setShowSuggestions(true);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions([]);
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

  const handleSuggestionItemClick = (property: PropertySuggestion) => {
    setShowSuggestions(false);
    router.push(`/property/${property.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleSuggestionItemClick(suggestions[selectedIndex]);
        }
        // If selectedIndex is -1, let the form submit normally
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

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
              showSuggestions ? "has-suggestions" : ""
            }`}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
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
      {showSuggestions && (
        <div
          className="suggestions-box bg-white text-sm overflow-y-auto"
          data-testid="suggestion-box"
        >
          {suggestions.length > 0 ? (
            <ul>
              {suggestions.map((property, index) => (
                <li
                  key={property.id}
                  onClick={() => handleSuggestionItemClick(property)}
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
          ) : (
            <Link href="/new">
              <div className="px-8 py-3 text-center hover:bg-secondary/10">
                <p className="text-text-light text-sm">
                  {"Can't find your property?"}
                  <span className="text-text-accent no-underline font-semibold ml-1">
                    Add it here →
                  </span>
                </p>
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
