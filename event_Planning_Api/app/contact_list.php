<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class contact_list extends Model
{
    //

    protected $table = 'contact_list';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'first_name',
        'last_name',
        'contact',
        'address',
        'email',
        'province',
        'city',
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
