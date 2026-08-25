import { redirect } from "next/navigation";

// The home page lives at /home
export default function RootPage() {
  redirect("/home");
}

