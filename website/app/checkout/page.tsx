"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { formatPrice } from "@/lib/utils";
import { buildWhatsAppUrl, buildCartWhatsAppMessage } from "@/lib/whatsapp";
import { ArrowLeft, MessageCircle, ShoppingBag, Check } from "lucide-react";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const shipping = subtotal >= 200 ? 0 : 15;
  const tax = subtotal * 0.075;
  const total = subtotal + shipping + tax;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [sent, setSent] = useState(false);

  const waMessage = buildCartWhatsAppMessage(items, subtotal, total);
  const waUrl = buildWhatsAppUrl(waMessage);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendWhatsApp = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Mohon isi nama, nomor telepon, dan alamat");
      return;
    }

    const fullMessage = `Halo Furniova! 👋

Saya ingin memesan produk-produk berikut:

${items.map((item, i) => `${i + 1}. *${item.name}*\n   Warna: ${item.selectedColor} | Material: ${item.selectedMaterial} | Qty: ${item.quantity} | $${(item.price * item.quantity).toFixed(2)}`).join("\n\n")}

---
📦 *Subtotal:* $${subtotal.toFixed(2)}
🚚 *Ongkir:* ${shipping === 0 ? "GRATIS" : `$${shipping.toFixed(2)}`}
💰 *Total (est. tax):* $${total.toFixed(2)}

---
📋 *Data Pembeli:*
👤 Nama: ${form.name}
📧 Email: ${form.email || "-"}
📱 Telepon: ${form.phone}
📍 Alamat: ${form.address}
🏙️ Kota: ${form.city || "-"}
📝 Catatan: ${form.notes || "-"}

Mohon informasi untuk proses pemesanan, pengiriman, dan pembayaran via transfer. Terima kasih! 🙏`;

    const url = buildWhatsAppUrl(fullMessage);
    window.open(url, "_blank");
    setSent(true);
    clearCart();
  };

  if (items.length === 0 && !sent) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#E8F0E0" }}>
          <ShoppingBag className="w-12 h-12" style={{ color: "#6A8C40" }} />
        </div>
        <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>Keranjang Kosong</h1>
        <p className="text-sm mb-8" style={{ color: "#555D5E" }}>Tambahkan produk terlebih dahulu sebelum checkout.</p>
        <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "#6A8C40" }}>
          <ArrowLeft className="w-4 h-4" /> Kembali ke Shop
        </Link>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#E8F0E0" }}>
          <Check className="w-12 h-12" style={{ color: "#6A8C40" }} />
        </div>
        <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>Pesanan Terkirim! 🎉</h1>
        <p className="text-sm mb-8" style={{ color: "#555D5E" }}>
          Pesanan Anda telah dikirim via WhatsApp. Tim kami akan segera menghubungi Anda untuk konfirmasi pembayaran.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/shop" className="px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "#6A8C40" }}>
            Lanjut Belanja
          </Link>
          <a href="https://wa.me/6285788607416" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold" style={{ background: "#25D366", color: "#FFFFFF" }}>
            <MessageCircle className="w-4 h-4" /> Chat WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-medium mb-6" style={{ color: "#6A8C40" }}>
        <ArrowLeft className="w-4 h-4" /> Kembali ke Keranjang
      </Link>

      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>
        Checkout via WhatsApp
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div>
          <div className="rounded-2xl p-6 mb-6" style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}>
            <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>
              Data Pembeli
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Nama Lengkap *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Nomor Telepon *</label>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Alamat Lengkap *</label>
                <textarea name="address" value={form.address} onChange={handleChange} rows={3}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Kota</label>
                <input type="text" name="city" value={form.city} onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Catatan (opsional)</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} rows={2}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="rounded-2xl p-6 sticky top-20" style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}>
            <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>
              Ringkasan Pesanan
            </h2>

            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedColor}-${item.selectedMaterial}`} className="flex justify-between text-sm">
                  <span style={{ color: "#555D5E" }}>{item.name} x{item.quantity}</span>
                  <span className="font-medium" style={{ color: "#262A2E" }}>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 py-4" style={{ borderTop: "1px solid #E5E5E2" }}>
              <div className="flex justify-between text-sm" style={{ color: "#555D5E" }}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: "#555D5E" }}>
                <span>Ongkir</span>
                <span style={{ color: shipping === 0 ? "#22C55E" : "#555D5E" }}>{shipping === 0 ? "GRATIS" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: "#555D5E" }}>
                <span>Est. Tax (7.5%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2" style={{ borderTop: "1px solid #E5E5E2", color: "#262A2E" }}>
                <span>Total</span>
                <span style={{ color: "#6A8C40" }}>{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={handleSendWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white mt-4 transition-all hover:opacity-90"
              style={{ background: "#25D366" }}
            >
              <MessageCircle className="w-5 h-5" fill="white" /> Pesan via WhatsApp
            </button>

            <p className="text-xs text-center mt-3" style={{ color: "#555D5E" }}>
              Pesanan akan dikirim ke WhatsApp kami di <strong>0857-8860-7416</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}