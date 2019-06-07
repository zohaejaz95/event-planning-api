<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class customer_conversations extends Model
{
    //
    protected $table = 'customer_conversations';
    protected $primaryKey = 'id';
    
    protected $fillable = [
        'customer_id',
        'vendor_id',
        'count'
    ];
    public function customer_chats(){
        return $this->hasMany('App\customer_chats');
    }
    public function customer(){
        return $this->belongsTo('App\customer');
    }
    public function vendor(){
        return $this->belongsTo('App\vendor');
    }
}
