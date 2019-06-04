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
Route::get('customers/{id}','CustomerController@show');
Route::get('customer/token/','CustomerController@show_token');

Route::get('vendors','VendorController@index');
Route::get('vendors/{id}','VendorController@show');
Route::get('vendor/token','VendorController@show_token');

Route::get('NGOs','NgoController@index');
Route::get('NGOs/{id}','NgoController@show');
Route::post('NGOs/create/event','NgoController@create_event');
Route::put('NGOs/update/event/{id}','NgoController@update_event');
Route::delete('NGOs/delete/event/{id}','NgoController@delete_event');
Route::get('NGOs/get/events/token','NgoController@get_events_token');
Route::get('NGOs/get/events','NgoController@get_events');
Route::get('NGOs/get/event/{id}','NgoController@get_event');
Route::post('NGOs/create/sponsorship','NgoController@create_sponsorship');
Route::put('NGOs/sponsorships/accept/{id}','NgoController@accept_sponsorship');
Route::get('NGOs/sponsorships/get/{id}/{status}','NgoController@get_sponsorships_events');
Route::get('NGOs/sponsorships/funding/{id}','NgoController@get_funding_status');

Route::put('admin/vendor/update/{id}','VendorController@updateStatus');
Route::put('admin/NGO/update/{id}','NgoController@updateStatus');
Route::get('admin/NGO/approved/','NgoController@approved');
Route::get('admin/NGO/rejected/','NgoController@rejected');
Route::get('admin/NGO/pending/','NgoController@pending');
Route::get('admin/vendor/approved/','VendorController@approved');
Route::get('admin/vendor/rejected/','VendorController@rejected');
Route::get('admin/vendor/pending/','VendorController@pending');

Route::post('customer/newevent/','customerEventController@store');
Route::get('customer/events/{status}','customerEventController@index');
Route::get('customer/events/expenses/{id}','customerEventController@get_expenses');
Route::get('vendor/package/cost/{id}','customerEventController@get_package_cost');
Route::delete('customer/events/delete/{id}','customerEventController@destroy');
Route::post('customer/events/update/status','customerEventController@update_event_status');

Route::get('customer/events/{id}','customerEventController@show');
Route::post('customer/orders/new','customerEventController@new_order');
Route::get('customer/orders/{id}','customerEventController@get_order');
Route::get('customer/orders/pending/{type}/{id}','customerEventController@get_order_pending');
Route::get('customer/orders/approved/{type}/{id}','customerEventController@get_order_approved');

Route::post('customers/orders/update/order/{id}','customerEventController@update_order_status');
Route::post('customers/orders/update/payment/{id}','customerEventController@update_payment_status');
Route::post('customer/newcontact/','ContactListController@store');
Route::get('customer/contacts','ContactListController@index');
Route::delete('customer/contacts/delete/{id}','ContactListController@destroy');

Route::post('customer/guest_list/add','ContactListController@add_guest');
Route::get('customer/guest_list/get/{event_id}','ContactListController@get_guests');
Route::get('customer/guest_list/get/{event_id}/{status}','ContactListController@get_guests_status');
Route::delete('customer/guest_list/remove/{id}','ContactListController@remove_guest');

Route::post('vendor/create/service','VendorController@create_service');
Route::get('vendor/get/service/{id}','VendorController@get_service');
Route::get('vendor/get/service/category/{cat}','VendorController@get_service_cat');

Route::put('vendor/update/serivce/{id}','VendorController@update_service');
Route::delete('vendor/delete/serivce/{id}','VendorController@delete_service');
Route::post('vendor/create/package','VendorController@create_package');
Route::get('vendor/get/package/{id}','VendorController@get_package');
Route::get('vendor/get/packages/token','VendorController@get_ven_package');
Route::get('vendor/get/packages/all','VendorController@get_all_package');
Route::get('vendor/get/orders/approved/{type}','VendorController@get_order_approved');
Route::get('vendor/get/orders/pending/{type}','VendorController@get_order_pending');
Route::put('vendor/update/orders/{id}/{status}','VendorController@update_order_status');

Route::put('vendor/update/package/{id}','VendorController@update_package');
Route::delete('vendor/delete/package/{id}','VendorController@delete_package');
Route::get('vendor/locations','VendorController@get_locations');
Route::get('vendor/categories','VendorController@get_categories');
Route::get('vendor/payment_methods/{id}','VendorController@get_payment_methods');
Route::get('vendor/get/services','VendorController@get_vendor_services');

//feedbacks
Route::get('customer/feedbacks/service/{id}','feedback_controller@show_cust_service');
Route::get('customer/feedbacks/package/{id}','feedback_controller@show_cust_package');
Route::get('feedbacks/service/{id}','feedback_controller@show_service');
Route::get('feedbacks/package/{id}','feedback_controller@show_package');
Route::delete('customer/delete/{id}','feedback_controller@destroy');
Route::post('customer/feedback/new','feedback_controller@store');
Route::put('customer/feedback/update/{id}','feedback_controller@update');


});



