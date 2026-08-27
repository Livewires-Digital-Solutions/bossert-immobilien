import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const propertiesCount = await prisma.property.count();
  const blogCount = await prisma.blogPost.count();
  const knowledgeCount = await prisma.knowledgeArticle.count();
  const referenceCount = await prisma.reference.count();
  const teamCount = await prisma.teamMember.count();

  const stats = [
    { name: "Properties", count: propertiesCount, href: "/admin/properties" },
    { name: "Blog Posts", count: blogCount, href: "/admin/blog" },
    { name: "Knowledge Articles", count: knowledgeCount, href: "/admin/knowledge" },
    { name: "References", count: referenceCount, href: "/admin/references" },
    { name: "Team Members", count: teamCount, href: "/admin/team" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-display text-[var(--navy)] mb-10 tracking-wide">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="block p-8 bg-white border border-[var(--navy)]/5 shadow-xl hover:shadow-2xl hover:border-[var(--bronze)]/50 transition-all group"
          >
            <h2 className="text-xs font-body text-[var(--navy)]/60 uppercase tracking-[0.1em]">
              {stat.name}
            </h2>
            <p className="mt-4 text-5xl font-display text-[var(--navy)] group-hover:text-[var(--bronze)] transition-colors">
              {stat.count}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
