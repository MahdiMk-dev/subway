<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\passenger;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class PassengerLoginController extends Controller
{
    // Handle the login request
    public function login(Request $request)
    {
        $passenger = passenger::where('email', $request->email)->first();
        if (!$passenger) {
             return response()->json(['message' => 'Invalid Email','status'=>'fail'], 401);
}

        if (!password_verify($request->password, $passenger->password)) {
             return response()->json(['message' => 'Invalid password','status'=>'fail'], 401);
}
        
        $token = JWTAuth::fromUser($passenger,[
            'id' => $passenger->id
        ]);
        return response()->json(['message' => 'Login successful','status'=>'success','token'=>$token,'passenger'=>$passenger], 200);
    
    }

}
