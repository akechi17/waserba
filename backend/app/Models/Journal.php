<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Estimation;

class Journal extends Model
{
    use HasFactory;

    protected $fillable = [
        'estimation_id',
        'user_id',
        'balance',
        'initial_balance',
        'created_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function estimation()
    {
        return $this->belongsTo(Estimation::class, 'estimation_id');
    }
}
