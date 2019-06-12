<?php

namespace App\Http\Controllers;
use Auth;
use Illuminate\Http\Request;
use App\User;
use App\ngo;
use App\ngo_events;
use App\sponsorships;
use App\vendor;
use App\Http\Requests;
use Illuminate\Support\Facades\DB;
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

        if($request->has('profile_pic')){
            $ngo1=DB::select("select ngo_id from ngos where username = '$user->name'");
       
            $ngo=ngo::findOrFail($ngo1[0]->ngo_id);
            $ngo->update(['profile_pic'=>'inside if']);    
            /*
            $filenameWithExt = $request->file('logo')->getOriginalClientFile();
            $filename = pathinfo($filenameWithExt,PATHINFO_FILENAME);
            $exntesion = $request->file('logo')->getOriginalClientExtension();
            $filenameToStore = $filename.'_'.time().'.'.$exntesion;
            $path= $request->file('logo')->storeAs('public/vendor/logos',$filenameToStore);
            $path = Storage::disk('public/vendor/logos')->path($filenameWithExt);
            */
            //base_64 encoding
            $image = $request->profile_pic;  // your base64 encoded
            if (preg_match('/^data:image\/(\w+);base64,/', $image)) {
                $data = substr($image, strpos($image, ',') + 1);
                $imageName= time().'_'.$request->input('img_name');
                Storage::disk('local')->put('\public\ngo\profile_pics\\' . $imageName, base64_decode($image));
                //File::put(storage_path(). '\public\vendor\logos\\' . $imageName, base64_decode($image));
            $path = Storage::disk('local')->path('public\ngo\profile_pics\\'.$imageName);
        }
            
            
            
            /*
            $file = $request->file('logo.originFileObj');
            $path = $request->file('logo.originFileObj')->path();
            $extension = $request->file('logo.originFileObj')->extension();
            $filenameToStore = $path.'_'.time().$extension;
            $path= $request->file('logo.originFileObj')->storeAs('public/vendor/logos',$filenameToStore);
            $path = Storage::disk('public/vendor/logos')->path($filenameToStore);
            */
            print_r($path);
            $ngo->update([
                'profile_pic' => $path
            ]);
        }
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
        if($user->user_type=="admin"||$user->user_type=="vendor"){
        return ngo::findOrFail($id);
        }

    }
    public function show_token()
    {
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="ngo"){
            
            $ngo=DB::select("select * from ngos where username = '$user->name'");
            return new ngoResource($ngo);
            //return $customer;
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
        $ngos= ngo::where('username',$user->name)->get();
    $ngo= ngo_events::create([
        'subject' => $request->input('subject'),
        'start_time' => $request->input('start_time'),
        'end_time' => $request->input('end_time'),
        'date' => $request->input('date'),
        'fund' => $request->input('fund'),
        'status' => $request->input('status'),
        'ngo_id' =>$ngos[0]->ngo_id
    ]);
    }
    
}

public function update_event(Request $request,$id){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="ngo"){
        $ngo= ngos::where('username',$user->name)->get();
        $ngoe= ngo_events::where('ngo_id',$ngo->ngo_id)->where('event_id',$id)->get();
    $ngoe->update([
        'subject' => $request->input('subject'),
        'start_time' => $request->input('start_time'),
        'end_time' => $request->input('end_time'),
        'date' => $request->input('date'),
        'fund' => $request->input('fund'),
        'status' => $request->input('status'),
        'ngo_id' =>$ngo[0]->ngo_id
    ]);
    }
    
}
public function delete_event(Request $request,$id){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="ngo"){
        $ngo= ngo::where('username',$user->name)->get();
        $ngoe= ngo_events::where('ngo_id',$ngo[0]->ngo_id)->where('event_id',$id)->get();
    $ngoe->delete();
    }
    
}

public function get_events_token(){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="ngo"){
        $ngo= ngo::where('username',$user->name)->get();
        $events=ngo_events::where('ngo_id',$ngo[0]->ngo_id)->paginate(15);
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
            'vendor_id' => $vendor[0]->vendor_id,
            'ngo_id' => $request->input('ngo_id'),
            'service_id' => $request->input('service_id'),
            'nevent_id' => $request->input('nevent_id')
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
public function get_sponsorships_events($id,$status,$type){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="ngo"){
        
        $spon= sponsorships::where('nevent_id',$id)->where('status',$status)->where('type',$type)->paginate(15);
        return $spon;
    }
}
public function get_funding_status($id){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="ngo"){
    $spon=sponsorships::where('type','cash')->where('nevent_id',$id)->where('status','accepted')->sum('donation');
    return $spon;
    }
}


}
