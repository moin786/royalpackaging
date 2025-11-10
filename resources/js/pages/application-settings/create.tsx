import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { create, store } from '@/routes/application-settings';
import { BreadcrumbItem } from '@/types';
import { Field, Fieldset, Legend } from '@headlessui/react';
import { Form, Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({
    flash,
    settings,
}: {
    flash?: { success?: string; error?: string };
    settings: {
        title: string;
        site_logo: string;
        api_key: string;
        senderid: string;
    };
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Application settings',
            href: create().url,
        },
    ];

    const [siteLogo, setSiteLogo] = useState<File | null>(null);
    const { errors } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Application settings" />
            <SettingsLayout>
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                    {flash?.success && (
                        <div className="mb-4 rounded-lg bg-green-100 p-4 text-sm font-bold text-green-700">
                            {flash.success}
                        </div>
                    )}
                    {Object.values(errors).length > 0 && (
                        <div className="mb-4 rounded-lg bg-red-100 p-4 text-sm font-bold text-red-700">
                            {Object.values(errors).map(
                                (error: string, index: number) => (
                                    <div key={index}>{error}</div>
                                ),
                            )}
                        </div>
                    )}
                    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                        <Form
                            {...store.form()}
                            resetOnSuccess={[
                                'title',
                                'site_log',
                                'api_key',
                                'senderid',
                            ]}
                            disableWhileProcessing
                            encType="multipart/form-data"
                        >
                            {({ processing }) => (
                                <Fieldset className="space-y-8">
                                    <Legend className="border-b p-3 text-lg font-bold">
                                        Application Settings
                                    </Legend>
                                    <div className="space-y-6 p-3">
                                        <Field className="space-y-2">
                                            <Label className="block space-y-6">
                                                Site Title
                                            </Label>
                                            <Input
                                                className="mt-1 block"
                                                value={settings?.title}
                                                name="title"
                                            />
                                        </Field>

                                        <Field className="space-y-2">
                                            <Label className="block space-y-6">
                                                SMS API Key
                                            </Label>
                                            <Input
                                                className="mt-1 block"
                                                name="api_key"
                                                value={settings?.api_key}
                                            />
                                        </Field>

                                        <Field className="space-y-2">
                                            <Label className="block space-y-6">
                                                SMS Senderid
                                            </Label>
                                            <Input
                                                className="mt-1 block"
                                                name="senderid"
                                                value={settings?.senderid}
                                            />
                                        </Field>

                                        <Field className="space-y-2">
                                            <span className="flex flex-row gap-3">
                                                {
                                                    <img
                                                        src={
                                                            siteLogo
                                                                ? URL.createObjectURL(
                                                                      siteLogo,
                                                                  )
                                                                : 'https://placehold.co/150x150/png'
                                                        }
                                                        className="h-32 w-32 object-cover"
                                                        alt="Site Logo"
                                                    />
                                                }

                                                {
                                                    <img
                                                        src={`/storage/${settings?.site_logo}`}
                                                        className="h-32 w-32 object-cover"
                                                        alt="Site Logo"
                                                    />
                                                }
                                            </span>

                                            <Label className="block">
                                                Logo
                                            </Label>
                                            <Input
                                                type="file"
                                                className="mt-1 block"
                                                name="site_logo"
                                                onChange={(e) =>
                                                    setSiteLogo(
                                                        e.target.files[0],
                                                    )
                                                }
                                            />
                                        </Field>
                                        <Field className="space-y-2">
                                            <Button
                                                disabled={processing}
                                                data-test="update-profile-button"
                                            >
                                                Save
                                            </Button>
                                        </Field>
                                    </div>
                                </Fieldset>
                            )}
                        </Form>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
