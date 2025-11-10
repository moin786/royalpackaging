import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';

export default function TopLayout({ children }: { children: ReactNode }) {
    return (
        <div className="w-full">
            <Head title="Non printed poly details" />
            <div className="site-top fixed top-0 container mx-auto flex w-full border-b border-b-gray-300 bg-gray-100">
                <div className="container mx-auto flex justify-between gap-5">
                    {children}
                </div>
            </div>
        </div>
    );
}
