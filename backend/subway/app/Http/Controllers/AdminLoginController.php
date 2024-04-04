<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class AdminLoginController extends Controller
{
    //composer require tymon/jwt-auth
    //php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
    //secret key : EErGPdlzVvJnyxOnYnKG8Js05nJq7hl1qPBMvQIj3L7v7ybMI67KFRTSEqWk1UcZ

    // Handle the login request
    public function login(Request $request)
    {
         $user = User::where('email', $request->email)->first();

        if (!$user) {
             return response()->json(['message' => 'Invalid Email','status'=>'fail'], 401);
        }

        if (!password_verify($request->password, $user->password)) {
             return response()->json(['message' => 'Invalid  password','status'=>'fail'], 401);
        }
        $token = JWTAuth::fromUser($user,[
                'id' => $user->id,
                'type' => $user->type,
            ]);
        return response()->json(['message' => 'Login successful','status'=>'success','token'=>$token,'type'=>$user->type], 200);
    
    }



    public function getusers (Request $request){
     if ($request->header('Authorization')) {
            // Extract the token from the Authorization header
            $token = $request->header('Authorization');
            // Check if the token starts with 'Bearer '
            if (Str::startsWith($token, 'Bearer ')) {
                // Extract the token without 'Bearer ' prefix
                $jwtToken = Str::substr($token, 7);
                // Now you have the JWT token
                // You can validate, decode, or perform any operation you need with the token
                // For example, you can use the JWTAuth facade
                try {
                    $user = JWTAuth::parseToken()->authenticate();
                    
                    if($user["type"]=='admin'){
                             $users = User::all();

        // Return the users as JSON response
        return ['status'=>'success','users'=>$users];
                    }
                    else{
                  return ['status'=>'success','users'=>[],'admin'=>false];
                   
                    }
                } catch (TokenExpiredException $e) {
    // Token has expired
    return response()->json(['status'=>'fail','message' => 'token_expired'], 401);
} catch (TokenInvalidException $e) {
    // Token is invalid
    return response()->json(['status'=>'fail','message' => 'token_invalid'], 401);
} catch (\Exception $e) {
    // Other exceptions

    return response()->json(['status'=>'fail','message' => 'token_exception'], 401);
}
            }
        }
        else {
            return response()->json(['status'=>'fail','message' => 'no token found'], 401);
        }

    }
}
