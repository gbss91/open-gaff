import FilterBar from "@/components/filter/FilterBar";
import DynamicMap from "@/components/map/DynamicMap";
import SearchBar from "@/components/search/SearchBar";
import { Suspense } from "react";

export default function PropertiesPage() {
  return (
    <main className="flex-1 flex flex-col">
      <div className="py-4 px-main" data-testid="search-container">
        <SearchBar action="/properties" />
      </div>
      <div className="filter-container py-2 px-main">
        <Suspense fallback={null}>
          <FilterBar />
        </Suspense>
      </div>
      <div className="flex flex-1 flex-row">
        <div
          className="list-panel flex-1 pl-main"
          data-testid="list-panel"
        ></div>
        <div className="map-panel flex-1 p" data-testid="map-panel">
          <DynamicMap />
        </div>
      </div>
    </main>
  );
}
