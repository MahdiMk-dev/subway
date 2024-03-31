<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class review extends Model
{
        protected $table = 'reviews';
    
        public function passenger() {
            return $this->belongsTo(Passenger::class);
        }
    
        public function trip() {
            return $this->belongsTo(Trip::class);
        }
    
    
    use HasFactory;
}
