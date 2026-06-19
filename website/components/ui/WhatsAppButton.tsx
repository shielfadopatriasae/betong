"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="https://wa.me/6285788607416?text=Halo%20Furniova!%20Saya%20ingin%20bertanya%20tentang%20produk%20furniture.%20%F0%9F%9B%8B"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Chat on WhatsApp"
    >
      {hovered && (
        <span
          className="px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-lg whitespace-nowrap"
          style={{ background: "#25D366" }}
        >
          Chat with us!
        </span>
      )}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110"
        style={{ background: "#25D366" }}
      >
        <MessageCircle className="w-7 h-7 text-white" fill="white" />
      </div>
    </a>
  );
}