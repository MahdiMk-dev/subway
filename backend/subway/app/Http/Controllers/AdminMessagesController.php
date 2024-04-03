<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\message;
use App\Models\ticket;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class AdminMessagesController extends Controller
{
    //composer require tymon/jwt-auth
    //php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
    //secret key : EErGPdlzVvJnyxOnYnKG8Js05nJq7hl1qPBMvQIj3L7v7ybMI67KFRTSEqWk1UcZ



    public function getmessages (Request $request){
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
                             $messages = message::with(['passenger', 'user'])->get();

                    // Return the users as JSON response
                    return ['status'=>'success','messages'=>$messages];
                                }
                    else{
                      $messages = message::with(['passenger', 'user'])->where('user_id', $user["id"]) ->get();
             return ['status'=>'success','messages'=>$messages];
                               
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
        public function create_message(Request $request){
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
                
                    $user = JWTAuth::parseToken()->authenticate();
                    
                    if($user){
                    $newmessage = new message();
                    $newmessage->passenger_id =intval( $request->passenger_id);
                    $newmessage->content = $request->content;
                    $newmessage->user_id = floatval($user->id);
                    try {
    $newmessage->save();
     return response()->json(['status' => 'success', 'message'=>'message sent ']);
} catch (\Exception $e) {
    // Log the error or handle it in some other way
    echo "Error: " . $e->getMessage();
    return response()->json(['status' => 'Error', 'message'=>'ride not created']);
}
}

}
}
} 

      public function getmessagepassenger(Request $request){

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
                
                    $user = JWTAuth::parseToken()->authenticate();
                    
                    if($user){
                      
                        if($user["type"]=='admin'){
                             $distinctMessages =  Message::select('passenger_id') ->with(['passenger'])
    ->groupBy('passenger_id')
    ->get();

                    // Return the users as JSON response
                    return ['status'=>'success','passenger'=>$distinctMessages];
                                }
                    else{
                       
                 /*  $distinctMessages = Message::select('passenger_id') // 
    ->with(['user','passenger'])
    ->where('user_id', $user->id)
    ->groupBy('passenger_id')
    ->get();*/
    $tationid=$user->station_id;
    $distinctMessages = ticket::with('passenger')
    ->whereHas('trip', function ($query) use ($tationid) {
        $query->where('origin_station_id', $tationid)
            ->orWhere('destination_station_id', $tationid);
    })
    ->get(['passenger_id']);
                        return response()->json(['status' => 'success', 'passenger'=>$distinctMessages]);
                }
                



}
}}}
}