/**
 * ============================================================================
 * Folder  : resources/js/pages/siswa/alat/
 * Fungsi  : Kumpulan komponen antarmuka yang menyusun halaman katalog peralatan lab versi siswa.
 * File    : alat-header.tsx
 * Fungsi  : Header judul dan ringkasan jumlah total unit inventaris barang yang tersedia pada katalog siswa.
 * ============================================================================
 */

interface AlatHeaderProps {
    totalItems: number;                                       // Jumlah total barang yang sedang ditampilkan
}

export function AlatHeader({ totalItems }: AlatHeaderProps) {
    return (
        <div className="flex items-center gap-3">
            <div>
                {/* Komponen header pembantu untuk informasi jumlah total alat */}
            </div>
        </div>
    );
}
