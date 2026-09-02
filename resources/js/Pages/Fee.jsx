import { Link } from "@inertiajs/react";
import PublicLayout from "../Layouts/PublicLayout";
import Button from "../Components/ui/Button";
import FaqSection from "../Components/FAQSection";

function EyeBrow({ children, color = "violet" }) {
    return (
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${color === "lime" ? "bg-[#eec369]" : "bg-[#982cdc]"}`} />
            {children}
        </p>
    );
}

const PAYMENT_OPTIONS = [
    {
        image: "/assets/images/003-payment-protection.png",
        title: "No-cost EMI",
        description:
            "Pay monthly on all Professional and Career programs — no lump sum required.",
        accent: "lime",
    },
    {
        image: "/assets/images/004-businesswoman.png",
        title: "Women in Tech Scholarship",
        description:
            "Limited seats every year dedicated to women entering the AI workforce.",
        accent: "violet",
    },
    {
        image: "/assets/images/002-cup.png",
        title: "Merit Scholarship",
        description:
            "Based on our free entrance test — reward the best students can earn.",
        accent: "lime",
    },
    {
        image: "/assets/images/005-group.png",
        title: "Early-bird & Group Benefits",
        description:
            "Early-bird, group and full-payment discounts — ask your counsellor.",
        accent: "violet",
    },
    {
        image: "/assets/images/001-gift.png",
        title: "Referral Rewards",
        description:
            "Earn rewards when someone you refer enrols in any program.",
        accent: "lime",
    },
    {
        image: "/assets/images/006-growth.png",
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
        image: "/assets/images/python-package.png",
        href: "/contact",
    },
    {
        tag: "MARKETER COMBO",
        name: "Generative AI & Prompt Engineering + Digital Marketing with AI",
        description:
            "Master prompt engineering and apply it directly to AI-powered marketing — bundled savings available.",
        accent: "violet",
        image: "/assets/images/Generative-ai.png",
        href: "/contact",
    },
];

export default function Fee() {
    return (
        <PublicLayout>
            {/* ═══════════════ HERO BANNER ═══════════════ */}
            <section
                className="relative overflow-hidden bg-cover bg-center -mt-24 pt-[220px] pb-[40px]"
                style={{ backgroundImage: "url('/assets/images/rumi_darwaza.png')" }}
            >
                <div className="absolute inset-0 bg-black/60" />
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

                    <p className="text-white text-lg mt-5 max-w-xl leading-relaxed">
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
                        <span className="text-sm font-semibold text-white">
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
                                className="bg-[#ffd05a] rounded-0 p-6 min-h-[160px] flex items-start gap-4 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,208,90,.35)] transition-all duration-300"
                            >
                                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
                                    <img
                                        src={option.image}
                                        alt={option.title}
                                        className="w-12 h-12 object-contain"
                                    />
                                </div>

                                <div className="pt-1">
                                    <h3 className="font-display text-base font-bold text-black leading-snug mb-1.5">
                                        {option.title}
                                    </h3>

                                    <p className="text-black leading-relaxed text-[16px] mt-4">
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
                    <p className="text-white text-lg mt-4">
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
