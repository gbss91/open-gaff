"use client";
import PropertyForm from "@/components/forms/PropertyForm";
import { Property } from "@/types";
import { useState } from "react";

type Step = "search" | "property" | "rent";

export default function NewPage() {
  const [newPropertyData, setNewPropertyData] = useState<Property>();
  const [step, setStep] = useState<Step>("search");

  const handlePropertySubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // setNewPropertyData({
    //   address1: formData.get("address1"),
    //   address2: formData.get("address2"),
    //   address3: formData.get("address3"),
    //   address4: formData.get("address4"),
    //   county: formData.get("county"),
    //   eircode: formData.get("eircode"),
    //   bedroomNo: formData.get("bedroomNo"),
    //   type: formData.get("type"),
    //   isRegistered: formData.get("isRegistered"),
    // });
    setStep("rent");
  };

  return (
    <main className="flex-1 flex flex-col">
      <section className="py-4 px-main">
        <h2 className="form-title text-3xl font-bold pb-2">Property Details</h2>
        <PropertyForm onSubmit={handlePropertySubmit} />
      </section>
      <section>
        <h2>Address Details</h2>
      </section>
    </main>
  );
}
