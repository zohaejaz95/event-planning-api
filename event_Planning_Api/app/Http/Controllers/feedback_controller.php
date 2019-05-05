<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\feedbacks;
use Auth;
use App\User;
use App\customer;
use App\Http\Requests;
use Illuminate\Support\Facades\DB;


class feedback_controller extends Controller
{
   
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
            $customer=DB::select("select * from customers where username = '$user->name'");
            if($request->has('service_id')){
        $feedback= feedbacks::create([
            'rating'=>$request->input('rating'),
            'comments'=>$request->input('comments'),
            'service_id'=>$request->input('service_id'),
            'customer_id'=>$customer[0]->customer_id,
            
        ]);
            }
            else if($request->has('package_id')){
                $feedback= feedbacks::create([
                    'rating'=>$request->input('rating'),
                    'comments'=>$request->input('comments'),
                    'package_id'=>$request->input('package_id'),
                    'customer_id'=>$customer[0]->customer_id,
                    
                ]);     
            }
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show_package($id)
    {
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
        $feed=feedbacks::where('package_id',$id)->paginate(15);
        return $feed;
        }
    }
    public function show_service($id)
    {
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
        $feed=feedbacks::where('service_id',$id)->paginate(15);
        return $feed;
        }
    }
    public function show_cust_service($id)
    {
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
        $customer=DB::select("select * from customers where username = '$user->name'");
               
        $feed=feedbacks::where('service_id',$id)->where('customer_id',$customer[0]->customer_id)->get();
        return $feed;
        }
    }
    public function show_cust_package($id)
    {
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
        $customer=DB::select("select * from customers where username = '$user->name'");
               
        $feed=feedbacks::where('package_id',$id)->where('customer_id',$customer[0]->customer_id)->get();
        return $feed;
        }
    }
   
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
            $customer=DB::select("select * from customers where username = '$user->name'");
            if($request->has('service_id')){
            $feedback=feedbacks::findOrFail($id);
                $feedback->update([
                'rating'=>$request->input('rating'),
                'comments'=>$request->input('comments'),
                'service_id'=>$request->input('service_id'),
                'customer_id'=>$customer[0]->customer_id,
            
        ]);
            }
            else if($request->has('package_id')){
                $feedback=feedbacks::findOrFail($id);
                $feedback->update([
                        'rating'=>$request->input('rating'),
                        'comments'=>$request->input('comments'),
                        'package_id'=>$request->input('package_id'),
                        'customer_id'=>$customer[0]->customer_id,
                    
                ]);     
            }
        }
  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
        $feed=feedbacks::findorFail($id);
        $feed->delete();
        }

    }
}
