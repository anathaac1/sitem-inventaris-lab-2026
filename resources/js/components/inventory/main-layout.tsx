import React, { useEffect, useState, useRef } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Home,
    Box,
    ClipboardList,
    User,
    LogOut,
    ChevronDown
} from 'lucide-react';
import { toast } from 'sonner';
import { ProfileModal } from '@/pages/siswa/profile/profile-modal';

interface MainLayoutProps {
    children: React.ReactNode;
    currentTab?: 'home' | 'alat' | 'peminjaman' | 'profile';
    title?: string;
}

export function MainLayout({ children, currentTab = 'home' }: MainLayoutProps) {
    const { auth } = usePage().props as any;
    const currentUser = auth?.user;

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setMobileMenuOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setDropdownOpen(false);
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const handleLogout = () => {
        router.post('/logout', {}, {
            onFinish: () => {
                toast.info('Anda telah keluar dari sesi.');
                router.visit('/login');
            }
        });
    };

    const studentName = currentUser?.name || 'Ahmad Rizky Pratama';
    const studentClass = currentUser?.class || 'XII RPL A';
    const studentInitials = studentName
        .split(' ')
        .map((n: string) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    const navItems = [
        { id: 'home', label: 'Home', href: '/dashboard', icon: Home },
        { id: 'alat', label: 'Alat', href: '/alat', icon: Box },
        { id: 'peminjaman', label: 'Peminjaman', href: '/peminjaman', icon: ClipboardList }
    ];

    return (
        <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
            <header className="sticky top-0 z-30 bg-white border-b border-zinc-200">
                <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
                    <Link href="/dashboard" className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center p-1 shadow-xs">
                            <img
                                src="/images/app-logo.png"
                                alt="PinjamYuk Lab RPL"
                                className="w-7 h-7 object-contain"
                            />
                        </div>
                        <div>
                            <span className="text-base font-extrabold text-[#0256D0]">
                                Pinjam<span className="text-zinc-900">Yuk!</span>
                            </span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const active = currentTab === item.id;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                                        active
                                            ? 'bg-blue-600 text-white'
                                            : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="relative shrink-0" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setDropdownOpen((prev) => !prev)}
                            className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl transition-all group cursor-pointer border ${
                                dropdownOpen
                                    ? 'bg-zinc-100 border-zinc-300 shadow-2xs'
                                    : 'border-transparent hover:bg-zinc-100'
                            }`}
                            title="Menu Profil Siswa"
                            aria-expanded={dropdownOpen}
                        >
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0256D0] font-bold text-xs flex items-center justify-center shadow-xs border border-blue-200 group-hover:scale-105 transition-transform shrink-0">
                                {studentInitials}
                            </div>
                            <div className="hidden sm:block text-left leading-tight">
                                <p className="text-xs font-bold text-zinc-900 leading-none truncate max-w-[130px]">
                                    {studentName}
                                </p>
                                <p className="text-[10px] text-zinc-500 mt-0.5 truncate max-w-[130px]">
                                    {studentClass}
                                </p>
                            </div>
                            <ChevronDown
                                className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
                                    dropdownOpen ? 'rotate-180 text-zinc-700' : ''
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

            <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-5 pb-20 md:pb-8">
                {children}
            </main>

            <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-zinc-200 px-4 py-1.5 flex items-center justify-center gap-6 translate-x-4">
                {navItems.map((item) => {
                    const active = currentTab === item.id;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`flex flex-col items-center justify-center py-1 px-3 rounded transition-colors ${
                                active
                                    ? 'text-blue-600 font-bold'
                                    : 'text-zinc-400 hover:text-zinc-600'
                            }`}
                        >
                            <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5px]' : ''}`} />
                            <span className="text-[10px] mt-0.5">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}

                <div className="relative" ref={mobileMenuRef}>
                    {mobileMenuOpen && (
                        <div className="absolute bottom-full right-0 mb-3 w-48 rounded-xl bg-[#202C33] text-[#E9EDEF] shadow-2xl border border-slate-700/60 py-1.5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-100">
                            <button
                                type="button"
                                onClick={() => {
                                    setMobileMenuOpen(false);
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
                                    setMobileMenuOpen(false);
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
        </div>
    );
}
