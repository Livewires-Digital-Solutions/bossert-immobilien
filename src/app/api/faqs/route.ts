/**
 * GET /api/faqs — active FAQs, both languages, in editorial order.
 */
import { NextResponse } from 'next/server';
import { getActiveFaqs } from '@/lib/faqs';

export const dynamic = 'force-dynamic';

export async function GET() {
  const rows = await getActiveFaqs();
  const faqs = rows.map((f) => ({
    id: f.id,
    en: { question: f.questionEn, answer: f.answerEn },
    de: {
      question: f.questionDe || f.questionEn,
      answer: f.answerDe || f.answerEn,
    },
  }));
  return NextResponse.json({ faqs });
}
