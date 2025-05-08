import { Property } from "@/types";
import { House } from "lucide-react";
type PropertyTileProps = {
  property: Property;
};

const PropertyCard = ({ property }: PropertyTileProps) => {
  const address1 = property.address1.trim();
  const county = property.county.trim();
  const eircode = property.eircode.trim();

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-xs border border-gray-300 p-4 flex flex-col justify-between">
        <div className="flex items-center">
          <div className="w-2/3 pr-4">
            <p
              className={`text-sm flex items-center ${
                property.isRegistered ? "text-green-600" : "text-gray-600"
              }`}
            >
              {property.isRegistered ? (
                <House size={16} className="w-4 h-4 mr-1 text-green-600" />
              ) : (
                <House size={16} className="w-4 h-4 mr-1 text-gray-600" />
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
              {property.rentPrices?.rentValue || "Not Found "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
