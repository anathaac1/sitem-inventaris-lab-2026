/**
 * ============================================================================
 * Folder  : resources/js/data/
 * Fungsi  : Menyimpan model data tiruan (mock data), data master, dan fungsi penyimpanan lokal (localStorage).
 * File    : inventory-data.ts
 * Fungsi  : Menyediakan struktur tipe data, katalog awal peralatan lab (laptop, charger, tools, dll),
 *           riwayat peminjaman, profil siswa contoh, serta fungsi sinkronisasi inventaris lokal.
 * ============================================================================
 */

/**
 * Struktur objek barang inventaris lab (InventoryItem)
 */
export interface InventoryItem {
    id: string;                               // ID unik barang
    name: string;                             // Nama barang / alat
    category: 'Laptop' | 'Peripheral' | 'Tools' | 'Elektrikal'; // Kategori inventaris
    code: string;                             // Kode inventaris barang (contoh: EL-001)
    stock: number;                            // Jumlah unit yang saat ini tersedia untuk dipinjam
    total: number;                            // Total keseluruhan unit yang dimiliki lab
    description: string;                      // Deskripsi fungsional barang
    image?: string | null;                    // Nama file gambar
    imageUrl?: string | null;                 // URL lengkap pratinjau gambar
    imageSizeFormatted?: string | null;       // Ukuran file gambar yang diformat (misal: "1.2 MB")
    specs: Record<string, string>;            // Rincian spesifikasi teknis barang
    iconType: 'laptop' | 'charger' | 'mouse' | 'lan' | 'headset' | 'power' | 'screwdriver' | 'speaker' | 'keyboard' | 'scissors' | 'flashdisk'; // Tipe ikon ilustrasi
    status: 'Tersedia' | 'Dipinjam';          // Status ketersediaan umum
    isVisibleToStudents?: boolean;            // Hak visibilitas apakah barang dapat dilihat oleh siswa
}

/**
 * Struktur data transaksi peminjaman barang (LoanItem)
 */
export interface LoanItem {
    id: string;                               // ID transaksi peminjaman
    itemId: string;                           // ID barang yang dipinjam
    itemName: string;                         // Nama barang yang dipinjam
    code: string;                             // Kode barang
    category: string;                         // Kategori barang
    borrowDate: string;                       // Tanggal peminjaman
    returnEstimate: string;                   // Estimasi tanggal pengembalian
    returnDate?: string;                      // Tanggal aktual barang dikembalikan
    status: 'Sedang Dipinjam' | 'Dikembalikan'; // Status transaksi
    borrowerName: string;                     // Nama lengkap siswa peminjam
    borrowerClass: string;                    // Kelas siswa peminjam
    notes?: string;                           // Catatan keperluan peminjaman
}

// Daftar kategori filter peralatan
export const CATEGORIES = ['Semua', 'Laptop', 'Peripheral', 'Tools', 'Elektrikal'] as const;

/**
 * Data katalog awal alat dan fasilitas laboratorium RPL
 */
