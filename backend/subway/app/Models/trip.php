<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class trip extends Model
{
        protected $table = 'trips';
    
        public function originStation() {
            return $this->belongsTo(Station::class, 'origin_station_id');
        }
    
        public function destinationStation() {
            return $this->belongsTo(Station::class, 'destination_station_id');
        }
    
        public function tickets() {
            return $this->hasMany(Ticket::class, 'trip_id');
        }
    
        public function reviews() {
            return $this->hasMany(Review::class, 'trip_id');
        }
    
    
    use HasFactory;
}
