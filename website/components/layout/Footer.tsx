import Link from "next/link";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "Living Room", href: "/shop?category=Sofa" },
    { label: "Dining Room", href: "/shop?category=Table" },
    { label: "Bedroom", href: "/shop?category=Bedroom" },
    { label: "Storage", href: "/shop?category=Storage" },
    { label: "Decor", href: "/shop?category=Decor" },
  ],
  Company: [
    { label: "About Us", href: "/contact" },
    { label: "Sustainability", href: "/contact" },
    { label: "Careers", href: "/contact" },
    { label: "Press", href: "/contact" },
    { label: "Blog", href: "/contact" },
  ],
  Support: [
    { label: "FAQ", href: "/contact" },
    { label: "Shipping Info", href: "/contact" },
    { label: "Returns", href: "/contact" },
    { label: "Track Order", href: "/contact" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "#262A2E", color: "#FFFFFF", fontFamily: "Inter, sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "#6A8C40" }}
              >
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
                Furniova
              </span>
            </Link>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: "#94A3B8" }}>
              Modern furniture with timeless design, made for everyday living. We craft spaces
              that inspire and endure.
            </p>
            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm" style={{ color: "#94A3B8" }}>
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: "#6A8C40" }} />
                +62 857-8860-7416
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: "#94A3B8" }}>
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: "#6A8C40" }} />
                hello@furniova.com
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: "#94A3B8" }}>
                <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: "#6A8C40" }} />
                Jakarta, Indonesia
              </div>
            </div>
            {/* Social */}
            <div className="flex items-center gap-3">
              {["IG", "FB", "X", "YT"].map((label, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:opacity-80 text-xs font-bold"
                  style={{ background: "#374151", color: "#6A8C40" }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                className="font-semibold mb-4"
                style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
              >
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: "#94A3B8" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="rounded-2xl p-6 mb-12"
          style={{ background: "#374151" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3
                className="text-lg font-semibold mb-1"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Subscribe to our newsletter
              </h3>
              <p className="text-sm" style={{ color: "#94A3B8" }}>
                Get 10% off your first order + exclusive deals and design inspiration.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{
                  background: "#4B5563",
                  color: "#FFFFFF",
                  border: "1px solid #6B7280",
                  fontFamily: "Inter, sans-serif",
                }}
              />
              <button
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:opacity-90 flex-shrink-0"
                style={{ background: "#6A8C40", fontFamily: "Inter, sans-serif" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid #374151" }}
        >
          <p className="text-sm" style={{ color: "#6B7280" }}>
            © 2024 Furniova. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm transition-colors hover:text-white"
                style={{ color: "#6B7280" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}