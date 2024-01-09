<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExerciseResource;
use App\Models\Exercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExerciseController extends Controller
{  public function index()
    {
        return ExerciseResource::collection(Exercise::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'description' => 'required',
            'video_url' => 'required|url',
            'average_calories_burned' => 'required|numeric',
            'category' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $exercise = Exercise::create($validator->validated());

        return new ExerciseResource($exercise);
    }

    public function show($id)
    {
        $exercise = Exercise::findOrFail($id);
        return new ExerciseResource($exercise);
    }

    public function update(Request $request, $id)
    {
        $exercise = Exercise::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'max:255',
            'description' => 'nullable',
            'video_url' => 'nullable|url',
            'average_calories_burned' => 'nullable|numeric',
            'category' => 'nullable'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $exercise->update($validator->validated());

        return new ExerciseResource($exercise);
    }

    public function destroy($id)
    {
        $exercise = Exercise::findOrFail($id);
        $exercise->delete();

        return response()->json(['message'=>"DELETED"], 204);
    }
}
