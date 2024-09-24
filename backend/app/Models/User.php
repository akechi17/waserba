<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'phone',
        'password',
        'avatar',
        'address',
        'city',
        'postcode',
        'status',
        'last_login',
        'last_login_ip',
        'role',
        'deleted_at'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            if (empty($user->id)) {
                $user->id = static::generateCustomId($user->role);
            }
        });
    }

    protected static function generateCustomId($role)
    {
        $prefix = $role === 'notmember' ? 'B-' : 'A-';
        $lastId = static::where('id', 'like', $prefix.'%')
                        ->orderBy('id', 'desc')
                        ->value('id');
        
        if ($lastId) {
            $number = (int)substr($lastId, -4) + 1;
        } else {
            $number = 1;
        }

        return $prefix . str_pad($number, 4, '0', STR_PAD_LEFT);
    }

    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_login' => 'datetime',
        'id' => 'string',
    ];

    protected $appends = [
        'avatar_url',
        'total_musyarakah',
        'total_mudharabah',
        'total_murabahah',
        'sim_pok',
        'sim_waj',
        'sim_wakhusus',
        'sim_suk',
        'taqurban',
        'tab_lain',
        'modal',
        'transaksi'
    ];

    public function getAvatarUrlAttribute()
    {
        return $this->avatar ? url($this->avatar) : asset("https://ui-avatars.com/api/?name={$this->name}&amp;background=277bc0&amp;color=fff");
    }

    protected function calculateAttribute($equityField, $estimationId)
    {
        $saldoAwal = $this->equities()->value($equityField);
        $debitSum = $this->journals()
            ->where('estimation_id', $estimationId)
            ->where('balance', 'debit')
            ->sum('initial_balance');
        $kreditSum = $this->journals()
            ->where('estimation_id', $estimationId)
            ->where('balance', 'kredit')
            ->sum('initial_balance');

        if (is_null($saldoAwal)) {
            return $kreditSum - $saldoAwal;
        } else {
            return $saldoAwal - $debitSum + $kreditSum;
        }
    }

    public function getTotalMusyarakahAttribute()
    {
        $receivablesSum = $this->receivables()->sum('musyarakah');
        $debitSum = $this->journals()->where('balance', 'debit')->where('estimation_id', '1-120')->sum('initial_balance');
        $kreditSum = $this->journals()->where('balance', 'kredit')->where('estimation_id', '1-120')->sum('initial_balance');
        return $receivablesSum + $debitSum - $kreditSum;
    }

    public function getTotalMudharabahAttribute()
    {
        $receivablesSum = $this->receivables()->sum('mudharabah');
        $debitSum = $this->journals()->where('balance', 'debit')->where('estimation_id', '1-121')->sum('initial_balance');
        $kreditSum = $this->journals()->where('balance', 'kredit')->where('estimation_id', '1-121')->sum('initial_balance');
        return $receivablesSum + $debitSum - $kreditSum;
    }

    public function getTotalMurabahahAttribute()
    {
        $receivablesSum = $this->receivables()->sum('murabahah');
        $debitSum = $this->journals()->where('balance', 'debit')->where('estimation_id', '1-122')->sum('initial_balance');
        $kreditSum = $this->journals()->where('balance', 'kredit')->where('estimation_id', '1-122')->sum('initial_balance');
        return $receivablesSum + $debitSum - $kreditSum;
    }

    public function getSimPokAttribute()
    {
        return $this->calculateAttribute('pokok', '3-110');
    }

    public function getSimWajAttribute()
    {
        return $this->calculateAttribute('wajib', '3-120');
    }

    public function getSimWakhususAttribute()
    {
        return $this->calculateAttribute('modal_penyertaan', '2-320');
    }

    public function getSimSukAttribute()
    {
        return $this->calculateAttribute('sukarela', '2-110');
    }

    public function getTaqurbanAttribute()
    {
        return $this->calculateAttribute('qard_rahn', '2-132');
    }

    public function getTabLainAttribute()
    {
        return $this->calculateAttribute('wadiah', '2-121');
    }

    public function getModalAttribute()
    {
        $userSum = $this->sim_pok + $this->sim_waj + $this->sim_wakhusus;

        $totalSum = User::all()->sum(function($user) {
            return $user->sim_pok + $user->sim_waj + $user->sim_wakhusus;
        });

        return $totalSum > 0 ? $userSum / $totalSum : 0;
    }

    public function getTransaksiAttribute()
    {
        
    }

    public function receivables()
    {
        return $this->hasMany(Receivable::class);
    }

    public function equities()
    {
        return $this->hasMany(Equity::class);
    }

    public function journals()
    {
        return $this->hasMany(Journal::class);
    }

    public function pastProfits()
    {
        return $this->hasMany(PastProfit::class);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 1);
    }

    public function scopeInactive($query)
    {
        return $query->where('status', 0);
    }

    public function scopeSearch($query, $search)
    {
        return $query->where('name', 'like', "%$search%")
                    ->where('email', 'like', "%$search%");
    }
}