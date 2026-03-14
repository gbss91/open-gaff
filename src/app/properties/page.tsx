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

export const dynamic = "force-dynamic";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q, page: pageParam, type, sort } = await searchParams;
  const page = Number(pageParam) || 1;
  console.log({ q, page, type });

  const { properties } = q
    ? await propertyService.searchProperties(q, page, 10, type, sort)
    : await propertyService.getAllProperties(page, 10, type, sort);

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
      <div className="flex flex-1 flex-col">
        <div
          className="list-panel order-2 flex flex-1 flex-col px-main py-4 gap-3"
          data-testid="list-panel"
        >
          {properties.map((property: Property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </main>
  );
}
