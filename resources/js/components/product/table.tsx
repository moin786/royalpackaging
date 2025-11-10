import { Product } from '@/interfaces/product/product';
import TR from './tr';

export default function Table({ products }: { products: Product[] }) {
    return (
        <table className="border-spacing table-auto border border-gray-400 p-3">
            <thead>
                <tr>
                    <th className="border border-gray-300 p-3">ID</th>
                    <th className="border border-gray-300 p-3">Product Name</th>
                    <th className="border border-gray-300 p-3">Min.Unit(pc)</th>
                    <th className="border border-gray-300 p-3">
                        Unit Price(TK)
                    </th>
                    <th className="border border-gray-300 p-3">
                        Min.Weight(Gm)
                    </th>
                    <th className="border border-gray-300 p-3">Description</th>
                    <th className="border border-gray-300 p-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {products?.data?.map((product: Product) => (
                    <TR key={product.id} product={product} />
                ))}
            </tbody>
        </table>
    );
}
