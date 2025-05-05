import { NextResponse } from "next/server";
import { getAllProperties } from "@/server/services/propertyService";

export const GET = async () => {
  const properties = await getAllProperties();
  return NextResponse.json(properties);
};
