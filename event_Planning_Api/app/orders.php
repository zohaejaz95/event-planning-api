<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class orders extends Model
{
    //
    protected $table = 'orders';
    protected $primaryKey = 'o_id';
    public $timestamps = false;
    protected $fillable = [
        'order_status',
        'payment_method',
        'payment_status',
        'description',
        'order_type',
        'customer_id',
        'service_id',
        'package_id',
        'event_id',
        'vendor_id'
    ];
    public function customer_events (){
        return $this->belongsTo('App\customer_event');
    }
    public function customer (){
        return $this->belongsTo('App\customer');
    }
    public function packages(){
        return $this->hasMany('App\packages');
    }
    public function services(){
        return $this->hasMany('App\services');
    }
}
