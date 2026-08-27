import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const members = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(members);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const member = await prisma.teamMember.create({ data: body });
  return NextResponse.json(member, { status: 201 });
}
