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
            className="w-4 h-4 text-violet shrink-0"
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

const IMPACT = [
    {
        value: "500K",
        label: "Courses delivered to learners and teams",
    },
    {
        value: "98%",
        label: "Course completion rate across all programs",
    },
    {
        value: "23K",
        label: "Organic signups to the academy",
    },
    {
        value: "25",
        label: "Modern workstations on campus",
    },
];

const WHO_WE_SERVE = [
    {
        title: "College Students",
        subtitle: "& Freshers",
        description:
            "BCA, B.Tech, BSc, BBA and commerce graduates who want a career, not just a degree.",
    },
    {
        title: "Working",
        subtitle: "Professionals",
        description:
            "Marketers, analysts, engineers and managers who need AI skills to stay relevant.",
    },
    {
        title: "Business",
        subtitle: "Owners",
        description:
            "Shop owners, agency founders and entrepreneurs who want AI to save time and grow revenue.",
    },
    {
        title: "Career",
        subtitle: "Changers",
        description:
            "Anyone ready to move into data, AI or digital marketing from a different field.",
    },
];

const OUR_PROGRAMS = [
    {
        key: "short-term",
        label: "Short-Term Courses",
        subtitle: "4–6 weeks · Beginner-friendly · Fee fully adjustable if you upgrade within 60 days",
        courses: "AI Tools Mastery · Python Programming Foundation · Generative AI & Prompt Engineering",
    },
    {
        key: "professional",
        label: "Professional Certificates",
        subtitle: "3–4 months · Portfolio + career services · No-cost EMI",
        courses: "Digital Marketing with AI · Python for Data Analytics · Applied Machine Learning",
    },
    {
        key: "career",
        label: "Career Programs",
        subtitle: "6–9 months · Full career services · Lifetime re-attendance · No-cost EMI",
        courses: "Advanced Diploma in AI & ML · AI-Powered Digital Marketing · Data Science & AI Career Track",
    },
];

const PLACEMENT_SUPPORT = [
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
        ),
        title: "Dedicated Placement Coordinator",
        description: "Whose only job is getting you hired.",
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
            </svg>
        ),
        title: "Hiring Partner Network",
        description: "Growing across Lucknow, Noida, Gurgaon and remote-first startups.",
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
        ),
        title: "Quarterly Placement Drives",
        description: "On-campus drives with multiple companies.",
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
        ),
        title: "Alumni Referral Programme",
        description: "Our graduates bring opportunities back.",
    },
];

const TEAM = [
    {
        name: "Dr. Sarah Mitchell",
        role: "Deep Learning & Neural Architecture",
        bio: "Former MIT professor with 15 years of experience in deep learning research. Leads curriculum design at AI Excellence Academy.",
        gradient: "from-violet to-lime",
    },
    {
        name: "Dr. James Chen",
        role: "Machine Learning Systems",
        bio: "PhD in ML from Stanford. Previously at Google Brain, building production-grade ML systems and training engineers worldwide.",
        gradient: "from-lime to-violet",
    },
    {
        name: "Alex Rivera",
        role: "MLOps & Cloud Infrastructure",
        bio: "Former ML Platform Lead at a FAANG company. Expert in deploying, monitoring, and scaling ML systems.",
        gradient: "from-success to-lime",
    },
];

function Initials({ name, gradient }) {
    const initials = name
        .split(" ")
        .filter((_, i, arr) => i === 0 || i === arr.length - 1)
        .map((n) => n[0])
        .join("");
    return (
        <div
            className={`mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${gradient}`}
        >
            <span className="text-2xl font-display font-bold text-black/80">
                {initials}
            </span>
        </div>
    );
}

