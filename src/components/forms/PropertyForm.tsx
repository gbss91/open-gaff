"use client";
import { Bed, Building, House } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";
import "./forms.css";

const COUNTIES = [
  "Dublin",
  "Cork",
  "Galway",
  "Limerick",
  "Waterford",
  "Kilkenny",
  "Wexford",
  "Clare",
  "Kerry",
  "Tipperary",
  "Wicklow",
  "Kildare",
  "Meath",
  "Louth",
  "Westmeath",
  "Offaly",
  "Laois",
  "Carlow",
  "Longford",
  "Roscommon",
  "Mayo",
  "Sligo",
  "Leitrim",
  "Cavan",
  "Monaghan",
  "Donegal",
];

type PropertyType = "house" | "apartment" | "studio";

type PropertyFormProps = {
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
};

const PropertyForm = ({ onSubmit }: PropertyFormProps) => {
  const [selectedType, setSelectedType] = useState<PropertyType>("house");

  const propertyTypes = [
    { id: "house" as PropertyType, label: "House", icon: House },
    { id: "apartment" as PropertyType, label: "Apartment", icon: Building },
    { id: "studio" as PropertyType, label: "Studio", icon: Bed },
  ];

  const formatEircode = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9 ]/g, "");
  };

  return (
    <form onSubmit={onSubmit} className="form-container">
      <div className="px-7 py-6 flex flex-col gap-4">
        <span className="text-xs font-semibold uppercase text-text-accent">
          Address
        </span>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="address1"
            className="text-[0.8rem] font-semibold text-text-dark flex gap-1.5 items-center"
          >
            Address line 1
          </label>
          <input
            id="address1"
            name="address1"
            type="text"
            required
            className="form-input w-full px-3.5 py-2.5 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="address2"
            className="text-[0.8rem] font-semibold text-text-dark flex gap-1.5 items-center"
          >
            Address line 2
            <span className="font-normal text-text-light text-[0.73rem]">
              (optional)
            </span>
          </label>
          <input
            id="address2"
            name="address2"
            type="text"
            className="form-input w-full px-3.5 py-2.5 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="address3"
            className="text-[0.8rem] font-semibold text-text-dark flex gap-1.5 items-center"
          >
            Address line 3
            <span className="font-normal text-text-light text-[0.73rem]">
              (optional)
            </span>
          </label>
          <input
            id="address3"
            name="address3"
            type="text"
            className="form-input w-full px-3.5 py-2.5 text-sm"
          />
          <label
            htmlFor="address4"
            className="text-[0.8rem] font-semibold text-text-dark flex gap-1.5 items-center"
          >
            Address line 4
            <span className="font-normal text-text-light text-[0.73rem]">
              (optional)
            </span>
          </label>
          <input
            id="address4"
            name="address4"
            type="text"
            className="form-input w-full px-3.5 py-2.5 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="county"
              className="text-[0.8rem] font-semibold text-text-dark"
            >
              County
            </label>
            <select
              id="county"
              name="county"
              className="form-input px-3.5 py-2.5 text-sm appearance-none"
              required
            >
              <option value="">Select county…</option>
              {COUNTIES.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="eircode"
              className="text-[0.8rem] font-semibold text-text-dark"
            >
              Eircode
            </label>
            <input
              id="eircode"
              name="eircode"
              type="text"
              placeholder="D02 XY12"
              maxLength={8}
              required
              onChange={formatEircode}
              className="form-input w-full px-3.5 py-2.5 text-sm"
            />
          </div>
        </div>
      </div>
      <div className="px-7 py-6 flex flex-col gap-4">
        <span className="text-xs font-semibold uppercase text-text-accent">
          Property Details
        </span>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="propertyType"
            className="text-[0.8rem] font-semibold text-text-dark"
          >
            Property type
          </label>
          <div className="grid grid-cols-3 gap-3.5">
            {propertyTypes.map(({ id, label, icon: Icon }) => (
              <div
                key={id}
                onClick={() => setSelectedType(id)}
                className={`type-option ${selectedType === id ? "selected" : ""}`}
              >
                <Icon className="stroke-primary" />
                <span className="text-[0.8rem] font-semibold text-text-dark">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-3.5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="bedrooms"
              className="text-[0.8rem] font-semibold text-text-dark"
            >
              Bedrooms
            </label>
            <input
              id="bedrooms"
              name="bedrooms"
              type="number"
              className="form-input w-full px-3.5 py-2.5 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="isRegistered"
              className="text-[0.8rem] font-semibold text-text-dark"
            >
              RTB Registered
            </label>
            <input
              id="isRegistered"
              name="isRegistered"
              type="checkbox"
              value="true"
              className="form-input w-4 h-4"
            />
          </div>
        </div>
      </div>
      <div className="form-footer flex justify-end px-7 py-6 ">
        <Button text="Next: Add Rent" testId="property-submit-btn" />
      </div>
    </form>
  );
};
export default PropertyForm;
