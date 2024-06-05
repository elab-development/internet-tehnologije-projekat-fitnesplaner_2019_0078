<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use App\Models\Exercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\WorkoutResource;

class WorkoutController extends Controller
{
    public function index()
    {
       // Dobavljanje ID-a ulogovanog korisnika
            $userId = auth()->id();

            // Dobavljanje svih treninga za ulogovanog korisnika zajedno sa vezbama
            $workouts = Workout::with('exercises')->where('user_id', $userId)->get();

            // Vraćanje kolekcije treninga kao WorkoutResource
            return WorkoutResource::collection($workouts);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [ 
            'date' => 'required|date',
            'type' => 'required|string|max:255',
            'duration' => 'required|integer',
            'intensity' => 'required|string|max:255',
            'calories_burned' => 'required|integer',
            'notes' => 'nullable|string',
            'selectedExercises' => 'required|array',
            'selectedExercises.*.exercise_id' => 'required|exists:exercises,id',
            'selectedExercises.*.repetitions' => 'required|integer',
            'selectedExercises.*.sets' => 'required|integer',
            'selectedExercises.*.weight' => 'required|integer',
            'selectedExercises.*.rest' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $workout = Workout::create(array_merge($validator->validated(), [
            'user_id' => auth()->id(),
        ]));

        foreach ($request->selectedExercises as $exercise) {
            $workout->exercises()->attach($exercise['exercise_id'], [
                'repetitions' => $exercise['repetitions'],
                'sets' => $exercise['sets'],
                'weight' => $exercise['weight'],
                'rest' => $exercise['rest']
            ]);
        }

        return new WorkoutResource($workout->load('exercises'));
    }

    public function show($id)
    {
        $workout = Workout::with('exercises')->findOrFail($id);
        return new WorkoutResource($workout);
    }

    public function update(Request $request, $id)
    {
        $workout = Workout::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'date' => 'date',
            'type' => 'string|max:255',
            'duration' => 'integer',
            'intensity' => 'string|max:255',
            'calories_burned' => 'integer',
            'notes' => 'nullable|string',
            'selectedExercises' => 'array',
            'selectedExercises.*.exercise_id' => 'exists:exercises,id',
            'selectedExercises.*.repetitions' => 'integer',
            'selectedExercises.*.sets' => 'integer',
            'selectedExercises.*.weight' => 'integer',
            'selectedExercises.*.rest' => 'integer'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $workout->update($validator->validated());

        if ($request->has('selectedExercises')) {
            $workout->exercises()->detach();
            foreach ($request->selectedExercises as $exercise) {
                $workout->exercises()->attach($exercise['exercise_id'], [
                    'repetitions' => $exercise['repetitions'],
                    'sets' => $exercise['sets'],
                    'weight' => $exercise['weight'],
                    'rest' => $exercise['rest']
                ]);
            }
        }

        return new WorkoutResource($workout->load('exercises'));
    }

    public function destroy($id)
    {
        $workout = Workout::findOrFail($id);
        $workout->exercises()->detach();
        $workout->delete();

        return response()->json(['message' => "Workout deleted"], 204);
    }
}
