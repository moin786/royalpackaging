import Pagination from '@/components/category/pagination';
import Table from '@/components/category/table';
import { Category } from '@/interfaces/category/category';
import AppLayout from '@/layouts/app-layout';
import CategoryLayout from '@/layouts/category/layout';
import { Head } from '@inertiajs/react';

export default function Index({ categories }: { categories: Category[] }) {
    return (
        <AppLayout>
            <CategoryLayout>
                <Head title="Categories" />
                <div className="mb-4 rounded-md bg-gray-50 p-4 shadow-lg shadow-neutral-300">
                    <div className="flex flex-1 flex-col gap-4 overflow-x-auto rounded-xl px-4">
                        <Table categories={categories} />
                    </div>
                </div>
                <div className="space-y-10">
                    <Pagination meta={categories} className="mt-4" />
                </div>
            </CategoryLayout>
        </AppLayout>
    );
}
