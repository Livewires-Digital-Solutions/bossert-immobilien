import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/admin/properties/[id]
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: { id: parseInt(id) },
    include: { images: { orderBy: { order: "asc" } }, features: { orderBy: { order: "asc" } } },
  });
  if (!property) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(property);
}

// PUT /api/admin/properties/[id]
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const { images, features, id: _id, createdAt, updatedAt, ...data } = body;
  const numId = parseInt(id);

  // Delete and recreate images & features
  await prisma.propertyImage.deleteMany({ where: { propertyId: numId } });
  await prisma.propertyFeature.deleteMany({ where: { propertyId: numId } });

  const property = await prisma.property.update({
    where: { id: numId },
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

  return NextResponse.json(property);
}

// DELETE /api/admin/properties/[id]
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  await prisma.property.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}
