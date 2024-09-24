<?php

namespace Database\Seeders;

use App\Models\Estimation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EstimationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Estimation::create([
            'id' => "1-000",
            'name' => "Aktiva",
            'group' => "Harta",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "1-100",
            'name' => "Aktiva Lancar",
            'group' => "Harta",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "1-110",
            'name' => "Kas",
            'group' => "Harta",
            'balance' => "Debit",
            'initial_balance' => 55688446
        ]);
        Estimation::create([
            'id' => "1-111",
            'name' => "Bank",
            'group' => "Harta",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "1-112",
            'name' => "Premi Asuransi",
            'group' => "Harta",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "1-120",
            'name' => "Piutang Usaha Musyarakah",
            'group' => "Harta",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "1-121",
            'name' => "Piutang Usaha Mudharabah",
            'group' => "Harta",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "1-122",
            'name' => "Piutang Usaha Murabahah",
            'group' => "Harta",
            'balance' => "Debit",
            'initial_balance' => 4200000
        ]);
        Estimation::create([
            'id' => "1-130",
            'name' => "Perlengkapan Kantor",
            'group' => "Harta",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "1-200",
            'name' => "Investasi Jangka Panjang",
            'group' => "Harta",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "1-210",
            'name' => "Investasi Mudharabah",
            'group' => "Harta",
            'balance' => "Debit",
            'initial_balance' => 30057750
        ]);
        Estimation::create([
            'id' => "1-220",
            'name' => "Investasi Musyarakah",
            'group' => "Harta",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "1-300",
            'name' => "Aktiva Tetap",
            'group' => "Harta",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "1-310",
            'name' => "Tanah",
            'group' => "Harta",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "1-320",
            'name' => "Bangunan",
            'group' => "Harta",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "1-321",
            'name' => "Akumulasi Penyusutan Bangunan",
            'group' => "Harta",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "1-330",
            'name' => "Inventaris Kantor",
            'group' => "Harta",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "1-331",
            'name' => "Akumulasi Penyusutan Inventaris Kantor",
            'group' => "Harta",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "1-340",
            'name' => "Inventaris Ijarah",
            'group' => "Harta",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "1-341",
            'name' => "Akumulasi Penyusutan Inventaris Ijarah",
            'group' => "Harta",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "1-400",
            'name' => "Aktiva Tak Berwujud",
            'group' => "Harta",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "1-410",
            'name' => "Hak Cipta / Paten / HAKI",
            'group' => "Harta",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "1-420",
            'name' => "Aset Salam",
            'group' => "Harta",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "2-000",
            'name' => "Hutang",
            'group' => "Kewajiban",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "2-100",
            'name' => "Hutang Lancar",
            'group' => "Kewajiban",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "2-110",
            'name' => "Simpanan Sukarela",
            'group' => "Kewajiban",
            'balance' => "Kredit",
            'initial_balance' => 6650500
        ]);
        Estimation::create([
            'id' => "2-120",
            'name' => "Tabungan Wadiah",
            'group' => "Kewajiban",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "2-130",
            'name' => "Tabungan Qard/Rahn",
            'group' => "Kewajiban",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "2-140",
            'name' => "SHU Anggota",
            'group' => "Kewajiban",
            'balance' => "Kredit",
            'initial_balance' => 1872464
        ]);
        Estimation::create([
            'id' => "2-141",
            'name' => "Honor Pengurus & Pengawas",
            'group' => "Kewajiban",
            'balance' => "Kredit",
            'initial_balance' => 802484
        ]);
        Estimation::create([
            'id' => "2-142",
            'name' => "Kesejahteraan Karyawan",
            'group' => "Kewajiban",
            'balance' => "Kredit",
            'initial_balance' => 668737
        ]);
        Estimation::create([
            'id' => "2-143",
            'name' => "Pembangunan Wilayah Kerja",
            'group' => "Kewajiban",
            'balance' => "Kredit",
            'initial_balance' => 267495
        ]);
        Estimation::create([
            'id' => "2-144",
            'name' => "Dana Sosial",
            'group' => "Kewajiban",
            'balance' => "Kredit",
            'initial_balance' => 534990
        ]);
        Estimation::create([
            'id' => "2-145",
            'name' => "Dana Pendidikan",
            'group' => "Kewajiban",
            'balance' => "Kredit",
            'initial_balance' => 534990
        ]);
        Estimation::create([
            'id' => "2-150",
            'name' => "Hutang Usaha",
            'group' => "Kewajiban",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "2-160",
            'name' => "Pendapatan Diterima Dimuka/Ditangguhkan",
            'group' => "Kewajiban",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "2-170",
            'name' => "Hutang Lain-lain",
            'group' => "Kewajiban",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "2-200",
            'name' => "Hutang Jangka Panjang",
            'group' => "Kewajiban",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "2-210",
            'name' => "Hutang Bank",
            'group' => "Kewajiban",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "2-220",
            'name' => "Hutang Lembaga Keuangan",
            'group' => "Kewajiban",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "2-230",
            'name' => "Modal Penyertaan",
            'group' => "Kewajiban",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "3-000",
            'name' => "Ekuitas",
            'group' => "Modal",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "3-110",
            'name' => "Simpanan Pokok",
            'group' => "Modal",
            'balance' => "Kredit",
            'initial_balance' => 6100000
        ]);
        Estimation::create([
            'id' => "3-120",
            'name' => "Simpanan Wajib",
            'group' => "Modal",
            'balance' => "Kredit",
            'initial_balance' => 71845800
        ]);
        Estimation::create([
            'id' => "3-130",
            'name' => "Hibah",
            'group' => "Modal",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "3-140",
            'name' => "Cadangan",
            'group' => "Modal",
            'balance' => "Kredit",
            'initial_balance' => 668737
        ]);
        Estimation::create([
            'id' => "3-150",
            'name' => "SHU Bulan Berjalan",
            'group' => "Modal",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "3-160",
            'name' => "Sumbangan Donatur",
            'group' => "Modal",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "4-000",
            'name' => "Pendapatan",
            'group' => "Pendapatan",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "4-100",
            'name' => "Pendapatan Operasional",
            'group' => "Pendapatan",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "4-110",
            'name' => "Pendapatan Musyarakah",
            'group' => "Pendapatan",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "4-120",
            'name' => "Pendapatan Toko Waserba/UJUT",
            'group' => "Pendapatan",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "4-121",
            'name' => "Pendapatan Angsuran Barang/UJAB",
            'group' => "Pendapatan",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "4-122",
            'name' => "Pendapatan Bagi Hasil UJTQ",
            'group' => "Pendapatan",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "4-123",
            'name' => "Pendapatan Tagihan Rutin/UJPR",
            'group' => "Pendapatan",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "4-124",
            'name' => "Pendapatan UJP3RT",
            'group' => "Pendapatan",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "4-125",
            'name' => "Pendapatan Agen Pos",
            'group' => "Pendapatan",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "4-126",
            'name' => "Pendapatan Agen BSI",
            'group' => "Pendapatan",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "4-130",
            'name' => "Pendapatan Operasional Lainnya",
            'group' => "Pendapatan",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "4-200",
            'name' => "Pendapatan Non Operasional",
            'group' => "Pendapatan",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "4-210",
            'name' => "Pendapatan Investasi",
            'group' => "Pendapatan",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "4-220",
            'name' => "Pendapatan Sewa",
            'group' => "Pendapatan",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "4-230",
            'name' => "Pendapatan Denda",
            'group' => "Pendapatan",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "4-240",
            'name' => "Pendapatan Bagi Hasil Bank",
            'group' => "Pendapatan",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "4-250",
            'name' => "Pendapatan Lain-lain",
            'group' => "Pendapatan",
            'balance' => "Kredit"
        ]);
        Estimation::create([
            'id' => "4-990",
            'name' => "Ikhtisar Perhitungan SHU",
            'group' => "Pendapatan",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-000",
            'name' => "Biaya",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-100",
            'name' => "Biaya Operasional",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-110",
            'name' => "Biaya Penyisihan Kerugian Syirkah",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-120",
            'name' => "Biaya Ijarah",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-130",
            'name' => "Biaya Operasional Unit Usaha Koperasi",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-140",
            'name' => "Biaya Bagi Hasil Ke Pengelola",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-200",
            'name' => "Biaya Non Operasional",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-210",
            'name' => "Biaya Asuransi",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-220",
            'name' => "Biaya Perlengkapan Kantor",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-230",
            'name' => "Biaya Perkoperasian",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-240",
            'name' => "Biaya Penyusutan Bangunan",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-250",
            'name' => "Biaya Penyusutan Inventaris",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-260",
            'name' => "Biaya Aset Ijarah",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-270",
            'name' => "Biaya Non Operasional Lainnya",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-300",
            'name' => "Biaya Lain-lain",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-310",
            'name' => "Biaya Pajak Negara",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-320",
            'name' => "Biaya Syirkah Lain-lain",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-330",
            'name' => "Biaya Administrasi Bank",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-340",
            'name' => "Biaya Pemindahbukuan",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-350",
            'name' => "Biaya Pajak Bank",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
        Estimation::create([
            'id' => "5-360",
            'name' => "Biaya Lain-lain",
            'group' => "Biaya",
            'balance' => "Debit"
        ]);
    }
}
