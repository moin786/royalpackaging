import { Button } from '@/components/ui/button';
import { CartItem } from '@/hooks/use-cart';
import { checkout } from '@/routes';
import { Link, usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import CartList from './cart-list';
import CustomerLogin from './user-login';

export default function ProductDetails({
    cartItems,
    handleQtyPlus,
    handleQtyMinus,
    onDeliveryCharge,
    onRemoveCartItem,
}: {
    cartItems: CartItem[];
    handleQtyPlus: (item: CartItem) => void;
    handleQtyMinus: (item: CartItem) => void;
    onDeliveryCharge: (item: CartItem, id: number) => void;
    onRemoveCartItem: (id: number) => void;
}) {
    const { flash } = usePage().props;

    const invoiceTotal = useMemo(
        () => cartItems.reduce((acc, curr) => acc + curr?.totalPrice, 0),
        [cartItems],
    );
    return (
        <>
            <div className="flex flex-col justify-between gap-5 overflow-x-auto">
                <table className="item-table w-full table-auto border-collapse border border-gray-400 dark:text-gray-900">
                    <thead>
                        <tr>
                            <th className="border border-gray-300">
                                Product Name
                            </th>
                            <th className="border border-gray-300">
                                Unit Price (100 pc)
                            </th>
                            <th className="border border-gray-300">Qty.</th>
                            <th className="border border-gray-300">Total Pc</th>
                            <th className="border border-gray-300">U.Weight</th>
                            <th className="border border-gray-300">
                                Total Weight
                            </th>
                            <th className="border border-gray-300">Price</th>
                            <th className="border border-gray-300">
                                Delivery Area
                            </th>
                            <th className="border border-gray-300">
                                Total Price
                            </th>
                            <th className="border border-gray-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <CartList
                                    key={index}
                                    product={item.filterProduct}
                                    item={item}
                                    handleQtyPlus={handleQtyPlus}
                                    handleQtyMinus={handleQtyMinus}
                                    onDeliveryCharge={onDeliveryCharge}
                                    onRemoveCartItem={onRemoveCartItem}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={10} className="p-5">
                                    <span className="text-center text-xl font-bold">
                                        No Product Found
                                    </span>
                                </td>
                            </tr>
                        )}
                        <tr>
                            <td
                                colSpan={8}
                                className="border border-gray-300 text-right font-bold"
                            >
                                Total
                            </td>
                            <td className="border border-gray-300 font-bold">
                                {new Intl.NumberFormat('bn-BD', {
                                    style: 'currency',
                                    currency: 'BDT',
                                }).format(invoiceTotal)}
                            </td>
                            <td className="border border-gray-300"></td>
                        </tr>
                    </tbody>
                </table>
                {flash?.is_login ? (
                    <div className="w-full rounded-md border border-gray-800">
                        <Button className="container">
                            <Link href={checkout.url()}>Check Out</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="w-full rounded-md border border-gray-800">
                        <CustomerLogin>
                            <Button className="container bg-black">
                                <span className="flex flex-row items-center gap-2">
                                    Check Out
                                </span>
                            </Button>
                        </CustomerLogin>
                    </div>
                )}
            </div>
        </>
    );
}
