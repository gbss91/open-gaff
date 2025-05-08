"use client";

import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import PropertyList from "./components/PropertyList";
import { Property } from "@/types";
import { useSearchParams } from "next/navigation";

export default function PropertyPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryString = searchParams.toString();
    const url = queryString
      ? `/api/properties?${queryString}`
      : `/api/properties`;

    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          // Might add error page
          setProperties([]); // Fallback to empty list
          return;
        }
        const data = await res.json();
        setProperties(data);
      })
      .catch((error) => console.log("Error fetching properties", error));
  }, [searchParams]);

  return (
    <main style={{ minHeight: "calc(100vh - 64px)" }}>
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
        <div className="w-full">
          <SearchBar />
        </div>
      </div>
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
        <div className="w-full">
          <PropertyList properties={properties} />
        </div>
      </div>
    </main>
  );
}
