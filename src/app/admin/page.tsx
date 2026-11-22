"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Mountain } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pine-forest flex items-center justify-center p-4"
      style={{
        backgroundImage: "radial-gradient(ellipse at top, #1B3B30 0%, #0F241D 60%)"
      }}
    >
      {/* Decorative pine trees */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 text-6xl"
            style={{ left: `${i * 14}%`, fontSize: `${3 + (i % 3)}rem` }}
          >
            🌲
          </div>
        ))}
      </div>

      <div className="relative bg-warm-sand rounded-3xl p-8 max-w-md w-full shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-pine-forest rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Mountain className="w-8 h-8 text-terracotta" />
          </div>
          <h1 className="font-fraunces text-2xl font-bold text-pine-forest">Admin Panel</h1>
          <p className="text-moss-slate/60 text-sm mt-1">Fairy Meadows Project</p>
          <p className="text-moss-slate/40 text-xs">Multi Stars · M&amp;E Corporation</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-pine-forest mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pine-forest/40" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-pine-forest/20 rounded-xl pl-10 pr-4 py-3 text-pine-forest bg-white/60 focus:outline-none focus:ring-2 focus:ring-pine-forest/30 text-sm"
                placeholder="admin"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-pine-forest mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pine-forest/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-pine-forest/20 rounded-xl pl-10 pr-4 py-3 text-pine-forest bg-white/60 focus:outline-none focus:ring-2 focus:ring-pine-forest/30 text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pine-forest hover:bg-moss-slate text-warm-sand py-3.5 rounded-xl font-semibold transition-all disabled:opacity-60 mt-2 text-sm active:scale-95"
          >
            {loading ? "Signing in..." : "Sign In to Dashboard"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-xs text-moss-slate/40 hover:text-terracotta transition-colors">
            ← Back to Fairy Meadows Project Site
          </a>
        </div>
      </div>
    </div>
  );
}
