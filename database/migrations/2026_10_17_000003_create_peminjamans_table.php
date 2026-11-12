<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('peminjamans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('alat_id')->constrained('alats')->cascadeOnDelete();
            $table->string('borrower_name');
            $table->string('borrower_class');
            $table->date('borrow_date');
            $table->date('return_estimate');
            $table->date('return_date')->nullable();
            $table->enum('status', ['Sedang Dipinjam', 'Dikembalikan'])->default('Sedang Dipinjam');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('peminjamans');
    }
};
