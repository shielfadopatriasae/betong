"use client";

import Link from "next/link";
import { CheckCircle, ShoppingBag, ArrowRight, Package, Mail } from "lucide-react";
import { generateOrderNumber } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function OrderSuccessPage() {
  const [orderNumber] = useState(generateOrderNumber);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const t = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Confetti-like dots animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-bounce"
              style={{
                background: ["#6A8C40", "#E8F0E0", "#F5A623", "#22C55E"][i % 4],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="rounded-3xl p-10 text-center" style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}>
        {/* Success Icon */}
        <div className="relative flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: "#E8F0E0" }}>
            <CheckCircle className="w-14 h-14" style={{ color: "#6A8C40" }} />
          </div>
          <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: "#6A8C40" }} />
        </div>

        <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>Thank You! 🎉</h1>
        <p className="text-sm mb-6" style={{ color: "#555D5E" }}>
          Your order has been placed successfully. We'll confirm your payment and start preparing your furniture right away.
        </p>

        {/* Order Number */}
        <div className="inline-block px-6 py-3 rounded-2xl mb-6" style={{ background: "#E8F0E0" }}>
          <p className="text-xs font-medium mb-1" style={{ color: "#5A7836" }}>Order Number</p>
          <p className="text-xl font-bold tracking-wider" style={{ fontFamily: "Poppins, sans-serif", color: "#6A8C40" }}>{orderNumber}</p>
        </div>

        {/* Order Steps */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { icon: CheckCircle, label: "Order Confirmed", status: "done" },
            { icon: Package, label: "Processing", status: "pending" },
            { icon: ShoppingBag, label: "Out for Delivery", status: "pending" },
          ].map((step) => (
            <div
              key={step.label}
              className="flex flex-col items-center gap-2 p-3 rounded-xl"
              style={{
                background: step.status === "done" ? "#E8F0E0" : "#FEFEFE",
                border: `1px solid ${step.status === "done" ? "#6A8C40" : "#E5E5E2"}`,
              }}
            >
              <step.icon className="w-6 h-6" style={{ color: step.status === "done" ? "#6A8C40" : "#555D5E" }} />
              <p className="text-xs font-medium text-center" style={{ color: step.status === "done" ? "#6A8C40" : "#555D5E" }}>{step.label}</p>
            </div>
          ))}
        </div>

        {/* Email notice */}
        <div className="flex items-center gap-2 justify-center p-3 rounded-xl mb-8" style={{ background: "#FEFEFE", border: "1px solid #E5E5E2" }}>
          <Mail className="w-4 h-4" style={{ color: "#6A8C40" }} />
          <p className="text-xs" style={{ color: "#555D5E" }}>Order details will be sent to your email and WhatsApp</p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Link href="/shop" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: "#6A8C40" }}>
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/contact" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all" style={{ border: "1px solid #E5E5E2", color: "#555D5E" }}>
            View My Order
          </Link>
        </div>
      </div>
    </div>
  );
}