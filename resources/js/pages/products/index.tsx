import Pagination from '@/components/product/pagination';
import Table from '@/components/product/table';
import { Product } from '@/interfaces/product/product';
import AppLayout from '@/layouts/app-layout';
import ProductLayout from '@/layouts/product/layout';
import { Head } from '@inertiajs/react';

export default function Index({ products }: { products: Product[] }) {
    return (
        <AppLayout>
            <ProductLayout>
                <Head title="Products list" />

                <div className="flex flex-1 flex-col gap-4 overflow-x-auto rounded-xl bg-gray-50 p-4 shadow-md shadow-neutral-300">
                    <Table products={products} />
                </div>
                <div className="space-y-10">
                    <Pagination meta={products} className="mt-4" />
                </div>
            </ProductLayout>
        </AppLayout>
    );
}
