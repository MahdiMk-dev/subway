<?php

namespace App\Http\Controllers;

use App\Models\pass;
use App\Models\passenger;
use Illuminate\Http\Request;

class buyPass extends Controller
{
    function buy (Request $request)
    {
        $buy = new pass();
        $buy->passenger_id = $request->passenger_id;
        $buy->ride_id = $request->ride_id;
        $buy->quantity = $request->quantity;

        $update =passenger::find($request->passenger_id);
        $amount = ($update->balance)-($request->quantity);
        $update->balance = $amount;

        $update->save();
        $buy-> save();
        return response()->json(['message' => 'Signup successful', 'status' => 'success'], 201);

    }
}
