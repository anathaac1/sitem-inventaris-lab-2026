/**
 * ============================================================================
 * Folder  : resources/js/pages/auth/
 * Fungsi  : Direktori halaman autentikasi pengguna (masuk akun, lupa sandi, registrasi).
 * File    : login.tsx
 * Fungsi  : Halaman formulir login interaktif dengan efek amplop origami terbelah saat kursor diarahkan (hover),
 *           mendukung autentikasi role Siswa dan Admin ke backend Laravel Fortify, toggle lihat kata sandi,
 *           checkbox 'Ingat Saya', serta penanganan pesan galat kredensial.
 * ============================================================================
 */

import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Eye, EyeOff, MousePointer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

type Props = {
    status?: string;                          // Status pesan dari sesi Laravel (misal: "Password berhasil direset")
};

export default function Login({ status }: Props) {
    // State input formulir
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // State interaksi efek animasi lipatan kartu login (hover, fokus input, atau sentuhan mobile)
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isTouchOpen, setIsTouchOpen] = useState(false);

    // Kartu amplop terbuka jika disentuh, kursor diarahkan, atau ada teks yang sedang diketik
    const isOpen = isHovered || isTouchOpen || (isFocused && (username.length > 0 || password.length > 0));

    // Menangani pengiriman formulir login ke endpoint POST /login
    const handleLogin = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        const cleanUsername = username.trim().toLowerCase();

        router.post('/login', {
            email: cleanUsername,
            password: password,
            remember: rememberMe,
        }, {
            onError: (errors) => {
                setIsLoading(false);
                const msg = errors.email || errors.username || errors.password || 'Username atau password salah. Silakan periksa kembali kredensial Anda.';
                setErrorMessage(msg);
                toast.error(msg);
            },
            onSuccess: () => {
                setIsLoading(false);
                toast.success('Login berhasil!');
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F0F7FF] via-[#E4EFFD] to-[#D8E8FA] flex flex-col justify-center items-center px-4 py-8 sm:p-6 selection:bg-[#0256D0] selection:text-white relative overflow-hidden">
            {/* Tag metadata judul halaman browser */}
            <Head title="Masuk - Sistem Inventaris Lab RPL" />

            {/* Elemen latar belakang lingkaran blur gradasi biru modern */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-[#0284C7] via-[#38BDF8] to-[#0256D0] rounded-full blur-3xl opacity-40 pointer-events-none animate-pulse" />
            <div className="absolute -top-20 -right-20 w-[420px] h-[420px] bg-gradient-to-bl from-[#0369A1] via-[#0256D0] to-[#1D4ED8] rounded-full blur-3xl opacity-35 pointer-events-none" />
            <div className="absolute -bottom-24 -left-20 w-[440px] h-[440px] bg-gradient-to-tr from-[#38BDF8] via-[#0284C7] to-[#0256D0] rounded-full blur-3xl opacity-35 pointer-events-none" />
            <div className="absolute -bottom-28 -right-24 w-[460px] h-[460px] bg-gradient-to-tl from-[#1E3A8A] via-[#0256D0] to-[#0284C7] rounded-full blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#0256d015_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />
            <div className="absolute top-1/4 right-[12%] w-28 h-28 rounded-full border-2 border-blue-400/25 blur-[0.5px] pointer-events-none hidden md:block" />
            <div className="absolute bottom-1/4 left-[10%] w-36 h-36 rounded-full border-2 border-sky-300/30 blur-[0.5px] pointer-events-none hidden md:block" />

            {/* Kotak Kontainer Kartu Login Utama */}
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    if (!username && !password) {
                        setIsFocused(false);
                        setIsTouchOpen(false);
                    }
                }}
                onClick={() => {
                    if (!isOpen) setIsTouchOpen(true);
                }}
                className={`relative w-full max-w-[340px] sm:max-w-[400px] min-h-[490px] sm:min-h-[520px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer select-none sm:select-auto ${
                    isOpen
                        ? 'shadow-2xl shadow-blue-900/20 ring-4 ring-white/70'
                        : 'shadow-2xl shadow-blue-900/20 ring-4 ring-white/50 hover:shadow-blue-700/30 active:scale-[0.99]'
                }`}
            >
                {/* Konten Formulir Bagian Dalam */}
                <div
                    className="absolute inset-0 bg-white z-10 flex flex-col justify-between p-5 sm:p-7 cursor-default overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header Logo dan Salam Pembuka */}
                    <div className="flex flex-col items-center text-center pt-1">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-blue-100 bg-blue-50/70 flex items-center justify-center p-2 mb-2 shadow-xs">
                            <img
                                src="/images/app-logo.png"
                                alt="Logo PinjamYuk"
                                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                            />
                        </div>
                        <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
                            Selamat Datang!
                        </h1>
                        <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                            Masuk untuk melanjutkan ke sistem lab
                        </p>
                    </div>

                    {/* Formulir Input Kredensial */}
                    <form onSubmit={handleLogin} className="space-y-3.5 my-auto py-2">
                        {/* Input Username */}
                        <div className="space-y-1">
                            <Label htmlFor="username" className="text-xs font-semibold text-slate-700">
                                Username
                            </Label>
                            <input
                                id="username"
                                type="text"
                                required
                                value={username}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setErrorMessage('');
                                }}
                                autoComplete="username"
                                placeholder="Masukkan username anda"
                                className="w-full rounded-xl py-2.5 px-3.5 text-xs text-slate-900 bg-slate-50/70 border border-slate-300 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0] transition-colors"
                            />
                        </div>

                        {/* Input Password dengan Toggle Lihat/Sembunyi */}
                        <div className="space-y-1">
                            <Label htmlFor="password" className="text-xs font-semibold text-slate-700">
                                Password
                            </Label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrorMessage('');
                                    }}
                                    autoComplete="current-password"
                                    placeholder="Masukkan password anda"
                                    className="w-full rounded-xl py-2.5 pl-3.5 pr-10 text-xs text-slate-900 bg-slate-50/70 border border-slate-300 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#0256D0] focus:ring-1 focus:ring-[#0256D0] transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1.5"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Checkbox Ingat Saya */}
                        <div className="flex items-center space-x-2 pt-0.5">
                            <Checkbox
                                id="remember"
                                checked={rememberMe}
                                onCheckedChange={(checked) => setRememberMe(!!checked)}
                                className="rounded border-slate-300 data-[state=checked]:bg-[#0256D0] data-[state=checked]:border-[#0256D0]"
                            />
                            <Label
                                htmlFor="remember"
                                className="text-xs font-normal text-slate-600 cursor-pointer select-none"
                            >
                                Ingat Saya
                            </Label>
                        </div>

                        {/* Notifikasi Pesan Kesalahan */}
                        {errorMessage && (
                            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium leading-relaxed">
                                {errorMessage}
                            </div>
                        )}

                        {/* Notifikasi Status Sesi */}
                        {status && (
                            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                                {status}
                            </div>
                        )}

                        {/* Tombol Masuk */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 sm:py-3 rounded-xl bg-[#0256D0] hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                        >
                            {isLoading ? 'Memproses...' : 'Masuk'}
                        </Button>
                    </form>

                    {/* Footer Hak Cipta */}
                    <div className="pt-3 border-t border-slate-100 text-center">
                        <p className="text-[11px] text-slate-400 font-medium">
                            Copyright 2026 © All rights reserved.
                        </p>
                    </div>
                </div>

                {/* Layer Animasi Amplop Origami 4 Sisi (Membuka ke sudut luar saat disentuh/hover) */}
                {/* Segitiga Atas-Kiri */}
                <div
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 50% 50%, 0 50%)',
                    }}
                    className={`absolute inset-0 z-20 bg-gradient-to-br from-[#0256D0] to-[#1D4ED8] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen
                            ? '-translate-x-[55%] -translate-y-[55%] pointer-events-none'
                            : 'translate-x-0 translate-y-0'
                    }`}
                >
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
                </div>

                {/* Segitiga Atas-Kanan */}
                <div
                    style={{
                        clipPath: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)',
                    }}
                    className={`absolute inset-0 z-20 bg-gradient-to-bl from-[#0284C7] to-[#0EA5E9] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen
                            ? 'translate-x-[55%] -translate-y-[55%] pointer-events-none'
                            : 'translate-x-0 translate-y-0'
                    }`}
                >
                    <div className="absolute inset-0 bg-black/5" />
                </div>

                {/* Segitiga Bawah-Kiri */}
                <div
                    style={{
                        clipPath: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)',
                    }}
                    className={`absolute inset-0 z-20 bg-gradient-to-tr from-[#1E40AF] to-[#3B82F6] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen
                            ? '-translate-x-[55%] translate-y-[55%] pointer-events-none'
                            : 'translate-x-0 translate-y-0'
                    }`}
                >
                    <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Segitiga Bawah-Kanan */}
                <div
                    style={{
                        clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)',
                    }}
                    className={`absolute inset-0 z-20 bg-gradient-to-tl from-[#0B192C] to-[#1E293B] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen
                            ? 'translate-x-[55%] translate-y-[55%] pointer-events-none'
                            : 'translate-x-0 translate-y-0'
                    }`}
                >
                    <div className="absolute inset-0 bg-white/5" />
                </div>

                {/* Segel Ikon Logo PinjamYuk di Tengah Amplop Sebelum Terbuka */}
                <div
                    className={`absolute inset-0 z-30 flex flex-col items-center justify-center transition-all duration-500 pointer-events-none ${
                        isOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                    }`}
                >
                    <div className="relative">
                        <div className="absolute -inset-3 bg-white/30 rounded-full blur-md animate-pulse" />
                        <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-2xl flex items-center justify-center p-3 border-2 border-white/80 relative">
                            <img
                                src="/images/app-logo.png"
                                alt="PinjamYuk Lab RPL"
                                className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-xs"
                            />
                        </div>
                    </div>

                    <div className="mt-5 text-center px-4">
                        <h2 className="text-white font-extrabold text-base tracking-wide flex items-center justify-center gap-1.5 drop-shadow-md">
                            <span>PinjamYuk!</span>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
