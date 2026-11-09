# Panduan & Contekkan Penilaian Uji Kompetensi Keahlian (UKOM)
**Program Keahlian:** Rekayasa Perangkat Lunak (RPL)  
**Judul Proyek:** Sistem Informasi Inventaris & Peminjaman Perangkat Laboratorium (PinjamYuk Lab RPL)

> **Catatan Penggunaan:**  
> Di setiap poin tersedia dua model penjelasan:
> * **🗣️ Kalimat Siap Ucap ke Asesor**: Gunakan kalimat ini saat presentasi atau menjawab langsung di depan penguji (bahasa rapi, profesional, dan meyakinkan).
> * **💡 Konsep Santai & Analogi**: Gunakan bagian ini untuk memahami logika intinya dalam hitungan detik agar kamu tidak lupa saat gugup.

---

## 1. Bahasa Pemrograman yang Digunakan

### 🗣️ Kalimat Siap Ucap ke Asesor:
> *"Pada sistem inventaris ini, saya menggunakan kombinasi bahasa pemrograman backend dan frontend modern:*
> 1. *Backend menggunakan **PHP versi 8.3+** untuk memproses seluruh logika bisnis, otentikasi akun, validasi data, serta manipulasi basis data melalui ORM Eloquent.*
> 2. *Frontend menggunakan **TypeScript / JavaScript (ES2024)** untuk menangani interaktivitas antarmuka, pengetikan data yang aman (type-safe), serta pengelolaan state form secara reaktif.*
> 3. *Struktur antarmuka dibangun menggunakan **HTML5**, sedangkan penataan layout dan gaya visual menggunakan **CSS3** dengan utilitas framework Tailwind CSS.*
> 4. *Untuk pengelolaan basis data relasional, sistem menggunakan bahasa **SQL** melalui engine database MySQL/MariaDB."*

### 💡 Konsep Santai & Analogi:
* **PHP**: Otak di belakang layar (yang ngecek password bener/salah, ngitung stok di database).
* **TypeScript / JS**: Otot yang bikin halaman hidup (klik tombol langsung buka popup tanpa reload, ganti foto langsung kelihatan).
* **HTML**: Kerangka/tulang badan website (kotak input, tombol, judul).
* **CSS (Tailwind)**: Baju dan riasan (ngasih warna biru lab RPL, sudut melengkung, bayangan halus).
* **SQL**: Bahasa buat ngomong dan minta data ke lemari database.

---

## 2. Perancangan Antarmuka (Interface Design)

### 🗣️ Kalimat Siap Ucap ke Asesor:
> *"Sebelum tahap pengkodean, saya merancang antarmuka sistem menggunakan **Figma**. Saya membuat wireframe dan prototipe untuk dua jenis tampilan: tampilan mobile responsif untuk siswa serta tampilan desktop dashboard untuk administrator. Pada Figma, saya juga telah menentukan panduan warna sistem (Color Palette) dengan warna dominan biru (#0256D0) yang melambangkan identitas Laboratorium Rekayasa Perangkat Lunak, serta merancang komponen formulir dan dialog interaktif."*

### 💡 Konsep Santai & Analogi:
* Sebelum ngetik kodingan, bikin cetak birunya dulu di Figma.
* Tujuannya: Biar pas ngoding tinggal nyontek ukuran, tata letak, dan warna yang sudah dirancang tanpa bingung di tengah jalan.

---

## 3. Framework & Alat Pengembangan (*Tools & Technologies*)

