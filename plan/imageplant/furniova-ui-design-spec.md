# FURNIOVA — UI Design Specification
### Dokumen ini adalah hasil transkripsi visual dari 3 file mockup (1 homepage desktop detail + 1 flow mobile 10 layar + 1 flow desktop 8 layar) menjadi teks, untuk dipakai sebagai acuan implementasi oleh Cline (yang tidak bisa melihat gambar langsung).

**Cara pakai:** berikan file ini utuh ke Cline sebagai context/instruction sebelum minta dia mengerjakan UI. Setiap kali Cline ragu soal warna, ukuran, atau layout, rujuk balik ke dokumen ini — jangan biarkan dia "berimprovisasi" karena itu penyebab UI melenceng dari mockup.

---

## 1. BRAND & DESIGN SYSTEM

### 1.1 Brand
- Nama: **Furniova**
- Logo: ikon rumah/daun berwarna hijau (bentuk geometris sederhana, house-shape dengan aksen daun) + wordmark teks "Furniova" (bold, hitam/dark charcoal), diletakkan sejajar horizontal di kiri header.
- Niche: furniture & home decor e-commerce, kesan "natural, sustainable, modern minimalist".

### 1.2 Palet Warna (hasil color-pick langsung dari mockup, bukan perkiraan)
Gunakan hex ini sebagai CSS variable / Tailwind config — ini kunci supaya hasil Cline tidak melenceng:

```css
:root {
  /* Primary brand green - dipakai untuk button utama, ikon aktif, harga, badge */
  --color-primary: #6A8C40;       /* sage/olive green - solid button "Shop Now", harga produk, floating chat button */
  --color-primary-dark: #5A7836;  /* hover state / shade lebih gelap */
  --color-primary-light: #E8F0E0; /* background pill/badge tipis, mis. badge "New Collection", active nav pill */
  --color-primary-pale: #F0F5EC;  /* background section lembut, mis. panel "Contact WhatsApp" */

  /* Neutral */
  --color-bg: #FEFEFE;            /* background utama halaman, hampir putih murni */
  --color-surface: #FFFFFF;       /* card / panel background */
  --color-text-heading: #262A2E;  /* warna heading, hampir hitam (bukan pure black) */
  --color-text-body: #555D5E;     /* warna paragraf / deskripsi, abu-abu medium */
  --color-border: #E5E5E2;        /* border tipis pada card, input, divider */

  /* Status / accent */
  --color-discount-badge: #6A8C40; /* badge "-15%" memakai warna hijau yang sama dengan primary, BUKAN merah */
  --color-rating-star: #F5A623;   /* warna bintang rating (kuning/orange standar) */
  --color-danger: #E25C5C;        /* hanya untuk delete icon/trash di cart, dipakai minimal */
}
```

> Catatan: warna sofa/produk pada foto (hijau sage muda, sekitar `#B8B895`–`#C9CBA3`) itu warna FOTO PRODUK, bukan token desain UI — jangan dipakai sebagai warna komponen.

### 1.3 Tipografi
- Font: sans-serif modern (geometric/humanist — gaya seperti **Inter**, **Poppins**, atau **Plus Jakarta Sans**). Pilih salah satu, konsisten di semua halaman.
- Heading hero (H1): sangat besar & bold (≈40–48px desktop, ≈28–32px mobile), warna `--color-text-heading`. Satu kata kunci dalam heading diberi warna `--color-primary` (contoh: kata "Home" pada "Comfort That Completes Your **Home**").
- Heading section (H2): bold, ≈22–24px (contoh: "Shop by Category", "Best Seller").
- Body/paragraf: regular weight, ≈14–16px, warna `--color-text-body`.
- Harga produk: bold, warna `--color-primary`, harga coret (strikethrough) untuk harga asli saat diskon memakai warna abu-abu/`--color-text-body` dengan garis coret.

### 1.4 Bentuk, Radius & Shadow
- Border radius besar & konsisten di semua elemen: card ≈16–20px, button ≈12px (atau full-rounded/pill untuk button kecil), input field ≈10px.
- Hero image desktop punya bentuk lengkung besar (large arc/blob shape) sebagai background di belakang foto — bukan kotak biasa.
- Shadow: soft drop shadow tipis pada card produk dan panel (jangan terlalu gelap/kontras, kesan "floating lembut").

