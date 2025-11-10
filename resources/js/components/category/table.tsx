import { Category } from '@/interfaces/category/category';
import TR from './tr';

export default function Table({ categories }: { categories: Category[] }) {
    return (
        <table className="border-spacing table-auto border border-gray-400 p-3">
            <thead>
                <tr>
                    <th className="border border-gray-300 p-3">ID</th>
                    <th className="border border-gray-300 p-3">
                        Category Name
                    </th>
                    <th className="border border-gray-300 p-3">Description</th>
                    <th className="border border-gray-300 p-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {categories?.data?.map((category: Category) => (
                    <TR key={category.id} category={category} />
                ))}
            </tbody>
        </table>
    );
}
