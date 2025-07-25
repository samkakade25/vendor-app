
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  const vendors = await prisma.vendor.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(vendors);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newVendor = await prisma.vendor.create({ data: body });
    return NextResponse.json(newVendor);
  } catch (error) {
    console.error("POST /api/vendors error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}