### 1.5 Ikon
- Style: **outline/stroke**, tipis, minimal (gaya seperti Lucide/Feather icons) — BUKAN ikon filled/solid berat, BUKAN ikon 3D atau ilustrasi rumit.
- Ikon yang dipakai berulang: search (kaca pembesar), user/account, heart (wishlist), shopping-bag/cart, truck (shipping), shield (warranty), headset (support), leaf (sustainable/eco), star (rating), chevron/arrow, trash (delete), WhatsApp logo, chat-bubble.

### 1.6 Komponen Reusable

**Tombol Primary (solid)**
- Background `--color-primary`, teks putih, bold, radius besar, padding nyaman (≈12px x 24px). Contoh: "Shop Now", "Add to Cart" (di sebagian layar), "Buy Now", "Checkout", "Pay $xxx", "Continue Shopping", "Chat on WhatsApp".
- Beberapa tombol primary punya ikon panah `→` di kanan teks (mis. "Shop Now →").

**Tombol Secondary (outline)**
- Background putih/transparan, border tipis abu-abu/`--color-border`, teks `--color-text-heading`. Contoh: "Explore Collection", "Add to Cart" (versi outline di product detail), "View My Order".

**Badge/Pill kecil**
- Background `--color-primary-light`, teks `--color-primary-dark`, border tipis hijau, radius full (pill), biasanya ada ikon kecil di kiri teks. Contoh: badge "New Collection" dengan ikon daun.

**Product Card** (dipakai di Best Seller, Shop Listing, You May Also Like)
- Container putih, radius besar, shadow lembut.
- Foto produk (lifestyle photo, bukan studio shot polos) mengisi bagian atas card, radius mengikuti card.
- Icon hati (wishlist) di pojok kanan-atas foto, dalam lingkaran putih kecil.
- Badge diskon (mis. "-15%") di pojok kiri-atas foto jika produk sedang diskon — background hijau (`--color-primary`), teks putih.
- Di bawah foto: nama produk (medium weight), lalu baris harga (harga aktif bold hijau; jika diskon, harga asli coret di sampingnya berwarna abu-abu), lalu rating bintang + angka + jumlah review dalam tanda kurung (mis. "★ 4.8 (120)").

**Trust Badge Row** (3 item, dipakai di homepage & product detail)
- 3 kolom: ikon dalam lingkaran background `--color-primary-light`, di sebelahnya 2 baris teks (judul bold + subjudul abu-abu kecil).
- Isi: "Free Shipping / For orders over $200", "2 Years Warranty / Quality Guaranteed", "24/7 Support / We're here to help".

**Floating Action Button**
- Lingkaran solid hijau di pojok kanan-bawah viewport (sticky/fixed), berisi ikon chat-bubble putih. Muncul di semua halaman desktop sebagai live-chat trigger.

---

## 2. LAYOUT DESKTOP (Detail Per Halaman)

### 2.1 Homepage

**Header (sticky top, background putih)**
- Kiri: logo Furniova.
- Tengah: menu navigasi horizontal — `Home` (aktif, dibungkus pill background `--color-primary-light`), `Shop`, `Categories`, `Collections`, `Inspiration`, `About Us`.
- Kanan: 4 ikon sejajar — Search, Account (person), Wishlist (heart, ada badge angka hijau kecil di pojok kanan-atas ikon, contoh "2"), Cart (bag, ada badge angka hijau, contoh "3").

**Hero Section (2 kolom)**
- Kolom kiri (≈40% lebar):
  1. Badge pill "New Collection" + ikon daun.
  2. Heading besar 2 baris: "Comfort That Completes Your **Home**" (kata "Home" hijau).
  3. Paragraf subjudul: "Discover modern furniture with timeless design made for everyday living."
  4. Dua tombol sejajar: "Shop Now →" (primary/solid) dan "Explore Collection" (secondary/outline).
  5. Baris 3 trust badge (lihat komponen di atas).
