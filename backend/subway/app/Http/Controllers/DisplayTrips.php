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
        $tripsDes = trip::select("*")->join('stations','stations.id','=','destination_station_id');
        $tripsOri = trip::select('stations.city')->join('stations','stations.id','=','origin_station_id');
        if ($tripsDes && $tripsOri) {
            // Redirect back to the user profile page or return a response as needed
            return response()->json(['status' => 'success', 'tripsDestination' => $tripsDes->get(),"tripOrigin" => $tripsOri->get()]);
        } else {
            return response()->json(['status' => 'fail', 'message' => 'No trips where found']);
        }
    }
    public function recomended()
    {

        $trips = trip::select("*")->join('stations','stations.id','=','origin_station_id')->join('users','stations.id','=','station_id');
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
