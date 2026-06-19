import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../globals.css";
import { CartProvider } from "@/lib/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export const metadata: Metadata = {
  title: "Furniova — Modern Furniture for Everyday Living",
  description:
    "Discover premium Scandinavian-inspired furniture. Shop sofas, chairs, tables, beds, and more. Free shipping on orders over $200.",
  keywords: "furniture, sofa, chair, table, bedroom, modern, minimalist, Scandinavian",
  openGraph: {
    title: "Furniova — Modern Furniture for Everyday Living",
    description:
      "Discover premium Scandinavian-inspired furniture. Shop sofas, chairs, tables, beds, and more.",
    type: "website",
  },
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}