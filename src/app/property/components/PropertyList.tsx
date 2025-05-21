"use client";

import { Property } from "@/types";
import PropertyCard from "./PropertyCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const PropertyList = () => {
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
      .catch(() => {
        console.log("Error fetching properties");
        setProperties([]);
      });
  }, [searchParams]);

  return (
    <div className="w-full space-y-4">
      {properties.length > 0 ? (
        properties.map((property) => (
          <div key={property.id}>
            <PropertyCard property={property} />
          </div>
        ))
      ) : (
        <span>Nothing found</span>
      )}
    </div>
  );
};

export default PropertyList;
