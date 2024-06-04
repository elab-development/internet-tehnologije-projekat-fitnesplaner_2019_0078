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
            'user_id' => $this->user_id,
            'date' => $this->date,
            'type' => $this->type,
            'duration' => $this->duration,
            'intensity' => $this->intensity,
            'calories_burned' => $this->calories_burned,
            'notes' => $this->notes,
            'exercises' => $this->exercises->map(function ($exercise) {
                return [
                    'id' => $exercise->id,
                    'name' => $exercise->name,
                    'description' => $exercise->description,
                    'video_url' => $exercise->video_url,
                    'average_calories_burned' => $exercise->average_calories_burned,
                    'category' => $exercise->category,
                    'pivot' => [
                        'repetitions' => $exercise->pivot->repetitions,
                        'sets' => $exercise->pivot->sets,
                        'weight' => $exercise->pivot->weight,
                        'rest' => $exercise->pivot->rest
                    ]
                ];
            }),
        ];
    }
}
