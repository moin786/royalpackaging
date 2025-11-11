import { router, usePage } from '@inertiajs/react';

export default function SiteLogo({
    handleProduct,
}: {
    handleProduct?: () => void;
}) {
    const { flash } = usePage().props;

    const handleClick = () => {
        if (handleProduct) {
            handleProduct();
        } else {
            router.get('/');
        }
    };

    return (
        <div
            className="w-15 cursor-pointer sm:w-20 md:w-20"
            onClick={() => handleClick()}
        >
            <img src={`/storage/${flash?.site_logo}`} className="max-w-full" />
        </div>
    );
}
