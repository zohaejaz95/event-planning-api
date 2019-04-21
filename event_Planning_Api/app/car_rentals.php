<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class car_rentals extends Model
{
    //
    protected $table = 'car_rentals';
    protected $primaryKey = 'car_id';
    public $timestamps = false;
    protected $fillable = [
        'car_name',
        'plate_no',
        'service_id'
    ];
    public function services(){
        return $this->belongsTo('App\services');
    }
}
