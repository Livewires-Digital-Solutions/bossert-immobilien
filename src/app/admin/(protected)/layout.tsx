import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "./SignOutButton";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  // We check for login route in the children, but middleware protects this route anyway.
  if (!session) {
    // Should be handled by middleware, but fallback here
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[var(--cream)] flex font-body">
      {/* Sidebar */}
      <aside className="w-64 bg-[var(--navy)] border-r border-[var(--navy)]/10 flex flex-col shadow-2xl">
        <div className="h-16 flex items-center justify-center px-6 border-b border-white/10">
          <span className="font-display text-xl text-[var(--cream)] tracking-widest uppercase">
            Bossert CMS
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavLink href="/admin">Dashboard</NavLink>
          <NavLink href="/admin/properties">Properties</NavLink>
          <NavLink href="/admin/blog">Blog</NavLink>
          <NavLink href="/admin/knowledge">Knowledge</NavLink>
          <NavLink href="/admin/references">References</NavLink>
          <NavLink href="/admin/team">Team</NavLink>
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="text-sm text-[var(--cream)]/60 mb-2 truncate font-body">
            {session.user?.email}
          </div>
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2.5 rounded text-sm font-medium text-[var(--cream)]/70 hover:bg-[var(--bronze)] hover:text-white transition-colors tracking-wide"
    >
      {children}
    </Link>
  );
}
