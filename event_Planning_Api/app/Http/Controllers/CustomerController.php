<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\User;
use App\customer;
use App\Http\Requests;
use App\Http\Resources\Customer as customerResource;
class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //show all customers (being used by admin open for use by others)
        $user=User::findOrFail(Auth::guard('api')->id());
        if(($user->user_type=="customer")||($user->user_type=="admin")){
        
        $customers=customer::paginate(15);

        return customerResource::collection($customers);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(request $request)
    {
        //create customer profile
        
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
        
        $customer= customer::create([
            'first_name'=>$request->input('first_name'),
            'last_name'=>$request->input('last_name'),
            'contact'=>$request->input('contact'),
            'email'=>$user->email,
            'address'=>$request->input('address'),
            'username'=>$user->name
            
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
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
            return customer::findOrFail($id);
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
