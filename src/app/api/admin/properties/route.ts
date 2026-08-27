import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/admin/properties — list all
export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const properties = await prisma.property.findMany({
    include: { images: { orderBy: { order: "asc" } }, features: { orderBy: { order: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(properties);
}

// POST /api/admin/properties — create
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { images, features, ...data } = body;

  const property = await prisma.property.create({
    data: {
      ...data,
      images: images?.length
        ? { create: images.map((url: string, i: number) => ({ url, order: i })) }
        : undefined,
      features: features?.length
        ? {
            create: features.map((f: { textEn: string; textDe: string }, i: number) => ({
              textEn: f.textEn,
              textDe: f.textDe,
              order: i,
            })),
          }
        : undefined,
    },
    include: { images: true, features: true },
  });

  return NextResponse.json(property, { status: 201 });
}
