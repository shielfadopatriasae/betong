# BUG REPORT — Layout Container Tidak Center (Konten "Terdorong" ke Kiri)

## 1. Gejala
Di layar lebar (desktop/monitor besar), seluruh konten halaman terasa sempit/mepet ke kiri, sementara sisi kanan layar menyisakan area kosong yang besar. Ini terlihat di Header, Hero Section, dan section "Shop by Category" sekaligus — bukan cuma satu bagian.

## 2. Bukti Pengukuran (diukur langsung dari pixel screenshot localhost:3000)
- Lebar viewport browser pada screenshot: **2940px**
- Logo "Furniova" di header: kiri-nya mulai **persis di x = 0px** → TIDAK ADA padding kiri sama sekali.
- Ikon terakhir di header (cart icon): berakhir di **x ≈ 2557px**.
- Floating box fitur "Sustainable / Design / Quality" di sisi kanan hero: juga berakhir di **x ≈ 2557–2560px** (sama persis dengan header → konsisten, bukan kebetulan).
- Card "Decor" di section "Shop by Category": pola yang sama, mulai dari x=0 di kiri (card "Sofa") dan section berhenti di kanan jauh sebelum tepi browser.
- Ruang kosong tak terpakai di sisi kanan: **2940 − 2557 ≈ 383px (≈13% dari total lebar layar)**.

**Kesimpulan:** lebar konten yang dipakai konsisten ±2557–2560px di semua section, tapi container ini **rata kiri (left-aligned)**, bukan **center**, dan tidak punya padding kiri sama sekali. Karena itu konten terlihat "tertarik" ke kiri dan sisi kanan jadi lega/kosong.

## 3. Dugaan Penyebab Teknis
1. Container utama page kemungkinan memakai `max-width` tetap (mendekati 2560px atau breakpoint tertentu) **tanpa** `margin: 0 auto` / class `mx-auto` → browser otomatis menempatkannya rata kiri (`margin-left: 0`).
2. Bisa juga container pakai `width` fixed dalam px alih-alih `max-w-...` responsif, sehingga di layar yang lebih lebar dari nilai itu, sisa ruang menumpuk di kanan.
3. Tidak ada padding horizontal (`px-...`) yang diterapkan secara global, sehingga elemen menempel langsung ke tepi viewport (x=0) — ini bug terpisah dari soal "tidak center", harus dua-duanya diperbaiki.
4. Kemungkinan tiap section (Header, Hero, Shop by Category, dst.) punya wrapper/width masing-masing yang tidak konsisten/tidak reuse satu komponen Container yang sama — meski di kasus ini hasilnya kebetulan align karena semua section punya bug yang sama persis.

## 4. Instruksi Perbaikan untuk Cline
Cari file layout/wrapper utama yang membungkus seluruh isi halaman (misalnya `app/layout.tsx`, `Layout.jsx`, atau komponen `<Container>`/`<Wrapper>` yang dipakai berulang di Header/Hero/Section), lalu pastikan strukturnya seperti ini:

```jsx
<div className="max-w-[1536px] mx-auto px-6 lg:px-10">
  {/* seluruh isi page: Header, Hero, Shop by Category, Best Seller, dst */}
</div>
```

Poin wajib:
- **`max-w-[...]`** — tentukan lebar maksimum konten yang konsisten. Rekomendasi: **1440px–1600px**, BUKAN ±2560px seperti yang terukur sekarang (itu kemungkinan besar bukan nilai yang sengaja diset, melainkan akibat default/salah hitung).
- **`mx-auto`** — WAJIB ada. Inilah yang membuat container center secara horizontal di layar manapun, bukan rata kiri.
- **`px-6 lg:px-10`** (atau nilai setara, sesuaikan skala) — padding horizontal di KIRI dan KANAN, supaya konten tidak pernah menempel ke tepi browser walau di layar kecil sekalipun.

Tambahan yang perlu dicek Cline:
- Pastikan Header, Hero, dan semua section lain **memakai satu komponen Container/wrapper yang sama** (reuse), bukan masing-masing mengatur width/padding sendiri-sendiri secara manual. Ini mencegah inkonsistensi di masa depan.
- Cek apakah ada elemen dengan `width: 100vw` yang berada di dalam container yang sudah punya margin — kombinasi ini sering bikin elemen "bocor" keluar dari container induk dan merusak alignment keseluruhan halaman.
- Hero image (foto kasur/sofa) boleh tetap full-bleed/lebih lebar dari container teks di sampingnya (itu gaya desain yang disengaja, lihat mockup asli), tapi TEKS dan elemen UI lain (heading, button, badge, nav, ikon) harus tetap mengikuti container yang center+padding di atas.

## 5. Cara Verifikasi Setelah Diperbaiki
- [ ] Di layar lebar (ultra-wide), jarak kosong di kiri dan kanan konten **sama besar** (simetris kiri-kanan).
- [ ] Logo "Furniova" punya jarak minimal ~24–32px dari tepi kiri browser (tidak lagi 0px).
- [ ] Ikon terakhir di header (cart) dan box floating "Sustainable/Design/Quality" tetap sejajar satu sama lain (konsistensi ini sudah benar, jangan sampai rusak saat fix).
- [ ] Jarak dari elemen paling kanan ke tepi kanan browser = jarak dari elemen paling kiri ke tepi kiri browser.
- [ ] Resize browser ke berbagai lebar (laptop kecil, monitor besar, ultra-wide) — container harus tetap center di semua ukuran, tidak hanya benar di satu resolusi tertentu.