### 🗣️ Kalimat Siap Ucap ke Asesor:
> *"Arsitektur sistem dibangun menggunakan tumpukan teknologi modern:*
> 1. *Backend Framework: **Laravel 13.x** dengan arsitektur MVC (Model-View-Controller) yang menangani routing, middleware, dan keamanan sistem.*
> 2. *Frontend Framework: **React 19.x** untuk membangun antarmuka berbasis komponen modular.*
> 3. *Jembatan Penghubung: **Inertia.js v3.0**, yang menyatukan Laravel dan React menjadi arsitektur monolit modern (Single Page Application) tanpa perlu membuat REST API terpisah.*
> 4. *Styling: **Tailwind CSS v4.x** untuk penataan desain antarmuka yang cepat, ringan, dan responsif.*
> 5. *Build Tool: **Vite v8.x** sebagai modul bundler berkecepatan tinggi dengan fitur Hot Module Replacement.*
> 6. *Manajemen Paket: **Composer** untuk dependensi PHP dan **NPM** untuk dependensi JavaScript.*
> 7. *Pengendali Versi: **Git & GitHub** untuk mencatat riwayat revisi kode sumber.*
> 8. *Database Server: **MySQL / MariaDB** yang dikelola melalui phpMyAdmin."*

### 💡 Konsep Santai & Analogi (Ibarat Mobil):
* **Laravel**: Mesin mobilnya (kuat, aman, bertenaga).
* **React**: Interior mobil mewah (tombol responsif, speedometer digital kilat).
* **Inertia.js**: Kabel transmisi yang nyambungin mesin ke dashboard secara instan.
* **Tailwind CSS**: Cat dan aksesoris body mobil siap pakai.
* **Vite**: Mekanik kilat yang langsung ngerakit kodingan tiap kali ditekan Ctrl+S.

---

## 4. Pustaka Pihak Ketiga (*Libraries*) & Kegunaannya

### 🗣️ Kalimat Siap Ucap ke Asesor:
> *"Sistem ini memanfaatkan beberapa library pendukung untuk memaksimalkan pengalaman pengguna dan keamanan:*
> 1. *`lucide-react`: Menyediakan ikon vektor yang konsisten seperti ikon hardware lab, tombol toggle intip password, indikator status, dan tombol navigasi.*
> 2. *`@radix-ui/react-*` (Dialog, Checkbox, Dropdown): Komponen headless UI yang standar industri dan aksesibel, digunakan pada modal zoom foto perangkat dan pop up formulir.*
> 3. *`sonner`: Menghasilkan notifikasi toast melayang yang interaktif saat operasi berhasil maupun gagal.*
> 4. *`clsx` & `tailwind-merge`: Menggabungkan kelas styling CSS Tailwind secara kondisional tanpa risiko konflik class.*
> 5. *`laravel/fortify`: Mengelola keamanan otentikasi backend, enkripsi kata sandi berbasis Bcrypt, serta perlindungan serangan CSRF."*

### 💡 Konsep Santai & Analogi:
* **Lucide**: Koleksi stiker/ikon biar tampilan gak kaku cuma tulisan doang.
* **Radix UI**: Cetakan kotak popup biar pas dibuka halus dan otomatis nutup kalau klik di luar area.
* **Sonner**: Kotak notifikasi melayang di pojok layar (*"Alat berhasil disimpan!"*).
* **Fortify**: Satpam pintu masuk yang ngacak password biar aman dari pembobolan.

---

## 5. Struktur Data & Operasi CRUD (Create, Read, Update, Delete)

### 🗣️ Kalimat Siap Ucap ke Asesor:
> *"Sistem ini mengimplementasikan operasi CRUD secara menyeluruh pada tiga entitas utama:*
> 1. *Data Master Alat: Admin dapat membuat perangkat baru dengan upload foto, membaca katalog di tabel, memperbarui stok/spesifikasi, dan menghapus alat.*
> 2. *Transaksi Peminjaman: Siswa membuat pengajuan pinjam, sistem mencatat relasi peminjaman, dan admin memperbarui status saat alat dikembalikan.*
> 3. *Pengguna/Siswa: Meliputi pembuatan akun, pembacaan riwayat, pembaruan status siswa, serta pengelolaan kata sandi."*

### 📋 Tabel Rincian CRUD & Tipe Data:

| Entitas | Operasi | Tipe Data Kolom Utama | Letak Fitur di Aplikasi |
| :--- | :--- | :--- | :--- |
| **Data Alat (Inventaris)** | **Create** | `VARCHAR`, `INT`, `JSON` (spek), `VARCHAR` (path gambar) | Tombol **"Tambah Perangkat"** di Admin (`AlatFormModal`) |
| | **Read** | String, Integer, Array Spek, Ukuran File | Tabel data inventaris admin & Katalog kartu siswa |
| | **Update** | String, Integer, File Upload baru | Tombol **"Ubah Data"** / Form Edit di Admin |
| | **Delete** | Foreign Key constraint check | Tombol **"Hapus"** dengan proteksi transaksi aktif |
| **Peminjaman** | **Create** | `BIGINT` (FK), `VARCHAR`, `DATE`, `ENUM` | Tombol **"Pinjam Sekarang"** pada Modal Siswa |
| | **Read** | Relasi ID user & ID alat, Format Tanggal | Menu **Log Peminjaman** Admin & Riwayat Siswa |
| | **Update** | `ENUM` ('Sedang Dipinjam' $\rightarrow$ 'Dikembalikan') | Aksi penyelesaian peminjaman oleh Admin |
| **Manajemen Siswa** | **CRUD** | `VARCHAR`, `ENUM` (role), Hashed String | Panel Menu Akun Siswa & Master Pengguna |

---

## 6. Relasi Antar Tabel Basis Data (Parent - Child)

### 🗣️ Kalimat Siap Ucap ke Asesor:
> *"Struktur basis data menggunakan relasi One-to-Many antara tabel induk dan tabel transaksi:*
> * Tabel `users` (Parent) berelasi One-to-Many dengan `peminjamans` (Child), di mana satu pengguna dapat memiliki banyak catatan transaksi peminjaman melalui foreign key `user_id`.*
> * Tabel `alats` (Parent) berelasi One-to-Many dengan `peminjamans` (Child), di mana satu data alat dapat dipinjam berkali-kali dalam riwayat transaksi melalui foreign key `alat_id`.*
> * Tabel `peminjamans` berfungsi sebagai tabel perantara transaksi yang menghubungkan siapa siswa yang meminjam dengan alat apa yang dibawa, lengkap dengan status transaksi ('Sedang Dipinjam' atau 'Dikembalikan')."*

### 💡 Konsep Diagram & Cek phpMyAdmin:
```
[ users ] (Parent)             [ alats ] (Parent)
    │                                │
    │ 1                              │ 1
    ▼                                ▼
    ∞                                ∞
      [ peminjamans ] (Child / Transaksi Penghubung)
      (Foreign Keys: user_id & alat_id)
```
> **Langkah Menunjukkan ke Asesor:**
> Buka browser $\rightarrow$ buka `http://localhost/phpmyadmin` $\rightarrow$ klik database proyek $\rightarrow$ klik menu **Designer** (pojok kanan atas). Tunjukkan garis relasi antara `peminjamans.user_id` $\rightarrow$ `users.id` dan `peminjamans.alat_id` $\rightarrow$ `alats.id`.

---

## 7. Fitur Media, Upload Gambar, & Lightbox Zoom

### 🗣️ Kalimat Siap Ucap ke Asesor:
> *"Fitur multimedia pada sistem inventaris ini meliputi:*
> 1. *Upload Foto Berkas: Formulir input mendukung pengunggahan gambar dengan validasi tipe MIME (jpeg, png, jpg, webp) dan kapasitas maksimal 2 MB di sisi backend.*
> 2. *Kalkulasi Ukuran Berkas Realtime: Menggunakan Accessor Eloquent dinamis `imageSizeFormatted` yang membaca ukuran file bita fisik di server publik dan mengonversinya secara otomatis ke format KB atau MB.*
> 3. *Fitur Lightbox Zoom: Pengguna dapat mengklik foto pada detail modal untuk menampilkan gambar dalam resolusi penuh dengan latar belakang backdrop blur.*
> 4. *Fallback Grafis Otomatis: Apabila perangkat belum memiliki foto asli, antarmuka otomatis merender ikon ilustrasi perangkat lab bawaan sehingga UI tetap konsisten."*