export const INVENTORY_ITEMS: InventoryItem[] = [
    {
        id: 'laptop-lenovo',
        name: 'Laptop Lenovo',
        category: 'Laptop',
        code: 'EL-001',
        stock: 36,
        total: 40,
        description: 'Laptop Lenovo ThinkPad dengan spesifikasi Intel Core i5, RAM 8GB, SSD 256GB. Cocok untuk kegiatan praktikum apalagi buat ngoding.',
        specs: {
            'Tipe': 'Lenovo ThinkPad L14',
            'Processor': 'Intel Core i5-1135G7',
            'RAM': '8 GB DDR4',
            'Penyimpanan': 'SSD 256 GB NVMe',
            'Layar': '14" Full HD IPS'
        },
        iconType: 'laptop',
        status: 'Tersedia'
    },
    {
        id: 'laptop-acer',
        name: 'Laptop Acer',
        category: 'Laptop',
        code: 'EL-002',
        stock: 36,
        total: 40,
        description: 'Laptop Acer Aspire 5 bertenaga Intel Core i5 generasi terbaru dengan layar jernih untuk praktikum multimedia dan pemrograman.',
        specs: {
            'Tipe': 'Acer Aspire 5 A514',
            'Processor': 'Intel Core i5-1135G7',
            'RAM': '8 GB DDR4',
            'Penyimpanan': 'SSD 512 GB NVMe',
            'Layar': '14" FHD Acer ComfyView'
        },
        iconType: 'laptop',
        status: 'Tersedia'
    },
    {
        id: 'charger-lenovo',
        name: 'Charger Lenovo',
        category: 'Elektrikal',
        code: 'EL-003',
        stock: 36,
        total: 40,
        description: 'Adaptor charger original Lenovo 65W Type-C fast charging untuk laptop lab.',
        specs: {
            'Daya': '65 Watt',
            'Konektor': 'USB Type-C',
            'Panjang Kabel': '1.8 Meter',
            'Input': '100-240V ~ 50/60Hz'
        },
        iconType: 'charger',
        status: 'Tersedia'
    },
    {
        id: 'charger-acer',
        name: 'Charger Acer',
        category: 'Elektrikal',
        code: 'EL-004',
        stock: 36,
        total: 40,
        description: 'Adaptor charger original Acer 45W barrel connector dengan kabel tahan panas.',
        specs: {
            'Daya': '45 Watt',
            'Konektor': 'DC Barrel 3.0 x 1.1mm',
            'Panjang Kabel': '1.5 Meter',
            'Input': '100-240V ~ 50/60Hz'
        },
        iconType: 'charger',
        status: 'Tersedia'
    },
    {
        id: 'mouse',
        name: 'Mouse',
        category: 'Peripheral',
        code: 'PR-001',
        stock: 36,
        total: 45,
        description: 'Mouse optik USB ergonomis responsif untuk navigasi dan desain UI/UX.',
        specs: {
            'Sensor': 'Optical 1600 DPI',
            'Konektivitas': 'USB 2.0 Wired',
            'Panjang Kabel': '1.5 Meter',
            'Kompatibilitas': 'Windows / Linux / macOS'
        },
        iconType: 'mouse',
        status: 'Tersedia'
    },
    {
        id: 'usb-lan-tp-link',
        name: 'USB Lan Tp-Link',
        category: 'Peripheral',
        code: 'PR-002',
        stock: 36,
        total: 40,
        description: 'Adapter USB to RJ45 Gigabit Ethernet untuk praktikum jaringan komputer dan server.',
        specs: {
            'Kecepatan': '10/100/1000 Mbps Gigabit',
            'Port Input': 'USB 3.0 Type-A',
            'Port Output': 'RJ45 Ethernet',
            'Chipset': 'Realtek RTL8153'
        },
        iconType: 'lan',
        status: 'Tersedia'
    },
    {
        id: 'headset',
        name: 'Headset',
        category: 'Peripheral',
        code: 'PR-003',
        stock: 36,
        total: 38,
        description: 'Headset multimedia dengan mikrofon noise cancelling untuk praktikum audio video dan meeting.',
        specs: {
            'Driver': '40mm Neodymium',
            'Mikrofon': 'Omnidirectional Noise Cancelling',
            'Konektor': '3.5mm Audio Jack + Splitter',
            'Panjang Kabel': '2.0 Meter'
        },
        iconType: 'headset',
        status: 'Tersedia'
    },
    {
        id: 'kabel-roll-listrik',
        name: 'Kabel Roll Listrik',
        category: 'Elektrikal',
        code: 'EL-005',
        stock: 36,
        total: 40,
        description: 'Kabel roll ekstensi 10 meter dengan 4 stopkontak arde berstandar SNI.',
        specs: {
            'Panjang Kabel': '10 Meter',
            'Jumlah Lubang': '4 Stopkontak Arde',
            'Beban Maksimal': '2500 Watt / 10A',
            'Standar': 'SNI 04-3892.1-2006'
        },
        iconType: 'power',
        status: 'Tersedia'
    },
    {
        id: 'obeng-plus',
        name: 'Obeng Plus',
        category: 'Tools',
        code: 'TL-001',
        stock: 36,
        total: 40,
        description: 'Obeng plus magnetik PH1 presisi untuk perakitan PC dan maintenance casing laptop.',
        specs: {
            'Tipe Tip': 'Phillips PH1 Magnetik',
            'Panjang Batang': '100 mm',
            'Material': 'Chrome Vanadium (Cr-V)',
            'Grip': 'Karet Anti Slip'
        },
        iconType: 'screwdriver',
        status: 'Tersedia'
    },
    {
        id: 'obeng-min',
        name: 'Obeng Min',
        category: 'Tools',
        code: 'TL-002',
        stock: 36,
        total: 40,
        description: 'Obeng minus presisi SL3 untuk pembongkaran hardware dan peripheral lab.',
        specs: {
            'Tipe Tip': 'Slotted SL3.0 Magnetik',
            'Panjang Batang': '75 mm',
            'Material': 'Chrome Vanadium (Cr-V)',
            'Grip': 'Karet Anti Slip'
        },
        iconType: 'screwdriver',
        status: 'Tersedia'
    },
    {
        id: 'speaker',
        name: 'Speaker',
        category: 'Peripheral',
        code: 'PR-004',
        stock: 36,
        total: 40,
        description: 'Speaker USB stereo compact dengan kontrol volume suara jernih.',
        specs: {
            'Daya': 'USB 5V Powered (6W RMS)',
            'Konektor': '3.5mm Aux + USB Power',
            'Konfigurasi': '2.0 Channel Stereo',
            'Kontrol': 'In-line Volume Control'
        },
        iconType: 'speaker',
        status: 'Tersedia'
    },
    {
        id: 'keyboard-kabel',
        name: 'Keyboard Kabel',
        category: 'Peripheral',
        code: 'PR-005',
        stock: 36,
        total: 40,
        description: 'Keyboard membran full-size tahan tumpahan air dengan layout standar US.',
        specs: {
            'Layout': '104 Keys Full Size QWERTY',
            'Tipe Switch': 'Membrane Silent Tactile',
            'Konektivitas': 'USB 2.0 Wired (1.5m)',
            'Fitur': 'Spill-resistant design'
        },
        iconType: 'keyboard',
        status: 'Tersedia'
    },
    {
        id: 'gunting-merah',
        name: 'Gunting Merah',
        category: 'Tools',
        code: 'TL-003',
        stock: 36,
        total: 40,
        description: 'Gunting serbaguna stainless steel dengan grip merah ergonomis untuk pemotongan kabel ties dan packaging.',
        specs: {
            'Ukuran': '7.5 Inch (19 cm)',
            'Mata Pisau': 'Heavy Duty Stainless Steel',
            'Gagang': 'ABS Ergonomic Red Handle'
        },
        iconType: 'scissors',
        status: 'Tersedia'
    },
    {
        id: 'keyboard-wireless',
        name: 'Keyboard Wireless',
        category: 'Peripheral',
        code: 'PR-006',
        stock: 36,
        total: 40,
        description: 'Keyboard wireless 2.4GHz slim compact dengan baterai hemat daya.',
        specs: {
            'Konektivitas': 'Wireless 2.4 GHz Nano USB Dongle',
            'Jangkauan': 'Hingga 10 Meter',
            'Daya': '2x AAA Battery',
            'Profil': 'Slim Low-profile Chocolate Keycaps'
        },
        iconType: 'keyboard',
        status: 'Tersedia'
    },
    {
        id: 'flashdisk',
        name: 'Flashdisk',
        category: 'Peripheral',
        code: 'PR-007',
        stock: 36,
        total: 40,
        description: 'Flash drive USB 3.2 64GB transfer cepat untuk bootable OS dan backup tugas.',
        specs: {
            'Kapasitas': '64 GB',
            'Kecepatan': 'Read up to 100 MB/s',
            'Interface': 'USB 3.2 Gen 1 Backward Compatible',
            'Bahan': 'Logam Compact Ringan'
        },
        iconType: 'flashdisk',
        status: 'Tersedia'
    }
];

