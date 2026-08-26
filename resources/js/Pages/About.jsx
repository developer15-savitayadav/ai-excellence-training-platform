import PublicLayout from "../Layouts/PublicLayout";
import Button from "../Components/ui/Button";
import { Link } from "@inertiajs/react";

function EyeBrow({ children, color = "violet" }) {
    return (
        <p
            className={`font-mono text-xs uppercase tracking-[0.08em] text-${color} mb-3`}
        >
            {children}
        </p>
    );
}

function CheckIcon() {
    return (
        <svg
            className="w-4 h-4 text-lime shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
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

function XIcon() {
    return (
        <svg
            className="w-4 h-4 text-danger/50 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    );
}

const BELIEFS = [
    {
        number: "01",
        title: "The trainer matters more than the syllabus.",
        description:
            "We invest in exceptional trainers because a great teacher is the reason students learn, finish, and recommend us.",
        iconPath:
            "M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342",
    },
    {
        number: "02",
        title: "Projects beat theory.",
        description:
            "Every competitor can teach you what a neural network is. We make sure you have built one, deployed it, and can explain it in an interview.",
        iconPath:
            "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5",
    },
    {
        number: "03",
        title: "Honesty compounds.",
        description:
            'We will never advertise a "100% placement guarantee." We will publish our actual placement numbers, batch by batch, and let those speak.',
        iconPath:
            "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
    },
];

const COMPARISON = [
    { feature: "Batch size", us: "20\u201325 max", them: "40\u201360" },
    {
        feature: "Curriculum",
        us: "GenAI, LLMs, AI agents, AI marketing",
        them: "Dated ML theory",
    },
    {
        feature: "Projects",
        us: "Deployed, on GitHub, with live budgets",
        them: "Slide-based assignments",
    },
    {
        feature: "Placement",
        us: "Dedicated coordinator, published results",
        them: "Slogans",
    },
    {
        feature: "Lab access",
        us: "Open 10 AM \u2013 7 PM daily",
        them: "Class hours only",
    },
    { feature: "Payment", us: "No-cost EMI, scholarships", them: "Lump sum" },
];

const CAMPUS = [
    {
        label: "Workstations",
        value: "25",
        iconPath:
            "M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 7.41A2.25 2.25 0 0 1 2.25 5.495V5.25",
    },
    {
        label: "Lab Hours",
        value: "10\u20137",
        iconPath: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    },
    {
        label: "Internet",
        value: "High-speed",
        iconPath:
            "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418",
    },
    {
        label: "Counselling",
        value: "Lounge",
        iconPath:
            "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
    },
];

export default function About() {
    return (
        <PublicLayout>
            {/* ═══════════════ BREADCRUMB BANNER ═══════════════ */}
            <section className="relative overflow-hidden bg-[#F5F5F2]">
                {/* Ambient background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 left-[10%] w-[440px] h-[260px] rounded-full bg-violet/[0.07] blur-[110px]" />
                    <div className="absolute -bottom-28 right-[6%] w-[400px] h-[240px] rounded-full bg-lime/[0.05] blur-[110px]" />
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, white 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                        }}
                    />
                </div>

                <nav
                    aria-label="Breadcrumb"
                    className="relative z-10 mx-auto max-w-[1240px] px-6 pt-[140px] max-lg:pt-[120px] pb-9 max-lg:pb-7"
                >
                    <div className="flex items-center justify-between gap-x-6 gap-y-3 flex-wrap">
                        <ol className="flex items-center gap-1 p-1 rounded-full bg-black/[0.04] border border-black/[0.08] backdrop-blur-sm">
                            <li>
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 px-4 py-2 max-sm:px-3 rounded-full text-sm text-muted hover:text-body hover:bg-black/[0.06] transition-all duration-200"
                                >
                                    <svg
                                        className="w-3.5 h-3.5 shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                        />
                                    </svg>
                                    Home
                                </Link>
                            </li>
                            <li aria-hidden="true">
                                <svg
                                    className="w-3.5 h-3.5 text-black/20"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </li>
                            <li aria-current="page">
                                <span className="flex items-center gap-2 px-4 py-2 max-sm:px-3 rounded-full text-sm font-medium text-lime bg-lime/[0.08] border border-lime/15">
                                    <svg
                                        className="w-3.5 h-3.5 shrink-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                                        />
                                    </svg>
                                    About Us
                                </span>
                            </li>
                        </ol>

                        {/* Terminal-style path marker */}
                        <span
                            aria-hidden="true"
                            className="hidden sm:inline-block font-mono text-[11px] tracking-wide text-muted/60 select-none"
                        >
                            ~/about-us
                            <span className="animate-pulse text-lime">_</span>
                        </span>
                    </div>
                </nav>

                {/* Bottom hairline */}
                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/[0.12] to-transparent pointer-events-none" />
            </section>

            {/* ═══════════════ HERO ═══════════════ */}
            <section className="relative overflow-hidden pt-[88px] pb-[100px] max-lg:pt-[56px] max-lg:pb-[72px]">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-violet/[0.07] blur-[150px]" />
                    <div className="absolute top-32 right-[10%] w-[400px] h-[400px] rounded-full bg-lime/[0.05] blur-[120px]" />
                    <div
                        className="absolute inset-0 opacity-[0.025]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, white 1px, transparent 1px)",
                            backgroundSize: "32px 32px",
                        }}
                    />
                </div>

                <div className="relative z-10 mx-auto max-w-[1240px] px-6">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                        {/* Left — Copy */}
                        <div className="flex-1 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime/[0.08] border border-lime/20 mb-8">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
                                </span>
                                <span className="font-mono text-xs text-lime uppercase tracking-wider">
                                    Lucknow, India
                                </span>
                            </div>

                            <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-body">
                                Built in Lucknow,
                                <br />
                                for Lucknow&apos;s{" "}
                                <span className="relative inline-block">
                                    <span className="relative z-10 text-lime">
                                        AI Talent
                                    </span>
                                    <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-lime/30 rounded-full" />
                                </span>
                            </h1>

                            <p className="text-muted text-lg mt-7 max-w-xl leading-relaxed">
                                AI Excellence Academy was founded on a simple
                                observation: Lucknow has thousands of bright
                                students and ambitious professionals, but the
                                training available to them is either outdated,
                                certificate-only, or priced for metro cities and
                                delivered online with no accountability.
                            </p>
                            <p className="text-muted text-lg mt-4 max-w-xl leading-relaxed">
                                We set out to build something different &mdash;
                                an offline institute with a curriculum that
                                moves as fast as the AI industry, trainers who
                                are practitioners rather than lecturers, and
                                career support that is a process, not a slogan.
                            </p>

                            <div className="flex flex-wrap gap-4 mt-10">
                                <Button href="/courses">Explore Courses</Button>
                                <Button variant="secondary" href="/contact">
                                    Visit Our Campus
                                </Button>
                            </div>
                        </div>

                        {/* Right — Visual card */}
                        <div className="flex-1 w-full max-w-md lg:max-w-none">
                            <div className="relative">
                                <div className="absolute -inset-6 bg-gradient-to-br from-violet/10 via-transparent to-lime/8 rounded-3xl blur-xl" />

                                <div className="relative bg-white border border-black/5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,.03)] overflow-hidden">
                                    {/* Window chrome */}
                                    <div className="flex items-center gap-2 px-5 py-3 border-b border-black/[0.06]">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-danger/80" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-success/80" />
                                        </div>
                                        <span className="font-mono text-[10px] text-muted ml-2">
                                            founding-story.ai
                                        </span>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        {/* Origin line */}
                                        <div className="flex items-start gap-3">
                                            <span className="shrink-0 mt-0.5 font-mono text-[11px] text-violet font-medium bg-violet/10 px-2 py-0.5 rounded">
                                                ORIGIN
                                            </span>
                                            <p className="text-sm text-muted leading-relaxed">
                                                Lucknow has thousands of bright
                                                students &mdash; but training is
                                                outdated, overpriced, or online
                                                with no accountability.
                                            </p>
                                        </div>

                                        <div className="h-px bg-black/[0.06]" />

                                        {/* Mission line */}
                                        <div className="flex items-start gap-3">
                                            <span className="shrink-0 mt-0.5 font-mono text-[11px] text-lime font-medium bg-lime/10 px-2 py-0.5 rounded">
                                                MISSION
                                            </span>
                                            <p className="text-sm text-muted leading-relaxed">
                                                Build an offline institute with
                                                a curriculum that moves as fast
                                                as the AI industry.
                                            </p>
                                        </div>

                                        <div className="h-px bg-black/[0.06]" />

                                        {/* Stats row */}
                                        <div className="grid grid-cols-3 gap-3 pt-1">
                                            <div className="text-center p-3 rounded-xl bg-black/[0.03] border border-black/[0.06]">
                                                <div className="font-mono text-xl font-bold text-lime">
                                                    25
                                                </div>
                                                <div className="text-[10px] text-muted mt-1">
                                                    Workstations
                                                </div>
                                            </div>
                                            <div className="text-center p-3 rounded-xl bg-black/[0.03] border border-black/[0.06]">
                                                <div className="font-mono text-xl font-bold text-body">
                                                    1:20
                                                </div>
                                                <div className="text-[10px] text-muted mt-1">
                                                    Batch Size
                                                </div>
                                            </div>
                                            <div className="text-center p-3 rounded-xl bg-black/[0.03] border border-black/[0.06]">
                                                <div className="font-mono text-xl font-bold text-violet">
                                                    10-7
                                                </div>
                                                <div className="text-[10px] text-muted mt-1">
                                                    Lab Hours
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ WHAT WE BELIEVE ═══════════════ */}
            <section className="relative">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />
                <div className="relative max-w-[1240px] mx-auto px-6 py-[120px] max-lg:py-[72px]">
                    <div className="text-center mb-16">
                        <EyeBrow color="lime">WHAT WE BELIEVE_</EyeBrow>
                        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold text-body">
                            Our Principles
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {BELIEFS.map((b) => (
                            <div
                                key={b.number}
                                className="relative bg-white border border-black/5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,.03)] p-8 hover:border-black/[0.18] hover:-translate-y-0.5 transition-all duration-[220ms]"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-lime/10 border border-lime/20 flex items-center justify-center shrink-0">
                                        <svg
                                            className="w-6 h-6 text-lime"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d={b.iconPath}
                                            />
                                        </svg>
                                    </div>
                                    <span className="font-mono text-3xl font-bold text-black/[0.06]">
                                        {b.number}
                                    </span>
                                </div>
                                <h3 className="font-display text-xl font-semibold text-body mb-3">
                                    {b.title}
                                </h3>
                                <p className="text-muted leading-relaxed">
                                    {b.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ THE DIFFERENCE ═══════════════ */}
            <section className="bg-[#F5F5F2]">
                <div className="max-w-[1240px] mx-auto px-6 py-[120px] max-lg:py-[72px]">
                    <div className="text-center mb-16">
                        <EyeBrow>THE DIFFERENCE_</EyeBrow>
                        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold text-body">
                            The AI Excellence Academy Difference
                        </h2>
                        <p className="text-muted text-lg mt-4 max-w-xl mx-auto">
                            Side by side, the choice is clear.
                        </p>
                    </div>

                    {/* Desktop table */}
                    <div className="hidden md:block bg-white border border-black/5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,.03)] overflow-hidden">
                        <div className="grid grid-cols-3 border-b border-black/[0.08]">
                            <div className="px-6 py-4 font-mono text-xs uppercase tracking-wider text-muted">
                                Feature
                            </div>
                            <div className="px-6 py-4 bg-lime/5 border-l border-black/[0.08]">
                                <span className="inline-flex items-center gap-2 font-display font-semibold text-lime text-sm">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                                        />
                                    </svg>
                                    AI Excellence Academy
                                </span>
                            </div>
                            <div className="px-6 py-4 border-l border-black/[0.08]">
                                <span className="font-display text-sm text-muted">
                                    Typical Institute
                                </span>
                            </div>
                        </div>
                        {COMPARISON.map((row, i) => (
                            <div
                                key={row.feature}
                                className={`grid grid-cols-3 ${i < COMPARISON.length - 1 ? "border-b border-black/[0.06]" : ""}`}
                            >
                                <div className="px-6 py-5 font-mono text-sm text-muted">
                                    {row.feature}
                                </div>
                                <div className="px-6 py-5 bg-lime/[0.02] border-l border-black/[0.08]">
                                    <div className="flex items-center gap-2">
                                        <CheckIcon />
                                        <span className="text-sm text-body">
                                            {row.us}
                                        </span>
                                    </div>
                                </div>
                                <div className="px-6 py-5 border-l border-black/[0.08]">
                                    <span className="text-sm text-muted/60">
                                        {row.them}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile cards */}
                    <div className="md:hidden space-y-4">
                        {COMPARISON.map((row) => (
                            <div
                                key={row.feature}
                                className="bg-white border border-black/5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,.03)] p-5"
                            >
                                <p className="font-mono text-xs uppercase tracking-wider text-muted mb-3">
                                    {row.feature}
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <CheckIcon />
                                        <span className="text-sm text-body">
                                            {row.us}
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <XIcon />
                                        <span className="text-sm text-muted/60">
                                            {row.them}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ OUR CAMPUS ═══════════════ */}
            <section className="relative">
                <div className="max-w-[1240px] mx-auto px-6 py-[120px] max-lg:py-[72px]">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="flex-1">
                            <EyeBrow color="lime">OUR CAMPUS_</EyeBrow>
                            <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold text-body mb-6">
                                Where Learning
                                <br />
                                Comes Alive
                            </h2>
                            <p className="text-muted text-lg leading-relaxed mb-8">
                                Located in Gomti Nagar, our campus features 25
                                modern workstations, a dedicated practice lab
                                open from 10 AM to 7 PM, high-speed internet,
                                and a counselling lounge. Drop in any weekday
                                for a tour.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {CAMPUS.map((f) => (
                                    <div
                                        key={f.label}
                                        className="bg-white border border-black/5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,.03)] p-5 hover:border-black/[0.15] transition-colors"
                                    >
                                        <svg
                                            className="w-5 h-5 text-lime mb-3"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d={f.iconPath}
                                            />
                                        </svg>
                                        <div className="font-mono text-2xl font-bold text-body">
                                            {f.value}
                                        </div>
                                        <div className="text-xs text-muted mt-1">
                                            {f.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Campus visual */}
                        <div className="flex-1 w-full max-w-md">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-violet/8 rounded-3xl blur-2xl" />
                                <div className="relative bg-white border border-black/5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,.03)] overflow-hidden">
                                    <div className="flex items-center gap-2 px-5 py-3 border-b border-black/[0.06]">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-danger/80" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-success/80" />
                                        </div>
                                        <span className="font-mono text-[10px] text-muted ml-2">
                                            campus-tour
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <div className="text-center mb-5">
                                            <p className="font-display text-sm font-semibold text-body">
                                                Campus Tour
                                            </p>
                                            <p className="font-mono text-[10px] text-muted mt-1">
                                                Gomti Nagar, Lucknow
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-5 gap-2 mb-5">
                                            {Array.from({ length: 25 }).map(
                                                (_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`aspect-square rounded-md ${
                                                            [
                                                                0, 4, 7, 12, 16,
                                                                18, 22,
                                                            ].includes(i)
                                                                ? "bg-lime/20 border border-lime/30"
                                                                : "bg-black/[0.04] border border-black/[0.06]"
                                                        }`}
                                                    />
                                                ),
                                            )}
                                        </div>
                                        <div className="h-px bg-black/[0.06] mb-4" />
                                        <div className="flex items-center justify-between">
                                            <span className="font-mono text-[10px] text-muted">
                                                10:00 AM &ndash; 7:00 PM
                                            </span>
                                            <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-lime/10 text-lime border border-lime/20">
                                                Book a Visit
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ CTA ═══════════════ */}
            <section className="relative overflow-hidden bg-[#F5F5F2]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                    }}
                />
                <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-[120px] max-lg:py-[72px] text-center">
                    <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold text-body leading-tight">
                        Start Your AI Journey Today
                    </h2>
                    <p className="text-muted text-lg mt-4 max-w-lg mx-auto">
                        Whether you&apos;re here to learn AI fundamentals or
                        master advanced techniques, we&apos;re ready to help you
                        succeed.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <Button href="/register">Get Started</Button>
                        <Button variant="secondary" href="/contact">
                            Contact Us
                        </Button>
                    </div>
                    <p className="font-mono text-xs text-muted mt-6">
                        Drop in any weekday for a campus tour
                    </p>
                </div>
            </section>
        </PublicLayout>
    );
}
