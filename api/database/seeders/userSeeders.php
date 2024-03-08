<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class userSeeders extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'username' => 'admin',
            'password' => bcrypt('password'),
            'role' => 'admin'
        ]);
        User::create([
            'username' => 'kasir',
            'password' => bcrypt('password'),
            'role' => 'kasir'
        ]);
    }
}
