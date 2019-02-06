<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class guest_list extends Model
{
    //
    protected $table = 'guest_lists';
    protected $primaryKey = 'guest_id';
    public $timestamps = false;
    protected $fillable = [
        'status',
        'event_id',
        'contact_list_id'
    ];

    public function customer_events()
    {
        return $this->belongsTo('App\customer_event');
    }
    public function contact_list()
    {
        return $this->belongsTo('App\contact_list');
    }


}
