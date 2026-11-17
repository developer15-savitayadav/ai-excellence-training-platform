import { Link } from '@inertiajs/react';
import ToastContainer from '../Components/ui/Toast';

function Logo({ light = false }) {
    return (
        <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <img
                src="/assets/images/logoExtra1.png"
                alt="AI Execellence Academy"
                className="h-[60px] w-[120px] transition-transform group-hover:scale-105"
            />
        </Link>
    );
}

export default function AuthLayout({ children }) {
    return (
<div className="min-h-screen bg-ink lg:h-screen lg:overflow-hidden">
    <div className="min-h-screen lg:grid lg:h-screen lg:grid-cols-2">
        {/* ═══════════════ LEFT — FORM PANEL ═══════════════ */}
        <div className="relative flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:h-screen lg:items-start lg:justify-center lg:overflow-y-auto lg:px-16 lg:py-6">
            <div className="mb-5 shrink-0 sm:mb-6">
                <Logo />
            </div>

            <div className="w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[420px]">
                {children}
            </div>
        </div>

        {/* ═══════════════ RIGHT — 4-CARD MASONRY COLLAGE (desktop only) ═══════════════ */}
        <div className="relative hidden h-screen items-center overflow-hidden bg-black/[0.02] px-10 lg:flex">
            <div className="grid w-full grid-cols-2 gap-5">
                <div className="flex flex-col gap-5">
                    <div className="relative overflow-hidden rounded-[28px] shadow-[0_20px_50px_-15px_rgba(15,22,22,0.18)]">
                        <img src="/assets/images/auth1.png" alt="" className="h-[300px] w-full object-cover transition-transform duration-500 hover:scale-105" />
                    </div>
                    <div className="relative overflow-hidden rounded-[28px] shadow-[0_20px_50px_-15px_rgba(15,22,22,0.18)]">
                        <img src="/assets/images/auth2.png" alt="" className="h-[260px] w-full object-cover transition-transform duration-500 hover:scale-105" />
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-5">
                    <div className="relative overflow-hidden rounded-[28px] shadow-[0_20px_50px_-15px_rgba(15,22,22,0.18)]">
                        <img src="/assets/images/auth3.png" alt="" className="h-[260px] w-full object-cover transition-transform duration-500 hover:scale-105" />
                    </div>
                    <div className="relative overflow-hidden rounded-[28px] shadow-[0_20px_50px_-15px_rgba(15,22,22,0.18)]">
                        <img src="/assets/images/auth4.png" alt="" className="h-[300px] w-full object-cover transition-transform duration-500 hover:scale-105" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <ToastContainer />
</div>
    );
}
