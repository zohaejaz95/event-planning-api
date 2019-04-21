<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class entertainments extends Model
{
    //
    
    protected $table = 'entertainments';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'bandname',
        'hours',
        'service_id'
    ];
    public function services(){
        return $this->belongsTo('App\services');
    }
}
