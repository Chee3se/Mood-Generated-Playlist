<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    protected $fillable = ['user_id', 'emotion', 'album_link', 'album_name', 'img','is_favorite'];
}
