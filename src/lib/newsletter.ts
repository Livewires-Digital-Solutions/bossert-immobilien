import 'server-only';
import { prisma } from '@/lib/prisma';
import type { newsletter_subscribers as NewsletterSubscriber } from '@prisma/client';

export type { NewsletterSubscriber };

/** Admin: every subscriber, newest first. */
export async function getAllSubscribers(): Promise<NewsletterSubscriber[]> {
  return prisma.newsletter_subscribers.findMany({
    orderBy: [{ subscribedAt: 'desc' }],
  });
}
