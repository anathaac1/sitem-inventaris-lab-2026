<?php

use App\Http\Controllers\Api\ProfileApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/profile', [ProfileApiController::class, 'show']);
    Route::put('/profile', [ProfileApiController::class, 'update']);
    Route::post('/profile', [ProfileApiController::class, 'update']);
});
