<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExerciseResource;
use App\Models\Exercise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;
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

    public function getRandomExercises()
    {
        $client = new Client();

        try {
            $response = $client->request('GET', 'https://api.api-ninjas.com/v1/exercises', [
                'headers' => [
                    'X-Api-Key' => '7xiJG3ZG/DVXBFQcpnUANw==DCKsOuWEdluVhptV'
                ]
            ]);

            $exercises = json_decode($response->getBody(), true);
            return response()->json($exercises);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function export()
    {
        $exercises = Exercise::all();
        $csvFileName = 'exercises.csv';
        $csvFilePath = storage_path('app/' . $csvFileName);

        $fileHandle = fopen($csvFilePath, 'w');

      
        fputcsv($fileHandle, ['ID', 'Name', 'Description', 'Video URL', 'Average Calories Burned', 'Category']);

       
        foreach ($exercises as $exercise) {
            fputcsv($fileHandle, [
                $exercise->id, 
                $exercise->name, 
                $exercise->description, 
                $exercise->video_url, 
                $exercise->average_calories_burned, 
                $exercise->category
            ]);
        }

        fclose($fileHandle);

        return response()->download($csvFilePath, $csvFileName) ;
    }
}
