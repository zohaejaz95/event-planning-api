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
    //
}
