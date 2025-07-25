import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const vendor = await prisma.vendor.findUnique({ where: { id: params.id } });
  return NextResponse.json(vendor);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.vendor.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true, message: "Vendor deleted successfully." });
}


export async function PUT(request: Request, { params }: { params: { id: string }}) {
    const data = await request.json();

    const updatedVendor = await prisma.vendor.update({
        where: { id: (params.id) },
        data,
    });

    return NextResponse.json(updatedVendor);
} 