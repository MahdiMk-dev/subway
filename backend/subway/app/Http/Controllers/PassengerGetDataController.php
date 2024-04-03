<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Passenger;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class PassengerGetDataController extends Controller
{
    //composer require tymon/jwt-auth
    //php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
    //secret key : EErGPdlzVvJnyxOnYnKG8Js05nJq7hl1qPBMvQIj3L7v7ybMI67KFRTSEqWk1UcZ

    // Handle the login request
    public function getInfo(Request $request)
    {
        if ($request->header('Authorization')) {
            // Extract the token from the Authorization header
            $token = $request->header('Authorization');

            // Check if the token starts with 'Bearer '
            if (Str::startsWith($token, 'Bearer ')) {
                // Extract the token without 'Bearer ' prefix
                $jwtToken = Str::substr($token, 7);
                $id=1;
                

                // Now you have the JWT token
                // You can validate, decode, or perform any operation you need with the token
                // For example, you can use the JWTAuth facade
                try {
                    //$user =  JWTAuth::parseToken()->authenticate();
                    //var_dump($user);
                    // Return the users as JSON response
                    //return ['status'=>'success','user'=>$user];
                    $passenger = Passenger::find($id);
                    
                    if ($passenger) {

                        $passengerData = $passenger->toJson();
                        return response()->json(['status'=>'success','passenger' => $passengerData], 200);
                    } else {
                        return response()->json(['status'=>'fail','message' => 'user not found'], 401);
                    }
                               
                    
                 } catch (TokenExpiredException $e) {
                
                     return response()->json(['status'=>'fail','message' => 'token_expired'], 401);
                } catch (TokenInvalidException $e) {
                        // Token is invalid
                        return response()->json(['status'=>'fail','message' => 'token_invalid'], 401);
                } catch (\Exception $e) {
                        // Other exceptions
                        var_dump($e);
                        return response()->json(['status'=>'fail','message' => 'token_exception'], 401);
                }
            }
        }

    }
    public function getRides(Request $request)
    {
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
                    var_dump($user);
                    // Return the users as JSON response
                    return ['status'=>'success','user'=>$user];
                                
                    
                 } catch (TokenExpiredException $e) {
                
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
