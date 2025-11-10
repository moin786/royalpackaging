import { Order } from '@/interfaces/order/order';
import DeleteOrder from './delete-order';
import ViewOrder from './view-order';

export default function TR({ order }: { order: Order }) {
    return (
        <tr key={order.id}>
            <td className="border border-gray-300 p-3">{order.id}</td>
            <td className="border border-gray-300 p-3">{order.order_id}</td>
            <td className="border border-gray-300 p-3">{order.order_date}</td>
            <td className="border border-gray-300 p-3">
                {order.customer_mobile}
            </td>
            <td className="border border-gray-300 p-3">{order.order_amount}</td>
            <td className="border border-gray-300 p-3">{order.status}</td>
            <td className="border border-gray-300 p-3">
                <div className="flex gap-4">
                    <ViewOrder order={order} />
                    <DeleteOrder order={order} />
                </div>
            </td>
        </tr>
    );
}