/**
 * Data peminjaman aktif awal untuk keperluan tampilan dashboard
 */
export const INITIAL_ACTIVE_LOANS: LoanItem[] = [
    {
        id: 'loan-1',
        itemId: 'laptop-lenovo',
        itemName: 'Laptop Lenovo',
        code: 'EL-001',
        category: 'Laptop',
        borrowDate: '14 Oktober 2026',
        returnEstimate: '17 Oktober 2026',
        status: 'Sedang Dipinjam',
        borrowerName: 'Ahmad Rizky Pratama',
        borrowerClass: 'XII RPL A',
        notes: 'Praktikum Web Service & REST API'
    },
    {
        id: 'loan-2',
        itemId: 'laptop-acer',
        itemName: 'Laptop Acer',
        code: 'EL-002',
        category: 'Laptop',
        borrowDate: '15 Oktober 2026',
        returnEstimate: '18 Oktober 2026',
        status: 'Sedang Dipinjam',
        borrowerName: 'Nabila Putri Syahrani',
        borrowerClass: 'XII RPL B',
        notes: 'Desain Wireframe & Prototyping UI/UX'
    },
    {
        id: 'loan-3',
        itemId: 'mouse',
        itemName: 'Mouse',
        code: 'PR-001',
        category: 'Peripheral',
        borrowDate: '16 Oktober 2026',
        returnEstimate: '19 Oktober 2026',
        status: 'Sedang Dipinjam',
        borrowerName: 'Muhammad Fajar Ramadhan',
        borrowerClass: 'XI RPL A',
        notes: 'Praktikum Basis Data MySQL & Query Lanjut'
    },
    {
        id: 'loan-4',
        itemId: 'headset',
        itemName: 'Headset',
        code: 'PR-003',
        category: 'Peripheral',
        borrowDate: '16 Oktober 2026',
        returnEstimate: '19 Oktober 2026',
        status: 'Sedang Dipinjam',
        borrowerName: 'Siti Aisyah Azzahra',
        borrowerClass: 'XI RPL B',
        notes: 'Praktikum Multimedia & Video Editing'
    },
    {
        id: 'loan-5',
        itemId: 'charger-lenovo',
        itemName: 'Charger Lenovo',
        code: 'EL-003',
        category: 'Elektrikal',
        borrowDate: '17 Oktober 2026',
        returnEstimate: '20 Oktober 2026',
        status: 'Sedang Dipinjam',
        borrowerName: 'Dimas Arya Saputra',
        borrowerClass: 'X RPL A',
        notes: 'Praktikum Pemrograman Dasar'
    },
    {
        id: 'loan-6',
        itemId: 'keyboard-wireless',
        itemName: 'Keyboard Wireless',
        code: 'PR-006',
        category: 'Peripheral',
        borrowDate: '17 Oktober 2026',
        returnEstimate: '20 Oktober 2026',
        status: 'Sedang Dipinjam',
        borrowerName: 'Zahra Amelia Dewi',
        borrowerClass: 'X RPL B',
        notes: 'Praktikum Algoritma Pemrograman'
    }
];

