import { propertyService } from "@/server/services/propertyService";
import { NextRequest, NextResponse } from "next/server";

//Get property by Id
export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await params;
    const propertyId = parseInt(id);

    // Validate ID
    if (isNaN(propertyId)) {
      return NextResponse.json(
        { error: "Invalid property ID" },
        { status: 400 },
      );
    }

    const property = await propertyService.getPropertyById(propertyId);

    // Check if property exists
    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error("API Error: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
