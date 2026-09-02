import { Link } from "@inertiajs/react";
import PublicLayout from "../Layouts/PublicLayout";
import Button from "../Components/ui/Button";
import RevealDiv, { useReveal } from "../Components/RevealDiv";
import TestimonialSlider from "../Components/TestimonialSlider";
import FaqSection from "../Components/FAQSection";
function EyeBrow({ children, color = "violet" }) {
    return (
        <div className="relative z-10 mx-auto w-full max-w-[950px] text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-xs font-medium text-black/70 backdrop-blur-sm uppercase">
                <span
                    className={`w-1.5 h-1.5 rounded-full animate-pulse ${color === "lime" ? "bg-[#eec369]" : "bg-[#982cdc]"}`}
                />
                {children}
            </div>
        </div>
    );
}

const TIER_ROWS = [
    {
        service: "Certificate of completion",
        short: true,
        professional: true,
        career: true,
    },
    {
        service: "GitHub / portfolio setup",
        short: false,
        professional: true,
        career: true,
    },
    {
        service: "ATS resume building (1-on-1)",
        short: false,
        professional: true,
        career: true,
    },
    {
        service: "LinkedIn profile optimisation",
        short: false,
        professional: true,
        career: true,
    },
    {
        service: "Mock interviews",
        short: "2 sessions",
        professional: "5+ sessions",
        career: "5+ sessions",
    },
    {
        service: "Aptitude & communication training",
        short: false,
        professional: false,
        career: "20 hrs",
    },
    {
        service: "Job referrals to hiring partners",
        short: false,
        professional: true,
        career: "Priority",
    },
    {
        service: "Internship placement",
        short: false,
        professional: false,
        career: "Career Track",
    },
    {
        service: "Lifetime re-attendance",
        short: true,
        professional: true,
        career: true,
    },
];

const RESUME_STEPS = [
    {
        number: "01",
        title: "ATS Mechanics",
        description:
            "Why most resumes are auto-rejected, and how to format and keyword-map yours to pass.",
    },
    {
        number: "02",
        title: "The Fresher Problem",
        description:
            "Filling a resume with zero work experience using projects, freelance work and college activity.",
    },
    {
        number: "03",
        title: "Project Write-Ups That Land",
        description:
            "\u201cBuilt a churn prediction model on 50k records achieving 87% accuracy, deployed via Streamlit\u201d instead of \u201cMade an ML project.\u201d",
    },
    {
        number: "04",
        title: "1-on-1 Rebuild Session",
        description:
            "Your trainer sits with you personally, not a template handout.",
    },
    {
        number: "05",
        title: "Three Tailored Variants",
        description: "One each for AI/ML, data analyst and general IT roles.",
    },
    {
        number: "06",
        title: "LinkedIn + GitHub",
        description: "Headline, About section, pinned repos, README writing.",
    },
];