/**
 * Data riwayat peminjaman yang sudah selesai / dikembalikan
 */
export const INITIAL_LOAN_HISTORY: LoanItem[] = [
    {
        id: 'hist-1',
        itemId: 'keyboard-wireless',
        itemName: 'Keyboard Wireless',
        code: 'PR-006',
        category: 'Peripheral',
        borrowDate: '11 Oktober 2026',
        returnEstimate: '13 Oktober 2026',
        returnDate: '13 Oktober 2026',
        status: 'Dikembalikan',
        borrowerName: 'Siti Aisyah Azzahra',
        borrowerClass: 'XI RPL B',
        notes: 'Input data evaluasi praktikum'
    },
    {
        id: 'hist-2',
        itemId: 'screwdriver',
        itemName: 'Tool Kit Obeng',
        code: 'TL-001',
        category: 'Tools',
        borrowDate: '8 Oktober 2026',
        returnEstimate: '9 Oktober 2026',
        returnDate: '9 Oktober 2026',
        status: 'Dikembalikan',
        borrowerName: 'Dimas Arya Saputra',
        borrowerClass: 'X RPL A',
        notes: 'Perakitan komponen PC & cleaning fan'
    },
    {
        id: 'hist-3',
        itemId: 'lan-tester',
        itemName: 'LAN Cable Tester',
        code: 'TL-002',
        category: 'Tools',
        borrowDate: '5 Oktober 2026',
        returnEstimate: '6 Oktober 2026',
        returnDate: '6 Oktober 2026',
        status: 'Dikembalikan',
        borrowerName: 'Zahra Amelia Dewi',
        borrowerClass: 'X RPL B',
        notes: 'Uji konektivitas kabel UTP RJ-45'
    },
    {
        id: 'hist-4',
        itemId: 'charger-lenovo',
        itemName: 'Charger Lenovo',
        code: 'EL-003',
        category: 'Elektrikal',
        borrowDate: '2 Oktober 2026',
        returnEstimate: '3 Oktober 2026',
        returnDate: '3 Oktober 2026',
        status: 'Dikembalikan',
        borrowerName: 'Ahmad Rizky Pratama',
        borrowerClass: 'XII RPL A',
        notes: 'Praktikum Ujian Sertifikasi Kompetensi'
    },
    {
        id: 'hist-5',
        itemId: 'flashdisk',
        itemName: 'Flashdisk',
        code: 'PR-007',
        category: 'Peripheral',
        borrowDate: '28 September 2026',
        returnEstimate: '29 September 2026',
        returnDate: '29 September 2026',
        status: 'Dikembalikan',
        borrowerName: 'Muhammad Fajar Ramadhan',
        borrowerClass: 'XI RPL A',
        notes: 'Backup source code proyek Laravel'
    }
];

