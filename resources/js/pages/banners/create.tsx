import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import BannerLayout from '@/layouts/banner/layout';
import { store } from '@/routes/banners';
import { Field, Fieldset, Legend, Textarea } from '@headlessui/react';
import { Form, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({
    flash,
}: {
    flash?: { success?: string; error?: string };
}) {
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const { errors } = usePage().props;

    return (
        <AppLayout>
            <BannerLayout>
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
                            resetOnSuccess={['name', 'description']}
                            disableWhileProcessing
                            encType="multipart/form-data"
                        >
                            {({ processing }) => (
                                <Fieldset className="space-y-8">
                                    <Legend className="border-b p-3 text-lg font-bold">
                                        Banner
                                    </Legend>
                                    <div className="space-y-6 p-3">
                                        <Field className="space-y-2">
                                            <Label className="block space-y-6">
                                                Banner Title
                                            </Label>
                                            <Input
                                                className="mt-1 block"
                                                name="banner_title"
                                            />
                                        </Field>
                                        <Field className="space-y-2">
                                            <Label className="block">
                                                Description
                                            </Label>
                                            <Textarea
                                                className="mt-1 block w-full rounded border border-gray-300 p-3"
                                                name="banner_description"
                                            />
                                        </Field>
                                        <Field className="space-y-2">
                                            {
                                                <img
                                                    src={
                                                        bannerImage
                                                            ? URL.createObjectURL(
                                                                  bannerImage,
                                                              )
                                                            : 'https://placehold.co/150x150/png'
                                                    }
                                                    className="h-32 w-32 object-cover"
                                                    alt="Banner Image"
                                                />
                                            }
                                            <Label className="block">
                                                Image
                                            </Label>
                                            <Input
                                                type="file"
                                                className="mt-1 block"
                                                name="banner_image"
                                                onChange={(e) =>
                                                    setBannerImage(
                                                        e.target?.files[0],
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
            </BannerLayout>
        </AppLayout>
    );
}
