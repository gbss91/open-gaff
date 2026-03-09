import FilterBar from "@/components/filter/FilterBar";
import SearchBar from "@/components/search/SearchBar";

export default function PropertiesPage() {
  return (
    <main className="flex-1 flex flex-col">
      <div className="py-4 px-main" data-testid="search-container">
        <SearchBar action="/properties" />
      </div>
      <div className="filter-container px-main">
        <FilterBar resultCount={47} />
      </div>
      <div className="flex flex-1 flex-row">
        <div
          className="list-panel bg-accent flex-1 pl-main"
          data-testid="list-panel"
        >
          S
        </div>
        <div
          className="map-panel bg-amber-500 flex-1 px-0"
          data-testid="map-panel"
        >
          S
        </div>
      </div>
    </main>
  );
}
