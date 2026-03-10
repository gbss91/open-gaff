import { Property } from "@/types";
import Link from "next/link";
import styles from "./property.module.css";

type PropertyTileProps = {
  property: Property;
};

const PropertyCard = ({ property }: PropertyTileProps) => {
  return (
    <Link href={`/property/${property.id}`}>
      <div className={styles["property-card"]}></div>
    </Link>
  );
};

export default PropertyCard;
