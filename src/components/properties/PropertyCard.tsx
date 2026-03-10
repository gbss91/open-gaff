import { Property } from "@/types";
import Link from "next/link";
type PropertyTileProps = {
  property: Property;
};

const PropertyCard = ({ property }: PropertyTileProps) => {
  return <Link href={`/property/${property.id}`}></Link>;
};

export default PropertyCard;
