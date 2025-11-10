export default function ProductGrid({ products, showProduct }) {
    return (
        <tr>
            <td className="border border-gray-300">{filterProduct?.name}</td>
            <td className="border border-gray-300">
                {new Intl.NumberFormat('bn-BD', {
                    style: 'currency',
                    currency: 'BDT',
                }).format(Number(filterProduct?.unit_price))}
            </td>
            <td className="border border-gray-300">
                <Input
                    name="qty"
                    className="mx-auto w-20"
                    type="number"
                    defaultValue={1}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setQty(Number(e.target?.value))
                    }
                />
            </td>
            <td className="border border-gray-300">
                {new Intl.NumberFormat('bn-BD', {}).format(Number(totalPc))} pc
            </td>
            <td className="border border-gray-300">
                {new Intl.NumberFormat('bn-BD', {}).format(
                    Number(filterProduct?.unit_weight),
                )}{' '}
                kg
            </td>
            <td className="border border-gray-300">
                {new Intl.NumberFormat('bn-BD', {}).format(Number(totalWeight))}{' '}
                kg
            </td>
            <td className="border border-gray-300">
                {new Intl.NumberFormat('bn-BD', {
                    style: 'currency',
                    currency: 'BDT',
                }).format(Number(cartItemPrice))}{' '}
            </td>
            <td className="border border-gray-300">
                <select
                    name="delivery_charge"
                    onChange={(e) => handleDeliveryCharge(e.target.value)}
                >
                    <option>Select delivery area</option>
                    {filterProduct?.deliveries.map((delivery: any) => (
                        <option value={delivery.id} key={delivery.id}>
                            {delivery.delivery_type}
                        </option>
                    ))}
                </select>
            </td>
            <td className="border border-gray-300">
                {new Intl.NumberFormat('bn-BD', {
                    style: 'currency',
                    currency: 'BDT',
                }).format(totalPrice)}
            </td>
        </tr>
    );
}
