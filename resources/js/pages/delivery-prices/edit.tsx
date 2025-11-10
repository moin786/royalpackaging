import DeliveryController from '@/actions/App/Http/Controllers/DeliveryController';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Delivery } from '@/interfaces/delivery/delivery';
import { Product } from '@/interfaces/product/product';
import AppLayout from '@/layouts/app-layout';
import DeliveryLayout from '@/layouts/delivery/layout';
import { Field, Fieldset, Legend } from '@headlessui/react';
import { Form, Head, usePage } from '@inertiajs/react';

export default function Edit({
    delivery,
    products,
    flash,
}: {
    delivery: Delivery;
    products: Product[];
    flash?: { success?: string; error?: string };
}) {
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
                            {...DeliveryController.update?.form(delivery.id)}
                            resetOnSuccess={[
                                'product_id',
                                'delivery_type',
                                'delivery_charge',
                                'over_weight_charge',
                            ]}
                            disableWhileProcessing
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
                                            <select
                                                name="product_id"
                                                defaultValue={
                                                    delivery.product.id
                                                }
                                                className="mt-1 block w-full rounded border border-gray-300 p-2"
                                            >
                                                <option value="">
                                                    Select product
                                                </option>
                                                {products.map((prod) => (
                                                    <option
                                                        key={prod.id}
                                                        value={prod.id}
                                                    >
                                                        {prod.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.product_id && (
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
                                                defaultValue={
                                                    delivery.delivery_type
                                                }
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
                                                    defaultValue={
                                                        delivery.delivery_charge
                                                    }
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
                                                    defaultValue={
                                                        delivery.over_weight_charge
                                                    }
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