### 💡 Konsep Santai:
* Kalau admin upload foto laptop 500 KB, otomatis ketulis *"Ukuran: 488.3 KB"*.
* Kalau fotonya diklik, layarnya nge-zoom besar biar kelihatan nomor seri atau lecet barangnya.
* Kalau admin gak upload foto, otomatis diganti gambar ikon laptop biar kotaknya gak bolong.

---

## 8. Prosedur Instalasi & Perintah Terminal

### 🗣️ Kalimat Siap Ucap ke Asesor:
> *"Untuk memasang dan menjalankan aplikasi ini pada lingkungan komputer baru, langkah-langkah yang dilakukan adalah:*
> 1. *Mengunduh paket dependensi PHP dengan `composer install` dan paket JavaScript dengan `npm install`.*
> 2. *Menyiapkan berkas lingkungan `.env` serta membuat kunci enkripsi aplikasi dengan `php artisan key:generate`.*
> 3. *Mengeksekusi migrasi database dan penyemaian data dummy awal dengan perintah `php artisan migrate --seed`.*
> 4. *Membuat symbolic link penyimpanan publik dengan `php artisan storage:link` agar file foto yang diunggah dapat diakses oleh browser.*
> 5. *Menjalankan server backend dengan `php artisan serve` dan compiler frontend dengan `npm run dev`."*

### 📋 Kode Terminal untuk Dijalankan:
```bash
# 1. Pindah ke folder proyek
cd C:\Users\Alomani\Documents\sistem-inventaris-lab

# 2. Pasang modul dependensi
composer install
npm install

# 3. Konfigurasi file env dan key aplikasi
copy .env.example .env
php artisan key:generate

# 4. Migrasi tabel & isi data pengujian
php artisan migrate --seed

# 5. Hubungkan folder storage ke folder public
php artisan storage:link

# 6. Jalankan server lokal
php artisan serve
npm run dev
```
Akses di browser: `http://localhost:8000`

---

## 9. Penjelasan Custom Function & Logika Inti

### A. Accessor Hitung Ukuran File Otomatis (`app/Models/Alat.php`)
```php
public function getImageSizeFormattedAttribute(): ?string
{
    $image = $this->attributes['image'] ?? null;
    if (!$image) return null;
    try {
        if (\Illuminate\Support\Facades\Storage::disk('public')->exists($image)) {
            $bytes = \Illuminate\Support\Facades\Storage::disk('public')->size($image);
            if ($bytes >= 1048576) {
                return number_format($bytes / 1048576, 1) . ' MB';
            }
            return number_format($bytes / 1024, 1) . ' KB';
        }
    } catch (\Throwable) {
        return null;
    }
    return null;
}
```
* **🗣️ Cara Jelasin ke Asesor:** *"Fungsi ini merupakan Accessor Eloquent pada Model Alat. Fungsinya memeriksa keberadaan file gambar di disk public storage, membaca kapasitas byte fisiknya, lalu mengonversinya secara otomatis ke format satuan KB atau MB tanpa perlu menambahkan kolom statis baru di tabel database."*

### B. Validasi Konsistensi Stok Realtime (`app/Http/Controllers/Admin/AlatController.php`)
```php
$validated = $request->validate([
    'total' => ['required', 'integer', 'min:0'],
    'stock' => ['required', 'integer', 'min:0', 'lte:total'],
], [
    'stock.lte' => 'Stok siap pakai tidak boleh melebihi total unit fisik lab.',
]);
```
* **🗣️ Cara Jelasin ke Asesor:** *"Rule validasi `lte:total` (less than or equal) berfungsi menjaga integritas data inventaris di sisi backend. Aturan ini memastikan jumlah stok alat yang siap pakai tidak akan pernah bisa diisi melebihi jumlah total aset fisik yang terdaftar di lab."*

