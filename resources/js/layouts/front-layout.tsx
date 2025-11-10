import SiteBanner from '@/pages/site/site-banner';
import { ReactNode } from 'react';

export default function FrontLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="container mx-auto min-h-screen bg-gray-50 shadow-lg shadow-gray-700">
                <SiteBanner />
                {children}
            </div>
            <footer className="bottom-0 container mx-auto flex h-20 w-full items-center justify-center bg-gray-900">
                <div className="mx-auto text-center text-white">
                    Design & Developed By iHERTZ Technology
                </div>
            </footer>
        </>
    );
}
