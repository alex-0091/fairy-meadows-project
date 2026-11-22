import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const flats = await prisma.flat.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(flats);
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status, ...rest } = await req.json();
    const updated = await prisma.flat.update({
      where: { id },
      data: { status, ...rest },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
