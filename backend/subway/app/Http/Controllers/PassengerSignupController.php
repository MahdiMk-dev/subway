<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\passenger;
use App\Models\station;
use Illuminate\Support\Facades\Hash;

class PassengerSignupController extends Controller
{
    // Handle the signup request
    public function signup(Request $request)
    {
        // Create a new passenger instance
        $passenger = new passenger();
        $passenger->email = $request->email;
        $passenger->first_name = $request->first_name;
        $passenger->last_name = $request->last_name;
        $passenger->phone_number = $request->phone_number;
        $passenger->city = $request->city;
        $passenger->dob = $request->dob;

        
        $passenger->password = Hash::make($request->password);
        // You can add more fields here if needed
        // Example: $passenger->name = $request->name;

        // Save the passenger record
        $passenger->save();

        // Return a success response
        return response()->json(['message' => 'Signup successful', 'status' => 'success','user'=>$passenger], 201);
    }
}
