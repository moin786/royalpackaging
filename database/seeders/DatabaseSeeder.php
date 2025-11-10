<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'moinuddin7@gmail.com'],
            [
                'name' => 'Moin',
                'password' => '12345678',
                'email_verified_at' => now(),
            ]
        );
        
        $this->call([
            CategorySeeder::class,
            ProductSeeder::class,
            DeliverySeeder::class
        ]);
        

        
    }
}
