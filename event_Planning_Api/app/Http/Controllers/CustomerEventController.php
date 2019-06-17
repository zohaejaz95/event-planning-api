<?php

namespace App\Http\Controllers;
use App\customer_event;
use Illuminate\Support\Facades\DB;
use Auth;
use App\User;
use App\orders;
use App\services;
use App\packages;
use App\customer;
use App\package_services;
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
    public function index(request $request,$status)
    {
        //retreive all events of a given user
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
        $customer=DB::select("select customer_id from customers where username = '$user->name'");
        $cevents=customer_event::where('customer_id',$customer[0]->customer_id)->where('status',$status)->paginate(15);
        return cevent::collection($cevents);
        }
    }
    public function activeEvents(request $request)
    {
        //retreive all events of a given user
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
        $customer=DB::select("select customer_id from customers where username = '$user->name'");
        $cevents=customer_event::where('customer_id',$customer[0]->customer_id)->where('status',"active")->paginate(15);
        return cevent::collection($cevents);
        }
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
        if($user->user_type=="customer"){
            $customer=DB::select("select customer_id from customers where username = '$user->name'");
        
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
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
            $customer=DB::select("select customer_id from customers where username = '$user->name'");
            $event=DB::select("select customer_id from customer_events where event_id = '$id'");
            //$event=customer_event::findOrFail($id);
            if($event[0]->customer_id==$customer[0]->customer_id){
                $eve=customer_event::findOrFail($id);
            return $eve;
            }
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request,$id)
    {
        //
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
            $customer=DB::select("select customer_id from customers where username = '$user->name'");
        
            $event=customer_event::findOrFail($id);
            $event->update([
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update_event_status(Request $request)
    {
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
        //$cust=customer::where('username',$user->name)->get();
        $customer=DB::select("select customer_id from customers where username = '$user->name'");
           
        $custevent= customer_event::where('event_id',$request->input('id'))->where('customer_id',$customer[0]->customer_id)->get();
        
        $custevent->first()->update([
            'status' => $request->input('status')
        ]);   
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
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="customer"){
    $cust= customer::where('username',$user->name)->get();   
    $custevent= customer_event::where('event_id',$id)->where('customer_id',$cust->first()->customer_id)->get();
    $custevent->first()->delete();
    }

    }
public function new_order(Request $request){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="customer"){
        $customer=DB::select("select customer_id from customers where username = '$user->name'");
            
        if($request->input('order_type')=='service'){
            $service=services::findOrFail($request->input('service_id'));

            $order=orders::create([
            'order_status'=> 'pending',
            'payment_method'=> $request->input('payment_method'),
            'payment_status' => 'pending',
            'description' => $request->input('description'),
            'order_type' => $request->input('order_type'),
            'service_id' => $request->input('service_id'),
            'customer_id' => $customer[0]->customer_id,
            'event_id' => $request->input('event_id'),
            'vendor_id'=>$service->vendor_id
        ]);
        }
        else if($request->input('order_type')=='package'){
            $package=packages::findOrFail($request->input('package_id'));
            $order=orders::create([
                'order_status'=> 'pending',
                'payment_method'=> $request->input('payment_method'),
                'payment_status' => 'pending',
                'description' => $request->input('description'),
                'order_type' => $request->input('order_type'),
                'package_id' => $request->input('package_id'),
                'customer_id' => $customer[0]->customer_id,
                'event_id' => $request->input('event_id'),
                'vendor_id'=>$package->vendor_id
            ]);
            }
    }
}

public function get_order ($id){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="customer"){
        $customer=DB::select("select customer_id from customers where username = '$user->name'");
        $order=orders::findOrFail($id);
        if(($order->customer_id)==($customer[0]->customer_id)){
            return orders::findOrFail($id);
        }
    }
}

public function get_order_pending(Request $request,$type,$id){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="customer"||$user->user_type=="vendor"){
        $customer=DB::select("select customer_id from customers where username = '$user->name'");
       
    if($type=="services"){
        $services=orders::select('o_id','order_status','payment_method','payment_status','description','order_type','service_id','customer_id','event_id')
        ->where('order_status','pending')->where('order_type','service')->where('customer_id',$customer[0]->customer_id)->where('event_id',$id)->paginate(15);
        return $services;
    }
    else if($type=="packages"){
        $services=orders::select('o_id','order_status','payment_method','payment_status','description','order_type',
        'package_id','customer_id','event_id')->where('order_status','pending')->where('order_type','package')
        ->where('customer_id',$customer[0]->customer_id)->where('event_id',$id)->paginate(15);
        return $services;
    }
}
}
public function get_order_approved(Request $request,$type,$id){
    $user=User::findOrFail(Auth::guard('api')->id());
    
    if($user->user_type=="customer"||$user->user_type=="vendor"){
        $customer=DB::select("select customer_id from customers where username = '$user->name'");
    
        if($type=="services"){
        $services=orders::select('o_id','order_status','payment_method','payment_status','description','order_type',
        'service_id','customer_id','event_id')->where('order_status','approved')->where('order_type','service')
        ->where('customer_id',$customer[0]->customer_id)->where('event_id',$id)->paginate(15);
        return $services;
    }
    else if($type=="packages"){
        $services=orders::select('o_id','order_status','payment_method','payment_status','description','order_type',
        'package_id','customer_id','event_id')->where('order_status','approved')->where('order_type','package')
        ->where('customer_id',$customer[0]->customer_id)->where('event_id',$id)->paginate(15);
        return $services;
    }
}
}

public function get_expenses($id){
    $user=User::findOrFail(Auth::guard('api')->id());
    
    if($user->user_type=="customer"){
        $customer=DB::select("select customer_id from customers where username = '$user->name'");
        $events= orders::where('customer_id',$customer[0]->customer_id)->where('event_id',$id)->get();
        $expenses=0;
        foreach($events as $event){
            if($event->order_type=='service'){
                $service= services::findOrFail($event->service_id);
                $expenses= $expenses+ $service->price;
            }
            else if($event->order_type=='package'){
                $pkgs= package_services::where('package_id',$event->package_id)->get();
                foreach ($pkgs as $pkg){
                    $service= services::findOrFail($pkg->service_id);
                    $expenses= $expenses+ (($service->price)-(($service->price)*($pkg->discount/100)));
                }
            }
        }
        $exp=array('expenses'=>$expenses);
        return json_encode($exp);
    }
}
public function get_package_cost($id){
    $user=User::findOrFail(Auth::guard('api')->id());
    
    if($user->user_type=="customer"||$user->user_type=="vendor"){
        $pkgs= package_services::where('package_id',$id)->get();
        $expenses= 0;        
        foreach ($pkgs as $pkg){
                    $service= services::findOrFail($pkg->service_id);
                    $expenses= $expenses+ (($service->price)-(($service->price)*($pkg->discount/100)));
                }
                
                $exp=array('price'=>$expenses);
                return json_encode($exp);
}
}

public function update_payment_status (Request $request,$id){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="customer"){
        $customer=DB::select("select customer_id from customers where username = '$user->name'");
        $order=orders::findOrFail($id);
        if(($order->customer_id)==($customer[0]->customer_id)){
            $status=$request->input('payment_status');
            $order->update(["payment_status" => "$status"]);        
        }
    }
    
}
public function update_order_status (Request $request,$id){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="customer"){
        $customer=DB::select("select customer_id from customers where username = '$user->name'");
        $order=orders::findOrFail($id);
        if(($order->customer_id)==($customer[0]->customer_id)){
            $status=$request->input('order_status');
            $order->update(["order_status" => $status]);        
        }
    }
}




}
