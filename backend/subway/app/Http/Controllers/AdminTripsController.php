<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\station;
use App\Models\trip;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class AdminTripsController extends Controller
{
    //composer require tymon/jwt-auth
    //php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
    //secret key : EErGPdlzVvJnyxOnYnKG8Js05nJq7hl1qPBMvQIj3L7v7ybMI67KFRTSEqWk1UcZ



    public function gettrips (Request $request){
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
                             $trip = trip::with(['originStation', 'destinationStation'])->get();

                    // Return the users as JSON response
                    return ['status'=>'success','trips'=>$trip];
                                }
                    else{
                      $trip = trip::with(['originStation', 'destinationStation'])->where('origin_station_id', $user["station_id"])
             ->orWhere('destination_station_id', $user["station_id"]) ->get();
             return ['status'=>'success','trips'=>$trip];
                               
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





    public function updatetrip(Request $request)
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
                   
                    $tripdata = trip::find($id);
                    
                    if($tripdata){
                    $tripdata->origin_station_id =intval( $request->origin_station_id);
                    $tripdata->destination_station_id = intval($request->destination_station_id);
                    $tripdata->price = floatval($request->price);
                    $tripdata->status = $request->status;
                    $tripdata->departure_time = $request->departure_time;
                    $tripdata->arrival_time = $request->arrival_time;

                 
                                       try {
      $tripdata->save();
} catch (\Exception $e) {
    // Log the error or handle it in some other way
    echo "Error: " . $e->getMessage();
    return response()->json(['status' => 'Error', 'message'=>'trip not created']);
}

                     return response()->json(['status'=>'success','message' => 'Trip Updated Successfully']);
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
    public function create_trip(Request $request){
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
                    $newtrip = new trip();
                    $newtrip->origin_station_id =intval( $request->origin_station_id);
                    $newtrip->destination_station_id = intval($request->destination_station_id);
                    $newtrip->price = floatval($request->price);
                    $newtrip->status = $request->status;
                    $newtrip->departure_time = $request->departure_time;
                    $newtrip->arrival_time = $request->arrival_time;
                    try {
    $newtrip->save();
} catch (\Exception $e) {
    // Log the error or handle it in some other way
    echo "Error: " . $e->getMessage();
    return response()->json(['status' => 'Error', 'message'=>'trip not created']);
}


                    

                    return response()->json(['status' => 'success', 'trip' => $newtrip]);
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
    public function gettrip(Request $request, $id)
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

                    $trip = trip::find($id);
                    $station=station::all();
                    if($trip){

                    // Redirect back to the user profile page or return a response as needed
                     return response()->json(['status'=>'success','trips'=>$trip,'station'=>$station]);
                    }

                    
                    else{
                       return response()->json(['status'=>'fail', 'message'=>'Cannot Update trip']);
                               
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
    public function delete_trip($id)
    {
        try {
            // Find the user by ID
            $trip = trip::findOrFail($id);
            
            // Delete the user
            $trip->delete();
            
            // Return success response
            return response()->json(['status' => 'success', 'message' => 'trip deleted successfully']);
        } catch (\Exception $e) {
            // Log the error or handle it in some other way
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}
