import { Link } from '@inertiajs/react';
import PublicLayout from '../Layouts/PublicLayout';
import Button from '../Components/ui/Button';

function EyeBrow({ children, color = 'violet' }) {
    return (
        <p className={`font-mono text-xs uppercase tracking-[0.08em] text-${color} mb-3`}>
            {children}
        </p>
    );
}

const TIER_ROWS = [
    {
        service: 'Certificate of completion',
        short: true,
        professional: true,
        career: true,
    },
    {
        service: 'GitHub / portfolio setup',
        short: false,
        professional: true,
        career: true,
    },
    {
        service: 'ATS resume building (1-on-1)',
        short: false,
        professional: true,
        career: true,
    },
    {
        service: 'LinkedIn profile optimisation',
        short: false,
        professional: true,
        career: true,
    },
    {
        service: 'Mock interviews',
        short: '2 sessions',
        professional: '5+ sessions',
        career: '5+ sessions',
    },
    {
        service: 'Aptitude & communication training',
        short: false,
        professional: false,
        career: '20 hrs',
    },
    {
        service: 'Job referrals to hiring partners',
        short: false,
        professional: true,
        career: 'Priority',
    },
    {
        service: 'Internship placement',
        short: false,
        professional: false,
        career: 'Career Track',
    },
    {
        service: 'Lifetime re-attendance',
        short: true,
        professional: true,
        career: true,
    },
];

const RESUME_STEPS = [
    {
        number: '01',
        title: 'ATS Mechanics',
        description:
            'Why most resumes are auto-rejected, and how to format and keyword-map yours to pass.',
    },
    {
        number: '02',
        title: 'The Fresher Problem',
        description:
            'Filling a resume with zero work experience using projects, freelance work and college activity.',
    },
    {
        number: '03',
        title: 'Project Write-Ups That Land',
        description:
            '\u201cBuilt a churn prediction model on 50k records achieving 87% accuracy, deployed via Streamlit\u201d instead of \u201cMade an ML project.\u201d',
    },
    {
        number: '04',
        title: '1-on-1 Rebuild Session',
        description:
            'Your trainer sits with you personally, not a template handout.',
    },
    {
        number: '05',
        title: 'Three Tailored Variants',
        description:
            'One each for AI/ML, data analyst and general IT roles.',
    },
    {
        number: '06',
        title: 'LinkedIn + GitHub',
        description:
            'Headline, About section, pinned repos, README writing.',
    },
];

const PLACEMENT_ENGINE = [
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
        ),
        title: 'Dedicated Placement Coordinator',
        description: 'Whose only job is getting you hired.',
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
            </svg>
        ),
        title: 'Hiring Partner Network',
        description: 'Growing across Lucknow, Noida, Gurgaon and remote-first startups.',
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
        ),
        title: 'Quarterly Placement Drives',
        description: 'On-campus drives with multiple companies.',
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
        ),
        title: 'Alumni Referral Programme',
        description: 'Our graduates bring opportunities back.',
    },
];

function Check() {
    return (
        <svg className="w-4 h-4 text-lime mx-auto" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    );
}

function Dash() {
    return <span className="text-black/15 mx-auto">&mdash;</span>;
}

function CellValue({ value }) {
    if (value === true) return <Check />;
    if (value === false) return <Dash />;
    return (
        <span className="text-[13px] font-medium text-violet mx-auto whitespace-nowrap">
            {value}
        </span>
    );
}