- Kolom kanan (≈60% lebar):
  - Foto lifestyle ruang tamu: sofa 3-dudukan hijau sage dengan bantal krem, meja kopi kayu bulat (di atasnya buku & vas putih berisi tanaman), lampu gantung pendant putih-kayu, bingkai poster ilustrasi daun di dinding, tanaman pot besar (bird of paradise) di sisi kanan, karpet krem polos, dinding hijau pastel lembut.
  - Background di belakang foto: bentuk lengkung besar (arc) warna hijau pastel sangat lembut, foto "mengambang" di atasnya dengan radius besar.
  - Card mengambang (floating overlay) di pojok kanan-bawah foto: thumbnail kecil sofa + nama "Luna 3-Seater Sofa" + harga "$599.00" (hijau bold) + tombol bulat hijau kecil ikon "+" (add to cart cepat).
  - Dot indicator carousel (3 titik) di bawah foto, titik pertama aktif (hijau penuh, sisanya outline/abu-abu) — menandakan hero adalah slider/carousel multi-slide.
- Strip vertikal di tepi kanan jauh (di luar foto hero, menempel ke sisi kanan layar): 3 fitur tersusun vertikal, masing-masing ikon + label bold + deskripsi kecil abu-abu:
  - Leaf icon — "Sustainable" / "Eco-friendly materials"
  - Chair icon — "Design" / "Modern & Timeless"
  - Shield icon — "Quality" / "Made to last"

**Section "Shop by Category"**
- Header section: judul kiri "Shop by Category", link kanan "View All Categories →".
- Grid 6 kolom (1 baris), masing-masing card putih radius besar: nama kategori (bold) + jumlah item kecil abu-abu di bawahnya (kiri), dan thumbnail foto produk representatif di kanan card.
- Isi: Sofa (32 Items), Chair (28 Items), Table (24 Items), Storage (18 Items), Bedroom (30 Items), Decor (40 Items).

**Section "Best Seller"**
- Header section: judul kiri "Best Seller", link kanan "View All →".
- Baris horizontal 5 Product Card (lihat komponen) + tombol panah bulat di ujung kanan untuk scroll/lihat lebih banyak.
- Isi: Luna 3-Seater Sofa $599.00 (★4.8, 120) | Nordic Dining Table $339.00 dicoret dari $399.00 badge -15% (★4.7, 85) | Elio Lounge Chair $249.00 (★4.6, 64) | Mila Sideboard $429.00 (★4.9, 73) | Ava Platform Bed $549.00 (★4.8, 98).

**Section "Sustainable Design" banner** (muncul di versi flow 8-layar, posisi setelah Best Seller)
- Banner lebar penuh, background hijau pucat (`--color-primary-pale`), berisi foto tanaman di kanan, teks kiri: heading "Sustainable Design" + subjudul "Better for your home, better for our planet." + tombol outline "Learn More".
- Di bawah banner: 4 kolom ikon fitur kecil — "Eco-Friendly Materials / Sustainably sourced", "Modern & Timeless / Designed to last", "Made to Order / Just for you", "Secure Payment / 100% safe checkout".

**Floating chat button** di pojok kanan bawah (lihat komponen).

> Catatan: tidak ada footer yang terlihat di kedua mockup desktop — halaman terpotong setelah section terakhir di atas. Jika perlu footer, desain bebas mengikuti design system ini (warna, radius, tipografi sama), karena tidak ada acuan visual untuk itu.

---

### 2.2 Shop / Product Listing (Desktop)

**Header:** sama seperti homepage, tapi search bar muncul inline di header (bukan hanya ikon).

**Page title:** "Shop" (heading besar) + subtext kecil "Showing 1–12 of 120 results", sort dropdown "Sort by: Featured" di kanan.

**Layout 2 kolom: sidebar filter (kiri, ≈22% lebar) + grid produk (kanan, ≈78%)**

Sidebar filter (panel putih/transparan, tanpa border tegas):
- "Categories" — list vertikal clickable (bukan checkbox): All Furniture, Sofa, Chair, Table, Storage, Bedroom, Decor.
- "Price Range" — slider dengan label "$0" kiri dan "$1000+" kanan.
- "Color" — baris lingkaran swatch warna (hijau, coklat/tan, kuning, merah, navy/ungu).
- "Material" — checkbox list: Wood, Fabric, Metal, Rattan.
- "Style" — checkbox list: Modern, Minimalist, Scandinavian, Classic.

