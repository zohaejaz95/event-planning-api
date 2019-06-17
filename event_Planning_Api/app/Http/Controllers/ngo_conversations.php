<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ngo_conversations as ngc;
use App\User;
use Auth;
use App\ngo_chats;
use App\ngo;
use App\vendor;
use Illuminate\Support\Facades\DB;
class ngo_conversations extends Controller
{
    //
    public function get_conver_ngo(){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="ngo"){
            
            $ngo= DB::select("select ngo_id from ngos where username = '$user->name'");
            $conv=ngc::where('ngo_id',$ngo[0]->ngo_id)->paginate(15);
            return $conv;
        }
    }

    public function get_conver_vendor(){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="vendor"){
            $venid=DB::select("select vendor_id from vendors where username = '$user->name'");
        $conv=ngc::where('vendor_id',$venid[0]->vendor_id)->paginate(15);
        return $conv;
        }
    }
    public function get_chat($convo_id){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="vendor"||$user->user_type=="ngo"){
        $chat=ngo_chats::orderBy('msg_no','DESC')->where('convo_id',$convo_id)->paginate(10);
        return $chat;
        }
    }
    public function create_conversation($ngo_id,$vend_id){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="vendor"||$user->user_type=="ngo"){
        $cnt=ngc::where('ngo_id',$ngo_id)->where('vendor_id',$vend_id)->count('id');

            if($cnt==0){            
            $conv=ngc::create([
            'ngo_id'=> $ngo_id,
            'vendor_id' => $vend_id,
            'count' => '0'
        ]);
            }
        }
    }
    public function send_message(Request $request){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="vendor"){
        $cid=$request->input('convo_id');
        $conv=ngc::findOrFail($cid);
        $count=$conv->count;
        $count++;
        $chat=ngo_chats::create([
            'message'=>$request->input('message'),
            'status'=> 'unread',
            'convo_id' => $cid,
            'msg_no' =>$count,
            'sender' => 'vendor'
        ]);
        $conv->update([
            'count'=>$count
            ]);
        }
        if($user->user_type=="ngo"){
            $cid=$request->input('convo_id');
            $conv=ngc::findOrFail($cid);
            $count=$conv->count;
            $count++;
            $chat=ngo_chats::create([
                'message'=>$request->input('message'),
                'status'=> 'unread',
                'convo_id' => $cid,
                'msg_no' =>$count,
                'sender' => 'ngo'
            ]);
            $conv->update([
                'count'=>$count
                ]);
        
        }
    }
    public function get_unread($conv_id){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="vendor"){
        $chat=ngo_chats::where('convo_id',$conv_id)->where('sender','ngo')->where('status','unread')->get();
        return $chat;
        }
        if($user->user_type=="ngo"){
            $chat=ngo_chats::where('convo_id',$conv_id)->where('sender','vendor')->where('status','unread')->get();
           return $chat;
        }

    }
    public function update_status($msg_id){
        if($user->user_type=="vendor"||$user->user_type=="ngo"){
        $msg=ngo_chats::findOrFail($msg_id);
        $msg->update([
            'status'=> 'read'
        ]);
        }
        
    }

}
