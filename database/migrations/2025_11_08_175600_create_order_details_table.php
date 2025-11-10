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
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->string('transaction_id', 50)->unique();
            $table->timestamp('transaction_date');
            $table->string('delivery_area', 20)->nullable();
            $table->unsignedInteger('delivery_charge')->nullable()->default(0);
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('minimum_unit')->nullable()->default(0);
            $table->unsignedInteger('unit_price')->nullable()->default(0);
            $table->float('unit_weight')->nullable()->default(0);
            $table->unsignedInteger('qty')->default(0);
            $table->unsignedInteger('total_pc')->nullable()->default(0);
            $table->unsignedInteger('total_price')->nullable()->default(0);
            $table->float('total_weight')->nullable()->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};
