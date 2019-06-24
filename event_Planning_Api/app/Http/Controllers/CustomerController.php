<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\User;
use App\customer;
use App\Http\Requests;
use File;
use Storage;
use App\Http\Resources\Customer as customerResource;
use Illuminate\Support\Facades\DB;

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

        if($request->has('profile_pic')){
            $cust1=DB::select("select customer_id from customers where username = '$user->name'");
       
            $customer=customer::findOrFail($cust1[0]->customer_id);
            $customer->update(['profile_pic'=>'inside if']);    
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
                Storage::disk('local')->put('\public\customer\profile_pics\\' . $imageName, base64_decode($data));
                //File::put(storage_path(). '\public\vendor\logos\\' . $imageName, base64_decode($image));
            $path = Storage::disk('local')->path('public\customer\profile_pics\\'.$imageName);
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
            $customer->update([
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
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"||$user->user_type=="vendor"){
            return customer::findOrFail($id);
        }
    }
    public function show_token()
    {
        $user=User::findOrFail(Auth::guard('api')->id());
        if($user->user_type=="customer"){
            
            $customer=DB::select("select * from customers where username = '$user->name'");
            return new customerResource($customer);
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
