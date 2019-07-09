<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::view('/cardCustomization','welcome');

Route::view('/cardCustomization/wedding/1','wedding1');
Route::view('/cardCustomization/wedding/2','wedding2');
Route::view('/cardCustomization/wedding/3','wedding3');

Route::view('/cardCustomization/birthday/1','birthday1');
Route::view('/cardCustomization/birthday/2','birthday2');
Route::view('/cardCustomization/birthday/3','birthday3');
//Route::view('/{path?}', 'app');
Route::view('/{path1?}/{path2?}', 'app');