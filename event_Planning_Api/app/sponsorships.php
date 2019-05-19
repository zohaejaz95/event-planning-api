<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class sponsorships extends Model
{
    //
    protected $table = 'sponsorships';
    protected $primaryKey = 'sponsorship_id';
    public $timestamps = false;
    protected $fillable = [
        'type',
        'donation',
        'status',
        'vendor_id',
        'ngo_id',
        'service_id'
    ];
}
