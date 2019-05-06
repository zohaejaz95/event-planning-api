<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\vendor;
use App\location;
use App\category_event;
use App\payment_method;
use App\User;
use App\services;
use App\venues;
use App\photographs;
use App\makeup_artists;
use App\entertainments;
use App\car_rentals;
use App\caterings;
use App\food_services;
use App\packages;
use App\package_services;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\Vendor as vendorResource;
use App\Http\Requests;
class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //show all vendors (used by admin currently open for use by others)
        $vendor= vendor::paginate(15);

        return vendorResource::collection($vendor);

    }
    public function updateStatus(request $request,$id){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="admin"){
           if($request->input('status')=="approved"||$request->input('status')=="rejected" ){
            //$vendor=DB::select("UPDATE vendors SET account_status = $request->input('status') where username = '$user->name'");
            $vendor=vendor::findOrFail($id);
            $status=$request->input('status');
            $vendor->update(["account_status" => "$status"]);
            }
    }
    }
    public function approved(request $request){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="admin"){
            $vendor=vendor::where('account_status','approved')->paginate(15);
            return vendorResource::collection($vendor);
        }
    }
    public function rejected(request $request){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="admin"){
            $vendor=vendor::where('account_status','rejected')->paginate(15);
            return vendorResource::collection($vendor);
        }
    }
    public function pending(request $request){
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="admin"){
            $vendor=vendor::where('account_status','pending')->paginate(15);
            return vendorResource::collection($vendor);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(request $request)
    {
        //
        $user=User::findOrFail(Auth::guard('api')->id());
        $vendor=vendor::create([
            'vendor_name'=>$request->input('vendor_name'),
            'contact'=>$request->input('contact'),
            'email'=>$user->email,
            'website'=>$request->input('website'),
            'username'=>$user->name,
            'description'=>$request->input('description'),
            'account_status'=>'pending'
        ]);
        $vendor=DB::select("select vendor_id from vendors where username = '$user->name'");
       
        $locations=$request->input('locations.*');
      // print_r ($locations);
      // for($i=0;$i<=sizeof($locations);$i++){
        //print_r($i);
       // location::create([
       //     'vendor_id'=>$vendor,
      //      'city'=>[$i]['city'],
      //     'address'=> [$i]['address']
      //  ]);   
      // } 
       
       foreach($locations as $location){
        
            location::create([
                'vendor_id'=>$vendor[0]->vendor_id,
                'city'=>$location['city'],
                'address'=> $location['address']
            ]);
        }
        $payments=$request->input('payment_methods.*');
        foreach($payments as $payment){
            
            payment_method::create([
                'vendor_id'=>$vendor[0]->vendor_id,
                'method'=>$payment['method']
            ]);
        }
        $categories=$request->input('categories.*');
        foreach($categories as $category){
           //print_r($category);
            category_event::create([
                'vendor_id'=>$vendor[0]->vendor_id,
                'category'=>$category['category']
            ]);
        }

    }
public function create_service(Request $request){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="vendor"){
        $vendor=DB::select("select vendor_id from vendors where username = '$user->name'");
        $service=services::create([
        'service_name'=>$request->input('service_name'),
        'category'=>$request->input('category'),
        'event_type'=>$request->input('event_type'),
        'price'=>$request->input('price'),
        'description'=>$request->input('description'),
        'vendor_id'=>$vendor[0]->vendor_id
    ]);
    // if($request->input('category')=='venues'){
    //     $venues=venues::create([
    //         'Address'=>$request->input('Address'),
    //         'start_time'=>$request->input('start_time'),
    //         'end_time'=>$request->input('end_time'),
    //         'service_id'=>$service->service_id
    //     ]);
    // }
    // else if($request->input('category')=='photographs'){
    //     $photo=photographs::create([
    //         'photographer_name'=>$request->input('photographer_name'),
    //         'contact'=>$request->input('contact'),
    //         'max_pictures'=>$request->input('max_pictures'),
    //         'service_id'=>$service->service_id
    //     ]);
    // }
    // else if($request->input('category')=='makeup artists'){
    //     $makeup=makeup_artists::create([
    //         'name'=>$request->input('name'),
    //         'service_id'=>$service->service_id
    //     ]);
    // }
    // else if($request->input('category')=='entertainment'){
    //     $enter=entertainments::create([
    //         'bandname'=>$request->input('bandname'),
    //         'hours'=>$request->input('hours'),
    //         'service_id'=>$service->service_id
    //     ]);
    // }
    // else if($request->input('category')=='car rental'){
    //     $car=car_rentals::create([
    //         'car_name'=>$request->input('car_name'),
    //         'plate_no'=>$request->input('plate_no'),
    //         'service_id'=>$service->service_id
    //     ]);
    // }
    // else if($request->input('category')=='catering'){
    //     $cat=caterings::create([
    //         'start_time'=>$request->input('start_time'),
    //         'end_time'=>$request->input('end_time'),
    //         'service_id'=>$service->service_id
    //     ]);
    //     $dishes=$request->input('dishes.*');
    //     foreach ($dishes as $dish){
    //         $foodserivce=food_services::create([
    //             'dishes'=>$dish['dish'],
    //             'cater_id'=>$cat->id
    //         ]);
    //     }
    // }
    
}

}

