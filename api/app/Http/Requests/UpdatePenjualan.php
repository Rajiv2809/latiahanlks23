<?php

namespace App\Http\Requests;


use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdatePenjualan extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "IDproduk" => "nullable",
            "tanggal" => "nullable",
            "qty" => "nullable",
            "hargajual" => "nullable",
            "total" => "nullable",
            "hargadibayar" => "nullable",
            "kembali" => "nullable",
        ];
        
    }
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Data cannot be processed',
                'errors' => $validator->errors(),
            ], 422)
        );
    }
    
}

