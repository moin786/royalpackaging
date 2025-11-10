import { Category } from '@/interfaces/category/category';

export default function CategoryList({
    category,
    handleProduct,
}: {
    category: Category;
    handleProduct: () => void;
}) {
    return (
        <div
            className="flex w-full cursor-pointer flex-row items-center gap-4 border border-gray-300 text-left shadow-md shadow-gray-300"
            onClick={() => handleProduct()}
        >
            <img
                src={`/storage/${category.category_image}`}
                className="h-20 w-20"
            />
            <span className="text-sm font-bold sm:text-lg md:text-lg">
                {category.name}
            </span>
        </div>
    );
}
