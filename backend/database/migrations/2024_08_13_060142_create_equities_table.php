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
        Schema::create('equities', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->bigInteger('pokok')->nullable();
            $table->bigInteger('wajib')->nullable();
            $table->bigInteger('modal_penyertaan')->nullable();
            $table->bigInteger('sukarela')->nullable();
            $table->bigInteger('qard_rahn')->nullable();
            $table->bigInteger('wadiah')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equities');
    }
};