Grid produk: 3 kolom x beberapa baris, isi Product Card standar (lihat komponen). Contoh isi: Luna 3-Seater Sofa $599, Elio Lounge Chair $249, Nordic Dining Table $339 (dicoret $399, badge -15%), Mila Sideboard $429, Oak Coffee Table $199, Ava Platform Bed $549, Woven Armchair $279, Minimalist Bookshelf $309, Round Dining Table $349.

Pagination di bawah grid: nomor halaman "1 2 3 … 10" + tombol panah next, halaman aktif (1) ditandai lingkaran solid hijau.

---

### 2.3 Product Detail (Desktop)

**Breadcrumb:** "Home > Sofa > 3-Seater Sofa > Luna 3-Seater Sofa" (teks kecil abu-abu, link).

**Layout 2 kolom:**
- Kiri: strip thumbnail vertikal kecil (3–4 foto alternatif) menempel di sisi paling kiri, di sebelahnya 1 foto besar utama (foto lifestyle sofa di ruang tamu, sama gaya dengan hero homepage).
- Kanan:
  1. Nama produk besar bold: "Luna 3-Seater Sofa".
  2. Harga besar hijau bold: "$599.00", di sampingnya rating "★ 4.8 (120 Reviews)".
  3. Paragraf deskripsi: "Modern 3-seater sofa with premium fabric and solid wood legs. Designed for comfort and durability."
  4. "Color: Sage Green" — label + 4 lingkaran swatch warna (hijau terpilih dengan ring/outline highlight, lalu coklat, abu-abu, krem).
  5. "Material: Fabric" — label + 2 tombol toggle pill ("Fabric" terpilih/hijau solid, "Leather" outline).
  6. Quantity stepper: tombol "−", angka "1", tombol "+".
  7. Dua tombol sejajar: "Add to Cart" (outline) dan "Buy Now" (solid hijau).
  8. Trust badge row (3 item, sama seperti homepage).
  9. 3 accordion/expandable section di bawah: "Product Details", "Dimensions", "Reviews (120)" dengan rating "★ 4.8/5" di sisi kanan header accordion.

---

### 2.4 Cart (Desktop)

**Title:** "Your Cart (2)".

**Layout 2 kolom:**
- Kiri (lebih lebar): list item cart, masing-masing baris berisi: thumbnail foto kecil, nama produk, varian (mis. "Sage Green" / "Natural Wood") teks kecil abu-abu di bawah nama, quantity stepper (− 1 +), harga di kanan, ikon trash (delete) paling kanan.
  - Item: Luna 3-Seater Sofa (Sage Green) $599.00; Nordic Dining Table (Natural Wood) $339.00.
  - Di bawah list: section "You may also like" — 2 product mini-card horizontal dengan tombol "Add" kecil (Elio Lounge Chair $249.00, Oak Coffee Table $199.00).
- Kanan (sidebar card, lebih sempit): "Order Summary" — baris Subtotal $938.00, Shipping $0.00, Tax $75.04, garis pemisah, Total $1,013.04 (bold besar). Tombol "Checkout" full-width solid hijau. Link teks "Continue Shopping" di bawahnya. Paling bawah: label "We accept" + deretan ikon logo pembayaran (Visa, Mastercard, Amex, PayPal).

---

### 2.5 Checkout — Information (Desktop)

**Stepper horizontal di atas:** "① Information" (aktif/hijau) → "② Shipping" → "③ Payment" — step aktif diberi lingkaran nomor solid hijau, step lain outline abu-abu, dihubungkan garis.

**Layout 2 kolom:**
- Kiri: form "Contact Information" — input Full Name ("Andi Pratama"), Email ("andi.pratama@email.com"), Phone/WhatsApp (dengan ikon WhatsApp kecil di kanan input, "+62 812-3456-7890"), checkbox "Save this information for next time" (tercentang).
- Kanan: card "Order Summary" — thumbnail item + nama + harga (Luna 3-Seater Sofa $599.00, Nordic Dining Table $339.00), lalu breakdown Subtotal/Shipping/Tax/Total seperti di Cart.

