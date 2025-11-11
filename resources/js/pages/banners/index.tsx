import Pagination from '@/components/banner/pagination';
import Table from '@/components/banner/table';
import { Banner } from '@/interfaces/banner/banner';
import AppLayout from '@/layouts/app-layout';
import BannerLayout from '@/layouts/banner/layout';
import { Head } from '@inertiajs/react';

export default function Index({ banners }: { banners: Banner[] }) {
    return (
        <AppLayout>
            <BannerLayout>
                <Head title="Categories" />
                <div className="mb-4 rounded-md bg-gray-50 p-4 shadow-lg shadow-neutral-300">
                    <div className="flex flex-1 flex-col gap-4 overflow-x-auto rounded-xl px-4">
                        <Table banners={banners} />
                    </div>
                </div>
                <div className="space-y-10">
                    <Pagination meta={banners} className="mt-4" />
                </div>
            </BannerLayout>
        </AppLayout>
    );
}
