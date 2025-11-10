import { Order } from '@/interfaces/order/order';
import TR from './tr';

export default function Table({ orders }: { orders: Order[] }) {
    return (
        <table className="border-spacing table-auto border border-gray-400 p-3">
            <thead>
                <tr>
                    <th className="border border-gray-300 p-3">ID</th>
                    <th className="border border-gray-300 p-3">Order Id</th>
                    <th className="border border-gray-300 p-3">Order Date</th>
                    <th className="border border-gray-300 p-3">
                        Customer Mobile
                    </th>
                    <th className="border border-gray-300 p-3">Amount</th>
                    <th className="border border-gray-300 p-3">Status</th>
                    <th className="border border-gray-300 p-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {orders?.data?.map((order: Order) => (
                    <TR key={order.id} order={order} />
                ))}
            </tbody>
        </table>
    );
}
