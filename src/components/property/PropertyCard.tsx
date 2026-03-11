import { Property } from "@/types";
import Link from "next/link";
import "./property.css";

type PropertyTileProps = {
  property: Property;
};

const PropertyCard = ({ property }: PropertyTileProps) => {
  return (
    <Link href={`/property/${property.id}`}>
      <div className="property-card flex flex-col p-5">
        <div className="flex flex-row justify-between items-cente">
          <span className="card-type">
            {property.type} · {property.county}
          </span>
          <div className="flex gap-2">
            <span className="meta-pill">{`${property.bedroomNo} bed`}</span>

            {property.isRegistered && <span className="rtb-pill">RTB</span>}
          </div>
        </div>

        <div className="card-address">{property.address1}</div>

        <div className="text-text-light">{property.eircode}</div>

        <div className="card-divider"></div>
      </div>
    </Link>
  );
};

export default PropertyCard;
