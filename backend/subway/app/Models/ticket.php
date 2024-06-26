<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ticket extends Model
{
        protected $table = 'tickets';
    
        public function passenger() {
            return $this->belongsTo(Passenger::class);
        }
    
        public function trip() {
            return $this->belongsTo(Trip::class);
        }
    
    
    use HasFactory;
}
