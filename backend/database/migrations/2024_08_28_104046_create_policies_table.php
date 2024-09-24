<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('policies', function (Blueprint $table) {
            $table->id();
            $table->decimal('surplus', 4, 1);
            $table->decimal('cadangan', 4, 1);
            $table->decimal('dibagikan', 4, 1);
            $table->decimal('pemilik', 4, 1);
            $table->decimal('pengurus', 4, 1);
            $table->decimal('kesejahteraan', 4, 1);
            $table->decimal('wilayah_kerja', 4, 1);
            $table->decimal('sosial', 4, 1);
            $table->decimal('pendidikan', 4, 1);
            $table->decimal('transaksi', 4, 1);
            $table->decimal('modal', 4, 1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('policies');
    }
};
