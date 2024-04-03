<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Trip;
use App\Models\coin_request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
class AdminDashboardController extends Controller
{

    // Handle the login request
    public function gethomedata(Request $request)
    {     if ($request->header('Authorization')) {
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
                    $trips = Trip::with(['originStation', 'destinationStation'])->get();
                    $coin_request=coin_request::with(['passenger'])->get();
                     return ['status'=>'success','trips'=>$trips,'coins'=>$coin_request];
                    }
                    else{
                    
                    $trips = Trip::with(['originStation', 'destinationStation'])->where('origin_station_id', $user["station_id"])
             ->orWhere('destination_station_id', $user["station_id"]) ->get();
                    $coin_request=coin_request::all();
                     return ['status'=>'success','trips'=>$trips,'coins'=>[]];
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

 
    
    }
 
}
