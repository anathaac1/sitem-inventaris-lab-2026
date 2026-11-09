<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Catatan:
 * Model ini mewakili tabel 'alats' di database (data barang/alat laboratorium RPL).
 * Berisi atribut alat (nama, kode, stok, kategori, gambar, spesifikasi) serta fungsi-fungsi
 * pendukung (relasi ke peminjaman, kalkulasi status ketersediaan, format URL gambar, dan ukuran file).
 */
class Alat extends Model
{
    use HasFactory;

    // Nama tabel database yang terhubung dengan model ini
    protected $table = 'alats';

    // Kolom-kolom yang boleh diisi secara massal (mass assignment)
    protected $fillable = [
        'name',
        'category',
        'code',
        'stock',
        'total',
        'description',
        'image',
        'specs',
        'icon_type',
        'is_visible_to_students',
    ];

    // Konversi tipe data otomatis (casting) dari kolom database ke tipe data PHP
    protected $casts = [
        'specs' => 'array',
        'is_visible_to_students' => 'boolean',
        'stock' => 'integer',
        'total' => 'integer',
    ];

    // Atribut tambahan (accessor) yang otomatis di-serialize saat model dijadikan JSON / dikirim ke React
    protected $appends = [
        'status',
        'iconType',
        'isVisibleToStudents',
        'imageUrl',
        'imageSizeFormatted',
    ];

    /**
     * Relasi One-to-Many ke tabel peminjamans:
     * Satu alat bisa punya banyak riwayat atau transaksi peminjaman.
     */
    public function peminjamans(): HasMany
    {
        return $this->hasMany(Peminjaman::class);
    }

    /**
     * Accessor 'status':
     * Otomatis menentukan label status alat: kalau stok > 0 maka 'Tersedia', kalau habis maka 'Dipinjam'.
     */
    public function getStatusAttribute(): string
    {
        return $this->stock > 0 ? 'Tersedia' : 'Dipinjam';
    }

    /**
     * Accessor 'iconType':
     * Memberikan tipe ikon default 'laptop' jika tidak disetel di database.
     */
    public function getIconTypeAttribute(): string
    {
        return $this->attributes['icon_type'] ?? 'laptop';
    }

    /**
     * Accessor 'isVisibleToStudents':
     * Memastikan nilai boolean visibilitas ke siswa selalu ada (default true).
     */
    public function getIsVisibleToStudentsAttribute(): bool
    {
        return (bool) ($this->attributes['is_visible_to_students'] ?? true);
    }

    /**
     * Accessor 'imageUrl':
     * Mengubah nama file path gambar dari storage publik menjadi full URL web yang siap ditampilkan di tag <img>.
     */
    public function getImageUrlAttribute(): ?string
    {
        $image = $this->attributes['image'] ?? null;
        if (!$image) {
            return null;
        }

        // Kalau gambar berupa link URL luar (http/https) atau absolute path, langsung pakai
        if (str_starts_with($image, 'http://') || str_starts_with($image, 'https://') || str_starts_with($image, '/')) {
            return $image;
        }

        // Kalau file lokal, ambil URL storage publiknya
        return asset('storage/' . $image);
    }

    /**
     * Accessor 'imageSizeFormatted':
     * Membaca ukuran file gambar fisik dari disk storage publik dan memformatnya jadi satuan yang mudah dibaca (KB / MB).
     */
    public function getImageSizeFormattedAttribute(): ?string
    {
        $image = $this->attributes['image'] ?? null;
        if (!$image) {
            return null;
        }

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
}
