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
Route::get('vendor/{id}','VendorController@show');
Route::get('vendors/token','VendorController@show_token');

Route::get('NGOs','NgoController@index');
Route::get('NGOs/{id}','NgoController@show');
Route::get('ngo/token','NgoController@show_token');

Route::post('NGOs/create/event','NgoController@create_event');
Route::post('NGOs/update/event/{id}','NgoController@update_event');
Route::delete('NGOs/delete/event/{id}','NgoController@delete_event');
Route::get('NGOs/get/events/token','NgoController@get_events_token');
Route::get('NGOs/get/events','NgoController@get_events');
Route::get('NGOs/get/event/{id}','NgoController@get_event_id');
Route::post('NGOs/create/sponsorship','NgoController@create_sponsorship');
Route::post('NGOs/sponsorships/accept/{id}','NgoController@accept_sponsorship');
Route::get('NGOs/sponsorships/get/{id}/{status}/{type}','NgoController@get_sponsorships_events');
Route::get('NGOs/sponsorships/funding/{id}','NgoController@get_funding_status');

Route::get('vendors/sponsorships/get','NgoController@get_sponsorships_ven');

Route::put('admin/vendor/update/{id}','VendorController@updateStatus');
Route::put('admin/NGO/update/{id}','NgoController@updateStatus');
Route::get('admin/NGO/approved/','NgoController@approved');
Route::get('admin/NGO/rejected/','NgoController@rejected');
Route::get('admin/NGO/pending/','NgoController@pending');
Route::get('admin/vendor/approved/{cat}','VendorController@approved');
Route::get('admin/vendor/all/approved/','VendorController@approved_All');
Route::get('admin/vendor/rejected/','VendorController@rejected');
Route::get('admin/vendor/pending/','VendorController@pending');

Route::post('customer/newevent/','CustomerEventController@store');
Route::post('customer/update/event/{id}','CustomerEventController@edit');
Route::get('customer/events/list/{status}','CustomerEventController@index');
Route::get('customer/events/active','CustomerEventController@activeEvents');

Route::get('customer/events/expenses/{id}','CustomerEventController@get_expenses');
Route::get('vendor/package/cost/{id}','CustomerEventController@get_package_cost');
Route::delete('customer/events/delete/{id}','CustomerEventController@destroy');
Route::post('customer/events/update/status','CustomerEventController@update_event_status');

Route::get('customer/events/{id}','CustomerEventController@show');
Route::post('customer/orders/new','CustomerEventController@new_order');
Route::get('customer/orders/{id}','CustomerEventController@get_order');
Route::get('customer/orders/pending/{type}/{id}','CustomerEventController@get_order_pending');
Route::get('customer/orders/approved/{type}/{id}','CustomerEventController@get_order_approved');
Route::get('customer/orders/complete/{type}/{id}','CustomerEventController@get_order_complete');

Route::post('customers/orders/update/order/{id}','CustomerEventController@update_order_status');
Route::post('customers/orders/update/payment/{id}','CustomerEventController@update_payment_status');
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
Route::get('vendor/get/service/category/token/{cat}','VendorController@get_service_cat_token');


//--------------------------------
Route::get('vendor/services/category/{cat}/{id}','VendorController@get_service_cat_ven');
Route::get('vendor/services/for/customer/{id}','VendorController@ven_services_for_cust');
//---------------------------------



Route::get('vendor/get/service/all/token','VendorController@get_vendor_services');
Route::post('vendor/service/{id}/add/image','VendorController@add_service_img');
Route::get('vendor/service/{id}/get/image','VendorController@get_serv_img');

Route::post('vendors/update/serivces/{id}','VendorController@update_service');
Route::delete('vendor/delete/serivce/{id}','VendorController@delete_service');
Route::post('vendor/create/package','VendorController@create_package');
Route::get('vendor/get/package/{id}','VendorController@get_package');
Route::get('vendor/get/services/package/{id}','VendorController@get_serv_package');
Route::get('vendor/get/packages/token','VendorController@get_ven_package');
Route::get('vendor/get/packages/all','VendorController@get_all_package');
Route::post('vendor/package/{id}/add/image','VendorController@add_package_img');
Route::get('vendor/package/{id}/get/image','VendorController@get_pkg_img');

Route::get('vendor/get/orders/approved/{type}','VendorController@get_order_approved');
Route::get('vendor/get/orders/pending/{type}','VendorController@get_order_pending');
Route::get('vendor/update/orders/{id}/{status}','VendorController@update_order_status');

Route::post('vendor/update/package/{id}','VendorController@update_package');
Route::delete('vendor/delete/package/{id}','VendorController@delete_package');
Route::get('vendors/locations','VendorController@get_locations');
Route::get('vendors/categories','VendorController@get_categories');
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

//chats ngo
Route::get('chat/ngo/conversations','ngo_conversations@get_conver_ngo');
Route::get('chat/ngo/conversations/vendor','ngo_conversations@get_conver_vendor');
Route::get('chat/ngo/chat/{convo_id}','ngo_conversations@get_chat');
Route::post('chat/ngo/new/conversation/{ngo_id}/{vend_id}','ngo_conversations@create_conversation');
Route::post('chat/ngo/new/message','ngo_conversations@send_message');
Route::get('chat/ngo/unread/{conv_id}','ngo_conversations@get_unread');
Route::get('chat/ngo/update_status/{msg_id}','ngo_conversations@update_status');
//chats customer

Route::get('chat/customer/conversations','customer_conversations@get_conver_cust');
Route::get('chat/customer/conversations/vendor','customer_conversations@get_conver_vendor');
Route::get('chat/customer/chat/{convo_id}','customer_conversations@get_chat');
Route::post('chat/customer/new/conversation/{cust_id}/{vend_id}','customer_conversations@create_conversation');
Route::post('chat/customer/new/message','customer_conversations@send_message');
Route::get('chat/customer/unread/{conv_id}','customer_conversations@get_unread');
Route::get('chat/customer/update_status/{msg_id}','customer_conversations@update_status');

});



