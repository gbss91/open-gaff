"use client";

import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import PropertyList from "./components/PropertyList";
import { Property } from "@/types";

export default function PropertyPage() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data: Property[]) => setProperties(data))
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  console.log(properties);

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
