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

const PARTNER_BENEFITS = [
    'Batches of 50\u2013200 students',
    'Training letters, project reports, viva support',
    'Stamped certificates included',
    'Faculty seats and referral arrangements',
];

const PROGRAMMES = [
    {
        id: 'college',
        tag: 'FOR COLLEGES',
        title: 'College Partnerships \u2014 AKTU Summer & Winter Training',
        description:
            'We partner directly with Training & Placement cells to deliver compliant, high-quality industrial training on your campus or at ours.',
        points: [
            'Tracks: AI/ML, Python, Data Science, Digital Marketing with AI',
            'Batches of 50\u2013200 students',
            'Training letters, project reports, viva support and stamped certificates included',
            'Faculty seats and referral arrangements available for partner institutions',
        ],
        ctaLabel: 'Request a Partnership Proposal',
        ctaHref: '/contact',
        accent: 'lime',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
            </svg>
        ),
    },
    {
        id: 'faculty',
        tag: 'FOR FACULTY',
        title: 'Faculty Development Programmes',
        description:
            'A 5-day intensive AI programme designed for college teachers who need to bring AI into their classrooms and research. Hands-on, practical and tailored to your department.',
        points: [],
        ctaLabel: 'Contact Us',
        ctaHref: '/contact',
        accent: 'violet',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5m-4.25-11.396c.251.023.501.05.75.082M5 14.5l-.94 2.06a2.25 2.25 0 002.039 3.19h9.822a2.25 2.25 0 002.039-3.19L19 14.5m-14 0h14" />
            </svg>
        ),
    },
    {
        id: 'corporate',
        tag: 'FOR CORPORATES',
        title: 'Corporate Training',
        description:
            'AI adoption programmes for businesses, banks, hospitals, agencies and professional firms. From half-day leadership sessions to multi-week team upskilling \u2014 scoped to your workflows, delivered at your premises or ours.',
        points: [],
        ctaLabel: 'Talk to Our Corporate Team',
        ctaHref: '/contact',
        accent: 'lime',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
        ),
    },
    {
        id: 'school',
        tag: 'FOR SCHOOLS',
        title: 'School Workshops \u2014 AI Literacy for Classes 9\u201312',
        description:
            'Two-day, age-appropriate AI literacy workshops that teach students to use AI responsibly for learning, creativity and careers.',
        points: [],
        ctaLabel: 'See Upcoming Workshops',
        ctaHref: '/contact',
        accent: 'violet',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
        ),
    },
    {
        id: 'weekend',
        tag: 'OPEN TO ALL',
        title: 'Weekend AI Workshops',
        description:
            'One-day paid seminars on practical AI topics. A great way to experience our teaching before you commit to a course.',
        points: [],
        ctaLabel: 'See Upcoming Workshops',
        ctaHref: '/contact',
        accent: 'lime',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
        ),
    },
];

