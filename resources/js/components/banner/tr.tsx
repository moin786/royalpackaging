import { Banner } from '@/interfaces/banner/banner';
import { Link } from '@inertiajs/react';
import DeleteBanner from './delete-banner';

export default function TR({ banner }: { banner: Banner }) {
    return (
        <tr key={banner.id}>
            <td className="border border-gray-300 p-3">{banner.id}</td>
            <td className="border border-gray-300 p-3">
                <img
                    src={`/storage/${banner.banner_image}`}
                    className="h-16 w-36"
                />
            </td>
            <td className="border border-gray-300 p-3">
                {banner.banner_title}
            </td>
            <td className="border border-gray-300 p-3">
                {banner.banner_description}
            </td>
            <td className="border border-gray-300 p-3">
                <div className="flex gap-4">
                    <Link
                        href={`/categories/${banner.id}/edit`}
                        className="space-y-2 rounded-lg border border-red-100 bg-red-50 p-2 dark:border-red-200/10 dark:bg-red-700/10"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-pencil-icon lucide-pencil"
                        >
                            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                            <path d="m15 5 4 4" />
                        </svg>
                    </Link>

                    <DeleteBanner banner={banner} />
                </div>
            </td>
        </tr>
    );
}
