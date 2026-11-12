import { ChevronLeft, Edit3 } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface ProfileHeaderProps {
    onOpenEditModal?: () => void;
}

export function ProfileHeader({ onOpenEditModal }: ProfileHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
                <Link
                    href="/admin"
                    className="w-9 h-9 rounded flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
                    title="Kembali ke Dashboard Admin"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900">
                        Profil Administrator
                    </h1>
                    <p className="text-xs text-slate-500">
                        Informasi akun penanggung jawab dan pengelolaan akses laboratorium
                    </p>
                </div>
            </div>

            {onOpenEditModal && (
                <button
                    type="button"
                    onClick={onOpenEditModal}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium text-xs transition-colors cursor-pointer border border-blue-200/60 shadow-2xs"
                >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Profil</span>
                </button>
            )}
        </div>
    );
}
