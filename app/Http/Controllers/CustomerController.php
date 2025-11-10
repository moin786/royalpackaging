<?php

namespace App\Http\Controllers;

use App\Models\ApplicationSetting;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function login(Request $request)
    {

        $appSettings = ApplicationSetting::first();

        if (Customer::where('mobile', $request->mobile)->exists()) {

            if (Customer::where('mobile', $request->mobile)->where('login_pin', $request->password)->exists()) {
                session()->put(['login_mobile' => $request->mobile]);
                session()->put(['is_login' => true]);
                session()->put(['isPinGenerate' => false]);

                return redirect()->back();
            }

            $loginpin = random_int(1000, 9999);
            Customer::where('mobile', $request->mobile)->update(['login_pin' => $loginpin]);
            $response = Http::asForm()->post('https://bulksmsbd.net/api/smsapi', [
                'api_key'   => $appSettings->api_key,//'rd4i8INpjWCqgKPImdHW', //env('RECAPTCHA_SECRET_KEY'),
                'senderid' => $appSettings->senderid,//'8809617628902',
                'number' => $request->mobile,
                'message' => 'Dear valueable customer, your one time password is '.$loginpin
            ]);

            session()->put(['isPinGenerate' => true]);
            session()->put(['is_login' => false]);

            return redirect()->back();
        }

        

        $loginpin = random_int(1000, 9999);

        Customer::create([
            'mobile' => $request->mobile,
            'login_pin' => $loginpin
        ]);
        
        $response = Http::asForm()->post('https://bulksmsbd.net/api/smsapi', [
            'api_key'   => $appSettings->api_key,//'rd4i8INpjWCqgKPImdHW', //env('RECAPTCHA_SECRET_KEY'),
            'senderid' => $appSettings->senderid,//'8809617628902',
            'number' => $request->mobile,
            'message' => 'Dear valueable customer, your one time password is '.$loginpin
        ]);

        session()->put(['isPinGenerate' => true]);
        session()->put(['is_login' => false]);

        return redirect()->back();
    }

    public function logout() 
    {
        session()->put(['login_mobile' => null]);
        session()->put(['is_login' => false]);
        session()->put(['isPinGenerate' => false]);

        redirect()->back();
    }
}
