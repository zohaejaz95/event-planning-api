<?php

namespace App\Http\Controllers;
use App\contact_list;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;
use App\User;
use App\guest_list;
use App\Http\Requests;
use App\Http\Resources\contactlist as clist;

class ContactListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user=User::findOrFail(Auth::guard('api')->id());
        $customer=DB::select("select customer_id from customers where username = '$user->name'");
        $clist=contact_list::where('customer_id',$customer[0]->customer_id)->paginate(15);
        return clist::collection($clist);
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
        //
        $user=User::findOrFail(Auth::guard('api')->id());
        $customer=DB::select("select customer_id from customers where username = '$user->name'");
        if ($request->has('province')) {
            $province=$request->input('province');
        }
        if ($request->has('city')) {
            $city=$request->input('city');
        }
       
        if($user->user_type=="customer"||$request->has('city')||$request->has('province') ){
            $event=contact_list::create([
                'first_name'=> $request->input('first_name'),
                'last_name'=> $request->input('last_name'),
                'contact'=> $request->input('contact'),
                'address'=> $request->input('address'),
                'email'=> $request->input('email'),
                'province'=>$province,
                'city'=>$city, 
                'customer_id'=>$customer[0]->customer_id 
            ]);
        }
        else if($user->user_type=="customer"||$request->has('province') ){
            $event=contact_list::create([
                'first_name'=> $request->input('first_name'),
                'last_name'=> $request->input('last_name'),
                'contact'=> $request->input('contact'),
                'address'=> $request->input('address'),
                'email'=> $request->input('email'),
                'province'=>$province,
                 
                'customer_id'=>$customer[0]->customer_id 
            ]);
        }
        else if($user->user_type=="customer"||$request->has('city') ){
            $event=contact_list::create([
                'first_name'=> $request->input('first_name'),
                'last_name'=> $request->input('last_name'),
                'contact'=> $request->input('contact'),
                'address'=> $request->input('address'),
                'email'=> $request->input('email'),
                
                'city'=>$city, 
                'customer_id'=>$customer[0]->customer_id 
            ]);
        }
        else if($user->user_type=="customer"||!$request->has('city')||!$request->has('province') ){
            $event=contact_list::create([
                'first_name'=> $request->input('first_name'),
                'last_name'=> $request->input('last_name'),
                'contact'=> $request->input('contact'),
                'address'=> $request->input('address'),
                'email'=> $request->input('email'), 
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
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
        $contact = contact_list::find($id);
        $contact->delete();
        }
    }
    /////////////////guest list functions
public function add_guest(Request $request){
    $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
        $guest = guest_list::create([
            'status' => $request->input('status'),
            'event_id' => $request->input('event_id'),
            'contact_list_id' => $request->input('contact_list_id')
        ]);
        }
}
public function remove_guest($id){
    $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
            $guest = guest_list::find($id);
            $guest->delete();
        }
}
public function get_guests($event_id){
    $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
        $guest = guest_list::where('event_id',$event_id)->join('contact_list','guest_lists.contact_list_id','=','contact_list.id')->paginate(10);
        return $guest;
        }

}
public function get_guests_status($event_id,$status){
    $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
        $guest = guest_list::where('event_id',$event_id)->where('status',$status)->join('contact_list','guest_lists.contact_list_id','=','contact_list.id')->paginate(10);
        return $guest;
        }

}


}
