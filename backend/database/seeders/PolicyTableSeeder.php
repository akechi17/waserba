<?php

namespace Database\Seeders;

use App\Models\Policy;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PolicyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Policy::create([
            'surplus' => 100,
            'cadangan' => 12.5,
            'dibagikan' => 87.5,
            'pemilik' => 35,
            'pengurus' => 15,
            'kesejahteraan' => 12.5,
            'wilayah_kerja' => 5,
            'sosial' => 10,
            'pendidikan' => 10,
            'transaksi' => 70,
            'modal' => 30,
        ]);
    }
}
