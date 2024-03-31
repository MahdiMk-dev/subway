<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class passenger extends Model
{
        protected $table = 'passengers';
    
        public function reviews() {
            return $this->hasMany(Review::class, 'passenger_id');
        }
    
        public function tickets() {
            return $this->hasMany(Ticket::class, 'passenger_id');
        }
    
        public function coinRequests() {
            return $this->hasMany(coin_request::class, 'passenger_id');
        }
    
    
    use HasFactory;
}
