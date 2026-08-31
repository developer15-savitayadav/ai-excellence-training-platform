import { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import PublicLayout from "../../Layouts/PublicLayout";
import RevealDiv, { useReveal } from "../../Components/RevealDiv"; 
import TestimonialSlider from "../../Components/TestimonialSlider";
import FaqSection from "../../Components/FAQSection";
const SHORT_TERM = [
    {
        id: 1,
        title: "AI Tools Mastery — Work Smarter with AI",
        slug: "ai-tools-mastery",
        duration: "4 weeks",
        hours: "32 hrs",
        classesPerWeek: 3,
        tagline: "Use AI confidently in your work, studies and business — no coding required.",
        price: "Contact us",
        whoItsFor: "Students, teachers, shop owners, job-seekers, homemakers and government exam aspirants. If you have used WhatsApp, you can do this course.",
        whatYouLearn: [
            "How AI really works — what large language models can and cannot do",
            "ChatGPT, Claude and Gemini — hands-on comparison and when to use which",
            "Writing with AI — emails, applications, reports, social media posts, translation",
            "AI for images, video and presentations — Canva AI, image generators, slide decks",
            "AI for study and exams — notes, summaries, mock questions, doubt solving",
            "AI for small business — invoices, catalogues, WhatsApp marketing, customer replies",
            "Staying safe — spotting hallucinations and verifying AI output"
        ],
        walkAwayWith: "Your own Personal AI Toolkit document and three real tasks from your own work or study, completed with AI.",
        upgradeBenefit: "Your full course fee is adjusted against any Professional or Career program if you enrol within 60 days.",
        cta: "Enrol Now · New batch starts every month"
    },
    {
        id: 2,
        title: "Python Programming Foundation",
        slug: "python-programming-foundation",
        duration: "6 weeks",
        hours: "48 hrs",
        classesPerWeek: 4,
        tagline: "The one skill every AI and data career starts with.",
        price: "Contact us",
        whoItsFor: "Freshers, BCA/B.Tech/BSc students, and anyone planning to move into AI, data analytics or machine learning.",
        whatYouLearn: [
            "Setup, IDE, variables, data types and operators",
            "Control flow, loops and functions",
            "Data structures — lists, dictionaries, sets, tuples",
            "File handling, exceptions and modules",
            "Object-oriented programming — classes, objects, inheritance",
            "Introduction to NumPy and Pandas",
            "Mini project and debugging practice"
        ],
        walkAwayWith: "Two mini projects on your own GitHub profile — for example, an expense tracker and a data-cleaning tool.",
        upgradeBenefit: "This course is the recommended prerequisite for our Advanced Diploma and Career Track. Enrol in either within 60 days and your full course fee is adjusted against the fee.",
        cta: "Enrol Now"
    },
    {
        id: 3,
        title: "Generative AI & Prompt Engineering",
        slug: "generative-ai-prompt-engineering",
        duration: "6 weeks",
        hours: "48 hrs",
        classesPerWeek: null,
        tagline: "The most in-demand AI skill of 2026 — taught properly, in person, in Lucknow.",
        price: "Contact us",
        whoItsFor: "Working professionals, marketers, content creators, freelancers and anyone who wants to build and sell AI-powered workflows.",
        whatYouLearn: [
            "LLM foundations — tokens, context windows, temperature, why models hallucinate",
            "Prompt engineering — zero-shot, few-shot, chain-of-thought, role prompting, output control",
            "Building custom GPTs and Claude Projects for specific workflows",
            "RAG concepts — document Q&A and company knowledge bases",
            "AI automation — Zapier, Make.com, n8n and no-code agent workflows",
            "Monetisation — freelancing on Upwork and Fiverr, pricing AI services, winning clients"
        ],
        walkAwayWith: "One deployed custom AI assistant and a freelance portfolio page ready to share with clients.",
        upgradeBenefit: null,
        cta: "Enrol Now · Limited to 25 seats per batch"
    },
    {
        id: 4,
        title: "AI for Business Owners & Professionals (Weekend)",
        slug: "ai-for-business",
        duration: "4 weeks",
        hours: "24 hrs",
        classesPerWeek: "Weekend batches",
        tagline: "Run your business smarter in four weekends.",
        price: "Contact us",
        badge: "Weekend",
        whoItsFor: "Shop owners, clinic and institute owners, agency founders, consultants, managers and senior professionals who want practical AI results without taking time off during the week.",
        whatYouLearn: [
            "Hands-on use of AI for customer communication",
            "Marketing content",
            "WhatsApp and email campaigns",
            "Documents and reports",
            "Data summaries",
            "Day-to-day decision support — built around your own business"
        ],
        walkAwayWith: "A working AI system for at least three recurring tasks in your business.",
        upgradeBenefit: null,
        cta: "Reserve a Weekend Seat"
    },
    {
        id: 5,
        title: "Summer / Winter Training — AKTU-Compliant",
        slug: "summer-winter-training",
        duration: "45 days",
        hours: "60 hrs",
        classesPerWeek: null,
        tagline: "Industrial training that satisfies your college and actually teaches you something.",
        price: "Contact us",
        badge: "AKTU",
        whoItsFor: "Engineering and degree students from AKTU-affiliated colleges who need a 4–6 week industrial training certificate.",
        tracks: ["AI/ML", "Python", "Data Science", "Digital Marketing with AI"],
        collegeRequirements: [
            "Official training letter on enrolment",
            "Project report in the prescribed format",
            "Viva preparation and support",
            "Stamped completion certificate"
        ],
        forColleges: "We partner directly with training and placement departments for on-campus or in-house batches. See our College Partnerships page.",
        walkAwayWith: null,
        upgradeBenefit: null,
        cta: "Register for the Next Cycle"
    },
    {
        id: 6,
        title: "Digital Marketing with AI — Professional",
        slug: "digital-marketing-with-ai",
        duration: "3 months",
        hours: "100 hrs",
        classesPerWeek: 5,
        tagline: "Learn marketing the way agencies practise it in 2026 — and run a live campaign with a real budget.",
        price: "Contact us",
        emi: "No-cost EMI available — contact us for the payment plan.",
        whoItsFor: "Graduates, freshers, business owners and anyone targeting agency, brand or freelance marketing roles.",
        whatYouLearn: [
            "Foundations — the digital ecosystem, funnels, buyer psychology, KPIs",
            "Websites and landing pages — WordPress, AI site builders, conversion basics",
            "SEO with AI — keyword research, on-page and technical SEO, AI content briefs, GEO/AEO for AI search",
            "Content and creative with AI — copywriting, image generation, short-form video, brand voice",
            "Meta Ads — campaign structure, audiences, creative testing, Advantage+",
            "Google Ads — Search, Performance Max, Keyword Planner, AI bidding",
            "Social media management — organic strategy, calendars, AI scheduling tools",
            "Email and WhatsApp marketing — automation, sequences, AI personalisation",
            "Analytics — GA4, Search Console, Looker Studio dashboards, AI-assisted reporting"
        ],
        theDifference: "You run a live ad campaign with a real ad budget funded by the academy, and graduate with a complete case study you can show any employer or client.",
        careerServices: [
            "GitHub/portfolio setup",
            "1-on-1 ATS resume building",
            "LinkedIn optimisation",
            "2 mock interviews",
            "Job referrals to hiring partners",
            "Lifetime batch re-attendance"
        ],
        walkAwayWith: null,
        upgradeBenefit: null,
        cta: "Enrol Now · Book a Free Demo Class"
    },
    {
        id: 7,
        title: "Python for Data Analytics",
        slug: "python-for-data-analytics",
        duration: "3 months",
        hours: "96 hrs",
        classesPerWeek: null,
        tagline: "Turn raw data into decisions — the fastest route into analyst roles.",
        price: "Contact us",
        emi: "No-cost EMI available",
        whoItsFor: "Graduates from any stream, commerce and finance professionals, and freshers targeting data analyst, business analyst or MIS roles.",
        whatYouLearn: [
            "Python for data work",
            "Pandas and NumPy",
            "Data cleaning and transformation",
            "SQL",
            "Visualisation with Matplotlib and Power BI",
            "Descriptive statistics",
            "Dashboards and business reporting"
        ],
        walkAwayWith: "A portfolio of analysis projects and dashboards on GitHub, plus the full Professional career services package.",
        upgradeBenefit: null,
        cta: "Enrol Now"
    },
    {
        id: 8,
        title: "Applied Machine Learning",
        slug: "applied-machine-learning",
        duration: "4 months",
        hours: "128 hrs",
        classesPerWeek: null,
        tagline: "From data to deployed model in four months.",
        price: "Contact us",
        emi: "No-cost EMI available — contact us for the payment plan.",
        prerequisite: "Python Foundation or our entrance test",
        whoItsFor: null,
        whatYouLearn: [
            "Math intuition — statistics, probability and linear algebra essentials, without heavy theory",
            "Data wrangling — Pandas, NumPy, cleaning, feature engineering",
            "Visualisation — Matplotlib, Seaborn, Power BI basics",
            "SQL for data work",
            "Supervised learning — regression, classification, trees, ensembles",
            "Unsupervised learning — clustering, PCA, recommendation systems",
            "Model evaluation, tuning and deployment with Streamlit and Flask",
            "Capstone project"
        ],
        walkAwayWith: "A deployed capstone model and a GitHub portfolio, plus the full Professional career services package.",
        upgradeBenefit: null,
        cta: "Enrol Now · Take the Free Entrance Test"
    },
    {
        id: 9,
        title: "Advanced Diploma in AI & Machine Learning — FLAGSHIP",
        slug: "advanced-diploma-ai-ml",
        duration: "6 months",
        hours: "220 hrs",
        classesPerWeek: "5 days a week, 2 hours a day",
        tagline: "Six months. Seven deployed projects. A portfolio that gets you interviews.",
        price: "Contact us",
        emi: "No-cost EMI available — contact us for the payment plan.",
        whoItsFor: "Freshers and career changers who want to become AI/ML engineers, data scientists or AI developers — and are ready to put in the work.",
        monthlyJourney: [
            { month: 1, title: "Programming & Data Foundations", hours: 40, topics: "Python deep-dive, Git and GitHub, Jupyter, Pandas, NumPy, SQL" },
            { month: 2, title: "Statistics & Data Analysis", hours: 36, topics: "Descriptive and inferential statistics, hypothesis testing, EDA, visualisation, Power BI" },
            { month: 3, title: "Core Machine Learning", hours: 40, topics: "Regression, classification, decision trees, random forest, XGBoost, clustering, model evaluation, feature engineering" },
            { month: 4, title: "Deep Learning", hours: 40, topics: "Neural networks, TensorFlow/Keras, CNNs for computer vision, RNNs, transfer learning" },
            { month: 5, title: "NLP & Generative AI", hours: 40, topics: "Text processing, embeddings, transformers, LLM APIs, RAG systems, LangChain, building AI agents, fine-tuning basics" },
            { month: 6, title: "Deployment, Capstone & Career", hours: 24, topics: "Streamlit, FastAPI, Hugging Face Spaces, cloud basics, MLOps introduction, capstone project, portfolio build, interview preparation" }
        ],
        walkAwayWith: "6 graded projects + 1 capstone, all deployed and live on your GitHub.",
        included: [
            "Full career services package — 1-on-1 resume building, LinkedIn and GitHub optimisation, 5+ mock interviews, 20 hours of aptitude and communication training, priority job referrals",
            "Lifetime batch re-attendance",
            "Daily doubt-clearing lab access, 10 AM – 7 PM"
        ],
        upgradeBenefit: null,
        cta: "Apply Now · Book a Campus Visit"
    },
    {
        id: 10,
        title: "AI-Powered Digital Marketing Specialist",
        slug: "ai-digital-marketing-specialist",
        duration: "6 months",
        hours: "200 hrs",
        classesPerWeek: null,
        tagline: "Become the marketer agencies are competing to hire.",
        price: "Contact us",
        emi: "No-cost EMI available",
        whoItsFor: "Graduates and professionals who want a complete, career-grade marketing education with AI at its core — and placement support to match.",
        whatYouLearn: "Everything in our Digital Marketing with AI Professional program, extended with advanced paid media, marketing automation, AI-driven content systems, performance analytics, client and campaign management, and multiple live campaigns across platforms.",
        walkAwayWith: "A multi-campaign portfolio with real results, plus the full Career-tier services package including 5+ mock interviews, aptitude and communication training, and priority placement referrals.",
        upgradeBenefit: null,
        cta: "Apply Now"
    },
    {
        id: 11,
        title: "Data Science & AI Career Track — with Internship",
        slug: "data-science-ai-career-track",
        duration: "9 months",
        hours: "320 hrs",
        classesPerWeek: null,
        tagline: "Graduate with a portfolio, an internship certificate and an experience letter.",
        price: "Contact us",
        emi: "No-cost EMI available — contact us for the payment plan.",
        whoItsFor: "Students who want the strongest possible start — real work experience on their CV before their first job application.",
        months1to6: "The complete Advanced Diploma in AI & Machine Learning curriculum.",
        months7to9: [
            "Three months working on live client or academy projects under supervision",
            "Advanced MLOps, Docker, and cloud deployment (AWS/GCP basics)",
            "Business communication and client-handling training",
            "Internship completion certificate and experience letter",
            "Priority placement queue"
        ],
        whyThisMatters: "Lucknow freshers compete with NCR candidates who often already have internships. An experience letter closes that gap.",
        walkAwayWith: null,
        upgradeBenefit: null,
        cta: "Apply Now · Limited seats per cohort"
    }
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
    },
    {
        title: "Marketer Combo",
        courses: "Generative AI + Digital Marketing with AI",
        note: "Bundled savings — contact us for pricing",
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

const CURRICULUM_MODULES = [
    {
        id: 1,
        label: "Module-1",
        heading: "Understanding the Subject",
        sub: "Module 1",
        lectures: [
            { num: 1, title: "Subject Overview" },
            { num: 2, title: "Subject Overview" },
        ],
    },
    {
        id: 2,
        label: "Module-2",
        heading: "Understanding the Subject",
        sub: "Module 2",
        lectures: [],
    },
    {
        id: 3,
        label: "Module-3",
        heading: "Understanding the Subject",
        sub: "Module 3",
        lectures: [],
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

 

function PlayIcon() {
    return (
        <svg className="ml-0.5 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.14v13.72c0 .79.87 1.27 1.54.84l10.15-6.86a1 1 0 0 0 0-1.66L9.54 4.3A1 1 0 0 0 8 5.14Z" />
        </svg>
    );
}



const ALL_COURSES = [...SHORT_TERM, ...PROFESSIONAL, ...CAREER];

const NAV_TABS = [
    { id: "eligibility", label: "Eligibility" },
    { id: "about-course", label: "About Course" },
    { id: "learning", label: "Learning" },
    { id: "tools", label: "Tools" },
    { id: "curriculum", label: "Curriculum" },
    { id: "alumni", label: "Alumni" },
    { id: "faq", label: "FAQ" },
];

function StickyNav() {
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState("");
    const triggerRef = useRef(null);

    useEffect(() => {
        const trigger = triggerRef.current;
        if (!trigger) return;
        const obs = new IntersectionObserver(
            ([e]) => setVisible(!e.isIntersecting),
            { threshold: 0 },
        );
        obs.observe(trigger);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (!visible) return;
        const observers = [];
        NAV_TABS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([e]) => { if (e.isIntersecting) setActive(id); },
                { rootMargin: "-35% 0px -60% 0px" },
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((o) => o.disconnect());
    }, [visible]);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <div ref={triggerRef} className="h-0" />

            <div
                className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-[999] transition-all duration-300 ease-out ${
                    visible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-6 opacity-0 pointer-events-none"
                }`}
                style={{ width: "min(650px, calc(100% - 32px))" }}
            >
                <div className="flex items-center gap-1 rounded-[20px] bg-white/92 backdrop-blur-xl border border-black/[0.07] shadow-[0_8px_32px_rgba(0,0,0,.12),0_2px_8px_rgba(0,0,0,.06)] px-2 py-1.5">
                    <div className="flex items-center gap-0.5 flex-1 overflow-x-auto no-scrollbar">
                        {NAV_TABS.map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => scrollTo(id)}
                                className={`shrink-0 px-3 py-2 text-[12.5px] font-semibold rounded-xl transition-all duration-200 ${
                                    active === id
                                        ? "bg-surface text-white shadow-sm"
                                        : "text-black/50 hover:text-black hover:bg-black/[0.04]"
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <Link
                        href="/contact"
                        className="shrink-0 ml-1 inline-flex items-center gap-1.5 rounded-2xl bg-[linear-gradient(60deg,#982cdc,#eec369)] px-4 py-2 text-[12.5px] font-bold text-white shadow-[0_2px_10px_rgba(152,44,220,.28)] hover:shadow-[0_4px_16px_rgba(152,44,220,.38)] hover:-translate-y-px transition-all duration-300"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                        Enquiry
                    </Link>
                </div>
            </div>
        </>
    );
}

export default function CoursesShow({ slug }) {
    const [openModules, setOpenModules] = useState(new Set([0]));
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);

    const course = ALL_COURSES.find((c) => c.slug === slug);
    if (!course) {
        return (
            <PublicLayout>
                <section className="min-h-screen bg-ink flex items-center justify-center">
                    <div className="text-center px-6">
                        <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-black mb-4">
                            Course Not Found
                        </h1>
                        <p className="text-muted mb-8">
                            The course you are looking for does not exist or has
                            been moved.
                        </p>
                        <Link
                            href="/courses"
                            className="rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(152,44,220,.25)] hover:shadow-[0_10px_28px_rgba(152,44,220,.38)] hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Browse All Courses
                        </Link>
                    </div>
                </section>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <StickyNav />
            <section className="min-h-screen bg-ink">
                {/* ═══════════════ HERO ═══════════════ */}
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute -top-32 left-[8%] w-[520px] h-[300px] rounded-full bg-violet/[0.07] blur-[120px]" />
                        <div className="absolute top-[30%] right-[5%] w-[420px] h-[250px] rounded-full bg-lime/[0.06] blur-[110px]" />
                        <div className="absolute -bottom-20 left-[35%] w-[350px] h-[200px] rounded-full bg-violet/[0.04] blur-[100px]" />
                    </div>

                    <div className="relative z-10 mx-auto max-w-[1240px] px-6 pt-[48px] pb-14 max-lg:pt-[48px] grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
                        <div>
                            <RevealDiv>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet/[0.07] border border-violet/15 mb-6">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-violet" />
                                    </span>
                                    <span className="font-mono text-[11px] text-violet uppercase tracking-wider">
                                        Ai Excilence Academy
                                    </span>
                                </div>
                            </RevealDiv>

                            <RevealDiv delay={80}>
                                <h1 className="font-display text-[clamp(2.1rem,3.8vw,3.2rem)] font-bold tracking-[-0.035em] leading-[1.08]">
                                    <span className="bg-[linear-gradient(90deg,#eec369,#982cdc)] bg-clip-text text-transparent">
                                        AI Tools Mastery
                                    </span>
                                    <br className="hidden sm:block" />
                                    <span className="text-black">
                                        {" "}— Work Smarter with AI
                                    </span>
                                </h1>
                            </RevealDiv>

                            <RevealDiv delay={160}>
                                <p className="text-muted text-lg mt-5 max-w-xl leading-relaxed">
                                    Use AI confidently in your work, studies and business — no coding required.
                                </p>
                            </RevealDiv>

                            <RevealDiv delay={240}>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Link
                                        href="/contact"
                                        className="rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(152,44,220,.25)] hover:shadow-[0_10px_28px_rgba(152,44,220,.38)] hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        Enrol Now
                                    </Link>
                                    <Link
                                        href="#about-course"
                                        className="rounded-full bg-surface px-7 py-3.5 text-sm font-semibold text-white hover:bg-surface/80 hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        Download Curriculum
                                    </Link>
                                </div>
                            </RevealDiv>
                        </div>

                        <RevealDiv delay={120}>
                            <img
                                src="/assets/images/ai-hero-robot.png"
                                alt=""
                                className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto object-contain drop-shadow-[0_20px_60px_rgba(152,44,220,0.12)]"
                            />
                        </RevealDiv>
                    </div>

                    {/* Stat Bar */}
                    <div className="border-y border-black/[0.06] bg-white/80 backdrop-blur-sm">
                        <div className="mx-auto max-w-[1240px] px-6 grid grid-cols-2 sm:grid-cols-4 divide-x divide-black/[0.08]">
                            <div className="flex flex-col items-center justify-center gap-1 py-5 px-4 text-center">
                                <span className="text-xs text-muted font-medium">
                                    Language
                                </span>
                                <span className="text-lg font-bold text-black">
                                    Hinglish
                                </span>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1 py-5 px-4 text-center">
                                <span className="text-xs text-muted font-medium">
                                    Classes per week
                                </span>
                                <span className="text-lg font-bold text-black">
                                    3 classes a week
                                </span>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1 py-5 px-4 text-center">
                                <span className="text-xs text-muted font-medium">
                                    Duration
                                </span>
                                <span className="text-lg font-bold text-black">
                                    4 Weeks (32 Hours)
                                </span>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1 py-5 px-4 text-center">
                                
                                <Link
                                    href="/contact"
                                    className="group inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-5 py-2 text-[13.5px] font-semibold text-white shadow-[0_10px_28px_-8px_rgba(152,44,220,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-8px_rgba(152,44,220,0.6)]"
                                >
                                    Contact us for pricing
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-14" />

                {/* ═══════════════ WHO IT'S FOR ═══════════════ */}
                <div id="eligibility" className="mx-auto max-w-[1240px] px-6 pb-20">
                    <RevealDiv>
                        <div className="mb-10">
                            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-violet mb-2">
                                WHO IT&apos;S FOR_
                            </p>

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
            </section>

            {/* ═══════════════ STACKED GROUP: About Course + Learning ═══════════════ */}
            <div className="relative z-[0] isolate">
                {/* ═══════════════ ABOUT COURSE CARD ═══════════════ */}
                <div
                    id="about-course"
                    className="sticky top-[100px] z-[1] mx-auto max-w-[1240px] px-6 pb-20"
                >
                    <RevealDiv>
                        <div className="rounded-[22px] bg-white border border-black/[0.04] shadow-[0_8px_32px_rgba(152,44,220,0.06)] px-8 sm:px-10 lg:px-12 py-10 sm:py-12 hover:shadow-[0_16px_50px_rgba(152,44,220,0.12)] transition-all duration-400">
                            <div className="grid grid-cols-1 md:grid-cols-[170px_1fr] gap-8 md:gap-12 items-start">
                                <div className="pt-1">
                                    <span className="inline-flex items-center justify-center rounded-full bg-violet px-6 py-2.5 text-[13px] font-semibold text-white whitespace-nowrap shadow-[0_4px_12px_rgba(152,44,220,.2)]">
                                        About Course
                                    </span>
                                </div>

                                <div className="max-w-[900px]">
                                    <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.035em] leading-tight text-black">
                                        {course.title}
                                    </h2>

                                    <div className="mt-5 flex flex-wrap gap-4 text-sm text-black/50">
                                        {course.duration && (
                                            <span className="inline-flex items-center gap-1.5">
                                                <svg
                                                    className="w-4 h-4 text-violet/60"
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
                                        )}
                                        {course.hours && (
                                            <span className="inline-flex items-center gap-1.5">
                                                <svg
                                                    className="w-4 h-4 text-violet/60"
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
                                        )}
                                    </div>

                                    <div className="mt-6 space-y-5">
                                        <p className="text-[17px] sm:text-[19px] leading-[1.4] text-black/55">
                                            {course.description ||
                                                course.tagline ||
                                                `Start unlocking your potential by learning cutting-edge tools, building real-world expertise, and developing critical skills needed to thrive in the dynamic field of AI, data science, and next-generation technology. Whether you're starting your career, switching industries, or scaling your business, this program equips you with the practical knowledge to stay ahead in an ever-evolving digital landscape. ${course.title}.`}
                                        </p>
                                        <p className="text-[17px] sm:text-[19px] leading-[1.4] text-black/55">
                                            Start unlocking your potential by learning cutting-edge tools, building real-world expertise, and developing critical skills needed to thrive in the dynamic field of AI, data science, and next-generation technology. Whether you're starting your career, switching industries, or scaling your business, this program equips you with the practical knowledge to stay ahead in an ever-evolving digital landscape.
                                            {` ${course.title}.`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealDiv>
                </div>

                {/* ═══════════════ WHAT YOU WILL LEARN ═══════════════ */}
                <div id="learning" className="sticky top-0 z-[2] mx-auto max-w-[1240px] px-6 pb-20">
                    <RevealDiv>
                        <div className="rounded-[22px] bg-white border border-black/[0.04] shadow-[0_12px_40px_rgba(152,44,220,0.06)] p-8 sm:p-10 lg:p-12">
                            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-12 items-start">
                                <div className="flex flex-col items-start">
                                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-violet mb-2">
                                        LEARNING OUTCOMES_
                                    </p>
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
            </div>

                {/* ═══════════════ MASTER THESE TOOLS ═══════════════ */}
                <section id="tools" className="bg-ink border-y border-black/[0.06] overflow-hidden">
                    <RevealDiv>
                        <div className="py-16 sm:py-20 text-center">
                            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-violet mb-2">
                                TOOLS_
                            </p>
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

                {/* ═══════════════ COURSE CURRICULUM ═══════════════ */}
                <section id="curriculum" className="bg-ink py-20 sm:py-24">
                    <div className="mx-auto max-w-[1240px] px-6">
                        <RevealDiv>
                            <div className="text-center mb-10">
                                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-violet mb-2">
                                    CURRICULUM_
                                </p>
                                <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-bold tracking-[-0.04em] text-black">
                                    Course Curriculum
                                </h2>
                            </div>
                        </RevealDiv>

                        <RevealDiv delay={100}>
                            <div className="rounded-[20px] border border-black/[0.08] bg-white/60 backdrop-blur-sm overflow-hidden">
                                {CURRICULUM_MODULES.map((mod, i) => {
                                    const isOpen = openModules.has(i);
                                    return (
                                        <div
                                            key={mod.id}
                                            className={`${i > 0 ? "border-t border-black/[0.06]" : ""}`}
                                        >
                                            {/* Accordion Header */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setOpenModules((prev) => {
                                                        const next = new Set(prev);
                                                        if (next.has(i)) next.delete(i);
                                                        else next.add(i);
                                                        return next;
                                                    });
                                                }}
                                                className={`w-full flex items-center gap-5 px-6 sm:px-7 py-5 sm:py-6 text-left transition-colors duration-300 ${
                                                    isOpen
                                                        ? "bg-[#cdbdff]/50"
                                                        : "hover:bg-[#cdbdff]/25"
                                                }`}
                                            >
                                                <span className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-surface" />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-[15px] font-semibold text-black">
                                                        {mod.heading}
                                                    </h3>
                                                    <p className="mt-0.5 text-sm italic text-black/40">
                                                        {mod.sub}
                                                    </p>
                                                </div>
                                                <span className="text-xs font-semibold text-black/35 shrink-0 hidden sm:block">
                                                    {mod.lectures.length} Lectures
                                                </span>
                                                <svg
                                                    className={`w-5 h-5 shrink-0 text-black/40 transition-transform duration-300 ${
                                                        isOpen ? "rotate-180" : ""
                                                    }`}
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                                    />
                                                </svg>
                                            </button>

                                            {/* Accordion Content */}
                                            <div
                                                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                                                    isOpen
                                                        ? "grid-rows-[1fr] opacity-100"
                                                        : "grid-rows-[0fr] opacity-0"
                                                }`}
                                            >
                                                <div className="overflow-hidden">
                                                    <div className="px-6 sm:px-7 pb-5 sm:pb-6">
                                                        {mod.lectures.length > 0 ? (
                                                            <div className="space-y-2.5 pt-1">
                                                                {mod.lectures.map((lec) => (
                                                                    <div
                                                                        key={lec.num}
                                                                        className="flex min-h-[66px] items-center justify-between rounded-[10px] bg-white px-5 border border-black/[0.04] hover:border-violet/20 hover:shadow-[0_4px_16px_rgba(152,44,220,.06)] transition-all duration-300"
                                                                    >
                                                                        <div>
                                                                            <p className="text-[11px] font-semibold text-[#765bc4]">
                                                                                Lecture - {lec.num}
                                                                            </p>
                                                                            <p className="mt-1 text-[16px] font-medium text-black">
                                                                                {lec.title}
                                                                            </p>
                                                                        </div>
                                                                        <button
                                                                            type="button"
                                                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet text-white hover:bg-violet/85 hover:scale-110 transition-all duration-200"
                                                                            aria-label={`Play Lecture ${lec.num}`}
                                                                        >
                                                                            <PlayIcon />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="pt-2 text-sm text-black/30 italic">
                                                                Content coming soon
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </RevealDiv>
                    </div>
                </section>

                {/* ═══════════════ CTA BANNER ═══════════════ */}
                <div className="bg-surface relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-violet/[0.12] blur-[140px]" />
                    </div>
                    <div className="relative z-10 mx-auto max-w-[1240px] px-6 py-20 sm:py-24 text-center">
                        <RevealDiv>
                            <h2 className="font-display text-[clamp(2rem,4vw,2.6rem)] font-bold tracking-[-0.04em] text-white leading-tight">
                                Ready to Start Your AI{" "}
                                <span className="text-[#765bc4]">Journey</span>{" "}
                                ?
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
