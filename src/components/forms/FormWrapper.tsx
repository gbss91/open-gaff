import { Property } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import SearchBar from "../search/SearchBar";
import PropertyForm from "./PropertyForm";
import RentForm from "./RentForm";

type Step = "search" | "property" | "rent";

const FormWrapper = () => {
  const [propertyData, setPropertyData] = useState<Property>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = (searchParams.get("step") as Step) || "search";

  const handlePropertySelect = async (propertyId: number) => {
    try {
      const response = await fetch(`/api/properties/${propertyId}`);
      const fullProperty = await response.json();

      setPropertyData(fullProperty);
      router.push("/new?step=rent");
    } catch (error) {
      console.error("Failed to fetch property:", error);
    }
  };

  const handlePropertySubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setPropertyData({
      address1: formData.get("address1") as string,
      address2: formData.get("address2")?.toString().trim() || null,
      address3: formData.get("address3")?.toString().trim() || null,
      address4: formData.get("address4")?.toString().trim() || null,
      county: formData.get("county") as string,
      eircode: formData.get("eircode")?.toString().replace(/\s/g, "") || "",
      bedroomNo: Number(formData.get("bedroomNo")),
      type: formData.get("type") as string,
      isRegistered: formData.has("isRegistered"),
    });
    router.push(`/new?step=rent`);
  };

  const handleRentSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const completeData = {
      property: propertyData,
      rent: {
        amount: Number(formData.get("amount")),
        arrangementType: formData.get("arrangementType") as string,
        occupantsCount: Number(formData.get("occupantsCount")) || null,
      },
    };

    try {
      const response = await fetch("/api/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(completeData),
      });

      if (!response.ok) {
        router.push("/properties");
        return;
      }

      const data = await response.json();
      router.push(`/properties/${data.id}`);
    } catch (error) {
      console.error("Failed to create property with rent:", error);
    }
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
              Search for an existing property.
            </p>
            <SearchBar
              includeSuggestions={true}
              onPropertySelect={handlePropertySelect}
            />
          </div>
        </section>
      )}

      {step === "property" && (
        <section className="py-4 px-main">
          <div className="max-w-3xl mx-auto">
            <h2 className="form-title text-3xl font-bold">Add Property</h2>
            <p className="text-text-light text-sm pb-5">
              Tell us about the property.
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
            <RentForm property={propertyData} onSubmit={handleRentSubmit} />
          </div>
        </section>
      )}
    </main>
  );
};

export default FormWrapper;
