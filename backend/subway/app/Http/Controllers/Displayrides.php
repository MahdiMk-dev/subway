<?php

namespace App\Http\Controllers;

use App\Models\ride;
use Illuminate\Http\Request;

class Displayrides extends Controller
{
    /**
     * Display the specified resource.
     */
    public function displayAll()
    {
        $rideDes = ride::select("*")->join('stations','stations.id','=','destination_station_id');
        $rideOri = ride::select('stations.city')->join('stations','stations.id','=','origin_station_id');
        if ($rideDes && $rideOri) {
            // Redirect back to the user profile page or return a response as needed
            return response()->json(['status' => 'success', 'rideDestination' => $rideDes->get(),"rideOrigin" => $rideOri->get()]);
        } else {
            return response()->json(['status' => 'fail', 'message' => 'No ride where found']);
        }
    }

}