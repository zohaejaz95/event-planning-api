<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class makeup_artists extends Model
{
    //
    
    protected $table = 'makeup_artists';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'name',
        'service_id'
    ];
    public function services(){
        return $this->belongsTo('App\services');
    }
}
