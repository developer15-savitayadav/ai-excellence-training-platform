import { Link } from '@inertiajs/react';
import ToastContainer from '../Components/ui/Toast';

function Logo({ light = false }) {
    return (
        <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <img
                src="/assets/images/logoExtra1.png"
                alt="AI Excellence Academy"
                className="h-[80px] w-[160px] transition-transform group-hover:scale-105"
            />
        </Link>
    );
}
const STATS = [
    { value: '2K+', label: 'Learners' },
    { value: '20+', label: 'Courses' },
    { value: '98%', label: 'Satisfaction' },
];

export default function AuthLayout({ children }) {
    return (
        <div className="h-screen overflow-hidden bg-ink">
            <div className="h-screen lg:grid lg:grid-cols-2">
                {/* ═══════════════ LEFT — VISUAL / IMAGE PANEL ═══════════════ */}
                <div className="relative hidden lg:block overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="/assets/images/data-science.jpg"
                            alt="AI and technology learning"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    {/* Sophisticated overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(200deg,rgba(7,13,13,0.25)_0%,rgba(7,13,13,0.55)_45%,rgba(7,13,13,0.92)_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(152,44,220,0.28)_0%,transparent_55%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(238,195,105,0.22)_0%,transparent_55%)]" />

                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col justify-between p-8">
                        <Logo light />

                        <div className="max-w-md">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-white/90 backdrop-blur-sm">
                                <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
                                Learn · Build · Grow
                            </span>
                            <h1 className="mt-4 font-display text-[clamp(1.6rem,2.3vw,2.4rem)] font-bold leading-[1.08] tracking-[-0.04em] text-white">
                                Your AI future starts today.
                            </h1>
                            <p className="mt-3 text-sm leading-relaxed text-white/75">
                                Practical, career-focused training in AI, data
                                science and programming — taught by
                                practitioners who ship real projects.
                            </p>

                            {/* Feature bullets */}
                            <div className="mt-5 space-y-2">
                                {[
                                    'Hands-on projects you can showcase',
                                    'Live, instructor-led cohorts',
                                    'Certificate on completion',
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm text-white/85"
                                    >
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime/20 text-lime">
                                            <svg
                                                className="h-3 w-3"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={3}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m4.5 12.75 6 6 9-13.5"
                                                />
                                            </svg>
                                        </span>
                                        {item}
                                    </div>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="mt-5 grid grid-cols-3 gap-6 border-t border-white/15 pt-4">
                                {STATS.map((s) => (
                                    <div key={s.label}>
                                        <div className="font-display text-xl font-bold text-white">
                                            {s.value}
                                        </div>
                                        <div className="mt-0.5 text-[11px] text-white/60">
                                            {s.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══════════════ RIGHT — FORM PANEL ═══════════════ */}
                <div className="relative flex h-screen flex-col overflow-y-auto lg:items-center lg:justify-center px-6 py-5 sm:px-10 lg:px-14 lg:py-6">
                    {/* Mobile top banner */}
                    <div className="relative lg:hidden mb-4 -mx-6 -mt-5 sm:-mx-10 sm:-mt-5 h-20 shrink-0 overflow-hidden">
                        <img
                            src="/assets/images/data-science.jpg"
                            alt=""
                            className="h-full w-full object-cover"
                        />

                    </div>

               

                    <div className="w-full max-w-[420px]">
                        {children}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}