import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  const reference = await prisma.reference.findUnique({
    where: { id: parseInt(id) },
    include: { images: { orderBy: { order: "asc" } } },
  });
  if (!reference) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(reference);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const numId = parseInt(id);

  const body = await req.json();
  const { images, id: _id, createdAt, updatedAt, ...data } = body;

  await prisma.referenceImage.deleteMany({ where: { referenceId: numId } });

  const reference = await prisma.reference.update({
    where: { id: numId },
    data: {
      ...data,
      images: images?.length
        ? { create: images.map((url: string, i: number) => ({ url, order: i })) }
        : undefined,
    },
    include: { images: true },
  });

  return NextResponse.json(reference);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;

  await prisma.reference.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ success: true });
}
