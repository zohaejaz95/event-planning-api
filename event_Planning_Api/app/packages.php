<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class packages extends Model
{
    //
    protected $table = 'packages';
    protected $primaryKey = 'p_id';
    public $timestamps = false;
    protected $fillable = [
        'name',
        'description',
        'expiration_date',
        'vendor_id'
    ];
    public function vendor(){
        return $this->belongsTo('App\vendor');
    }
    public function package_services(){
        return $this->hasMany('App\package_services');
    }
    public function orders(){
        return $this->belongsTo('App\orders');
    }
    public function feedbacks(){
        return $this->hasMany('App\feedbacks');
    }
}

