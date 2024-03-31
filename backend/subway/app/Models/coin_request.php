<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class coin_request extends Model
{
        protected $table = 'coin_requests';
    
        public function passenger() {
            return $this->belongsTo(Passenger::class);
        }
    
    
    use HasFactory;
}
