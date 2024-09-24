<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Equity extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'pokok',
        'wajib',
        'modal_penyertaan',
        'sukarela',
        'qard_rahn',
        'wadiah'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