export default function Career() {
    return (
        <PublicLayout>
            {/* ═══════════════ BREADCRUMB BANNER ═══════════════ */}
            <section className="relative overflow-hidden bg-[#F5F5F2]">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 left-[10%] w-[440px] h-[260px] rounded-full bg-violet/[0.07] blur-[110px]" />
                    <div className="absolute -bottom-28 right-[6%] w-[400px] h-[240px] rounded-full bg-lime/[0.05] blur-[110px]" />
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '28px 28px',
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
                                            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                                        />
                                    </svg>
                                    Career
                                </span>
                            </li>
                        </ol>

                        <span
                            aria-hidden="true"
                            className="hidden sm:inline-block font-mono text-[11px] tracking-wide text-muted/60 select-none"
                        >
                            ~/career
                            <span className="animate-pulse text-lime">_</span>
                        </span>
                    </div>
                </nav>

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
                                'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '32px 32px',
                        }}
                    />
                </div>

                <div className="relative z-10 mx-auto max-w-[1240px] px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime/[0.08] border border-lime/20 mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
                            </span>
                            <span className="font-mono text-xs text-lime uppercase tracking-wider">
                                Career Services &amp; Placements
                            </span>
                        </div>

                        <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-body">
                            Structured Placement{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-lime">
                                    Assistance
                                </span>
                                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-lime/30 rounded-full" />
                            </span>
                            <br />
                            <span className="text-body/40 text-[clamp(1.25rem,2.5vw,2rem)] font-medium">
                                a process, not a promise
                            </span>
                        </h1>

                        <p className="text-muted text-lg mt-7 max-w-2xl mx-auto leading-relaxed">
                            We do not advertise &ldquo;100% placement guarantee.&rdquo;
                            Nobody can honestly make that promise. What we offer instead is
                            a structured system, a dedicated team, and published results.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            <Button href="/contact">Talk to Our Team</Button>
                            <Button variant="secondary" href="/courses">
                                Explore Programs
                            </Button>
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
                            'radial-gradient(circle, white 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />
                <div className="relative max-w-[1240px] mx-auto px-6 py-[120px] max-lg:py-[72px]">
                    <div className="text-center mb-16">
                        <EyeBrow color="lime">WHAT'S INCLUDED_</EyeBrow>
                        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold text-body">
                            By Program Tier
                        </h2>
                    </div>

                    {/* Desktop table */}
                    <div className="hidden md:block bg-white border border-black/5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,.03)] overflow-hidden">
                        {/* Header */}
                        <div className="grid grid-cols-4 border-b border-black/[0.08]">
                            <div className="px-6 py-4 font-mono text-xs uppercase tracking-wider text-muted">
                                Service
                            </div>
                            <div className="px-6 py-4 text-center border-l border-black/[0.08]">
                                <span className="inline-flex items-center gap-2 font-display font-semibold text-sm text-muted">
                                    Short-Term
                                </span>
                            </div>
                            <div className="px-6 py-4 text-center bg-violet/[0.03] border-l border-black/[0.08]">
                                <span className="inline-flex items-center gap-2 font-display font-semibold text-sm text-violet">
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
                                    Professional
                                </span>
                            </div>
                            <div className="px-6 py-4 text-center bg-lime/[0.03] border-l border-black/[0.08]">
                                <span className="inline-flex items-center gap-2 font-display font-semibold text-sm text-lime">
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
                                            d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0116.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.015 6.015 0 01-1.77.857m0 0a6.015 6.015 0 01-1.77-.857m0 0c-.262.212-.542.4-.833.562" />
                                    </svg>
                                    Career
                                </span>
                            </div>
                        </div>

                        {/* Rows */}
                        {TIER_ROWS.map((row, i) => (
                            <div
                                key={row.service}
                                className={`grid grid-cols-4 ${i < TIER_ROWS.length - 1 ? 'border-b border-black/[0.06]' : ''}`}
                            >
                                <div className="px-6 py-5 font-mono text-sm text-muted">
                                    {row.service}
                                </div>
                                <div className="px-6 py-5 border-l border-black/[0.08]">
                                    <CellValue value={row.short} />
                                </div>
                                <div className="px-6 py-5 bg-violet/[0.02] border-l border-black/[0.08]">
                                    <CellValue value={row.professional} />
                                </div>
                                <div className="px-6 py-5 bg-lime/[0.02] border-l border-black/[0.08]">
                                    <CellValue value={row.career} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile cards */}
                    <div className="md:hidden space-y-4">
                        {TIER_ROWS.map((row) => (
                            <div
                                key={row.service}
                                className="bg-white border border-black/5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,.03)] p-5"
                            >
                                <p className="font-mono text-xs uppercase tracking-wider text-muted mb-3">
                                    {row.service}
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted">Short-Term</span>
                                        <CellValue value={row.short} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-violet font-medium">Professional</span>
                                        <CellValue value={row.professional} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-lime font-medium">Career</span>
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
                <div className="max-w-[1240px] mx-auto px-6 py-[120px] max-lg:py-[72px]">
                    <div className="text-center mb-16">
                        <EyeBrow>THE RESUME MODULE_</EyeBrow>
                        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold text-body">
                            6 Structured Hours That
                            <br className="max-lg:hidden" />
                            Transform Your Resume
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {RESUME_STEPS.map((step) => (
                            <div
                                key={step.number}
                                className="relative bg-white border border-black/5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,.03)] p-7 hover:border-black/[0.18] hover:-translate-y-0.5 transition-all duration-[220ms]"
                            >
                                <span className="font-mono text-3xl font-bold text-black/[0.06] absolute top-5 right-6">
                                    {step.number}
                                </span>
                                <div className="w-10 h-10 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center mb-5">
                                    <span className="font-mono text-sm font-bold text-violet">
                                        {step.number}
                                    </span>
                                </div>
                                <h3 className="font-display text-lg font-semibold text-body mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-muted leading-relaxed text-sm">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ PLACEMENT ENGINE ═══════════════ */}
            <section className="relative">
                <div className="max-w-[1240px] mx-auto px-6 py-[120px] max-lg:py-[72px]">
                    <div className="text-center mb-16">
                        <EyeBrow color="lime">HOW IT WORKS_</EyeBrow>
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
                                <div className="w-11 h-11 rounded-xl bg-lime/10 border border-lime/20 flex items-center justify-center shrink-0 text-lime">
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
                        <div className="bg-white border border-lime/20 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,.03)] p-8 text-center">
                            <div className="w-12 h-12 rounded-xl bg-lime/10 border border-lime/20 flex items-center justify-center mx-auto mb-4 text-lime">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-display text-lg font-semibold text-body mb-2">
                                Eligibility
                            </h3>
                            <p className="text-muted leading-relaxed">
                                Students with <span className="font-semibold text-body">75% or higher attendance</span> are
                                eligible for placement assistance. We set this bar because
                                showing up is what makes everything else work.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ RESULTS PLACEHOLDER ═══════════════ */}
            <section className="bg-[#F5F5F2]">
                <div className="max-w-[1240px] mx-auto px-6 py-[120px] max-lg:py-[72px]">
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
                                    { label: 'Students Enrolled', value: '---' },
                                    { label: 'Students Placed', value: '---' },
                                    { label: 'Median Package', value: '---' },
                                    { label: 'Hiring Companies', value: '---' },
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
                                    Real numbers will be published here after each batch:
                                    students enrolled, students placed, median package,
                                    hiring companies, and named student stories. Updated every
                                    quarter.
                                </p>
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
                            'radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)',
                        backgroundSize: '22px 22px',
                    }}
                />
                <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-[120px] max-lg:py-[72px] text-center">
                    <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold text-body leading-tight">
                        Ready to Start Your
                        <br />
                        Career in AI?
                    </h2>
                    <p className="text-muted text-lg mt-4 max-w-lg mx-auto">
                        Enrol in a program and get access to our structured placement
                        assistance, resume building, and hiring partner network.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <Button href="/courses">Explore Programs</Button>
                        <Button variant="secondary" href="/contact">
                            Talk to Our Team
                        </Button>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
