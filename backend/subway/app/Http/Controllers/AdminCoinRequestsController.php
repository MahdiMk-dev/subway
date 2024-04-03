<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\passenger;
use App\Models\coin_request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class AdminCoinRequestsController extends Controller
{
    //composer require tymon/jwt-auth
    //php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
    //secret key : EErGPdlzVvJnyxOnYnKG8Js05nJq7hl1qPBMvQIj3L7v7ybMI67KFRTSEqWk1UcZ



    public function getcoinrequest (Request $request){
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
                             $coins = coin_request::with(['passenger'])->get();

                    // Return the users as JSON response
                    return ['status'=>'success','coins'=>$coins];
                                }
                    else{
                              return ['status'=>'success','coins'=>[],'admin'=>false];
                               
                    }
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


    public function approverequest (Request $request,$id){
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
                        
                             $coins = coin_request::find(intval($id));
                             
                             $coins->status='approved';
                             $coins->save();

                             $passenger=passenger::find(intval($coins->passenger_id));
                             $passenger->balance=$passenger->balance+$coins->amount;
                             $passenger->save();

                    // Return the users as JSON response
                    return ['status'=>'success'];
                                }
                    else{
                              return ['status'=>'success','coins'=>[],'admin'=>false];
                               
                    }
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
        public function rejectrequest (Request $request,$id){
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
                             $coins = coin_request::find($id);
                             $coins->status='rejected';
                             $coins->save();

                    // Return the users as JSON response
                    return ['status'=>'success'];
                                }
                    else{
                              return ['status'=>'success','coins'=>[],'admin'=>false];
                               
                    }
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
