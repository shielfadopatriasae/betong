"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingCart, Settings, Menu, X, Leaf, LogOut
} from "lucide-react";
import { isLoggedIn, logout } from "@/lib/admin";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/admin/login");
    } else {
      setAuthenticated(true);
    }
    setLoading(false);
  }, [pathname, router]);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FEFEFE" }}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ borderColor: "#6A8C40", borderTopColor: "transparent" }} />
          <p className="text-sm" style={{ color: "#555D5E" }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen flex" style={{ background: "#FEFEFE" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "#262A2E" }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6" style={{ borderBottom: "1px solid #374151" }}>
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#6A8C40" }}>
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>Furniova</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: isActive ? "#6A8C40" : "transparent",
                  color: isActive ? "#FFFFFF" : "#94A3B8",
                }}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-4 py-4" style={{ borderTop: "1px solid #374151" }}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all w-full"
            style={{ color: "#94A3B8" }}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-6 sticky top-0 z-30" style={{ background: "#FFFFFF", borderBottom: "1px solid #E5E5E2" }}>
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden" style={{ color: "#262A2E" }}>
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm font-medium px-4 py-2 rounded-lg transition-all" style={{ background: "#6A8C40", color: "#FFFFFF" }}>
              View Store
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}