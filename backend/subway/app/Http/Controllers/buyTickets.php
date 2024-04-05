<?php

namespace App\Http\Controllers;

use App\Models\ticket;
use App\Models\passenger;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class buyTickets extends Controller

{
    function buy (Request $request)
    {
        $token = JWTAuth::parseToken();
        $passengerId = $token->getPayload()->get('sub');
        $buy = new ticket();
        $buy->passenger_id = $passengerId;
        $buy->trip_id = $request->trip_id;
        $buy->status = $request->status;
        $buy->quantity = $request->quantity;

        $update =passenger::find($passengerId);
        if($update->balance<$request->quantity){
            return response()->json(['message' => 'No Enough Balance', 'status' => 'failed'], 201);

        }
        $amount = ($update->balance)-($request->quantity);
        $update->balance = $amount;

        $update->save();
        $buy-> save();
        return response()->json(['message' => 'booked successful', 'status' => 'success'], 201);

    }
}
