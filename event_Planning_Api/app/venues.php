<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class venues extends Model
{
    //
    protected $table = 'venues';
    protected $primaryKey = 'venue_id';
    public $timestamps = false;
    protected $fillable = [
        'Address',
        'start_time',
        'end_time',
        'service_id'
    ];
    public function services(){
        return $this->belongsTo('App\services');
    }
}
