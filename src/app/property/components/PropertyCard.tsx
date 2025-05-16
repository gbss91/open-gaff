import { Property } from "@/types";
import { House } from "lucide-react";
import Link from "next/link";
type PropertyTileProps = {
  property: Property;
};

const PropertyCard = ({ property }: PropertyTileProps) => {
  const address1 = property.address1.trim();
  const county = property.county.trim();
  const eircode = property.eircode.trim();

  return (
    <Link href={`/property/${property.id}`}>
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-xs border border-gray-300 p-6 flex flex-col justify-between">
          <div className="flex items-center">
            <div className="w-2/3 pr-4">
              <p
                className={`text-sm flex items-center ${
                  property.isRegistered ? "text-green-600" : "text-gray-600"
                }`}
              >
                {property.isRegistered ? (
                  <House
                    size={16}
                    className="w-4 h-4 mr-1 text-green-600"
                    data-testid="house-icon"
                  />
                ) : (
                  <House
                    size={16}
                    className="w-4 h-4 mr-1 text-gray-600"
                    data-testid="house-icon"
                  />
                )}
                {property.isRegistered ? "Registered" : "Not Registered"}
              </p>
              <div className="text-gray-900 font-bold text-xl mb-1">
                {address1}
              </div>
              <p className="text-gray-700 text-base mb-0">
                {county}, {eircode}
              </p>
            </div>
            <div className="w-1/3 text-right">
              <div className="text-gray-900 font-bold text-xl mb-1">
                {property.rentPrices?.[0]?.rentValue ?? "No Data"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
