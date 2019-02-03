<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class payment_method extends Model
{
    //
    protected $table = 'payment_methods';
    protected $primarykey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'vendor_id',
        'method',
    ];    
public function vendor()
    {
        return $this->belongsTo('App\vendor');
    }
}
