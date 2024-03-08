<?php

namespace App\Http\Controllers;


use App\Models\Penjualan;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\pdf;
use App\Models\pendapatanTenant;
use App\Traits\ResponseHttpStatus;
use App\Http\Requests\PendapatanRequest;
use App\Http\Requests\UpdatePendapatanRequest;

class PendapatanController extends Controller
{
    use ResponseHttpStatus;

    public function addData(PendapatanRequest $request)
    {
        $data = $request->all();

        $data["setoranTenant"] = $request->totalPendapatan * (15 / 100);


        pendapatanTenant::create($data);

        return $this->messageSuccess("create success");
    }
    public function alldata()
    {
        $data = PendapatanTenant::all();

        return $this->success($data);
    }
    public function getData($id)
    {
        $data = PendapatanTenant::find($id);

        if (!$data) {
            return $this->notFound('data not found');
        }

        return $this->success($data);
    }

    public function updateData(UpdatePendapatanRequest $request, $id)
    {

        $vali = $request->all();

        $data = PendapatanTenant::find($id);

        if (!$data) {
            return $this->notFound('pendapatan not found');
        }

        $data->update($vali);

        return $this->success("update success");
    }
    public function deleteData($id)
    {
        $data = PendapatanTenant::find($id);

        if (!$data) {
            return $this->notFound("data not found");
        }

        $data->delete();
        return $this->messageSuccess("delete Success");
    }
    public function kwitansiPDF($id)
    {
        $pendapatan = PendapatanTenant::find($id);

        $pdf = PDF::loadView("kwitansi", ['pendapatan' => $pendapatan]);

        return $pdf->download('kwitansi.pdf');
    }
    public function struk($id)
    {
        $penjualan = Penjualan::find($id);

        $pdf = PDF::loadView('struk', ["penjualan" => $penjualan]);

        return $pdf->download('struk.pdf');
    }
}
