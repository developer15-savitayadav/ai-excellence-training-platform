import { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PublicLayout from "../Layouts/PublicLayout";
import Placementsnapshot from "../Components/Placementsnapshot";
import {
    ArrowRight,
    Play,
    ChevronLeft,
    ChevronRight,
    GraduationCap,
    Briefcase,
    Building2,
    ArrowUpRight,
} from "lucide-react";

const programTabs = [
    "AI & ML Programs",
    "Professional Programs",
    "Career Programs",
];

// Add this data
const testimonials = [
    {
        quote: "The most valuable aspect of working with Scalient Agency is their proactive communication and their genuineness partnership. We never felt like just another client or distant.",
        name: "Alistair Finch",
        position: "Chief Operating Officer (COO)",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    },
    {
        quote: "The practical projects completely changed the way I understood AI. I stopped just watching tutorials and started building solutions that I could confidently showcase.",
        name: "Sarah Johnson",
        position: "Data Scientist",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    },
    {
        quote: "Our previous campaigns felt like throwing spaghetti at the wall. The team brought incredible discipline and data analysis to our budget.",
        name: "Edward Hayes",
        position: "Chief Operating Officer (COO)",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
    },
    {
        quote: "The creative concepts they developed for our new product launch were fresh, engaging, and perfectly on brand.",
        name: "James O'Connell",
        position: "Founder & Head of Strategy",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    },
    {
        quote: "They delivered a comprehensive strategy that immediately focused our entire team. The difference in our engagement metrics was noticeable within the first 60 days.",
        name: "Maria Gonzalez",
        position: "Marketing Director",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    },
];

const tstackVariants = [
    "is-dark",
    "is-light",
    "is-purple",
    "is-yellow",
    "is-light",
];

const programs = [
    {
        tab: "AI & ML Programs",
        title: "AI Engineering",
        category: "AI & ML",
        description:
            "Design and build intelligent systems using modern AI engineering practices.",
        duration: "12 Weeks",
        price: "₹49,999",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=85",
    },
    {
        tab: "AI & ML Programs",
        title: "Advanced Machine Learning",
        category: "Machine Learning",
        description:
            "Master practical machine learning workflows from data preparation to deployment.",
        duration: "16 Weeks",
        price: "₹59,999",
        image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=900&q=85",
    },
    {
        tab: "AI & ML Programs",
        title: "Generative AI & LLMs",
        category: "Generative AI",
        description:
            "Learn how modern language models work and build production-ready AI solutions.",
        duration: "10 Weeks",
        price: "₹44,999",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=85",
    },
    {
        tab: "Professional Programs",
        title: "MLOps Engineering",
        category: "MLOps",
        description:
            "Ship, monitor and scale machine learning systems with confident engineering practice.",
        duration: "14 Weeks",
        price: "₹54,999",
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=900&q=85",
    },
    {
        tab: "Professional Programs",
        title: "AI Product Management",
        category: "Product",
        description:
            "Turn AI capability into products people love — strategy, roadmaps and delivery.",
        duration: "8 Weeks",
        price: "₹39,999",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=85",
    },
    {
        tab: "Professional Programs",
        title: "Computer Vision in Production",
        category: "AI & ML",
        description:
            "From image classification pipelines to real-time vision systems deployed at scale.",
        duration: "12 Weeks",
        price: "₹52,999",
        image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=900&q=85",
    },
    {
        tab: "Career Programs",
        title: "Data Science Foundations",
        category: "Data Science",
        description:
            "Build the analytical backbone every AI career needs — statistics, SQL and storytelling.",
        duration: "10 Weeks",
        price: "₹34,999",
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=900&q=85",
    },
    {
        tab: "Career Programs",
        title: "Deep Learning Specialization",
        category: "Machine Learning",
        description:
            "Neural networks from first principles to transformers, with hands-on labs each week.",
        duration: "18 Weeks",
        price: "₹64,999",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85",
    },
    {
        tab: "Career Programs",
        title: "Prompt Engineering Bootcamp",
        category: "Generative AI",
        description:
            "A fast, practical route into working with LLMs — no prior AI experience required.",
        duration: "6 Weeks",
        price: "₹24,999",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=85",
    },
];

const whyChoose = [
    {
        number: "01",
        title: "Real Projects, Real Stakes",
        description:
            "Every program ends with something you can actually show: a deployed machine learning model, a live ad campaign run with a real budget, or a working AI assistant. Not a certificate with nothing behind it.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
    },
    {
        number: "02",
        title: "Curriculum built for 2026, not 2016.",
        description:
            "Generative AI, LLM APIs, RAG systems, AI agents, prompt engineering and AI-powered marketing are in the syllabus — not a footnote. We teach what employers are hiring for right now.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80",
    },
    {
        number: "03",
        title: "Small batches. Every student known by name.",
        description:
            "We cap every batch at 25 students. Your trainer knows where you are stuck, and our doubt-clearing sessions and open lab make sure you do not fall behind.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
    },
    {
        number: "04",
        title: "Structured Placement Assistance",
        description:
            "A dedicated placement coordinator, 1-on-1 resume building, mock interviews, a growing network of hiring partners, and quarterly on-campus placement drives. We publish our real numbers, batch by batch.",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=400&q=80",
    },
    {
        number: "05",
        title: "Fees a Lucknow family can plan around.",
        description:
            "No-cost EMI on all Professional and Career programs. Scholarships for women in tech and merit-based entrance test scholarships up to 25%.",
        image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=400&q=80",
    },
];
const learners = [
    {
        title: "College Students",
        subtitle: "& Freshers",
        description:
            "BCA, B.Tech, BSc, BBA and commerce graduates who want a career, not just a degree.",
        icon: GraduationCap,
    },
    {
        title: "Working",
        subtitle: "Professionals",
        description:
            "Marketers, analysts, engineers and managers who need AI skills to stay relevant.",
        icon: Briefcase,
    },
    {
        title: "Business",
        subtitle: "Owners",
        description:
            "Shop owners, agency founders and entrepreneurs who want AI to save time and grow revenue.",
        icon: Building2,
    },
    {
        title: "Career",
        subtitle: "Changers",
        description:
            "Anyone ready to move into data, AI or digital marketing from a different field.",
        icon: ArrowUpRight,
    },
];
const trustedBrands = [
    { name: "Microsoft", src: "/assets/images/microsoft.avif" },
    { name: "Amazon", src: "/assets/images/amazon.png" },
    { name: "Google", src: "/assets/images/google.png" },
    { name: "Nvidia", src: "/assets/images/nvidia.png" },
    { name: "IBM", src: "/assets/images/ibm.png" },
    { name: "Meta", src: "/assets/images/meta.jpg" },
    { name: "TCS", src: "/assets/images/tcs.webp" },
];

function SectionLabel({ children, light = false }) {
    return (
        <div
            className={`mb-3 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] backdrop-blur-sm transition-colors duration-300 ${
                light
                    ? "border-white/15 bg-white/10 text-white/85 hover:bg-white/15"
                    : "border-black/10 bg-white/60 text-black/70 hover:bg-white/80"
            }`}
        >
            <span
                className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                    light ? "bg-[#eec369]" : "bg-[#982cdc]"
                }`}
            />
            {children}
        </div>
    );
}

function GradientButton({ children, href = "#", className = "" }) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(152,44,220,.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(152,44,220,.28)] ${className}`}
        >
            {children}
            <ArrowRight size={14} />
        </Link>
    );
}