public function get_service(Request $request,$id){
    $user=User::findOrFail(Auth::guard('api')->id());
    if(($user->user_type=="vendor")||($user->user_type=="customer")){
    $service=services::findOrFail($id);
    //return $service;
    if($service->category=='venues'){
        return services::findOrFail($id)->join('venues','services.id','=','venues.service_id')->get();
    }
    else if($service->category=='photographs'){
        //return services::findOrFail($id)->photographs()->get();
          return services::findOrFail($id)->join('photographs','services.id','=','photographs.services_id')->get();
    }
    else if($service->category=='makeup artists'){
        return services::findOrFail($id)->join('makeup_artists','services.id','=','makeup_artists.service_id')->get();
    }
    else if($service->category=='entertainment'){
        return services::findOrFail($id)->join('entertainments','services.id','=','entertainments.service_id')->get();
    }
    else if($service->category=='car rental'){
        return services::findOrFail($id)->join('car_rentals','services.id','=','car_rentals.service_id')->get();
    }
    else if($service->category=='catering'){
        return services::findOrFail($id)->join('caterings','services.id','=','caterings.service_id')->join('food_services','caterings.id','=','food_services.cater_id')->get();
    }
    }
}
public function get_service_cat($cat){
    $user=User::findOrFail(Auth::guard('api')->id());
    if(($user->user_type=="vendor")||($user->user_type=="customer")){
        return services::where('category',$cat)->paginate(15);
    // if($cat=='venues'){
    //     return services::where('category',$cat)->join('venues','services.id','=','venues.service_id')->paginate(15);
    // }
    // else if($cat=='photographs'){
    //     //return services::findOrFail($id)->photographs()->get();
    //       return services::where('category',$cat)->join('photographs','services.id','=','photographs.services_id')->paginate(15);
    // }
    // else if($cat=='makeup artists'){
    //     return services::where('category',$cat)->join('makeup_artists','services.id','=','makeup_artists.service_id')->paginate(15);
    // }
    // else if($cat=='entertainment'){
    //     return services::where('category',$cat)->join('entertainments','services.id','=','entertainments.service_id')->paginate(15);
    // }
    // else if($cat=='car rental'){
    //     return services::where('category',$cat)->join('car_rentals','services.id','=','car_rentals.service_id')->paginate(15);
    // }
    // else if($cat=='catering'){
    //     return services::where('category',$cat)->join('caterings','services.id','=','caterings.service_id')->join('food_services','caterings.id','=','food_services.cater_id')->paginate(15);
    // }
    }
}
public function update_service(Request $request,$id){

}
public function delete_service(Request $request,$id){

}
public function create_package(Request $request){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="vendor"){
        $vendor=DB::select("select vendor_id from vendors where username = '$user->name'");
        $package=packages::create([
            'name'=>$request->input('name'),
            'description'=>$request->input('description'),
            'vendor_id'=>$vendor[0]->vendor_id
        ]);
        $services=$request->input('services.*');
        foreach($services as $service){
            $pkgser=package_services::create([
                'package_id'=>$package->p_id,
                'discount'=>$service['discount'],
                'service_id'=>$service['service_id']
            ]);

        }
    }    
}

public function get_package(Request $request,$id){
    $user=User::findOrFail(Auth::guard('api')->id());
    if($user->user_type=="vendor"){
        return packages::findOrFail($id)->join('package_services','packages.p_id','=','package_services.package_id')->get();
    }
}
public function update_package(Request $request,$id){

}
public function delete_package(Request $request,$id){

}
public function get_locations(){
    $user=User::findOrFail(Auth::guard('api')->id());
    
    if($user->user_type=="vendor"){
    
        $venid=DB::select("select vendor_id from vendors where username = '$user->name'");
        $locations= location::where('vendor_id',$venid[0]->vendor_id)->get();
        return $locations;
    
    }
}
public function get_categories(){
    $user=User::findOrFail(Auth::guard('api')->id());
    
    if($user->user_type=="vendor"){
    
    $venid=DB::select("select vendor_id from vendors where username = '$user->name'");
    $cat= category_event::where('vendor_id',$venid[0]->vendor_id)->get();
    return $cat;
    
    
    }  
} 
public function get_vendor_services(){
    $user=User::findOrFail(Auth::guard('api')->id());
    
    if($user->user_type=="vendor"){
    
    $venid=DB::select("select vendor_id from vendors where username = '$user->name'");
    $cat= services::where('vendor_id',$venid[0]->vendor_id)->get();
    return $cat;
    
    
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
        if($user->user_type=="vendor"){
            return vendor::findOrFail($id);
        }
    }
    public function show_token()
    {
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="vendor"){
            
            $customer=DB::select("select * from vendors where username = '$user->name'");
            return new vendorResource($customer);
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
}
 

    



