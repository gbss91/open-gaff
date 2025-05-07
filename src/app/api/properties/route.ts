import { propertyService } from "@/server/services/propertyService";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const properties = await propertyService.getAllProperties();
    return NextResponse.json(properties);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
