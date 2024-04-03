<?php

namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Passenger;
use App\Models\Trip;
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

        // Retrieve all trips for the passenger
        $trips = Trip::where('passenger_id', $passengerId)->get();

        // Retrieve previous trips for the passenger (trips before today's date)
        $previousTrips = Trip::where('passenger_id', $passengerId)
                            ->where('departure_time', '<', Carbon::today())
                            ->get();

        // Return data as JSON response
        return response()->json([
            'passenger' => $passenger,
            'trips' => $trips,
            'previous' => $previousTrips
        ]);
    
    }
    public function storeCoinRequest(Request $request)
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
}
