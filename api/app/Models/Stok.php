<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stok extends Model
{
    use HasFactory;

    protected $primaryKey = "IDproduk";

    protected $fillable = [
        "nama","hargajual","hargabeli","stok", "kategori",
    ];

    public function penjualan(){
        return $this->hasMany(Penjualan::class);
    }
}
