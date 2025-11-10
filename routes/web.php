<?php

use App\Http\Controllers\ApplicationSettingController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SiteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/welcome', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/', [SiteController::class, 'index'])->name('index');
Route::post('/client-login', [CustomerController::class, 'login'])->name('client-login');
Route::post('/client-logout', [CustomerController::class, 'logout'])->name('client-logout');

Route::middleware(['customer.auth'])->group(function() {
    Route::get('/checkout', [OrderController::class, 'create'])->name('checkout');
    Route::post('/submit-order', [OrderController::class, 'store'])->name('submit-order');
    Route::get('/user-order-list/{search?}', [OrderController::class, 'userOrderList'])->name('user-order-list');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('orders', OrderController::class)->except('show');
    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::resource('delivery-prices', DeliveryController::class);
    Route::resource('application-settings', ApplicationSettingController::class);

    Route::get('orders/pending-order', [OrderController::class, 'index'])->name('pendingorder');
    Route::get('orders/confirm-order', [OrderController::class, 'showConfirmedOrder'])->name('confirmorder');
    Route::get('orders/ontransit-order', [OrderController::class, 'showOnTransitOrder'])->name('ontransitorder');
    Route::get('orders/delivered-order', [OrderController::class, 'showDeliveredOrder'])->name('deliveredorder');
    

});

require __DIR__.'/settings.php';
