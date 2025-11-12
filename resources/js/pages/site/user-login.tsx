import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { clientLogin } from '@/routes';
import { Form } from '@inertiajs/react';
import { ReactNode, useState } from 'react';
export default function CustomerLogin({ children }: { children?: ReactNode }) {
    const [isShowRegistration, setIsShowRegistration] =
        useState<boolean>(false);

    const handleRegistration = () => {
        setIsShowRegistration(true);
    };

    const handleLogin = () => {
        setIsShowRegistration(false);
    };

    const handleLoginByPin = () => {
        setIsShowRegistration(false);
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="flex flex-row p-1 dark:text-gray-900">
                        <span>
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
                                className="lucide lucide-user-lock-icon lucide-user-lock"
                            >
                                <circle cx="10" cy="7" r="4" />
                                <path d="M10.3 15H7a4 4 0 0 0-4 4v2" />
                                <path d="M15 15.5V14a2 2 0 0 1 4 0v1.5" />
                                <rect
                                    width="8"
                                    height="5"
                                    x="13"
                                    y="16"
                                    rx=".899"
                                />
                            </svg>
                        </span>
                        {children}
                    </div>
                </DialogTrigger>
                <DialogContent>
                    {!isShowRegistration ? (
                        <DialogTitle>Customer Login</DialogTitle>
                    ) : (
                        <DialogTitle>Generate OTP</DialogTitle>
                    )}
                    <DialogDescription>
                        Once you are registed, you are able to purchase our
                        services.
                    </DialogDescription>

                    <>
                        {!isShowRegistration ? (
                            <Form
                                {...clientLogin.form()}
                                resetOnSuccess={['mobile']}
                                disableWhileProcessing
                            >
                                {({ processing }) => (
                                    <div>
                                        <div className="mt-2 text-sm/6 text-gray-900">
                                            <Input
                                                name="mobile"
                                                autoComplete="off"
                                                className="border border-gray-700 focus:border-gray-700 dark:text-white"
                                                placeholder="Enter your mobile no."
                                            />
                                        </div>
                                        <div className="mt-2 text-sm/6 text-gray-900">
                                            <Input
                                                name="password"
                                                type="password"
                                                autoComplete="off"
                                                className="border border-gray-700 focus:border-gray-700 dark:text-white"
                                                placeholder="Enter your password"
                                            />
                                        </div>
                                        <div className="mt-4 flex flex-row items-center gap-5">
                                            <>
                                                <DialogClose asChild>
                                                    <Button
                                                        disabled={processing}
                                                        type="submit"
                                                        onClick={() => {
                                                            handleLoginByPin();
                                                        }}
                                                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                                    >
                                                        <div>Login</div>
                                                    </Button>
                                                </DialogClose>

                                                <span
                                                    className="cursor-pointer font-bold"
                                                    onClick={handleRegistration}
                                                >
                                                    Request for OTP
                                                </span>
                                            </>
                                        </div>
                                    </div>
                                )}
                            </Form>
                        ) : (
                            <Form
                                {...clientLogin.form()}
                                resetOnSuccess={['mobile']}
                                disableWhileProcessing
                            >
                                {({ processing }) => (
                                    <div>
                                        <div className="mt-2 text-sm/6 text-gray-900">
                                            <Input
                                                name="mobile"
                                                autoComplete="off"
                                                className="border border-gray-700 focus:border-gray-700 dark:text-white"
                                                placeholder="Enter your mobile no."
                                            />
                                        </div>

                                        <div className="mt-4 flex flex-row items-center gap-5">
                                            <>
                                                <DialogClose asChild>
                                                    <Button
                                                        disabled={processing}
                                                        type="submit"
                                                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                                    >
                                                        <div>Send OTP</div>
                                                    </Button>
                                                </DialogClose>
                                                <span
                                                    className="cursor-pointer font-bold"
                                                    onClick={() =>
                                                        handleLogin()
                                                    }
                                                >
                                                    Have an OTP?
                                                </span>
                                            </>
                                        </div>
                                    </div>
                                )}
                            </Form>
                        )}
                    </>
                </DialogContent>
            </Dialog>
        </div>
    );
}
