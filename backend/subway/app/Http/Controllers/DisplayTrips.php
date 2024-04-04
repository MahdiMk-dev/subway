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
    public function show(trip $trip)
    {
        return view('user.profile', [
            'user' => $trip::findOrFail($trip)
        ]);
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
