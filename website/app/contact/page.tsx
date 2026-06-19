import { MessageCircle, Phone, Clock, Zap, Star, ShieldCheck, ChevronDown } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Support — Furniova",
  description: "Chat with us on WhatsApp or browse our FAQ. Our team is ready to help with product information, orders, and more.",
};

const faqs = [
  { q: "What is your delivery time?", a: "Standard shipping takes 3-5 business days. Express shipping delivers within 1-2 business days. For custom orders, please allow 2-4 weeks." },
  { q: "Can I return or exchange my furniture?", a: "Yes! We offer a 30-day return policy on all unused items in their original packaging. Custom orders may have different terms." },
  { q: "Do you offer assembly services?", a: "All our furniture comes with detailed assembly instructions and the necessary tools. We also offer professional assembly service for an additional fee." },
  { q: "What is your warranty policy?", a: "All Furniova products come with a 2-year manufacturer's warranty covering defects in materials and workmanship." },
  { q: "Can I track my order?", a: "Yes! Once your order ships, you'll receive a tracking number via email and WhatsApp. You can also contact us anytime for updates." },
  { q: "Do you offer bulk or business orders?", a: "Absolutely! We offer special pricing for bulk orders (10+ items) and have dedicated support for business clients. Contact us to discuss your needs." },
];

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>Need Help?</h1>
        <p className="text-base" style={{ color: "#555D5E" }}>Our team is ready to assist you. Chat with us on WhatsApp for the fastest response.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* WhatsApp Card */}
        <div className="relative rounded-3xl p-8 overflow-hidden" style={{ background: "linear-gradient(135deg, #F0F5EC 0%, #E8F0E0 100%)", border: "1px solid #E5E5E2" }}>
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20" style={{ background: "#6A8C40", transform: "translate(20%, -20%)" }} />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-10" style={{ background: "#6A8C40", transform: "translate(-20%, 20%)" }} />

          <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: "#25D366" }}>
            <MessageCircle className="w-9 h-9 text-white" fill="white" />
          </div>

          <h2 className="text-2xl font-bold mb-2 relative" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>Chat on WhatsApp</h2>
          <p className="text-sm mb-6 relative" style={{ color: "#555D5E" }}>Get instant help from our furniture experts. We typically reply within 5 minutes.</p>

          <div className="flex items-center gap-2 mb-4 relative">
            <Clock className="w-4 h-4" style={{ color: "#6A8C40" }} />
            <span className="text-sm" style={{ color: "#555D5E" }}>Mon–Sat: 8am – 8pm WIB</span>
          </div>

          <div className="flex items-center gap-2 mb-8 relative">
            <Phone className="w-4 h-4" style={{ color: "#6A8C40" }} />
            <span className="text-sm font-semibold" style={{ color: "#262A2E" }}>+62 857-8860-7416</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8 relative">
            {[{ icon: Zap, label: "Fast Response" }, { icon: Star, label: "Friendly Service" }, { icon: ShieldCheck, label: "Order Assistance" }].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1 p-3 rounded-xl text-center" style={{ background: "rgba(255,255,255,0.5)" }}>
                <item.icon className="w-4 h-4" style={{ color: "#6A8C40" }} />
                <span className="text-xs" style={{ color: "#555D5E" }}>{item.label}</span>
              </div>
            ))}
          </div>

          <a href="https://wa.me/6285788607416?text=Halo%20Furniova!%20Saya%20ingin%20bertanya%20tentang%20produk%20furniture.%20%F0%9F%9B%8B" target="_blank" rel="noopener noreferrer"
            className="relative w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90" style={{ background: "#25D366", color: "#FFFFFF" }}>
            <MessageCircle className="w-5 h-5" /> Chat on WhatsApp Now
          </a>
        </div>

        {/* WhatsApp Chat Preview */}
        <div className="rounded-3xl overflow-hidden" style={{ border: "1px solid #E5E5E2" }}>
          <div className="p-4 flex items-center gap-3" style={{ background: "#128C7E" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: "#25D366" }}>F</div>
            <div>
              <p className="text-sm font-semibold text-white">Furniova Store</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>Online ✓</p>
            </div>
          </div>

          <div className="p-4 space-y-3 min-h-64" style={{ background: "#ECE5DD" }}>
            <p className="text-center text-xs p-1.5 rounded-lg mx-auto w-fit px-3" style={{ background: "rgba(255,255,255,0.5)", color: "#555D5E" }}>Messages are end-to-end encrypted</p>

            <div className="flex justify-end">
              <div className="max-w-xs px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm" style={{ background: "#DCF8C6", color: "#262A2E" }}>
                <p>Hi! I want to ask about the Luna 3-Seater Sofa 🛋️</p>
                <p className="text-right text-xs mt-1" style={{ color: "#555D5E" }}>10:30 ✓✓</p>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="max-w-xs px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm" style={{ background: "#FFFFFF", color: "#262A2E" }}>
                <p className="font-semibold text-xs mb-1" style={{ color: "#128C7E" }}>Furniova Store</p>
                <p>Sure! Here is the detail information about the product.</p>
                <div className="mt-2 p-2 rounded-xl flex items-center gap-2" style={{ background: "#F0F5EC", border: "1px solid #E5E5E2" }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-lg" style={{ background: "#E8F0E0" }}>🛋️</div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "#262A2E" }}>Luna 3-Seater Sofa</p>
                    <p className="text-xs" style={{ color: "#6A8C40" }}>Sage Green</p>
                    <p className="text-xs font-bold" style={{ color: "#6A8C40" }}>$599.00</p>
                  </div>
                </div>
                <p className="text-right text-xs mt-1" style={{ color: "#555D5E" }}>10:31</p>
              </div>
            </div>
          </div>

          <div className="p-3 flex items-center gap-2" style={{ background: "#F0F0F0", borderTop: "1px solid #E5E5E2" }}>
            <div className="flex-1 px-4 py-2 rounded-full text-sm" style={{ background: "#FFFFFF", color: "#555D5E" }}>Type a message...</div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#128C7E" }}>
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group rounded-2xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}>
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none" style={{ color: "#262A2E" }}>
                <span className="text-sm font-semibold pr-4">{faq.q}</span>
                <ChevronDown className="w-4 h-4 flex-shrink-0 transition-transform group-open:rotate-180" style={{ color: "#6A8C40" }} />
              </summary>
              <div className="px-5 pb-5">
                <p className="text-sm leading-relaxed" style={{ color: "#555D5E" }}>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}