---

### 2.6 Payment (Desktop)

**Layout 2 kolom:**
- Kiri: "Select Payment Method" — list radio-button card vertikal, masing-masing punya ikon + judul + subjudul kecil:
  - Bank Transfer / "Transfer manually via your bank" — **terpilih** (radio hijau checked, card di-highlight border hijau).
  - Credit / Debit Card / "Visa, Mastercard, JCB".
  - E-Wallet / "OVO, GoPay, DANA, ShopeePay".
  - PayPal / "Pay easily with PayPal".
- Kanan: "Payment Details" panel — karena Bank Transfer terpilih, tampilkan: Bank "BCA (Bank Central Asia)", Account Number "1234 5678 9012", Account Name "Furniova Furniture Store", Total Amount "$1,013.04", catatan waktu "Please complete the payment within 24:00:00" (countdown timer format jam:menit:detik). Tombol "I have made a payment" full-width solid hijau di bawah.

---

### 2.7 Order Success (Desktop)

- Card terpusat (centered, max-width kecil di tengah layar) dengan dekorasi confetti/dot warna-warni kecil di sekitar.
- Ikon centang (check) besar dalam lingkaran solid hijau, di tengah atas.
- Heading besar "Thank You!".
- Subtext "Your order has been placed successfully."
- "Order Number" label kecil + nomor bold "#FV-2024-0521".
- Teks "We will send the order details to andi.pratama@email.com".
- Dua tombol: "Continue Shopping" (solid hijau) dan "View My Order" (outline), keduanya full-width ditumpuk vertikal.

---

### 2.8 Contact WhatsApp (Desktop)

**Layout 2 kolom dalam 1 section card besar, background hijau pucat (`--color-primary-pale`) dengan dekorasi ilustrasi daun samar:**
- Kiri: heading "Need Help?", subjudul "Chat with us on WhatsApp", paragraf "Our team is ready to help you with product information, orders, or any questions." Lalu 3 baris checklist (ikon centang hijau + teks): "Fast Response", "Friendly Service", "Order Assistance". Tombol "Chat on WhatsApp" (solid hijau + ikon logo WhatsApp). Nomor telepon "+62 812-3456-7890" di bawah tombol.
- Kanan: mockup tampilan chat WhatsApp (frame UI WhatsApp) — header "Furniova Store" + status "Online", bubble chat: sapaan pembuka dari toko, lalu pesan user "I want to ask about Luna 3-Seater Sofa", balasan toko "Sure! Here is the detail information about the product." dengan card produk tertanam (foto sofa + nama + harga $599.00).

---

## 3. LAYOUT MOBILE (Detail Per Layar — 10 layar)

Catatan umum mobile:
- Lebar viewport sempit (mockup pakai frame device dengan status bar "9:41" + ikon signal/wifi/baterai di beberapa layar — itu hanya frame mockup, **tidak perlu** dikodekan).
- Hampir semua halaman (kecuali Order Success & Contact WhatsApp & WhatsApp Chat) punya **Bottom Navigation Bar** sticky di bawah: 5 item — Home, Shop, Wishlist, Cart (badge angka hijau), Profile — masing-masing ikon outline + label kecil di bawah ikon.
- Top bar umumnya: tombol back (panah kiri) di kiri, judul/logo di tengah-kiri, ikon aksi (share/wishlist/cart) di kanan.

### 3.1 Homepage (Mobile)
- Top bar: ikon hamburger menu (kiri), logo "Furniova" (kiri-tengah), ikon cart dengan badge (kanan).
- Search bar full-width di bawah top bar: placeholder "Search furniture...".
- Hero: badge "New Collection", heading "Comfort That Completes Your Home", subjudul, 2 tombol sejajar "Shop Now" (solid) + "Explore" (outline), trust badge row 3 kolom diperkecil/dipadatkan secara horizontal.
- "Shop by Category" — judul + link "View All", grid/scroll horizontal ikon kategori bulat (Sofa, Chair, Table, Bedroom, Decor).
- "Best Seller" — judul + link "View All", scroll horizontal Product Card.
- Bottom Navigation Bar.

