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
        Schema::create('passengers', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('image_url');
            $table->string('phone_number'); //string to enable using country codes ('+' or '/')
            $table->string('city');
            $table->string('gender');
            $table->date('dob');
            $table->double('balance');//coin balance
            $table->timestamp('created_at');
            $table->timestamp('updated_at');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('passengers');

    }
};
