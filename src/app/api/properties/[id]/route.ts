import { propertyService } from "@/server/services/propertyService";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    console.log("IM CALLED WITH", id);
    const property = await propertyService.getPropertyById(parseInt(id), [
      "reviews",
      "rents",
    ]);

    if (!property || Object.keys(property).length === 0) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error("API Error: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
