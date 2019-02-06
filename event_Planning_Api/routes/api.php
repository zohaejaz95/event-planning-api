<?php

use Illuminate\Http\Request;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');

Route::group(['middleware' => 'auth:api'], function() {
// all routes requiring authentication go here
//Auth::guard('api')->user(); // instance of the logged user
//Auth::guard('api')->check(); // if a user is authenticated
//Auth::guard('api')->id(); // the id of the authenticated user   
Route::post('ngo/create', 'NgoController@create'  );
Route::post('vendor/create','VendorController@create');
Route::post('customer/create','CustomerController@create');
Route::get('customers','CustomerController@index');
Route::get('vendors','VendorController@index');
Route::get('NGOs','NgoController@index');
Route::put('admin/vendor/update/{id}','VendorController@updateStatus');
Route::put('admin/NGO/update/{id}','NgoController@updateStatus');
Route::get('admin/NGO/approved/','NgoController@approved');
Route::get('admin/NGO/rejected/','NgoController@rejected');
Route::get('admin/NGO/pending/','NgoController@pending');
Route::get('admin/vendor/approved/','VendorController@approved');
Route::get('admin/vendor/rejected/','VendorController@rejected');
Route::get('admin/vendor/pending/','VendorController@pending');

});

