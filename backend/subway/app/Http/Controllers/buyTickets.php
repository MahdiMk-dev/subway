<?php

namespace App\Http\Controllers;

use App\Models\ticket;
use App\Models\passenger;
use Illuminate\Http\Request;

class buyTickets extends Controller
{
    function buy (Request $request)
    {
        $buy = new ticket();
        $buy->passenger_id = $request->passenger_id;
        $buy->trip_id = $request->trip_id;
        $buy->status = $request->status;
        $buy->quantity = $request->quantity;

        $update =passenger::find($request->passenger_id);
        $amount = ($update->balance)-($request->quantity);
        $update->balance = $amount;

        $update->save();
        $buy-> save();
        return response()->json(['message' => 'Signup successful', 'status' => 'success'], 201);

    }
}
