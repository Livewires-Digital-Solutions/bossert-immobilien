import 'server-only';
import { prisma } from '@/lib/prisma';
import type { team_members as TeamMember } from '@prisma/client';

export type { TeamMember };

/** Public: active team members, in editorial order. */
export async function getActiveTeamMembers(): Promise<TeamMember[]> {
  return prisma.team_members.findMany({
    where: { isActive: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });
}

/** Admin: every team member regardless of active state. */
export async function getAllTeamMembers(): Promise<TeamMember[]> {
  return prisma.team_members.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  return prisma.team_members.findUnique({ where: { id } });
}
