import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const resolvedParams = await params;
    const slug = resolvedParams?.slug;

    if (!slug) {
      return NextResponse.json(
        { message: "Invalid or missing slug parameter" },
        { status: 400 },
      );
    }

    const event = await Event.findOne({
      slug: slug.toLowerCase(),
    }).lean();

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Event fetched successfully",
        event,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
