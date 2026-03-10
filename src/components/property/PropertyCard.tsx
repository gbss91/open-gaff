import { Property } from "@/types";
import Link from "next/link";
import styles from "./property.module.css";

type PropertyTileProps = {
  property: Property;
};

const PropertyCard = ({ property }: PropertyTileProps) => {
  return (
    <Link href={`/property/${property.id}`}>
      <div className={`${styles["property-card"]} flex flex-col p-5`}>
        {/* <!-- top row: type · bedrooms · RTB --> */}
        <div className="flex flex-row justify-between items-cente">
          <span className={`${styles["card-type"]} text-sm font-semibold`}>
            Apartment · {property.county}
          </span>
          <div className="flex gap-2">
            <span className="meta-pill">2 bed</span>
            <span className="rtb-pill">RTB ✓</span>
          </div>
        </div>

        {/* <!-- identity --> */}
        <div className="card-address">1 Grand Canal Dock</div>
        <div className="card-eircode">D02 DX67</div>

        <div className="card-divider"></div>
      </div>
    </Link>
  );
};

export default PropertyCard;