function MetricCard({ value, label, dark = false, purple = false }) {
    return (
        <div
            className={`relative min-h-[118px] overflow-hidden rounded-xl border p-5 ${
                purple
                    ? "border-white/10 bg-[linear-gradient(135deg,#982cdc,#7654d8)] text-white"
                    : dark
                      ? "border-white/5 bg-[#0f1616] text-white"
                      : "border-black/5 bg-white text-black"
            }`}
        >
            <div className="flex items-end gap-1">
                <span className="text-[30px] font-semibold tracking-[-0.05em]">
                    {value}
                </span>
                {value === "500K" && (
                    <span className="mb-2 text-[10px] opacity-70">Courses</span>
                )}
            </div>
            <p className="mt-3 max-w-[150px] text-[11px] leading-[1.5] opacity-60">
                {label}
            </p>
            {purple && (
                <div className="absolute -bottom-8 -right-5 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
            )}
        </div>
    );
}

function ProgramCard({ program }) {
    return (
        <div className="group overflow-hidden rounded-xl border border-black/[0.06] bg-white p-2 shadow-[0_8px_30px_rgba(0,0,0,.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,.08)]">
            <div className="relative h-[185px] overflow-hidden rounded-lg">
                <img
                    src={program.image}
                    alt={program.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-black backdrop-blur">
                    {program.category}
                </div>

                <div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/75 text-white backdrop-blur">
                    <Play size={11} fill="currentColor" />
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-base font-semibold tracking-[-0.02em]">
                    {program.title}
                </h3>

                <p className="mt-2 min-h-[48px] text-[13px] leading-[1.55] text-black/50">
                    {program.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-black/[0.06] pt-3">
                    <div>
                        <span className="text-[10px] uppercase tracking-wide text-black/40">
                            Duration
                        </span>
                        <p className="text-[12px] font-medium">
                            {program.duration}
                        </p>
                    </div>

                    <div className="text-right">
                        <span className="text-[10px] uppercase tracking-wide text-black/40">
                            Fee
                        </span>
                        <p className="text-[12px] font-semibold">
                            {program.price}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const skillSliderImages = [
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=500&q=80",
];

function useInView(threshold = 0.25) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return [ref, inView];
}

function SkillHeadingImage() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(
            () => setIndex((i) => (i + 1) % skillSliderImages.length),
            2500,
        );
        return () => clearInterval(id);
    }, []);

    return (
        <span className="relative mx-[0.16em] inline-block h-[1.2em] w-[2em] overflow-hidden rounded-[0.18em] align-middle shadow-[0_0.08em_0.3em_rgba(0,0,0,0.18)]">
            {skillSliderImages.map((src, i) => (
                <img
                    key={src}
                    src={src}
                    alt=""
                    aria-hidden={i !== index}
                    loading="eager"
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out motion-reduce:transition-none ${
                        i === index
                            ? "translate-y-0 scale-100 opacity-100"
                            : "-translate-y-[8%] scale-[1.06] opacity-0"
                    }`}
                />
            ))}
        </span>
    );
}

function LearnSkillSection() {
    const [ref, inView] = useInView();

    return (
        <section className="relative overflow-hidden bg-[#f5f5f2] px-5 py-20 sm:py-28">
            <div className="pointer-events-none absolute -left-24 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(152,44,220,.07),transparent_70%)] blur-2xl" />
            <div className="pointer-events-none absolute -right-24 top-1/2 h-[280px] w-[280px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(238,195,105,.08),transparent_70%)] blur-2xl" />

            <h2
                ref={ref}
                style={{ fontFamily: "'Poppins', sans-serif" }}
                className={`relative mx-auto max-w-[1050px]  text-[clamp(2.35rem,9.2vw,9.2rem)] font-bold uppercase leading-[1.06] tracking-[-0.03em] text-[#0a0a0a] transition-all duration-700 ease-out motion-reduce:transition-none ${
                    inView
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                }`}
            >
                <span className="block">Learn Skill That</span>
                <span className="block">
                    Matt
                    <SkillHeadingImage />
                    ers.
                </span>
            </h2>
        </section>
    );
}

const courseTabs = [
    {
        id: "short-term",
        label: "Short-Term Courses",
        duration: "(4–6 weeks)",
        dot: "#982cdc",
    },
    {
        id: "certificates",
        label: "Professional Certificates",
        duration: "(3–4 months)",
        dot: "#eec369",
    },
    {
        id: "career",
        label: "Career Programs",
        duration: "(6–9 months, placement-backed)",
        dot: "#982cdc",
    },
];

const courseOfferData = {
    "short-term": [
        {
            lessons: "20 Lessons",
            hours: "5 Hours",
            title: "AI Tools Mastery",
            description:
                "Get hands-on with the AI tools professionals use daily — from content creation to workflow automation.",
            slug: "ai-tools-mastery",
            image: "/assets/images/AI-tools-mastery.png",
        },
        {
            lessons: "28 Lessons",
            hours: "7 Hours",
            title: "Python Foundation",
            description:
                "Build a solid programming base in Python — the language behind every AI and data career.",
            slug: "python-programming-foundation",
            image: "/assets/images/python-programming-foundation.png",
        },
        {
            lessons: "24 Lessons",
            hours: "6 Hours",
            title: "Generative AI & Prompt Engineering",
            description:
                "Learn to communicate with AI models effectively and build reliable prompt workflows for daily tasks.",
            slug: "generative-ai-prompt-engineering",
            image: "/assets/images/generative-ai-prompt-engineering.png",
        },
        {
            lessons: "18 Lessons",
            hours: "4.5 Hours",
            title: "AI for Business Owners",
            description:
                "Understand practical AI use cases to cut costs, save time and grow revenue in your business.",
            slug: "ai-for-business",
            image: "/assets/images/AI-for-business-owners.png",
        },
        {
            lessons: "32 Lessons",
            hours: "8 Hours",
            title: "AKTU Summer/Winter Training",
            description:
                "AKTU-aligned industrial training program covering AI fundamentals with certification for engineering students.",
            slug: "summer-winter-training",
            image: "/assets/images/AKTU-summer-winter-training.png",
        },
    ],
    certificates: [
        {
            lessons: "40 Lessons",
            hours: "16 Hours",
            title: "Digital Marketing with AI",
            description:
                "Combine core digital marketing skills with AI tools to plan, create and optimise campaigns faster.",
            slug: "digital-marketing-ai",
            popular: true,
            image: "/assets/images/digital-marketing-ai.png",
        },
        {
            lessons: "48 Lessons",
            hours: "20 Hours",
            title: "Python for Data Analytics",
            description:
                "Turn raw data into clear business insights using Python, pandas and practical visualisation techniques.",
            slug: "python-data-analytics",
            image: "/assets/images/python-data-analytics.png",
        },
        {
            lessons: "44 Lessons",
            hours: "18 Hours",
            title: "Applied Machine Learning",
            description:
                "Master practical ML workflows — from data preparation to model training, evaluation and deployment.",
            slug: "applied-machine-learning",
            image: "/assets/images/applied-machine-learning.png",
        },
    ],
    career: [
        {
            lessons: "120 Lessons",
            hours: "60 Hours",
            title: "Advanced Diploma in AI & Machine Learning",
            description:
                "A complete placement-backed path from programming foundations to deployed AI and ML systems.",
            price: "₹79,999",
            popular: true,
            slug: "advanced-diploma-ai-ml",
            image: "/assets/images/advanced-diploma-ai-ml.png",
        },
        {
            lessons: "96 Lessons",
            hours: "48 Hours",
            title: "AI-Powered Digital Marketing Specialist",
            description:
                "Become a digital marketer who leverages AI for strategy, content, ads and analytics — placement support included.",
            slug: "ai-digital-marketing-specialist",
            image: "/assets/images/ai-digital-marketing-specialist.jpeg",
        },
        {
            lessons: "110 Lessons",
            hours: "56 Hours",
            title: "Data Science & AI Career Track with Internship",
            description:
                "Master statistics, machine learning and AI with a guaranteed internship and dedicated interview preparation.",
            slug: "data-science-ai-career-track",
            image: "/assets/images/data-science-ai-career-track.jpeg",
        },
    ],
};
const mentors = [
    {
        name: "Arjun Mehta",
        role: "AI & Machine Learning Expert",
        image: "/assets/images/mentors1.png",
    },
    {
        name: "Priya Kapoor",
        role: "Data Science & Analytics Mentor",
        image: "/assets/images/mentors2.png",
    },
    {
        name: "Rahul Sharma",
        role: "Python & Software Development Mentor",
        image: "/assets/images/mentors3.png",
    },
    {
        name: "Vikram Malhotra",
        role: "Career & Technology Mentor",
        image: "/assets/images/mentors4.png",
    },
];

function MentorCard({ mentor }) {
    return (
        <div className="group relative h-[300px] overflow-hidden rounded-2xl">
            <img
                src={mentor.image}
                alt={mentor.name}
                loading="lazy"
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,13,13,.85)_0%,rgba(7,13,13,0)_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="text-[16px] font-bold text-white">
                    {mentor.name}
                </h3>
                <p className="mt-0.5 text-[12px] text-white/70">
                    {mentor.role}
                </p>
            </div>
        </div>
    );
}
function OfferCourseCard({ course }) {
    const courseHref = `/courses/${course.slug}`;
    return (
        <Link
            href={courseHref}
            className="group block h-full bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative p-3"
        >
            {course.popular && (
                <div className="absolute top-3 right-3 bg-[linear-gradient(60deg,#982cdc,#eec369)] text-white text-[8px] font-bold uppercase tracking-wider px-3 py-1 rounded-[14px] z-10 shadow-sm">
                    Popular
                </div>
            )}
            <div className="relative h-[170px] overflow-hidden rounded-[14px]">
                <img
                    src={course.image}
                    alt={course.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-10 bg-[linear-gradient(to_top,rgba(255,255,255,.35),transparent)]" />
            </div>
            <div className="p-6">
                <div className="flex items-center justify-start mb-4 font-[500] text-[14px]  gap-2">
                    <span className="rounded-full bg-[#ecf0f5] text-black px-5 py-0">
                        {course.lessons}
                    </span>
                    <span className=" rounded-full bg-[#ecf0f5]  text-black px-5 py-0">
                        {course.hours}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">
                    {course.title}
                </h3>
                <p className="text-sm text-black/60 leading-relaxed">
                    {course.description}
                </p>
                <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between gap-3">
                    <span className="text-2xl font-bold text-black">
                        {course.price}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black text-white text-[13px] font-semibold px-5 py-2.5 transition-all duration-300 group-hover:bg-[linear-gradient(60deg,#982cdc,#eec369)] group-hover:shadow-[0_8px_20px_-4px_rgba(152,44,220,.45)]">
                        View Details
                        <ArrowRight size={14} />
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default function Home() {
    const [activeTab, setActiveTab] = useState(programTabs[0]);
    const visiblePrograms = programs.filter((p) => p.tab === activeTab);
    const [whyRef, whyInView] = useInView(0.15);
    const stackRef = useRef(null);

 

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const el = stackRef.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray(".tstack-card");

            gsap.set(cards.slice(1), {
                y: () => window.innerHeight * 0.95,
            });

            const tl = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                    trigger: el,
                    start: "top top+=50",
                    end: "+=2226",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            cards.forEach((card, i) => {
                if (i === 0) return;
                tl.to(card, { y: 0 }, i - 1);
            });
        }, el);

        return () => ctx.revert();
    }, []);


    const [offerTab, setOfferTab] = useState(courseTabs[0].id);
    const [slideIndex, setSlideIndex] = useState(0);
    const [perView, setPerView] = useState(3);
    const touchStartX = useRef(null);

    const offerCourses = courseOfferData[offerTab];
    const maxSlide = Math.max(0, offerCourses.length - perView);

    useEffect(() => {
        const updatePerView = () => {
            const w = window.innerWidth;
            setPerView(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
        };
        updatePerView();
        window.addEventListener("resize", updatePerView);
        return () => window.removeEventListener("resize", updatePerView);
    }, []);

    useEffect(() => {
        setSlideIndex((i) =>
            Math.min(i, Math.max(0, offerCourses.length - perView)),
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offerTab, perView]);

    function handleTouchStart(e) {
        touchStartX.current = e.touches[0].clientX;
    }

    function handleTouchEnd(e) {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta < -50) {
            setSlideIndex((i) => Math.min(i + 1, maxSlide));
        } else if (delta > 50) {
            setSlideIndex((i) => Math.max(i - 1, 0));
        }
        touchStartX.current = null;
    }

    return (
        <PublicLayout>
            <div className="home-fonts min-h-screen overflow-hidden bg-[#f5f5f2] text-[#080909]">
                {/* HERO */}
                <section className="relative flex min-h-[610px] items-center justify-center overflow-hidden px-5 pb-16 pt-28 bg-[#f5f5f2]">
                    <div className="absolute left-1/2 top-0 h-[420px] w-[650px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(152,44,220,.15),transparent_68%)] blur-3xl" />
                    <div className="absolute right-0 bottom-0 h-[300px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(238,195,105,.12),transparent_68%)] blur-3xl" />

                    <div className="relative z-10 mx-auto w-full max-w-[950px] text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-xs font-medium text-black/70 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                            AI EXCELLENCE ACADEMY
                        </div>

                        <h1 className="mx-auto mt-6 max-w-[780px] text-[clamp(2.5rem,6vw,4.8rem)] font-bold leading-[.95] tracking-[-0.04em]">
                            <span className="bg-[linear-gradient(60deg,#982cdc,#eec369)] bg-clip-text text-transparent">
                                Learn AI
                            </span>{" "}
                            in Lucknow.
                        </h1>
                        <h6 className="mx-auto mt-4 max-w-[550px] text-[28px] font-bold text-black/70">
                            Build Real Projects. Get Hired.
                        </h6>

                        <p className="mx-auto mt-5 max-w-[550px] text-[16px] leading-[1.7] text-black/60">
                            Practical, mentor-led AI programs that take you from
                            curious beginner to industry-ready professional.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(152,44,220,.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(152,44,220,.35)]"
                            >
                                Book a Free Counselling
                            </Link>
                            <Link
                                href="/courses"
                                className="inline-flex items-center justify-center rounded-full border border-black/10 bg-black px-8 py-3.5 text-sm font-semibold text-white transition hover:border-black/25 hover:bg-white/80"
                            >
                                Explore Courses
                            </Link>
                        </div>

                        <div className="mx-auto mt-16 grid max-w-[1350px] grid-cols-2 items-start gap-4 md:grid-cols-5 md:gap-5">
                            {/* CARD 1 — deep blue, tallest, starts highest */}
                            <div className="hero-stat-card group relative flex h-[200px] flex-col justify-end rounded-[22px] bg-[linear-gradient(60deg,#183d8a,#617db6,#9bb0da)] p-5 text-left shadow-[0_14px_35px_-12px_rgba(24,61,138,.45)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-12px_rgba(24,61,138,.55)] md:col-span-1 md:mt-0">
                                {/* Pill badge — outside overflow-hidden so it's never clipped */}
                                <div className="absolute growth-pill rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold text-[#183d8a] shadow-[0_6px_16px_rgba(0,0,0,.18)] z-20">
                                    Growth{" "}
                                    <span className="font-bold  text-[16px]">
                                        84%
                                    </span>
                                </div>

                                {/* Inner wrapper handles the rounded-corner clipping for content + decorative blur */}
                                <div className="absolute inset-0 overflow-hidden rounded-[22px]">
                                    <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10 blur-xl transition-transform duration-500 group-hover:scale-125" />
                                </div>

                                <div className="relative">
                                    <div className="text-[40px] font-bold leading-none tracking-[-0.04em] text-white mb-6">
                                        97M
                                    </div>
                                    <p className="mt-2 text-[11px] font-medium leading-snug !text-white/75">
                                        New AI jobs globally by 2025
                                    </p>
                                    <p className="mt-1.5 text-[9px] italic text-white/45">
                                        World Economic Forum
                                    </p>
                                </div>
                            </div>

                            {/* CARD 2 — light sky, medium, offset down a bit */}
                            <div className="hero-stat-card group relative flex h-[170px] flex-col justify-end overflow-hidden rounded-[22px] bg-[linear-gradient(60deg,#c2e9fb,#a1c4fd,#a1c4fd)] p-5 text-left shadow-[0_14px_35px_-12px_rgba(161,196,253,.6)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-12px_rgba(161,196,253,.7)] md:col-span-1 md:mt-8">
                                <div>
                                    <div className="text-[26px] font-bold leading-tight tracking-[-0.03em] text-[#1149a3] mb-6">
                                        ₹12–25 LPA
                                    </div>
                                    <p className="mt-1.5 text-[11px] font-medium leading-snug text-[#12294a]/70">
                                        Starting salary for AI engineers in
                                        India
                                    </p>
                                    <p className="mt-1 text-[9px] italic text-[#12294a]/45">
                                        LinkedIn India, 2024
                                    </p>
                                </div>
                            </div>

                            {/* CARD 3 — pastel peach-pink, shortest, sits lowest (dip point) */}
                            <div className="hero-stat-card group relative flex h-[140px] flex-col justify-center overflow-hidden rounded-[22px] bg-[linear-gradient(53deg,#f9c2eb,#eed4a8,#eed4a8)] p-5 text-left shadow-[0_14px_35px_-12px_rgba(249,194,235,.65)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-12px_rgba(249,194,235,.8)] md:col-span-1 md:mt-16">
                                <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-white/30 blur-lg" />
                                <div
                                    className="relative text-center"
                                    style={{
                                        fontFamily: "'Poppins', sans-serif",
                                    }}
                                >
                                    <div className="text-[17px] font-medium uppercase leading-[1.15] tracking-[-0.01em] text-[#8d3a0c]">
                                        AI jobs are{" "}
                                    </div>
                                    <p className=" uppercase  mt-2 text-[24px] font-bold leading-snug text-[#8d3a0c]">
                                        Exploding
                                    </p>
                                </div>
                            </div>

                            {/* CARD 4 — vivid magenta, tall again, climbing back up */}
                            <div className="hero-stat-card group relative flex h-[170px] flex-col justify-end overflow-hidden rounded-[22px] bg-[linear-gradient(60deg,#fe0094,#9b4fbf,#5975b4)] p-5 text-left shadow-[0_14px_35px_-12px_rgba(158,44,178,.5)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-12px_rgba(254,0,148,.45)] md:col-span-1 md:mt-8">
                                <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-[#fe0094]/40 blur-2xl transition-transform duration-500 group-hover:scale-125" />

                                <div>
                                    <div className="flex items-end gap-1.5">
                                        <span className="text-[40px] font-bold leading-none tracking-[-0.04em] text-white mb-6">
                                            45%
                                        </span>
                                        <span className="mb-1.5 text-sm font-bold text-[#ffd6f2]">
                                            ↑
                                        </span>
                                    </div>
                                    <p className="mt-2 text-[11px] font-medium leading-snug text-white/80">
                                        Growth in AI adoption across industries
                                    </p>
                                    <p className="mt-1.5 text-[9px] italic text-white/50">
                                        Industry Report 2024
                                    </p>
                                </div>
                            </div>

                            {/* CARD 5 — image card, medium-high, top of the wave again */}
                            <Link
                                href="/register"
                                className="hero-stat-card group relative col-span-2 flex h-[200px] flex-col justify-end overflow-hidden rounded-[22px] shadow-[0_14px_35px_-12px_rgba(15,22,22,.4)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-12px_rgba(15,22,22,.5)] md:col-span-1 md:mt-1"
                            >
                                <img
                                    src="/assets/images/hero-lastbg.png"
                                    alt="Join AI Excellence Academy"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* PARTNER STRIP */}
                <div className="relative overflow-hidden">
                    <div className="flex w-max items-center gap-14 whitespace-nowrap animate-marquee-left">
                        {[
                            ...trustedBrands,
                            ...trustedBrands,
                            ...trustedBrands,
                        ].map((brand, index) => (
                            <div
                                key={`${brand.name}-${index}`}
                                className="flex h-28 w-28 shrink-0 items-center justify-center"
                            >
                                <img
                                    src={brand.src}
                                    alt={brand.name}
                                    loading="lazy"
                                    className="h-28 w-28 max-w-full object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-28"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* LEARN SKILL THAT MATTERS */}
                <LearnSkillSection />

                {/* NUMBERS */}
                <section className="relative overflow-hidden bg-[#070d0d] px-5 py-14 sm:py-16 lg:py-20 text-white">
                    {/* World map background */}
                    <div
                        className="absolute inset-0 opacity-[0.12] pointer-events-none"
                        style={{
                            backgroundImage:
                                "url('/assets/images/impact-world-map.d4abcc72.svg')",
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    />

                    {/* Soft background glow */}
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#982cdc]/[0.06] blur-[100px] pointer-events-none" />

                    <div className="relative z-10 mx-auto max-w-[1050px]">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
                            {/* Left heading */}
                            <div className="max-w-[320px]">
                                <h2 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.15] tracking-[-0.03em] text-white">
                                    The Numbers
                                    <br />
                                    Behind Success
                                </h2>
                            </div>

                            {/* Right content */}
                            <div className="flex flex-col items-start sm:items-end gap-4">
                                <p className=" text-[clamp(12px,1.2vw,16px)] leading-[1.5] text-white/55 text-left sm:text-left">
                                    Strategy, creativity and growth
                                    <br />
                                    are finding every bold ideas
                                </p>

                                <Link
                                    href="/register"
                                    className="
                        inline-flex
                        items-center
                        justify-center
                        rounded-full
                        bg-[linear-gradient(60deg,#eec369,#982cdc)]
                        px-8
                        py-3
                        text-[clamp(13px,1.2vw,15px)]
                        font-semibold
                        text-white
                        shadow-[0_8px_25px_rgba(152,44,220,.22)]
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:shadow-[0_12px_30px_rgba(152,44,220,.35)]
                    "
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>

                        {/* Statistics Cards */}
                        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-[1.65fr_1fr_1fr]">
                            {/* 500K */}
                            <div
                                className="
                    relative
                    min-h-[250px]
                    overflow-hidden
                    rounded-[14px]
                    px-6
                    py-8
                    sm:px-7
                    sm:py-8
                    bg-[linear-gradient(145deg,#982cdc_0%,#8d35c5_35%,#c27ac0_62%,#eec369_100%)]
                "
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-[clamp(48px,6vw,64px)] font-bold leading-none tracking-[-0.04em] text-white">
                                        500K
                                    </span>

                                    <span className="pt-1 text-[clamp(18px,1.8vw,24px)] font-semibold text-white">
                                        Courses
                                    </span>
                                </div>

                                <p className="absolute bottom-6 left-6 right-6 text-[clamp(11px,1vw,14px)] leading-[1.5] text-[#fff]">
                                    We offer flexible, custom-fit plans designed
                                    to meet the unique needs and budget of your
                                    teams.
                                </p>
                            </div>

                            {/* 98% */}
                            <div
                                className="
                    relative
                    min-h-[250px]
                    overflow-hidden
                    rounded-[14px]
                    bg-[#f5f5f2]
                    px-6
                    py-8
                    text-[#000]
                "
                            >
                                <div className="text-[clamp(48px,6vw,64px)] font-bold leading-none tracking-[-0.04em]">
                                    98%
                                </div>

                                <p className="absolute bottom-6 left-6 right-6 text-[clamp(11px,1vw,14px)] leading-[1.5] course-mid">
                                    Our commitment to quality shines
                                    <br />
                                    through near 98.05%.
                                </p>
                            </div>

                            {/* 23K */}
                            <div
                                className="
                    relative
                    min-h-[250px]
                    overflow-hidden
                    rounded-[14px]
                    bg-[#0f1616]
                    px-6
                    py-8
                "
                            >
                                <div className="flex items-start">
                                    <span className="text-[clamp(48px,6vw,64px)] font-bold leading-none tracking-[-0.04em] text-white">
                                        23
                                    </span>

                                    <span className="ml-1 text-[clamp(18px,1.8vw,24px)] font-semibold text-white/80">
                                        K
                                    </span>
                                </div>

                                <p className="absolute bottom-6 left-6 right-6 text-[clamp(11px,1vw,14px)] leading-[1.5] text-white/75">
                                    Organic growth brings in twenty-three
                                    <br />
                                    thousand signups.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* OUR COURSES */}
                <section className="overflow-hidden px-5 py-20 bg-[#f5f5f2]">
                    <div className="mx-auto max-w-[1050px]">
                        <div className="text-center">
<div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                                OUR COURSES
                            </div>
                            <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.04em] text-black">
                                Our Programs at a Glance
                            </h2>

                            <div className="mt-6 flex flex-wrap justify-center gap-3">
                                {courseTabs.map((tab) => {
                                    const active = offerTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => setOfferTab(tab.id)}
                                            aria-pressed={active}
                                            className={`inline-flex flex-col items-center gap-0 rounded-md border px-10 py-2 text-lg font-bold transition-all duration-300 ${
                                                active
                                                    ? "border-black bg-black text-white shadow-[0_10px_25px_-8px_rgba(0,0,0,.4)]"
                                                    : "border-black/10 bg-white text-black hover:border-black/30"
                                            }`}
                                        >
                                            {tab.label}

                                            <span
                                                className={`text-[16px] italic ${
                                                    active
                                                        ? "text-white/50"
                                                        : "text-black/40"
                                                }`}
                                            >
                                                {tab.duration}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Carousel */}
                        <div className="relative mt-12">
                            <div
                                className="overflow-hidden"
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                            >
                                <div
                                    className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
                                    style={{
                                        transform: `translateX(-${
                                            slideIndex * (100 / perView)
                                        }%)`,
                                    }}
                                >
                                    {offerCourses.map((course) => (
                                        <div
                                            key={course.title}
                                            className="shrink-0 px-3"
                                            style={{
                                                width: `${100 / perView}%`,
                                            }}
                                        >
                                            <OfferCourseCard course={course} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setSlideIndex((i) => Math.max(i - 1, 0))
                                }
                                disabled={slideIndex === 0}
                                aria-label="Previous courses"
                                className="absolute -left-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white shadow-[0_10px_30px_-8px_rgba(0,0,0,.2)] transition-all duration-200 hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-30 lg:flex"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    setSlideIndex((i) =>
                                        Math.min(i + 1, maxSlide),
                                    )
                                }
                                disabled={slideIndex === maxSlide}
                                aria-label="Next courses"
                                className="absolute -right-5 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white shadow-[0_10px_30px_-8px_rgba(0,0,0,.2)] transition-all duration-200 hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-30 lg:flex"
                            >
                                <ChevronRight size={18} />
                            </button>

                            <div className="mt-8 flex items-center justify-center gap-4 lg:hidden">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSlideIndex((i) => Math.max(i - 1, 0))
                                    }
                                    disabled={slideIndex === 0}
                                    aria-label="Previous courses"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition-colors hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-30"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <div className="flex items-center gap-2">
                                    {Array.from(
                                        { length: maxSlide + 1 },
                                        (_, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => setSlideIndex(i)}
                                                aria-label={`Go to slide ${i + 1}`}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                                    i === slideIndex
                                                        ? "w-6 bg-black"
                                                        : "w-1.5 bg-black/20"
                                                }`}
                                            />
                                        ),
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setSlideIndex((i) =>
                                            Math.min(i + 1, maxSlide),
                                        )
                                    }
                                    disabled={slideIndex === maxSlide}
                                    aria-label="Next courses"
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition-colors hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-30"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>

                            <div className="mt-6 hidden justify-center gap-2 lg:flex">
                                {Array.from(
                                    { length: maxSlide + 1 },
                                    (_, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setSlideIndex(i)}
                                            aria-label={`Go to slide ${i + 1}`}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                                i === slideIndex
                                                    ? "w-6 bg-black"
                                                    : "w-1.5 bg-black/20"
                                            }`}
                                        />
                                    ),
                                )}
                            </div>
                        </div>

                        <div className="mt-10 flex justify-center">
                            <Link
                                href="/courses"
                                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(152,44,220,.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(152,44,220,.35)]"
                            >
                                View Full Course Catalog →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* WHY CHOOSE */}
                <section className="relative overflow-hidden border-t border-black/5 px-5 py-20 bg-[#f5f5f2]">
                    <div className="pointer-events-none absolute -right-32 top-0 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(152,44,220,.06),transparent_70%)] blur-2xl" />
                    <div className="mx-auto max-w-[1050px]">
                        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]  items-center">
                            <div>
                                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                                    WHY US?
                                </div>
                                <h2
                                    className="text-[clamp(28px,4vw,38px)] font-bold leading-[1.08] tracking-[-0.04em] text-black"
                                    style={{
                                        fontFamily: "'Urbanist', sans-serif",
                                    }}
                                >
                                    Why Students Choose AI Excellence Academy
                                </h2>
                            </div>

                            <p
                                className="max-w-[400px] text-[clamp(15px,1.2vw,18px)] leading-[1.7] text-black/50 lg:justify-self-end font-[600]"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            >
                                Expert mentorship, practical learning and
                                career-focused training — AI education made
                                genuinely useful.
                            </p>
                        </div>

                        <div
                            ref={whyRef}
                            className="mt-12 border-t border-black/5"
                        >
                            {whyChoose.map((item, index) => (
                                <div
                                    key={item.number}
                                    style={{
                                        transitionDelay: `${index * 90}ms`,
                                    }}
                                    className={`group relative grid grid-cols-[24px_1fr_36px] items-center gap-4 overflow-hidden border-b border-black/5 py-6 pl-1 pr-2 transition-all duration-700 ease-out sm:grid-cols-[28px_220px_1fr_44px] sm:gap-8 sm:py-7 sm:pl-2 sm:pr-4 ${
                                        whyInView
                                            ? "translate-y-0 opacity-100"
                                            : "translate-y-6 opacity-0"
                                    } motion-reduce:transition-none motion-reduce:transform-none`}
                                >
                                    <span className="-ml-1 select-none font-mono text-[13px] font-normal leading-none text-black/25 transition-colors duration-300 group-hover:text-[#982cdc] sm:-ml-2">
                                        {index + 1}
                                    </span>

                                    <h3 className="max-w-[200px] text-[clamp(17px,1.4vw,20px)] font-bold leading-[1.3] tracking-[-0.02em] text-black">
                                        {item.title}
                                    </h3>

                                    <p className="text-[14px] leading-[1.6] text-black sm:text-[14px]">
                                        {item.description}
                                    </p>

                                    {/* Hover preview thumbnail — centered */}
                                    <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-20 w-32 -translate-x-1/2 -translate-y-1/2 scale-90 overflow-hidden rounded-lg opacity-0 shadow-[0_15px_35px_-8px_rgba(0,0,0,.4)] transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 lg:block z-10">
                                        <img
                                            src={item.image}
                                            alt=""
                                            loading="lazy"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="flex h-9 w-9 items-center justify-center justify-self-end rounded-full border border-black/12 transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
                                        <svg
                                            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M7 17L17 7M17 7H8M17 7v9"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* MENTORS */}
                <section className="px-5 py-20 bg-[#f5f5f2] overflow-hidden">
                    <div className="mx-auto max-w-[1050px]">
                        <div className="text-center mb-12">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                            OUR MENTORS
                        </div>

                            <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-[-0.04em] text-black">
                                Meet the People Behind
                                <br />
                                Your{" "}
                                <span className="bg-[linear-gradient(60deg,#982cdc,#eec369)] bg-clip-text text-transparent">
                                    Success.
                                </span>
                            </h2>

                            <p className="mx-auto mt-4 max-w-[500px] text-[clamp(15px,1.1vw,17px)] leading-[1.6] text-black/50">
                                Learn directly from industry practitioners
                                who've built and shipped real AI products.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                            {mentors.map((mentor) => (
                                <MentorCard key={mentor.name} mentor={mentor} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* WHO WE TRAIN */}
                <section className="relative overflow-hidden bg-[#070d0d] px-5 py-20 text-white">
                    <div
                        className="absolute inset-0 opacity-[.08]"
                        style={{
                            backgroundImage:
                                "radial-gradient(#8b9898 1px,transparent 1px)",
                            backgroundSize: "7px 7px",
                        }}
                    />

                    <div className="relative z-10 mx-auto max-w-[1050px]">
                        <div className="flex items-end justify-between gap-6">
                            <div>
                                <SectionLabel light>WHO WE TRAIN</SectionLabel>
                                <h2 className="text-[28px] font-semibold leading-[1] tracking-[-.05em] sm:text-[32px]">
                                    Who We
                                    <br />
                                    Train.
                                </h2>
                            </div>

                            <div className="hidden max-w-[240px] sm:block">
                                <p className="text-right text-[12px] leading-[1.6] text-white/45">
                                    Whether you're starting your career or
                                    scaling your business, there's a learning
                                    path for you.
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {learners.map((learner, index) => (
                                <div
                                    key={learner.title}
                                    className="group relative flex min-h-[350px] flex-col rounded-2xl border border-white/[0.07] bg-[#0f1616] p-6 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:rotate-[9deg] hover:border-white/20 hover:bg-white hover:shadow-[0_2px_55px_rgba(255,255,255,0.35)]"
                                >
                                    <div className="flex items-start justify-between">
                                        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/80 transition-all duration-300 group-hover:border-black/10 group-hover:bg-black group-hover:text-white">
                                            <learner.icon
                                                size={22}
                                                strokeWidth={1.75}
                                            />
                                        </span>

                                        <span className="font-mono text-xs text-white/25 transition-colors duration-300 group-hover:text-black/30">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    <h3 className="mt-auto pt-8 text-[17px] font-semibold leading-snug tracking-[-0.02em] transition-colors duration-300 group-hover:text-black">
                                        {learner.title} {learner.subtitle}
                                    </h3>

                                    <p className="mt-2.5 text-[13px] leading-[1.65] text-white/45 transition-colors duration-300 group-hover:text-black/55">
                                        {learner.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* TESTIMONIAL */}
                <section className="px-5 py-20 bg-[#f5f5f2] overflow-hidden">
                    <div className="mx-auto max-w-[1050px]">
                        <div className="text-center mb-12">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                            TESTIMONIAL
                        </div>

                            <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-[-0.04em] text-black">
                                Real People. Real Results.
                                <br />
                                <span className="text-black/60 text-[clamp(18px,1.5vw,24px)] font-normal mt-2 block">
                                    feedback
                                </span>
                            </h2>

                            <p className="mx-auto mt-4 max-w-[500px] text-[clamp(15px,1.1vw,17px)] leading-[1.6] text-black/50">
                                See what our users are truly accomplishing with
                                honest, and project-based reviews
                            </p>
                        </div>

                        {/* Testimonial Sticky Stack */}
                        <div className="tstack " ref={stackRef}>
                            {testimonials.map((testimonial, index) => (
                                <article
                                    key={index}
                                    className={`tstack-card will-change-transform ${
                                        tstackVariants[
                                            index % tstackVariants.length
                                        ]
                                    }`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className="tstack-mark"
                                    >
                                        &ldquo;
                                    </span>

                                    <p className="tstack-quote">
                                        {testimonial.quote}
                                    </p>

                                    <div className="tstack-foot">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            loading="eager"
                                            className="tstack-avatar"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <p className="tstack-name">
                                                {testimonial.name}
                                            </p>
                                            <p className="tstack-role muted">
                                                {testimonial.position}
                                            </p>
                                        </div>
                                        <div className="flex shrink-0 items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="w-4 h-4 text-[#eec369] fill-current"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="mt-10 flex justify-center">
                            <Link
                                href="/testimonials"
                                className=" group inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-5 py-2 text-[13.5px] font-semibold text-white shadow-[0_10px_28px_-8px_rgba(152,44,220,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-8px_rgba(152,44,220,0.6)]"
                            >
                                View More
                                <svg
                                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* PLACEMENT */}

                <Placementsnapshot/>
                {/* FINAL CTA */}
                <section className="border-t border-black/5 px-5 py-24 text-center bg-[#f5f5f2]">
                    <div className="mx-auto max-w-[700px]">
                        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-xs font-medium text-black/70 backdrop-blur-sm mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                            START YOUR JOURNEY
                        </div>

                        <h2 className="text-[clamp(32px,5vw,48px)] font-bold leading-[1.08] tracking-[-0.04em] text-black">
                            Your AI career starts with
                            <br />
                            <span className="bg-[linear-gradient(60deg,#982cdc,#eec369)] bg-clip-text text-transparent">
                                one conversation
                            </span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-[520px] text-[clamp(17px,1.2vw,20px)] leading-[1.7] text-black/50">
                            Tell us where you are today and where you want to
                            go. Our counselors will help you choose the right
                            learning path.
                        </p>

                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-10 py-4 text-[clamp(15px,1.1vw,18px)] font-semibold text-white shadow-[0_8px_25px_rgba(152,44,220,.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(152,44,220,.35)]"
                            >
                                Book Your Free Counselling
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
