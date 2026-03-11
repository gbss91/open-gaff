"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import FilterPill from "./FilterPill";

const sortOptions = [
  { label: "Most entries", value: "most_entries", icon: <ChevronDown /> },
  { label: "Least entries", value: "least_entries", icon: <ChevronUp /> },
];

const FilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeType = searchParams.get("type") || "all";
  const currentSort = searchParams.get("sort") || "most_entries";
  const currentSortOption =
    sortOptions.find((option) => option.value === currentSort) ??
    sortOptions[0];

  const handleTypeChange = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === "all") {
      params.delete("type");
    } else {
      params.set("type", type);
    }

    const query = params.toString();
    router.push(`/properties${query ? `?${query}` : ""}`);
  };

  const handleSort = () => {
    const params = new URLSearchParams(searchParams.toString());
    const currentIndex = sortOptions.findIndex(
      (option) => option.value === currentSort,
    );
    const next = sortOptions[(currentIndex + 1) % sortOptions.length];
    params.set("sort", next.value);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between" data-testid="filter-bar">
      <div className="flex gap-2" data-testid="filter-type-pills">
        <FilterPill
          label="All"
          active={activeType === "all"}
          onClick={() => handleTypeChange("all")}
        />
        <FilterPill
          label="Apartment"
          active={activeType === "apartment"}
          onClick={() => handleTypeChange("apartment")}
        />
        <FilterPill
          label="House"
          active={activeType === "house"}
          onClick={() => handleTypeChange("house")}
        />
        <FilterPill
          label="Studio"
          active={activeType === "studio"}
          onClick={() => handleTypeChange("studio")}
        />
      </div>

      <FilterPill
        label={`Sort: ${currentSortOption.label}`}
        icon={currentSortOption.icon}
        iconPosition="right"
        onClick={handleSort}
        testId="filter-sort-pill"
      />
    </div>
  );
};

export default FilterBar;
