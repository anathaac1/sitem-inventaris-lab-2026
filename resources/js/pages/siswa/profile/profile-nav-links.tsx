import { Link } from '@inertiajs/react';
import { ClipboardList, Home, Box, ChevronRight, type LucideIcon } from 'lucide-react';

interface NavLinkItem {
    title: string;
    desc: string;
    icon: LucideIcon;
    href: string;
}

export function ProfileNavLinks() {
    const menuLinks: NavLinkItem[] = [
        {
            title: 'Peminjaman Saya',
            desc: 'Cek barang aktif dan riwayat peminjaman',
            icon: ClipboardList,
            href: '/peminjaman'
        },
        {
            title: 'Home / Beranda',
            desc: 'Kembali ke katalog utama laboratorium',
            icon: Home,
            href: '/dashboard'
        },
        {
            title: 'Semua Alat',
            desc: 'Daftar inventaris lengkap laboratorium RPL',
            icon: Box,
            href: '/alat'
        }
    ];

    return (
        <div className="bg-white rounded-xl border border-zinc-200 divide-y divide-zinc-100 shadow-2xs">
            {menuLinks.map((item) => {
                const Icon = item.icon;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center justify-between p-3.5 hover:bg-zinc-50 transition-colors cursor-pointer group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                <Icon className="w-4 h-4" />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold text-zinc-900">
                                    {item.title}
                                </h4>
                                <p className="text-[11px] text-zinc-500">{item.desc}</p>
                            </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                );
            })}
        </div>
    );
}
