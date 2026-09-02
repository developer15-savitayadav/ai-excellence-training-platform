import { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import PublicLayout from "../../Layouts/PublicLayout";
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
const SHORT_TERM = [
    {
        id: 1,
        title: "AI Tools Mastery",
        slug: "ai-tools-mastery",
        duration: "4 weeks",
        hours: "32 hrs",
        tagline: "Work Smarter with AI — no coding required",
        price: "Contact us",
    },
    {
        id: 2,
        title: "Python Programming Foundation",
        slug: "python-programming-foundation",
        duration: "6 weeks",
        hours: "48 hrs",
        tagline: "The one skill every AI and data career starts with",
        price: "Contact us",
    },
    {
        id: 3,
        title: "Generative AI & Prompt Engineering",
        slug: "generative-ai-prompt-engineering",
        duration: "6 weeks",
        hours: "48 hrs",
        tagline: "The most in-demand AI skill of 2026",
        price: "Contact us",
    },
    {
        id: 4,
        title: "AI for Business Owners & Professionals",
        slug: "ai-for-business",
        duration: "4 weeks",
        hours: "24 hrs",
        tagline: "Run your business smarter in four weekends",
        price: "Contact us",
        badge: "Weekend",
    },
    {
        id: 5,
        title: "Summer / Winter Training (AKTU-Compliant)",
        slug: "summer-winter-training",
        duration: "45 days",
        hours: "60 hrs",
        tagline: "Industrial training that satisfies your college",
        price: "Contact us",
        badge: "AKTU",
    },
];

const PROFESSIONAL = [
    {
        id: 6,
        title: "Digital Marketing with AI — Professional",
        slug: "digital-marketing-ai",
        duration: "3 months",
        hours: "100 hrs",
        tagline: "Learn marketing the way agencies practise it in 2026",
        price: "Contact us",
        emi: true,
    },
    {
        id: 7,
        title: "Python for Data Analytics",
        slug: "python-data-analytics",
        duration: "3 months",
        hours: "96 hrs",
        tagline: "Turn raw data into decisions",
        price: "Contact us",
        emi: true,
    },
    {
        id: 8,
        title: "Applied Machine Learning",
        slug: "applied-machine-learning",
        duration: "4 months",
        hours: "128 hrs",
        tagline: "From data to deployed model in four months",
        price: "Contact us",
        emi: true,
    },
];

const CAREER = [
    {
        id: 9,
        title: "Advanced Diploma in AI & Machine Learning",
        slug: "advanced-diploma-ai-ml",
        duration: "6 months",
        hours: "220 hrs",
        tagline:
            "Six months. Seven deployed projects. A portfolio that gets you interviews.",
        price: "Contact us",
        emi: true,
        flagship: true,
    },
    {
        id: 10,
        title: "AI-Powered Digital Marketing Specialist",
        slug: "ai-digital-marketing-specialist",
        duration: "6 months",
        hours: "200 hrs",
        tagline: "Become the marketer agencies are competing to hire",
        price: "Contact us",
        emi: true,
    },
    {
        id: 11,
        title: "Data Science & AI Career Track",
        slug: "data-science-ai-career-track",
        duration: "9 months",
        hours: "320 hrs",
        tagline:
            "Graduate with a portfolio, an internship certificate and an experience letter",
        price: "Contact us",
        emi: true,
    },
];

const BUNDLES = [
    {
        title: "Fresher Combo",
        courses: "Python Foundation + Advanced Diploma in AI & ML",
        note: "Bundled savings — contact us for pricing",
        accent: "lime",
    },
    {
        title: "Marketer Combo",
        courses: "Generative AI + Digital Marketing with AI",
        note: "Bundled savings — contact us for pricing",
        accent: "violet",
    },
];

const LEARNING_CARDS = [
    {
        num: "01",
        title: "How AI really works",
        desc: "What large language models can and cannot do",
    },
    {
        num: "02",
        title: "ChatGPT, Claude and Gemini",
        desc: "hands-on comparison and when to use which",
    },
    {
        num: "03",
        title: "Writing with AI",
        desc: "emails, applications, reports, social media",
    },
    {
        num: "04",
        title: "AI for images, video and presentations",
        desc: "Canva AI, image generators, slide decks",
    },
    {
        num: "05",
        title: "AI for study and exams",
        desc: "Notes, summaries, mock questions, doubt solving",
    },
    {
        num: "06",
        title: "AI for small business",
        desc: "invoices, catalogues, WhatsApp",
    },
];

const WHO_IT_FOR = [
    { label: "Students", img: "/assets/images/students.png", color: "dark" },
    { label: "Teachers", img: "/assets/images/teacher.png", color: "gold" },
    {
        label: "Job Seekers",
        img: "/assets/images/job-seekers.png",
        color: "gold",
    },
    {
        label: "Shop Owners",
        img: "/assets/images/shop-owners.png",
        color: "gold",
    },
    {
        label: "Home Makers",
        img: "/assets/images/home-makers.png",
        color: "light",
    },
    {
        label: "Government Exam Aspirants",
        img: "/assets/images/exam-aspirants.png",
        color: "light",
    },
];

const TOOLS = [
    "ChatGPT",
    "Claude",
    "Gemini",
    "Midjourney",
    "Canva AI",
    "Python",
    "TensorFlow",
    "LangChain",
    "Hugging Face",
    "Power BI",
];

const TIERS = [
    {
        key: "short-term",
        label: "Short-Term Courses",
        subtitle:
            "4–6 weeks · Beginner-friendly · Fee fully adjustable if you upgrade within 60 days",
        courses: SHORT_TERM,
        accent: "#34d399",
        accentBg: "bg-emerald-500",
    },
    {
        key: "professional",
        label: "Professional Certificates",
        subtitle: "3–4 months · Portfolio + career services · No-cost EMI",
        courses: PROFESSIONAL,
        accent: "#982cdc",
        accentBg: "bg-violet",
    },
    {
        key: "career",
        label: "Career Programs",
        subtitle:
            "6–9 months · Full career services · Lifetime re-attendance · No-cost EMI",
        courses: CAREER,
        accent: "#eec369",
        accentBg: "bg-lime",
    },
];

function useReveal(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { threshold },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

function RevealDiv({ children, className = "", delay = 0, ...props }) {
    const [ref, visible] = useReveal();
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
            }}
            {...props}
        >
            {children}
        </div>
    );
}

