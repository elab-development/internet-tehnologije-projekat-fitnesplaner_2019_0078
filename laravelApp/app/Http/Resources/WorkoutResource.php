<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WorkoutResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user' => $this->user,
            'date' => $this->date,
            'type' => $this->type,
            'duration' => $this->duration,
            'intensity' => $this->intensity,
            'calories_burned' => $this->calories_burned,
            'notes' => $this->notes, 
            'exercises' => ExerciseResource::collection($this->whenLoaded('exercises'))
        ];
    }
}
