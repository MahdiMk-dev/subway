<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\station;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserCreated;

class AdminUserController extends Controller
{
    public function updateuser(Request $request)
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

                    if($user["type"]=='admin'){
                      // var_dump($request) ; 
                    

                    $id=$request->id;
                  
                    $userdata = User::find(intval($id));

                    if($userdata){
                    $userdata->name = $request->name;
                    $userdata->email = $request->email;
                    $userdata->type = $request->type;
                    $userdata->phone_number = $request->phone_number;
                    $userdata->status = $request->status;
                    $userdata->station_id = intval($request->station_id);

                   $userdata->save();

                     return response()->json(['status'=>'success','message' => 'USer Updated Successfully']);
                    }
                    else{
                     return response()->json(['status'=>'fail', 'message'=>'User Not found']);   
                    }
                    }
                    else{
                       return response()->json(['status'=>'fail', 'message'=>'Cannot Update user']);
                               
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
    public function create_user(Request $request){
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
                    $newuser = new User();
                    $newuser->name = $request->name;
                    $newuser->email = $request->email;
                     $newuser->phone_number = $request->phone_number;
                      $newuser->status = $request->status;
                      $newuser->image_url='';
                       $newuser->type = $request->type;
                        $newuser->station_id = intval($request->station_id);
                        $newuser->password =  Hash::make($request->password);
                    // Set other attributes as needed
                      //  var_dump($newuser);
                    // Save the user to the database
                    try {
    $newuser->save();
    //$userName=$newuser->email;
    //$password=$request->password;
    //Mail::to($newuser->email)->send(new UserCreated($userName,$password));
} catch (\Exception $e) {
    // Log the error or handle it in some other way
    echo "Error: " . $e->getMessage();
    return response()->json(['status' => 'Error', 'message'=>'User not created']);
}


                    

                    return response()->json(['status' => 'success', 'user' => $newuser]);
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
    public function getuser(Request $request, $id)
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
                    if($user["type"]=='admin'){
                    $station=station::all();
                    // Find the user by ID
                    $user = User::find($id);
                    if($user){

                    // Redirect back to the user profile page or return a response as needed
                     return response()->json(['status'=>'success', 'user'=>$user,'stations'=>$station]);
                    }
                    else{
                     return response()->json(['status'=>'fail', 'message'=>'User Not found']);   
                    }
                    }
                    else{
                       return response()->json(['status'=>'fail', 'message'=>'Cannot Update user']);
                               
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
    public function delete_user($id)
    {
        try {
            // Find the user by ID
            $user = User::findOrFail($id);
            
            // Delete the user
            $user->delete();
            
            // Return success response
            return response()->json(['status' => 'success', 'message' => 'User deleted successfully']);
        } catch (\Exception $e) {
            // Log the error or handle it in some other way
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

}
