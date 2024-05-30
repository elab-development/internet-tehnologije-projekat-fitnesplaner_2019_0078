<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\HydratationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/exercises', [ExerciseController::class, 'index']);
Route::get('/exercises/getRandomExercises', [ExerciseController::class, 'getRandomExercises']);
Route::get('/hydration', [HydratationController::class, 'index']); 

 


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/exercises/export', [ExerciseController::class, 'export']);
    Route::post('/exercises', [ExerciseController::class, 'store']);
    Route::put('/exercises/{id}', [ExerciseController::class, 'update']);
    Route::delete('/exercises/{id}', [ExerciseController::class, 'destroy']);
    Route::apiResource('/hydration', HydratationController::class)->except(['index', 'show']);


    //dodato za seminarski, metoda koja vraca sve moguce podatke o ulogovanom korisniku
    Route::get('/user', [AuthController::class, 'getUser']);
});