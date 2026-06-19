"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { formatPrice } from "@/lib/utils";
import { buildWhatsAppUrl, buildCartWhatsAppMessage } from "@/lib/whatsapp";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/lib/data";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();
  const shipping = subtotal >= 200 ? 0 : 15;
  const tax = subtotal * 0.075;
  const total = subtotal + shipping + tax;

  const waUrl = buildWhatsAppUrl(buildCartWhatsAppMessage(items, subtotal, total));
  const suggested = products.filter((p) => !items.find((i) => i.id === p.id)).slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#E8F0E0" }}>
          <ShoppingBag className="w-12 h-12" style={{ color: "#6A8C40" }} />
        </div>
        <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>Your Cart is Empty</h1>
        <p className="text-sm mb-8" style={{ color: "#555D5E" }}>Discover our beautiful furniture collection and find your perfect piece.</p>
        <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "#6A8C40" }}>
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>Your Cart ({items.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={`${item.id}-${item.selectedColor}-${item.selectedMaterial}`} className="flex gap-4 p-4 rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}>
              <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0" style={{ background: "#F0F5EC" }}>
                <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-medium mb-0.5" style={{ color: "#6A8C40" }}>{item.category}</p>
                    <h3 className="font-semibold text-sm" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>{item.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs" style={{ color: "#555D5E" }}>Material: {item.selectedMaterial}</span>
                      <span className="w-4 h-4 rounded-full border inline-block" style={{ background: item.selectedColor, borderColor: "#E5E5E2" }} />
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedMaterial)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-50 transition-all">
                    <Trash2 className="w-4 h-4" style={{ color: "#E25C5C" }} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 rounded-xl" style={{ border: "1px solid #E5E5E2" }}>
                    <button onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedMaterial, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center"><Minus className="w-3 h-3" style={{ color: "#555D5E" }} /></button>
                    <span className="w-8 text-center text-sm font-semibold" style={{ color: "#262A2E" }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedMaterial, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center"><Plus className="w-3 h-3" style={{ color: "#555D5E" }} /></button>
                  </div>
                  <span className="font-bold" style={{ color: "#6A8C40", fontFamily: "Poppins, sans-serif" }}>{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Coupon Code */}
          <div className="p-4 rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}>
            <p className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: "#262A2E" }}>
              <Tag className="w-4 h-4" style={{ color: "#6A8C40" }} /> Have a coupon?
            </p>
            <div className="flex gap-2">
              <input type="text" placeholder="Enter coupon code" className="flex-1 px-4 py-2 text-sm rounded-xl outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E", fontFamily: "Inter, sans-serif" }} />
              <button className="px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: "#6A8C40" }}>Apply</button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="rounded-2xl p-6 sticky top-20" style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}>
            <h2 className="text-lg font-bold mb-5" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>Order Summary</h2>
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm" style={{ color: "#555D5E" }}><span>Subtotal</span><span style={{ color: "#262A2E" }}>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between text-sm" style={{ color: "#555D5E" }}><span>Shipping</span><span style={{ color: shipping === 0 ? "#22C55E" : "#262A2E" }}>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
              <div className="flex justify-between text-sm" style={{ color: "#555D5E" }}><span>Tax (7.5%)</span><span style={{ color: "#262A2E" }}>{formatPrice(tax)}</span></div>
              <div className="flex justify-between font-bold text-base pt-3" style={{ borderTop: "1px solid #E5E5E2", color: "#262A2E" }}><span>Total</span><span style={{ color: "#6A8C40", fontFamily: "Poppins, sans-serif" }}>{formatPrice(total)}</span></div>
            </div>
            {shipping > 0 && (
              <div className="text-xs p-3 rounded-xl mb-4" style={{ background: "#E8F0E0", color: "#5A7836" }}>Tambah {formatPrice(200 - subtotal)} lagi untuk GRATIS ongkir!</div>
            )}
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 mb-3" style={{ background: "#25D366" }}>
              <MessageCircle className="w-5 h-5" fill="white" /> Checkout via WhatsApp
            </a>
            <Link href="/shop" className="w-full flex items-center justify-center py-3 rounded-xl text-sm font-medium transition-all" style={{ border: "1px solid #E5E5E2", color: "#555D5E" }}>Continue Shopping</Link>
            <div className="mt-5 pt-4" style={{ borderTop: "1px solid #E5E5E2" }}>
              <p className="text-xs text-center mb-2" style={{ color: "#555D5E" }}>We accept</p>
              <div className="flex justify-center gap-2 flex-wrap">
                {["VISA", "MC", "PayPal", "QRIS"].map((m) => (<span key={m} className="px-2 py-1 rounded text-xs font-bold" style={{ border: "1px solid #E5E5E2", color: "#555D5E" }}>{m}</span>))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      {suggested.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {suggested.map((p) => (<ProductCard key={p.id} product={p} />))}
          </div>
        </div>
      )}
    </div>
  );
}