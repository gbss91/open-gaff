import { Property } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../ui/Button";
import CustomInput from "../ui/CustomInput";

type RentFormProps = {
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  property: Property | undefined;
};

const RentForm = ({ onSubmit, property }: RentFormProps) => {
  const router = useRouter();
  const [showOccupantsCount, setShowOccupantsCount] = useState(false);

  const handleChangeClick = () => {
    router.push("/new?step=search");
  };

  const handleArrangementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value !== "whole_unit";
    setShowOccupantsCount(value);
  };

  return (
    <>
      <div className="property-box flex justify-between px-8 py-4 mb-5">
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase text-text-accent">
            Adding rent for
          </span>
          <div className="address-title text-md font-bold">
            {property?.address1}
          </div>
          <div className="text-sm text-text-light">
            {property?.eircode} · {property?.county}
          </div>
        </div>
        <button className="change-btn text-sm" onClick={handleChangeClick}>
          Change
        </button>
      </div>

      <form onSubmit={onSubmit} className="form-container">
        <div className="flex flex-col gap-4 px-8 py-6">
          <span className="text-xs font-semibold uppercase text-text-accent">
            Rent Arragment
          </span>
          <fieldset className="flex flex-col gap-3.5">
            <label
              htmlFor="whole_unit"
              className="rent-option flex flex-row gap-3 cursor-pointer items-center"
            >
              <input
                type="radio"
                id="whole_unit"
                name="arrangementType"
                value="whole_unit"
                onChange={handleArrangementChange}
              />
              <div className="flex flex-col text-start">
                <span className="text-[0.8rem] font-semibold text-text-dark">
                  Whole Property
                </span>
                <p className="text-text-light text-sm">
                  One household renting the full property. This includes couples
                  or families living on their own.
                </p>
              </div>
            </label>

            <label
              htmlFor="private_room"
              className="rent-option flex flex-row gap-3 cursor-pointer items-center"
            >
              <input
                type="radio"
                id="private_room"
                name="arrangementType"
                value="private_room"
                onChange={handleArrangementChange}
              />
              <div className="flex flex-col text-start">
                <span className="text-[0.8rem] font-semibold text-text-dark">
                  Private Room
                </span>
                <p className="text-text-light text-sm">
                  One or more people renting a room in a shared property.
                </p>
              </div>
            </label>

            <label
              htmlFor="shared_room"
              className="rent-option flex flex-row gap-3 cursor-pointer items-center"
            >
              <input
                type="radio"
                id="shared_room"
                name="arrangementType"
                value="shared_room"
                onChange={handleArrangementChange}
              />
              <div className="flex flex-col text-start">
                <span className="text-[0.8rem] font-semibold text-text-dark">
                  Shared Room
                </span>
                <p className="text-text-light text-sm">
                  Sharing a room with others.
                </p>
              </div>
            </label>
          </fieldset>
          {showOccupantsCount && (
            <CustomInput
              type="number"
              label="Total people in the property"
              helperText="How many people live in the property, including yourself? Helps others understand the full picture for shared properties"
            />
          )}
        </div>

        {/* Form Rent Details Section  */}
        <div className="flex flex-col gap-4 px-8 py-6">
          <span className="text-xs font-semibold uppercase text-text-accent">
            Rent Details
          </span>
          <CustomInput
            name="amount"
            type="number"
            label="Monthly rent (€)"
            helperText="The full monthly amount you pay"
            isRequired
          />
        </div>

        {/* Form Footer Section  */}
        <div className="form-footer flex justify-end px-8 py-6">
          <Button type="submit" text="Submit" testId="rent-submit-btn" />
        </div>
      </form>
    </>
  );
};

export default RentForm;
