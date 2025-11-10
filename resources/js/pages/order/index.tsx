import Pagination from '@/components/order/pagination';
import Table from '@/components/order/table';
import { Order } from '@/interfaces/order/order';
import AppLayout from '@/layouts/app-layout';
import OrderLayout from '@/layouts/order/layout';
import { Head, usePage } from '@inertiajs/react';

export default function Index({ orders }: { orders: Order[] }) {
    const { flash } = usePage().props;

    return (
        <AppLayout>
            <OrderLayout>
                <Head title="Pending Order" />
                <div className="flex flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-gray-50 p-4 shadow-md shadow-neutral-300">
                    <div className="flex flex-1 flex-col gap-4 overflow-x-auto rounded-xl px-4">
                        {flash?.success && (
                            <span className="block text-center text-xl font-bold">
                                {flash?.success}
                            </span>
                        )}
                        <Table orders={orders} />
                    </div>
                </div>
                <div className="space-y-10">
                    <Pagination meta={orders} className="mt-4" />
                </div>
            </OrderLayout>
        </AppLayout>
    );
}
