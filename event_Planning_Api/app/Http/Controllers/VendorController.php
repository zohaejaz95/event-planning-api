<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\vendor;
use App\location;
use App\category_event;
use App\payment_method;
use App\User;
use Illuminate\Support\Facades\DB;

class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
