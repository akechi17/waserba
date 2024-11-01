<?php

use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EquityController;
use App\Http\Controllers\Api\EstimationController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\ReceivableController;
use App\Http\Controllers\Api\InformationController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\JournalController;
use App\Http\Controllers\PastProfitController;
use App\Http\Controllers\PolicyController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::post('/auth/login', [AuthController::class, 'login']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/adduser', [AuthController::class, 'adduser']);
    Route::post('/auth/signout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::resource('members', MemberController::class)->except(['create', 'edit']);
    Route::post('/avatars', [MemberController::class, 'uploadAvatar']);
    Route::put('/member/status/{id}', [MemberController::class, 'updateStatus']);
    Route::resource('estimations', EstimationController::class)->except(['create', 'edit']);
    Route::resource('receivables', ReceivableController::class)->except(['create', 'edit']);
    Route::resource('equities', EquityController::class)->except(['create', 'edit']);
    Route::resource('journals', JournalController::class)->except(['create', 'edit']);
    Route::get('/books/{estimation}', [JournalController::class, 'filter']);
    Route::resource('policies', PolicyController::class)->except(['create', 'edit']);
    Route::resource('past-profits', PastProfitController::class)->except(['create', 'edit']);
    Route::resource('about', AboutController::class)->except(['create', 'edit']);
    Route::resource('information', InformationController::class)->except(['create', 'edit']);
    Route::resource('news', NewsController::class)->except(['create', 'edit']);
    Route::get('/news/{id}', [NewsController::class, 'show']);
});