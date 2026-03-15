"use client";
import { Bed, Building, House } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";
import CustomInput from "../ui/CustomInput";
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
  const [selectedType, setSelectedType] = useState<PropertyType>();

  const propertyTypes = [
    { id: "house" as PropertyType, label: "House", icon: House },
    { id: "apartment" as PropertyType, label: "Apartment", icon: Building },
    { id: "studio" as PropertyType, label: "Studio", icon: Bed },
  ];

  const formatEircode = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    if (value.length > 3) value = value.slice(0, 3) + " " + value.slice(3, 7);

    e.target.value = value;
  };

  return (
    <form onSubmit={onSubmit} className="form-container">
      {/* Form Address Details Section  */}
      <div className="px-8 py-6 flex flex-col gap-4">
        <span className="text-xs font-semibold uppercase text-text-accent">
          Address
        </span>

        <CustomInput name="address1" label="Address line 1" isRequired />
        <CustomInput name="address2" label="Address line 2" />
        <CustomInput name="address3" label="Address line 3" />
        <CustomInput name="address4" label="Address line 4" />

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

          <CustomInput
            name="eircode"
            label="Eircode"
            maxLength={8}
            placeholder="D08 RX6H"
            onChange={formatEircode}
            isRequired
          />
        </div>
      </div>

      {/* Form Property Details Section  */}
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
                <input
                  type="radio"
                  name="type"
                  value={id}
                  checked={selectedType === id}
                  onChange={() => setSelectedType(id)}
                  required
                  className="sr-only"
                />
                <Icon className="stroke-primary" />
                <span className="text-[0.8rem] font-semibold text-text-dark">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-3.5">
          <CustomInput
            name="bedrooms"
            label="Bedrooms"
            type="number"
            isRequired
          />
          <CustomInput
            name="isRegistered"
            label="RTB Resgistred"
            type="checkbox"
            isRequired
          />
        </div>
      </div>

      {/* Form Footer Section  */}
      <div className="form-footer flex justify-end px-7 py-6 ">
        <Button
          type="submit"
          text="Next: Add Rent"
          testId="property-submit-btn"
        />
      </div>
    </form>
  );
};
export default PropertyForm;
