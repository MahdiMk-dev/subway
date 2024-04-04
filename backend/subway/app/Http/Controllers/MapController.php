<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ride;
use App\Models\station;
use Illuminate\Support\Str;

class MapController extends Controller
{
    //composer require tymon/jwt-auth
    //php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
    //secret key : EErGPdlzVvJnyxOnYnKG8Js05nJq7hl1qPBMvQIj3L7v7ybMI67KFRTSEqWk1UcZ



    public function getmapdata (Request $request){

                     $stations = station::all();
                     $ride=ride::all();

                    // Return the users as JSON response
                    return ['status'=>'success','stations'=>$stations,'rides'=>$ride];

    }

}
