<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class food_services extends Model
{
    //
    
    protected $table = 'food_services';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'dishes',
        'cater_id'
    ];
    public function caterings(){
        return $this->belongsTo('App\caterings');
    }
}
