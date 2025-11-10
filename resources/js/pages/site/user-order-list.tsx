import Pagination from '@/components/order/pagination';
import UserOrderTable from '@/components/order/user-order-table';
import { Order } from '@/interfaces/order/order';
import FrontLayout from '@/layouts/front-layout';
import UserOrderLayout from '@/layouts/order/user-order-layout';
import TopLayout from '@/layouts/top-layout';
import { usePage } from '@inertiajs/react';
import Call from './call';
import LoginAndCart from './login-and-cart';
import SiteLogo from './site-logo';

export default function UserOrderList({ orders }: { orders: Order[] }) {
    const { flash } = usePage().props;

    return (
        <FrontLayout>
            <>
                <TopLayout>
                    <SiteLogo />
                    <Call />

                    <LoginAndCart />
                </TopLayout>

                <UserOrderLayout>
                    <div className="flex flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-gray-50 p-4 shadow-md shadow-neutral-300">
                        <div className="flex flex-1 flex-col gap-4 overflow-x-auto rounded-xl px-4">
                            {flash?.success && (
                                <span className="block text-center text-xl font-bold">
                                    {flash?.success}
                                </span>
                            )}
                            <UserOrderTable orders={orders} />
                        </div>
                    </div>
                    <div className="space-y-10">
                        <Pagination meta={orders} className="mt-4" />
                    </div>
                </UserOrderLayout>
            </>
        </FrontLayout>
    );
}
