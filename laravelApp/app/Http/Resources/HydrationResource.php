<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HydrationResource extends JsonResource
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
            'amount' => $this->amount,
            'time' => $this->time,
        ];
    }
}
