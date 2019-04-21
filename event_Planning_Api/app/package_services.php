<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class package_services extends Model
{
    //
    protected $table = 'package_services';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'package_id',
        'discount',
        'service_id'
    ];
    public function packages(){
        return $this->belongsTo('App\packages');
    }
    public function services(){
        return $this->hasMany('App\services');
    }
}
