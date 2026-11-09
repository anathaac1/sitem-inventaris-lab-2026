/**
 * ============================================================================
 * Folder  : resources/js/data/
 * Fungsi  : Menyimpan model data tiruan (mock data), konstanta, dan fungsi penyimpanan lokal (localStorage).
 * File    : auth-store.ts
 * Fungsi  : Mengelola data akun pengguna (siswa & admin), validasi sesi, token autentikasi,
 *           serta operasi CRUD akun lokal untuk keperluan demo/offline atau fallback frontend.
 * ============================================================================
 */

/**
 * Struktur data profil akun pengguna (UserAccount)
 */
export interface UserAccount {
    id: string;                               // ID unik akun pengguna
    username: string;                         // Username untuk login
    name: string;                             // Nama lengkap pemilik akun
    class: string;                            // Kelas (untuk siswa) atau jabatan (untuk admin/guru)
    email: string;                            // Alamat email aktif
    password: string;                         // Kata sandi
    role: 'siswa' | 'admin';                  // Hak akses: siswa atau admin
    nisn?: string;                            // Nomor Induk Siswa Nasional (khusus siswa)
    phone?: string;                           // Nomor kontak / WhatsApp
    avatar?: string;                          // Inisial avatar profil
    lastLogin?: string;                       // Waktu terakhir kali login
}

/**
 * Struktur token sesi pengguna aktif
 */
export interface SessionToken {
    token: string;                            // String token unik sesi
    username: string;                         // Username pengguna yang login
    role: 'siswa' | 'admin';                  // Hak akses
    name: string;                             // Nama lengkap
    class: string;                            // Kelas / Unit
    createdAt: number;                        // Timestamp pembuatan sesi
    expiresAt: number;                        // Timestamp kedaluwarsa sesi
}

// Daftar rombongan belajar (rombel) jurusan Rekayasa Perangkat Lunak
export const RPL_CLASSES = [
    'X RPL A',
    'X RPL B',
    'XI RPL A',
    'XI RPL B',
    'XII RPL A',
    'XII RPL B'
] as const;

export type RplClass = (typeof RPL_CLASSES)[number];

// Kunci penyimpanan pada localStorage browser
const ACCOUNTS_STORAGE_KEY = 'lab_inventory_accounts_v4';
const SESSION_STORAGE_KEY = 'lab_inventory_session_token_v1';
// Masa berlaku token sesi (1 jam)
export const TOKEN_DURATION_MS = 60 * 60 * 1000;

/**
 * Akun default awal (dummy) untuk pengujian dan presentasi
 */
export const DEFAULT_ACCOUNTS: UserAccount[] = [
    {
        id: 'acc-siswa-1',
        username: 'siswa1',
        name: 'Ahmad Rizky Pratama',
        class: 'XII RPL A',
        email: 'siswa1@smkn1.sch.id',
        password: 'siswa123',
        role: 'siswa',
        nisn: '0067829101',
        phone: '0812-9876-1101',
        avatar: 'AR'
    },
    {
        id: 'acc-siswa-2',
        username: 'siswa2',
        name: 'Nabila Putri Syahrani',
        class: 'XII RPL B',
        email: 'siswa2@smkn1.sch.id',
        password: 'rpl2024!',
        role: 'siswa',
        nisn: '0067829102',
        phone: '0813-4455-2202',
        avatar: 'NP'
    },
    {
        id: 'acc-siswa-3',
        username: 'siswa3',
        name: 'Muhammad Fajar Ramadhan',
        class: 'XI RPL A',
        email: 'siswa3@smkn1.sch.id',
        password: 'rplfajar11',
        role: 'siswa',
        nisn: '0078912301',
        phone: '0812-3344-5566',
        avatar: 'MF'
    },
    {
        id: 'acc-siswa-4',
        username: 'siswa4',
        name: 'Siti Aisyah Azzahra',
        class: 'XI RPL B',
        email: 'siswa4@smkn1.sch.id',
        password: 'aisyah2024',
        role: 'siswa',
        nisn: '0078912302',
        phone: '0813-9988-7766',
        avatar: 'SA'
    },
    {
        id: 'acc-siswa-5',
        username: 'siswa5',
        name: 'Dimas Arya Saputra',
        class: 'X RPL A',
        email: 'siswa5@smkn1.sch.id',
        password: 'dimasrpl10',
        role: 'siswa',
        nisn: '0089123401',
        phone: '0821-1122-3344',
        avatar: 'DA'
    },
    {
        id: 'acc-siswa-6',
        username: 'siswa6',
        name: 'Zahra Amelia Dewi',
        class: 'X RPL B',
        email: 'siswa6@smkn1.sch.id',
        password: 'zahra10rpl',
        role: 'siswa',
        nisn: '0089123402',
        phone: '0822-4455-6677',
        avatar: 'ZA'
    },
    {
        id: 'acc-admin',
        username: 'admin',
        name: 'Agus Wibowo',
        class: 'Kepala Lab RPL SMKN 1',
        email: 'admin@smkn1.sch.id',
        password: 'adminlab123',
        role: 'admin',
        phone: '0811-2233-4455',
        avatar: 'PL'
    }
];

/**
 * Menormalkan format penulisan kelas (misal: "RPL 1" menjadi "RPL A")
 */
