import { propertyService } from "@/server/services/propertyService";
import { NextRequest, NextResponse } from "next/server";

// Get all properties
export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    console.log(request.nextUrl);

    const properties = await propertyService.getAllProperties();
    return NextResponse.json(properties);
  } catch (error) {
    console.error("API Error: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// Create a property
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const newProperty = await propertyService.addProperty(body);
    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error("API Error: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
