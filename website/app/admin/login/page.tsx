"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Leaf, Lock, AlertCircle } from "lucide-react";
import { login, getConfig } from "@/lib/admin";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const config = getConfig();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (login(password)) {
        router.push("/admin");
      } else {
        setError("Password salah. Silakan coba lagi.");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#FEFEFE" }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#6A8C40" }}>
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>
              Furniova
            </span>
          </div>
          <h1 className="text-xl font-bold mb-1" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>
            Admin Login
          </h1>
          <p className="text-sm" style={{ color: "#555D5E" }}>
            Masukkan password untuk mengakses dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="rounded-2xl p-8" style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#555D5E" }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password admin"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: "1px solid #E5E5E2", color: "#262A2E", fontFamily: "Inter, sans-serif" }}
                  autoFocus
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: "#FEE2E2", color: "#E25C5C" }}>
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50"
              style={{ background: "#6A8C40" }}
            >
              {loading ? "Memverifikasi..." : "Masuk"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "#555D5E" }}>
          Password default: <code className="px-1.5 py-0.5 rounded" style={{ background: "#E8F0E0", color: "#5A7836" }}>furniova123</code>
        </p>
      </div>
    </div>
  );
}