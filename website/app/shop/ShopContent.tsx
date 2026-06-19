"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ui/ProductCard";
import FadeIn from "@/components/ui/FadeIn";

const categoryOptions = ["All Furniture", "Sofa", "Chair", "Table", "Storage", "Bedroom", "Decor"];
const materialOptions = ["Wood", "Fabric", "Metal", "Rattan"];
const styleOptions = ["Modern", "Minimalist", "Scandinavian", "Classic"];
const colorOptions = [
  { name: "Sage", value: "#6A8C40" },
  { name: "Beige", value: "#C5B9A8" },
  { name: "Navy", value: "#4A5568" },
  { name: "Terracotta", value: "#C15A42" },
  { name: "Mustard", value: "#D4AF37" },
];
const sortOptions = ["Featured", "Newest", "Price: Low to High", "Price: High to Low", "Best Rating"];

const colorNameToHex: Record<string, string> = {
  "Sage": "#6A8C40",
  "Beige": "#C5B9A8",
  "Navy": "#4A5568",
  "Terracotta": "#C15A42",
  "Mustard": "#D4AF37",
};

export default function ShopContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(
    initialCat ? (initialCat === "All" ? "All Furniture" : initialCat) : "All Furniture"
  );
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(1000);
  const [sortBy, setSortBy] = useState("Featured");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategory !== "All Furniture") {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (selectedMaterials.length > 0) {
      result = result.filter((p) => p.materials.some((m) => selectedMaterials.includes(m)));
    }
    if (selectedColors.length > 0) {
      const selectedHexes = selectedColors.map((c) => colorNameToHex[c] || c);
      result = result.filter((p) => p.colors.some((c) => selectedHexes.includes(c)));
    }
    result = result.filter((p) => p.price <= priceMax);
    switch (sortBy) {
      case "Price: Low to High": result.sort((a, b) => a.price - b.price); break;
      case "Price: High to Low": result.sort((a, b) => b.price - a.price); break;
      case "Best Rating": result.sort((a, b) => b.rating - a.rating); break;
    }
    return result;
  }, [selectedCategory, selectedMaterials, selectedColors, priceMax, sortBy]);

  const toggleArray = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter((prev) => prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]);
  };

  return (
    <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Header Row (Title and Sort) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-[32px] font-bold mb-1" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>
            Shop
          </h1>
          <p className="text-[13px] font-medium" style={{ color: "#555D5E" }}>
            Showing 1-{Math.min(filtered.length, 12)} of {products.length} results
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium" style={{ color: "#555D5E" }}>Sort by:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none text-[13px] font-bold px-2 py-1 pr-6 outline-none cursor-pointer bg-transparent"
              style={{ color: "#262A2E", fontFamily: "Inter, sans-serif" }}
            >
              {sortOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none stroke-[2]" style={{ color: "#262A2E" }} />
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden flex items-center gap-2 text-sm font-semibold p-3 border rounded-xl"
          style={{ borderColor: "#E5E5E2", color: "#262A2E" }}
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </button>

        {/* Filter Sidebar */}
        <aside className={`w-full lg:w-[240px] flex-shrink-0 ${sidebarOpen ? "block" : "hidden lg:block"}`}>
          <div className="space-y-8 sticky top-24">
            
            {/* Categories */}
            <div>
              <h4 className="text-[13px] font-bold mb-4" style={{ color: "#262A2E", fontFamily: "Poppins, sans-serif" }}>Categories</h4>
              <ul className="space-y-3 text-[13px]">
                {categoryOptions.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`transition-colors w-full text-left font-medium ${selectedCategory === cat ? "text-[#6A8C40] font-bold" : "text-[#555D5E] hover:text-[#262A2E]"}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <hr style={{ borderColor: "#E5E5E2" }} />

            {/* Price Range */}
            <div>
              <h4 className="text-[13px] font-bold mb-4" style={{ color: "#262A2E", fontFamily: "Poppins, sans-serif" }}>Price Range</h4>
              <div className="flex justify-between text-[11px] font-bold mb-3" style={{ color: "#555D5E" }}>
                <span>$0</span><span>${priceMax}+</span>
              </div>
              <input
                type="range" min={50} max={1000} step={50}
                value={priceMax}
                onChange={(e) => setPriceMax(+e.target.value)}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: "#6A8C40", background: "#E8F0E0" }}
              />
            </div>

            <hr style={{ borderColor: "#E5E5E2" }} />

            {/* Color */}
            <div>
              <h4 className="text-[13px] font-bold mb-4" style={{ color: "#262A2E", fontFamily: "Poppins, sans-serif" }}>Color</h4>
              <div className="flex flex-wrap gap-3">
                {colorOptions.map((c) => {
                  const isSelected = selectedColors.includes(c.name);
                  return (
                    <button
                      key={c.name}
                      onClick={() => toggleArray(setSelectedColors, c.name)}
                      className="w-6 h-6 rounded-full relative flex items-center justify-center transition-transform hover:scale-110"
                      style={{ background: c.value }}
                      title={c.name}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white mix-blend-difference" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <hr style={{ borderColor: "#E5E5E2" }} />

            {/* Material */}
            <div>
              <h4 className="text-[13px] font-bold mb-4" style={{ color: "#262A2E", fontFamily: "Poppins, sans-serif" }}>Material</h4>
              <div className="space-y-3 text-[13px]">
                {materialOptions.map((m) => (
                  <label key={m} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedMaterials.includes(m) ? "bg-[#6A8C40] border-[#6A8C40]" : "border-[#E5E5E2] group-hover:border-[#6A8C40]"}`}>
                      {selectedMaterials.includes(m) && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                    <span className="font-medium text-[#555D5E] group-hover:text-[#262A2E]">{m}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr style={{ borderColor: "#E5E5E2" }} />

            {/* Style */}
            <div>
              <h4 className="text-[13px] font-bold mb-4" style={{ color: "#262A2E", fontFamily: "Poppins, sans-serif" }}>Style</h4>
              <div className="space-y-3 text-[13px]">
                {styleOptions.map((s) => (
                  <label key={s} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedStyles.includes(s) ? "bg-[#6A8C40] border-[#6A8C40]" : "border-[#E5E5E2] group-hover:border-[#6A8C40]"}`}>
                      {selectedStyles.includes(s) && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    </div>
                    <span className="font-medium text-[#555D5E] group-hover:text-[#262A2E]">{s}</span>
                  </label>
                ))}
              </div>
            </div>
            
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-32 rounded-3xl" style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}>
              <p className="text-lg font-semibold mb-2" style={{ color: "#262A2E" }}>No products found</p>
              <p className="text-[13px]" style={{ color: "#555D5E" }}>Try adjusting your filters</p>
              <button 
                onClick={() => { setSelectedCategory("All Furniture"); setSelectedMaterials([]); setSelectedStyles([]); setSelectedColors([]); setPriceMax(1000); }}
                className="mt-6 px-6 py-2.5 text-white text-[13px] font-bold rounded-full hover:opacity-90 transition-opacity"
                style={{ background: "#6A8C40" }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-3 mt-16 pt-8" style={{ borderTop: "1px solid #E5E5E2" }}>
                <button className="w-8 h-8 flex items-center justify-center transition-colors" style={{ color: "#555D5E" }}>
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full text-white text-[13px] font-bold" style={{ background: "#6A8C40" }}>1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full text-[#555D5E] hover:bg-[#E8F0E0] text-[13px] font-bold transition-colors">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full text-[#555D5E] hover:bg-[#E8F0E0] text-[13px] font-bold transition-colors">3</button>
                <span className="w-8 h-8 flex items-center justify-center text-[#555D5E] text-[13px] tracking-widest">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-full text-[#555D5E] hover:bg-[#E8F0E0] text-[13px] font-bold transition-colors">10</button>
                <button className="w-8 h-8 flex items-center justify-center transition-colors" style={{ color: "#555D5E" }}>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </FadeIn>
  );
}