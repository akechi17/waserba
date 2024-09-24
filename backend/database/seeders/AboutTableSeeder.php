<?php

namespace Database\Seeders;

use App\Models\About;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AboutTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        About::create([
            'name' => 'Koperasi Konsumen Syariah Waserba',
            'legal_entity_id' => '1242000302674',
            'legal_entity_date' => '2021-02-18',
            'president' => 'Riyu Rindani Riandini',
            'vice_president' => 'Harris Gunawan',
            'secretary' => 'Isti Anah / Asih Kuswantini',
            'supervisor' => 'Tatang R Suparman',
            'supervisor2' => 'Turyanto Nugroho',
            'supervisor3' => 'Dodot Heru Sulistyo',
            'treasurer' => 'Rini Ruliawati',
            'syariah_supervisor' => 'Sholihin Prihartono / Marfuah Mustafa',
            'address' => 'BDB2 Blok AO-01 RT02/13 Sukahati',
            'city' => 'Kab Bogor',
            'province' => 'Jawa Barat',
            'phone' => '081219701683',
            'accounting_period' => 'Tahun 2024',
            'accounting_year' => 'Tahun Buku 2024',
            'first_accounting_date' => '2024-01-01',
            'last_accounting_date' => '2024-12-31'
        ]);
    }
}
