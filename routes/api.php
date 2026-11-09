<?php

use App\Http\Controllers\Api\ProfileApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes (Rute Endpoint API JSON)
|--------------------------------------------------------------------------
|
| Catatan:
| File ini nentuin endpoint-endpoint REST API yang ngebalikin respons berupa data JSON.
| Biasanya dipake buat kebutuhan panggilan AJAX/fetch di background tanpa reload halaman,
| atau integrasi sama sistem/aplikasi eksternal.
|
*/

// Semua rute di dalam grup ini otomatis dapet prefix '/api/v1/...'
Route::prefix('v1')->group(function () {
    // Endpoint buat ngambil detail profil user dalam bentuk JSON
    Route::get('/profile', [ProfileApiController::class, 'show']);

    // Endpoint buat update data profil user lewat method PUT atau POST
    Route::put('/profile', [ProfileApiController::class, 'update']);
    Route::post('/profile', [ProfileApiController::class, 'update']);
});
