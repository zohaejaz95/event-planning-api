<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class caterings extends Model
{
    //
    protected $table = 'caterings';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'start_time',
        'end_time',
        'cater_id',
        'service_id'
    ];
    public function food_services(){
        return $this->hasMany('App\food_services');
    }
    public function services(){
        return $this->belongsTo('App\services');
    }
}
