import { Link } from '@inertiajs/react';
import ToastContainer from '../Components/ui/Toast';

function Logo({ light = false }) {
    return (
        <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <img
                src="/assets/images/logoExtra1.png"
                alt="AI Excellence Academy"
                className="h-[60px] w-[120px] transition-transform group-hover:scale-105"
            />
        </Link>
    );
}

export default function AuthLayout({ children }) {
    return (
        <div className="h-screen overflow-hidden bg-ink">
            <div className="h-screen lg:grid lg:grid-cols-2">
                {/* ═══════════════ LEFT — FORM PANEL ═══════════════ */}
                <div className="relative flex h-screen flex-col overflow-y-auto lg:items-start lg:justify-center px-6 py-5 sm:px-10 lg:px-16 lg:py-6">
                    {/* Mobile top banner (only shows collage image 1, keeps it light) */}
                    <div className="relative lg:hidden mb-4 -mx-6 -mt-5 sm:-mx-10 sm:-mt-5 h-20 shrink-0 overflow-hidden">
                        <img
                            src="/assets/images/data-science.jpg"
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="mb-6 shrink-0">
                        <Logo />
                    </div>

                    <div className="w-full max-w-[420px]">
                        {children}
                    </div>
                </div>

                {/* ═══════════════ RIGHT — 4-CARD MASONRY COLLAGE ═══════════════ */}
                <div className="relative hidden lg:flex h-screen items-center overflow-hidden bg-black/[0.02] px-10">
                    <div className="grid w-full grid-cols-2 gap-5">
                        {/* Column 1 — no offset */}
                        <div className="flex flex-col gap-5">
                            <div className="relative overflow-hidden rounded-[28px] shadow-[0_20px_50px_-15px_rgba(15,22,22,0.18)]">
                                <img
                                    src="/assets/images/auth1.png"
                                    alt=""
                                    className="h-[300px] w-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <div className="relative overflow-hidden rounded-[28px] shadow-[0_20px_50px_-15px_rgba(15,22,22,0.18)]">
                                <img
                                    src="/assets/images/auth2.png"
                                    alt=""
                                    className="h-[260px] w-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Column 2 — offset downward for staggered/masonry effect */}
                        <div className="mt-12 flex flex-col gap-5">
                            <div className="relative overflow-hidden rounded-[28px] shadow-[0_20px_50px_-15px_rgba(15,22,22,0.18)]">
                                <img
                                    src="/assets/images/auth3.png"
                                    alt=""
                                    className="h-[260px] w-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                            <div className="relative overflow-hidden rounded-[28px] shadow-[0_20px_50px_-15px_rgba(15,22,22,0.18)]">
                                <img
                                    src="/assets/images/auth4.png"
                                    alt=""
                                    className="h-[300px] w-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}