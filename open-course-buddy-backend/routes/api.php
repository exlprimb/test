<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\CategoryController;

Route::get('/courses', [CourseController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
// Rute yang bisa diakses semua orang (termasuk guest)
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rute yang hanya bisa diakses oleh user yang sudah login
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Rute khusus Admin
    Route::middleware('role:admin')->group(function() {
        // Contoh: Route::get('/admin/stats', [AdminController::class, 'stats']);
    });

    // Rute khusus Instructor
    Route::middleware('role:instructor')->group(function() {
        // Contoh: Route::post('/courses/upload', [CourseController::class, 'upload']);
    });

    // Rute khusus User (Siswa)
    Route::middleware('role:user')->group(function() {
        // Contoh: Route::post('/courses/{course}/enroll', [EnrollmentController::class, 'store']);
    });
});
});