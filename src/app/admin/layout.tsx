import { ReactNode } from "react";
import "../globals.css";

export const metadata = {
  title: "Admin CMS — Bossert Immobilien",
  description: "Content Management System",
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