/**
 * Data contoh identitas siswa yang sedang aktif
 */
export const USER_PROFILE = {
    name: 'Ahmad Rizky Pratama',
    role: 'Siswa / Peminjam',
    class: 'XII RPL A | Rekayasa Perangkat Lunak',
    school: 'SMKN 1 Kota Bekasi',
    email: 'siswa1@smkn1.sch.id',
    nisn: '0067829101',
    phone: '0812-9876-1101'
};

const ITEMS_STORAGE_KEY = 'lab_inventory_items_v1';
const LOANS_STORAGE_KEY = 'lab_inventory_loans_v4';

/**
 * Mengambil daftar inventaris barang dari localStorage
 */
export function getStoredItems(): InventoryItem[] {
    if (typeof window === 'undefined') {
        return INVENTORY_ITEMS;
    }
    try {
        const data = localStorage.getItem(ITEMS_STORAGE_KEY);
        if (!data) {
            localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(INVENTORY_ITEMS));
            return INVENTORY_ITEMS;
        }
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : INVENTORY_ITEMS;
    } catch {
        return INVENTORY_ITEMS;
    }
}

/**
 * Menyimpan pembaruan data barang inventaris ke localStorage dan menyiarkan event perubahan
 */
export function saveStoredItems(items: InventoryItem[]): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
        window.dispatchEvent(new CustomEvent('inventory_items_changed', { detail: items }));
    } catch (e) {
        console.error('Failed to save inventory items:', e);
    }
}

/**
 * Mengambil data seluruh transaksi peminjaman (aktif & riwayat) dari localStorage
 */
export function getStoredLoans(): LoanItem[] {
    const defaultList = [...INITIAL_ACTIVE_LOANS, ...INITIAL_LOAN_HISTORY];
    if (typeof window === 'undefined') {
        return defaultList;
    }
    try {
        const data = localStorage.getItem(LOANS_STORAGE_KEY);
        if (!data) {
            localStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(defaultList));
            return defaultList;
        }
        const parsed = JSON.parse(data);
        const hasLegacyKenho = Array.isArray(parsed) && parsed.some((l: LoanItem) => l.borrowerName === 'Kenho Imut');
        if (hasLegacyKenho || !Array.isArray(parsed) || parsed.length === 0) {
            localStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(defaultList));
            return defaultList;
        }
        return parsed.map((loan: LoanItem) => ({
            ...loan,
            borrowerClass: loan.borrowerClass
                ? loan.borrowerClass.replace(/RPL\s*1\b/gi, 'RPL A').replace(/RPL\s*2\b/gi, 'RPL B')
                : 'XII RPL A'
        }));
    } catch {
        return defaultList;
    }
}

/**
 * Menyimpan pembaruan daftar peminjaman ke localStorage dan menyiarkan event perubahan
 */
export function saveStoredLoans(loans: LoanItem[]): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(loans));
        window.dispatchEvent(new CustomEvent('inventory_loans_changed', { detail: loans }));
    } catch (e) {
        console.error('Failed to save loans:', e);
    }
}
