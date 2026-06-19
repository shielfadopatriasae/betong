"use client";

import Link from "next/link";
import Image from "next/image";
import { Leaf, Zap, Package, CreditCard } from "lucide-react";

export default function SustainableBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Main Sustainable Banner */}
      <div
        className="relative rounded-3xl overflow-hidden p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8 mb-8"
        style={{ background: "linear-gradient(135deg, #F0F5EC 0%, #E8F0E0 100%)" }}
      >
        <div className="flex-1">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: "#6A8C40", color: "#FFFFFF" }}
          >
            Our Promise
          </span>
          <h2
            className="text-3xl font-bold mb-3"
            style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}
          >
            Sustainable Design
          </h2>
          <p className="text-base mb-6 max-w-md" style={{ color: "#5A7836" }}>
            Better for your home, better for our planet. Every piece is crafted with
            sustainably sourced materials and eco-friendly processes.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "#6A8C40" }}
          >
            Learn More
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <div
            className="relative w-72 h-72 rounded-3xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.3)" }}
          >
            <Image
              src="/images/products/sideboard-mila.png"
              alt="Sustainable Furniture"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Decorative elements */}
        <div
          className="absolute top-6 right-6 opacity-20 text-6xl"
          style={{ color: "#6A8C40" }}
        >
          🌿
        </div>
      </div>

      {/* Trust Features Bar */}
      <div
        className="flex flex-wrap md:flex-nowrap justify-between items-center gap-6 rounded-2xl p-6 lg:px-12 mt-4"
        style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}
      >
        {[
          { icon: Leaf, title: "Eco-Friendly Materials", sub: "Sustainably sourced" },
          { icon: Zap, title: "Modern & Timeless", sub: "Designed to last" },
          { icon: Package, title: "Made to Order", sub: "Just for you" },
          { icon: CreditCard, title: "Secure Payment", sub: "100% safe checkout" },
        ].map((item) => (
          <div key={item.title} className="flex flex-1 items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "#E8F0E0" }}
            >
              <item.icon className="w-5 h-5" style={{ color: "#6A8C40" }} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[13px] font-bold mb-0.5" style={{ color: "#262A2E", fontFamily: "Poppins, sans-serif" }}>
                {item.title}
              </p>
              <p className="text-[11px] font-medium" style={{ color: "#555D5E" }}>
                {item.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}