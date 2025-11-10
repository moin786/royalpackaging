export default function Call() {
    return (
        <div className="flex items-center">
            <span className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between md:flex-row md:justify-between">
                <span className="hidden flex-row items-center gap-3 text-sm sm:flex sm:gap-3 md:flex md:gap-3">
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
                        className="lucide lucide-phone-call-icon lucide-phone-call"
                    >
                        <path d="M13 2a9 9 0 0 1 9 9" />
                        <path d="M13 6a5 5 0 0 1 5 5" />
                        <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                    </svg>
                    <span className="text-sm">01979467300</span>
                </span>
                <span className="mx-7 text-sm">
                    <span className="flex w-5 flex-col items-center justify-center sm:flex-row sm:justify-between md:flex-row md:justify-between">
                        <img
                            src="/storage/images/site_banners/whatsapp_icon.png"
                            className="mx-w-full"
                        />
                        <a
                            href="https://wa.me/8801979467300?call"
                            target="_blank"
                            title="Call on WhatsApp"
                        >
                            +8801979467300
                        </a>
                    </span>
                </span>
            </span>
        </div>
    );
}
