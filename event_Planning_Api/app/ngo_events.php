<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ngo_events extends Model
{
    //
    protected $table = 'ngo_events';
    protected $primaryKey = 'event_id';
    public $timestamps = false;
    protected $fillable = [
        'subject',
        'start_time',
        'end_time',
        'date',
        'fund',
        'status',
        'ngo_id'
    ];
}
