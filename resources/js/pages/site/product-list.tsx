import { Product } from '@/interfaces/product/product';

export default function ProductList({
    product,
    showProduct,
}: {
    product: Product;
    showProduct: (id: number) => void;
}) {
    return (
        <div className="text-center shadow-md shadow-gray-300">
            <img src={`/storage/${product.product_image}`} />
            <div
                className="flex cursor-pointer flex-col gap-2 py-3 text-sm font-bold sm:p-5 sm:text-lg md:p-5 md:text-lg dark:text-gray-900"
                onClick={() => showProduct(product.id)}
            >
                <span>{product.name}</span>
                <span>
                    Min.Unit:{' '}
                    {Intl.NumberFormat('bn-BD', {}).format(
                        product.minimum_unit,
                    )}{' '}
                    pc
                </span>
                <span>
                    Price:{' '}
                    {new Intl.NumberFormat('bn-BD', {
                        style: 'currency',
                        currency: 'BDT',
                    }).format(product.unit_price)}{' '}
                </span>
            </div>
        </div>
    );
}