### C. Proteksi Penghapusan Alat Aktif (`app/Http/Controllers/Admin/AlatController.php`)
```php
$activeLoans = $alat->peminjamans()->where('status', 'Sedang Dipinjam')->count();
if ($activeLoans > 0) {
    return redirect()->back()->with('error', 'Alat sedang dipinjam dan tidak dapat dihapus.');
}
```
* **🗣️ Cara Jelasin ke Asesor:** *"Logika ini adalah pengaman data transaksi. Jika seorang admin mencoba menghapus perangkat yang saat itu statusnya masih 'Sedang Dipinjam' oleh siswa, sistem akan menolak penghapusan tersebut demi mencegah hilangnya riwayat tanggung jawab peminjaman."*

### D. Sanitasi Spesifikasi Dinamis (`resources/js/pages/admin/alat/index.tsx`)
```typescript
const compiledSpecs: Record<string, string> = {};
formData.specs.forEach((s) => {
    if (s.key.trim() && s.value.trim()) {
        compiledSpecs[s.key.trim()] = s.value.trim();
    }
});
```
* **🗣️ Cara Jelasin ke Asesor:** *"Fungsi ini menyaring baris spesifikasi teknis dinamis sebelum dikirim ke backend, sehingga baris input yang kosong tidak akan tersimpan menjadi data sampah atau bernilai minus (`-`) di database."*

---

## 10. Struktur Folder & Penjelasan Setiap File Proyek

### 🗣️ Kalimat Siap Ucap ke Asesor:
> *"Aplikasi ini mengikuti standar struktur direktori resmi Laravel dan React Inertia:*
> * Folder `app/` menampung seluruh logika backend (Controllers, Models, Middleware).*
> * Folder `database/` menampung migration pembentuk tabel dan seeder data awal.*
> * Folder `resources/` menampung seluruh antarmuka frontend React (Pages, Layouts, Components).*
> * Folder `routes/` mengatur seluruh jalur URL web.*
> * Folder `public/` dan `storage/` mengelola aset publik dan penyimpanan berkas unggahan foto."*

### 💡 Analogi Pembagian Folder (Restoran Padang):
* `app/` = **Dapur & Koki** (Olah data, bikin keputusan, masak aturan).
* `database/` = **Lemari Penyimpanan & Denah Resep**.
* `resources/` = **Meja Makan & Piring Cantik** (Apa yang dilihat dan dinikmati pengunjung).
* `routes/` = **Buku Daftar Menu & Petunjuk Arah**.
* `public/` = **Etalase Kaca Depan** (Bisa dilihat langsung dari luar).
* `storage/` = **Gudang Brankas Tertutup** (Simpan barang upload).

---

### 📂 Bedah File Penting Satu Persatu:

#### 1. Berkas di Root (Luar Folder):
* **`.env`**:
  * *Ucap ke Asesor:* *"Berkas konfigurasi environment lokal untuk mengatur kredensial koneksi database MySQL, nama aplikasi, dan kunci enkripsi APP_KEY."*
  * *Bahasa Santai:* Kertas catatan rahasia tempat nyimpen password database dan settingan server.
* **`composer.json`**:
  * *Ucap ke Asesor:* *"Berkas deklarasi pustaka dependensi backend PHP seperti Laravel Framework, Fortify, dan Inertia-Laravel."*
* **`package.json`**:
  * *Ucap ke Asesor:* *"Berkas deklarasi pustaka dependensi frontend JavaScript seperti React 19, Tailwind CSS v4, Lucide Icon, dan Radix UI."*
* **`vite.config.ts`**:
  * *Ucap ke Asesor:* *"Berkas konfigurasi bundler Vite untuk mengintegrasikan React, Tailwind, dan Laravel dengan Hot Module Replacement kilat."*
* **`artisan`**:
  * *Ucap ke Asesor:* *"Executable CLI bawaan Laravel untuk menjalankan perintah terminal seperti migrasi database dan pembuatan controller."*

