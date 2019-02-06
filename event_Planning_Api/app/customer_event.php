<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class customer_event extends Model
{
    //
    protected $table = 'customer_events';
    protected $primaryKey = 'event_id';
    public $timestamps = false;
    protected $fillable = [
        'event_name',
        'category',
        'description',
        'budget',
        'date',
        'time',
        'status',
        'type',
        'customer_id'
    ];

    public function guest_lists()
    {
        return $this->hasMany('App\guest_list');
    }
    public function customer()
    {
        return $this->belongsTo('App\customer');
    }

    
}
