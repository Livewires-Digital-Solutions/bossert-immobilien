"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-body">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl font-normal text-[var(--navy)] tracking-widest uppercase font-display">
          Bossert CMS
        </h2>
        <p className="mt-2 text-center text-sm text-[var(--navy)]/60 tracking-widest uppercase">
          Sign in to your admin account
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-4 shadow-xl border border-[var(--navy)]/5 sm:rounded-none sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-[var(--navy)]/60">
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[var(--bronze)] sm:text-sm transition-colors text-[var(--navy)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-[var(--navy)]/60">
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-0 py-2 border-b border-[var(--navy)]/20 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[var(--bronze)] sm:text-sm transition-colors text-[var(--navy)]"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm uppercase tracking-widest text-[var(--cream)] bg-[var(--navy)] hover:bg-[var(--bronze)] focus:outline-none transition-colors disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
