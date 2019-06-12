<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ngo extends Model
{
    //
    protected $table = 'ngos';
    protected $primaryKey = 'ngo_id';
    public $timestamps = false;
    protected $fillable = [
        'ngo_name',
        'purpose',
        'contact',
        'email',
        'website',
        'username',
        'status',
        'profile_pic'
    ];    
}
