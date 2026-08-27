import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-display text-[var(--navy)] tracking-wide">Team Members</h1>
        <Link
          href="/admin/team/new"
          className="bg-[var(--navy)] text-[var(--cream)] uppercase tracking-widest text-xs px-6 py-3 hover:bg-[var(--bronze)] transition-colors rounded-none"
        >
          Add Team Member
        </Link>
      </div>

      <div className="bg-white shadow-xl border border-[var(--navy)]/5 rounded-none overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-white border-b border-[var(--navy)]/10">
            <tr>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.1em] text-[var(--navy)]/60 font-body">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.1em] text-[var(--navy)]/60 font-body">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.1em] text-[var(--navy)]/60 font-body">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.1em] text-[var(--navy)]/60 font-body">
                Order
              </th>
              <th className="px-6 py-4 text-right text-xs uppercase tracking-[0.1em] text-[var(--navy)]/60 font-body">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {members.map((m) => (
              <tr key={m.id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-[var(--navy)]/5">
                  <div className="text-sm font-medium text-[var(--navy)] font-display">
                    {m.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--navy)]/80 font-body border-b border-[var(--navy)]/5">
                  {m.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--navy)]/80 font-body border-b border-[var(--navy)]/5">
                  {m.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--navy)]/80 font-body border-b border-[var(--navy)]/5">
                  {m.order}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border-b border-[var(--navy)]/5">
                  <Link
                    href={`/admin/team/${m.id}`}
                    className="text-[var(--bronze)] hover:text-[var(--navy)] uppercase tracking-wider text-xs font-body transition-colors"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
