<?php

namespace App\Http\Controllers;

use App\Models\ApplicationSetting;
use App\Traits\HandlesImageUpload;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationSettingController extends Controller
{
    use HandlesImageUpload;

    public function index()
    {
        //
    }

    public function create()
    {
        $settings = ApplicationSetting::first();
        //dd($settings);
        return Inertia::render('application-settings/create', [
            'settings' => $settings
        ]);
    }

    public function store(Request $request)
    {
        $settings = ApplicationSetting::first();

        if (! ApplicationSetting::exists()) {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'api_key' => 'nullable|string',
                'senderid' => 'nullable|string',
                'site_logo' => 'nullable|image|max:700',
            ]);

            if ($request->file('site_logo')) {
                $data = [
                    'title' => $request->title,
                    'api_key' => $request->api_key,
                    'senderid' => $request->senderid,
                    'site_logo' => $this->handleImageUpload($request->file('site_logo'), 'images/site_logo'),
                ];

                ApplicationSetting::create($data);

                return redirect()->back()->with('success', 'Application settings created successfully.');
            }

            $data = [
                'title' => $request->title,
                'api_key' => $request->api_key,
                'senderid' => $request->senderid
            ];

            ApplicationSetting::create($data);

            return redirect()->back()->with('success', 'Application settings created successfully.');
        }


        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'api_key' => 'nullable|string',
            'senderid' => 'nullable|string',
            'site_logo' => 'nullable|image|max:700',
        ]);

        if ($request->file('site_logo')) {

            $data = [
                'title' => $request->title,
                'api_key' => $request->api_key,
                'senderid' => $request->senderid,
                'site_logo' => $this->handleImageUpload($request->file('site_logo'), 'images/site_logo'),
            ];

            $settings->update($data);

            return redirect()->back()->with('success', 'Application settings updated successfully.');
        }

        $data = [
            'title' => $request->title,
            'api_key' => $request->api_key,
            'senderid' => $request->senderid
        ];

        $settings->update($data);


        return redirect()->back()->with('success', 'Application settings updated successfully.');
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $settings = ApplicationSetting::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'api_key' => 'nullable|string',
            'senderid' => 'nullable|string',
            'site_logo' => 'nullable|image|max:700',
        ]);

        if ($request->file('site_logo')) {

            $data = [
                'title' => $request->title,
                'api_key' => $request->api_key,
                'senderid' => $request->senderid,
                'site_log' => $this->handleImageUpload($request->file('site_log')),
            ];

            $settings->update($data);

            return redirect()->back()->with('success', 'Application settings updated successfully.');
        }

        $data = [
            'title' => $request->title,
            'api_key' => $request->api_key,
            'senderid' => $request->senderid
        ];

        $settings->update($data);


        return redirect()->back()->with('success', 'Application settings updated successfully.');
    }
}
