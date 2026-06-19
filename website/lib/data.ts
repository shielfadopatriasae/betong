export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  description: string;
  colors: string[];
  materials: string[];
  badge?: string;
  inStock: boolean;
  dimensions: {
    width: string;
    depth: string;
    height: string;
    weight: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedMaterial: string;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "luna-3-seater-sofa",
    name: "Luna 3-Seater Sofa",
    price: 599,
    image: "/images/products/sofa-luna.png",
    images: [
      "/images/products/sofa-luna.png",
      "/images/products/sofa-luna.png",
      "/images/products/sofa-luna.png",
      "/images/products/sofa-luna.png",
    ],
    category: "Sofa",
    rating: 4.8,
    reviews: 120,
    description:
      "Modern 3-seater sofa with premium fabric and solid wood legs. Designed for comfort and durability. The Luna collection combines timeless Scandinavian aesthetics with exceptional craftsmanship.",
    colors: ["#6B8F71", "#C5B9A8", "#4A5568", "#E2D9CC"],
    materials: ["Fabric", "Leather"],
    inStock: true,
    dimensions: {
      width: "220 cm",
      depth: "90 cm",
      height: "82 cm",
      weight: "48 kg",
    },
  },
  {
    id: "2",
    slug: "nordic-dining-table",
    name: "Nordic Dining Table",
    price: 339,
    originalPrice: 399,
    image: "/images/products/dining-table.png",
    images: [
      "/images/products/dining-table.png",
      "/images/products/dining-table.png",
      "/images/products/dining-table.png",
    ],
    category: "Table",
    rating: 4.7,
    reviews: 85,
    description:
      "Solid oak dining table with 6 matching chairs. Natural wood finish with a smooth lacquered surface. Perfect for family gatherings and dinner parties.",
    colors: ["#8B6914", "#C5B9A8", "#4A5568"],
    materials: ["Wood", "Metal"],
    badge: "-15%",
    inStock: true,
    dimensions: {
      width: "180 cm",
      depth: "90 cm",
      height: "76 cm",
      weight: "65 kg",
    },
  },
  {
    id: "3",
    slug: "elio-lounge-chair",
    name: "Elio Lounge Chair",
    price: 249,
    image: "/images/products/chair-elio.png",
    images: [
      "/images/products/chair-elio.png",
      "/images/products/chair-elio.png",
      "/images/products/chair-elio.png",
    ],
    category: "Chair",
    rating: 4.6,
    reviews: 64,
    description:
      "Elegant lounge chair with a curved silhouette and solid wood frame. The Elio chair is a statement piece that elevates any living space with its refined sage green upholstery.",
    colors: ["#6B8F71", "#C5B9A8", "#8B6914"],
    materials: ["Fabric", "Leather"],
    inStock: true,
    dimensions: {
      width: "80 cm",
      depth: "85 cm",
      height: "90 cm",
      weight: "18 kg",
    },
  },
  {
    id: "4",
    slug: "mila-sideboard",
    name: "Mila Sideboard",
    price: 429,
    image: "/images/products/sideboard-mila.png",
    images: [
      "/images/products/sideboard-mila.png",
      "/images/products/sideboard-mila.png",
      "/images/products/sideboard-mila.png",
    ],
    category: "Storage",
    rating: 4.9,
    reviews: 73,
    description:
      "Premium walnut sideboard with sliding doors and open shelves. Features a spacious interior for all your storage needs while maintaining a sleek, minimal exterior.",
    colors: ["#8B6914", "#4A5568", "#2D3748"],
    materials: ["Wood"],
    inStock: true,
    dimensions: {
      width: "160 cm",
      depth: "45 cm",
      height: "75 cm",
      weight: "55 kg",
    },
  },
  {
    id: "5",
    slug: "ava-platform-bed",
    name: "Ava Platform Bed",
    price: 549,
    image: "/images/products/bed-ava.png",
    images: [
      "/images/products/bed-ava.png",
      "/images/products/bed-ava.png",
      "/images/products/bed-ava.png",
    ],
    category: "Bedroom",
    rating: 4.8,
    reviews: 98,
    description:
      "Modern platform bed with an upholstered headboard and solid oak frame. The Ava bed brings luxury and comfort together for the perfect night's sleep.",
    colors: ["#D1D5DB", "#C5B9A8", "#6B8F71", "#4A5568"],
    materials: ["Fabric", "Wood"],
    inStock: true,
    dimensions: {
      width: "160 cm",
      depth: "200 cm",
      height: "100 cm",
      weight: "70 kg",
    },
  },
  {
    id: "6",
    slug: "oak-coffee-table",
    name: "Oak Coffee Table",
    price: 199,
    image: "/images/products/coffee-table.png",
    images: [
      "/images/products/coffee-table.png",
      "/images/products/coffee-table.png",
      "/images/products/coffee-table.png",
    ],
    category: "Table",
    rating: 4.5,
    reviews: 47,
    description:
      "Round solid oak coffee table with tapered legs. A timeless centerpiece for your living room that pairs beautifully with any sofa or sectional.",
    colors: ["#8B6914", "#C5B9A8"],
    materials: ["Wood"],
    inStock: true,
    dimensions: {
      width: "90 cm",
      depth: "90 cm",
      height: "45 cm",
      weight: "22 kg",
    },
  },
  {
    id: "7",
    slug: "woven-armchair",
    name: "Woven Armchair",
    price: 279,
    image: "/images/products/armchair-woven.png",
    images: [
      "/images/products/armchair-woven.png",
      "/images/products/armchair-woven.png",
      "/images/products/armchair-woven.png",
    ],
    category: "Chair",
    rating: 4.7,
    reviews: 52,
    description:
      "Handcrafted rattan armchair with a plush cream cushion. The natural woven texture adds warmth and character to any room in your home.",
    colors: ["#C5B9A8", "#F5F5DC"],
    materials: ["Rattan", "Fabric"],
    inStock: true,
    dimensions: {
      width: "75 cm",
      depth: "80 cm",
      height: "85 cm",
      weight: "12 kg",
    },
  },
  {
    id: "8",
    slug: "minimalist-bookshelf",
    name: "Minimalist Bookshelf",
    price: 309,
    image: "/images/products/sideboard-mila.png",
    images: [
      "/images/products/sideboard-mila.png",
      "/images/products/sideboard-mila.png",
    ],
    category: "Storage",
    rating: 4.6,
    reviews: 38,
    description:
      "Open 5-tier bookshelf in light oak with a clean geometric design. Versatile storage for books, plants, and decorative objects.",
    colors: ["#8B6914", "#C5B9A8", "#4A5568"],
    materials: ["Wood"],
    inStock: true,
    dimensions: {
      width: "80 cm",
      depth: "30 cm",
      height: "180 cm",
      weight: "28 kg",
    },
  },
];

