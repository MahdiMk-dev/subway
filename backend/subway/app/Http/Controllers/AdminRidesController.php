<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\ride;
use App\Models\station;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class AdminRidesController extends Controller
{
    //composer require tymon/jwt-auth
    //php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
    //secret key : EErGPdlzVvJnyxOnYnKG8Js05nJq7hl1qPBMvQIj3L7v7ybMI67KFRTSEqWk1UcZ



    public function getrides (Request $request){
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
                   
                             $rides = ride::with(['originStation', 'destinationStation'])->get();

                    // Return the users as JSON response
                    return ['status'=>'success','rides'=>$rides];
                                

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





        public function updateride(Request $request)
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
                   
                    $ridedata = ride::find($id);
                    
                    if($ridedata){
                     $ridedata->origin_station_id =intval( $request->origin_station_id);
                    $ridedata->destination_station_id = intval($request->destination_station_id);
                    $ridedata->price = floatval($request->price);
                    $ridedata->duration =floatval ($request->duration);
                    $ridedata->distance = floatval($request->distance);

                 
                                       try {
      $ridedata->save();
} catch (\Exception $e) {
    // Log the error or handle it in some other way
    echo "Error: " . $e->getMessage();
    return response()->json(['status' => 'Error', 'message'=>'ride not created']);
}

                     return response()->json(['status'=>'success','message' => 'Ride Updated Successfully']);
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
    }
    public function create_ride(Request $request){
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
                    $newride = new ride();
                    $newride->origin_station_id =intval( $request->origin_station_id);
                    $newride->destination_station_id = intval($request->destination_station_id);
                    $newride->price = floatval($request->price);
                    $newride->duration = floatval($request->duration);
                    $newride->distance = floatval($request->distance);
                    try {
    $newride->save();
} catch (\Exception $e) {
    // Log the error or handle it in some other way
    echo "Error: " . $e->getMessage();
    return response()->json(['status' => 'Error', 'message'=>'ride not created']);
}


                    

                    return response()->json(['status' => 'success', 'ride' => $newride]);
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
    }
    public function getride(Request $request, $id)
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

                    $ride = ride::find($id);
                    $station=station::all();
                    if($ride){

                    // Redirect back to the user profile page or return a response as needed
                     return response()->json(['status'=>'success','rides'=>$ride,'stations'=>$station]);
                    }

                    
                    else{
                       return response()->json(['status'=>'fail', 'message'=>'Cannot Update ride']);
                               
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
    public function delete_ride($id)
    {
        try {
            // Find the user by ID
            $ride = ride::findOrFail($id);
            
            // Delete the user
            $ride->delete();
            
            // Return success response
            return response()->json(['status' => 'success', 'message' => 'ride deleted successfully']);
        } catch (\Exception $e) {
            // Log the error or handle it in some other way
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}
