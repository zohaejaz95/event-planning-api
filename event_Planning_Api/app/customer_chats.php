<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class customer_chats extends Model
{
    //
    protected $table = 'customer_chats';
    protected $primaryKey = 'id';
    
    protected $fillable = [
        'message',
        'status',
        'convo_id',
        'msg_no',
        'sender'
    ];
    public function customer_conversations(){
        return $this->belongsTo('App\customer_conversations');
    }
}