#### 2. Folder `app/Models/` (Petugas Penghubung Database):
* **`Alat.php`**:
  * *Ucap ke Asesor:* *"Model Eloquent untuk tabel `alats`. Menentukan kolom yang dapat diisi `$fillable`, relasi one-to-many ke peminjaman, casting format array spesifikasi, dan accessor penghitung ukuran file gambar."*
* **`Peminjaman.php`**:
  * *Ucap ke Asesor:* *"Model Eloquent untuk tabel `peminjamans`. Menghubungkan relasi transaksi ke Model User dan Model Alat serta memformat tanggal pinjam."*
* **`User.php`**:
  * *Ucap ke Asesor:* *"Model Eloquent untuk tabel `users`. Mengatur hak akses otentikasi peran (Admin/Siswa) dan enkripsi kata sandi."*

#### 3. Folder `app/Http/Controllers/` (Pengendali Alur Data):
* **`Admin/AlatController.php`**:
  * *Ucap ke Asesor:* *"Controller pengelola CRUD lengkap inventaris lab di panel admin, penanganan upload berkas foto, validasi kapasitas stok, dan pengaturan visibilitas barang."*
* **`Admin/PeminjamanController.php`**:
  * *Ucap ke Asesor:* *"Controller pengawas seluruh log peminjaman siswa di lab, pencarian riwayat transaksi, serta pemrosesan pengembalian alat."*
* **`Admin/SiswaController.php`**:
  * *Ucap ke Asesor:* *"Controller manajemen akun siswa untuk pembuatan akun baru, penyesuaian kelas, dan fitur reset kata sandi."*
* **`Admin/DashboardController.php`**:
  * *Ucap ke Asesor:* *"Controller analitik yang mengagregasikan data ringkasan total unit alat, jumlah siswa, dan distribusi kategori inventaris."*
* **`AlatController.php` (Siswa)**:
  * *Ucap ke Asesor:* *"Controller katalog siswa yang menampilkan daftar perangkat lab aktif dan menyajikan status ketersediaan unit."*
* **`PeminjamanController.php` (Siswa)**:
  * *Ucap ke Asesor:* *"Controller transaksi siswa untuk memproses formulir pengajuan peminjaman dan menampilkan riwayat barang yang dipinjam."*
* **`Middleware/HandleInertiaRequests.php`**:
  * *Ucap ke Asesor:* *"Middleware yang membagikan data global dari sesi Laravel ke props React (seperti identitas user yang login dan notifikasi flash alert)."*

#### 4. Folder `database/migrations/` (Cetak Biru Skema Tabel):
* **`..._create_users_table.php`**: Cetak biru tabel `users` (id, nama, email, password, role).
* **`..._add_details_to_users_table.php`**: Penambahan kolom NIS/username, kelas, dan status ke tabel `users`.
* **`..._create_alats_table.php`**: Cetak biru tabel `alats` (kode alat, nama, stok, total, deskripsi, spesifikasi).
* **`..._create_peminjamans_table.php`**: Cetak biru tabel relasi `peminjamans` lengkap dengan foreign key `user_id` dan `alat_id`.
* **`..._add_image_to_alats_table.php`**: Penambahan kolom path `image` ke tabel `alats`.
* **`DatabaseSeeder.php`**: Skrip seeder pengisi puluhan data awal (1 admin, banyak akun siswa, dan puluhan barang lab) agar sistem langsung siap diuji.

