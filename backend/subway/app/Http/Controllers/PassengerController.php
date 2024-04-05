<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Passenger;
use App\Models\Trip;
use App\Models\User;
use App\Models\Message;
use App\Models\ticket;
use App\Models\review;
use Carbon\Carbon;
use App\Models\coin_request;


use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class PassengerController extends Controller
{
    public function show(Request $request)
    {
        try{
        // Extract the passenger ID from the JWT token payload
        $token = JWTAuth::parseToken();
        $passengerId = $token->getPayload()->get('sub');
    
        // Retrieve passenger by ID
        $passenger = Passenger::findOrFail($passengerId);
    
        // Retrieve all trips for the passenger through tickets table

        $previousTrips = ticket::with(['passenger', 'trip.originStation', 'trip.destinationStation'])
            ->whereHas('passenger', function ($query) use ($passengerId) {
                $query->where('id', $passengerId);
            })
            ->whereHas('trip', function ($query) {
                $query->where('arrival_time', '<', Carbon::today());
            })
            ->get();
        
    
        // Retrieve previous trips for the passenger (trips before today's date)

        $trips = ticket::with(['passenger', 'trip.originStation', 'trip.destinationStation'])
            ->whereHas('passenger', function ($query) use ($passengerId) {
                $query->where('id', $passengerId);
            })
            ->whereHas('trip', function ($query) {
                $query->where('arrival_time', '>', Carbon::today());
            })
            ->get();
        
        $messages=message::with(['passenger','user'])->where('passenger_id',$passengerId)->get();
        $coins=coin_request::with(['passenger'])->where('passenger_id',$passengerId)->get();
                       
    
        // Return data as JSON response
        return response()->json([
            'status'=>'success',
            'passenger' => $passenger,
            'trips' => $trips,
            'previous' => $previousTrips,
            'messages' => $messages,
            'coins'=>$coins
        ]);
    }catch (TokenExpiredException $e) {
                
        return response()->json(['status'=>'fail','message' => 'token_expired'], 401);
   } catch (TokenInvalidException $e) {
           // Token is invalid
           return response()->json(['status'=>'fail','message' => 'token_invalid'], 401);
   } catch (\Exception $e) {
           // Other exceptions
           return response()->json(['status'=>'fail','message' => 'token_exception'], 401);
   }
    }
    
    
    
    public function coinRequest(Request $request)
    { 
        // Validate the request data
        $request->validate([
            'amount' => 'required|integer|min:1', // Example validation rules, adjust as needed
        ]);
try{
        // Extract the passenger ID from the JWT token payload
        $token = JWTAuth::parseToken();
        $passengerId = $token->getPayload()->get('sub');

        // Create a new coin request instance
        $coinRequest = new coin_request();
        $coinRequest->passenger_id = $passengerId;
        $coinRequest->amount = $request->amount;
        $coinRequest->status = 'pending'; // Set default status
        $coinRequest->save();

        // Return success response
        return response()->json([
            'status'=>'success',
            'message' => 'Coin request created successfully',
            'coin_request' => $coinRequest,
        ], 201);
    }catch (TokenExpiredException $e) {
                
        return response()->json(['status'=>'fail','message' => 'token_expired'], 401);
   } catch (TokenInvalidException $e) {
           // Token is invalid
           return response()->json(['status'=>'fail','message' => 'token_invalid'], 401);
   } catch (\Exception $e) {
           // Other exceptions
           return response()->json(['status'=>'fail','message' => 'token_exception'], 401);
   }
    }
    public function addreview(Request $request)
    {
        
try{
        // Extract the passenger ID from the JWT token payload
        $token = JWTAuth::parseToken();
        $passengerId = $token->getPayload()->get('sub');

        // Create a new coin request instance
        $review = new review();
        $review->passenger_id = $passengerId;
        $review->rate = $request->rate;
        $review->review_content =  $request->content; 
        $review->trip_id =  $request->trip_id; // Set default status
        $review->save();

        // Return success response
        return response()->json([
            'status'=>'success',
            'message' => 'Review added successfully',
            'coin_request' => $review,
        ], 201);
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
    public function addMessage(Request $request)
{
    try{
    // Extract the passenger ID from the JWT token payload
    $token = JWTAuth::parseToken();
    $passengerId = $token->getPayload()->get('sub');

    // Get the user's email and message content from the request
    $userEmail = $request->input('user_email');
    $messageContent = $request->input('message');

    // Find user by email
    $user = User::where('email', $userEmail)->firstOrFail();

    // Create a new message instance
    $message = new Message();
    $message->passenger_id = $passengerId;
    $message->user_id = $user->id;
    $message->content = $messageContent;
    $message->save();

    // Return success response
    return response()->json([
        'message' => 'Message added successfully',
        'passenger_id' => $passengerId,
        'user_id' => $user->id,
        'content' => $messageContent,
    ], 201);
}catch (TokenExpiredException $e) {
                
        return response()->json(['status'=>'fail','message' => 'token_expired'], 401);
   } catch (TokenInvalidException $e) {
           // Token is invalid
           return response()->json(['status'=>'fail','message' => 'token_invalid'], 401);
   } catch (\Exception $e) {
           // Other exceptions
           return response()->json(['status'=>'fail','message' => 'token_exception'], 401);
   }
}
public function editinfo(Request $request)
{
try{
    // Extract the passenger ID from the JWT token payload
    $token = JWTAuth::parseToken();
    $passengerId = $token->getPayload()->get('sub');

    // Create a new coin request instance
    $passenger = Passenger::findOrFail($passengerId);
    $passenger->first_name = $$request->first_name;
    $passenger->last_name = $request->last_name;
    $passenger->city = $request->city;
    $passenger->phone_number = $request->phone_number;
    $passenger->dob = $request->dob;
    $passenger->save();

    // Return success response
    return response()->json([
        'status'=>'success',
        'message' => 'updated successfully',
    ], 201);
}catch (TokenExpiredException $e) {
            
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
