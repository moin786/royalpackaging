import { Product } from '@/interfaces/product/product';
import { Link } from '@inertiajs/react';
import { Button } from '../ui/button';

type Props = {
    current_page: number;
    data: Product[];
    last_page: number;
    links: { url: string | null; label: string; active: boolean }[];
};

export default function Pagination({ meta }: { meta: Props | undefined }) {
    const prev =
        meta?.links?.find(
            (l) => l.label === '&laquo; Previous' || l.label === '&laquo;',
        )?.url ?? null;
    const next =
        meta?.links?.find(
            (l) => l.label === 'Next &raquo;' || l.label === '&raquo;',
        )?.url ?? null;
    return (
        <div className="flex flex-row items-center justify-between">
            <div>
                {prev && (
                    <Button variant="ghost" asChild>
                        <Link href={prev} preserveScroll>
                            Previous
                        </Link>
                    </Button>
                )}
            </div>

            <p className="text-sm font-medium">
                Page {meta?.current_page} of {meta?.last_page}
            </p>

            <div>
                {next && (
                    <Button variant="ghost" asChild>
                        <Link href={next} preserveScroll>
                            Next
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    );
}
