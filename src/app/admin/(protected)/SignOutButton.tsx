"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="w-full text-left px-3 py-2 text-sm text-[var(--bronze)] hover:text-white transition-colors tracking-wide font-medium"
    >
      Sign out
    </button>
  );
}
