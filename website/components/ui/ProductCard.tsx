"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Product } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { buildWhatsAppUrl, buildProductWhatsAppMessage } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);

  const waUrl = buildWhatsAppUrl(
    buildProductWhatsAppMessage({
      name: product.name,
      price: product.price,
      color: "Sage Green",
      material: product.materials[0],
      quantity: 1,
      slug: product.slug,
    })
  );

  return (
    <div className={`group block relative ${className}`}>
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg relative"
        style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}
      >
        <Link href={`/shop/${product.slug}`} className="absolute inset-0 z-0" aria-label={product.name} />

        <div className="relative overflow-hidden" style={{ aspectRatio: "1/1", background: "#F0F5EC" }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />

          {product.badge && (
            <div
              className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white z-10"
              style={{ background: "#6A8C40" }}
            >
              {product.badge}
            </div>
          )}

          <button
            onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
            className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10 relative"
            style={{
              background: wishlisted ? "#6A8C40" : "rgba(255,255,255,0.9)",
              backdropFilter: "blur(4px)",
            }}
            aria-label="Add to wishlist"
          >
            <Heart
              className="w-4 h-4"
              style={{ color: wishlisted ? "#FFFFFF" : "#555D5E" }}
              fill={wishlisted ? "#FFFFFF" : "none"}
            />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10 relative">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 relative z-20"
              style={{ background: "#25D366" }}
            >
              <MessageCircle className="w-4 h-4" fill="white" />
              Pesan via WhatsApp
            </a>
          </div>
        </div>

        <div className="p-4 relative pointer-events-none">
          <h3
            className="font-semibold text-sm mb-2 line-clamp-1"
            style={{ color: "#262A2E", fontFamily: "Poppins, sans-serif" }}
          >
            {product.name}
          </h3>

          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1.5">
              <span
                className="font-bold text-sm"
                style={{ color: "#6A8C40", fontFamily: "Poppins, sans-serif" }}
              >
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs line-through font-medium" style={{ color: "#555D5E" }}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5" style={{ color: "#F5A623" }} fill="#F5A623" />
              <span className="text-xs font-semibold" style={{ color: "#262A2E" }}>
                {product.rating}
              </span>
              <span className="text-xs" style={{ color: "#555D5E" }}>
                ({product.reviews})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}