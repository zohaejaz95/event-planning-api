<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class customer extends Model
{
    protected $table = 'customers';
    protected $primaryKey = 'customer_id';
    public $timestamps = false;
    protected $fillable = [
        'first_name',
        'last_name',
        'contact',
        'address',
        'email',
        'username'
    ];
    public function contact_lists()
    {
        return $this->hasMany('App\contact_list');
    }
    public function customer_events()
    {
        return $this->hasMany('App\customer_event');
    }
    public function orders(){
        return $this->hasMany('App\orders');
    }
}
