<?php

namespace App\Http\Controllers;

use App\Http\Requests\stokRequest;
use App\Http\Resources\stokResource;
use App\Models\Stok;
use App\Traits\ResponseHttpStatus;
use Illuminate\Http\Request;

class StokController extends Controller
{
    use ResponseHttpStatus;

    public function alldata(){
        
        return $this->success(new stokResource(Stok::all()));

    
    }
    public function getData($id){
        $stok = Stok::find($id);

        if(!$stok){
            return $this->notFound('Stok Not Found');
        }

        return $this->success(new stokResource($stok));

    }
    public function addData(stokRequest $request){
        $stok = $request->validated();
        Stok::create($stok);

        return $this->messageSuccess('create success');
    }
public function updateData(Request $request, $id)
{
    $stok = Stok::find($id);

    if (!$stok) {
        return $this->notFound('Data not found');
    }

    $validator = $request->validate([
        'nama' => 'nullable',
        'hargajual' => 'nullable',
        'hargabeli' => 'nullable',
        'stok' => 'nullable',
        'kategori' => 'nullable',
    ]);

    $stok->update($validator);
    return $this->messageSuccess('Update data successfully');
}
    public function deleteData($id){
       $stok = Stok::find($id);

        if(!$stok){
            return $this->notFound('Data Cannot Be delete');
        }


        $stok->delete();    
        
        
        return $this->messageSuccess('Deleted success');
    }
    
    
}
