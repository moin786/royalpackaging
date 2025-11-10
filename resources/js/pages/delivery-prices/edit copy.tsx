import ProductController from '@/actions/App/Http/Controllers/ProductController';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Category } from '@/interfaces/category/category';
import { Product } from '@/interfaces/product/product';
import AppLayout from '@/layouts/app-layout';
import ProductLayout from '@/layouts/product/layout';
import { Field, Fieldset, Legend, Textarea } from '@headlessui/react';
import { Form, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({
    product,
    categories,
    flash,
}: {
    product: Product[];
    categories: Category[];
    flash?: { success?: string; error?: string };
}) {
    const [productImage, setProductImage] = useState<File | null>(null);
    const { errors } = usePage().props;

    return (
        <AppLayout>
            <ProductLayout>
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
                            {...ProductController.update?.form(product[0].id)}
                            resetOnSuccess={[
                                'name',
                                'description',
                                'product_image',
                                'category_id',
                                'status',
                            ]}
                            disableWhileProcessing
                            encType="multipart/form-data"
                        >
                            {({ processing, errors }) => (
                                <Fieldset className="space-y-8">
                                    <Legend className="border-b p-3 text-lg font-bold">
                                        Edit Product
                                    </Legend>
                                    <div className="space-y-6 p-3">
                                        <Field className="space-y-2">
                                            <Label className="block space-y-6">
                                                Name
                                            </Label>
                                            <Input
                                                defaultValue={product[0]?.name}
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
                                                    defaultValue={
                                                        product[0]?.minimumUnit
                                                    }
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
                                                    defaultValue={
                                                        product[0]?.unitPrice
                                                    }
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
                                                    defaultValue={
                                                        product[0]?.unitWeight
                                                    }
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
                                                defaultValue={
                                                    product[0]?.description
                                                }
                                                name="description"
                                            />
                                        </Field>
                                        <Field className="space-y-2">
                                            <div className="flex flex-row gap-4">
                                                {
                                                    <img
                                                        src={`/storage/${product[0]?.productImage}`}
                                                        className="h-32 w-32"
                                                        alt="Product Image"
                                                    />
                                                }
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
                                            </div>
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
                                            <select
                                                name="category_id"
                                                defaultValue={
                                                    product[0].category.id
                                                }
                                                className="mt-1 block w-full rounded border border-gray-300 p-2"
                                            >
                                                <option value="">
                                                    Select category
                                                </option>
                                                {categories.map((cat) => (
                                                    <option
                                                        key={cat.id}
                                                        value={cat.id}
                                                    >
                                                        {cat.name}
                                                    </option>
                                                ))}
                                            </select>

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
                                            {product[0]?.status === 1 ? (
                                                <Checkbox
                                                    name="status"
                                                    checked
                                                    value={1}
                                                    defaultValue={
                                                        product[0]?.status
                                                    }
                                                />
                                            ) : (
                                                <Checkbox
                                                    name="status"
                                                    value={1}
                                                />
                                            )}
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
