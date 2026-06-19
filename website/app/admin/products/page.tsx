"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, Search } from "lucide-react";
import { getProducts, addProduct, updateProduct, deleteProduct, resetProducts, type Product } from "@/lib/admin";
import { categories } from "@/lib/data";

const emptyProduct: Omit<Product, "id"> = {
  slug: "",
  name: "",
  price: 0,
  originalPrice: undefined,
  image: "/images/products/sofa-luna.png",
  images: ["/images/products/sofa-luna.png"],
  category: "Sofa",
  rating: 4.5,
  reviews: 0,
  description: "",
  colors: ["#6A8C40"],
  materials: ["Wood"],
  badge: undefined,
  inStock: true,
  dimensions: { width: "100 cm", depth: "100 cm", height: "100 cm", weight: "10 kg" },
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>(emptyProduct);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingProduct(null);
    setForm(emptyProduct);
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    const { id: _id, ...rest } = product;
    void _id;
    setForm(rest);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.slug || !form.price) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, form);
    } else {
      addProduct(form as Product);
    }
    setProducts(getProducts());
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
      setProducts(getProducts());
    }
  };

  const handleReset = () => {
    if (confirm("Reset all products to default?")) {
      resetProducts();
      setProducts(getProducts());
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>Products</h2>
          <p className="text-sm" style={{ color: "#555D5E" }}>{products.length} products total</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleReset} className="px-4 py-2 rounded-xl text-sm font-medium" style={{ border: "1px solid #E5E5E2", color: "#555D5E" }}>Reset Default</button>
          <button onClick={openAddModal} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: "#6A8C40" }}>
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#555D5E" }} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none"
          style={{ border: "1px solid #E5E5E2", color: "#262A2E", fontFamily: "Inter, sans-serif" }}
        />
      </div>

      {/* Products Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E5E5E2" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: "#FEFEFE", borderBottom: "1px solid #E5E5E2" }}>
                <th className="text-left text-xs font-semibold p-4" style={{ color: "#555D5E" }}>Product</th>
                <th className="text-left text-xs font-semibold p-4" style={{ color: "#555D5E" }}>Category</th>
                <th className="text-left text-xs font-semibold p-4" style={{ color: "#555D5E" }}>Price</th>
                <th className="text-left text-xs font-semibold p-4" style={{ color: "#555D5E" }}>Stock</th>
                <th className="text-right text-xs font-semibold p-4" style={{ color: "#555D5E" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} style={{ borderBottom: "1px solid #E5E5E2" }}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0" style={{ background: "#F0F5EC" }}>
                        <Image src={product.image} alt={product.name} width={48} height={48} className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "#262A2E" }}>{product.name}</p>
                        <p className="text-xs" style={{ color: "#555D5E" }}>{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm" style={{ color: "#555D5E" }}>{product.category}</td>
                  <td className="p-4">
                    <span className="text-sm font-bold" style={{ color: "#6A8C40" }}>${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs line-through ml-1" style={{ color: "#555D5E" }}>${product.originalPrice}</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{
                      background: product.inStock ? "#E8F0E0" : "#FEE2E2",
                      color: product.inStock ? "#5A7836" : "#E25C5C",
                    }}>{product.inStock ? "In Stock" : "Out"}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEditModal(product)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-gray-100" style={{ color: "#555D5E" }}>
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-red-50" style={{ color: "#E25C5C" }}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-6" style={{ background: "#FFFFFF" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold" style={{ fontFamily: "Poppins, sans-serif", color: "#262A2E" }}>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ color: "#555D5E" }}><X className="w-5 h-5" /></button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Slug *</label>
                  <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Price *</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Original Price (optional)</label>
                  <input type="number" value={form.originalPrice || ""} onChange={(e) => setForm({ ...form, originalPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }}>
                    {categories.map((cat) => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Image Path</label>
                  <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value, images: [e.target.value] })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Materials (comma separated)</label>
                  <input type="text" value={form.materials.join(", ")} onChange={(e) => setForm({ ...form, materials: e.target.value.split(",").map((s) => s.trim()) })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Badge (e.g. -15%)</label>
                  <input type="text" value={form.badge || ""} onChange={(e) => setForm({ ...form, badge: e.target.value || undefined })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Width</label>
                  <input type="text" value={form.dimensions.width} onChange={(e) => setForm({ ...form, dimensions: { ...form.dimensions, width: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Depth</label>
                  <input type="text" value={form.dimensions.depth} onChange={(e) => setForm({ ...form, dimensions: { ...form.dimensions, depth: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Height</label>
                  <input type="text" value={form.dimensions.height} onChange={(e) => setForm({ ...form, dimensions: { ...form.dimensions, height: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#555D5E" }}>Weight</label>
                  <input type="text" value={form.dimensions.weight} onChange={(e) => setForm({ ...form, dimensions: { ...form.dimensions, weight: e.target.value } })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1px solid #E5E5E2", color: "#262A2E" }} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} style={{ accentColor: "#6A8C40" }} />
                <label className="text-sm" style={{ color: "#262A2E" }}>In Stock</label>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4" style={{ borderTop: "1px solid #E5E5E2" }}>
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl text-sm font-medium" style={{ border: "1px solid #E5E5E2", color: "#555D5E" }}>Cancel</button>
              <button onClick={handleSave} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "#6A8C40" }}>
                {editingProduct ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}