export default function About() {
    return (
        <PublicLayout>
            {/* ═══════════════ HERO BANNER ═══════════════ */}
            <section className="relative overflow-hidden bg-ink ">
                {/* Decorative orbs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-32 left-[8%] w-[520px] h-[300px] rounded-full bg-violet/[0.07] blur-[120px]" />
                    <div className="absolute top-[30%] right-[5%] w-[420px] h-[250px] rounded-full bg-lime/[0.06] blur-[110px]" />
                    <div className="absolute -bottom-20 left-[35%] w-[350px] h-[200px] rounded-full bg-violet/[0.04] blur-[100px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-[1240px] px-6 pt-[150px] pb-16 max-lg:pt-[56px] text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-white/15 backdrop-blur-sm mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet" />
                        </span>
                        <span className="font-mono text-[11px] text-violet uppercase tracking-wider">
                            AI Excellence Academy
                        </span>
                    </div>

                    <h1 className="font-display text-[clamp(2.1rem,3.8vw,3.2rem)] font-bold tracking-[-0.035em] leading-[1.08] text-white max-w-4xl mx-auto">
                        <span className="bg-[linear-gradient(90deg,#eec369,#982cdc)] bg-clip-text text-transparent">
                            Built in Lucknow,
                        </span>
                        <br className="hidden sm:block" />
                        <span className="text-black">
                            {" "}for Lucknow's AI Talent
                        </span>
                    </h1>

                    <p className="text-black/85 text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
                        AI Excellence Academy was founded on a simple observation: Lucknow has thousands of bright students and ambitious professionals, but the training available to them is either outdated, certificate-only, or priced for metro cities.
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3 justify-center">
                        <Link href="/courses" className="rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(152,44,220,.45)] hover:shadow-[0_10px_28px_rgba(152,44,220,.6)] hover:-translate-y-0.5 transition-all duration-300">
                            Explore Courses
                        </Link>
                        <Link href="/contact" className="rounded-full bg-black/10 border border-black/20 px-7 py-3.5 text-sm font-semibold text-black backdrop-blur-sm hover:bg-black/20 hover:-translate-y-0.5 transition-all duration-300">
                            Visit Our Campus
                        </Link>
                    </div>
                </div>

                {/* ═══════════════ IMAGE + FLOATING STAT BAR ═══════════════ */}
                <div className="relative z-[1] mt-8">
                    {/* Image */}
                    <img
                        src="/assets/images/team-1.webp"
                        alt="The AI Excellence Academy team"
                        loading="eager"
                        className="w-full h-[300px] sm:h-[340px] lg:h-[360px] object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,13,13,0.55)_0%,rgba(7,13,13,0)_40%,rgba(7,13,13,0)_70%,rgba(7,13,13,0.4)_100%)]" />

                    {/* Stat Bar — floats over the top of the image */}
                    <div className="absolute inset-x-0 top-6 sm:top-8 z-20 border-t border-white/10 bg-[#0b1212]/40 backdrop-blur-sm">
                        <div className="mx-auto max-w-[1240px] px-6 grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/[0.08]">
                            <div className="flex flex-col items-center justify-center gap-1 py-6 px-4 text-center">
                                <span className="text-xs text-white/60 font-medium uppercase tracking-wider">Location</span>
                                <span className="text-lg font-bold text-white">Gomti Nagar, Lucknow</span>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1 py-6 px-4 text-center">
                                <span className="text-xs text-white/60 font-medium uppercase tracking-wider">Workstations</span>
                                <span className="text-lg font-bold text-white">25</span>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1 py-6 px-4 text-center">
                                <span className="text-xs text-white/60 font-medium uppercase tracking-wider">Batch Size</span>
                                <span className="text-lg font-bold text-white">20–25 max</span>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1 py-6 px-4 text-center">
                                <span className="text-xs text-white/60 font-medium uppercase tracking-wider">Lab Hours</span>
                                <span className="text-lg font-bold text-white">10 AM – 7 PM</span>
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
                        <EyeBrow color="violet">WHAT WE BELIEVE_</EyeBrow>
                        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold text-body">
                            Our Principles
                        </h2>
                        <p className="text-muted text-lg mt-4 max-w-xl mx-auto">
                            The three beliefs that shape how we teach, mentor,
                            and place every single learner.
                        </p>
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
                                            className="w-6 h-6 text-violet"
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
                                <span className="inline-flex items-center gap-2 font-display font-semibold text-violet text-sm">
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
                            <EyeBrow color="violet">OUR CAMPUS_</EyeBrow>
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
                                            className="w-5 h-5 text-violet mb-3"
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
                                            <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-lime/10 text-violet border border-lime/20">
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
