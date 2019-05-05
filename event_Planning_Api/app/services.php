<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class services extends Model
{
    //
    protected $table = 'services';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'service_name',
        'category',
        'event_type',
        'price',
        'description',
        'vendor_id'
    ];
    public function vendor(){
        return $this->belongsTo('App\vendor');
    }
    public function orders(){
        return $this->belongsTo('App\orders');
    }
    public function package_services(){
        return $this->belongsTo('App\package_services');
    }
    public function venues(){
        return $this->hasMany('App\venues');
    }
    public function photographs(){
        return $this->hasMany('App\photographs');
    }
    public function makeup_artists(){
        return $this->hasMany('App\makeup_artists');
    }
    public function entertainments(){
        return $this->hasMany('App\entertainments');
    }
    public function designers(){
        return $this->hasMany('App\designers');
    }
    public function decorations(){
        return $this->hasMany('App\decorations');
    }
    
    public function caterings(){
        return $this->hasMany('App\caterings');
    }
    public function car_rentals(){
        return $this->hasMany('App\car_rentals');
    }
    public function feedbacks(){
        return $this->hasMany('App\feedbacks');
    }
}
