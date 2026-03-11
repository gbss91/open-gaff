"use client";
import { Property, Rent } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./property.css";

type PropertyTileProps = {
  property: Property;
};

const PropertyCard = ({ property }: PropertyTileProps) => {
  const [recentRent, setRecentRent] = useState<Rent>();

  useEffect(() => {
    if (!property.rents?.length) return;

    const mostRecentRent = property.rents.reduce((latest, current) =>
      current.addedAt > latest.addedAt ? current : latest,
    );
    setRecentRent(mostRecentRent);
  }, [property.rents]);

  return (
    <Link href={`/property/${property.id}`}>
      <div className="property-card flex flex-col p-5">
        <div className="flex flex-row justify-between items-center">
          <span className="card-type">
            {property.type} · {property.county}
          </span>
          <div className="flex gap-2">
            {property.isRegistered && (
              <span className="rtb-pill">RTB Registered</span>
            )}
            <span className="meta-pill">{`${property.bedroomNo} bed`}</span>
          </div>
        </div>

        <div className="card-address">{property.address1}</div>

        <div className="text-text-light">{property.eircode}</div>

        <div className="card-divider my-2"></div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="card-rent-label">Most recent rent</span>
            <div className="card-rent">
              {recentRent ? (
                <>
                  €{recentRent.amount.toLocaleString()}
                  <span className="text-text-light text-sm font-light">
                    /mo
                  </span>
                </>
              ) : (
                <span className="card-no-rent text-text-light font-normal text-base">
                  No rents logged yet
                </span>
              )}
            </div>
          </div>

          <div className="card-history-cta">
            See More
            <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
