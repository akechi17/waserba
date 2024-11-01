<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Information extends Model
{
    use HasFactory;
    protected $table = 'informations';

    protected $fillable = [
        'pdf'
    ];

    protected $appends = [
        'pdf_url',
    ];

    public function getPdfUrlAttribute()
    {
        return $this->pdf ? url($this->pdf) : null;
    }
}
