<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Hydration;
use App\Models\User;
use App\Models\Workout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'height' => 'required|numeric',
            'weight' => 'required|numeric',
            'gender' => 'required',
            'date_of_birth' => 'required|date',
            'fitness_goals' => 'string|nullable',
            'notes' => 'string|nullable',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $validatedData = $validator->validated();
    
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'height' => $validatedData['height'],
            'weight' => $validatedData['weight'],
            'gender' => $validatedData['gender'],
            'date_of_birth' => $validatedData['date_of_birth'],
            'fitness_goals' => $validatedData['fitness_goals'],
            'notes' => $validatedData['notes'],
        ]);
    
        $token = $user->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($validatedData)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = User::where('email', $validatedData['email'])->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => new UserResource($user),
        ]);
    }

    public function logout()
    {
        
        Auth::user()->tokens()->delete();

        return response()->json(['message' => 'You have been successfully logged out'], 200);
    }


    public function getUser()
    {
        $user = Auth::user();

        // Dohvati sve povezane podatke u jednom upitu koristeći Eager Loading
        $user->load([
            'hydrations', 
           // 'workouts.exercises'
        ]);

        return response()->json([
            'user' => $user,
            'hydrations' => $user->hydrations,
           // 'workouts' => $user->workouts
        ]);
    } 


}
