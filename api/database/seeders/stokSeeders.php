<?php

namespace Database\Seeders;

use App\Models\Stok;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class stokSeeders extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Stok::create([
            "nama" => fake()->name(),
            "hargabeli" => Str::password(5, letters:false, symbols:false),
            "hargajual" => Str::password(5, letters:false, symbols:false),
            "stok" => Str::password(5, letters:false, symbols:false),
            "kategori" => fake()->name(),
        ]);
    }
}
