import { Property } from "@/types";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import CustomInput from "../ui/CustomInput";

type RentFormProps = {
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  property: Property | undefined;
};

const RentForm = ({ onSubmit, property }: RentFormProps) => {
  const router = useRouter();

  const handleChangeClick = () => {
    router.push("/new?step=search");
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
