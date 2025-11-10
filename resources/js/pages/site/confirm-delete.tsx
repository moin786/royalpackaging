import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { CartItem } from '@/hooks/use-cart';
import { DialogDescription } from '@radix-ui/react-dialog';

export default function ConfirmDelete({
    item,
    onRemoveCartItem,
}: {
    item: CartItem;
    onRemoveCartItem: (id: number) => void;
}) {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <div className="flex flex-row p-1">
                        <span>
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
                                className="lucide lucide-trash2-icon lucide-trash-2 mt-4"
                            >
                                <path d="M10 11v6" />
                                <path d="M14 11v6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                <path d="M3 6h18" />
                                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                        </span>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Delete Item</DialogTitle>

                    <DialogDescription>
                        Are you sure want to delete the record?
                    </DialogDescription>

                    <div className="mt-4 flex flex-row items-center gap-5">
                        <DialogClose asChild>
                            <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
                                <div>Cancel</div>
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                onClick={() => {
                                    onRemoveCartItem(item?.filterProduct?.id);
                                }}
                                className="inline-flex items-center gap-2 rounded-md bg-red-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                            >
                                <div>Delete</div>
                            </Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
