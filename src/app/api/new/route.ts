import { propertyService } from "@/server/services/propertyService";
import { rentService } from "@/server/services/rentService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { property, rent } = body;
    let propertyId: number | undefined;

    if (!property || !rent) {
      return NextResponse.json(
        { error: "Missing property or rent data" },
        { status: 400 },
      );
    }

    if (property.id) {
      await rentService.addRent({
        ...rent,
        propertyId: property.id,
      });
      propertyId = property.id;
    } else {
      const result = await propertyService.addPropertyWithRent({
        ...property,
        rents: [rent],
      });
      propertyId = result.id;
    }

    return NextResponse.json({
      id: propertyId,
      status: 201,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error("API Error - Failed to create property/rent:");
    return NextResponse.json(
      { error: "Failed to add new record" },
      { status: 500 },
    );
  }
}
