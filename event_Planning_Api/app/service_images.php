<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class service_images extends Model
{
    //
    protected $table = 'service_images';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'path',
        'service_id'
    ];
    public function services(){
        return $this->belongsTo('App\services');
    }
}
