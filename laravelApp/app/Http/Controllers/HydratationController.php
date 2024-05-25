<?php

namespace App\Http\Controllers;

use App\Http\Resources\HydrationResource;
use App\Models\Hydration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HydratationController extends Controller
{
    public function index()
    {
        return HydrationResource::collection(Hydration::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'date' => 'required|date',
            'amount' => 'required|integer',
            'time' => 'required|date_format:H:i:s'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $hydration = Hydration::create($validator->validated());

        return response()->json(new HydrationResource($hydration), 201);
    }

    public function show($id)
    {
        $hydration = Hydration::findOrFail($id);
        return response()->json(new HydrationResource($hydration));
    }

    public function update(Request $request, $id)
    {
        $hydration = Hydration::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'user_id' => 'integer',
            'date' => 'date',
            'amount' => 'integer',
            'time' => 'date_format:H:i:s'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $hydration->update($validator->validated());

        return response()->json(new HydrationResource($hydration));
    }

    public function destroy($id)
    {
        $hydration = Hydration::findOrFail($id);
        $hydration->delete();

        return response()->json(['message'=>"DELETED"], 204);
    }
}
