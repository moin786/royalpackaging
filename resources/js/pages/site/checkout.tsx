import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/use-cart';
import { Banner } from '@/interfaces/banner/banner';
import FrontLayout from '@/layouts/front-layout';
import TopLayout from '@/layouts/top-layout';
import { submitOrder } from '@/routes';
import { Field, Fieldset, Legend, Textarea } from '@headlessui/react';
import { Form, usePage } from '@inertiajs/react';
import { useEffect, useMemo } from 'react';
import Call from './call';
import LoginAndCart from './login-and-cart';
import SiteLogo from './site-logo';

export default function CheckOut({ banner }: { banner: Banner }) {
    const { cartItems, clearCart } = useCart();
    const { flash } = usePage().props;
    const invoiceTotal = useMemo(
        () => cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0),
        [cartItems],
    );

    useEffect(() => {
        if (flash?.success) {
            clearCart();
        }
    }, [clearCart, flash?.success]);

    return (
        <FrontLayout banner={banner}>
            <>
                <TopLayout>
                    <SiteLogo />
                    <Call />

                    <LoginAndCart />
                </TopLayout>
                <div className="flex h-auto flex-col">
                    {flash?.success ? (
                        <div className="mt-5 flex flex-col items-center justify-start gap-5">
                            <span className="flex flex-col gap-5 text-xl font-bold">
                                <span className="flex flex-row gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        className="lucide lucide-handbag-icon lucide-handbag"
                                    >
                                        <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
                                        <path d="M8 11V6a4 4 0 0 1 8 0v5" />
                                    </svg>
                                    {flash?.success}
                                </span>
                                <span className="flex flex-col gap-2">
                                    <span className="text-xl font-bold">
                                        Order No. {flash?.order_id}
                                    </span>
                                    <span className="text-xl font-bold">
                                        Order Amount.{' '}
                                        {new Intl.NumberFormat('en-BD', {
                                            style: 'currency',
                                            currency: 'BDT',
                                        }).format(Number(flash?.order_amount))}
                                    </span>

                                    <span className="text-xl font-bold">
                                        Order Date. {flash?.order_date}
                                    </span>
                                </span>
                            </span>
                        </div>
                    ) : (
                        <>
                            <h1 className="mt-10 text-center text-xl font-bold">
                                Check Out to Place Your Order.
                            </h1>
                            <div className="mt-5 flex flex-col items-center justify-center gap-10 sm:flex-row md:flex-row">
                                <table className="item-table w-full table-auto border-collapse border border-gray-400">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-300">
                                                Product Name
                                            </th>
                                            <th className="border border-gray-300">
                                                Unit Price (100 pc)
                                            </th>
                                            <th className="border border-gray-300">
                                                Total Price
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr>
                                                <td>
                                                    {item?.filterProduct?.name}
                                                </td>
                                                <td>
                                                    {new Intl.NumberFormat(
                                                        'bn-BD',
                                                        {
                                                            style: 'currency',
                                                            currency: 'BDT',
                                                        },
                                                    ).format(
                                                        Number(
                                                            item?.filterProduct
                                                                ?.unit_price,
                                                        ),
                                                    )}
                                                </td>
                                                <td>
                                                    {new Intl.NumberFormat(
                                                        'bn-BD',
                                                        {
                                                            style: 'currency',
                                                            currency: 'BDT',
                                                        },
                                                    ).format(item?.totalPrice)}
                                                </td>
                                            </tr>
                                        ))}

                                        <tr>
                                            <td colSpan={2}></td>
                                            <td className="font-bold">
                                                {new Intl.NumberFormat(
                                                    'bn-BD',
                                                    {
                                                        style: 'currency',
                                                        currency: 'BDT',
                                                    },
                                                ).format(invoiceTotal)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="w-full">
                                    <Form
                                        {...submitOrder.form()}
                                        resetOnSuccess={[
                                            'name',
                                            'mobile',
                                            'email',
                                            'description',
                                        ]}
                                        disableWhileProcessing
                                    >
                                        {({ processing, errors }) => (
                                            <Fieldset className="space-y-8">
                                                <Legend className="border-b p-3 text-lg font-bold">
                                                    Billing Address
                                                </Legend>
                                                <div className="space-y-6 p-3">
                                                    <Field className="space-y-2">
                                                        <Label className="block space-y-6">
                                                            Mobile
                                                        </Label>
                                                        <Input
                                                            className="mt-1 block"
                                                            name="mobile"
                                                            value={
                                                                flash?.login_mobile
                                                            }
                                                        />
                                                    </Field>
                                                    <Field className="space-y-2">
                                                        <Label className="block space-y-6">
                                                            Name{' '}
                                                            <span className="text-lg text-red-500">
                                                                *
                                                            </span>
                                                        </Label>
                                                        <Input
                                                            className="mt-1 block"
                                                            name="name"
                                                        />
                                                        <span className="font-semibold text-red-500">
                                                            {errors.name}
                                                        </span>
                                                    </Field>
                                                    <Field className="space-y-2">
                                                        <Label className="block space-y-6">
                                                            Email (Optional)
                                                        </Label>
                                                        <Input
                                                            className="mt-1 block"
                                                            name="email"
                                                        />
                                                        <span className="font-semibold text-red-500">
                                                            {errors.email}
                                                        </span>
                                                    </Field>
                                                    <Field className="space-y-2">
                                                        <Label className="block">
                                                            Description
                                                        </Label>
                                                        <Textarea
                                                            className="mt-1 block w-full rounded border border-gray-300 p-3"
                                                            name="description"
                                                        />

                                                        <Input
                                                            type="hidden"
                                                            value={JSON.stringify(
                                                                cartItems,
                                                            )}
                                                            name="invoice_items"
                                                        />
                                                    </Field>

                                                    <Field className="flex items-center gap-5 space-y-2">
                                                        <span className="flex gap-2 rounded-md border border-gray-600 px-4 py-1 text-xs font-bold sm:text-sm md:text-sm">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                stroke-width="2"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                className="lucide lucide-check-icon lucide-check"
                                                            >
                                                                <path d="M20 6 9 17l-5-5" />
                                                            </svg>
                                                            CASH ON DELIVERY
                                                        </span>
                                                        <Button
                                                            data-test="update-profile-button"
                                                            disabled={
                                                                processing
                                                            }
                                                        >
                                                            <span className="text-xs sm:text-sm md:text-sm">
                                                                PLACE ORDER
                                                            </span>
                                                        </Button>
                                                    </Field>
                                                </div>
                                            </Fieldset>
                                        )}
                                    </Form>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </>
        </FrontLayout>
    );
}
