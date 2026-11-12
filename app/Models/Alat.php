<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Alat extends Model
{
    use HasFactory;

    protected $table = 'alats';

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

    protected $casts = [
        'specs' => 'array',
        'is_visible_to_students' => 'boolean',
        'stock' => 'integer',
        'total' => 'integer',
    ];

    protected $appends = [
        'status',
        'iconType',
        'isVisibleToStudents',
        'imageUrl',
        'imageSizeFormatted',
    ];

    public function peminjamans(): HasMany
    {
        return $this->hasMany(Peminjaman::class);
    }

    public function getStatusAttribute(): string
    {
        return $this->stock > 0 ? 'Tersedia' : 'Dipinjam';
    }

    public function getIconTypeAttribute(): string
    {
        return $this->attributes['icon_type'] ?? 'laptop';
    }

    public function getIsVisibleToStudentsAttribute(): bool
    {
        return (bool) ($this->attributes['is_visible_to_students'] ?? true);
    }

    public function getImageUrlAttribute(): ?string
    {
        $image = $this->attributes['image'] ?? null;
        if (!$image) {
            return null;
        }

        if (str_starts_with($image, 'http://') || str_starts_with($image, 'https://') || str_starts_with($image, '/')) {
            return $image;
        }

        return asset('storage/' . $image);
    }

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
