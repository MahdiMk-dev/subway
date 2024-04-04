<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\station;
use Illuminate\Support\Facades\Hash;

class PassengerSignupController extends Controller
{
    // Handle the signup request
    public function signup(Request $request)
    {
        // Create a new passenger instance
        $stationID = station::select("id")->where("city","=",$request->city)->get();
        $passenger = new User();
        $passenger->email = $request->email;
        $passenger->name = $request->name;
        $passenger->phone_number = $request->phone_number;
        $passenger->station_id = $stationID->value("id");
        $passenger->type = $request->userType;
        $passenger->status = $request->status;


        
        $passenger->password = Hash::make($request->password);
        // You can add more fields here if needed
        // Example: $passenger->name = $request->name;

        // Save the passenger record
        $passenger->save();

        // Return a success response
        return response()->json(['message' => 'Signup successful', 'status' => 'success','user'=>$passenger], 201);
    }
}
