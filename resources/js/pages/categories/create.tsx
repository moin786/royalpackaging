import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import CategoryLayout from '@/layouts/category/layout';
import { store } from '@/routes/categories';
import { Field, Fieldset, Legend, Textarea } from '@headlessui/react';
import { Form, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({
    flash,
}: {
    flash?: { success?: string; error?: string };
}) {
    const [categoryImage, setCategoryImage] = useState<File | null>(null);
    const { errors } = usePage().props;

    return (
        <AppLayout>
            <CategoryLayout>
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
                                        Category
                                    </Legend>
                                    <div className="space-y-6 p-3">
                                        <Field className="space-y-2">
                                            <Label className="block space-y-6">
                                                Name
                                            </Label>
                                            <Input
                                                className="mt-1 block"
                                                name="name"
                                            />
                                        </Field>
                                        <Field className="space-y-2">
                                            <Label className="block">
                                                Description
                                            </Label>
                                            <Textarea
                                                className="mt-1 block w-full rounded border border-gray-300 p-3"
                                                name="description"
                                            />
                                        </Field>
                                        <Field className="space-y-2">
                                            {
                                                <img
                                                    src={
                                                        categoryImage
                                                            ? URL.createObjectURL(
                                                                  categoryImage,
                                                              )
                                                            : 'https://placehold.co/150x150/png'
                                                    }
                                                    className="h-32 w-32 object-cover"
                                                    alt="Category Image"
                                                />
                                            }
                                            <Label className="block">
                                                Image
                                            </Label>
                                            <Input
                                                type="file"
                                                className="mt-1 block"
                                                name="category_image"
                                                onChange={(e) =>
                                                    setCategoryImage(
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
            </CategoryLayout>
        </AppLayout>
    );
}
