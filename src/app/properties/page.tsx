import FilterBar from "@/components/filter/FilterBar";
import PropertyCard from "@/components/property/PropertyCard";
import SearchBar from "@/components/search/SearchBar";
import { propertyService } from "@/server/services/propertyService";
import { Property } from "@/types";
import { Suspense } from "react";

type SearchParams = {
  q?: string;
  page?: string;
  type?: string;
  sort?: string;
};

export default async function PropertiesPage(searchParams: SearchParams) {
  const query = searchParams?.q ?? "";
  const page = Number(searchParams?.page ?? 1);
  console.log(query, page);

  const { properties } = await propertyService.getAllProperties(1);

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
      <div className="flex flex-1 flex-col md:flex-row">
        <div
          className="list-panel flex flex-1 flex-col px-main pt-4 gap-3"
          data-testid="list-panel"
        >
          {properties.map((property: Property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="map-panel flex-1 p" data-testid="map-panel">
          {/* <DynamicMap /> */}
        </div>
      </div>
    </main>
  );
}
