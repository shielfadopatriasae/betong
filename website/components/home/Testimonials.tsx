"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h2
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}
        >
          What Our Customers Say
        </h2>
        <p className="text-sm" style={{ color: "#555D5E" }}>
          Real reviews from real customers
        </p>
      </div>

      {/* Testimonial Cards Grid (desktop) */}
      <div className="hidden md:grid grid-cols-3 gap-6 mb-8">
        {testimonials.map((t, i) => (
          <div
            key={t.id}
            className={`relative p-6 rounded-2xl transition-all duration-300 ${
              i === current ? "shadow-lg scale-105" : "opacity-80"
            }`}
            style={{
              background: i === current ? "#6A8C40" : "#FFFFFF",
              border: `1px solid ${i === current ? "#6A8C40" : "#E5E5E2"}`,
            }}
          >
            <Quote
              className="w-8 h-8 mb-3 opacity-30"
              style={{ color: i === current ? "#FFFFFF" : "#6A8C40" }}
            />
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: i === current ? "#FFFFFF" : "#555D5E" }}
            >
              &ldquo;{t.comment}&rdquo;
            </p>
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star
                  key={j}
                  className="w-3.5 h-3.5"
                  style={{ color: i === current ? "#FFD700" : "#F5A623" }}
                  fill={i === current ? "#FFD700" : "#F5A623"}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                style={{
                  background: i === current ? "rgba(255,255,255,0.2)" : "#E8F0E0",
                  color: i === current ? "#FFFFFF" : "#6A8C40",
                }}
              >
                {t.avatar}
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: i === current ? "#FFFFFF" : "#262A2E" }}
                >
                  {t.name}
                </p>
                <p
                  className="text-xs"
                  style={{ color: i === current ? "rgba(255,255,255,0.7)" : "#555D5E" }}
                >
                  {t.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Single Card */}
      <div className="md:hidden mb-6">
        <div
          className="p-6 rounded-2xl"
          style={{ background: "#6A8C40" }}
        >
          <Quote className="w-8 h-8 mb-3 text-white opacity-40" />
          <p className="text-sm leading-relaxed mb-4 text-white">
            &ldquo;{testimonials[current].comment}&rdquo;
          </p>
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: testimonials[current].rating }).map((_, j) => (
              <Star key={j} className="w-3.5 h-3.5" style={{ color: "#FFD700" }} fill="#FFD700" />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              {testimonials[current].avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{testimonials[current].name}</p>
              <p className="text-xs text-white opacity-70">{testimonials[current].location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border flex items-center justify-center transition-all"
          style={{ borderColor: "#E5E5E2" }}
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" style={{ color: "#555D5E" }} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                background: i === current ? "#6A8C40" : "#E8F0E0",
              }}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-10 h-10 rounded-full border flex items-center justify-center transition-all"
          style={{ borderColor: "#E5E5E2" }}
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" style={{ color: "#555D5E" }} />
        </button>
      </div>
    </section>
  );
}