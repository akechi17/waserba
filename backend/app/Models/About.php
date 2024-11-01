<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'legal_entity_id',
        'legal_entity_date',
        'president',
        'vice_president',
        'secretary',
        'supervisor',
        'supervisor2',
        'supervisor3',
        'treasurer',
        'syariah_supervisor',
        'syariah_supervisor2',
        'syariah_supervisor3',
        'address',
        'city',
        'province',
        'phone',
        'accounting_period',
        'accounting_year',
        'first_accounting_date',
        'last_accounting_date',
        'pdf'
    ];

    protected $appends = [
        'pdf_url',
    ];

    public function getPdfUrlAttribute()
    {
        return $this->resume ? url($this->resume) : null;
    }
}
