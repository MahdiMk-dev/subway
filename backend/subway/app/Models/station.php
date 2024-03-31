<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class station extends Model
{
        protected $table = 'stations';
    
        public function originTrips() {
            return $this->hasMany(Trip::class, 'origin_station_id');
        }
    
        public function destinationTrips() {
            return $this->hasMany(Trip::class, 'destination_station_id');
        }
    
        public function users() {
            return $this->hasMany(User::class, 'station_id');
        }
        
    use HasFactory;
}
