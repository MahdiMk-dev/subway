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
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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
        else {
            return response()->json(['status'=>'fail','message' => 'no token found'], 401);
        }
    }
    public function create_user(Request $request){
        // Validate the incoming request data
        $email = user::where('email', $request->email)->first();

        if ($email) {
             return response()->json(['message' => 'already exists Email','status'=>'duplicate'], 401);
        }   
        else{
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
                        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_';

                        // Shuffle the characters to make the password more random
                        $shuffledChars = str_shuffle($chars);

                        // Get a substring of the shuffled characters with the desired length
                        $password = substr($shuffledChars, 0, 8);
                    $newuser = new User();
                    $newuser->name = $request->name;
                    $newuser->email = $request->email;
                     $newuser->phone_number = $request->phone_number;
                      $newuser->status = $request->status;
                      $newuser->image_url='';
                       $newuser->type = $request->type;
                        $newuser->station_id = intval($request->station_id);
                        $newuser->password =  Hash::make($password);
                    // Set other attributes as needed
                      //  var_dump($newuser);
                    // Save the user to the database
                 

    //

    $userName=$newuser->email;

    $reveiverEmailAddress = $newuser->email;

$mail = new PHPMailer(true);
try {        $newuser->save();
   
            /* Email SMTP Settings */
            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->Host = env('MAIL_HOST');
            $mail->SMTPAuth = true;
            $mail->Username = env('MAIL_USERNAME');
            $mail->Password = env('MAIL_PASSWORD');
            $mail->SMTPSecure = env('MAIL_ENCRYPTION');
            $mail->Port = env('MAIL_PORT');
   
            $mail->setFrom(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
            $mail->addAddress($newuser->email);
   
            $mail->isHTML(true);
   
            $mail->Subject = "Branch User Created Email";
                     $content = "<h1>Welcome to Our Platform</h1>";
        $content .= "<p>Thank you for joining us! Below is your username and password:</p>";
        $content .= "<p><strong>Username:</strong> ".$userName."</p>";
        $content .= "<p><strong>Password:</strong> ".$password."</p>";
            $mail->Body    = $content;
   
            if( !$mail->send() ) {
                return response()->json(['status'=>'fail', 'message'=>'failed to create user']);
            }
              
            else {
               return response()->json(['status'=>'success', 'user'=>$newuser]);
            }
   
        } catch (Exception $e) {
             return response()->json(['status'=>'fail', 'message'=>'failed to create user']);
        }
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
        else {
            return response()->json(['status'=>'fail','message' => 'no token found'], 401);
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
