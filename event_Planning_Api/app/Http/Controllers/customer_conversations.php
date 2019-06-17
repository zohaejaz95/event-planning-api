<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;
use App\customer_conversations as csc;
use App\customer_chats;
use App\customer;
use App\vendor;
class customer_conversations extends Controller
{
    //
    public function get_conver_cust(){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
            
            $cust= DB::select("select customer_id from customers where username = '$user->name'");
            $conv=csc::where('customer_id',$cust[0]->customer_id)->paginate(15);
            return $conv;
        }
    }

    public function get_conver_vendor(){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="vendor"){
            $venid=DB::select("select vendor_id from vendors where username = '$user->name'");
        $conv=csc::where('vendor_id',$venid[0]->vendor_id)->paginate(15);
        return $conv;
        }
    }
    public function get_chat($convo_id){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="vendor"||$user->user_type=="customer"){
        $chat=customer_chats::orderBy('msg_no','DESC')->where('convo_id',$convo_id)->paginate(10);
        return $chat;
        }
    }
    public function create_conversation($cust_id,$vend_id){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="vendor"||$user->user_type=="customer"){
        $cnt=csc::where('customer_id',$cust_id)->where('vendor_id',$vend_id)->count(id);

            if($cnt==0){            
            $conv=csc::create([
            'customer_id'=> $cust_id,
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
        $conv=csc::findOrFail($cid);
        $count=$conv->count;
        $count++;
        $chat=customer_chats::create([
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
        if($user->user_type=="customer"){
            $cid=$request->input('convo_id');
            $conv=csc::findOrFail($cid);
            $count=$conv->count;
            $count++;
            $chat=customer_chats::create([
                'message'=>$request->input('message'),
                'status'=> 'unread',
                'convo_id' => $cid,
                'msg_no' =>$count,
                'sender' => 'customer'
            ]);
            $conv->update([
                'count'=>$count
                ]);
        
        }
    }
    public function get_unread($conv_id){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="vendor"){
        $chat=customer_chats::where('convo_id',$conv_id)->where('sender','customer')->where('status','unread')->get();
        return $chat;
        }
        if($user->user_type=="customer"){
            $chat=customer_chats::where('convo_id',$conv_id)->where('sender','vendor')->where('status','unread')->get();
           return $chat;
        }

    }
    public function update_status($msg_id){
        if($user->user_type=="vendor"||$user->user_type=="customer"){
        $msg=customer_chats::findOrFail($msg_id);
        $msg->update([
            'status'=> 'read'
        ]);
        }
        
    }

}
