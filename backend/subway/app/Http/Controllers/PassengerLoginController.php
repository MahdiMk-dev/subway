<?php

namespace App\Http\Controllers;

use App\Models\Passenger;
use App\Models\Branch;
use App\Models\Headquarters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class PassengerLoginController extends Controller
{
    // Handle the login request
    public function login(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
            'userType' => 'required|in:passenger,branch,headquarters',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Invalid data', 'status' => 'fail'], 400);
        }

        // Select the appropriate model based on the user type
        switch ($request->userType) {
            case 'passenger':
                $userModel = Passenger::class;
                break;
            case 'branch':
                $userModel = Branch::class;
                break;
            case 'headquarters':
                $userModel = Headquarters::class;
                break;
            default:
                return response()->json(['message' => 'Invalid user type', 'status' => 'fail'], 400);
        }

        // Attempt to retrieve the user by email
        $user = $userModel::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials', 'status' => 'fail'], 401);
        }

        // Generate JWT token
        $token = JWTAuth::fromUser($user);

        return response()->json(['message' => 'Login successful', 'status' => 'success', 'token' => $token], 200);
    }
}
