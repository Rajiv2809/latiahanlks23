<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    use HasFactory;

    protected $primaryKey = 'IDtenant';

    protected $fillable = [
        'namatenant','detail'
    ] ;
    
    public function pendapatanTenants()
    {
        return $this->hasMany(PendapatanTenant::class);
    }

}
