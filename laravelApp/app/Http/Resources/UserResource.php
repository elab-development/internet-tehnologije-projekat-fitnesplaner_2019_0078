<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'height' => $this->height,
            'weight' => $this->weight,
            'gender' => $this->gender,
            'date_of_birth' => $this->date_of_birth,
            'fitness_goals' => $this->fitness_goals,
            'notes' => $this->notes,
            'admin' => $this->admin,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'email_verified_at' => $this->email_verified_at,
            'bmi' => $this->calculateBMI(),  
        ];
    }
}
