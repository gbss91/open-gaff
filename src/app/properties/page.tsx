import { Suspense } from "react";
import PropertyList from "@/components/properties/PropertyList";
import SearchBar from "@/components/search/SearchBar";

export default function PropertiesPage() {
  return (
    <main style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
        <div className="w-full">
          <SearchBar />
        </div>
      </div>
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
        <div className="w-full">
          <Suspense>
            <PropertyList />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
