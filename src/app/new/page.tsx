"use client";
import FormWrapper from "@/components/forms/FormWrapper";
import { Suspense } from "react";

export default function NewPage() {
  return (
    <Suspense fallback={""}>
      <FormWrapper />
    </Suspense>
  );
}