### 3.2 Shop / Product Listing (Mobile)
- Top bar: back arrow, share icon, wishlist icon (badge), cart icon (badge).
- Judul "Shop" + "Showing 1–12 of 120 results".
- Baris kontrol: tombol "Filter" (membuka filter sebagai modal/drawer, bukan sidebar permanen seperti desktop) + dropdown "Sort: Featured".
- Grid produk **2 kolom** (bukan 3 seperti desktop) — Product Card standar.
- Bottom Navigation Bar.

### 3.3 Product Detail (Mobile)
- Top bar: back, share, wishlist (badge), cart (badge).
- Foto produk besar full-width di atas, strip 4 thumbnail kecil horizontal di bawah foto utama.
- Nama produk, rating "★ 4.8 (120 Reviews)", harga "$599.00" hijau bold, deskripsi.
- "Color: Sage Green" swatch, "Material: Fabric/Leather" toggle.
- Dua tombol sejajar bawah: "Add to Cart" (outline) + "Buy Now" (solid hijau) — biasanya sticky di bawah layar.

### 3.4 Cart (Mobile)
- Top bar: back arrow, judul "Your Cart (2)", ikon bag.
- List item cart vertikal (sama field dengan desktop: foto, nama, varian, stepper qty, harga, delete icon).
- Card "Order Summary": Subtotal $938.00, Shipping $0.00, Tax $75.04, Total $1,013.04.
- Tombol "Checkout" full-width solid hijau.
- Bottom Navigation Bar.

### 3.5 Checkout — Information (Mobile)
- Stepper horizontal di atas (compact): ① Information (aktif) → ② Shipping → ③ Payment.
- Form "Contact Information": Full Name, Email, Phone/WhatsApp (ikon WA), checkbox "Save this information for next time".
- Di bawah form: ringkasan order singkat (thumbnail item + harga, Subtotal).

### 3.6 Checkout — Shipping (Mobile, **tidak ada versi terpisah di desktop**)
- Stepper: Information (sudah selesai, ditandai centang) → ② Shipping (aktif) → ③ Payment.
- Form "Shipping Address": Address ("Jl. Merdeka No. 123"), Apartment/suite optional ("Perumahan Green Lake Blok A2"), City ("Jakarta Selatan") & Postal Code ("12345") sejajar 2 kolom, Province dropdown ("DKI Jakarta"), Country dropdown ("Indonesia").
- "Shipping Method" — 2 pilihan radio card: "Standard Shipping (3–5 days)" label "Free" — **terpilih**; "Express Shipping (1–2 days)" — "$10.00".
- Bottom Navigation Bar.

### 3.7 Checkout — Payment (Mobile)
- Stepper: Information ✓ → Shipping ✓ → ③ Payment (aktif).
- "Select Payment Method": Bank Transfer (terpilih, subjudul "Transfer manually via your bank"), Credit/Debit Card ("Visa, Mastercard, JCB"), E-Wallet ("OVO, GoPay, DANA, ShopeePay"), PayPal ("Pay easily with PayPal").
- "Payment Details": Bank BCA (Bank Central Asia), Account Number 1234 5678 9012, Account Name Furniova Furniture Store, Total Amount $1,013.04.
- Tombol "Pay $1,013.04" full-width solid hijau, sticky di bawah layar.

### 3.8 Order Success (Mobile)
- Sama persis kontennya dengan versi desktop (lihat 2.7), hanya full-width mobile, centered vertikal: ikon centang hijau + confetti, "Thank You!", "Your order has been placed successfully.", Order Number #FV-2024-0521, info email, tombol "Continue Shopping" + "View My Order".

### 3.9 Contact WhatsApp (Mobile)
- Background hijau pucat dengan dekorasi daun.
- Heading "Need Help?", subjudul "Chat with us on WhatsApp", paragraf deskripsi.
- Checklist "Fast Response", "Friendly Service", "Order Assistance".
- Tombol "Chat on WhatsApp" solid hijau + ikon WA.
- Nomor telepon "+62 812-3456-7890".

