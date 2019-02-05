<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class category_event extends Model
{
    //
    protected $table = 'category_events';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'vendor_id',
        'category'
    ];    

public function vendor()
    {
        return $this->belongsTo('App\vendor');
    }

}
