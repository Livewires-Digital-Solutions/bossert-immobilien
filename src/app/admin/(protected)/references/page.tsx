import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function AdminReferencesPage() {
  const references = await prisma.reference.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-display text-[var(--navy)] tracking-wide">References</h1>
        <Link
          href="/admin/references/new"
          className="bg-[var(--navy)] text-[var(--cream)] uppercase tracking-widest text-xs px-6 py-3 hover:bg-[var(--bronze)] transition-colors rounded-none"
        >
          Add Reference
        </Link>
      </div>

      <div className="bg-white shadow-xl border border-[var(--navy)]/5 rounded-none overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-white border-b border-[var(--navy)]/10">
            <tr>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.1em] text-[var(--navy)]/60 font-body">
                Title
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.1em] text-[var(--navy)]/60 font-body">
                Location
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.1em] text-[var(--navy)]/60 font-body">
                Year
              </th>
              <th className="px-6 py-4 text-right text-xs uppercase tracking-[0.1em] text-[var(--navy)]/60 font-body">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {references.map((r: any) => (
              <tr key={r.id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-[var(--navy)]/5">
                  <div className="text-sm font-medium text-[var(--navy)] font-display">
                    {r.titleEn}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--navy)]/80 font-body border-b border-[var(--navy)]/5">
                  {r.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--navy)]/80 font-body border-b border-[var(--navy)]/5">
                  {r.year}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border-b border-[var(--navy)]/5">
                  <Link
                    href={`/admin/references/${r.id}`}
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
