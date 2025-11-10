import { CartItem, useCart } from '@/hooks/use-cart';
import { Category } from '@/interfaces/category/category';
import { Delivery } from '@/interfaces/delivery/delivery';
import { Product } from '@/interfaces/product/product';
import FrontLayout from '@/layouts/front-layout';
import TopLayout from '@/layouts/top-layout';
import { Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import Call from './call';
import CategoryList from './category';
import LoginAndCart from './login-and-cart';
import ProductDetails from './product-details';
import ProductList from './product-list';
import SiteLogo from './site-logo';

export default function Index({
    categories,
    products,
}: {
    categories: Category[];
    products: Product[];
}) {
    const {
        cartItems,
        addToCart,
        minusToCart,
        deliveryCharge,
        updateQty,
        removeFromCart,
        clearCart,
    } = useCart();

    function showProduct(id: number) {
        const product = products?.find(
            (prod: Product) => prod.id === id,
        ) as Product;

        const findProduct = {
            ...product,
        };

        addToCart({
            deliveryCharge: 0,
            deliveryArea: '',
            filterProduct: findProduct,
            qty: 1,
            totalPc: findProduct?.minimum_unit,
            totalPrice: Number(findProduct?.unit_price),
            totalWeight: findProduct?.unit_weight,
        });

        toggleShowOnProductClick();
    }
    function handleProduct() {
        toggleShow();
    }

    function handleCartItem() {
        toggleShowOnProductClick();
    }

    const handleQtyPlus = (item: CartItem) => {
        const findProduct = {
            ...item?.filterProduct,
        };

        addToCart({
            deliveryCharge: 0,
            deliveryArea: '',
            filterProduct: findProduct,
            qty: 1,
            totalPc: findProduct?.minimum_unit,
            totalPrice: Number(findProduct?.unit_price),
            totalWeight: findProduct?.unit_weight,
        });
    };

    const handleQtyMinus = (item: CartItem) => {
        const findProduct = {
            ...item?.filterProduct,
        };

        minusToCart({
            deliveryCharge: 0,
            deliveryArea: '',
            filterProduct: findProduct,
            qty: 1,
            totalPc: findProduct?.minimum_unit,
            totalPrice: Number(findProduct?.unit_price),
            totalWeight: findProduct?.unit_weight,
        });
    };

    function handleDeliveryCharge(item: CartItem, id: number) {
        const deliveryRecord = item?.filterProduct?.deliveries?.find(
            (delivery: Delivery) => delivery?.id === Number(id),
        ) as Delivery | undefined;

        const findProduct = {
            ...item?.filterProduct,
        };

        deliveryCharge(
            findProduct.id,
            deliveryRecord?.delivery_charge,
            deliveryRecord?.delivery_type,
        );
    }

    function handleRemoveFromCart(productid: number) {
        removeFromCart(productid);
    }

    // 1️⃣ Initialize from localStorage
    const [isShow, setIsShow] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false; // SSR safety
        const stored = localStorage.getItem('isShow');
        return stored ? JSON.parse(stored) : false;
    });

    // 2️⃣ Persist to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('isShow', JSON.stringify(isShow));
    }, [isShow]);

    // 1️⃣ Initialize from localStorage
    const [topen, setTopen] = useState<boolean>(() => {
        if (typeof window === 'undefined') return true; // SSR safety
        const stored = localStorage.getItem('topen');
        return stored ? JSON.parse(stored) : false;
    });

    // 2️⃣ Persist to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('topen', JSON.stringify(topen));
    }, [topen]);

    // 3️⃣ Toggle visibility
    function toggleShow() {
        setIsShow((prev) => !prev);
        setTopen(false);
    }

    function toggleShowOnProductClick() {
        setIsShow((prev) => !prev);
        setTopen(true);
    }

    return (
        <FrontLayout>
            <>
                <TopLayout>
                    <SiteLogo handleProduct={handleProduct} />
                    <Call />

                    <LoginAndCart handleOnProductClick={handleCartItem} />
                </TopLayout>
                <div className="bg-gray-50 p-4">
                    {categories && (
                        <div className="flex flex-col justify-start gap-2 sm:flex-row sm:gap-4 md:flex-row md:gap-4">
                            {categories.map((category) => (
                                <CategoryList
                                    category={category}
                                    handleProduct={handleProduct}
                                    key={category.id}
                                />
                            ))}
                        </div>
                    )}
                    <div className="mt-5 w-full">
                        <div className="my-10 border-b border-b-gray-300 pb-3 text-center text-lg font-bold">
                            Non Printed Poly
                        </div>

                        <Transition show={topen}>
                            <div className="transition duration-200 ease-in data-closed:opacity-0">
                                <ProductDetails
                                    cartItems={cartItems!}
                                    handleQtyPlus={handleQtyPlus}
                                    handleQtyMinus={handleQtyMinus}
                                    onDeliveryCharge={handleDeliveryCharge}
                                    onRemoveCartItem={handleRemoveFromCart}
                                />
                            </div>
                        </Transition>
                        {!topen && (
                            <div className="grid grid-cols-2 gap-5 px-5 sm:grid-cols-2 sm:gap-5 sm:px-20 md:grid-cols-3 md:gap-5 md:px-20 lg:grid-cols-4">
                                {products &&
                                    products.map((product) => (
                                        <ProductList
                                            key={product.id}
                                            product={product}
                                            showProduct={showProduct}
                                        />
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </>
        </FrontLayout>
    );
}
