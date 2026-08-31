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
            {/* ═══════════════ HERO BANNER ═══════════════ */}
            <section className="relative overflow-hidden bg-ink">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-32 left-[8%] w-[520px] h-[300px] rounded-full bg-violet/[0.07] blur-[120px]" />
                    <div className="absolute top-[30%] right-[5%] w-[420px] h-[250px] rounded-full bg-lime/[0.06] blur-[110px]" />
                    <div className="absolute -bottom-20 left-[35%] w-[350px] h-[200px] rounded-full bg-violet/[0.04] blur-[100px]" />
                </div>

                <div className="relative z-10 mx-auto max-w-[1240px] px-6 pt-[48px] pb-14 max-lg:pt-[48px]">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet/[0.07] border border-violet/15 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet" />
                        </span>
                        <span className="font-mono text-[11px] text-violet uppercase tracking-wider">
                            For Colleges, Corporates &amp; Schools
                        </span>
                    </div>

                    <h1 className="font-display text-[clamp(2.1rem,3.8vw,3.2rem)] font-bold tracking-[-0.035em] leading-[1.08]">
                        <span className="text-black">
                            Programmes{" "}
                        </span>
                        <span className="bg-[linear-gradient(90deg,#eec369,#982cdc)] bg-clip-text text-transparent">
                            Beyond the Classroom
                        </span>
                    </h1>

                    <p className="text-muted text-lg mt-5 max-w-xl leading-relaxed">
                        From college partnerships and faculty development to corporate
                        training and school workshops &mdash; we build customised AI
                        programmes for every institution.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/contact" className="rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(152,44,220,.25)] hover:shadow-[0_10px_28px_rgba(152,44,220,.38)] hover:-translate-y-0.5 transition-all duration-300">
                            Request a Partnership Proposal
                        </Link>
                        <Link href="/courses" className="rounded-full bg-surface px-7 py-3.5 text-sm font-semibold text-white hover:bg-surface/80 hover:-translate-y-0.5 transition-all duration-300">
                            View Courses
                        </Link>
                    </div>
                </div>

                {/* Stat Bar */}
                {/* <div className="border-y border-black/[0.06] bg-white/80 backdrop-blur-sm">
                    <div className="mx-auto max-w-[1240px] px-6 grid grid-cols-2 sm:grid-cols-4 divide-x divide-black/[0.08]">
                        <div className="flex flex-col items-center justify-center gap-1 py-5 px-4 text-center">
                            <span className="text-xs text-muted font-medium">Batch Size</span>
                            <span className="text-lg font-bold text-black">50–200 students</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 py-5 px-4 text-center">
                            <span className="text-xs text-muted font-medium">Certificates</span>
                            <span className="text-lg font-bold text-black">Stamped &amp; Included</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 py-5 px-4 text-center">
                            <span className="text-xs text-muted font-medium">Training Support</span>
                            <span className="text-lg font-bold text-black">Reports &amp; Viva</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 py-5 px-4 text-center">
                            <span className="text-xs text-muted font-medium">Faculty Seats</span>
                            <span className="text-lg font-bold text-black">Available for Partners</span>
                        </div>
                    </div>
                </div> */}
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
