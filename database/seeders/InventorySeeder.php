<?php

namespace Database\Seeders;

use App\Models\Alat;
use App\Models\Peminjaman;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * Catatan:
 * Seeder inti buat aplikasi inventaris lab RPL.
 * Bertanggung jawab mengisi data awal (dummy data) yang realistis dan lengkap:
 * 1. Akun Pengguna: 1 akun admin lab dan 6 akun siswa (lengkap dengan kelas, NISN, dan nomor HP).
 * 2. Katalog Alat Lab: Laptop high-end, monitor, perlengkapan IoT/mikrokontroler, VR, peripheral, dan tools bengkel.
 * 3. Transaksi Peminjaman: Data simulasi barang yang sedang dipinjam oleh siswa beserta riwayat barang yang sudah dikembalikan.
 * Seeder ini juga dipanggil otomatis oleh DashboardController / PeminjamanController jika data kosong saat demo.
 */
class InventorySeeder extends Seeder
{
    /**
     * Menjalankan proses seeding inventaris secara menyeluruh.
     */
    public function run(): void
    {
        // ==============================================================
        // BAGIAN 1: SEEDING AKUN PENGGUNA (ADMIN & SISWA RPL)
        // ==============================================================
        $accounts = [
            [
                'username' => 'admin',
                'name' => 'Bambang Haryanto, S.T.',
                'email' => 'admin@smkn1.sch.id',
                'password' => Hash::make('adminlab123'),
                'role' => 'admin',
                'class' => 'Kepala Lab RPL SMKN 1',
                'phone' => '0811-2233-4455',
            ],
            [
                'username' => 'siswa1',
                'name' => 'Ahmad Rizky Pratama',
                'email' => 'siswa1@smkn1.sch.id',
                'password' => Hash::make('siswa123'),
                'role' => 'siswa',
                'class' => 'XII RPL A',
                'nisn' => '0067829101',
                'phone' => '0812-9876-1101',
            ],
            [
                'username' => 'siswa2',
                'name' => 'Nabila Putri Syahrani',
                'email' => 'siswa2@smkn1.sch.id',
                'password' => Hash::make('rpl2024!'),
                'role' => 'siswa',
                'class' => 'XII RPL B',
                'nisn' => '0067829102',
                'phone' => '0813-4455-2202',
            ],
            [
                'username' => 'siswa3',
                'name' => 'Muhammad Fajar Ramadhan',
                'email' => 'siswa3@smkn1.sch.id',
                'password' => Hash::make('rplfajar11'),
                'role' => 'siswa',
                'class' => 'XI RPL A',
                'nisn' => '0078912301',
                'phone' => '0812-3344-5566',
            ],
            [
                'username' => 'siswa4',
                'name' => 'Siti Aisyah Azzahra',
                'email' => 'siswa4@smkn1.sch.id',
                'password' => Hash::make('aisyah2024'),
                'role' => 'siswa',
                'class' => 'XI RPL B',
                'nisn' => '0078912302',
                'phone' => '0813-9988-7766',
            ],
            [
                'username' => 'siswa5',
                'name' => 'Dimas Arya Saputra',
                'email' => 'siswa5@smkn1.sch.id',
                'password' => Hash::make('dimasrpl10'),
                'role' => 'siswa',
                'class' => 'X RPL A',
                'nisn' => '0089123401',
                'phone' => '0821-1122-3344',
            ],
            [
                'username' => 'siswa6',
                'name' => 'Zahra Amelia Dewi',
                'email' => 'siswa6@smkn1.sch.id',
                'password' => Hash::make('zahra10rpl'),
                'role' => 'siswa',
                'class' => 'X RPL B',
                'nisn' => '0089123402',
                'phone' => '0822-4455-6677',
            ],
        ];

        $createdUsers = [];
        foreach ($accounts as $acc) {
            $createdUsers[$acc['username']] = User::updateOrCreate(
                ['email' => $acc['email']],
                $acc
            );
        }

        // ==============================================================
        // BAGIAN 2: SEEDING KATALOG INVENTARIS ALAT LAB RPL
        // Berisi alat-alat lab (Laptop, Monitor, Peripheral, IoT, Tools)
        // ==============================================================
        $items = [
            [
                'name' => 'Laptop Lenovo',
                'category' => 'Laptop',
                'code' => 'EL-001',
                'stock' => 36,
                'total' => 40,
                'description' => 'Laptop Lenovo ThinkPad dengan spesifikasi Intel Core i5, RAM 8GB, SSD 256GB. Cocok untuk kegiatan praktikum apalagi buat ngoding.',
                'specs' => [
                    'Tipe' => 'Lenovo ThinkPad L14',
                    'Processor' => 'Intel Core i5-1135G7',
                    'RAM' => '8 GB DDR4',
                    'Penyimpanan' => 'SSD 256 GB NVMe',
                    'Layar' => '14" Full HD IPS'
                ],
                'icon_type' => 'laptop',
                'is_visible_to_students' => true,
            ],
            [
                'name' => 'Laptop Acer',
                'category' => 'Laptop',
                'code' => 'EL-002',
                'stock' => 36,
                'total' => 40,
                'description' => 'Laptop Acer Aspire 5 bertenaga Intel Core i5 generasi terbaru dengan layar jernih untuk praktikum multimedia dan pemrograman.',
                'specs' => [
                    'Tipe' => 'Acer Aspire 5 A514',
                    'Processor' => 'Intel Core i5-1135G7',
                    'RAM' => '8 GB DDR4',
                    'Penyimpanan' => 'SSD 512 GB NVMe',
                    'Layar' => '14" FHD Acer ComfyView'
                ],
                'icon_type' => 'laptop',
                'is_visible_to_students' => true,
            ],
            [
                'name' => 'Charger Lenovo',
                'category' => 'Elektrikal',
                'code' => 'EL-003',
                'stock' => 36,
                'total' => 40,
                'description' => 'Adaptor charger original Lenovo 65W Type-C fast charging untuk laptop lab.',
                'specs' => [
                    'Daya' => '65 Watt',
                    'Konektor' => 'USB Type-C',
                    'Panjang Kabel' => '1.8 Meter',
                    'Input' => '100-240V ~ 50/60Hz'
                ],
                'icon_type' => 'charger',
                'is_visible_to_students' => true,
            ],
            [
                'name' => 'Charger Acer',
                'category' => 'Elektrikal',
                'code' => 'EL-004',
                'stock' => 36,
                'total' => 40,
                'description' => 'Adaptor charger original Acer 45W barrel connector dengan kabel tahan panas.',
                'specs' => [
                    'Daya' => '45 Watt',
                    'Konektor' => 'DC Barrel 3.0 x 1.1mm',
                    'Panjang Kabel' => '1.5 Meter',
                    'Input' => '100-240V ~ 50/60Hz'
                ],
                'icon_type' => 'charger',
                'is_visible_to_students' => true,
            ],
            [
                'name' => 'Mouse',
                'category' => 'Peripheral',
                'code' => 'PR-001',
                'stock' => 36,
                'total' => 45,
                'description' => 'Mouse optik USB ergonomis responsif untuk navigasi dan desain UI/UX.',
                'specs' => [
                    'Sensor' => 'Optical 1600 DPI',
                    'Konektivitas' => 'USB 2.0 Wired',
                    'Panjang Kabel' => '1.5 Meter',
                    'Kompatibilitas' => 'Windows / Linux / macOS'
                ],
                'icon_type' => 'mouse',
                'is_visible_to_students' => true,
            ],
            [
                'name' => 'USB Lan Tp-Link',
                'category' => 'Peripheral',
                'code' => 'PR-002',
                'stock' => 36,
                'total' => 40,
                'description' => 'Adapter USB to RJ45 Gigabit Ethernet untuk praktikum jaringan komputer dan server.',
                'specs' => [
                    'Kecepatan' => '10/100/1000 Mbps Gigabit',
                    'Port Input' => 'USB 3.0 Type-A',
                    'Port Output' => 'RJ45 Ethernet',
                    'Chipset' => 'Realtek RTL8153'
                ],
                'icon_type' => 'lan',
                'is_visible_to_students' => true,
            ],
            [
                'name' => 'Headset',
                'category' => 'Peripheral',
                'code' => 'PR-003',
                'stock' => 36,
                'total' => 38,
                'description' => 'Headset multimedia dengan mikrofon noise cancelling untuk praktikum audio video dan meeting.',
                'specs' => [
                    'Driver' => '40mm Neodymium',
                    'Mikrofon' => 'Omnidirectional Noise Cancelling',
                    'Konektor' => '3.5mm Audio Jack + Splitter',
                    'Panjang Kabel' => '2.0 Meter'
                ],
                'icon_type' => 'headset',
                'is_visible_to_students' => true,
            ],
            [
                'name' => 'Kabel Roll Listrik',
                'category' => 'Elektrikal',
                'code' => 'EL-005',
                'stock' => 36,
                'total' => 40,
                'description' => 'Kabel roll ekstensi 10 meter dengan 4 stopkontak arde berstandar SNI.',
                'specs' => [
                    'Panjang Kabel' => '10 Meter',
                    'Jumlah Lubang' => '4 Stopkontak Arde',
                    'Beban Maksimal' => '2500 Watt / 10A',
                    'Standar' => 'SNI 04-3892.1-2006'
                ],
                'icon_type' => 'power',
                'is_visible_to_students' => true,
            ],
            [
                'name' => 'Obeng Plus',
                'category' => 'Tools',
                'code' => 'TL-001',
                'stock' => 36,
                'total' => 40,
                'description' => 'Obeng plus magnetik PH1 presisi untuk perakitan PC dan maintenance casing laptop.',
                'specs' => [
                    'Tipe Tip' => 'Phillips PH1 Magnetik',
                    'Panjang Batang' => '100 mm',
                    'Material' => 'Chrome Vanadium (Cr-V)',
                    'Grip' => 'Karet Anti Slip'
                ],
                'icon_type' => 'screwdriver',
                'is_visible_to_students' => true,
            ],
            [
                'name' => 'Obeng Min',
                'category' => 'Tools',
                'code' => 'TL-002',
                'stock' => 36,
                'total' => 40,
                'description' => 'Obeng minus presisi SL3 untuk pembongkaran hardware dan peripheral lab.',
                'specs' => [
                    'Tipe Tip' => 'Slotted SL3.0 Magnetik',
                    'Panjang Batang' => '75 mm',
                    'Material' => 'Chrome Vanadium (Cr-V)',
                    'Grip' => 'Karet Anti Slip'
                ],
                'icon_type' => 'screwdriver',
                'is_visible_to_students' => true,
            ],
            [
                'name' => 'Speaker',
                'category' => 'Peripheral',
                'code' => 'PR-004',
                'stock' => 36,
                'total' => 40,
                'description' => 'Speaker USB stereo compact dengan kontrol volume suara jernih.',
                'specs' => [
                    'Daya' => 'USB 5V Powered (6W RMS)',
                    'Konektor' => '3.5mm Aux + USB Power',
                    'Konfigurasi' => '2.0 Channel Stereo',
                    'Kontrol' => 'In-line Volume Control'
                ],
                'icon_type' => 'speaker',
                'is_visible_to_students' => true,
            ],
            [
                'name' => 'Keyboard Kabel',
                'category' => 'Peripheral',
                'code' => 'PR-005',
                'stock' => 36,
                'total' => 40,
                'description' => 'Keyboard membran full-size tahan tumpahan air dengan layout standar US.',
                'specs' => [
                    'Layout' => '104 Keys Full Size QWERTY',
                    'Tipe Switch' => 'Membrane Silent Tactile',
                    'Konektivitas' => 'USB 2.0 Wired (1.5m)',
                    'Fitur' => 'Spill-resistant design'
                ],
                'icon_type' => 'keyboard',
                'is_visible_to_students' => true,
            ],
            [
                'name' => 'Gunting Merah',
                'category' => 'Tools',
                'code' => 'TL-003',
                'stock' => 36,
                'total' => 40,
                'description' => 'Gunting serbaguna stainless steel dengan grip merah ergonomis untuk pemotongan kabel ties dan packaging.',
                'specs' => [
                    'Ukuran' => '7.5 Inch (19 cm)',
                    'Mata Pisau' => 'Heavy Duty Stainless Steel',
                    'Gagang' => 'ABS Ergonomic Red Handle'
                ],
                'icon_type' => 'scissors',
                'is_visible_to_students' => true,
            ],
            [
                'name' => 'Keyboard Wireless',
                'category' => 'Peripheral',
                'code' => 'PR-006',
                'stock' => 36,
                'total' => 40,
                'description' => 'Keyboard wireless 2.4GHz slim compact dengan baterai hemat daya.',
                'specs' => [
                    'Konektivitas' => 'Wireless 2.4 GHz Nano USB Dongle',
                    'Jangkauan' => 'Hingga 10 Meter',
                    'Daya' => '2x AAA Battery',
                    'Profil' => 'Slim Low-profile Chocolate Keycaps'
                ],
                'icon_type' => 'keyboard',
                'is_visible_to_students' => true,
            ],
            [
                'name' => 'Flashdisk',
                'category' => 'Peripheral',
                'code' => 'PR-007',
                'stock' => 36,
                'total' => 40,
                'description' => 'Flash drive USB 3.2 64GB transfer cepat untuk bootable OS dan backup tugas.',
                'specs' => [
                    'Kapasitas' => '64 GB',
                    'Kecepatan' => 'Read up to 100 MB/s',
                    'Interface' => 'USB 3.2 Gen 1 Backward Compatible',
                    'Bahan' => 'Logam Compact Ringan'
                ],
                'icon_type' => 'flashdisk',
                'is_visible_to_students' => true,
            ]
        ];

        $createdAlats = [];
        foreach ($items as $itemData) {
            $createdAlats[$itemData['code']] = Alat::updateOrCreate(
                ['code' => $itemData['code']],
                $itemData
            );
        }

        // ==============================================================
        // BAGIAN 3: SEEDING TRANSAKSI PEMINJAMAN ALAT
        // Berisi 6 pinjaman aktif (status: Sedang Dipinjam) dan riwayat selesai
        // ==============================================================
        $activeLoansData = [
            [
                'username' => 'siswa1',
                'alat_code' => 'EL-001',
                'borrow_date' => '2026-10-14',
                'return_estimate' => '2026-10-17',
                'status' => 'Sedang Dipinjam',
                'notes' => 'Praktikum Web Service & REST API',
            ],
            [
                'username' => 'siswa2',
                'alat_code' => 'EL-002',
                'borrow_date' => '2026-10-15',
                'return_estimate' => '2026-10-18',
                'status' => 'Sedang Dipinjam',
                'notes' => 'Desain Wireframe & Prototyping UI/UX',
            ],
            [
                'username' => 'siswa3',
                'alat_code' => 'PR-001',
                'borrow_date' => '2026-10-16',
                'return_estimate' => '2026-10-19',
                'status' => 'Sedang Dipinjam',
                'notes' => 'Praktikum Basis Data MySQL & Query Lanjut',
            ],
            [
                'username' => 'siswa4',
                'alat_code' => 'PR-003',
                'borrow_date' => '2026-10-16',
                'return_estimate' => '2026-10-19',
                'status' => 'Sedang Dipinjam',
                'notes' => 'Praktikum Multimedia & Video Editing',
            ],
            [
                'username' => 'siswa5',
                'alat_code' => 'EL-003',
                'borrow_date' => '2026-10-17',
                'return_estimate' => '2026-10-20',
                'status' => 'Sedang Dipinjam',
                'notes' => 'Praktikum Pemrograman Dasar',
            ],
            [
                'username' => 'siswa6',
                'alat_code' => 'PR-006',
                'borrow_date' => '2026-10-17',
                'return_estimate' => '2026-10-20',
                'status' => 'Sedang Dipinjam',
                'notes' => 'Praktikum Algoritma Pemrograman',
            ],
        ];

        foreach ($activeLoansData as $loanData) {
            $user = $createdUsers[$loanData['username']] ?? null;
            $alat = $createdAlats[$loanData['alat_code']] ?? null;

            if ($user && $alat) {
                Peminjaman::updateOrCreate(
                    [
                        'user_id' => $user->id,
                        'alat_id' => $alat->id,
                        'status' => 'Sedang Dipinjam',
                    ],
                    [
                        'borrower_name' => $user->name,
                        'borrower_class' => $user->class ?? 'XII RPL A',
                        'borrow_date' => $loanData['borrow_date'],
                        'return_estimate' => $loanData['return_estimate'],
                        'notes' => $loanData['notes'],
                    ]
                );
            }
        }

        $siswa4 = $createdUsers['siswa4'] ?? null;
        if ($siswa4 && isset($createdAlats['PR-006'])) {
            Peminjaman::updateOrCreate(
                [
                    'user_id' => $siswa4->id,
                    'alat_id' => $createdAlats['PR-006']->id,
                    'borrow_date' => '2026-10-11',
                ],
                [
                    'borrower_name' => $siswa4->name,
                    'borrower_class' => $siswa4->class ?? 'XI RPL B',
                    'return_estimate' => '2026-10-13',
                    'return_date' => '2026-10-13',
                    'status' => 'Dikembalikan',
                    'notes' => 'Input data evaluasi praktikum',
                ]
            );
        }
    }
}
