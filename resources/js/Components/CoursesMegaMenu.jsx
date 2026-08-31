import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Zap, Award, Rocket, ChevronRight, BookOpen, Clock, Users } from 'lucide-react';

const tabs = [
    {
        id: 'short-term',
        label: 'Short-Term Courses',
        subtitle: 'Start Fast',
        icon: Zap,
        courses: [
            {
                name: 'AI Tools Mastery',
                tagline: 'Work Smarter with AI',
                href: '/courses',
                icon: BookOpen,
            },
            {
                name: 'Python Programming Foundation',
                tagline: 'Build Your Coding Base',
                href: '/courses',
                icon: Code,
            },
            {
                name: 'Generative AI & Prompt Engineering',
                tagline: 'Master the AI Revolution',
                href: '/courses',
                icon: Sparkles,
            },
            {
                name: 'AI for Business Owners & Professionals',
                tagline: 'Weekend Batch',
                href: '/courses',
                icon: Users,
            },
            {
                name: 'Summer / Winter Training',
                tagline: 'AKTU-Compliant',
                href: '/courses',
                icon: Clock,
            },
        ],
    },
    {
        id: 'professional',
        label: 'Professional Certificates',
        subtitle: 'Build a Skill Employers Pay For',
        icon: Award,
        courses: [
            {
                name: 'Digital Marketing with AI',
                tagline: 'Professional',
                href: '/courses',
                icon: TrendingUp,
            },
            {
                name: 'Python for Data Analytics',
                tagline: 'Data-Driven Decisions',
                href: '/courses',
                icon: BarChart3,
            },
            {
                name: 'Applied Machine Learning',
                tagline: 'From Theory to Production',
                href: '/courses',
                icon: Brain,
            },
        ],
    },
    {
        id: 'career',
        label: 'Career Programs',
        subtitle: 'Our Flagship, Placement-Backed Tracks',
        icon: Rocket,
        courses: [
            {
                name: 'Advanced Diploma in AI & Machine Learning',
                tagline: 'Placement-Backed',
                href: '/courses',
                icon: GraduationCap,
            },
            {
                name: 'AI-Powered Digital Marketing Specialist',
                tagline: 'Industry-Ready Program',
                href: '/courses',
                icon: Megaphone,
            },
            {
                name: 'Data Science & AI Career Track',
                tagline: 'With Internship',
                href: '/courses',
                icon: LineChart,
            },
        ],
    },
];

function Code(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    );
}

function Sparkles(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M19 17v4" />
            <path d="M3 5h4" />
            <path d="M17 19h4" />
        </svg>
    );
}

function TrendingUp(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
        </svg>
    );
}

function BarChart3(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
        </svg>
    );
}

function Brain(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
            <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
            <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
            <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
            <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
            <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
            <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
            <path d="M6 18a4 4 0 0 1-1.967-.516" />
            <path d="M19.967 17.484A4 4 0 0 1 18 18" />
        </svg>
    );
}

function GraduationCap(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
            <path d="M22 10v6" />
            <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
        </svg>
    );
}

function Megaphone(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m3 11 18-5v12L3 13v-2z" />
            <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
        </svg>
    );
}

function LineChart(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M3 3v18h18" />
            <path d="m19 9-5 5-4-4-3 3" />
        </svg>
    );
}

