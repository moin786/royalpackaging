import { Banner } from '@/interfaces/banner/banner';

export default function SiteBanner({ banner }: { banner: Banner }) {
    return (
        <div className="site-banner mt-20">
            <img src={`/storage/${banner?.banner_image}`} />
        </div>
    );
}