#### 5. Folder `resources/js/pages/` (Antarmuka Tampilan Pengguna):
* **`auth/login.tsx`**: Halaman login modern dengan efek interaktif Origami Flap, logo aplikasi, dan latar belakang visual Laboratorium RPL.
* **`admin/dashboard/index.tsx`**: Dashboard ringkasan metrik analitik inventaris dan peminjaman aktif admin.
* **`admin/alat/index.tsx`**: Halaman utama manajemen alat yang mengintegrasikan tabel, modal, filter, dan pagination.
* **`admin/alat/alat-table.tsx`**: Komponen tabel data barang lab dengan tombol aksi edit, hapus, detail, dan toggle status.
* **`admin/alat/alat-form-modal.tsx`**: Modal formulir tambah/ubah alat lab dengan fitur preview foto, indikator ukuran berkas, dan stepper stok otomatis.
* **`admin/alat/alat-detail-modal.tsx`**: Modal rincian spesifikasi teknis alat lengkap dengan fitur zoom foto resolusi tinggi.
* **`admin/alat/alat-filter-bar.tsx`**: Toolbar filter multi-kriteria untuk pencarian cepat nama, kode, dan kategori alat.
* **`admin/alat/alat-delete-modal.tsx`**: Kotak dialog konfirmasi pengamanan sebelum data alat dihapus permanen.
* **`admin/peminjaman/index.tsx`**: Halaman log pengawasan transaksi peminjaman siswa dan tombol persetujuan pengembalian.
* **`admin/siswa/index.tsx`**: Halaman pengelolaan data akun siswa dan pemulihan kata sandi.
* **`siswa/dashboard/index.tsx`**: Beranda siswa yang menampilkan status alat yang sedang dipinjam secara personal.
* **`siswa/alat/index.tsx` & `alat-grid.tsx`**: Katalog kartu barang modern yang fleksibel dibuka di layar smartphone maupun laptop.
* **`siswa/peminjaman/index.tsx`**: Halaman riwayat peminjaman siswa yang terbagi atas tab peminjaman aktif dan arsip pengembalian.

#### 6. Folder `resources/js/components/` & `routes/`:
* **`components/inventory/item-detail-modal.tsx`**: Modal rincian barang siswa yang memuat formulir pengajuan peminjaman dan fitur zoom foto.
* **`components/inventory/item-illustration.tsx`**: Komponen grafis fallback bawaan jika barang belum memiliki foto fisik.
* **`components/inventory/admin-pagination.tsx`**: Komponen navigasi baris halaman tabel data agar tampilan rapi.
* **`routes/web.php`**: Pusat seluruh pemetaan rute URL web yang menghubungkan alamat URL browser ke controller yang tepat.

#### 7. Folder `public/` & `storage/`:
* **`public/images/login-lab-bg.png`**: File visual ruangan Laboratorium Rekayasa Perangkat Lunak untuk background halaman login.
* **`public/images/app-logo.png`**: Logo resmi aplikasi PinjamYuk.
* **`public/storage/`**: Symbolic link (jalan pintas) yang mengarahkan akses browser ke folder `storage/app/public/`.
* **`storage/app/public/alats/`**: Direktori penyimpanan fisik untuk berkas foto yang diunggah pengguna.

---

## 11. Tips & Strategi Hari H Uji Kompetensi (9 - 11 November)

1. **Jelaskan dengan Tenang & Berurutan**:
   * Mulai dari latar belakang masalah: *"Aplikasi ini dibuat untuk mendigitalkan peminjaman alat di Lab RPL agar stok tercatat akurat dan mencegah kehilangan aset."*
   * Tunjukkan alur peran Siswa (Login $\rightarrow$ Lihat Katalog $\rightarrow$ Pinjam Alat).
   * Tunjukkan alur peran Admin (Login $\rightarrow$ Terima Pengembalian $\rightarrow$ Kelola Stok & Tambah Alat dengan Foto).
2. **Kesiapan Berkas Administrasi UKOM**:
   * Pas foto formal 3x4.
   * KTP / Kartu Identitas Pelajar.
   * Sertifikat PKL / Surat Keterangan sedang menempuh Praktik Kerja Lapangan.
   * Tanda tangan dokumen asesmen di bagian yang diarahkan.
3. **Pemanfaatan Hak Form Banding**:
   * Jika pada akhir sesi terjadi perbedaan penilaian objektif dari asesor meskipun seluruh fitur (CRUD, Relasi Tabel, Upload Gambar, Validasi) berjalan lancar sesuai kriteria, kamu berhak mengajukan **Form Banding**.
   * Sertakan alasan teknis yang jelas dengan membuktikan bahwa fitur bekerja di layar dan kodenya telah tertulis sesuai standar.
