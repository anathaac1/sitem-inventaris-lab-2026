import { Lock, LogOut, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileSecurityCardProps {
    onOpenEditModal: () => void;
    onOpenPasswordModal: () => void;
    onLogout: () => void;
}

export function ProfileSecurityCard({
    onOpenEditModal,
    onOpenPasswordModal,
    onLogout
}: ProfileSecurityCardProps) {
    return (
        <div className="bg-white rounded-xl border border-zinc-200 p-4 space-y-3 shadow-2xs">
            <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-wider text-slate-400">
                Pengaturan Akun & Keamanan
            </h3>

            <div className="space-y-2">
                <Button
                    variant="outline"
                    onClick={onOpenEditModal}
                    className="w-full justify-start text-xs h-10 border-zinc-200 text-zinc-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors cursor-pointer"
                >
                    <Edit3 className="w-4 h-4 mr-2 text-blue-500" />
                    Edit Informasi Profil
                </Button>

                <Button
                    variant="outline"
                    onClick={onOpenPasswordModal}
                    className="w-full justify-start text-xs h-10 border-zinc-200 text-zinc-700 hover:bg-zinc-50 cursor-pointer"
                >
                    <Lock className="w-4 h-4 mr-2 text-zinc-500" />
                    Ubah Kata Sandi
                </Button>

                <Button
                    variant="outline"
                    onClick={onLogout}
                    className="w-full justify-start text-xs h-10 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                >
                    <LogOut className="w-4 h-4 mr-2 text-red-500" />
                    Keluar dari Aplikasi
                </Button>
            </div>
        </div>
    );
}