export default function CoursesMegaMenu({ onMobileNavigate }) {
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const [isHovered, setIsHovered] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileAccordionTab, setMobileAccordionTab] = useState(null);

    const activeTabData = tabs.find((t) => t.id === activeTab);

    function handleMobileNavigate() {
        setMobileOpen(false);
        if (onMobileNavigate) onMobileNavigate();
    }

    return (
        <>
            {/* Desktop Mega Menu */}
            <div
                className="relative hidden md:block"
                onMouseEnter={() => { setIsHovered(true); setMobileOpen(false); }}
                onMouseLeave={() => setIsHovered(false)}
            >
                <button
                    className={`relative rounded-full px-4 py-2 text-[16px] font-medium tracking-[-0.01em] transition-colors duration-200 ${
                        isHovered ? 'text-black' : 'text-black/55 hover:text-black'
                    }`}
                >
                    Courses
                    <span
                        className={`absolute inset-x-4 bottom-0 h-[2px] rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] transition-all duration-300 ${
                            isHovered ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                        }`}
                    />
                </button>

                {isHovered && (
                    <div className="absolute left-1/2 top-full z-50 mt-0 w-[680px] -translate-x-1/2 animate-menu-pop overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_30px_70px_-20px_rgba(15,22,22,0.35)]">
                        <div className="flex">
                            {/* Left Column — Tabs */}
                            <div className="w-[260px] shrink-0 border-r border-black/[0.06] bg-black/[0.02] p-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onMouseEnter={() => setActiveTab(tab.id)}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`group flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                                                isActive
                                                    ? 'bg-white shadow-[0_2px_12px_-4px_rgba(152,44,220,0.15)]'
                                                    : 'hover:bg-white/60'
                                            }`}
                                        >
                                            <span
                                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                                                    isActive
                                                        ? 'bg-[linear-gradient(60deg,#982cdc,#eec369)] text-white'
                                                        : 'bg-black/[0.06] text-black/40 group-hover:bg-black/[0.1] group-hover:text-black/60'
                                                }`}
                                            >
                                                <Icon className="h-4 w-4" />
                                            </span>
                                            <div className="min-w-0 pt-0.5">
                                                <p
                                                    className={`text-[13.5px] font-semibold leading-tight transition-colors ${
                                                        isActive ? 'text-black' : 'text-black/70'
                                                    }`}
                                                >
                                                    {tab.label}
                                                </p>
                                                <p className="mt-0.5 text-[11.5px] text-black/40 leading-tight">
                                                    {tab.subtitle}
                                                </p>
                                            </div>
                                            <ChevronRight
                                                className={`ml-auto mt-1 h-3.5 w-3.5 shrink-0 transition-all duration-200 ${
                                                    isActive
                                                        ? 'translate-x-0 opacity-100 text-[#982cdc]'
                                                        : '-translate-x-1 opacity-0'
                                                }`}
                                            />
                                        </button>
                                    );
                                })}

                                <div className="mx-3 my-2 border-t border-black/[0.06]" />
                                <Link
                                    href="/courses"
                                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13px] font-medium text-black/50 transition-colors hover:bg-white/60 hover:text-black"
                                    onClick={() => setIsHovered(false)}
                                >
                                    View all courses
                                    <ChevronRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>

                            {/* Right Column — Courses */}
                            <div className="flex-1 p-3">
                                <div className="mb-2 flex items-center justify-between px-1">
                                    <p className="text-[11.5px] font-semibold uppercase tracking-wider text-black/30">
                                        {activeTabData?.label}
                                    </p>
                                </div>
                                <div className="space-y-0.5">
                                    {activeTabData?.courses.map((course) => {
                                        const CourseIcon = course.icon;
                                        return (
                                            <Link
                                                key={course.name}
                                                href={course.href}
                                                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-[linear-gradient(60deg,#982cdc,#eec369)]/5"
                                                onClick={() => setIsHovered(false)}
                                            >
                                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/[0.04] text-black/35 transition-all duration-200 group-hover:bg-[linear-gradient(60deg,#982cdc,#eec369)] group-hover:text-white">
                                                    <CourseIcon className="h-4 w-4" />
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-[13.5px] font-medium text-black/80 transition-colors group-hover:text-black">
                                                        {course.name}
                                                    </p>
                                                    <p className="text-[11.5px] text-black/35 transition-colors group-hover:text-black/50">
                                                        {course.tagline}
                                                    </p>
                                                </div>
                                                <ChevronRight className="h-4 w-4 shrink-0 text-black/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#982cdc]" />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile — Expandable accordion under Courses */}
            <div className="md:hidden">
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className={`group flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium transition-colors ${
                        mobileOpen
                            ? 'bg-[linear-gradient(60deg,#982cdc,#eec369)] bg-clip-text text-transparent'
                            : 'text-black/65 hover:bg-black/[0.04] hover:text-black'
                    }`}
                >
                    <span>Courses</span>
                    <svg
                        className={`h-4 w-4 transition-transform duration-200 ${mobileOpen ? 'rotate-180 text-[#982cdc]' : 'text-black/25'}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>

                {mobileOpen && (
                    <div className="ml-2 mt-1 space-y-1 border-l-2 border-black/[0.06] pl-3">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isOpen = mobileAccordionTab === tab.id;
                            return (
                                <div key={tab.id}>
                                    <button
                                        onClick={() => setMobileAccordionTab(isOpen ? null : tab.id)}
                                        className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[14px] font-medium transition-colors ${
                                            isOpen
                                                ? 'bg-[linear-gradient(60deg,#982cdc10,#eec36910)] text-black'
                                                : 'text-black/55 hover:bg-black/[0.04] hover:text-black/75'
                                        }`}
                                    >
                                        <Icon className="h-4 w-4 shrink-0 text-[#982cdc]/60" />
                                        <span className="flex-1">{tab.label}</span>
                                        <svg
                                            className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>

                                    {isOpen && (
                                        <div className="ml-4 mt-0.5 space-y-0.5 border-l border-black/[0.05] pl-3">
                                            {tab.courses.map((course) => (
                                                <Link
                                                    key={course.name}
                                                    href={course.href}
                                                    className="flex flex-col rounded-xl px-3 py-2.5 text-black/55 transition-colors hover:bg-black/[0.04] hover:text-black"
                                                    onClick={handleMobileNavigate}
                                                >
                                                    <span className="text-[13.5px] font-medium">{course.name}</span>
                                                    <span className="text-[11.5px] text-black/35">{course.tagline}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        <Link
                            href="/courses"
                            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13.5px] font-medium text-[#982cdc]/70 transition-colors hover:text-[#982cdc]"
                            onClick={handleMobileNavigate}
                        >
                            View all courses
                            <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
