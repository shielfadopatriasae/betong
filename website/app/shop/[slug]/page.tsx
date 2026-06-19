"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star, Heart, MessageCircle, Truck, Shield, Headphones,
  ChevronRight, ChevronDown, ChevronUp, Minus, Plus, Share2, ShoppingCart
} from "lucide-react";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { buildWhatsAppUrl, buildProductWhatsAppMessage } from "@/lib/whatsapp";
import { useCart } from "@/lib/CartContext";
import ProductCard from "@/components/ui/ProductCard";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const { addToCart, totalItems } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials[0]);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("details");
  const [addedToCart, setAddedToCart] = useState(false);

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const waUrl = buildWhatsAppUrl(
    buildProductWhatsAppMessage({
      name: product.name, price: product.price, color: selectedColor,
      material: selectedMaterial, quantity, slug: product.slug,
    })
  );

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedMaterial);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20" style={{ background: "#FEFEFE" }}>

      {/* Top Right Icons */}
      <div className="hidden lg:flex justify-end gap-5 mb-8">
        <button style={{ color: "#262A2E" }}><Share2 className="w-5 h-5 stroke-[1.5]" /></button>
        <button onClick={() => setWishlisted(!wishlisted)} style={{ color: wishlisted ? "#6A8C40" : "#262A2E" }}>
          <Heart className="w-5 h-5 stroke-[1.5]" fill={wishlisted ? "#6A8C40" : "none"} />
        </button>
        <Link href="/cart" className="relative" style={{ color: "#262A2E" }}>
          <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-[1.5px] border-white" style={{ background: "#6A8C40" }}>{totalItems}</span>
          )}
        </Link>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[13px] font-medium mb-10" style={{ color: "#555D5E" }}>
        <Link href="/" className="hover:text-[#262A2E] transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/shop" className="hover:text-[#262A2E] transition-colors">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/shop?category=${product.category}`} className="hover:text-[#262A2E] transition-colors">{product.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span style={{ color: "#262A2E" }}>{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-16 mb-24">
        {/* Gallery */}
        <div className="lg:w-[55%] flex-shrink-0">
          <div className="relative rounded-2xl overflow-hidden mb-4" style={{ aspectRatio: "4/3", background: "#F0F5EC" }}>
            <Image src={product.images[selectedImage]} alt={product.name} fill className="object-contain p-10" priority />
          </div>
          <div className="flex justify-between gap-4">
            {product.images.slice(0, 4).map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)} className="relative flex-1 rounded-xl overflow-hidden transition-all duration-200"
                style={{ aspectRatio: "1/1", border: `1px solid ${selectedImage === i ? "#6A8C40" : "#E5E5E2"}`, background: "#F0F5EC", opacity: selectedImage === i ? 1 : 0.6 }}>
                <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-contain p-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-[45%]">
          <h1 className="text-[32px] font-bold mb-3" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E", lineHeight: "1.2" }}>{product.name}</h1>

          <div className="flex items-center gap-6 mb-6">
            <span className="text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif", color: "#6A8C40" }}>{formatPrice(product.price)}</span>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4" style={{ color: "#F5A623" }} fill="#F5A623" />
              <span className="text-[13px] font-bold" style={{ color: "#262A2E" }}>{product.rating}</span>
              <span className="text-[13px]" style={{ color: "#555D5E" }}>({product.reviews} Reviews)</span>
            </div>
          </div>

          <p className="text-[14px] leading-relaxed mb-8" style={{ color: "#555D5E" }}>{product.description}</p>

          {/* Color */}
          <div className="mb-6">
            <p className="text-[13px] font-bold mb-3" style={{ color: "#262A2E" }}>Color: <span className="font-medium" style={{ color: "#555D5E" }}>{selectedColor}</span></p>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button key={color} onClick={() => setSelectedColor(color)} className="w-8 h-8 rounded-full transition-transform hover:scale-110"
                  style={{ background: color, border: selectedColor === color ? "2px solid white" : "none", boxShadow: selectedColor === color ? "0 0 0 1px #E5E5E2" : "none" }} />
              ))}
            </div>
          </div>

          {/* Material */}
          <div className="mb-8">
            <p className="text-[13px] font-bold mb-3" style={{ color: "#262A2E" }}>Material: <span className="font-medium" style={{ color: "#555D5E" }}>{selectedMaterial}</span></p>
            <div className="flex gap-3">
              {product.materials.map((m) => (
                <button key={m} onClick={() => setSelectedMaterial(m)} className="px-6 py-2 rounded-full text-[13px] font-bold transition-colors"
                  style={{ background: selectedMaterial === m ? "#6A8C40" : "transparent", color: selectedMaterial === m ? "#fff" : "#555D5E", border: `1px solid ${selectedMaterial === m ? "#6A8C40" : "#E5E5E2"}` }}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-10">
            <p className="text-[13px] font-bold mb-3" style={{ color: "#262A2E" }}>Quantity</p>
            <div className="inline-flex items-center rounded-xl h-12" style={{ border: "1px solid #E5E5E2", background: "#FFFFFF" }}>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-12 h-full flex items-center justify-center" style={{ color: "#555D5E" }}><Minus className="w-4 h-4" /></button>
              <span className="w-10 text-center text-[15px] font-bold" style={{ color: "#262A2E" }}>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="w-12 h-full flex items-center justify-center" style={{ color: "#555D5E" }}><Plus className="w-4 h-4" /></button>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex gap-4 mb-10">
            <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center py-4 rounded-xl text-[14px] font-bold transition-all"
              style={{ border: "1px solid #6A8C40", color: "#6A8C40", background: "#FFFFFF" }}>
              {addedToCart ? "✓ Added to Cart!" : "Add to Cart"}
            </button>
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              className="flex-[2] flex items-center justify-center gap-2 py-4 rounded-xl text-[14px] font-bold text-white transition-all hover:opacity-90"
              style={{ background: "#6A8C40" }}>
              <MessageCircle className="w-5 h-5" fill="white" /> Buy Now
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-6 mb-10" style={{ borderTop: "1px solid #E5E5E2", borderBottom: "1px solid #E5E5E2" }}>
            {[{ icon: Truck, text: "Free Shipping", sub: "For orders over $200" }, { icon: Shield, text: "2 Years Warranty", sub: "Quality Guaranteed" }, { icon: Headphones, text: "24/7 Support", sub: "We're here to help" }].map((item) => (
              <div key={item.text} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#E8F0E0" }}>
                  <item.icon className="w-4 h-4" style={{ color: "#6A8C40" }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-[12px] font-bold mb-0.5" style={{ color: "#262A2E" }}>{item.text}</p>
                  <p className="text-[10px]" style={{ color: "#555D5E" }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Accordions */}
          <div className="space-y-0" style={{ borderBottom: "1px solid #E5E5E2" }}>
            {[
              { key: "details", title: "Product Details", content: (
                <div>
                  <p>{product.description}</p>
                  <ul className="mt-4 space-y-2">
                    <li>• Premium {product.materials.join(" or ")} upholstery</li>
                    <li>• Solid wood frame construction</li>
                    <li>• Removable and washable cover (fabric options)</li>
                    <li>• Easy assembly — tools included</li>
                    <li>• Sustainably sourced materials</li>
                  </ul>
                </div>
              )},
              { key: "dimensions", title: "Dimensions", content: (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(product.dimensions).map(([key, val]) => (
                    <div key={key} className="p-4 rounded-xl" style={{ border: "1px solid #E5E5E2", background: "#FEFEFE" }}>
                      <p className="text-[11px] font-bold uppercase mb-1" style={{ color: "#555D5E" }}>{key}</p>
                      <p className="text-[13px] font-bold" style={{ color: "#262A2E" }}>{val}</p>
                    </div>
                  ))}
                </div>
              )},
              { key: "reviews", title: `Reviews (${product.reviews})`, content: (
                <div className="space-y-4">
                  {[{ name: "Sarah J.", rating: 5, text: "Perfect for my living room. The quality is exceptional!", date: "2 weeks ago" }, { name: "Mike C.", rating: 5, text: "Worth every penny. Delivery was fast and assembly was easy.", date: "1 month ago" }].map((r, i) => (
                    <div key={i} className="p-4 rounded-xl" style={{ border: "1px solid #E5E5E2", background: "#FEFEFE" }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[13px] font-bold" style={{ color: "#262A2E" }}>{r.name}</span>
                        <span className="text-[11px]" style={{ color: "#555D5E" }}>{r.date}</span>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: r.rating }).map((_, j) => (<Star key={j} className="w-3 h-3" style={{ color: "#F5A623" }} fill="#F5A623" />))}
                      </div>
                      <p className="text-[13px]" style={{ color: "#555D5E" }}>{r.text}</p>
                    </div>
                  ))}
                </div>
              )},
            ].map((acc) => (
              <div key={acc.key} style={{ borderTop: "1px solid #E5E5E2" }}>
                <button onClick={() => setOpenAccordion(openAccordion === acc.key ? "" : acc.key)} className="w-full flex items-center justify-between py-5 text-left">
                  <span className="text-[14px] font-bold" style={{ color: "#262A2E" }}>{acc.title}</span>
                  {openAccordion === acc.key ? <ChevronUp className="w-4 h-4" style={{ color: "#555D5E" }} /> : <ChevronDown className="w-4 h-4" style={{ color: "#555D5E" }} />}
                </button>
                {openAccordion === acc.key && <div className="pb-5 text-[14px] leading-relaxed" style={{ color: "#555D5E" }}>{acc.content}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (<ProductCard key={p.id} product={p} />))}
          </div>
        </div>
      )}
    </div>
  );
}