"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, Shield, Headphones, Plus, Leaf, Armchair } from "lucide-react";

const slides = [
  {
    badge: "New Collection",
    badgeIcon: "🌿",
    headline: "Comfort That",
    highlight: "Completes Your Home",
    highlightWord: "Home",
    sub: "Discover modern furniture with timeless design made for everyday living.",
    image: "/images/products/sofa-luna.png",
    product: { name: "Luna 3-Seater Sofa", price: "$599.00", href: "/shop/luna-3-seater-sofa" },
  },
  {
    badge: "Best Seller",
    badgeIcon: "⭐",
    headline: "Crafted for",
    highlight: "Modern Living",
    highlightWord: "Modern Living",
    sub: "Premium materials and expert craftsmanship in every piece we create.",
    image: "/images/products/chair-elio.png",
    product: { name: "Elio Lounge Chair", price: "$249.00", href: "/shop/elio-lounge-chair" },
  },
  {
    badge: "Featured",
    badgeIcon: "✨",
    headline: "Sleep in Style,",
    highlight: "Wake Refreshed",
    highlightWord: "Wake Refreshed",
    sub: "Our bedroom collection is designed to create your perfect sanctuary.",
    image: "/images/products/bed-ava.png",
    product: { name: "Ava Platform Bed", price: "$549.00", href: "/shop/ava-platform-bed" },
  },
];

const trustBadges = [
  { icon: Truck, title: "Free Shipping", sub: "For orders over $200" },
  { icon: Shield, title: "2 Years Warranty", sub: "Quality Guaranteed" },
  { icon: Headphones, title: "24/7 Support", sub: "We're here to help" },
];

const sideFeatures = [
  { icon: Leaf, label: "Sustainable", sub: "Eco-friendly materials" },
  { icon: Armchair, label: "Design", sub: "Modern & Timeless" },
  { icon: Shield, label: "Quality", sub: "Made to last" },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setAnimating(false);
      }, 300);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative w-full overflow-hidden" style={{ background: "#FEFEFE" }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 min-h-[600px]">
        
        {/* Left Content Area — 40% */}
        <div className={`lg:w-[40%] z-10 w-full transition-all duration-300 ${
          animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ background: "#E8F0E0", border: "1px solid #E8F0E0" }}
          >
            <span className="text-sm">{slide.badgeIcon}</span>
            <span className="text-xs font-semibold" style={{ color: "#5A7836" }}>{slide.badge}</span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl lg:text-[48px] font-bold mb-6 leading-[1.1]"
            style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}
          >
            {slide.headline}{" "}
            <span style={{ color: "#6A8C40" }}>{slide.highlightWord}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base mb-10 max-w-md leading-relaxed" style={{ color: "#555D5E" }}>
            {slide.sub}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4 flex-wrap mb-12">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:gap-3"
              style={{ background: "#6A8C40" }}
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold border transition-all duration-200 hover:border-[#6A8C40]"
              style={{ color: "#262A2E", borderColor: "#E5E5E2", background: "#FFFFFF" }}
            >
              Explore Collection
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "#E8F0E0" }}
                >
                  <badge.icon className="w-5 h-5" style={{ color: "#6A8C40" }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-bold mb-0.5" style={{ color: "#262A2E" }}>{badge.title}</p>
                  <p className="text-[11px]" style={{ color: "#555D5E" }}>{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image Area — 60% */}
        <div className={`lg:w-[60%] relative w-full h-[400px] lg:h-[600px] flex justify-center items-center transition-all duration-300 ${
          animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}>
          {/* Large Arched Background Shape */}
          <div
            className="absolute top-0 right-[-5%] w-[110%] h-[110%] z-0 overflow-hidden"
            style={{
              background: "#E8F0E0",
              borderRadius: "200px 0 0 120px",
            }}
          />

          {/* The Product Image */}
          <div className="relative z-10 w-full h-full flex items-center justify-center pt-10">
            <Image
              src={slide.image}
              alt={slide.product.name}
              width={650}
              height={450}
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Floating Product Card */}
          <Link
            href={slide.product.href}
            className="absolute bottom-10 right-4 lg:right-10 flex items-center gap-4 px-4 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 z-20 w-[240px]"
            style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", border: "1px solid #E5E5E2" }}
          >
            <div
              className="w-12 h-12 rounded-xl overflow-hidden relative flex-shrink-0"
              style={{ background: "#F0F5EC" }}
            >
              <Image src={slide.image} alt={slide.product.name} fill className="object-contain p-1" />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-bold line-clamp-1" style={{ color: "#262A2E" }}>{slide.product.name}</p>
              <p className="text-[13px] font-bold" style={{ color: "#6A8C40" }}>{slide.product.price}</p>
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white"
              style={{ background: "#6A8C40" }}
            >
              <Plus className="w-5 h-5" strokeWidth={2} />
            </div>
          </Link>

          {/* Slide Dots */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? "24px" : "8px",
                  height: "8px",
                  background: i === current ? "#6A8C40" : "#C8D9CA",
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right side vertical feature strip */}
        <div
          className="hidden xl:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col gap-6 w-24 py-8 rounded-l-3xl z-30"
          style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", border: "1px solid #E5E5E2", borderRight: "none" }}
        >
          {sideFeatures.map((v) => (
            <div key={v.label} className="flex flex-col items-center text-center px-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                style={{ background: "#E8F0E0" }}
              >
                <v.icon className="w-5 h-5" style={{ color: "#6A8C40" }} strokeWidth={1.5} />
              </div>
              <p className="text-[11px] font-bold leading-tight mb-0.5" style={{ color: "#262A2E" }}>{v.label}</p>
              <p className="text-[9px] leading-tight" style={{ color: "#555D5E" }}>{v.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}