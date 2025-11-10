import { useEffect, useState } from 'react';

export interface Product {
    id: number;
    name: string;
    description: string;
    minimum_unit: number;
    unit_price: string;
    unit_weight: number;
    product_image: string;
    [key: string]: any;
}

export interface CartItem {
    cartItemPrice?: number;
    deliveryCharge: number | null;
    deliveryArea?: string;
    filterProduct: Product;
    qty: number;
    totalPc: number;
    totalPrice: number;
    totalWeight: number;
}

const STORAGE_KEY = 'cartProducts';

export function useCart() {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    // 🔄 keep localStorage in sync
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    // ➕ Add new item to cart
    const addToCart = (newItem: CartItem) => {
        setCartItems((prev) => {
            const exists = prev.find(
                (item) => item.filterProduct.id === newItem.filterProduct.id,
            );

            if (exists) {
                // update quantity if already in cart
                return prev
                    .map((item) => {
                        if (
                            item.filterProduct.id === newItem.filterProduct.id
                        ) {
                            const updatedWeight =
                                item.totalWeight +
                                newItem.filterProduct.unit_weight * newItem.qty;

                            const basePrice =
                                (item.qty + newItem.qty) *
                                parseFloat(item.filterProduct.unit_price);

                            const extraCharge =
                                updatedWeight > 1
                                    ? Math.floor(updatedWeight) * 20
                                    : 0;
                            const deliveryCharge = item?.deliveryCharge ?? 0;

                            return {
                                ...item,
                                qty: item.qty + newItem.qty,
                                totalPc:
                                    item.totalPc +
                                    newItem.qty *
                                        newItem.filterProduct.minimum_unit,
                                totalWeight: updatedWeight,
                                totalPrice:
                                    basePrice + extraCharge + deliveryCharge,
                            };
                        }

                        return item;
                    })
                    .filter((item) => item.qty > 0);
            } else {
                return [
                    ...prev,
                    {
                        ...newItem,
                        totalPrice:
                            newItem.qty *
                            parseFloat(newItem.filterProduct.unit_price),
                        totalWeight:
                            newItem.filterProduct.unit_weight * newItem.qty,
                    },
                ].filter((item) => item.qty > 0);
            }
        });
    };

    // ➕ Add new item to cart
    const minusToCart = (newItem: CartItem) => {
        setCartItems((prev) => {
            const exists = prev.find(
                (item) => item.filterProduct.id === newItem.filterProduct.id,
            );
            if (exists) {
                // update quantity if already in cart
                return prev
                    .map((item) => {
                        if (
                            item.filterProduct.id === newItem.filterProduct.id
                        ) {
                            const updatedWeight =
                                item.totalWeight -
                                newItem.filterProduct.unit_weight * newItem.qty;

                            const basePrice =
                                (item.qty - newItem.qty) *
                                parseFloat(item.filterProduct.unit_price);

                            const extraCharge =
                                updatedWeight > 1
                                    ? Math.floor(updatedWeight) * 20
                                    : 0;

                            const deliveryCharge = item?.deliveryCharge ?? 0;

                            return {
                                ...item,
                                qty: item.qty - newItem.qty,
                                totalPc:
                                    item.totalPc -
                                    newItem.qty *
                                        newItem.filterProduct.minimum_unit,
                                totalWeight: updatedWeight,
                                totalPrice:
                                    basePrice + extraCharge + deliveryCharge,
                            };
                        }

                        return item;
                    })
                    .filter((item) => item.qty);
            } else {
                return [
                    ...prev,
                    {
                        ...newItem,
                        totalPrice:
                            newItem.qty *
                            parseFloat(newItem.filterProduct.unit_price),
                        totalWeight: newItem?.filterProduct
                            ? newItem.filterProduct.unit_weight * newItem.qty
                            : 0,
                    },
                ].filter((item) => item.qty > 0);
            }
        });
    };

    // ✏️ Update quantity
    const deliveryCharge = (
        productId: number,
        deliveryCharge: number,
        deliveryArea: string,
    ) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.filterProduct.id === productId
                        ? {
                              ...item,
                              deliveryCharge: deliveryCharge,
                              deliveryArea: deliveryArea,
                              totalPrice:
                                  item?.totalPrice +
                                  deliveryCharge -
                                  item?.deliveryCharge,
                          }
                        : item,
                )
                .filter((item) => item.qty > 0),
        );
    };

    // ✏️ Update quantity
    const updateQty = (productId: number, qty: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.filterProduct.id === productId
                    ? {
                          ...item,
                          qty,
                          totalPrice:
                              qty * parseFloat(item.filterProduct.unit_price),
                          totalWeight: item?.filterProduct
                              ? item.filterProduct.unit_weight * qty
                              : 0,
                      }
                    : item,
            ),
        );
    };

    // ❌ Remove item
    const removeFromCart = (productId: number) => {
        setCartItems((prev) =>
            prev.filter((item) => item.filterProduct.id !== productId),
        );
    };

    // 🗑️ Clear all
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    return {
        cartItems,
        addToCart,
        minusToCart,
        deliveryCharge,
        updateQty,
        removeFromCart,
        clearCart,
    };
}
