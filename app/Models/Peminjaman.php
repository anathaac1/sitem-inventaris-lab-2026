<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Catatan:
 * Model ini mewakili tabel 'peminjamans' di database (catatan transaksi peminjaman alat lab oleh siswa).
 * Menyimpan data siapa yang meminjam, alat apa yang dipinjam, tanggal pinjam & estimasi kembali,
 * status pinjaman ('Sedang Dipinjam' / 'Dikembalikan'), serta catatan tambahan.
 * Model ini juga menyediakan accessor untuk memformat tanggal ke bahasa Indonesia
 * dan memetakan atribut camelCase agar sesuai dengan kebutuhan komponen frontend React.
 */
class Peminjaman extends Model
{
    use HasFactory;

    // Nama tabel database
    protected $table = 'peminjamans';

    // Kolom-kolom yang boleh diisi secara massal
    protected $fillable = [
        'user_id',
        'alat_id',
        'borrower_name',
        'borrower_class',
        'borrow_date',
        'return_estimate',
        'return_date',
        'status',
        'notes',
    ];

    // Konversi tipe tanggal otomatis
    protected $casts = [
        'borrow_date' => 'date',
        'return_estimate' => 'date',
        'return_date' => 'date',
    ];

    // Daftar accessor format camelCase yang otomatis dikirim ke frontend React
    protected $appends = [
        'itemId',
        'itemName',
        'code',
        'category',
        'borrowDate',
        'returnEstimate',
        'returnDate',
        'borrowerName',
        'borrowerClass',
        'iconType',
    ];

    /**
     * Relasi ke akun User (siswa/admin yang mengajukan pinjaman).
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke Alat yang dipinjam.
     */
    public function alat(): BelongsTo
    {
        return $this->belongsTo(Alat::class);
    }

    /**
     * Accessor 'itemId': String representasi dari alat_id.
     */
    public function getItemIdAttribute(): ?string
    {
        return $this->alat_id !== null ? (string) $this->alat_id : null;
    }

    /**
     * Accessor 'iconType': Tipe ikon alat yang dipinjam.
     */
    public function getIconTypeAttribute(): string
    {
        return $this->alat?->icon_type ?? ($this->alat?->category === 'Laptop' ? 'laptop' : 'mouse');
    }

    /**
     * Accessor 'itemName': Nama alat yang dipinjam lewat relasi model Alat.
     */
    public function getItemNameAttribute(): ?string
    {
        return $this->alat?->name;
    }

    /**
     * Accessor 'code': Kode inventaris alat lewat relasi model Alat.
     */
    public function getCodeAttribute(): ?string
    {
        return $this->alat?->code;
    }

    /**
     * Accessor 'category': Kategori alat lewat relasi model Alat.
     */
    public function getCategoryAttribute(): ?string
    {
        return $this->alat?->category;
    }

    /**
     * Accessor 'borrowDate': Format tanggal pinjam jadi format Indonesia (contoh: "14 Oktober 2024").
     */
    public function getBorrowDateAttribute(): ?string
    {
        $raw = $this->attributes['borrow_date'] ?? null;
        if (! $raw) {
            return null;
        }

        try {
            return \Illuminate\Support\Carbon::parse($raw)->translatedFormat('j F Y');
        } catch (\Throwable) {
            return (string) $raw;
        }
    }

    /**
     * Accessor 'returnEstimate': Format perkiraan tanggal kembali ke format Indonesia.
     */
    public function getReturnEstimateAttribute(): ?string
    {
        $raw = $this->attributes['return_estimate'] ?? null;
        if (! $raw) {
            return null;
        }

        try {
            return \Illuminate\Support\Carbon::parse($raw)->translatedFormat('j F Y');
        } catch (\Throwable) {
            return (string) $raw;
        }
    }

    /**
     * Accessor 'returnDate': Format tanggal aktual saat barang dikembalikan ke format Indonesia.
     */
    public function getReturnDateAttribute(): ?string
    {
        $raw = $this->attributes['return_date'] ?? null;
        if (! $raw) {
            return null;
        }

        try {
            return \Illuminate\Support\Carbon::parse($raw)->translatedFormat('j F Y');
        } catch (\Throwable) {
            return (string) $raw;
        }
    }

    /**
     * Accessor 'borrowerName': Nama peminjam dalam camelCase.
     */
    public function getBorrowerNameAttribute(): ?string
    {
        return $this->attributes['borrower_name'] ?? null;
    }

    /**
     * Accessor 'borrowerClass': Kelas peminjam dalam camelCase.
     */
    public function getBorrowerClassAttribute(): ?string
    {
        return $this->attributes['borrower_class'] ?? null;
    }
}
