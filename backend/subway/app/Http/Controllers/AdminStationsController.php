<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\station;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class AdminStationsController extends Controller
{
    //composer require tymon/jwt-auth
    //php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
    //secret key : EErGPdlzVvJnyxOnYnKG8Js05nJq7hl1qPBMvQIj3L7v7ybMI67KFRTSEqWk1UcZ



    public function getstations (Request $request){
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
                             $stations = station::all();

                    // Return the users as JSON response
                    return ['status'=>'success','stations'=>$stations,"allstations"=>$stations];
                                }
                    else{
                      $stations = Station::where('id', $user["station_id"])->get();
                      $stationsall = station::all();
                              return ['status'=>'success','stations'=>$stations,'admin'=>false,"allstations"=>$stationsall];

                               
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
        else {
            return response()->json(['status'=>'fail','message' => 'no token found'], 401);
        }

    }



    public function updatestation(Request $request)
    {

        // Validate the incoming request data
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


                    $id=intval($request->id);
                   
                    $stationdata = station::find($id);

                    if($stationdata){
                    $stationdata->name = $request->name;
                    $stationdata->lng = floatval($request->lng);
                    $stationdata->lat = floatval($request->lat);
                    $stationdata->city = $request->city;
                    $stationdata->status = $request->status;
                    $stationdata->closing_at = $request->closing_at;
                    $stationdata->openning_at = $request->openning_at;

                 
                                       try {
      $stationdata->save();
} catch (\Exception $e) {
    // Log the error or handle it in some other way
    echo "Error: " . $e->getMessage();
    return response()->json(['status' => 'Error', 'message'=>'station not created']);
}

                     return response()->json(['status'=>'success','message' => 'Station Updated Successfully']);
                    }
                    else{
                     return response()->json(['status'=>'fail', 'message'=>'Station Not found']);   
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
        else {
            return response()->json(['status'=>'fail','message' => 'no token found'], 401);
        }
    }
    public function create_station(Request $request){
        // Validate the incoming request data
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
                    
                    if($user){
                    $newstation = new station();
                    $newstation->name = $request->name;
                    $newstation->lng = floatval($request->lng);
                    $newstation->lat = floatval($request->lat);
                    $newstation->city = $request->city;
                    $newstation->status = $request->status;
                    $newstation->closing_at = $request->closing_at;
                    $newstation->openning_at = $request->openning_at;
                    try {
    $newstation->save();
} catch (\Exception $e) {
    // Log the error or handle it in some other way
    echo "Error: " . $e->getMessage();
    return response()->json(['status' => 'Error', 'message'=>'station not created']);
}


                    

                    return response()->json(['status' => 'success', 'station' => $newstation]);
                    }
                    else{
                     return response()->json(['status'=>'fail', 'message'=>'User Token']);   
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
        else {
            return response()->json(['status'=>'fail','message' => 'no token found'], 401);
        }
    }
    public function getstation(Request $request, $id)
    {
        // Validate the incoming request data
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

                    $station = station::find($id);
                    if($station){

                    // Redirect back to the user profile page or return a response as needed
                     return response()->json(['status'=>'success','stations'=>$station]);
                    }
                    else{
                     return response()->json(['status'=>'fail', 'message'=>'station Not found']);   
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
        else {
            return response()->json(['status'=>'fail','message' => 'no token found'], 401);
        }
    }
    public function delete_station($id)
    {
        try {
            // Find the user by ID
            $user = station::findOrFail($id);
            
            // Delete the user
            $user->delete();
            
            // Return success response
            return response()->json(['status' => 'success', 'message' => 'station deleted successfully']);
        } catch (\Exception $e) {
            // Log the error or handle it in some other way
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}
