import { Suspense } from "react";
import ShopContent from "./ShopContent";

export const metadata = {
  title: "Shop — Furniova",
  description:
    "Browse our full collection of modern furniture. Filter by category, price, material, and style.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p style={{ color: "#64748B" }}>Loading products...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
