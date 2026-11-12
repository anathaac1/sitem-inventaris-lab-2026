import { AlertCircle } from 'lucide-react';
import type { InventoryItem } from '@/data/inventory-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface AlatDeleteModalProps {
    item: InventoryItem | null;
    onClose: () => void;
    onConfirm: () => void;
}

export function AlatDeleteModal({ item, onClose, onConfirm }: AlatDeleteModalProps) {
    return (
        <Dialog open={!!item} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-sm p-5 rounded-2xl border border-slate-200 bg-white shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        <span>Konfirmasi Hapus Alat</span>
                    </DialogTitle>
                </DialogHeader>

                <p className="text-xs text-slate-600 py-2">
                    Apakah Anda yakin ingin menghapus perangkat <strong className="text-slate-900">{item?.name}</strong> ({item?.code}) dari daftar inventaris laboratorium? Tindakan ini tidak dapat dibatalkan.
                </p>

                <DialogFooter className="pt-2 flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="h-8 rounded-lg text-xs border-slate-200 font-medium"
                    >
                        Batal
                    </Button>
                    <Button
                        type="button"
                        onClick={onConfirm}
                        className="h-8 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3 cursor-pointer"
                    >
                        Ya, Hapus Alat
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