function normalizeClass(cls?: string): string {
    if (!cls) return 'X RPL A';
    return cls
        .replace(/RPL\s*1\b/gi, 'RPL A')
        .replace(/RPL\s*2\b/gi, 'RPL B');
}

/**
 * Mengambil daftar seluruh akun yang tersimpan di localStorage browser
 */
export function getStoredAccounts(): UserAccount[] {
    if (typeof window === 'undefined') return DEFAULT_ACCOUNTS;
    try {
        const stored = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
            return DEFAULT_ACCOUNTS;
        }
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map((acc: UserAccount) => ({
                ...acc,
                class: acc.role === 'siswa' ? normalizeClass(acc.class) : acc.class
            }));
        }
        return DEFAULT_ACCOUNTS;
    } catch {
        return DEFAULT_ACCOUNTS;
    }
}

/**
 * Menyimpan pembaruan daftar akun ke localStorage dan memicu custom event sinkronisasi
 */
export function saveStoredAccounts(accounts: UserAccount[]): void {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
        window.dispatchEvent(new CustomEvent('inventory_accounts_changed', { detail: accounts }));
    } catch (e) {
        console.error('Failed to save accounts:', e);
    }
}

/**
 * Memperbarui kata sandi akun siswa berdasarkan username
 */
export function updateStudentPassword(username: string, newPassword: string): boolean {
    const accounts = getStoredAccounts();
    const targetIdx = accounts.findIndex(
        (a) => a.username.toLowerCase() === username.toLowerCase()
    );
    if (targetIdx === -1) return false;

    accounts[targetIdx] = {
        ...accounts[targetIdx],
        password: newPassword
    };

    saveStoredAccounts(accounts);
    return true;
}

/**
 * Membuat akun baru dengan validasi username unik dan panjang kata sandi
 */
export function createUserAccount(newUserData: {
    username: string;
    name: string;
    role: 'siswa' | 'admin';
    class?: string;
    email?: string;
    password: string;
    nisn?: string;
    phone?: string;
}): { success: boolean; message: string; account?: UserAccount } {
    const accounts = getStoredAccounts();
    const cleanUsername = newUserData.username.trim().toLowerCase();

    // Validasi kelengkapan username
    if (!cleanUsername) {
        return { success: false, message: 'Username login wajib diisi.' };
    }

    if (/\s/.test(cleanUsername)) {
        return { success: false, message: 'Username tidak boleh mengandung spasi.' };
    }

    // Validasi duplikasi username
    const existing = accounts.find((a) => a.username.toLowerCase() === cleanUsername);
    if (existing) {
        return { success: false, message: `Username "${cleanUsername}" sudah digunakan. Gunakan username lain.` };
    }

    if (!newUserData.password || newUserData.password.length < 4) {
        return { success: false, message: 'Password minimal 4 karakter.' };
    }

    // Menghasilkan inisial avatar
    const initials = newUserData.name
        .trim()
        .split(/\s+/)
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'US';

    const defaultEmail = newUserData.email?.trim() || `${cleanUsername}@smkn1.sch.id`;

    // Objek akun baru
    const newAccount: UserAccount = {
        id: `acc-${newUserData.role}-${Date.now()}`,
        username: cleanUsername,
        name: newUserData.name.trim(),
        role: newUserData.role,
        class: newUserData.role === 'siswa' ? normalizeClass(newUserData.class || 'X RPL A') : (newUserData.class?.trim() || 'Staf / Guru Lab RPL'),
        email: defaultEmail,
        password: newUserData.password.trim(),
        nisn: newUserData.nisn?.trim() || '',
        phone: newUserData.phone?.trim() || '',
        avatar: initials
    };

    accounts.unshift(newAccount);
    saveStoredAccounts(accounts);

    return {
        success: true,
        message: `Akun ${newAccount.name} (@${newAccount.username}) berhasil ditambahkan.`,
        account: newAccount
    };
}

/**
 * Membuat token sesi login sementara untuk pengguna
 */
export function createSessionToken(user: UserAccount): SessionToken {
    const now = Date.now();
    const tokenStr = `tk_${user.username}_${Math.random().toString(36).substring(2, 10)}_${now}`;
    const session: SessionToken = {
        token: tokenStr,
        username: user.username,
        role: user.role,
        name: user.name,
        class: user.class,
        createdAt: now,
        expiresAt: now + TOKEN_DURATION_MS
    };

    if (typeof window !== 'undefined') {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
        window.dispatchEvent(new CustomEvent('session_token_created', { detail: session }));
    }

    return session;
}

/**
 * Memeriksa dan mengambil sesi login aktif yang belum kedaluwarsa
 */
export function getActiveSession(): SessionToken | null {
    if (typeof window === 'undefined') return null;
    try {
        const data = localStorage.getItem(SESSION_STORAGE_KEY);
        if (!data) return null;

        const session: SessionToken = JSON.parse(data);
        const now = Date.now();

        // Hapus sesi jika sudah melewati batas waktu kedaluwarsa
        if (now >= session.expiresAt) {
            localStorage.removeItem(SESSION_STORAGE_KEY);
            window.dispatchEvent(new CustomEvent('session_token_expired'));
            return null;
        }

        return session;
    } catch {
        return null;
    }
}

/**
 * Mengakhiri sesi login saat ini (logout)
 */
export function terminateSession(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SESSION_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('session_token_terminated'));
}
