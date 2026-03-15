import { Property } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import PropertyForm from "./PropertyForm";
import RentForm from "./RentForm";

type Step = "search" | "property" | "rent";

const FormWrapper = () => {
  const [newPropertyData, setNewPropertyData] = useState<Property>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = (searchParams.get("step") as Step) || "search";

  const handlePropertySubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setNewPropertyData({
      address1: formData.get("address1") as string,
      address2: formData.get("address2") as string,
      address3: formData.get("address3") as string,
      address4: formData.get("address4") as string,
      county: formData.get("county") as string,
      eircode: formData.get("eircode")?.toString().replace(/\s/g, "") || "",
      bedroomNo: Number(formData.get("bedroomNo")),
      type: formData.get("type") as string,
      isRegistered: formData.has("isRegistered"),
    });
    router.push(`/new?step=rent`);
  };

  const handleRentSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Rent Submitted ");
  };

  return (
    <main className="flex-1 flex flex-col">
      {step === "search" && (
        <section className="py-4 px-main">
          <div className="max-w-3xl mx-auto">
            <h2 className="form-title text-3xl font-bold">
              Find your property
            </h2>
            <p className="text-text-light text-sm pb-5">
              Tell us what you pay for this property.
            </p>
          </div>
        </section>
      )}

      {step === "property" && (
        <section className="py-4 px-main">
          <div className="max-w-3xl mx-auto">
            <h2 className="form-title text-3xl font-bold">Add Property</h2>
            <p className="text-text-light text-sm pb-5">
              Tell us what you pay for this property.
            </p>
            <PropertyForm onSubmit={handlePropertySubmit} />
          </div>
        </section>
      )}

      {step === "rent" && (
        <section className="py-4 px-main">
          <div className="max-w-3xl mx-auto">
            <h2 className="form-title text-3xl font-bold">Add Rent</h2>
            <p className="text-text-light text-sm pb-5">
              Tell us what you pay for this property.
            </p>
            <RentForm property={newPropertyData} onSubmit={handleRentSubmit} />
          </div>
        </section>
      )}
    </main>
  );
};

export default FormWrapper;
