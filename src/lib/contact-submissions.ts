import 'server-only';
import { prisma } from '@/lib/prisma';

const db = prisma as any;

export type ContactStatus = 'NEW' | 'READ' | 'RESPONDED';
export const CONTACT_STATUSES: ContactStatus[] = ['NEW', 'READ', 'RESPONDED'];

export interface ContactSubmission {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  inquiryType: string | null;
  message: string;
  source: string;
  heardAbout: string | null;
  status: ContactStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactCounts {
  total: number;
  new: number;
  read: number;
  responded: number;
}

export async function getContactCounts(): Promise<ContactCounts> {
  const [total, newC, read, responded] = await Promise.all([
    db.contact_submissions.count(),
    db.contact_submissions.count({ where: { status: 'NEW' } }),
    db.contact_submissions.count({ where: { status: 'READ' } }),
    db.contact_submissions.count({ where: { status: 'RESPONDED' } }),
  ]);
  return { total, new: newC, read, responded };
}

export async function listContactSubmissions(opts: {
  status?: ContactStatus | 'ALL';
  q?: string;
} = {}): Promise<ContactSubmission[]> {
  const where: Record<string, unknown> = {};
  if (opts.status && opts.status !== 'ALL') where.status = opts.status;

  const q = opts.q?.trim();
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { email: { contains: q } },
      { phone: { contains: q } },
      { message: { contains: q } },
    ];
  }

  return db.contact_submissions.findMany({
    where,
    orderBy: [{ createdAt: 'desc' }],
    take: 300,
  });
}

export async function getContactSubmission(id: string): Promise<ContactSubmission | null> {
  return db.contact_submissions.findUnique({ where: { id } });
}
