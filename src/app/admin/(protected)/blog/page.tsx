import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-display text-[var(--navy)] tracking-wide">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="bg-[var(--navy)] text-[var(--cream)] uppercase tracking-widest text-xs px-6 py-3 hover:bg-[var(--bronze)] transition-colors rounded-none"
        >
          Add Post
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
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.1em] text-[var(--navy)]/60 font-body">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.1em] text-[var(--navy)]/60 font-body">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs uppercase tracking-[0.1em] text-[var(--navy)]/60 font-body">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {posts.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-[var(--navy)]/5">
                  <div className="text-sm font-medium text-[var(--navy)] font-display">
                    {p.titleEn}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--navy)]/80 font-body border-b border-[var(--navy)]/5">
                  {p.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--navy)]/80 font-body border-b border-[var(--navy)]/5">
                  {p.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-[var(--navy)]/5">
                  <span
                    className={`px-3 py-1 inline-flex text-xs uppercase tracking-widest rounded-none border ${
                      p.published
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-gray-50 text-[var(--navy)]/60 border-gray-200"
                    }`}
                  >
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium border-b border-[var(--navy)]/5">
                  <Link
                    href={`/admin/blog/${p.id}`}
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
