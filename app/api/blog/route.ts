import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise });

    const url = new URL(request.url);
    const limit = url.searchParams.get("limit");
    const slug = url.searchParams.get("slug");

    let whereClause: any = {};

    if (slug) {
      whereClause.slug = {
        equals: slug,
      };
    }

    const blogs = await payload.find({
      collection: "blog",
      limit: limit ? parseInt(limit) : undefined,
      where: whereClause,
    });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
