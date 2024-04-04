<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pass extends Model
{
        protected $table = 'passes';
    
        public function passenger() {
            return $this->belongsTo(Passenger::class);
        }
    
        public function ride() {
            return $this->belongsTo(Ride::class);
        }
    
    
    use HasFactory;
}
