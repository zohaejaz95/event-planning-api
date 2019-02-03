<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class vendor extends Model
{
    //
    protected $table = 'vendors';
    protected $primarykey = 'vendor_id';
    public $timestamps = false;
    protected $fillable = [
        'vendor_name',
        'description',
        'contact',
        'email',
        'website',
        'username',
        'account_status',
    ]; 
public function payment_method()
    {
        return $this->hasMany('App\payment_method');
    }   

public function location()
    {
        return $this->hasMany('App\location');
    }   

public function category_event()
    {
        return $this->hasMany('App\category_event');
    }   

}