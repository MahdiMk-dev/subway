<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user extends Model
{
        protected $table = 'users';
    
        public function station() {
            return $this->belongsTo(Station::class);
        }
    
        public function sentMessages() {
            return $this->hasMany(message::class, 'user_id');
        }
    
        public function reviews() {
            return $this->hasMany(Review::class, 'passenger_id');
        }
    
    use HasFactory;
}
