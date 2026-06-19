"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { Search, User, Heart, ShoppingBag, Menu, X, Leaf } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=All", label: "Categories" },
  { href: "/shop?sort=new", label: "Collections" },
  { href: "/contact", label: "About Us" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [active, setActive] = useState("/");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActive(window.location.pathname);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
        }`}
        style={{ borderBottom: "1px solid #E5E5E2" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "#6A8C40" }}
              >
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}
              >
                Furniova
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = active === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-[15px] font-medium rounded-full transition-all duration-200 ${
                      isActive ? "text-[#6A8C40]" : "text-[#262A2E] hover:text-[#6A8C40]"
                    }`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-full" style={{ background: "#E8F0E0" }} />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-5">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="transition-colors duration-200 text-[#262A2E] hover:text-[#6A8C40]"
                aria-label="Search"
              >
                <Search className="w-[22px] h-[22px] stroke-[1.5]" />
              </button>
              <button
                className="transition-colors duration-200 text-[#262A2E] hover:text-[#6A8C40]"
                aria-label="Account"
              >
                <User className="w-[22px] h-[22px] stroke-[1.5]" />
              </button>
              <button
                className="relative transition-colors duration-200 text-[#262A2E] hover:text-[#6A8C40]"
                aria-label="Wishlist"
              >
                <Heart className="w-[22px] h-[22px] stroke-[1.5]" />
                <span
                  className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white"
                  style={{ background: "#6A8C40" }}
                >
                  2
                </span>
              </button>
              <Link href="/cart" className="relative transition-colors duration-200 text-[#262A2E] hover:text-[#6A8C40]" aria-label="Cart">
                <ShoppingBag className="w-[22px] h-[22px] stroke-[1.5]" />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white"
                    style={{ background: "#6A8C40" }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile: Cart + Hamburger */}
            <div className="flex md:hidden items-center gap-4">
              <Link href="/cart" className="relative transition-colors duration-200 text-[#262A2E]" aria-label="Cart">
                <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white"
                    style={{ background: "#6A8C40" }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-9 h-9 flex items-center justify-center"
                aria-label="Menu"
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" style={{ color: "#262A2E" }} />
                ) : (
                  <Menu className="w-6 h-6" style={{ color: "#262A2E" }} />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="pb-3 pt-1 border-t" style={{ borderColor: "#E5E5E2" }}>
              <form onSubmit={handleSearch} className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: "#6A8C40" }}
                />
                <input
                  type="text"
                  placeholder="Search furniture..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm border outline-none transition-all"
                  style={{
                    border: "2px solid #E8F0E0",
                    background: "#FEFEFE",
                    color: "#262A2E",
                    fontFamily: "Inter, sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6A8C40")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8F0E0")}
                  autoFocus
                />
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t" style={{ borderColor: "#E5E5E2" }}>
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    color: "#262A2E",
                    fontFamily: "Inter, sans-serif",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}