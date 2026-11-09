/**
 * ============================================================================
 * Folder  : resources/js/components/ui/
 * Fungsi  : Kumpulan komponen antarmuka pengguna dasar (UI Primitives) berbasis Tailwind CSS
 *           dan Radix UI yang dapat digunakan kembali (reusable) di seluruh aplikasi inventaris lab.
 * File    : icon.tsx
 * Fungsi  : Komponen pembungkus ikon dinamis Lucide (Icon wrapper) untuk mempermudah render
 *           komponen ikon secara kondisional tanpa memicu error jika ikon bernilai kosong/null.
 * ============================================================================
 */

import type { LucideIcon } from 'lucide-react';

interface IconProps {
    iconNode?: LucideIcon | null;                              // Objek komponen ikon Lucide
    className?: string;                                        // Kelas CSS Tailwind kustom
}

export function Icon({ iconNode: IconComponent, className }: IconProps) {
    // Jika tidak ada komponen ikon yang dikirimkan, jangan render apa pun
    if (!IconComponent) {
        return null;
    }

    // Render komponen ikon Lucide yang valid
    return <IconComponent className={className} />;
}
