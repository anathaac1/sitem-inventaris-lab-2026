/**
 * ============================================================================
 * Folder  : resources/js/components/inventory/
 * Fungsi  : Kumpulan komponen modular pendukung antarmuka inventaris dan peminjaman alat lab.
 * File    : dashboard-banner-carousel.tsx
 * Fungsi  : Menampilkan banner carousel interaktif pada dashboard siswa dengan rotasi
 *           otomatis (auto-play), navigasi swipe pada perangkat sentuh (touch/mobile),
 *           dan pesan edukatif seputar tata tertib peminjaman barang lab RPL.
 * ============================================================================
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight} from 'lucide-react';

/**
 * Struktur data tiap slide pada banner carousel
 */
interface SlideData {
    number: string;              // Nomor urut slide (misal: '01', '02')
    title: React.ReactNode;      // Judul headline teks
    subtitle: React.ReactNode;   // Penjelasan singkat / slogan pendukung
    theme: 'light' | 'dark';     // Skema warna tampilan (terang atau gelap)
    image: string;               // Jalur file ilustrasi vektor banner
    alt: string;                 // Teks alternatif untuk aksesibilitas gambar
}

export function DashboardBannerCarousel() {
    // Data daftar banner informasi dan tata tertib peminjaman fasilitas
    const slides: SlideData[] = [
        {
            number: '01',
            theme: 'light',
            title: (
                <>
                    Apapun yang dipinjam,
                    <br />
                    pakai dengan <span className="text-[#0256D0]">bijak.</span>
                </>
            ),
            subtitle: (
                <>
                    Fasilitas sekolah, milik bersama.
                    <br />
                    Jaga dan gunakan dengan bertanggung jawab.
                </>
            ),
            image: '/images/banner-slide-1.svg',
            alt: 'Laptop dan Fasilitas IT Praktikum Lab RPL',
        },
        {
            number: '02',
            theme: 'dark',
            title: (
                <>
                    Peminjaman cepat
                    <br />
                    dengan <span className="text-[#38BDF8]">proses simpel.</span>
                </>
            ),
            subtitle: (
                <>
                    Cukup scan, ajukan, dan ambil barang.
                    <br />
                    Semua tercatat secara otomatis.
                </>
            ),
            image: '/images/banner-slide-2.svg',
            alt: 'Peminjaman Cepat dengan Barcode dan QR Scanner',
        },
        {
            number: '03',
            theme: 'light',
            title: (
                <>
                    Proses peminjaman
                    <br />
                    jadi <span className="text-[#0256D0]">lebih mudah.</span>
                </>
            ),
            subtitle: (
                <>
                    Ajukan, pantau, dan kembalikan barang
                    <br />
                    dengan praktis dalam satu sistem.
                </>
            ),
            image: '/images/banner-slide-3.svg',
            alt: 'Proses Peminjaman Praktis dan Mudah di Lab RPL',
        },
        {
            number: '04',
            theme: 'dark',
            title: (
                <>
                    Kembaliin barang,
                    <br />
                    <span className="text-[#38BDF8]">tetap tertib.</span>
                </>
            ),
            subtitle: (
                <>
                    Letakkan pada tempatnya, sistem akan
                    <br />
                    mencatat pengembalian secara otomatis.
                </>
            ),
            image: '/images/banner-slide-4.svg',
            alt: 'Pengembalian Tertib dan Pencatatan Otomatis',
        },
    ];

    // State untuk slide aktif saat ini dan status jeda (pause saat hover)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Ref untuk mencatat koordinat sentuhan swipe pada layar smartphone/tablet
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const totalSlides = slides.length;

    // Fungsi bergulir ke slide berikutnya
    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    // Fungsi bergulir ke slide sebelumnya
    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    // Berpindah langsung ke nomor slide tertentu lewat tombol indikator bulat
    const goToSlide = (idx: number) => {
        setCurrentIndex(idx);
    };

    // Efek otomatis bergeser tiap 4.5 detik (akan dijeda jika pointer mouse berada di atas banner)
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            nextSlide();
        }, 4500);

        return () => clearInterval(timer);
    }, [isPaused, nextSlide]);

    // Handler interaksi sentuhan layar sentuh (touch gesture)
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;
        const diff = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50; // Jarak minimal usap layar agar slide berpindah

        if (diff > minSwipeDistance) {
            nextSlide();
        } else if (diff < -minSwipeDistance) {
            prevSlide();
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    const currentSlide = slides[currentIndex];
    const isDark = currentSlide.theme === 'dark';

    return (
        <div
            className={`group relative w-full overflow-hidden rounded-xl sm:rounded-xl border transition-all duration-500 hover:shadow-md select-none ${
                isDark
                    ? 'border-slate-800 bg-[#081220] shadow-md shadow-blue-950/20'
                    : 'border-slate-200/90 bg-white shadow-xs'
            }`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Ilustrasi sisi kanan banner dengan efek transisi gradasi halus */}
            <div className="absolute right-0 top-0 bottom-0 w-[55%] sm:w-[58%] lg:w-[56%] pointer-events-none overflow-hidden">
                <img
                    key={currentSlide.image}
                    src={currentSlide.image}
                    alt={currentSlide.alt}
                    className="w-full h-full object-cover object-right select-none transition-all duration-700 ease-in-out"
                    draggable={false}
                />
                <div
                    className={`absolute left-0 top-0 bottom-0 w-16 sm:w-28 pointer-events-none transition-colors duration-500 ${
                        isDark
                            ? 'bg-gradient-to-r from-[#081220] via-[#081220]/70 to-transparent'
                            : 'bg-gradient-to-r from-white via-white/70 to-transparent'
                    }`}
                />
            </div>

            {/* Lapisan overlay gradasi untuk layar berukuran kecil (mobile) */}
            <div
                className={`absolute inset-0 pointer-events-none sm:hidden transition-colors duration-500 ${
                    isDark
                        ? 'bg-gradient-to-tr from-[#081220] via-[#081220]/75 to-transparent'
                        : 'bg-gradient-to-tr from-white via-white/75 to-transparent'
                }`}
            />

            {/* Bagian teks headline, nomor urut slide, dan tombol bullet navigasi */}
            <div className="relative z-10 px-5 py-5 sm:px-8 sm:py-7 flex flex-col justify-between min-h-[190px] sm:min-h-[220px]">
                {/* Indikator nomor slide (contoh: 01 / 04) */}
                <div className="flex items-center gap-3">
                    <span
                        className={`text-xs sm:text-sm font-bold tracking-wider transition-colors duration-300 ${
                            isDark ? 'text-slate-300' : 'text-slate-800'
                        }`}
                    >
                        <span className={isDark ? 'text-[#38BDF8]' : 'text-[#0256D0]'}>
                            {currentSlide.number}
                        </span>{' '}
                        / 0{totalSlides}
                    </span>

                    <div
                        className={`w-12 sm:w-16 h-[2px] rounded-full transition-colors duration-300 ${
                            isDark ? 'bg-slate-700' : 'bg-slate-200'
                        }`}
                    />
                </div>

                {/* Konten Judul Utama dan Deskripsi Singkat */}
                <div className="my-2 sm:my-3 max-w-[56%] sm:max-w-[50%] lg:max-w-[48%]">
                    <h2
                        key={`title-${currentIndex}`}
                        className={`text-base sm:text-2xl lg:text-[26px] font-black tracking-tight leading-[1.25] transition-all duration-300 ${
                            isDark ? 'text-white' : 'text-slate-900'
                        }`}
                    >
                        {currentSlide.title}
                    </h2>

                    <p
                        key={`sub-${currentIndex}`}
                        className={`mt-2 text-[11px] sm:text-xs font-medium leading-relaxed line-clamp-2 transition-all duration-300 ${
                            isDark ? 'text-slate-300' : 'text-slate-500'
                        }`}
                    >
                        {currentSlide.subtitle}
                    </p>
                </div>

                {/* Titik indikator pagination slide bulat di bawah */}
                <div className="flex items-center gap-2 pt-1">
                    {slides.map((_, idx) => {
                        const isActive = idx === currentIndex;
                        return (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => goToSlide(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                                className={`transition-all duration-300 h-2 rounded-full cursor-pointer ${
                                    isActive
                                        ? isDark
                                            ? 'w-7 sm:w-8 bg-[#38BDF8] shadow-xs shadow-sky-400/40'
                                            : 'w-7 sm:w-8 bg-[#0B192C]'
                                        : isDark
                                          ? 'w-2 bg-slate-700 hover:bg-slate-600'
                                          : 'w-2 bg-slate-300 hover:bg-slate-400'
                                }`}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Tombol panah geser kiri dan kanan (tampil saat mouse diarahkan ke banner pada layar laptop/PC) */}
            <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className={`hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full shadow-xs items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer ${
                    isDark
                        ? 'bg-slate-900/90 border border-slate-700 text-slate-200 hover:bg-slate-800'
                        : 'bg-white/90 border border-slate-200 text-slate-700 hover:bg-white'
                }`}
            >
                <ChevronLeft className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className={`hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full shadow-xs items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer ${
                    isDark
                        ? 'bg-slate-900/90 border border-slate-700 text-slate-200 hover:bg-slate-800'
                        : 'bg-white/90 border border-slate-200 text-slate-700 hover:bg-white'
                }`}
            >
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}
