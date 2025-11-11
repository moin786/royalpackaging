import { Banner } from '@/interfaces/banner/banner';
import SiteBanner from '@/pages/site/site-banner';
import { ReactNode } from 'react';

export default function FrontLayout({
    banner,
    children,
}: {
    banner: Banner;
    children: ReactNode;
}) {
    return (
        <>
            <div className="container mx-auto min-h-screen bg-gray-50 shadow-lg shadow-gray-700">
                <SiteBanner banner={banner} />
                {children}
            </div>
            <footer className="bottom-0 container mx-auto flex h-20 w-full items-center justify-center bg-gray-900">
                <div className="mx-auto text-center text-white">
                    Design & Developed By{' '}
                    <a href="https://ihertztech.com">iHERTZ Technology</a>
                </div>
            </footer>
        </>
    );
}
