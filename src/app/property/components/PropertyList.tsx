import { Property } from "@/types";

type PropertyProps = {
  properties: Property[];
};

const PropertyList = ({ properties }: PropertyProps) => {
  return (
    <div>
      {properties.map((property) => (
        <div key={property.id}>
          <h3>{property.address_1}</h3>
          <p>{property.eircode}</p>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
