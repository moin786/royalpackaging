import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Category } from '@/interfaces/category/category';
import AppLayout from '@/layouts/app-layout';
import ProductLayout from '@/layouts/product/layout';
import { store } from '@/routes/products';
import { Field, Fieldset, Legend, Textarea } from '@headlessui/react';
import { Form, Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({
    categories,
    flash,
}: {
    categories: Category[];
    flash?: { success?: string; error?: string };
}) {
    const [setData] = useState({
        name: '',
        category_id: '',
    });
    const [productImage, setProductImage] = useState<File | null>(null);
    const { errors } = usePage().props;

    return (
        <AppLayout>
            <ProductLayout>
                <Head title="Create Product" />
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
                    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 bg-gray-50 p-4 shadow-md shadow-neutral-300 md:min-h-min dark:border-sidebar-border">
                        <Form
                            {...store.form()}
                            resetOnSuccess={['name', 'description']}
                            disableWhileProcessing
                            encType="multipart/form-data"
                        >
                            {({ processing, errors }) => (
                                <Fieldset className="space-y-8">
                                    <Legend className="border-b p-3 text-lg font-bold">
                                        Create Product
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
                                        <div className="flex flex-row gap-3">
                                            <Field className="w-full space-y-2">
                                                <Label className="block space-y-6">
                                                    Min.Unit(Pc)
                                                </Label>
                                                <Input
                                                    className="mt-1 block"
                                                    name="minimum_unit"
                                                    type="number"
                                                />
                                            </Field>
                                            <Field className="w-full space-y-2">
                                                <Label className="block space-y-6">
                                                    Unit Price(TK)
                                                </Label>
                                                <Input
                                                    className="mt-1 block"
                                                    name="unit_price"
                                                    type="number"
                                                />
                                            </Field>
                                            <Field className="w-full space-y-2">
                                                <Label className="block space-y-6">
                                                    Unit Weight(Gm)
                                                </Label>
                                                <Input
                                                    className="mt-1 block"
                                                    name="unit_weight"
                                                    type="text"
                                                />
                                            </Field>
                                        </div>
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
                                                        productImage
                                                            ? URL.createObjectURL(
                                                                  productImage,
                                                              )
                                                            : 'https://placehold.co/150x150/png'
                                                    }
                                                    className="h-32 w-32 object-cover"
                                                    alt="Product Image"
                                                />
                                            }
                                            <Label className="block">
                                                Image
                                            </Label>
                                            <Input
                                                type="file"
                                                className="mt-1 block"
                                                name="product_image"
                                                onChange={(e) =>
                                                    setProductImage(
                                                        e.target.files[0],
                                                    )
                                                }
                                            />
                                        </Field>
                                        <Field className="space-y-2">
                                            <Label className="block space-y-6">
                                                Category
                                            </Label>

                                            <Select
                                                name="category_id"
                                                onValueChange={(val) =>
                                                    setData('category_id', val)
                                                }
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories.map((cat) => (
                                                        <SelectItem
                                                            key={cat.id}
                                                            value={String(
                                                                cat.id,
                                                            )}
                                                        >
                                                            {cat.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.category_id && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.category_id}
                                                </p>
                                            )}
                                        </Field>
                                        <Field className="space-y-2">
                                            <Label className="block">
                                                Status
                                            </Label>
                                            <Checkbox name="status" value={1} />
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
            </ProductLayout>
        </AppLayout>
    );
}
