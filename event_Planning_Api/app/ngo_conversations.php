<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ngo_conversations extends Model
{
    //
    protected $table = 'ngo_conversations';
    protected $primaryKey = 'id';
    
    protected $fillable = [
        'ngo_id',
        'vendor_id',
        'count'
    ];
    public function ngo_chats(){
        return $this->hasMany('App\ngo_chats');
    }
    public function ngo(){
        return $this->belongsTo('App\ngo');
    }
    public function vendor(){
        return $this->belongsTo('App\vendor');
    }
}
