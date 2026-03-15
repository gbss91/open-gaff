"use client";
import PropertyForm from "@/components/forms/PropertyForm";
import { Property } from "@/types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

type Step = "search" | "property" | "rent";

export default function NewPage() {
  const searchParams = useSearchParams();

  const [newPropertyData, setNewPropertyData] = useState<Property>();
  const [step, setStep] = useState<Step>("property");

  const handlePropertySubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setNewPropertyData({
      address1: formData.get("address1") as string,
      address2: formData.get("address2") as string,
      address3: formData.get("address3") as string,
      address4: formData.get("address4") as string,
      county: formData.get("county") as string,
      eircode: formData.get("eircode") as string,
      bedroomNo: Number(formData.get("bedroomNo")),
      type: formData.get("type") as string,
      isRegistered: formData.has("isRegistered"),
    });
    setStep("rent");
  };

  return (
    <main className="flex-1 flex flex-col">
      {step === "property" && (
        <section className="py-4 px-main">
          <h2 className="form-title text-3xl font-bold pb-5">
            Property Details
          </h2>
          <PropertyForm onSubmit={handlePropertySubmit} />
        </section>
      )}

      {step === "rent" && (
        <section className="py-4 px-main">
          <h2 className="form-title text-3xl font-bold pb-2">
            Address Details
          </h2>
          <PropertyForm onSubmit={handlePropertySubmit} />
        </section>
      )}
    </main>
  );
}
