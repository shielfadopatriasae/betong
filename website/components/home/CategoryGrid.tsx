"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}
          >
            Shop by Category
          </h2>
          <p className="text-sm mt-1" style={{ color: "#555D5E" }}>
            Find exactly what you need
          </p>
        </div>
        <Link
          href="/shop"
          className="flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all"
          style={{ color: "#6A8C40" }}
        >
          View All Categories
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/shop?category=${cat.name}`}
            className="group relative flex flex-row items-center justify-between rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md p-4"
            style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}
          >
            <div className="flex flex-col pl-1">
              <h3 className="text-sm font-bold mb-0.5" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>
                {cat.name}
              </h3>
              <p className="text-[11px] font-medium" style={{ color: "#555D5E" }}>
                {cat.count} Items
              </p>
            </div>
            <div className="relative w-14 h-14 transition-transform duration-300 group-hover:scale-105">
              <Image src={cat.image} alt={cat.name} fill className="object-contain" />
            </div>

            {/* Hover indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 opacity-0 group-hover:opacity-100" style={{ background: "#6A8C40" }} />
          </Link>
        ))}
      </div>
    </section>
  );
}