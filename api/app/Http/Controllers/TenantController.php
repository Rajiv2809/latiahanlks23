<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use Illuminate\Http\Request;
use App\Traits\ResponseHttpStatus;
use App\Http\Requests\TenantRequest;
use App\Http\Requests\UpdataTenantRequest;

class TenantController extends Controller
{
    use ResponseHttpStatus;

    public function addData(TenantRequest $request){
        
        $data = $request->all();

        Tenant::create($data);

        return $this->messageSuccess("create success", );


    }

    public function alldata(){
        $data = Tenant::all();
        return $this->success($data);
    }
    public function getData($id){
        $data = Tenant::find($id);

        if(!$data){
           return $this->notFound('data not dound');
        }

        return $this->success($data);


    }
    public function updateData($id , UpdataTenantRequest $request){   
        $data = Tenant::find($id);
        $valid = $request->validated();

        if(!$data){
        return $this->notFound('data not found');

        }
        $data->update($valid);

        return $this->success('update success');

        
    }
    public function deleteData($id){
        $data = Tenant::find($id);

        if(!$data){
            return $this->notFound('data not found');
        }
        $data->delete();

        return $this->messageSuccess('delete success');


    }


}
