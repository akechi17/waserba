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
        'treasurer',
        'syariah_supervisor',
        'address',
        'city',
        'province',
        'phone',
        'accounting_period',
        'accounting_year',
        'last_year',
        'first_accounting_date',
        'last_accounting_date'
    ];
}
