<?php

namespace Database\Seeders;

use App\Models\Journal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JournalTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $open = fopen(storage_path("app\journal.csv"), "r");
        while (($data = fgetcsv($open, 1000, ",")) !== FALSE) {
            $journalData = [
                'estimation_id' => $data[0]
            ];

            if (!empty($data[1])) {
                $journalData['user_id'] = $data[1];
            }
            if(!empty($data[2]) || !empty($data[3]))
            {
                $journalData['balance'] = !empty($data[2]) ? 'debit' : 'kredit';
                $journalData['initial_balance'] = !empty($data[2]) ? $data[2] : $data[3];
            }
            Journal::create($journalData);
        }
    }
}
