import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const articles = await prisma.knowledgeArticle.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const article = await prisma.knowledgeArticle.create({ data: body });
  return NextResponse.json(article, { status: 201 });
}
