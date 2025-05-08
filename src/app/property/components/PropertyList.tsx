import { Property } from "@/types";
import PropertyCard from "./PropertyCard";

type PropertyProps = {
  properties: Property[];
};

const PropertyList = ({ properties }: PropertyProps) => {
  return (
    <div className="w-full space-y-4">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
