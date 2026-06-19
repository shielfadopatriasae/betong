"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";

export default function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}
          >
            Featured Products
          </h2>
          <p className="text-sm mt-1" style={{ color: "#555D5E" }}>
            Handpicked pieces for modern homes
          </p>
        </div>
        <Link
          href="/shop"
          className="flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all"
          style={{ color: "#6A8C40" }}
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.slice(2, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}