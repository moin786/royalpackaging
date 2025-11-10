import { Delivery } from '@/interfaces/delivery/delivery';
import TR from './tr';

export default function Table({ deliveries }: { deliveries: Delivery[] }) {
    return (
        <table className="border-spacing table-auto border border-gray-400 p-3">
            <thead>
                <tr>
                    <th className="border border-gray-300 p-3">ID</th>
                    <th className="border border-gray-300 p-3">Product Name</th>
                    <th className="border border-gray-300 p-3">
                        Delivery Type
                    </th>
                    <th className="border border-gray-300 p-3">
                        Delivery Charge (gm)
                    </th>
                    <th className="border border-gray-300 p-3">
                        Over Weight Charge (over 1 kg)
                    </th>
                    <th className="border border-gray-300 p-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {deliveries?.data?.map((delivery: Delivery) => (
                    <TR key={delivery.id} delivery={delivery} />
                ))}
            </tbody>
        </table>
    );
}
