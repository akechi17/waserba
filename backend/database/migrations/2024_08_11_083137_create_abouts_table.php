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
        Schema::create('abouts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->bigInteger('legal_entity_id')->nullable();
            $table->date('legal_entity_date')->nullable();
            $table->string('president')->nullable();
            $table->string('vice_president')->nullable();
            $table->string('secretary')->nullable();
            $table->string('supervisor')->nullable();
            $table->string('supervisor2')->nullable();
            $table->string('supervisor3')->nullable();
            $table->string('treasurer')->nullable();
            $table->string('syariah_supervisor')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('phone')->nullable();
            $table->string('accounting_period')->nullable();
            $table->string('accounting_year')->nullable();
            $table->date('first_accounting_date')->nullable();
            $table->date('last_accounting_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abouts');
    }
};
