<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class photographs extends Model
{
    //
    
    protected $table = 'photographs';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'photographer_name',
        'contact',
        'max_pictures',
        'service_id'
    ];
    public function service(){
        return $this->belongsTo('App\services');
    }
}