export const categories = [
  { name: "Sofa", count: 32, icon: "🛋️", image: "/images/products/sofa-luna.png" },
  { name: "Chair", count: 28, icon: "🪑", image: "/images/products/chair-elio.png" },
  { name: "Table", count: 24, icon: "🪵", image: "/images/products/coffee-table.png" },
  { name: "Storage", count: 18, icon: "🗄️", image: "/images/products/sideboard-mila.png" },
  { name: "Bedroom", count: 30, icon: "🛏️", image: "/images/products/bed-ava.png" },
  { name: "Decor", count: 40, icon: "🌿", image: "/images/products/armchair-woven.png" },
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    avatar: "SJ",
    rating: 5,
    comment:
      "Absolutely love my Luna sofa! The quality is exceptional and it looks even better in person. The sage green color is perfect for my living room.",
    product: "Luna 3-Seater Sofa",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, USA",
    avatar: "MC",
    rating: 5,
    comment:
      "The Nordic dining table is stunning. Solid build, beautiful finish, and delivery was super fast. My family loves it.",
    product: "Nordic Dining Table",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Austin, USA",
    avatar: "ER",
    rating: 5,
    comment:
      "Furniova has the best furniture I've ever purchased. The Elio lounge chair is my favorite spot in the house now. Worth every penny!",
    product: "Elio Lounge Chair",
  },
];