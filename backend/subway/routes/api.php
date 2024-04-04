<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminLoginController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminStationsController;
use App\Http\Controllers\AdminCoinRequestsController;
use App\Http\Controllers\AdminTripsController;
use App\Http\Controllers\AdminRidesController;
use App\Http\Controllers\AdminMessagesController;
use App\Http\Controllers\AdminReviewController;
use App\Http\Controllers\AdminUserController;

use App\Http\Controllers\PassengerLoginController;
use App\Http\Controllers\PassengerController;

use App\Http\Controllers\PassengerSignupController;
use App\Http\Controllers\MapController;
 
use App\Http\Controllers\DisplayTrips;
use App\Http\Controllers\DisplayRides;
use App\Http\Controllers\buyTickets;
use App\Http\Controllers\buyPass;
use App\Http\Controllers\getPassenger;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login', [PassengerLoginController::class, 'login']);

Route::post('/signup', [PassengerSignupController::class, 'signup']);
Route::post('/show', [PassengerController::class, 'show']);
Route::post('/addreview', [PassengerController::class, 'addreview']);
Route::post('/addMessage', [PassengerController::class, 'addMessage']);
Route::get('/get_map', [MapController::class, 'getmapdata']);
Route::post('/coinRequest', [PassengerController::class, 'coinRequest']);
Route::post('/adminlogin', [AdminLoginController::class, 'login']);
Route::post('/adminlogout', [AdminLoginController::class, 'logout'])->name('logout');
Route::get('/getusers', [AdminLoginController::class, 'getusers']);
Route::get('/admin_dashboard', [AdminDashboardController::class, 'gethomedata']);
Route::get('/admingetstations', [AdminStationsController::class, 'getstations']);
Route::get('/admingetcoinrequests', [AdminCoinRequestsController::class, 'getcoinrequest']);
Route::get('/admingettrips', [AdminTripsController::class, 'gettrips']);
Route::get('/admingetrides', [AdminRidesController::class, 'getrides']);
Route::get('/admingetmessages', [AdminMessagesController::class, 'getmessages']);
Route::get('/admingetreviews', [AdminReviewController::class, 'getreviews']);
Route::post('/updateadminusers/', [AdminUserController::class, 'updateuser']);
Route::get('/getadminuser/{id}', [AdminUserController::class, 'getuser']);
Route::post('/createadminuser', [AdminUserController::class, 'create_user']);
Route::delete('/delete_admin_user/{id}', [AdminUserController::class, 'delete_user']);
Route::get('/getstation/{id}', [AdminStationsController::class, 'getstation']);
Route::post('/createadminstation', [AdminStationsController::class, 'create_station']);
Route::delete('/delete_admin_station/{id}', [AdminStationsController::class, 'delete_station']);
Route::post('/updateadminstation/', [AdminStationsController::class, 'updatestation']);
Route::post('/approverequest/{id}', [AdminCoinRequestsController::class, 'approverequest']);
Route::post('/rejectrequest/{id}', [AdminCoinRequestsController::class, 'rejectrequest']);
Route::get('/getadmintrip/{id}', [AdminTripsController::class, 'gettrip']);
Route::post('/createadmintrip', [AdminTripsController::class, 'create_trip']);
Route::delete('/delete_admin_trip/{id}', [AdminTripsController::class, 'delete_trip']);
Route::post('/updateadmintrip/', [AdminTripsController::class, 'updatetrip']);
Route::get('/getadminride/{id}', [AdminRidesController::class, 'getride']);
Route::post('/createadminride', [AdminRidesController::class, 'create_ride']);
Route::delete('/delete_admin_ride/{id}', [AdminRidesController::class, 'delete_ride']);
Route::post('/updateadminride/', [AdminRidesController::class, 'updateride']);
Route::get('/messagepassenger/', [AdminMessagesController::class, 'getmessagepassenger']);
Route::post('/create_message/', [AdminMessagesController::class, 'create_message']);

Route::get('/displayTrips', [DisplayTrips::class, 'displayAll']);
Route::get('/RecomendedTrips', [DisplayTrips::class, 'recomended']);
Route::post('/buytickets', [buyTickets::class, 'buy']);

Route::get('/displayRides', [DisplayRides::class, 'displayAll']);
Route::post('/buyPass', [buyPass::class, 'buy']);
Route::post('/getPassenger', [getPassenger::class, 'getPass']);
