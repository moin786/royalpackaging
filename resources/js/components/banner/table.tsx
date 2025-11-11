import { Banner } from '@/interfaces/banner/banner';
import TR from './tr';

export default function Table({ banners }: { banners: Banner[] }) {
    return (
        <table className="border-spacing table-auto border border-gray-400 p-3">
            <thead>
                <tr>
                    <th className="border border-gray-300 p-3">ID</th>
                    <th className="border border-gray-300 p-3">Image</th>
                    <th className="border border-gray-300 p-3">Title</th>
                    <th className="border border-gray-300 p-3">Description</th>
                    <th className="border border-gray-300 p-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {banners?.data?.map((banner: Banner) => (
                    <TR key={banner.id} banner={banner} />
                ))}
            </tbody>
        </table>
    );
}
