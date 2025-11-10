import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Product } from '@/interfaces/product/product';
import AppLayout from '@/layouts/app-layout';
import DeliveryLayout from '@/layouts/delivery/layout';
import { store } from '@/routes/delivery-prices';
import { Field, Fieldset, Legend } from '@headlessui/react';
import { Form, Head, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({
    products,
    flash,
}: {
    products: Product[];
    flash?: { success?: string; error?: string };
}) {
    const [setData] = useState();
    const { errors } = usePage().props;

    return (
        <AppLayout>
            <DeliveryLayout>
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
                            resetOnSuccess={[
                                'product_id',
                                'delivery_type',
                                'delivery_charge',
                                'over_weight_charge',
                            ]}
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
                                                Product
                                            </Label>

                                            <Select
                                                name="product_id"
                                                onValueChange={(val) =>
                                                    setData('product_id', val)
                                                }
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select product" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {products.map((prod) => (
                                                        <SelectItem
                                                            key={prod.id}
                                                            value={String(
                                                                prod.id,
                                                            )}
                                                        >
                                                            {prod.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.category_id && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {errors.product_id}
                                                </p>
                                            )}
                                        </Field>
                                        <Field className="space-y-2">
                                            <Label className="block space-y-6">
                                                Delivery Type
                                            </Label>
                                            <Input
                                                className="mt-1 block"
                                                name="delivery_type"
                                            />
                                        </Field>
                                        <div className="flex flex-col gap-3 sm:flex-row md:flex-row">
                                            <Field className="w-full space-y-2">
                                                <Label className="block space-y-6">
                                                    Delivery Charge
                                                </Label>
                                                <Input
                                                    className="mt-1 block"
                                                    name="delivery_charge"
                                                    type="number"
                                                />
                                            </Field>
                                            <Field className="w-full space-y-2">
                                                <Label className="block space-y-6">
                                                    Over Weight (Over/Kg) {`->`}{' '}
                                                    (TK)
                                                </Label>
                                                <Input
                                                    className="mt-1 block"
                                                    name="over_weight_charge"
                                                    type="number"
                                                />
                                            </Field>
                                        </div>
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
            </DeliveryLayout>
        </AppLayout>
    );
}
