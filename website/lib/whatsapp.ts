const WA_NUMBER = "6285788607416";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildProductWhatsAppMessage({
  name,
  price,
  color,
  material,
  quantity,
  slug,
}: {
  name: string;
  price: number;
  color: string;
  material: string;
  quantity: number;
  slug: string;
}): string {
  return `Halo Furniova! 👋

Saya tertarik untuk memesan produk berikut:

🛋️ *Produk:* ${name}
🎨 *Warna:* ${color}
🪵 *Material:* ${material}
🔢 *Jumlah:* ${quantity}
💰 *Harga:* $${price.toFixed(2)} x ${quantity} = $${(price * quantity).toFixed(2)}

Bisa dibantu untuk informasi ketersediaan dan proses pemesanan? Terima kasih!`;
}

export function buildCartWhatsAppMessage(
  items: {
    name: string;
    price: number;
    quantity: number;
    selectedColor: string;
    selectedMaterial: string;
  }[],
  subtotal: number,
  total: number
): string {
  const itemLines = items
    .map(
      (item, i) =>
        `${i + 1}. *${item.name}*\n   Material: ${item.selectedMaterial} | Qty: ${item.quantity} | $${(item.price * item.quantity).toFixed(2)}`
    )
    .join("\n\n");

  return `Halo Furniova! 👋

Saya ingin memesan produk-produk berikut:

${itemLines}

---
📦 *Subtotal:* $${subtotal.toFixed(2)}
💰 *Total (est. tax):* $${total.toFixed(2)}

Mohon informasi untuk proses pemesanan, pengiriman, dan pembayaran. Terima kasih! 🙏`;
}
