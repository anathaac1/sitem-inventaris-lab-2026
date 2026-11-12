import React, { useState, useRef, useEffect } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Box,
    ClipboardList,
    Users,
    LogOut,
    ChevronRight,
    ChevronDown,
    User
} from 'lucide-react';
import { ProfileModal } from '@/pages/admin/profile/profile-modal';

interface AdminLayoutProps {
    children: React.ReactNode;
    currentTab?: 'dashboard' | 'alat' | 'peminjaman' | 'siswa' | 'profile';
    title?: string;
    description?: string;
    actions?: React.ReactNode;
}

export function AdminLayout({
    children,
    currentTab = 'dashboard',
    title = 'Dashboard Admin'
}: AdminLayoutProps) {
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const { auth, adminCounts } = usePage().props as unknown as {
        auth?: { user?: { name: string; username: string; role: string; class?: string } };
        adminCounts?: { items: number; activeLoans: number; students: number };
    };
    const currentUser = auth?.user;

    const counts = adminCounts || {
        items: 0,
        activeLoans: 0,
        students: 0
    };

    const handleLogout = () => {
        router.post('/logout', {}, {
            onFinish: () => {
                router.visit('/login');
            }
        });
    };

    const adminName = currentUser?.name || 'Bambang Haryanto, S.T.';
    const adminRole = currentUser?.class || 'Kepala Lab';
    const adminInitials = adminName
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    const navTabs = [
        {
            id: 'dashboard',
            label: 'Ringkasan & Metrik',
            href: '/admin',
            icon: LayoutDashboard,
            badge: null
        },
        {
            id: 'alat',
            label: 'Data Inventaris & Alat',
            href: '/admin/alat',
            icon: Box,
            badge: counts.items > 0 ? `${counts.items} Alat` : null
        },
        {
            id: 'peminjaman',
            label: 'Log Peminjaman Siswa',
            href: '/admin/peminjaman',
            icon: ClipboardList,
            badge: counts.activeLoans > 0 ? `${counts.activeLoans} Aktif` : null,
            badgeColor: counts.activeLoans > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
        },
        {
            id: 'siswa',
            label: 'Akun & Password',
            href: '/admin/siswa',
            icon: Users,
            badge: counts.students > 0 ? `${counts.students} Akun` : null
        }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans antialiased selection:bg-[#0256D0] selection:text-white">
            <header className="relative bg-gradient-to-r from-[#0256D0] via-[#0448AB] to-[#0A1C38] text-white shadow-sm z-30 select-none">
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '24px 24px'
                    }}
                />

                <div className="relative px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <Link href="/admin" className="flex items-center gap-3 shrink-0">
                            <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-xs border border-white/25 flex items-center justify-center p-1 shadow-xs">
                                <img
                                    src="/images/app-logo.png"
                                    alt="Logo Lab RPL"
                                    className="w-7 h-7 object-contain drop-shadow-xs"
                                />
                            </div>
                            <div className="block leading-tight">
                                <span className="font-black text-sm tracking-wide uppercase text-white flex items-center gap-1.5">
                                    SMKN 1 KOTA BEKASI
                                </span>
                                <span className="block text-[10px] text-blue-200/90 font-medium tracking-wider uppercase">
                                    Rekayasa Perangkat Lunak
                                </span>
                            </div>
                        </Link>

                        <div className="hidden lg:flex items-center gap-2 text-xs pl-4 border-l border-white/20 text-blue-100/90">
                            <span className="font-medium opacity-80">Laboratorium RPL</span>
                            <ChevronRight className="w-3.5 h-3.5 text-blue-300/60" />
                            <span className="font-semibold text-white truncate max-w-xs">{title}</span>
                        </div>
                    </div>

                    <div className="relative shrink-0" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setDropdownOpen((prev) => !prev)}
                            className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl transition-all group cursor-pointer border ${
                                dropdownOpen
                                    ? 'bg-white/20 border-white/40 shadow-xs'
                                    : 'border-transparent hover:bg-white/10'
                            }`}
                            title="Menu Profil Administrator"
                            aria-expanded={dropdownOpen}
                        >
                            <div className="w-8 h-8 rounded-full bg-white text-[#0256D0] font-black text-xs flex items-center justify-center shadow-xs border border-white/40 group-hover:scale-105 transition-transform shrink-0">
                                {adminInitials}
                            </div>
                            <div className="hidden sm:block text-left leading-tight">
                                <p className="text-xs font-bold text-white leading-none">{adminName}</p>
                                <p className="text-[10px] text-blue-200 mt-0.5">{adminRole}</p>
                            </div>
                            <ChevronDown
                                className={`w-3.5 h-3.5 text-blue-200 transition-transform duration-200 ${
                                    dropdownOpen ? 'rotate-180 text-white' : ''
                                }`}
                            />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#202C33] text-[#E9EDEF] shadow-2xl border border-slate-700/60 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        setProfileModalOpen(true);
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-[#E9EDEF] hover:bg-[#111B21] transition-colors cursor-pointer text-left"
                                >
                                    <User className="w-4 h-4 text-slate-400" />
                                    <span>Profile Saya</span>
                                </button>
                                <div className="h-px bg-slate-700/50 my-1 mx-2"></div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDropdownOpen(false);
                                        handleLogout();
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-[#111B21] transition-colors cursor-pointer text-left"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Keluar</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <ProfileModal
                isOpen={profileModalOpen}
                onClose={() => setProfileModalOpen(false)}
                session={null}
                user={currentUser}
                onLogout={handleLogout}
            />

            <div className="sticky top-0 z-20 bg-white border-b border-slate-200/90 shadow-2xs select-none">
                <div className="px-4 sm:px-6 flex items-center justify-between gap-4">
                    <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto scrollbar-none py-1">
                        {navTabs.map((tab) => {
                            const isActive = currentTab === tab.id;
                            const Icon = tab.icon;
                            return (
                                <Link
                                    key={tab.id}
                                    href={tab.href}
                                    className={`relative flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs font-medium transition-all whitespace-nowrap rounded-t-md ${
                                        isActive
                                            ? 'text-[#0256D0] font-bold border-b-2 border-[#0256D0] bg-blue-50/40'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-b-2 border-transparent'
                                    }`}
                                >
                                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#0256D0]' : 'text-slate-400'}`} />
                                    <span>{tab.label}</span>
                                    {tab.badge && (
                                        <span
                                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1 ${
                                                tab.badgeColor
                                                    ? tab.badgeColor
                                                    : isActive
                                                    ? 'bg-blue-100 text-[#0256D0]'
                                                    : 'bg-slate-100 text-slate-500'
                                            }`}
                                        >
                                            {tab.badge}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            <div className="flex-1 flex min-w-0">
                <main className="flex-1 min-w-0 px-4 sm:px-6 py-5 sm:py-6 w-full">
                    {children}
                </main>
            </div>

            <footer className="py-4 border-t border-slate-200/80 bg-white text-center text-xs text-slate-400 select-none">
                Sistem Inventaris Lab Rekayasa Perangkat Lunak • SMKN 1 Kota Bekasi © 2026
            </footer>
        </div>
    );
}
