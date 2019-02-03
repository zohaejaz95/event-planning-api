<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class location extends Model
{
    //
    protected $table = 'locations';
    protected $primarykey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'vendor_id',
        'city',
        'address'
    ];    

public function vendor()
    {
        return $this->belongsTo('App\vendor');
    }

}
