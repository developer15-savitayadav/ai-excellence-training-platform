import { Link } from "@inertiajs/react";
import PublicLayout from "../Layouts/PublicLayout";
import Button from "../Components/ui/Button";
import FaqSection from "../Components/FaqSection";

function EyeBrow({ children, color = "violet" }) {
    return (
        <p
            className={`font-mono text-xs uppercase tracking-[0.08em] text-${color} mb-3`}
        >
            {children}
        </p>
    );
}

const PAYMENT_OPTIONS = [
    {
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                />
            </svg>
        ),
        title: "No-cost EMI",
        description:
            "Pay monthly on all Professional and Career programs — no lump sum required.",
        accent: "lime",
    },
    {
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342"
                />
            </svg>
        ),
        title: "Women in Tech Scholarship",
        description:
            "Limited seats every year dedicated to women entering the AI workforce.",
        accent: "violet",
    },
    {
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
            </svg>
        ),
        title: "Merit Scholarship",
        description:
            "Based on our free entrance test — reward the best students can earn.",
        accent: "lime",
    },
    {
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                />
            </svg>
        ),
        title: "Early-bird & Group Benefits",
        description:
            "Early-bird, group and full-payment discounts — ask your counsellor.",
        accent: "violet",
    },
    {
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
            </svg>
        ),
        title: "Referral Rewards",
        description:
            "Earn rewards when someone you refer enrols in any program.",
        accent: "lime",
    },
    {
        icon: (
            <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
            </svg>
        ),
        title: "Upgrade Credit",
        description:
            "Full short-course fee adjusted against a long program if you upgrade within 60 days.",
        accent: "violet",
    },
];

const BUNDLES = [
    {
        tag: "FRESHER COMBO",
        name: "Python Foundation + Advanced Diploma in AI & ML",
        description:
            "Start with Python fundamentals and fast-track into our flagship AI & ML diploma — bundled savings available.",
        accent: "lime",
    },
    {
        tag: "MARKETER COMBO",
        name: "Generative AI & Prompt Engineering + Digital Marketing with AI",
        description:
            "Master prompt engineering and apply it directly to AI-powered marketing — bundled savings available.",
        accent: "violet",
    },
];

export default function Fee() {
    return (
        <PublicLayout>
            {/* ═══════════════ HERO BANNER ═══════════════ */}
            <section className="relative overflow-hidden bg-black">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-32 left-[8%] w-[520px] h-[300px] rounded-full bg-violet/[0.07] blur-[120px]" />
                    <div className="absolute top-[30%] right-[5%] w-[420px] h-[250px] rounded-full bg-lime/[0.06] blur-[110px]" />
                    <div className="absolute -bottom-20 left-[35%] w-[350px] h-[200px] rounded-full bg-violet/[0.04] blur-[100px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-[1240px] px-6 pt-[48px] pb-14 max-lg:pt-[48px]">
                    <h1 className="font-display text-[clamp(2.1rem,3.8vw,3.2rem)] font-bold tracking-[-0.035em] leading-[1.08]">
                        <span className="bg-[linear-gradient(90deg,#eec369,#982cdc)] bg-clip-text text-transparent">
                            Quality AI Education,
                        </span>
                        <br />
                        <span className="text-white">
                            Priced for Lucknow Families
                        </span>
                    </h1>

                    <p className="text-muted text-lg mt-5 max-w-xl leading-relaxed">
                        We keep our fee structure transparent and flexible — and
                        we prefer to discuss it with you personally, so we can
                        match the right program and payment plan to your goals
                        and budget.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        <Link
                            href="/contact"
                            className="rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(152,44,220,.25)] hover:shadow-[0_10px_28px_rgba(152,44,220,.38)] hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Contact us
                        </Link>
                        <span className="text-sm font-semibold text-black">
                            to know pricing
                        </span>
                    </div>
                </div>

                {/* Stat Bar */}
                {/* <div className="border-y border-black/[0.06] bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-[1240px] px-6 grid grid-cols-2 sm:grid-cols-4 divide-x divide-black/[0.08]">
            <div className="flex flex-col items-center justify-center gap-1 py-5 px-4 text-center">
                <span className="text-xs text-muted font-medium">Payment</span>
                <span className="text-lg font-bold text-black">No-cost EMI</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 py-5 px-4 text-center">
                <span className="text-xs text-muted font-medium">Scholarships</span>
                <span className="text-lg font-bold text-black">Merit &amp; Women in Tech</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 py-5 px-4 text-center">
                <span className="text-xs text-muted font-medium">Group Benefits</span>
                <span className="text-lg font-bold text-black">Early-bird &amp; Referral</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 py-5 px-4 text-center">
                <span className="text-xs text-muted font-medium">Upgrade</span>
                <span className="text-lg font-bold text-black">Full credit within 60 days</span>
            </div>
        </div>
    </div> */}
            </section>

            {/* ═══════════════ FLEXIBLE PAYMENT OPTIONS ═══════════════ */}
            <section className="relative">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />
                <div className="relative max-w-[1240px] mx-auto px-6 py-[60px] max-lg:py-[72px]">
                    <div className="text-center mb-14">
                        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold tracking-[-0.03em] text-black">
                            Flexible Payment Option
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {PAYMENT_OPTIONS.map((option) => (
                            <div
                                key={option.title}
                                className="bg-[#ffd05a] rounded-2xl p-6 flex items-start gap-4 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,208,90,.35)] transition-all duration-300"
                            >
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0">
                                    {option.icon}
                                </div>
                                <div className="pt-1">
                                    <h3 className="font-display text-base font-bold text-black leading-snug mb-1.5">
                                        {option.title}
                                    </h3>
                                    <p className="text-black/60 leading-relaxed text-xs">
                                        {option.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex justify-center">
                        <div className="rounded-full bg-white border border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,.04)] px-6 py-3.5">
                            <p className="text-sm italic font-medium text-black/50 text-center">
                                Scholarships and offers are subject to
                                eligibility and seat availability. Terms apply.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* ═══════════════ BUNDLES ═══════════════ */}
            <section className="bg-[#F5F5F2]">
                <div className="max-w-[1240px] mx-auto px-6 py-[60px] max-lg:py-[72px]">
                    <div className="text-center mb-14">
                        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold tracking-[-0.03em] text-black">
                            Combo Package
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {BUNDLES.map((bundle) => (
                            <Link
                                key={bundle.tag}
                                href={bundle.href || "/contact"}
                                className="block rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,.06)] hover:-translate-y-0.5 hover:shadow-[0_16px_44px_rgba(0,0,0,.1)] transition-all duration-300"
                            >
                                <img
                                    src={bundle.image}
                                    alt={bundle.name}
                                    className="w-full h-auto block"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            {/* ═══════════════ FAQ ═══════════════ */}
            <FaqSection />
            {/* ═══════════════ CTA ═══════════════ */}
            <section className="relative overflow-hidden bg-black">
                <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-[60px] max-lg:py-[72px] text-center">
                    <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold text-white leading-tight">
                        Contact Us for Pricing
                        <br />
                        &amp; Scholarship{" "}
                        <span className="text-violet">Eligibility.</span>
                    </h2>
                    <p className="text-muted text-lg mt-4">
                        New batch starts every month
                    </p>
                    <div className="flex justify-center mt-8">
                        <Link
                            href="/contact"
                            className="rounded-full bg-[linear-gradient(60deg,#eec369,#982cdc)] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(152,44,220,.25)] hover:shadow-[0_10px_28px_rgba(152,44,220,.38)] hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Enrol Now
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