export default function Programmes() {
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
                                            d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                                        />
                                    </svg>
                                    Programmes
                                </span>
                            </li>
                        </ol>

                        <span
                            aria-hidden="true"
                            className="hidden sm:inline-block font-mono text-[11px] tracking-wide text-muted/60 select-none"
                        >
                            ~/programmes
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
                                For Colleges, Corporates &amp; Schools
                            </span>
                        </div>

                        <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-body">
                            Programmes{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-lime">
                                    Beyond the Classroom
                                </span>
                                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-lime/30 rounded-full" />
                            </span>
                        </h1>

                        <p className="text-muted text-lg mt-7 max-w-2xl mx-auto leading-relaxed">
                            From college partnerships and faculty development to corporate
                            training and school workshops &mdash; we build customised AI
                            programmes for every institution.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            <Button href="/contact">Request a Partnership Proposal</Button>
                            <Button variant="secondary" href="/courses">
                                View Courses
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ PROGRAMME CARDS ═══════════════ */}
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
                    <div className="space-y-8">
                        {PROGRAMMES.map((prog, i) => (
                            <div
                                key={prog.id}
                                className={`relative bg-white border border-black/5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,.03)] overflow-hidden hover:border-black/[0.18] transition-all duration-[220ms] ${
                                    i % 2 === 0 ? '' : ''
                                }`}
                            >
                                {/* Accent top bar */}
                                <div
                                    className={`h-1 ${
                                        prog.accent === 'lime'
                                            ? 'bg-gradient-to-r from-lime/60 to-lime/20'
                                            : 'bg-gradient-to-r from-violet/60 to-violet/20'
                                    }`}
                                />

                                <div className="p-8 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
                                    {/* Left — info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-5">
                                            <div
                                                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                                                    prog.accent === 'lime'
                                                        ? 'bg-lime/10 border border-lime/20 text-lime'
                                                        : 'bg-violet/10 border border-violet/20 text-violet'
                                                }`}
                                            >
                                                {prog.icon}
                                            </div>
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider ${
                                                    prog.accent === 'lime'
                                                        ? 'bg-lime/10 text-lime border border-lime/20'
                                                        : 'bg-violet/10 text-violet border border-violet/20'
                                                }`}
                                            >
                                                {prog.tag}
                                            </span>
                                        </div>

                                        <h2 className="font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold text-body mb-4">
                                            {prog.title}
                                        </h2>

                                        <p className="text-muted leading-relaxed text-[15px] mb-6">
                                            {prog.description}
                                        </p>

                                        {prog.points.length > 0 && (
                                            <ul className="space-y-2.5 mb-6">
                                                {prog.points.map((point) => (
                                                    <li
                                                        key={point}
                                                        className="flex items-start gap-2.5 text-sm text-body/80"
                                                    >
                                                        <svg
                                                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                                                                prog.accent === 'lime' ? 'text-lime' : 'text-violet'
                                                            }`}
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
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <Button href={prog.ctaHref} variant={prog.accent === 'violet' ? 'primary' : 'secondary'}>
                                            {prog.ctaLabel}
                                        </Button>
                                    </div>

                                    {/* Right — visual */}
                                    <div className="flex-1 max-w-sm lg:max-w-none">
                                        <div
                                            className={`relative rounded-2xl border p-8 h-full flex flex-col justify-center ${
                                                prog.accent === 'lime'
                                                    ? 'bg-lime/[0.03] border-lime/15'
                                                    : 'bg-violet/[0.03] border-violet/15'
                                            }`}
                                        >
                                            <div className="text-center">
                                                <div
                                                    className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                                                        prog.accent === 'lime'
                                                            ? 'bg-lime/10 text-lime'
                                                            : 'bg-violet/10 text-violet'
                                                    }`}
                                                >
                                                    {prog.icon}
                                                </div>
                                                <p className="font-display font-semibold text-body text-lg">
                                                    {prog.tag}
                                                </p>
                                                <p className="text-muted text-sm mt-2">
                                                    {prog.title.split(' \u2014 ')[0]}
                                                </p>
                                                <div className="mt-5 flex items-center justify-center gap-2">
                                                    <span
                                                        className={`font-mono text-xs px-3 py-1.5 rounded-full border ${
                                                            prog.accent === 'lime'
                                                                ? 'bg-lime/10 text-lime border-lime/20'
                                                                : 'bg-violet/10 text-violet border-violet/20'
                                                        }`}
                                                    >
                                                        Contact for details
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                        Let&apos;s Build a Programme
                        <br />
                        for Your Institution
                    </h2>
                    <p className="text-muted text-lg mt-4 max-w-lg mx-auto">
                        Whether you&apos;re a college, corporate, school, or individual
                        &mdash; we&apos;ll design a training plan that fits your needs.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <Button href="/contact">Get in Touch</Button>
                        <Button variant="secondary" href="/courses">
                            Browse Courses
                        </Button>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