### 3.10 WhatsApp Chat (Mobile) — **layar referensi/contoh, bukan bagian dari aplikasi Furniova**
Ini adalah simulasi tampilan aplikasi WhatsApp pihak ketiga untuk menunjukkan bagaimana percakapan customer service terlihat setelah user tap "Chat on WhatsApp". **Tidak perlu dibangun sebagai halaman aplikasi**, cukup sebagai referensi/dokumentasi alur:
- Header WhatsApp: back arrow, nama "Furniova Store", status "Online", ikon menu titik tiga.
- Notice bubble kecil di tengah: pesan enkripsi end-to-end standar WhatsApp.
- Bubble user (hijau, rata kanan): "I want to ask about Luna 3-Seater Sofa" — jam 10:30.
- Bubble toko (putih, rata kiri): "Sure! Here is the detail information about the product." + card produk tertanam (foto sofa, "Luna 3-Seater Sofa", "Sage Green", "$599.00") — jam 10:31.
- Input bar bawah: field "Type a message", ikon attachment, ikon kamera, tombol mic/send bulat hijau.

---

## 4. PERBEDAAN DESKTOP vs MOBILE & CATATAN PENTING UNTUK CLINE

1. **Jumlah kolom grid produk berbeda**: Desktop 3 kolom, Mobile 2 kolom.
2. **Filter Shop**: Desktop = sidebar permanen di kiri. Mobile = tombol "Filter" yang kemungkinan membuka drawer/modal (mockup tidak menunjukkan isi drawer-nya, jadi desain isi drawer mengikuti field filter yang sama persis dengan sidebar desktop: Categories, Price Range, Color, Material, Style).
3. **Checkout flow jumlah langkah terlihat beda**: Mockup desktop hanya menampilkan 2 layar (Checkout-Information dan Payment) dari total 3 step stepper-nya, sedangkan mockup mobile menampilkan ke-3 step sebagai layar terpisah (Information, Shipping, Payment). **Kemungkinan besar field "Shipping Address" pada desktop digabung di salah satu layar yang tidak ter-capture di mockup** — gunakan struktur 3-step yang sama (Information → Shipping → Payment) untuk KEDUA platform demi konsistensi, dengan field-field seperti dijelaskan di bagian Mobile 3.6.
4. **Bottom Navigation** hanya ada di Mobile. Desktop tidak punya nav bawah — desktop pakai header nav horizontal.
5. **Floating chat button** (lingkaran hijau pojok kanan-bawah) hanya terlihat eksplisit di mockup Desktop Homepage (image 1). Untuk konsistensi, boleh dipakai juga di halaman desktop lain, tapi TIDAK perlu di mobile karena mobile sudah punya halaman khusus "Contact WhatsApp" + Bottom Nav.
6. **Tidak ada desain Footer** di mockup manapun (desktop maupun mobile) — jangan menebak-nebak gaya footer secara drastis berbeda dari design system ini; tetap pakai warna & tipografi yang sama jika Footer dibutuhkan secara fungsional.
7. **Warna badge diskon "-15%" adalah HIJAU** (sama dengan primary brand color), BUKAN merah seperti kebiasaan e-commerce pada umumnya — ini detail kecil yang sering salah ditebak oleh AI.
8. Style foto produk: semua foto produk adalah **foto lifestyle** (produk dalam konteks ruangan nyata, bukan studio shot dengan background putih polos) — penting untuk asset/placeholder image generation.

---

## 5. CHECKLIST VERIFIKASI CEPAT UNTUK CLINE
Sebelum dianggap selesai, UI hasil implementasi harus dicek:
- [ ] Warna primary button = `#6A8C40` (bukan hijau lain seperti emerald/forest green)
- [ ] Semua card pakai radius besar (16–20px), bukan sudut tajam
- [ ] Heading pakai warna `#262A2E`, bukan pure black `#000000`
- [ ] Badge diskon berwarna hijau, bukan merah
- [ ] Hero homepage 2 kolom dengan bentuk arc/lengkung di belakang foto
- [ ] Product card selalu ada: foto lifestyle + heart icon + nama + harga hijau + rating bintang+jumlah review
- [ ] Mobile pakai bottom nav 5 item; Desktop pakai top nav horizontal
- [ ] Checkout pakai stepper 3 langkah: Information → Shipping → Payment
- [ ] Trust badge row (Free Shipping / Warranty / Support) konsisten muncul di Homepage & Product Detail
