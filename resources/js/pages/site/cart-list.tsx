import { CartItem } from '@/hooks/use-cart';
import { Delivery } from '@/interfaces/delivery/delivery';
import { Product } from '@/interfaces/product/product';
import { useEffect, useMemo, useState } from 'react';
import ConfirmDelete from './confirm-delete';

export default function CartList({
    product,
    item,
    handleQtyPlus,
    handleQtyMinus,
    onDeliveryCharge,
    onRemoveCartItem,
}: {
    product: Product;
    item: CartItem;
    handleQtyPlus: (item: CartItem) => void;
    handleQtyMinus: (item: CartItem) => void;
    onDeliveryCharge: (item: CartItem, id: number) => void;
    onRemoveCartItem: (id: number) => void;
}) {
    const [qty, setQty] = useState<number>(1);

    const cartItemPrice = useMemo(
        () => (item?.filterProduct ? item?.filterProduct?.unit_price * qty : 0),
        [item, qty],
    );

    /*
    const [deliveryCharge, setDeliveryCharge] = useState<Delivery | null>(null);
    const totalWeight = useMemo(
        () => (item?.filterProduct ? item.filterProduct.unit_weight * qty : 0),
        [item, qty],
    );
    
    const overWeight = useMemo(
        () => (totalWeight > 1 ? Math.floor(totalWeight) * 20 : 0),
        [totalWeight],
    );

    
    function handleDeliveryCharge(id) {
        const deliveryRecord = item?.filterProduct?.deliveries?.find(
            (delivery: Delivery) => delivery?.id === Number(id),
        ) as Delivery | undefined;
        setDeliveryCharge(deliveryRecord!);
    }

   const totalPrice = useMemo(
        () => cartItemPrice + (deliveryCharge?.delivery_charge ?? 0),
        [cartItemPrice, deliveryCharge],
    );

    const totalPc = useMemo(() => 100 * qty, [qty]);
    */

    useEffect(() => {
        setQty(item.qty);
    }, [item]);

    return (
        <tr>
            <td className="border border-gray-300">{product?.name}</td>
            <td className="border border-gray-300">
                {new Intl.NumberFormat('bn-BD', {
                    style: 'currency',
                    currency: 'BDT',
                }).format(Number(product?.unit_price))}
            </td>
            <td className="border border-gray-300">
                <span className="flex flex-row items-center justify-between gap-2">
                    <span
                        className="minus cursor-pointer"
                        onClick={() => handleQtyMinus(item)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-minus-icon lucide-minus"
                        >
                            <path d="M5 12h14" />
                        </svg>
                    </span>

                    <span className="h-10 w-15 rounded-lg border-2 border-gray-300 py-2 text-sm">
                        {item.qty}
                    </span>

                    <span
                        className="plus cursor-pointer"
                        onClick={() => handleQtyPlus(item)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-plus-icon lucide-plus"
                        >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                        </svg>
                    </span>
                </span>
            </td>
            <td className="border border-gray-300">
                {new Intl.NumberFormat('bn-BD', {}).format(
                    Number(item.totalPc),
                )}{' '}
                pc
            </td>
            <td className="border border-gray-300">
                {new Intl.NumberFormat('bn-BD', {}).format(
                    Number(product?.unit_weight),
                )}{' '}
                kg
            </td>
            <td className="border border-gray-300">
                {new Intl.NumberFormat('bn-BD', {}).format(
                    Number(item?.totalWeight),
                )}{' '}
                kg
            </td>
            <td className="border border-gray-300">
                {new Intl.NumberFormat('bn-BD', {
                    style: 'currency',
                    currency: 'BDT',
                }).format(Number(cartItemPrice))}{' '}
            </td>
            <td className="border border-gray-300">
                <select
                    name="delivery_charge"
                    defaultValue={
                        item.filterProduct.deliveries.find(
                            (delivery: Delivery) =>
                                delivery?.delivery_type === item.deliveryArea,
                        )?.id
                    }
                    onChange={(e) => onDeliveryCharge(item, e.target.value)}
                >
                    <option>Select delivery area</option>

                    {product?.deliveries.map((delivery: any) => (
                        <option value={delivery.id} key={delivery.id}>
                            {delivery.delivery_type}
                        </option>
                    ))}
                </select>
            </td>
            <td className="border border-gray-300">
                {new Intl.NumberFormat('bn-BD', {
                    style: 'currency',
                    currency: 'BDT',
                }).format(item?.totalPrice)}
            </td>
            <td className="flex items-center justify-center border">
                <div className="flex h-12 cursor-pointer">
                    <ConfirmDelete
                        onRemoveCartItem={onRemoveCartItem}
                        item={item}
                    />
                </div>
            </td>
        </tr>
    );
}
