import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Order } from '@/interfaces/order/order';
import { OrderDetails } from '@/interfaces/order/order-details';
import { usePage } from '@inertiajs/react';

export default function UserOrderView({ order }: { order: Order }) {
    const { flash } = usePage().props;

    return (
        <div className="space-y-6">
            <div className="space-y-2 rounded-lg border border-red-100 bg-white p-2">
                <Dialog>
                    <DialogTrigger asChild>
                        {/* <Button
                            variant="destructive"
                            data-test="delete-user-button"
                        >
                            Delete account
                        </Button> */}
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
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] sm:max-w-3xl md:max-w-5xl lg:max-w-[1000px]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl">
                                Order Details
                            </DialogTitle>
                            <DialogDescription>
                                <div className="mt-5 flex flex-row items-start justify-start gap-5">
                                    <span className="flex flex-col gap-5 text-xl font-bold">
                                        <span className="flex flex-row gap-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                className="lucide lucide-handbag-icon lucide-handbag"
                                            >
                                                <path d="M2.048 18.566A2 2 0 0 0 4 21h16a2 2 0 0 0 1.952-2.434l-2-9A2 2 0 0 0 18 8H6a2 2 0 0 0-1.952 1.566z" />
                                                <path d="M8 11V6a4 4 0 0 1 8 0v5" />
                                            </svg>
                                            {order?.customer_mobile}
                                        </span>
                                        <span className="flex flex-col gap-2">
                                            <span className="text-xl font-bold">
                                                Order No. {order.order_id}
                                            </span>
                                            <span className="text-xl font-bold">
                                                Order Amount.{' '}
                                                {new Intl.NumberFormat(
                                                    'en-BD',
                                                    {
                                                        style: 'currency',
                                                        currency: 'BDT',
                                                    },
                                                ).format(
                                                    Number(order?.order_amount),
                                                )}
                                            </span>

                                            <span className="text-xl font-bold">
                                                Order Date. {order?.order_date}
                                            </span>
                                        </span>
                                    </span>

                                    <span>
                                        {flash?.success && (
                                            <span className="text-xl font-bold">
                                                {flash?.success}
                                            </span>
                                        )}
                                        <span className="flex flex-row items-center gap-5 text-xl font-bold text-gray-800">
                                            <span className="text-xl font-bold text-gray-800">
                                                Update Status:
                                            </span>{' '}
                                            {order
                                                ?.status!.split(' ')
                                                .map(
                                                    (w) =>
                                                        w
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        w.slice(1),
                                                )
                                                .join(' ')}
                                        </span>
                                    </span>
                                </div>
                                <div className="mt-10 h-full overflow-y-auto">
                                    <table className="border-spacing w-full table-auto border border-gray-400 bg-gray-200 p-3">
                                        <thead>
                                            <tr>
                                                <th className="text-md border border-gray-300 p-3">
                                                    ID
                                                </th>
                                                <th className="text-md border border-gray-300 p-3">
                                                    Delivery Area
                                                </th>
                                                <th className="text-md border border-gray-300 p-3">
                                                    Delivery Charge
                                                </th>
                                                <th className="text-md border border-gray-300 p-3">
                                                    Product
                                                </th>
                                                <th className="text-md border border-gray-300 p-3">
                                                    Minimum Unit
                                                </th>
                                                <th className="text-md border border-gray-300 p-3">
                                                    Unit Price
                                                </th>
                                                <th className="text-md border border-gray-300 p-3">
                                                    Unit Weight
                                                </th>
                                                <th className="text-md border border-gray-300 p-3">
                                                    Qty.
                                                </th>
                                                <th className="text-md border border-gray-300 p-3">
                                                    Total Pc
                                                </th>
                                                <th className="text-md border border-gray-300 p-3">
                                                    Total Price
                                                </th>
                                                <th className="text-md border border-gray-300 p-3">
                                                    Total Weight
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order?.items?.map(
                                                (item: OrderDetails) => (
                                                    <tr key={item.id}>
                                                        <td className="text-md border border-gray-300 p-3">
                                                            {item.id}
                                                        </td>
                                                        <td className="text-md border border-gray-300 p-3">
                                                            {item.delivery_area}
                                                        </td>
                                                        <td className="text-md border border-gray-300 p-3">
                                                            {
                                                                item.delivery_charge
                                                            }
                                                        </td>
                                                        <td className="text-md border border-gray-300 p-3">
                                                            {item.product.name}
                                                        </td>
                                                        <td className="text-md border border-gray-300 p-3">
                                                            {item.minimum_unit}
                                                        </td>
                                                        <td className="text-md border border-gray-300 p-3">
                                                            {item.unit_price}
                                                        </td>
                                                        <td className="text-md border border-gray-300 p-3">
                                                            {item.unit_weight}
                                                        </td>
                                                        <td className="text-md border border-gray-300 p-3">
                                                            {item.qty}
                                                        </td>
                                                        <td className="text-md border border-gray-300 p-3">
                                                            {item.total_pc}
                                                        </td>
                                                        <td className="text-md border border-gray-300 p-3">
                                                            {item.total_price}
                                                        </td>
                                                        <td className="text-md border border-gray-300 p-3">
                                                            {item.total_weight}
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
