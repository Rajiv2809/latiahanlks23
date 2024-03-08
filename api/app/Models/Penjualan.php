<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Penjualan extends Model
{
    use HasFactory;

    protected $primaryKey = "IDTrans";


    protected $fillable = [
        'IDproduk',
        "tanggal",
        'qty',
        'hargajual',
        'total',
        'dibayar',
        'kembali',
    ];


    public function produk(){
        return $this->belongsTo(Stok::class);
    }
}
