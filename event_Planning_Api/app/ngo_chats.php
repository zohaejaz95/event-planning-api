<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ngo_chats extends Model
{
    //
    protected $table = 'ngo_chats';
    protected $primaryKey = 'id';
    
    protected $fillable = [
        'message',
        'status',
        'convo_id',
        'msg_no',
        'sender'
    ];
    public function ngo_conversations(){
        return $this->belongsTo('App\ngo_conversations');
    }
}
