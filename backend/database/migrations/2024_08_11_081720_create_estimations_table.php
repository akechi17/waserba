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
        Schema::create('estimations', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->enum('group', ['harta', 'kewajiban', 'modal', 'pendapatan', 'biaya']);
            $table->enum('balance', ['debit', 'kredit']);
            $table->bigInteger('initial_balance')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estimations');
    }
};
