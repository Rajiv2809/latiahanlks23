<?php

namespace App\Http\Controllers;

use App\Models\Penjualan;
use Illuminate\Http\Request;
use App\Http\Requests\stokRequest;
use App\Traits\ResponseHttpStatus;
use App\Http\Requests\UpdatePenjualan;
use App\Http\Requests\PenjualanRequest;
use Barryvdh\DomPDF\Facade\pdf;
use Illuminate\Support\Facades\Validator;

class PenjualanController extends Controller
{

    use ResponseHttpStatus;

    public function addData(PenjualanRequest $request)
    {
        $data = $request->all();
        $data["total"] = $request->hargajual * $request->qty;

        $data["kembali"] = $request->dibayar - $data['total'];
        
        Penjualan::create($data);
        return $this->messageSuccess("created success");
    }
    public function allData()
    {


        $data = Penjualan::all();

        return $this->Success($data);
    }
    public function getData($id)
    {
        $data = Penjualan::find($id);

        if (!$data) {
            return $this->notFound("data cannot find");
        }

        return $this->success($data);
    }


    public function updateData(Request $request, $id)
    {
        $data = Penjualan::find($id);

        if (!$data) {
            return $this->notFound("Data not found");
        }

        $validator = Validator::make($request->all(), [
            "IDproduk" => "nullable",
            "tanggal" => "nullable",
            "qty" => "nullable",
            "hargajual" => "nullable",
            "total" => "nullable",
            "dibayar" => "nullable",
            "kembali" => "nullable",
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'data cannot be update',
                'errors' => $validator->errors(),
            ], 400);
        }
        $input = $request->all();
        $data->update($input);
        return $this->messageSuccess("Update success");
    }
    public function deleteData($id){
        $data = Penjualan::find($id);
        if(!$data){
            return $this->notFound("data cannot be delete") ;
        }
        $data->delete();
        return $this->messageSuccess('delete success');
    }
    public function struk($id)
    {
        $penjualan = Penjualan::find($id);

        $pdf = PDF::loadView('struk', ["penjualan" => $penjualan]);

        return $pdf->download('struk.pdf');
    }
    

}
