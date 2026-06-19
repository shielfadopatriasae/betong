"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { generateOrderNumber } from "@/lib/utils";

const orderNumber = generateOrderNumber();

export default function PaymentPage() {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    const message = `Halo Furniova! 👋

Saya sudah melakukan transfer untuk pesanan:

📋 *Order Number:* ${orderNumber}
💰 *Total:* $1,013.04

Mohon konfirmasi pembayaran saya. Terima kasih! 🙏`;

    const waUrl = `https://wa.me/6285788607416?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#E8F0E0" }}>
          <CheckCircle className="w-12 h-12" style={{ color: "#6A8C40" }} />
        </div>
        <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>Konfirmasi Terkirim! ✅</h1>
        <p className="text-sm mb-8" style={{ color: "#555D5E" }}>
          Konfirmasi pembayaran Anda telah dikirim via WhatsApp. Tim kami akan segera memverifikasi pembayaran Anda.
        </p>
        <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "#6A8C40" }}>
          Kembali ke Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/checkout" className="inline-flex items-center gap-2 text-sm font-medium mb-6" style={{ color: "#6A8C40" }}>
        <ArrowLeft className="w-4 h-4" /> Kembali ke Checkout
      </Link>

      <div className="rounded-3xl p-8" style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}>
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>Konfirmasi Pembayaran</h1>
        <p className="text-sm mb-8" style={{ color: "#555D5E" }}>Setelah transfer, klik tombol di bawah untuk konfirmasi via WhatsApp.</p>

        {/* Order Info */}
        <div className="rounded-2xl p-5 mb-6" style={{ background: "#F0F5EC", border: "1px solid #E5E5E2" }}>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#555D5E" }}>Order Number</p>
              <p className="font-semibold" style={{ color: "#6A8C40" }}>{orderNumber}</p>
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#555D5E" }}>Total Amount</p>
              <p className="font-semibold" style={{ color: "#6A8C40" }}>$1,013.04</p>
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#555D5E" }}>Bank</p>
              <p className="font-semibold" style={{ color: "#262A2E" }}>BCA (Bank Central Asia)</p>
            </div>
            <div>
              <p className="text-xs mb-0.5" style={{ color: "#555D5E" }}>Account Number</p>
              <p className="font-semibold" style={{ color: "#262A2E" }}>1234 5678 9012</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs mb-0.5" style={{ color: "#555D5E" }}>Account Name</p>
              <p className="font-semibold" style={{ color: "#262A2E" }}>Furniova Furniture Store</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-4 rounded-xl mb-6 text-sm" style={{ background: "#E8F0E0", color: "#5A7836" }}>
          <p className="font-semibold mb-1">📌 Cara Konfirmasi:</p>
          <ul className="space-y-1 text-xs">
            <li>1. Transfer sesuai total amount ke rekening di atas</li>
            <li>2. Simpan bukti transfer</li>
            <li>3. Klik tombol "Konfirmasi via WhatsApp" di bawah</li>
            <li>4. Kirim bukti transfer ke WhatsApp kami</li>
          </ul>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "#25D366" }}
        >
          <MessageCircle className="w-5 h-5" fill="white" /> Konfirmasi via WhatsApp
        </button>

        <p className="text-xs text-center mt-3" style={{ color: "#555D5E" }}>
          Konfirmasi akan dikirim ke WhatsApp <strong>0857-8860-7416</strong>
        </p>
      </div>
    </div>
  );
}