function CourseCard({ course, tierAccent }) {
    const [ref, visible] = useReveal();
    return (
        <Link
            ref={ref}
            href={`/courses/${course.slug}`}
            className="group relative flex flex-col rounded-[18px] bg-white border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden transition-all duration-400 hover:shadow-[0_16px_48px_rgba(152,44,220,0.12)] hover:-translate-y-1 hover:border-violet/20"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition:
                    "opacity 0.55s cubic-bezier(.22,1,.36,1), transform 0.55s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease, border-color 0.35s ease",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-violet/[0.03] to-lime/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative p-6 sm:p-7 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                        {course.badge && (
                            <span className="shrink-0 rounded-full bg-violet/10 px-2.5 py-1 text-[10px] font-semibold text-violet tracking-wide uppercase">
                                {course.badge}
                            </span>
                        )}
                        {course.flagship && (
                            <span className="shrink-0 rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-2.5 py-1 text-[10px] font-bold text-white tracking-wide uppercase shadow-[0_2px_8px_rgba(152,44,220,0.25)]">
                                Flagship
                            </span>
                        )}
                        {course.emi && (
                            <span className="shrink-0 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 tracking-wide">
                                No-Cost EMI
                            </span>
                        )}
                    </div>
                    <span className="shrink-0 rounded-full bg-ink border border-black/[0.06] p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5">
                        <svg
                            className="w-4 h-4 text-violet"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                        </svg>
                    </span>
                </div>

                <h3 className="font-display text-[17px] sm:text-[19px] font-bold leading-[1.2] text-black group-hover:text-violet transition-colors duration-250 mb-2">
                    {course.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-black/50 mb-5 flex-1">
                    {course.tagline}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-black/[0.05]">
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-black/55 font-medium">
                        <svg
                            className="w-3.5 h-3.5 text-violet/60"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        {course.duration}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-black/15" />
                    <span className="inline-flex items-center gap-1.5 text-[12px] text-black/55 font-medium">
                        <svg
                            className="w-3.5 h-3.5 text-violet/60"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                            />
                        </svg>
                        {course.hours}
                    </span>
                </div>
            </div>
        </Link>
    );
}

function CategorySection({ tier, index }) {
    const [ref, visible] = useReveal();
    return (
        <div
            ref={ref}
            id={tier.key}
            className="scroll-mt-28"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${index * 80}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${index * 80}ms`,
            }}
        >
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <span
                        className={`h-2.5 w-2.5 rounded-full ${tier.accentBg}`}
                    />
                    <h3 className="font-display text-[22px] sm:text-[26px] font-bold text-black tracking-[-0.02em]">
                        {tier.label}
                    </h3>
                </div>
                <p className="text-[13px] text-black/45 ml-[22px]">
                    {tier.subtitle}
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {tier.courses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        tierAccent={tier.accent}
                    />
                ))}
            </div>
        </div>
    );
}

export default function CoursesIndex() {
    const [activeTier, setActiveTier] = useState("all");
    const allCourses = [...SHORT_TERM, ...PROFESSIONAL, ...CAREER];
    const filteredTiers =
        activeTier === "all"
            ? TIERS
            : TIERS.filter((t) => t.key === activeTier);

    return (
        <PublicLayout>
            <section className="min-h-screen bg-ink">
                {/* ═══════════════ HERO ═══════════════ */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute -top-32 left-[8%] w-[520px] h-[300px] rounded-full bg-violet/[0.07] blur-[120px]" />
                        <div className="absolute top-[40%] right-[4%] w-[400px] h-[240px] rounded-full bg-lime/[0.06] blur-[110px]" />
                        <div className="absolute -bottom-20 left-[40%] w-[350px] h-[200px] rounded-full bg-violet/[0.04] blur-[100px]" />
                    </div>

                    <div className="relative z-10 mx-auto max-w-[1240px] px-6 pt-[148px] pb-12 max-lg:pt-[124px] max-lg:pb-10 text-center">
                        <RevealDiv>
                            <EyeBrow>AI Excellence Academy</EyeBrow>
                        </RevealDiv>

                        <RevealDiv delay={80}>
                            <h1 className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold tracking-[-0.035em] leading-[1.08] text-black">
                                Find the{" "}
                                <span className="bg-[linear-gradient(60deg,#982cdc,#eec369)] bg-clip-text text-transparent">
                                    right program
                                </span>
                                <br className="hidden sm:block" /> for your goal
                            </h1>
                        </RevealDiv>

                        <RevealDiv delay={160}>
                            <p className="text-muted text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
                                Whether you have four weeks or nine months,
                                whether you are a complete beginner or a working
                                professional, there is a path here. Not sure
                                where to start?
                            </p>
                        </RevealDiv>

                        <RevealDiv delay={240}>
                            <div className="mt-8 inline-flex items-center gap-3 bg-white border border-black/5 rounded-full px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,.04)] max-sm:flex-col max-sm:gap-2 max-sm:w-full max-sm:justify-center">
                                <span className="text-lg">📞</span>
                                <span className="text-sm text-black/65">
                                    Take our free{" "}
                                    <strong className="text-black">
                                        15-min career counselling
                                    </strong>
                                </span>
                                <Link
                                    href="/contact"
                                    className="shrink-0 rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-5 py-2 text-xs font-semibold text-white transition-all hover:shadow-[0_4px_12px_rgba(152,44,220,.3)] hover:-translate-y-0.5 duration-300"
                                >
                                    Book Now
                                </Link>
                            </div>
                        </RevealDiv>
                    </div>

                    {/* Stat Bar */}
                    {/* <div className="border-y border-black/[0.06] bg-white/80 backdrop-blur-sm">
            <div className="mx-auto max-w-[1240px] px-6 grid grid-cols-2 sm:grid-cols-4 divide-x divide-black/[0.08]">
              <div className="flex flex-col items-center justify-center gap-1 py-5 px-4 text-center">
                <span className="text-xs text-muted font-medium">Programs</span>
                <span className="text-lg font-bold text-black">11 Courses</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 py-5 px-4 text-center">
                <span className="text-lg font-bold text-black">4 Wks – 9 Mo</span>
                <span className="text-xs text-muted font-medium">any pace</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 py-5 px-4 text-center">
                <span className="text-xs text-muted font-medium">Language</span>
                <span className="text-lg font-bold text-black">Hinglish</span>
              </div>
              <div className="flex items-center justify-center py-4 px-4">
                <Link href="/contact" className="rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_4px_16px_rgba(152,44,220,.2)] hover:shadow-[0_8px_24px_rgba(152,44,220,.35)] hover:-translate-y-0.5 transition-all duration-300">
                  Book Free<br />Counselling
                </Link>
              </div>
            </div>
          </div> */}
                </div>

                {/* ═══════════════ CATEGORY FILTER ═══════════════ */}
                <div className="mx-auto max-w-[1240px] px-6 pt-16 max-lg:pt-12">
                    <RevealDiv>
                        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
                            {[
                                { key: "all", label: "All Courses" },
                                { key: "short-term", label: "Short-Term" },
                                { key: "professional", label: "Professional" },
                                { key: "career", label: "Career Programs" },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTier(tab.key)}
                                    className={`rounded-full px-6 py-2.5 text-[13px] font-semibold transition-all duration-300 ${
                                        activeTier === tab.key
                                            ? "bg-surface text-white shadow-[0_4px_14px_rgba(7,13,13,.15)]"
                                            : "bg-white border border-black/[0.06] text-black/60 hover:bg-ink hover:text-black hover:border-black/[0.12]"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </RevealDiv>
                </div>

                {/* ═══════════════ COURSE CATEGORY SECTIONS ═══════════════ */}
                <div className="mx-auto max-w-[1240px] px-6 pb-20 space-y-16">
                    {filteredTiers.map((tier, i) => (
                        <CategorySection key={tier.key} tier={tier} index={i} />
                    ))}
                </div>

                {/* ═══════════════ WHO IT'S FOR ═══════════════ */}
                <div
                    id="eligibility"
                    className="mx-auto max-w-[1240px] px-6 pb-20"
                >
                    <RevealDiv>
                        <div className="mb-10">
                            <div className="inline-flex items-center ">
                                <EyeBrow>WHO IT&apos;S FOR</EyeBrow>
                            </div>

                            <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-bold tracking-[-0.04em] text-black">
                                Who it&apos;s for
                            </h2>
                        </div>
                    </RevealDiv>

                    {/* Main Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.05fr_1.05fr] gap-5">
                        {/* ═══════════════ LEFT — STUDENTS ═══════════════ */}
                        {(() => {
                            const student = WHO_IT_FOR.find(
                                (person) => person.label === "Students",
                            );

                            return (
                                <RevealDiv>
                                    <div className="relative h-[325px] sm:h-[360px] lg:h-[325px] overflow-hidden rounded-[18px] group cursor-pointer">
                                        <img
                                            src={student?.img}
                                            alt="Students"
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />

                                        {/* Image Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                                        {/* Students Label */}
                                        <div className="absolute bottom-7 left-7 right-7">
                                            <h3 className="font-display text-[28px] sm:text-[32px] lg:text-[30px] font-bold tracking-[-0.03em] text-white">
                                                Students
                                            </h3>
                                        </div>
                                    </div>
                                </RevealDiv>
                            );
                        })()}

                        {/* ═══════════════ CENTER — GOLD CARDS ═══════════════ */}
                        <div className="flex flex-col gap-3">
                            {["Teachers", "Job Seekers", "Shop Owners"].map(
                                (label, i) => {
                                    const person = WHO_IT_FOR.find(
                                        (item) => item.label === label,
                                    );

                                    return (
                                        <RevealDiv
                                            key={label}
                                            delay={(i + 1) * 60}
                                        >
                                            <div
                                                className="
                                h-[100px]
                                sm:h-[115px]
                                lg:h-[100px]
                                rounded-[18px]
                                bg-[#ffd05a]
                                flex
                                items-center
                                gap-5
                                px-3
                               
                                overflow-hidden
                                group
                                cursor-pointer
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:shadow-[0_10px_30px_rgba(255,208,90,.28)]
                            "
                                            >
                                                {/* Image */}
                                                <div className="w-[100px] h-[82px] sm:w-[105px] sm:h-[88px] shrink-0 rounded-[13px] overflow-hidden">
                                                    <img
                                                        src={person?.img}
                                                        alt={label}
                                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                    />
                                                </div>

                                                {/* Label */}
                                                <h3 className="font-display text-[20px] sm:text-[22px] lg:text-[20px] xl:text-[22px] font-bold tracking-[-0.025em] leading-tight text-black">
                                                    {label}
                                                </h3>
                                            </div>
                                        </RevealDiv>
                                    );
                                },
                            )}
                        </div>

                        {/* ═══════════════ RIGHT — WHITE CARDS ═══════════════ */}
                        <div className="flex flex-col gap-4">
                            {["Home Makers", "Government Exam Aspirants"].map(
                                (label, i) => {
                                    const person = WHO_IT_FOR.find(
                                        (item) => item.label === label,
                                    );

                                    return (
                                        <RevealDiv
                                            key={label}
                                            delay={(i + 4) * 60}
                                        >
                                            <div
                                                className="
                                h-[154px]
                                sm:h-[170px]
                                lg:h-[154px]
                                rounded-[18px]
                                bg-white
                                border
                                border-black/[0.04]
                                flex
                                items-center
                                gap-5
                                px-3
                                sm:px-4
                                overflow-hidden
                                group
                                cursor-pointer
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:border-black/[0.10]
                                hover:shadow-[0_10px_30px_rgba(0,0,0,.07)]
                            "
                                            >
                                                {/* Image */}
                                                <div className="w-[100px] h-[126px] sm:w-[105px] sm:h-[135px] shrink-0 rounded-[13px] overflow-hidden">
                                                    <img
                                                        src={person?.img}
                                                        alt={label}
                                                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                    />
                                                </div>

                                                {/* Label */}
                                                <h3 className="font-display text-[20px] sm:text-[22px] lg:text-[20px] xl:text-[22px] font-bold tracking-[-0.025em] leading-[1.08] text-black">
                                                    {label ===
                                                    "Government Exam Aspirants" ? (
                                                        <>
                                                            Government
                                                            <br />
                                                            Exam Aspirants
                                                        </>
                                                    ) : (
                                                        label
                                                    )}
                                                </h3>
                                            </div>
                                        </RevealDiv>
                                    );
                                },
                            )}
                        </div>
                    </div>
                </div>

                {/* ═══════════════ WHAT YOU WILL LEARN ═══════════════ */}
                <div className="mx-auto max-w-[1240px] px-6 pb-20">
                    <RevealDiv>
                        <div className="rounded-[22px] bg-white border border-black/[0.04] shadow-[0_12px_40px_rgba(152,44,220,0.06)] p-8 sm:p-10 lg:p-12">
                            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-12 items-start">
                                <div className="flex flex-col items-start">
                                    <div className="inline-flex items-center ">
                                        <EyeBrow>LEARNING OUTCOMES</EyeBrow>
                                    </div>
                                    <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-bold tracking-[-0.045em] leading-[1.05] text-black max-w-[230px]">
                                        What you
                                        <br />
                                        will learn
                                    </h2>
                                    <Link
                                        href="/contact"
                                        className="mt-10 inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold text-white bg-[linear-gradient(60deg,#eec369,#982cdc)] shadow-[0_6px_18px_rgba(152,44,220,.25)] hover:shadow-[0_10px_28px_rgba(152,44,220,.35)] hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        Enroll Now
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {LEARNING_CARDS.map((card, i) => (
                                        <RevealDiv
                                            key={card.num}
                                            delay={i * 50}
                                        >
                                            <div
                                                className={`min-h-[202px] rounded-[17px] p-5 flex flex-col hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,.08)] transition-all duration-300 cursor-default ${
                                                    i % 2 === 1
                                                        ? "bg-[#cdbdff]"
                                                        : "border border-black/[0.08] bg-white"
                                                }`}
                                            >
                                                <span className="text-sm font-semibold text-black/30 mb-5">
                                                    {card.num}
                                                </span>
                                                <h3
                                                    className={`text-[20px] font-bold leading-[1.1] ${i % 2 === 1 ? "text-black" : "text-[#765bc4]"}`}
                                                >
                                                    {card.title}
                                                </h3>
                                                <p className="mt-4 text-[15px] leading-[1.2] text-black/55">
                                                    {card.desc}
                                                </p>
                                            </div>
                                        </RevealDiv>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </RevealDiv>
                </div>

                {/* ═══════════════ TOOLS MARQUEE ═══════════════ */}
                <section className="bg-ink border-y border-black/[0.06] overflow-hidden">
                    <RevealDiv>
                        <div className="py-16 sm:py-20 text-center">
                            <EyeBrow>TOOLS</EyeBrow>

                            <h2 className="font-display text-[clamp(2rem,4vw,2.7rem)] font-bold tracking-[-0.04em] text-black">
                                Master These Tools
                            </h2>
                        </div>
                    </RevealDiv>

                    <div className="relative overflow-hidden border-y border-black/[0.06] py-10 sm:py-12 group/marquee">
                        <div className="flex w-max animate-[marquee_30s_linear_infinite] group-hover/marquee:[animation-play-state:paused] items-center">
                            {[0, 1].map((set) => (
                                <div
                                    key={set}
                                    className="flex items-center shrink-0"
                                >
                                    {TOOLS.map((tool, i) => (
                                        <span
                                            key={`${set}-${tool}`}
                                            className="flex items-center"
                                        >
                                            <span className="text-[28px] sm:text-[40px] font-bold tracking-[-0.04em] text-black/20 hover:text-violet/40 transition-colors duration-300 cursor-default">
                                                {tool}
                                            </span>
                                            {i < TOOLS.length - 1 && (
                                                <span className="mx-8 text-xl text-lime/50">
                                                    ✦
                                                </span>
                                            )}
                                        </span>
                                    ))}
                                    <span className="mx-8 text-xl text-lime/50">
                                        ✦
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════ POPULAR BUNDLES ═══════════════ */}
                <div className="mx-auto max-w-[1240px] px-6 py-20">
                    <RevealDiv>
                        <div className="mb-10 text-center">
                            <EyeBrow>BUNDLES</EyeBrow>

                            <h2 className="font-display text-[clamp(2rem,4vw,2.7rem)] font-bold tracking-[-0.04em] text-black">
                                Popular Bundles
                            </h2>
                            <p className="text-muted mt-3 max-w-lg mx-auto">
                                Save more when you combine complementary
                                programs
                            </p>
                        </div>
                    </RevealDiv>

                    <div className="grid sm:grid-cols-2 gap-5">
                        {BUNDLES.map((bundle, i) => (
                            <RevealDiv key={bundle.title} delay={i * 100}>
                                <div
                                    className={`relative rounded-[20px] p-7 sm:p-8 border transition-all duration-300 hover:-translate-y-1 overflow-hidden group ${
                                        bundle.accent === "lime"
                                            ? "bg-white border-lime/20 hover:shadow-[0_12px_40px_rgba(238,195,105,0.12)]"
                                            : "bg-white border-violet/15 hover:shadow-[0_12px_40px_rgba(152,44,220,0.12)]"
                                    }`}
                                >
                                    <div
                                        className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.12] ${
                                            bundle.accent === "lime"
                                                ? "bg-lime"
                                                : "bg-violet"
                                        }`}
                                    />
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span
                                                className={`h-2 w-2 rounded-full ${bundle.accent === "lime" ? "bg-lime" : "bg-violet"}`}
                                            />
                                            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                                                Bundle
                                            </span>
                                        </div>
                                        <h3 className="font-display text-[20px] font-bold text-black mb-2">
                                            {bundle.title}
                                        </h3>
                                        <p className="text-sm text-black/55 mb-3">
                                            {bundle.courses}
                                        </p>
                                        <p className="text-xs text-black/40 font-medium">
                                            {bundle.note}
                                        </p>
                                    </div>
                                </div>
                            </RevealDiv>
                        ))}
                    </div>
                </div>

                {/* ═══════════════ FINAL CTA ═══════════════ */}
                <div className="bg-surface relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-violet/[0.12] blur-[140px]" />
                    </div>
                    <div className="relative z-10 mx-auto max-w-[1240px] px-6 py-20 sm:py-24 text-center">
                        <RevealDiv>
                            <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold tracking-[-0.04em] text-white leading-tight">
                                Still not sure which course
                                <br className="hidden sm:block" /> is right for
                                you?
                            </h2>
                            <p className="mt-4 text-lg text-white/55 max-w-lg mx-auto">
                                Book a free career counselling session. We'll
                                help you pick the right path based on your
                                background and goals.
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/contact"
                                    className="rounded-full bg-[linear-gradient(60deg,#eec369,#982cdc)] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_6px_24px_rgba(152,44,220,.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(152,44,220,.5)]"
                                >
                                    Book Free Counselling
                                </Link>
                                <Link
                                    href="/offline-courses"
                                    className="rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/25 hover:-translate-y-0.5"
                                >
                                    View Offline Batches
                                </Link>
                            </div>
                        </RevealDiv>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
