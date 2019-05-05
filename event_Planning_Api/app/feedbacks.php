<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class feedbacks extends Model
{
    //
    protected $table = 'feedbacks';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'rating',
        'comments',
        'service_id',
        'customer_id',
        'package_id'
    ];
    public function customer(){
        return $this->belongsTo('App\customer');
    }
    public function service (){
        return $this->belongsTo('App\services');
    }
    public function package(){
        return $this->belongsTo('App\packages');
    }
}
