<?php

namespace App\Http\Controllers;
use Auth;
use Illuminate\Http\Request;
use App\User;
use App\ngo;
use App\ngo_events;
use App\sponsorships;
use App\Http\Requests;
use App\Http\Resources\NGO as ngoResource;
class NgoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         //show all NGOs (being used by admin open for use by others)
         $ngo=ngo::paginate(15);

         return ngoResource::collection($ngo);
    }
    public function updateStatus(request $request,$id){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="admin"){
           if($request->input('status')=="approved"||$request->input('status')=="rejected" ){
            //$vendor=DB::select("UPDATE vendors SET account_status = $request->input('status') where username = '$user->name'");
            $ngo=ngo::findOrFail($id);
            $status=$request->input('status');
            $ngo->update(["status" => "$status"]);
            }
    }
    }
    public function approved(request $request){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="admin"){
            $ngo=ngo::where('status','approved')->paginate(15);
            return ngoResource::collection($ngo);
        }
    }
    public function rejected(request $request){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="admin"){
            $ngo=ngo::where('status','rejected')->paginate(15);
            return ngoResource::collection($ngo);
        }
    }
    public function pending(request $request){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="admin"){
            $ngo=ngo::where('status','pending')->paginate(15);
            return ngoResource::collection($ngo);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(request $request)
    {
        //set up profile for ngo
        
        $user=User::findOrFail(Auth::guard('api')->id());
       
        if($user->user_type=="ngo"){
       
        $ngo= ngo::create([
            'ngo_name'=>$request->input('ngo_name'),
            'purpose'=>$request->input('purpose'),
            'contact'=>$request->input('contact'),
            'email'=>$user->email,
            'website'=>$request->input('website'),
            'username'=>$user->name,
            'status'=>'pending',
        ]);
        }
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
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="admin"){
        return ngo::findOrFail($id);
        }

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
//NGo EVents
public function create_event(Request $request){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="ngo"){
        $ngo= ngo::where('username',$user->name)->get();
    $ngoe= ngo_events::create([
        'subject' => $request->input('subject'),
        'start_time' => $request->input('start_time'),
        'end_time' => $request->input('end_time'),
        'date' => $request->input('date'),
        'fund' => $request->input('fund'),
        'status' => $request->input('status'),
        'ngo_id' =>$ngo->ngo_id
    ]);
    }
    
}

public function update_event(Request $request,$id){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="ngo"){
        $ngo= ngo::where('username',$user->name)->get();
        $ngoe= ngo_events::where('ngo_id',$ngo->ngo_id)->where('event_id',$id)->get();
    $ngoe->update([
        'subject' => $request->input('subject'),
        'start_time' => $request->input('start_time'),
        'end_time' => $request->input('end_time'),
        'date' => $request->input('date'),
        'fund' => $request->input('fund'),
        'status' => $request->input('status'),
        'ngo_id' =>$ngo->ngo_id
    ]);
    }
    
}
public function delete_event(Request $request,$id){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="ngo"){
        $ngo= ngo::where('username',$user->name)->get();
        $ngoe= ngo_events::where('ngo_id',$ngo->ngo_id)->where('event_id',$id)->get();
    $ngoe->delete();
    }
    
}

public function get_events_token(){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="ngo"){
        $ngo= ngo::where('username',$user->name)->get();
        $events=ngo_events::where('ngo_id',$ngo->ngo_id)->paginate(15);
        return $events;
    }
}

public function get_events(){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="ngo"||$user->user_type=="vendor"){
        
        $events=ngo_events::paginate(15);
        return $events;
    }
}
public function get_event($id){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="ngo"){
        $ngo= ngo::where('username',$user->name)->get();
        $events=ngo_events::where('ngo_id',$ngo->ngo_id)->where('event_id',$id)->get();
        return $events;
    }
}

//sponsorships 
public function create_sponsorship(Request $request){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="vendor"){
        $vendor= vendor::where('username',$user->name)->get();

        $spon=sponsorships::create([
            'type'=> $request->input('type'),
            'donation'=> $request->input('donation'),
            'status' =>'pending',
            'vendor_id' => $vendor->vendor_id,
            'ngo_id' => $request->input('ngo_id'),
            'service_id' => $request->input('service_id')
        ]);
    }
}

public function accept_sponsorship($id){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="ngo"){
        $ngo= ngo::where('username',$user->name)->get();
        $ngoe= ngo_events::where('event_id',$id)->where('ngo_id',$ngo->ngo_id)->get();
        $ngoe->update([
            'status' => 'accepted'
        ]);
    }
    
}




}
