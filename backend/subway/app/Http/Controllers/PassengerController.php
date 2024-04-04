<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Passenger;
use App\Models\Trip;
use App\Models\User;
use App\Models\Message;

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
        // Extract the passenger ID from the JWT token payload
        $token = JWTAuth::parseToken();
        $passengerId = $token->getPayload()->get('sub');
    
        // Retrieve passenger by ID
        $passenger = Passenger::findOrFail($passengerId);
    
        // Retrieve all trips for the passenger through tickets table
        $trips = Trip::whereIn('id', function($query) use ($passengerId) {
                    $query->select('trip_id')->from('tickets')->where('passenger_id', $passengerId);
                })->get();
    
        // Retrieve previous trips for the passenger (trips before today's date)
        $previousTrips = Trip::whereIn('id', function($query) use ($passengerId) {
                            $query->select('trip_id')->from('tickets')->where('passenger_id', $passengerId);
                        })->where('departure_time', '<', Carbon::today())
                        ->get();
    
        // Return data as JSON response
        return response()->json([
            'passenger' => $passenger,
            'trips' => $trips,
            'previous' => $previousTrips
        ]);
    }
    
    
    
    public function coinRequest(Request $request)
    {
        // Validate the request data
        $request->validate([
            'amount' => 'required|integer|min:1', // Example validation rules, adjust as needed
        ]);

        // Extract the passenger ID from the JWT token payload
        $token = JWTAuth::parseToken();
        $passengerId = $token->getPayload()->get('sub');

        // Create a new coin request instance
        $coinRequest = new coin_request();
        $coinRequest->passenger_id = $passengerId;
        $coinRequest->amount = $request->input('amount');
        $coinRequest->status = 'pending'; // Set default status
        $coinRequest->save();

        // Return success response
        return response()->json([
            'message' => 'Coin request created successfully',
            'coin_request' => $coinRequest,
        ], 201);
    }
    public function addMessage(Request $request)
{
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
}
}
