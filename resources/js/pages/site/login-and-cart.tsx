import { Button } from '@/components/ui/button';
import { clientLogout, userOrderList } from '@/routes';
import { Form, Link, router, usePage } from '@inertiajs/react';
import CustomerLogin from './user-login';
export default function LoginAndCart({
    handleOnProductClick,
}: {
    handleOnProductClick?: () => void;
}) {
    const handleClick = () => {
        router.get('/');
        handleOnProductClick!();
    };

    const { flash } = usePage().props;

    return (
        <div className="flex flex-row items-center justify-between gap-3 px-5 dark:text-gray-900">
            <span
                onClick={() => handleClick()}
                className="cursor-pointer dark:text-gray-900"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-shopping-cart-icon lucide-shopping-cart"
                >
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
            </span>
            {flash?.is_login ? (
                <span>
                    <div className="flex flex-row gap-5">
                        <Button>
                            <Link href={userOrderList.url('pending')}>
                                <span className="dark:text-gray-900">
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
                                        className="lucide lucide-book-open-check-icon lucide-book-open-check"
                                    >
                                        <path d="M12 21V7" />
                                        <path d="m16 12 2 2 4-4" />
                                        <path d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3" />
                                    </svg>
                                </span>
                            </Link>
                        </Button>
                        <Form {...clientLogout.form()} disableWhileProcessing>
                            <Button>
                                <span className="dark:text-gray-900">
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
                                        className="lucide lucide-user-round-check-icon lucide-user-round-check"
                                    >
                                        <path d="M2 21a8 8 0 0 1 13.292-6" />
                                        <circle cx="10" cy="8" r="5" />
                                        <path d="m16 19 2 2 4-4" />
                                    </svg>
                                </span>
                            </Button>
                        </Form>
                    </div>
                </span>
            ) : (
                <CustomerLogin />
            )}
        </div>
    );
}
