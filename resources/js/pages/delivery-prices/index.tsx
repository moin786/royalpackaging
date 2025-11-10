import Pagination from '@/components/delivery/pagination';
import Table from '@/components/delivery/table';
import { Delivery } from '@/interfaces/delivery/delivery';
import AppLayout from '@/layouts/app-layout';
import ProductLayout from '@/layouts/delivery/layout';
import { Head } from '@inertiajs/react';

export default function Index({ deliveries }: { deliveries: Delivery[] }) {
    return (
        <AppLayout>
            <ProductLayout>
                <Head title="Delivery prices" />

                <div className="flex flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-gray-50 p-4 shadow-md shadow-neutral-300">
                    <Table deliveries={deliveries} />
                </div>
                <div className="space-y-10">
                    <Pagination meta={deliveries} className="mt-4" />
                </div>
            </ProductLayout>
        </AppLayout>
    );
}