const PLACEMENT_ENGINE = [
    {
        icon: (
            <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
            </svg>
        ),
        title: "Dedicated Placement Coordinator",
        description: "Whose only job is getting you hired.",
    },
    {
        icon: (
            <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                />
            </svg>
        ),
        title: "Hiring Partner Network",
        description:
            "Growing across Lucknow, Noida, Gurgaon and remote-first startups.",
    },
    {
        icon: (
            <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                />
            </svg>
        ),
        title: "Quarterly Placement Drives",
        description: "On-campus drives with multiple companies.",
    },
    {
        icon: (
            <svg
                className="w-5 h-5"
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
        title: "Alumni Referral Programme",
        description: "Our graduates bring opportunities back.",
    },
];

function Check() {
    return (
        <svg
            className="w-4 h-4 text-violet mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
            />
        </svg>
    );
}

function Dash() {
    return <span className="text-black/15 mx-auto">&mdash;</span>;
}

function CellValue({ value }) {
    if (value === false || value === undefined || value === null) {
        return <span className="text-black/25 text-base leading-none">—</span>;
    }
    if (value === true) {
        return (
            <svg
                className="w-4 h-4 text-violet"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        );
    }
    // text value — no icon, just the label
    return <span className="text-violet-950 font-medium">{value}</span>;
}
export default function Career() {
    return (
        <PublicLayout>
            {/* ═══════════════ HERO BANNER ═══════════════ */}
            <section className="relative overflow-hidden bg-[#f4f3ef]">
                <div className="relative z-10 mx-auto max-w-[1240px] px-6 pt-16  max-lg:pt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
                        {/* Left: copy */}
                        <div>
                            <h1 className="font-display text-[clamp(2rem,3.6vw,3rem)] font-extrabold tracking-[-0.03em] leading-[1.12]">
                                <span className="bg-[linear-gradient(90deg,#eec369,#982cdc)] bg-clip-text text-transparent">
                                    Structured
                                </span>
                                <span className="text-black">
                                    {" "}
                                    Placement Assistance —
                                </span>
                                <br />
                                <span className="text-black">
                                    A process, Not a Promise
                                </span>
                            </h1>

                            <p className="text-neutral-600 text-base mt-5 max-w-lg leading-relaxed">
                                We do not advertise &ldquo;100% placement
                                guarantee.&rdquo; Nobody can honestly make that
                                promise. What we offer instead is a structured
                                system, a dedicated team, and published results
                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <Link
                                    href="/enroll"
                                    className="rounded-full bg-[linear-gradient(60deg,#eec369,#982cdc)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(152,44,220,.25)] hover:shadow-[0_10px_28px_rgba(152,44,220,.38)] hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Enrol Now
                                </Link>
                                <Link
                                    href="/curriculum"
                                    className="rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white hover:bg-black/80 hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Download Curriculum
                                </Link>
                            </div>
                        </div>

                        {/* Right: visual */}
                        <div className="relative flex justify-center lg:justify-end">
                            <img
                                src="/assets/images/careerBanner.png"
                                alt="AI-powered career guidance"
                                className="w-full max-w-[420px] h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Stat Bar */}
                <div className="border-t border-black/[0.08] bg-white">
                    <div className="mx-auto max-w-[1240px] px-6 grid grid-cols-2 sm:grid-cols-4 divide-x divide-black/[0.08] items-center">
                        <div className="flex flex-col items-center justify-center gap-1 py-6 px-4 text-center">
                            <span className="text-xs text-neutral-500 font-medium">
                                -----
                            </span>
                            <span className="text-lg font-bold text-black">
                                Students Enrolled
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 py-6 px-4 text-center">
                            <span className="text-xs text-neutral-500 font-medium">
                                -----
                            </span>
                            <span className="text-lg font-bold text-black">
                                Students Placed
                            </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 py-6 px-4 text-center">
                            <span className="text-xs text-neutral-500 font-medium">
                                -----
                            </span>
                            <span className="text-lg font-bold text-black">
                                Median Package
                            </span>
                        </div>
                        <div className="flex items-center justify-center py-6 px-4">
                            <Link
                                href="/contact"
                                className="rounded-full bg-[linear-gradient(60deg,#eec369,#982cdc)] px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 transition-all duration-300"
                            >
                                Contact us for pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ TIER COMPARISON TABLE ═══════════════ */}
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


                    {/* Desktop table */}
                    <div className="hidden md:flex items-stretch gap-4">
                        {/* Labels column */}
                        <div className="flex-1 min-w-0 pt-[68px]">
                            {TIER_ROWS.map((row) => (
                                <div
                                    key={row.service}
                                    className="h-[52px] flex items-center text-[16px] text-black"
                                >
                                    {row.service}
                                </div>
                            ))}
                        </div>

                        {/* Short-Term */}
                        <div className="w-[230px] shrink-0 rounded-[28px] bg-black/[0.035] px-4 py-6 flex flex-col items-center">
                            <span className="font-display font-semibold text-base text-body mb-4">
                                Short-Term
                            </span>
                            {TIER_ROWS.map((row) => (
                                <div
                                    key={row.service}
                                    className="h-[52px] w-full flex items-center justify-start pl-6 text-sm text-muted"
                                >
                                    <CellValue value={row.short} />
                                </div>
                            ))}
                        </div>

                        {/* Professional */}
                        <div className="w-[230px] shrink-0 rounded-[28px] bg-black/[0.035] px-4 py-6 flex flex-col items-center">
                            <span className="font-display font-semibold text-base text-body mb-4">
                                Professional
                            </span>
                            {TIER_ROWS.map((row) => (
                                <div
                                    key={row.service}
                                    className="h-[52px] w-full flex items-center justify-start pl-6 text-sm text-muted"
                                >
                                    <CellValue value={row.professional} />
                                </div>
                            ))}
                        </div>

                        {/* Career — highlighted tier */}
                        <div className="w-[230px] shrink-0 rounded-[28px] bg-violet/25 px-4 py-6 flex flex-col items-center">
                            <span className="font-display font-semibold text-base text-violet-950 mb-4">
                                Career
                            </span>
                            {TIER_ROWS.map((row) => (
                                <div
                                    key={row.service}
                                    className="min-h-[52px] w-full flex items-center justify-start pl-6 text-left text-sm font-medium text-violet-950 leading-snug py-1"
                                >
                                    <CellValue value={row.career} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile cards */}
                    <div className="md:hidden space-y-4">
                        {TIER_ROWS.map((row) => (
                            <div
                                key={row.service}
                                className="bg-white border border-black/5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,.03)] p-5"
                            >
                                <p className="text-xs uppercase tracking-wider text-muted mb-3">
                                    {row.service}
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted">
                                            Short-Term
                                        </span>
                                        <CellValue value={row.short} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted">
                                            Professional
                                        </span>
                                        <CellValue value={row.professional} />
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg bg-violet/10 -mx-2 px-2 py-1">
                                        <span className="text-sm text-violet-950 font-medium">
                                            Career
                                        </span>
                                        <CellValue value={row.career} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ RESUME MODULE ═══════════════ */}
            <section className="bg-[#F5F5F2]">
                <div className="max-w-[1240px] mx-auto px-6 py-[60px] max-lg:py-[72px]">
                    <div className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,.06)] p-10 max-lg:p-6">
                        <div className="grid lg:grid-cols-[0.85fr_2fr] gap-10 items-start">
                            {/* Left: intro panel */}
                            <div className="lg:sticky lg:top-10">
                                <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold tracking-[-0.03em] leading-[1.15] text-black">
                                    The Resume Building Module
                                </h2>
                                <Link
                                    href="/enroll"
                                    className="mt-6 inline-block rounded-full bg-[linear-gradient(60deg,#eec369,#982cdc)] px-7 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Enrol Now
                                </Link>
                            </div>

                            {/* Right: step grid */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {RESUME_STEPS.map((step, i) => {
                                    const highlighted = i % 2 === 1;
                                    return (
                                        <div
                                            key={step.number}
                                            className={`rounded-2xl p-5 ${
                                                highlighted
                                                    ? "bg-violet/20"
                                                    : "bg-white border border-black/[0.08]"
                                            }`}
                                        >
                                            <span className="block text-[20px] font-semibold text-black/70 mb-3">
                                                {step.number}
                                            </span>
                                            <h3
                                                className={`font-display text-[18px] font-bold leading-snug mb-2 ${
                                                    highlighted
                                                        ? "text-black"
                                                        : "text-violet"
                                                }`}
                                            >
                                                {step.title}
                                            </h3>
                                            <p
                                                className={`text-[16px]   ${
                                                    highlighted
                                                        ? "text-black"
                                                        : "text-muted"
                                                }`}
                                            >
                                                {step.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ PLACEMENT ENGINE ═══════════════ */}
            <section className="relative">
                <div className="max-w-[1240px] mx-auto px-6 py-[60px] max-lg:py-[72px]">
                    <div className="text-center mb-16">
                        <EyeBrow color="violet">HOW IT WORKS</EyeBrow>
                        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold text-body">
                            Our Placement Engine
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {PLACEMENT_ENGINE.map((item) => (
                            <div
                                key={item.title}
                                className="flex items-start gap-4 bg-white border border-black/5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,.03)] p-6 hover:border-black/[0.15] transition-colors"
                            >
                                <div className="w-11 h-11 rounded-xl bg-violet/10 border border-lime/20 flex items-center justify-center shrink-0 text-violet">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="font-display text-base font-semibold text-body mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Eligibility callout */}
                    <div className="mt-12 max-w-3xl mx-auto">
                        <div className="bg-white border border-violet/20 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,.03)] p-8 text-center">
                            <div className="w-12 h-12 rounded-xl bg-violet/10 border border-lime/20 flex items-center justify-center mx-auto mb-4 text-violet">
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
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="font-display text-lg font-semibold text-body mb-2">
                                Eligibility
                            </h3>
                            <p className="text-muted leading-relaxed">
                                Students with{" "}
                                <span className="font-semibold text-body">
                                    75% or higher attendance
                                </span>{" "}
                                are eligible for placement assistance. We set
                                this bar because showing up is what makes
                                everything else work.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ RESULTS PLACEHOLDER ═══════════════ */}
            {/* <section className="bg-[#F5F5F2]">
                <div className="max-w-[1240px] mx-auto px-6 py-[60px] max-lg:py-[72px]">
                    <div className="text-center mb-16">
                        <EyeBrow>OUR RESULTS_</EyeBrow>
                        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold text-body">
                            Published Results
                        </h2>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white border border-black/5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,.03)] p-10 text-center">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    {
                                        label: "Students Enrolled",
                                        value: "---",
                                    },
                                    { label: "Students Placed", value: "---" },
                                    { label: "Median Package", value: "---" },
                                    { label: "Hiring Companies", value: "---" },
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <div className="font-mono text-3xl font-bold text-black/[0.08]">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs text-muted mt-1">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-6 border-t border-black/[0.06]">
                                <p className="text-muted text-sm leading-relaxed max-w-lg mx-auto">
                                    Real numbers will be published here after
                                    each batch: students enrolled, students
                                    placed, median package, hiring companies,
                                    and named student stories. Updated every
                                    quarter.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* ═══════════════ CTA ═══════════════ */}
            <div className="bg-surface relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-violet/[0.12] blur-[140px]" />
                </div>
                <div className="relative z-10 mx-auto max-w-[1240px] px-6 py-20 sm:py-24 text-center">
                    <RevealDiv>
                        <h2 className="font-display text-[clamp(2rem,4vw,2.6rem)] font-bold tracking-[-0.04em] text-white leading-tight">
                            Ready to Start Your AI{" "}
                            <span className="text-[#765bc4]">Journey</span> ?
                        </h2>
                        <p className="mt-3 text-lg text-white">
                            New batch starts every month
                        </p>
                        <div className="mt-8 flex justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(60deg,#eec369,#982cdc)] px-10 py-4 text-sm font-semibold text-white shadow-[0_6px_24px_rgba(152,44,220,.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(152,44,220,.5)]"
                            >
                                Enroll Now
                            </Link>
                        </div>
                    </RevealDiv>
                </div>
            </div>
            {/* ═══════════════ ALUMNI TESTIMONIALS ═══════════════ */}
            <TestimonialSlider />
            {/* ═══════════════ FAQ ═══════════════ */}
            <FaqSection />
        </PublicLayout>
    );
}
