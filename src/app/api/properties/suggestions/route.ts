import { propertyService } from "@/server/services/propertyService";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q")?.trim() || "";

    // Validate minimum query length
    if (query.length < 5) {
      return NextResponse.json([]);
    }

    const suggestions = await propertyService.getSuggestions(query, 5);

    return NextResponse.json(suggestions);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch suggestions" },
      { status: 500 },
    );
  }
};
