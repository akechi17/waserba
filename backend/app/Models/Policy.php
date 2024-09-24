<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Estimation;

class Policy extends Model
{
    use HasFactory;

    protected $fillable = [
        'surplus',
        'cadangan',
        'dibagikan',
        'pemilik',
        'pengurus',
        'kesejahteraan',
        'wilayah_kerja',
        'sosial',
        'pendidikan',
        'transaksi',
        'modal'
    ];

    protected $appends = [
        'phu_comp',
    ];

    public function getPhuCompAttribute()
    {
        $pendapatan = Estimation::where(function($query) {
            $query->where(function($query) {
                $query->where('id', 'like', '4-%')
                      ->where('id', '>=', '4-250');
            })->orWhere(function($query) {
                $query->where('id', 'like', '5-%')
                      ->where('id', '<=', '5-240');
            });
        })
        ->where('balance', 'kredit')
        ->get();

        $penyusutan = Estimation::where('id', 'like', '5-%')
            ->where('id', '>=', '5-250')
            ->where('balance', 'debit')
            ->get();
        
        // Sum the 'neraca_saldo' values of the filtered penyusutan
        $totalNeracaSaldo = $pendapatan->sum('neraca_saldo') - $penyusutan->sum('neraca_saldo');
        
        return $totalNeracaSaldo;
    }
}
