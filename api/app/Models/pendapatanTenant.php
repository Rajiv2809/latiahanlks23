<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pendapatanTenant extends Model
{
    use HasFactory;

    protected $primaryKey ='IDpendapatan';

    protected $fillable = ['tanggal','IDtenant','totalPendapatan','setoranTenant'];

    
    public function tenant()
    {
        return $this->belongsTo(Tenant::class, 'IDtenant');
    }
}
