<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Journal;

class Estimation extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'group',
        'balance',
        'initial_balance'
    ];

    protected $casts = [
        'id' => 'string',
    ];

    protected $appends = [
        'neraca_saldo',
        'mutasi_kredit',
        'mutasi_debit'
    ];

    public function getNeracaSaldoAttribute()
    {
        $debitSumJournals = $this->journals()
            ->where('balance', 'debit')
            ->sum('initial_balance');
            
        $kreditSumJournals = $this->journals()
            ->where('balance', 'kredit')
            ->sum('initial_balance');
        
        $debitSumTotal = $debitSumJournals + ($this->balance === 'debit' ? $this->initial_balance : 0);
        $kreditSumTotal = $kreditSumJournals + ($this->balance === 'kredit' ? $this->initial_balance : 0);

        if ($this->balance === 'debit') {
            return $debitSumTotal - $kreditSumTotal;
        } elseif ($this->balance === 'kredit') {
            return $kreditSumTotal - $debitSumTotal;
        }

        return 0;
    }

    public function getMutasiKreditAttribute()
    {
        return $this->journals()->where('balance', 'kredit')->sum('initial_balance');
    }

    public function getMutasiDebitAttribute()
    {
        return $this->journals()->where('balance', 'debit')->sum('initial_balance');
    }

    public function journals()
    {
        return $this->hasMany(Journal::class);
    }
}
