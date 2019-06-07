<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class package_images extends Model
{
    //
    protected $table = 'package_images';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'path',
        'package_id'
    ];
    public function packages(){
        return $this->belongsTo('App\packages');
    }
}
