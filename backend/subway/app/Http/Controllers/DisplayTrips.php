<?php

namespace App\Http\Controllers;

use App\Models\trip;
use Illuminate\Http\Request;

class DisplayTrips extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function displayAll()
    {
        $trips = trip::select('*')->join('stations','stations.id','=','origin_station_id');
        if ($trips) {
            // Redirect back to the user profile page or return a response as needed
            return response()->json(['status' => 'success', 'trips' => $trips->get()]);
        } else {
            return response()->json(['status' => 'fail', 'message' => 'No trips where found']);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, trip $trip)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(trip $trip)
    {
        //
    }
}
