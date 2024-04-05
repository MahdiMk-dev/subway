<?php

namespace App\Http\Controllers;

use App\Models\passenger;
use Illuminate\Http\Request;

class getPassenger extends Controller
{
    /**
     * Display the specified resource.
     */
    public function getPass(Request $request)
    {
        $passenger = passenger::find($request->passenger_id);
        if ($passenger) {
            // Redirect back to the user profile page or return a response as needed
            return response()->json(['status' => 'success', 'data' => $passenger]);
        } else {
            return response()->json(['status' => 'fail', 'message' => 'No user where found']);
        }
    }

}