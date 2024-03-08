<?php

namespace App\Http\Controllers;

use App\Traits\ResponseHttpStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
    {
        use ResponseHttpStatus;

    public function login(Request $request){
        
        $data = [
            "username" => $request->username,
            "password" => $request->password
        ];
        if(!Auth::attempt($data)){
            return $this->unauthoticated('Invalid Login');
        }    

        $user = Auth::user();
        $token = md5($user->username);
        $user->remember_token = $token;
        $user->save();

        return $this->success([
            'username' => $user->username,
            'token' => $token,
            'role' => $user->role,
            'message' => 'Login Success'
            
        ]);
        
    }
    public function logout(){
        $user = Auth::user();
        $user->remember_token = null;
        $user->save();


        Auth::logout();

        return $this->success([
            'message' => 'logout success'
        ]);

    }
    public function user(){
        $user = Auth::user();

        return response()->json([
            'username'=> $user->username,
            'role' => $user->role
        ]);
        
    }
}
