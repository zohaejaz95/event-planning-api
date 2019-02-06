<?php

namespace App\Http\Controllers;
use App\customer_event;
use Illuminate\Support\Facades\DB;
use Auth;
use App\User;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Resources\customerEvents as cevent;

class CustomerEventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(request $request)
    {
        //retreive all events of a given user
        $user=User::findOrFail(Auth::guard('api')->id());
        $customer=DB::select("select customer_id from customers where username = '$user->name'");
        $cevents=customer_event::where('customer_id',$customer[0]->customer_id)->paginate(15);
        return cevent::collection($cevents);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //creating a new event
        
        $user=User::findOrFail(Auth::guard('api')->id());
        $customer=DB::select("select customer_id from customers where username = '$user->name'");
        if($user->user_type=="customer"){
            $event=customer_event::create([
            'event_name'=>$request->input('event_name'),
            'category'=>$request->input('category'),
            'description'=>$request->input('description'),
            'budget'=>$request->input('budget'),
            'date'=>$request->input('date'),
            'time'=>$request->input('time'),
            'status'=>$request->input('status'),
            'type'=>$request->input('type'),
            'customer_id'=>$customer[0]->customer_id 
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
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
    }
}
