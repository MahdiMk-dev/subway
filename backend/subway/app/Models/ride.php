<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ride extends Model
{
        protected $table = 'rides';
    
        public function originStation() {
            return $this->belongsTo(Station::class, 'origin_station_id');
        }
    
        public function destinationStation() {
            return $this->belongsTo(Station::class, 'destination_station_id');
        }
    
        
        
    use HasFactory;
}
