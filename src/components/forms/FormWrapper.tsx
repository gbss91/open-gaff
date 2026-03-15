import { Property } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import PropertyForm from "./PropertyForm";

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
    router.push(`/rents/new?step=rent`);
  };

  console.log(newPropertyData);

  return (
    <main className="flex-1 flex flex-col">
      {step === "search" && (
        <section className="py-4 px-main">
          <h2 className="form-title text-3xl font-bold pb-2">
            Find your property
          </h2>
        </section>
      )}

      {step === "property" && (
        <section className="py-4 px-main">
          <h2 className="form-title text-3xl font-bold pb-5">Add Property</h2>
          <PropertyForm onSubmit={handlePropertySubmit} />
        </section>
      )}

      {step === "rent" && (
        <section className="py-4 px-main">
          <h2 className="form-title text-3xl font-bold pb-2">Add Rent</h2>
        </section>
      )}
    </main>
  );
};

export default FormWrapper;
