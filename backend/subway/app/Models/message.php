<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class message extends Model
{
        protected $table = 'messages';
    
        public function passenger() {
            return $this->belongsTo(Passenger::class);
        }
    
        public function user() {
            return $this->belongsTo(User::class);
        }
    
    
    use HasFactory;
}
