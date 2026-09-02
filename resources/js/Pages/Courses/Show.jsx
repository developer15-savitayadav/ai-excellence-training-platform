import { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
        tagline:
            "Use AI confidently in your work, studies and business — no coding required.",
        price: "Contact us",
        whoItsFor:
            "Students, teachers, shop owners, job-seekers, homemakers and government exam aspirants. If you have used WhatsApp, you can do this course.",
        whatYouLearn: [
            "How AI really works — what large language models can and cannot do",
            "ChatGPT, Claude and Gemini — hands-on comparison and when to use which",
            "Writing with AI — emails, applications, reports, social media posts, translation",
            "AI for images, video and presentations — Canva AI, image generators, slide decks",
            "AI for study and exams — notes, summaries, mock questions, doubt solving",
            "AI for small business — invoices, catalogues, WhatsApp marketing, customer replies",
            "Staying safe — spotting hallucinations and verifying AI output",
        ],
        walkAwayWith:
            "Your own Personal AI Toolkit document and three real tasks from your own work or study, completed with AI.",
        upgradeBenefit:
            "Your full course fee is adjusted against any Professional or Career program if you enrol within 60 days.",
        cta: "Enrol Now · New batch starts every month",
    },
    {
        id: 2,
        title: "Learn Python From Zero to Job-Ready Foundations",
        slug: "python-programming-foundation",
        duration: "6 weeks",
        hours: "48 hrs",
        classesPerWeek: 5,
        tagline:
            "Build a rock-solid programming base in 6 weeks — live classes, daily coding practice, real mini-projects, and a final project you can show in interviews.",
        price: "Contact us",
        whoItsFor:
            "Freshers, BCA/B.Tech/BSc students, and anyone planning to move into AI, data analytics or machine learning.",
        whatYouLearn: [
            "Setup, IDE, variables, data types and operators",
            "Control flow, loops and functions",
            "Data structures — lists, dictionaries, sets, tuples",
            "File handling, exceptions and modules",
            "Object-oriented programming — classes, objects, inheritance",
            "Introduction to NumPy and Pandas",
            "Mini project and debugging practice",
        ],
        walkAwayWith:
            "Two mini projects on your own GitHub profile — for example, an expense tracker and a data-cleaning tool.",
        upgradeBenefit:
            "This course is the recommended prerequisite for our Advanced Diploma and Career Track. Enrol in either within 60 days and your full course fee is adjusted against the fee.",
        cta: "Next batch starts [DATE] · [Online / Classroom / Hybrid] · No prior coding experience needed",
    },
    {
        id: 3,
        title: "Master Generative AI & Prompt Engineering",
        slug: "generative-ai-prompt-engineering",
        duration: "6 weeks",
        hours: "48 hrs",
        classesPerWeek: null,
        tagline:
            "Learn to command tools like ChatGPT, Claude, and Gemini — then go further: build custom AI assistants, automate workflows, and create images, audio, and video with AI. In 6 weeks, become the AI person in the room.",
        price: "Contact us",
        whoItsFor:
            "Working professionals, marketers, content creators, freelancers and anyone who wants to build and sell AI-powered workflows.",
        whatYouLearn: [
            "LLM foundations — tokens, context windows, temperature, why models hallucinate",
            "Prompt engineering — zero-shot, few-shot, chain-of-thought, role prompting, output control",
            "Building custom GPTs and Claude Projects for specific workflows",
            "RAG concepts — document Q&A and company knowledge bases",
            "AI automation — Zapier, Make.com, n8n and no-code agent workflows",
            "Monetisation — freelancing on Upwork and Fiverr, pricing AI services, winning clients",
        ],
        walkAwayWith:
            "One deployed custom AI assistant and a freelance portfolio page ready to share with clients.",
        upgradeBenefit: null,
        cta: "Enrol Now · Batch Starts [DATE]",
    },
    {
        id: 4,
        title: "Put AI to Work in Your Business — Without Disturbing Your Work Week",
        slug: "ai-for-business",
        duration: "4 weeks",
        hours: "24 hrs",
        classesPerWeek: "Weekend batches",
        tagline:
            "A weekend-only program for business owners, managers, and senior professionals. In 4 weekends, learn to use AI for marketing, operations, customer communication, and decision-making — and leave with automations running in your own business.",
        price: "Contact us",
        badge: "Weekend",
        whoItsFor:
            "Shop owners, clinic and institute owners, agency founders, consultants, managers and senior professionals who want practical AI results without taking time off during the week.",
        whatYouLearn: [
            "Hands-on use of AI for customer communication",
            "Marketing content",
            "WhatsApp and email campaigns",
            "Documents and reports",
            "Data summaries",
            "Day-to-day decision support — built around your own business",
        ],
        walkAwayWith:
            "A working AI system for at least three recurring tasks in your business.",
        upgradeBenefit: null,
        cta: "Next batch starts [DATE] · [Sat–Sun, TIMINGS] · Limited to [20] seats",
    },
    {
        id: 5,
        title: "Summer & Winter Training That Ticks Every University Box — and Actually Teaches You Something",
        slug: "summer-winter-training",
        duration: "45 days",
        hours: "60 hrs",
        classesPerWeek: null,
        tagline:
            "A 45-day, project-based industrial training program aligned with AKTU requirements — complete with training certificate, project report guidance, and viva preparation. Learn real skills, build a real project, and submit with confidence.",
        price: "Contact us",
        badge: "AKTU",
        whoItsFor:
            "Engineering and degree students from AKTU-affiliated colleges who need a 4–6 week industrial training certificate.",
        tracks: [
            "Python with Data Science",
            "Generative AI & Prompt Engineering",
            "Web Development",
            "Machine Learning Basics",
        ],
        collegeRequirements: [
            "Industrial training certificate (45 days) on completion",
            "Project completion letter on request",
            "Project report guidance in the standard university format (cover page, certificate, abstract, chapters, references)",
            "PPT and viva preparation with mock question rounds",
            "Attendance records maintained for verification",
        ],
        collegeRequirements: [
            "Industrial training certificate (45 days) on completion",
            "Project completion letter on request",
            "Project report guidance in the standard university format",
            "PPT and viva preparation with mock question rounds",
            "Attendance records maintained for verification",
        ],
        forColleges:
            "We partner directly with training and placement departments for on-campus or in-house batches. See our College Partnerships page.",
        walkAwayWith: null,
        upgradeBenefit: null,
        cta: "Summer batch: [DATES] · Winter batch: [DATES] · [Online / Classroom] · Certificate on completion",
    },
    {
        id: 6,
        title: "Digital Marketing with AI — Professional",
        slug: "digital-marketing-with-ai",
        duration: "3 months",
        hours: "100 hrs",
        classesPerWeek: 5,
        tagline:
            "Learn marketing the way agencies practise it in 2026 — and run a live campaign with a real budget.",
        price: "Contact us",
        emi: "No-cost EMI available — contact us for the payment plan.",
        whoItsFor:
            "Graduates, freshers, business owners and anyone targeting agency, brand or freelance marketing roles.",
        whatYouLearn: [
            "Foundations — the digital ecosystem, funnels, buyer psychology, KPIs",
            "Websites and landing pages — WordPress, AI site builders, conversion basics",
            "SEO with AI — keyword research, on-page and technical SEO, AI content briefs, GEO/AEO for AI search",
            "Content and creative with AI — copywriting, image generation, short-form video, brand voice",
            "Meta Ads — campaign structure, audiences, creative testing, Advantage+",
            "Google Ads — Search, Performance Max, Keyword Planner, AI bidding",
            "Social media management — organic strategy, calendars, AI scheduling tools",
            "Email and WhatsApp marketing — automation, sequences, AI personalisation",
            "Analytics — GA4, Search Console, Looker Studio dashboards, AI-assisted reporting",
        ],
        theDifference:
            "You run a live ad campaign with a real ad budget funded by the academy, and graduate with a complete case study you can show any employer or client.",
        careerServices: [
            "GitHub/portfolio setup",
            "1-on-1 ATS resume building",
            "LinkedIn optimisation",
            "2 mock interviews",
            "Job referrals to hiring partners",
            "Lifetime batch re-attendance",
        ],
        walkAwayWith: null,
        upgradeBenefit: null,
        cta: "Enrol Now · Book a Free Demo Class",
    },
    {
        id: 7,
        title: "Python for Data Analytics",
        slug: "python-for-data-analytics",
        duration: "3 months",
        hours: "96 hrs",
        classesPerWeek: null,
        tagline:
            "Turn raw data into decisions — the fastest route into analyst roles.",
        price: "Contact us",
        emi: "No-cost EMI available",
        whoItsFor:
            "Graduates from any stream, commerce and finance professionals, and freshers targeting data analyst, business analyst or MIS roles.",
        whatYouLearn: [
            "Python for data work",
            "Pandas and NumPy",
            "Data cleaning and transformation",
            "SQL",
            "Visualisation with Matplotlib and Power BI",
            "Descriptive statistics",
            "Dashboards and business reporting",
        ],
        walkAwayWith:
            "A portfolio of analysis projects and dashboards on GitHub, plus the full Professional career services package.",
        upgradeBenefit: null,
        cta: "Enrol Now",
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
            "Capstone project",
        ],
        walkAwayWith:
            "A deployed capstone model and a GitHub portfolio, plus the full Professional career services package.",
        upgradeBenefit: null,
        cta: "Enrol Now · Take the Free Entrance Test",
    },
    {
        id: 9,
        title: "Advanced Diploma in AI & Machine Learning — FLAGSHIP",
        slug: "advanced-diploma-ai-ml",
        duration: "6 months",
        hours: "220 hrs",
        classesPerWeek: "5 days a week, 2 hours a day",
        tagline:
            "Six months. Seven deployed projects. A portfolio that gets you interviews.",
        price: "Contact us",
        emi: "No-cost EMI available — contact us for the payment plan.",
        whoItsFor:
            "Freshers and career changers who want to become AI/ML engineers, data scientists or AI developers — and are ready to put in the work.",
        monthlyJourney: [
            {
                month: 1,
                title: "Programming & Data Foundations",
                hours: 40,
                topics: "Python deep-dive, Git and GitHub, Jupyter, Pandas, NumPy, SQL",
            },
            {
                month: 2,
                title: "Statistics & Data Analysis",
                hours: 36,
                topics: "Descriptive and inferential statistics, hypothesis testing, EDA, visualisation, Power BI",
            },
            {
                month: 3,
                title: "Core Machine Learning",
                hours: 40,
                topics: "Regression, classification, decision trees, random forest, XGBoost, clustering, model evaluation, feature engineering",
            },
            {
                month: 4,
                title: "Deep Learning",
                hours: 40,
                topics: "Neural networks, TensorFlow/Keras, CNNs for computer vision, RNNs, transfer learning",
            },
            {
                month: 5,
                title: "NLP & Generative AI",
                hours: 40,
                topics: "Text processing, embeddings, transformers, LLM APIs, RAG systems, LangChain, building AI agents, fine-tuning basics",
            },
            {
                month: 6,
                title: "Deployment, Capstone & Career",
                hours: 24,
                topics: "Streamlit, FastAPI, Hugging Face Spaces, cloud basics, MLOps introduction, capstone project, portfolio build, interview preparation",
            },
        ],
        walkAwayWith:
            "6 graded projects + 1 capstone, all deployed and live on your GitHub.",
        included: [
            "Full career services package — 1-on-1 resume building, LinkedIn and GitHub optimisation, 5+ mock interviews, 20 hours of aptitude and communication training, priority job referrals",
            "Lifetime batch re-attendance",
            "Daily doubt-clearing lab access, 10 AM – 7 PM",
        ],
        upgradeBenefit: null,
        cta: "Apply Now · Book a Campus Visit",
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
        whoItsFor:
            "Graduates and professionals who want a complete, career-grade marketing education with AI at its core — and placement support to match.",
        whatYouLearn:
            "Everything in our Digital Marketing with AI Professional program, extended with advanced paid media, marketing automation, AI-driven content systems, performance analytics, client and campaign management, and multiple live campaigns across platforms.",
        walkAwayWith:
            "A multi-campaign portfolio with real results, plus the full Career-tier services package including 5+ mock interviews, aptitude and communication training, and priority placement referrals.",
        upgradeBenefit: null,
        cta: "Apply Now",
    },
    {
        id: 11,
        title: "Data Science & AI Career Track — with Internship",
        slug: "data-science-ai-career-track",
        duration: "9 months",
        hours: "320 hrs",
        classesPerWeek: null,
        tagline:
            "Graduate with a portfolio, an internship certificate and an experience letter.",
        price: "Contact us",
        emi: "No-cost EMI available — contact us for the payment plan.",
        whoItsFor:
            "Students who want the strongest possible start — real work experience on their CV before their first job application.",
        months1to6:
            "The complete Advanced Diploma in AI & Machine Learning curriculum.",
        months7to9: [
            "Three months working on live client or academy projects under supervision",
            "Advanced MLOps, Docker, and cloud deployment (AWS/GCP basics)",
            "Business communication and client-handling training",
            "Internship completion certificate and experience letter",
            "Priority placement queue",
        ],
        whyThisMatters:
            "Lucknow freshers compete with NCR candidates who often already have internships. An experience letter closes that gap.",
        walkAwayWith: null,
        upgradeBenefit: null,
        cta: "Apply Now · Limited seats per cohort",
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

const TOOL_LOGOS = {
    ChatGPT: "/assets/images/chatgpt.png",
    Claude: "/assets/images/claude.webp",
    Gemini: "/assets/images/gemini.jpg",
    Midjourney: "/assets/images/midjourney.jfif",
    "Canva AI": "/assets/images/canva-ai.jfif",
    Python: "/assets/images/python.png",
    TensorFlow: "/assets/images/tensorflow.png",
    LangChain: "/assets/images/langchain.png",
    "Hugging Face": "/assets/images/hugging-face.png",
    "Power BI": "/assets/images/power-bi.png",
};

const normalizeTool = (tool) => {
    if (tool && typeof tool === "object") {
        return {
            name: tool.name,
            logo: tool.logo || TOOL_LOGOS[tool.name] || null,
        };
    }
    return {
        name: tool,
        logo: TOOL_LOGOS[tool] || null,
    };
};

const TOOLS = [
    {
        name: "ChatGPT",
        logo: "/assets/images/chatgpt.png",
    },
    {
        name: "Claude",
        logo: "/assets/images/claude.webp",
    },
    {
        name: "Gemini",
        logo: "/assets/images/gemini.jpg",
    },
    {
        name: "Midjourney",
        logo: "/assets/images/midjourney.jfif",
    },
    {
        name: "Canva AI",
        logo: "/assets/images/canva-ai.jfif",
    },
    {
        name: "Python",
        logo: "/assets/images/python.png",
    },
    {
        name: "TensorFlow",
        logo: "/assets/images/tensorflow.png",
    },
    {
        name: "LangChain",
        logo: "/assets/images/langchain.png",
    },
    {
        name: "Hugging Face",
        logo: "/assets/images/hugging-face.png",
    },
    {
        name: "Power BI",
        logo: "/assets/images/power-bi.png",
    },
];

const WHO_IT_FOR = [
    {
        label: "Students",
        img: "/assets/images/students.png",
        color: "dark",
        desc: "You don't need to code. You don't need to be “technical”. If you have ever used WhatsApp, you have all the prerequisites you need",
    },
    {
        label: "Teachers",
        img: "/assets/images/teacher.png",
        color: "gold",
        desc: "Working professionals drowning in manual tasks — research, drafting, email, reporting",
    },
    {
        label: "Job Seekers",
        img: "/assets/images/job-seekers.png",
        color: "gold",
        desc: "Marketers, content creators and freelancers who want AI leverage — without becoming prompt engineers",
    },
    {
        label: "Shop Owners",
        img: "/assets/images/shop-owners.png",
        color: "gold",
        desc: "Shop owners who want to use AI for marketing, customer engagement, content, and everyday business tasks.",
    },
    {
        label: "Home Makers",
        img: "/assets/images/home-makers.png",
        color: "light",
        desc: "Managers and founders who need to make data-informed decisions faster",
    },
    {
        label: "Government Exam Aspirants",
        img: "/assets/images/exam-aspirants.png",
        color: "light",
        desc: "Students and career switchers who want AI skills they can use in week one",
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

const DEFAULT_INSTRUCTOR = {
    name: "Your Lead Instructor",
    tagline: "AI Practitioner & Trainer",
    bio: "Live, in-person, taught by practitioners who actually ship AI projects — not by someone who just reads about them.",
    points: [
        "Every live session ends with you using what you learned, not just watching it",
        "Answers are grounded in your own work — bring your real tasks and questions",
        "You get personalised feedback on your final project",
    ],
};

const DEFAULT_PRICING_INCLUDES = [
    "All live, instructor-led sessions",
    "Lifetime access to all session recordings",
    "The complete curriculum workbook (PDF)",
    "Weekly practice exercises with feedback",
    "Final project feedback",
    "Certificate of completion",
];

const COURSE_DETAILS = {
    "ai-tools-mastery": {
        eyebrow: "4-Week Live Cohort · Hands-On · No Coding Required",
        trustLine: "25 seats per cohort · Certificate of completion included",
        whoItsForHeadline: "Built for people who need results, not theory",
        whoItsForBullets: [
            "Working professionals drowning in manual tasks — research, drafting, email, reporting",
            "Marketers, content creators and freelancers who want AI leverage — without becoming prompt engineers",
            "Managers and founders who need to make data-informed decisions faster",
            "Students and career switchers who want AI skills they can use in week one",
        ],
        audience: [
            {
                label: "Working Professionals",
                desc: "Working professionals drowning in manual tasks — research, drafting, email, reporting",
                img: "/assets/images/teacher.png",
                tone: "gold",
            },
            {
                label: "Marketers & Freelancers",
                desc: "Marketers, content creators and freelancers who want AI leverage — without becoming prompt engineers",
                img: "/assets/images/job-seekers.png",
                tone: "gold",
            },
            {
                label: "Managers & Founders",
                desc: "Managers and founders who need to make data-informed decisions faster",
                img: "/assets/images/shop-owners.png",
                tone: "white",
            },
            {
                label: "Students & Career Switchers",
                desc: "Students and career switchers who want AI skills they can use in week one",
                img: "/assets/images/exam-aspirants.png",
                tone: "white",
            },
        ],
        readinessNote:
            "You don't need to code. You don't need to be \u201ctechnical\u201d. If you have ever used WhatsApp, you have all the prerequisites you need.",
        problemTitle: "Everyone has AI. Almost nobody uses it well.",
        problemBody: [
            "ChatGPT has taken over the world. But open the average person's chat history and there it is — 3 prompts, 1.5 sentences, and a \u201cthat's not what I meant\u201d loop.",
            "The single most powerful tool of this generation is being used at 5% of its capability. Generic prompt → generic answer → give up. This course fixes exactly that.",
        ],
        outcomes: [
            "Use ChatGPT, Claude and Gemini to save hours every day",
            "Write prompts that produce the output you want — first try",
            "Build a personal AI workflow for your role, subject or business",
            "Create images, decks, documents and social content in minutes",
            "Feed AI your own knowledge (drag-and-drop) for memory and grounded answers",
            "Verify AI output, spot hallucinations and stay safe",
        ],
        howItWorks: [
            { label: "Length", value: "4 weeks" },
            { label: "Schedule", value: "2 sessions per week · evenings" },
            {
                label: "Session format",
                value: "Live, instructor-led, hands-on — 60% practice, 40% discussion",
            },
            {
                label: "Outside class",
                value: "Weekly guided practice exercises (\u201cBrush-Ups\u201d) using free tools",
            },
            { label: "Class size", value: "Small — capped at 25 per cohort" },
            {
                label: "Recordings",
                value: "Every session recorded and available for the cohort",
            },
            {
                label: "Support",
                value: "Yes — we answer AI questions between sessions",
            },
        ],
        weeks: [
            {
                week: 1,
                title: "Foundations & Prompt Engineering",
                build: "Your Prompt Toolkit — a reusable prompt system for your daily tasks",
                topics: [
                    "The AI fluency loop: 5% → 50% → 90%",
                    "Inside an LLM — what it can and cannot do",
                    "The 6-level task model",
                    "The R.O.L.E. prompt framework",
                    "The \u201cFeed Forward\u201d technique",
                    "Your 12 weekly prompts",
                ],
            },
            {
                week: 2,
                title: "AI for Documents, Thinking & Ideas",
                build: "The 10x Your Draft workflow",
                topics: [
                    "Write, edit and re-research drafts",
                    "Summarise long reports and extract data",
                    "Study heavy documents with NotebookLM",
                    "Plan your week and brainstorm ideas",
                    "AI vision — let it \u201csee\u201d your pictures and documents",
                ],
            },
            {
                week: 3,
                title: "AI for Images, Presentations & Content",
                build: "A complete branded content pack — logo, palette, 3 images, a 10-slide deck",
                topics: [
                    "Images for anything — Canva AI, Midjourney",
                    "A logo and brand palette",
                    "A pitch deck in under 30 minutes",
                    "A month of social content",
                    "Short video with AI narration",
                ],
            },
            {
                week: 4,
                title: "Personal AI, Business Ops & Future-Proofing",
                build: "Your Personal AI Toolkit and a working FAQ bot",
                topics: [
                    "Build your own AI assistant (custom GPT)",
                    "Drag-and-drop your knowledge into AI",
                    "Your FAQ bot",
                    "Business ops — invoices, spreadsheets, WhatsApp",
                    "Beyond ChatGPT — agentic AI, voice, ambient AI",
                ],
            },
        ],
        finalProject: {
            intro: "You don't need to code. If you can use email, a browser, and a spreadsheet, you're ready.",
            tracks: [
                {
                    title: "Professional",
                    desc: "Design an AI workflow for one core task in your job",
                },
                {
                    title: "Marketing / Creative",
                    desc: "A complete AI-made marketing pack",
                },
                {
                    title: "Student",
                    desc: "Build an AI study system — notes, flashcards, mock exams",
                },
                {
                    title: "Small Business",
                    desc: "An AI operations kit — catalogue, invoices, WhatsApp replies",
                },
                {
                    title: "Curated Projects",
                    desc: "Pick one from our project briefs",
                },
            ],
            grading:
                "Graded pass/fail on completion. Every completed project earns the certificate.",
            leave: "Your Personal AI Toolkit — a working document that captures your prompts, workflows and favourite tools (template included).",
            cta: "Reserve Your Seat",
        },
        tools: [
            "ChatGPT",
            "Claude",
            "Gemini",
            "Perplexity",
            "NotebookLM",
            "Canva AI",
            "Midjourney",
            "Microsoft Copilot",
            "Google Vids",
            "ChatGPT Canvas",
            "Claude Artifacts",
            "ElevenLabs",
            "Descript",
            "+ 12 more unlocked during the course",
        ],
        toolsNote:
            "23 tools in total — most available on a free tier. A budget note caps your real spend.",
        instructor: {
            name: "Your Lead Instructor",
            tagline: "AI Practitioner & Trainer · Lucknow",
            bio: "Live, in-person, taught by practitioners who actually ship AI projects — not by someone who just reads about them.",
            points: [
                "I have 4+ years of hands-on experience with AI tools in real work",
                "I have trained 25+ professionals and students in person at the academy",
                "You can ask me anything — and I will actually answer",
                "Every technique is tested on real work before it reaches the classroom",
            ],
        },
        pricingIncludes: [
            "All 8 live, instructor-led sessions",
            "Lifetime access to all session recordings",
            "The complete curriculum workbook (PDF)",
            "Weekly Brush-Ups with instructor feedback",
            "Final project feedback",
            "Certificate of completion",
            "AI Tool Budget Note — everything you need has a free tier (cap ₹500/month)",
        ],
        teamPricing: "Teams of 2+ get 10% off · Teams of 5+ get 15% off",
        guarantee:
            "If you attend every session and complete the final project, and you don't feel more confident with AI, we'll make it right.",
        faqs: [
            {
                question:
                    "I'm a complete beginner with AI. Will I cope on this course?",
                answer: "Yes — this course was built specifically for people without a technical background. The whole curriculum runs on tools you already use: a browser, WhatsApp, and plain English.",
            },
            {
                question:
                    "I already use ChatGPT. Will I still learn something?",
                answer: "Yes. Most people use one tool, a few prompts and generic answers. We go far deeper — prompt frameworks, custom assistants, knowledge you can drag-and-drop, and a final project you actually use.",
            },
            {
                question: "What's the time commitment?",
                answer: "Four weeks, two live sessions per week, plus a weekly guided practice exercise. Realistically 3–4 hours per week outside class.",
            },
            {
                question: "Do I need to buy any software or subscriptions?",
                answer: "No. Almost everything runs on free tiers. The course includes an AI Tool Budget Note that caps your real spend at around ₹500/month if you want to.",
            },
            {
                question: "Will I get a certificate?",
                answer: "Yes — you earn a certificate of completion by finishing the final project, which is graded pass/fail on completion.",
            },
            {
                question: "Do I need a laptop?",
                answer: "Yes, any modern laptop with a browser works. Most exercises also work from your phone.",
            },
            {
                question: "What happens if I miss a session?",
                answer: "Every session is recorded and made available to the cohort, so you can catch up. You can also attend a makeup session in the next cycle.",
            },
            {
                question: "Is the course live?",
                answer: "Yes — it is live and instructor-led, not a pre-recorded video course. You practise during the session and get immediate feedback.",
            },
            {
                question: "Will I work on real projects?",
                answer: "Yes. Every week ends with a build, and the course finishes with a final project you choose from five tracks.",
            },
            {
                question: "How is this different from a free YouTube playlist?",
                answer: "A playlist won't correct your prompts, answer your questions, hold you accountable, or give feedback on your project. That feedback loop is the whole point.",
            },
            {
                question: "Can my team or group enrol together?",
                answer: "Yes — teams of 2+ get 10% off and teams of 5+ get 15% off. We also run private cohorts for companies and colleges.",
            },
            {
                question: "Where and when does the course run?",
                answer: "The course runs as a live cohort at our Lucknow academy and online. Contact us for the schedule of the next batch.",
            },
        ],
    },
    "python-programming-foundation": {
        eyebrow:
            "6-Week Live Course · Beginner-Friendly · Certificate Included",
        trustLine:
            "Next batch starts [DATE] · [Online / Classroom / Hybrid] · No prior coding experience needed",
        whoItsForHeadline: "Who This Is For",
        whoItsForBullets: [
            "Absolute beginners taking their first step into programming",
            "College students (B.Tech, BCA, MCA, B.Sc.) who want strong fundamentals beyond the classroom",
            "Working professionals moving toward data, automation, or software roles",
            "Anyone preparing for placements, internships, or further courses in AI and data science",
        ],
        audience: [
            {
                label: "Absolute Beginners",
                desc: "Absolute beginners taking their first step into programming",
                img: "/assets/images/students.png",
                tone: "gold",
            },
            {
                label: "College Students",
                desc: "College students (B.Tech, BCA, MCA, B.Sc.) who want strong fundamentals beyond the classroom",
                img: "/assets/images/exam-aspirants.png",
                tone: "gold",
            },
            {
                label: "Working Professionals",
                desc: "Working professionals moving toward data, automation, or software roles",
                img: "/assets/images/teacher.png",
                tone: "white",
            },
            {
                label: "Career Aspirants",
                desc: "Anyone preparing for placements, internships, or further courses in AI and data science",
                img: "/assets/images/job-seekers.png",
                tone: "white",
            },
        ],
        readinessNote: "No prior coding experience needed.",
        problemTitle: "Why Python",
        problemBody: [
            "Python is the world's most in-demand beginner language — the gateway to software development, data science, AI, automation, and testing. One language, a hundred career paths. This course makes sure you learn it properly: by writing code every single day, not by watching videos.",
        ],
        outcomes: [
            "Installation, IDEs, variables, data types, input/output, operators",
            "Conditions, loops, patterns, problem-solving drills",
            "Strings, lists, tuples, sets, dictionaries — and when to use each",
            "Functions, arguments, scope, built-in modules, file handling",
            "Classes, objects, inheritance, exception handling",
            "Working with libraries (NumPy/Pandas intro), APIs basics, final project build & presentation",
        ],
        howItWorks: [
            { label: "Duration", value: "6 weeks" },
            {
                label: "Schedule",
                value: "[5 days/week, 1.5–2 hrs/day] — [Batch timings]",
            },
            { label: "Mode", value: "[Online live / Classroom / Hybrid]" },
            {
                label: "Practice",
                value: "Daily coding assignments + weekly tests",
            },
            {
                label: "Certificate",
                value: "Certificate of completion after final project",
            },
            { label: "Fee", value: "[₹FEE] (installments available)" },
        ],
        weeks: [
            {
                week: 1,
                title: "Getting Started",
                topics: [
                    "Installation, IDEs, variables, data types, input/output, operators",
                ],
            },
            {
                week: 2,
                title: "Control Flow",
                topics: ["Conditions, loops, patterns, problem-solving drills"],
            },
            {
                week: 3,
                title: "Data Structures",
                topics: [
                    "Strings, lists, tuples, sets, dictionaries — and when to use each",
                ],
            },
            {
                week: 4,
                title: "Functions & Modules",
                topics: [
                    "Functions, arguments, scope, built-in modules, file handling",
                ],
            },
            {
                week: 5,
                title: "OOP & Errors",
                topics: ["Classes, objects, inheritance, exception handling"],
            },
            {
                week: 6,
                title: "Real-World Python",
                topics: [
                    "Working with libraries (NumPy/Pandas intro), APIs basics, final project build & presentation",
                ],
            },
        ],
        finalProject: {
            intro: "A complete application of your choice (e.g., expense tracker, quiz app, or data analysis report) — built by you, reviewed by your instructor, and ready for your resume and GitHub.",
            tracks: [
                {
                    title: "Mini-projects along the way",
                    desc: "calculator, number games, contact book, file organizer, data report generator",
                },
            ],
        },
        heroCta: "Enroll Now",
        heroCtaSecondary: "Download Syllabus",
        faqs: [
            {
                question: "I have never written code. Can I really do this?",
                answer: "Yes — this course assumes zero background. Week 1 starts from installing Python. The pace is set for beginners, and doubt-clearing support is available throughout.",
            },
            {
                question: "Do I need a powerful laptop?",
                answer: "No. Any laptop that runs a browser can run Python. We'll help you set everything up in the first class.",
            },
            {
                question: "Will I get recordings if I miss a class?",
                answer: "Yes, recordings of every session are shared with the batch, along with the class notes and code.",
            },
            {
                question: "What can I do after this course?",
                answer: "You'll be ready for our Generative AI course, data science courses, web development, or automation — and prepared for the coding rounds of campus placements at the foundation level.",
            },
            {
                question: "Is the certificate valid for my resume?",
                answer: "Yes. You receive a completion certificate after passing the final project, which you can add to your resume and LinkedIn.",
            },
        ],
    },
    "generative-ai-prompt-engineering": {
        eyebrow: "6-Week Live Course · Hands-On · Beginner to Builder",
        trustLine:
            "Next batch starts [DATE] · No coding required · Certificate + portfolio project",
        whoItsForHeadline: "Who This Is For",
        whoItsForBullets: [
            "Students and freshers who want an in-demand skill that stands out in placements",
            "Professionals in marketing, HR, operations, sales, content, and design who want a productivity edge",
            "Freelancers and creators who want to deliver more work, faster",
            "Anyone curious about AI who wants practical skill, not just theory",
        ],
        audience: [
            {
                label: "Students & Freshers",
                desc: "Students and freshers who want an in-demand skill that stands out in placements",
                img: "/assets/images/students.png",
                tone: "gold",
            },
            {
                label: "Working Professionals",
                desc: "Professionals in marketing, HR, operations, sales, content, and design who want a productivity edge",
                img: "/assets/images/teacher.png",
                tone: "gold",
            },
            {
                label: "Freelancers & Creators",
                desc: "Freelancers and creators who want to deliver more work, faster",
                img: "/assets/images/job-seekers.png",
                tone: "white",
            },
            {
                label: "Curious Learners",
                desc: "Anyone curious about AI who wants practical skill, not just theory",
                img: "/assets/images/home-makers.png",
                tone: "white",
            },
        ],
        readinessNote:
            "No coding required — if you can use WhatsApp and email, you can do this course.",
        problemTitle: "What Makes This Different",
        problemBody: [
            "Most AI courses show you screenshots. Here, every session is hands-on: you prompt, you build, you publish. By the end, you won't just \"know about AI\" — you'll have a prompt library, a custom AI assistant, AI-generated content pieces, and a working automation, all built by you.",
        ],
        outcomes: [
            "How LLMs work, hallucinations, capabilities and limits; tour of ChatGPT, Claude, Gemini, Perplexity",
            "Prompt structure, role/context/format, few-shot prompting, chain-of-thought, iteration techniques; build your prompt library",
            "Summarization, data extraction, research with citations, report and presentation generation",
            "Image generation (Midjourney/DALL·E-class tools), voice and music, AI video basics, design tools like Canva AI and Gamma",
            "Build your own GPT/Claude Project on your documents; no-code automations connecting AI to email, sheets, and forms",
            "Detecting errors and bias, privacy, disclosure; build and present your final project",
        ],
        howItWorks: [
            { label: "Duration", value: "6 weeks" },
            { label: "Schedule", value: "[Days/week and timings]" },
            { label: "Mode", value: "[Online live / Classroom / Hybrid]" },
            {
                label: "Prerequisites",
                value: "None — no coding needed",
            },
            {
                label: "Tools cost",
                value: "Most labs work on free tiers; optional [₹1,500–2,000/month] for paid tools",
            },
            {
                label: "Certificate",
                value: "Certificate of completion after capstone",
            },
            { label: "Fee", value: "[₹FEE] (installments available)" },
        ],
        weeks: [
            {
                week: 1,
                title: "GenAI Foundations",
                topics: [
                    "How LLMs work, hallucinations, capabilities and limits; tour of ChatGPT, Claude, Gemini, Perplexity",
                ],
            },
            {
                week: 2,
                title: "Prompt Engineering",
                topics: [
                    "Prompt structure, role/context/format, few-shot prompting, chain-of-thought, iteration techniques; build your prompt library",
                ],
            },
            {
                week: 3,
                title: "AI for Documents & Research",
                topics: [
                    "Summarization, data extraction, research with citations, report and presentation generation",
                ],
            },
            {
                week: 4,
                title: "Creative AI",
                topics: [
                    "Image generation (Midjourney/DALL·E-class tools), voice and music, AI video basics, design tools like Canva AI and Gamma",
                ],
            },
            {
                week: 5,
                title: "Custom Assistants & Automation",
                topics: [
                    "Build your own GPT/Claude Project on your documents; no-code automations connecting AI to email, sheets, and forms",
                ],
            },
            {
                week: 6,
                title: "Responsible AI + Capstone",
                topics: [
                    "Detecting errors and bias, privacy, disclosure; build and present your final project",
                ],
            },
        ],
        finalProject: {
            intro: "A custom AI assistant for a real use case, an AI content pipeline, or an AI-powered automation — presented live and added to your portfolio.",
            tracks: [],
        },
        heroCta: "Enroll Now",
        heroCtaSecondary: "Download Syllabus",
        faqs: [
            {
                question: "Do I need to know programming?",
                answer: "No. The entire course is no-code. If you can use WhatsApp and email, you can do this course.",
            },
            {
                question: "Which AI tools will I actually use?",
                answer: "ChatGPT, Claude, Gemini, Perplexity, NotebookLM, image tools like Midjourney/DALL·E-class generators, Canva AI, Gamma, and automation platforms like Zapier/Make. The exact list is refreshed every batch, because AI tools change fast.",
            },
            {
                question: "Will paid AI subscriptions be required?",
                answer: "Most labs run on free tiers. We recommend one paid chat assistant (~₹1,600–2,000/month) for a smoother experience, but it's optional.",
            },
            {
                question: "How is this different from free YouTube tutorials?",
                answer: "Structure, accountability, and feedback. You build real deliverables each week, get your work reviewed, and finish with a capstone project — things a playlist can't give you.",
            },
            {
                question: "Can this help me get a job or clients?",
                answer: "AI skills are now listed in job descriptions across marketing, operations, HR, and content roles. Your capstone project and prompt portfolio give you concrete proof of skill for interviews and freelance clients.",
            },
            {
                question: "Will this course become outdated?",
                answer: "The skills taught — prompt design, tool evaluation, workflow building — transfer across tools. When a new model launches, you'll know exactly how to master it in a weekend.",
            },
        ],
    },
    "ai-for-business": {
        eyebrow:
            "4-Week Weekend Program · For Busy Professionals · Saturday–Sunday Only",
        trustLine:
            "Next batch starts [DATE] · [Sat–Sun, TIMINGS] · Limited to [20] seats",
        whoItsForHeadline: "Who This Is For",
        whoItsForBullets: [
            "Business owners & founders (shops, agencies, manufacturing, services, D2C brands) who want to do more with a small team",
            "Managers and department heads responsible for marketing, sales, HR, or operations",
            "Doctors, CAs, lawyers, consultants and other professionals running their own practice",
            "Senior professionals who want to stay ahead as AI reshapes their industry",
            "No technical background needed — this program is about results, not code.",
        ],
        audience: [
            {
                label: "Business Owners & Founders",
                desc: "Business owners & founders (shops, agencies, manufacturing, services, D2C brands) who want to do more with a small team",
                img: "/assets/images/shop-owners.png",
                tone: "gold",
            },
            {
                label: "Managers & Dept Heads",
                desc: "Managers and department heads responsible for marketing, sales, HR, or operations",
                img: "/assets/images/teacher.png",
                tone: "gold",
            },
            {
                label: "Doctors, CAs & Consultants",
                desc: "Doctors, CAs, lawyers, consultants and other professionals running their own practice",
                img: "/assets/images/job-seekers.png",
                tone: "white",
            },
            {
                label: "Senior Professionals",
                desc: "Senior professionals who want to stay ahead as AI reshapes their industry",
                img: "/assets/images/home-makers.png",
                tone: "white",
            },
        ],
        readinessNote:
            "Everything is point-and-click, in plain language, with step-by-step guidance.",
        problemTitle: "What AI Can Do for Your Business",
        problemBody: [
            "Draft your marketing content in minutes. Reply to customer enquiries automatically. Summarize reports, contracts, and meetings. Analyze your sales data in plain language. Create product photos and ads without a designer. The businesses adopting these tools are simply outrunning the ones that aren't — this program puts you on the right side of that gap.",
        ],
        outcomes: [
            "How AI tools work, what they can and can't do; hands-on with ChatGPT/Claude/Gemini for emails, proposals, reports, and research",
            "Social media content, ad copy, product images, brochures, and videos with AI; building a monthly content calendar in one sitting",
            "Automating enquiries, follow-ups, quotations, and reports; a custom AI assistant trained on your price lists, policies, or FAQs",
            "Analyzing sales/customer data with AI, safety and privacy for business data, evaluating AI vendors and pricing; build your 90-day AI adoption roadmap",
        ],
        pricingIncludes: [
            "Limited to [20] for individual attention",
            "WhatsApp group + [30 days] post-course support",
            "Certificate of completion",
            "GST invoice available for business expense",
        ],
        howItWorks: [
            { label: "Duration", value: "4 weeks (weekends only)" },
            {
                label: "Schedule",
                value: "Saturday & Sunday, [TIMINGS] ([X] hours/weekend)",
            },
            { label: "Mode", value: "[Classroom / Online live / Hybrid]" },
            {
                label: "Batch size",
                value: "Limited to [20] for individual attention",
            },
            {
                label: "Support",
                value: "WhatsApp group + [30 days] post-course support",
            },
            { label: "Certificate", value: "Certificate of completion" },
            {
                label: "Fee",
                value: "[₹FEE] · GST invoice available for business expense",
            },
        ],
        weeks: [
            {
                week: 1,
                sub: "Weekend 1",
                title: "AI Essentials for Business",
                topics: [
                    "How AI tools work, what they can and can't do; hands-on with ChatGPT/Claude/Gemini for emails, proposals, reports, and research",
                    "Take-away: your personal prompt playbook for daily work",
                ],
            },
            {
                week: 2,
                sub: "Weekend 2",
                title: "Marketing & Content with AI",
                topics: [
                    "Social media content, ad copy, product images, brochures, and videos with AI; building a monthly content calendar in one sitting",
                    "Take-away: 30 days of content for your business, created in class",
                ],
            },
            {
                week: 3,
                sub: "Weekend 3",
                title: "Operations & Automation",
                topics: [
                    "Automating enquiries, follow-ups, quotations, and reports; a custom AI assistant trained on your price lists, policies, or FAQs",
                    "Take-away: one live automation running in your business",
                ],
            },
            {
                week: 4,
                sub: "Weekend 4",
                title: "Data, Decisions & Your AI Roadmap",
                topics: [
                    "Analyzing sales/customer data with AI, safety and privacy for business data, evaluating AI vendors and pricing; build your 90-day AI adoption roadmap",
                    "Take-away: a written AI roadmap for your company, presented and reviewed in class",
                ],
            },
        ],
        finalProject: {
            intro: "You'll leave with automations running in your own business — one live automation, a custom AI assistant, 30 days of marketing content, and a written 90-day AI roadmap.",
            tracks: [
                {
                    title: "Marketing content",
                    desc: "30 days of content for your business, created in class",
                },
                {
                    title: "Live automation",
                    desc: "one live automation running in your business",
                },
                {
                    title: "AI roadmap",
                    desc: "a written AI roadmap for your company, presented and reviewed in class",
                },
            ],
        },
        heroCta: "Reserve Your Seat",
        heroCtaSecondary: "Talk to a Counselor",
        heroCtaSecondaryHref: "/contact",
        faqs: [
            {
                question: "I'm not technical at all. Is this for me?",
                answer: "Yes — this program is designed specifically for non-technical owners and professionals. Everything is point-and-click, in plain language, with step-by-step guidance.",
            },
            {
                question: "Will this apply to my type of business?",
                answer: "The techniques work across retail, services, manufacturing, clinics, agencies, and professional practices. In class, you work on your own business — your content, your enquiries, your data — so everything you build is immediately usable.",
            },
            {
                question: "How much time outside the weekends?",
                answer: "Almost none is mandatory. We suggest 1–2 hours during the week to apply what you learned, and many participants recover that time immediately through the automations they build.",
            },
            {
                question: "Is my business data safe in these tools?",
                answer: "Data safety is covered explicitly in Weekend 4 — which tools to trust, which plans keep your data private, and what should never be uploaded. During class exercises, sample data is available if you prefer not to use your own.",
            },
            {
                question: "Can I send my manager or team member instead?",
                answer: "Absolutely — many owners attend with or nominate one team member. Ask about our [2-seat business pack].",
            },
            {
                question: "What results can I realistically expect?",
                answer: "Participants typically leave with a month of marketing content, one working automation, a custom assistant, and a clear roadmap. Time savings of several hours per week are common — results depend on how consistently you apply the tools afterward.",
            },
        ],
    },
    "summer-winter-training": {
        eyebrow:
            "45-Day Industrial Training · For B.Tech / MCA / BCA Students · AKTU-Compliant",
        trustLine:
            "Summer batch: [DATES] · Winter batch: [DATES] · [Online / Classroom] · Certificate on completion",
        whoItsForHeadline: "Who This Is For",
        whoItsForBullets: [
            "B.Tech students (CSE, IT, ECE, and allied branches) needing mandatory summer/winter industrial training",
            "MCA / BCA / B.Sc. (CS/IT) students who want practical, project-based training with proper documentation",
            "Pre-final and final-year students who want their training project to double as a placement portfolio piece",
        ],
        audience: [
            {
                label: "B.Tech Students",
                desc: "B.Tech students (CSE, IT, ECE, and allied branches) needing mandatory summer/winter industrial training",
                img: "/assets/images/students.png",
                tone: "gold",
            },
            {
                label: "MCA / BCA / B.Sc. Students",
                desc: "MCA / BCA / B.Sc. (CS/IT) students who want practical, project-based training with proper documentation",
                img: "/assets/images/exam-aspirants.png",
                tone: "gold",
            },
            {
                label: "Pre-Final & Final-Year Students",
                desc: "Pre-final and final-year students who want their training project to double as a placement portfolio piece",
                img: "/assets/images/job-seekers.png",
                tone: "white",
            },
        ],
        readinessNote:
            "Tracks like Python with Data Science and Generative AI start from fundamentals and are regularly taken by ECE, EE, and ME students.",
        problemTitle: "Everything Your College Requires",
        problemBody: [
            "Training and documentation are provided as per standard AKTU-pattern requirements. Please confirm your college's specific format/duration rules with your training coordinator — our team will match the documentation accordingly.",
        ],
        outcomes: [
            "Core concepts of your chosen track with daily hands-on labs",
            "Advanced topics, tools of the trade, weekly assessments, mini-projects",
            "Individual project built under mentor guidance — the project you'll submit to your college",
            "Project report as per university format, presentation practice, mock viva, final demo",
        ],
        pricingIncludes: [
            "Industrial training certificate (45 days) on completion",
            "Project completion letter on request",
            "Project report guidance in the standard university format (cover page, certificate, abstract, chapters, references)",
            "PPT and viva preparation with mock question rounds",
            "Attendance records maintained for verification",
        ],
        teamPricing: "Early-bird / group discounts available",
        howItWorks: [
            { label: "Duration", value: "45 days" },
            {
                label: "Batches",
                value: "Summer: [MONTHS] · Winter: [MONTHS]",
            },
            { label: "Schedule", value: "[Days/week, hours/day]" },
            { label: "Mode", value: "[Classroom / Online live / Hybrid]" },
            {
                label: "Deliverables",
                value: "Certificate + project + report guidance + viva prep",
            },
            {
                label: "Fee",
                value: "[₹FEE] (early-bird / group discounts available)",
            },
        ],
        weeks: [
            {
                week: 1,
                sub: "Days 1–10",
                title: "Foundations",
                topics: [
                    "Core concepts of your chosen track with daily hands-on labs",
                ],
            },
            {
                week: 2,
                sub: "Days 11–25",
                title: "Skill Building",
                topics: [
                    "Advanced topics, tools of the trade, weekly assessments, mini-projects",
                ],
            },
            {
                week: 3,
                sub: "Days 26–40",
                title: "Major Project",
                topics: [
                    "Individual project built under mentor guidance — the project you'll submit to your college",
                ],
            },
            {
                week: 4,
                sub: "Days 41–45",
                title: "Documentation & Viva Prep",
                topics: [
                    "Project report as per university format, presentation practice, mock viva, final demo",
                ],
            },
        ],
        finalProject: {
            intro: "Pick one specialization for your 45 days — all tracks follow the same structure: concepts → guided labs → individual project.",
            tracks: [
                {
                    title: "Python with Data Science",
                    desc: "Python, NumPy, Pandas, visualization, a data analysis capstone",
                },
                {
                    title: "Generative AI & Prompt Engineering",
                    desc: "LLMs, prompting, custom assistants, AI automation capstone",
                },
                {
                    title: "Web Development",
                    desc: "HTML/CSS/JS, [framework], responsive sites, deployed website capstone",
                },
                {
                    title: "Machine Learning Basics",
                    desc: "Python foundations, ML concepts, model building, prediction capstone",
                },
                {
                    title: "[Additional track — e.g., Java / App Development / Data Analytics]",
                    desc: "",
                },
            ],
        },
        heroCta: "Register Now",
        heroCtaSecondary: "Download Training Brochure",
        faqs: [
            {
                question:
                    "Is this training valid for AKTU summer/winter training requirements?",
                answer: "The program is designed to align with standard AKTU industrial-training expectations — 45-day duration, a certificate, and a submittable project with report. Requirements can vary slightly by college and session, so we recommend confirming the format with your training coordinator; we'll match our documentation to it.",
            },
            {
                question:
                    "Will I get an individual project, or is it a group project?",
                answer: "Each student builds and submits an individual project with mentor guidance, so your report and viva are entirely your own work. Group projects can be arranged if your college requires them.",
            },
            {
                question: "Can I join online if I'm home for the vacation?",
                answer: "Yes — the program is available [online live / in classroom / in hybrid mode], with the same certificate and deliverables in every mode.",
            },
            {
                question: "I'm from a non-CS branch. Can I still enroll?",
                answer: "Yes. Tracks like Python with Data Science and Generative AI start from fundamentals and are regularly taken by ECE, EE, and ME students.",
            },
            {
                question: "Will this help with placements too?",
                answer: "That's the goal. Your capstone project goes on your resume and GitHub, and the skills tracks (especially Python, ML, and GenAI) map directly to what recruiters screen for.",
            },
            {
                question:
                    "What if my college needs 4 or 6 weeks instead of 45 days?",
                answer: "We run [4-week and 6-week] variants of the same tracks. Mention your requirement at registration and we'll place you in the matching batch with the correct certificate duration.",
            },
            {
                question: "Do you offer group discounts?",
                answer: "Yes — groups of [5+] students from the same college get [X%] off. Ask about our campus coordinator program.",
            },
        ],
    },
};

function buildDetail(course) {
    const override = COURSE_DETAILS[course.slug] || {};
    const whoItsForBullets =
        override.whoItsForBullets ||
        (course.whoItsFor
            ? course.whoItsFor
                  .split(/(?<=[.;])\s+/)
                  .filter(Boolean)
                  .map((s) => s.trim())
            : [
                  course.title +
                      " — designed to be practical and career-focussed.",
              ]);

    const weeks = override.weeks;
    const months = course.monthlyJourney || [];
    const fallbackOutcomes = months.length
        ? months.map((m) => m.title)
        : typeof course.whatYouLearn === "string"
          ? course.whatYouLearn
                .split(/(?<=[;,.])\s+/)
                .filter(Boolean)
                .map((s) => s.trim())
          : [course.tagline];
    const outcomes =
        override.outcomes ||
        (Array.isArray(course.whatYouLearn) ? course.whatYouLearn : null) ||
        fallbackOutcomes;

    const howItWorks =
        override.howItWorks ||
        [
            { label: "Length", value: course.duration || "—" },
            { label: "Total hours", value: course.hours || "—" },
            {
                label: "Schedule",
                value:
                    typeof course.classesPerWeek === "number"
                        ? course.classesPerWeek + " classes a week"
                        : course.classesPerWeek || "Weekday / weekend batches",
            },
            {
                label: "Session format",
                value: "Live, instructor-led, hands-on",
            },
            { label: "Class size", value: "Small, limited-seat cohorts" },
            { label: "Recordings", value: "Sessions recorded for revision" },
            {
                label: "Support",
                value: "Personal doubt-clearing during the course",
            },
        ].filter((row) => row);

    const finalProject = {
        intro: course.walkAwayWith
            ? course.walkAwayWith
            : "You leave with more than notes — you leave with something you can show.",
        tracks: (Array.isArray(course.whatYouLearn) ? course.whatYouLearn : [])
            .slice(0, 4)
            .map((t) => ({
                title: "Track",
                desc: t,
            })),
        grading:
            "Graded on completion. Completed projects earn the certificate.",
        leave: null,
        cta: null,
        ...(override.finalProject || {}),
    };

    const tools = (override.tools || (course.tools ? course.tools : TOOLS)).map(
        normalizeTool,
    );
    const instructor = override.instructor || DEFAULT_INSTRUCTOR;

    const pricingIncludes =
        override.pricingIncludes ||
        (course.included && Array.isArray(course.included)
            ? course.included
            : DEFAULT_PRICING_INCLUDES);

    const audience =
        override.audience ||
        ["Teachers", "Job Seekers", "Home Makers", "Government Exam Aspirants"]
            .map((label, i) => {
                const person = WHO_IT_FOR.find((p) => p.label === label);
                return {
                    label,
                    desc: person?.desc || "",
                    img: person?.img || "/assets/images/students.png",
                    tone: i < 2 ? "gold" : "white",
                };
            })
            .filter((item) => item.desc || item.img);

    return {
        eyebrow:
            override.eyebrow ||
            (course.badge
                ? `${course.badge} · Hands-On`
                : " · Career-Focussed6-Week Live Course · Beginner-Friendly · Certificate Included"),
        trustLine:
            override.trustLine ||
            course.cta ||
            "Certificate of completion included",
        whoItsForHeadline:
            override.whoItsForHeadline ||
            "Built for people who need results, not theory",
        whoItsForBullets,
        audience,
        readinessNote:
            override.readinessNote ||
            "No prior experience required — the program is designed to take you from the basics to confident, practical use.",
        problemTitle:
            override.problemTitle ||
            `The truth about ${course.title.split(" — ")[0]}`,
        problemBody: override.problemBody || [
            `Most learners stop at the surface: a few tools, a few prompts, generic answers.`,
            `This program takes you from 5% to confident, practical use — real tasks, real projects, real outcomes.`,
        ],
        outcomes,
        howItWorks,
        modules: buildModules(course, weeks, months, outcomes),
        finalProject,
        tools,
        toolsNote:
            override.toolsNote ||
            "Everything you need is industry-standard — most tools have free tiers.",
        instructor,
        pricingIncludes,
        teamPricing:
            override.teamPricing || "Group and institute discounts available",
        guarantee:
            override.guarantee ||
            "If you complete the program in full and are not satisfied with the experience, we'll make it right.",
        faqs: override.faqs || null,
        heroCta: override.heroCta || "Enrol Now",
        heroCtaSecondary: override.heroCtaSecondary || "Download Curriculum",
        heroCtaSecondaryHref: override.heroCtaSecondaryHref || "#about-course",
    };
}

function buildModules(course, weeks, months, outcomes) {
    if (weeks && weeks.length) {
        return weeks.map((w) => ({
            id: w.week,
            label: w.label || `Week-${w.week}`,
            heading: w.title,
            sub: w.sub || `Week ${w.week}`,
            lectures: [
                ...(Array.isArray(w.topics) ? w.topics : []).map((t, i) => ({
                    num: i + 1,
                    title: t,
                })),
                ...(w.build
                    ? [
                          {
                              num: (w.topics || []).length + 1,
                              title: `Build — ${w.build}`,
                          },
                      ]
                    : []),
            ],
        }));
    }
    if (months.length) {
        return months.map((m) => ({
            id: m.month,
            label: `Month-${m.month}`,
            heading: m.title,
            sub: `Month ${m.month}`,
            lectures: m.topics
                ? m.topics
                      .split(",")
                      .map((t, i) => ({ num: i + 1, title: t.trim() }))
                : [],
        }));
    }
    const items = Array.isArray(outcomes) ? outcomes : [];
    const chunkSize = Math.max(1, Math.ceil(items.length / 4));
    const chunks = [];
    for (let i = 0; i < items.length; i += chunkSize)
        chunks.push(items.slice(i, i + chunkSize));
    return chunks.map((chunk, i) => ({
        id: i + 1,
        label: `Module-${i + 1}`,
        heading: `Understanding the Subject · Part ${i + 1}`,
        sub: `Module ${i + 1}`,
        lectures: chunk.map((t, j) => ({ num: j + 1, title: t })),
    }));
}

const NAV_TABS = [
    { id: "eligibility", label: "Eligibility" },
    { id: "about-course", label: "About Course" },
    { id: "learning", label: "Learning" },
    { id: "how-it-works", label: "How It Works" },
    { id: "tools", label: "Tools" },
    { id: "curriculum", label: "Curriculum" },
    { id: "final-project", label: "Project" },
    { id: "instructor", label: "Instructor" },
    { id: "alumni", label: "Alumni" },
    { id: "pricing", label: "Pricing" },
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
                ([e]) => {
                    if (e.isIntersecting) setActive(id);
                },
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
                style={{ width: "min(700px, calc(100% - 32px))" }}
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
                        <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                            />
                        </svg>
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
    const detail = course ? buildDetail(course) : null;

    const timelineRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const el = timelineRef.current;
        if (!el) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;

        const cards = gsap.utils.toArray(".timeline-card", el);
        if (!cards.length) return;

        const ctx = gsap.context(() => {
            cards.forEach((card, i) => {
                const fromLeft = i % 2 === 0;
                gsap.fromTo(
                    card,
                    { opacity: 0, x: fromLeft ? -48 : 48, y: 24 },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        duration: 0.75,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 82%",
                            toggleActions: "play none none reverse",
                        },
                    },
                );
            });
        }, el);

        return () => ctx.revert();
    }, [slug]);
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

                    <div className="relative z-10 mx-auto max-w-[1240px] px-6 pt-[48px]   max-lg:pt-[48px] grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
                        <div>
                            <RevealDiv>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet/[0.07] border border-violet/15 mb-6">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-violet" />
                                    </span>
                                    <span className="font-mono text-[11px] text-black uppercase tracking-wider">
                                        {detail.eyebrow}
                                    </span>
                                </div>
                            </RevealDiv>

                            <RevealDiv delay={80}>
                                <h1 className="font-display text-[clamp(2.1rem,3.8vw,3.2rem)] font-bold tracking-[-0.035em] leading-[1.08]">
                                    <span className="bg-[linear-gradient(90deg,#eec369,#982cdc)] bg-clip-text text-transparent">
                                        {course.title.split(" — ")[0]}
                                    </span>
                                    {course.title.includes(" — ") && (
                                        <>
                                            <br className="hidden sm:block" />
                                            <span className="text-black">
                                                {" "}
                                                —{" "}
                                                {course.title
                                                    .split(" — ")
                                                    .slice(1)
                                                    .join(" — ")}
                                            </span>
                                        </>
                                    )}
                                </h1>
                            </RevealDiv>

                            <RevealDiv delay={160}>
                                <p className="text-muted text-lg mt-5 max-w-xl leading-relaxed">
                                    {course.tagline}
                                </p>
                            </RevealDiv>

                            <RevealDiv delay={240}>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Link
                                        href="/contact"
                                        className="rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(152,44,220,.25)] hover:shadow-[0_10px_28px_rgba(152,44,220,.38)] hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        {detail.heroCta}
                                    </Link>
                                    <Link
                                        href={detail.heroCtaSecondaryHref}
                                        className="rounded-full bg-surface px-7 py-3.5 text-sm font-semibold text-white hover:bg-surface/80 hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        {detail.heroCtaSecondary}
                                    </Link>
                                </div>
                                <p className="mt-5 inline-flex items-center gap-2 text-[13px] text-black/50">
                                    <svg
                                        className="w-4 h-4 text-lime/70"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m4.5 12.75 6 6 9-13.5"
                                            fill="none"
                                            strokeWidth={2.5}
                                        />
                                    </svg>
                                    {detail.trustLine}
                                </p>
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
                                    {typeof course.classesPerWeek === "number"
                                        ? `${course.classesPerWeek} classes a week`
                                        : course.classesPerWeek ||
                                          "Weekday / weekend"}
                                </span>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-1 py-5 px-4 text-center">
                                <span className="text-xs text-muted font-medium">
                                    Duration
                                </span>
                                <span className="text-lg font-bold text-black">
                                    {course.duration}{" "}
                                    {course.hours && `(${course.hours})`}
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
                <div
                    id="eligibility"
                    className="mx-auto max-w-[1240px] px-6 pb-20"
                >
                    <RevealDiv>
                        <div className="mb-10">
                            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                                WHO IT&apos;S FOR
                            </p>

                            <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-bold tracking-[-0.04em] text-black">
                                {detail.whoItsForHeadline}
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

                                        {/* Overlay — strongest near the bottom, clear near the top so the photo reads */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                                        {/* Audience badge */}
                                        <div className="absolute top-5 left-5">
                                            <span className="inline-flex items-center rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-[13px] font-medium text-black ring-1 ring-white/20">
                                                For students
                                            </span>
                                        </div>

                                        {/* Copy */}
                                        <div className="absolute bottom-7 left-7 right-7">
                                            <p className="font-display text-[19px] sm:text-[21px] font-medium leading-[1.45] text-white/95 max-w-[34ch]">
                                                {detail.readinessNote}
                                            </p>
                                        </div>
                                    </div>
                                </RevealDiv>
                            );
                        })()}

                        {/* ═══════════════ CENTER — GOLD CARDS ═══════════════ */}
                        <div className="flex flex-col gap-3">
                            {detail.audience
                                .filter((item) => item.tone === "gold")
                                .map((item, i) => (
                                    <RevealDiv
                                        key={item.label}
                                        delay={(i + 1) * 60}
                                    >
                                        <div
                                            className="
                        h-[156px]
                        sm:h-[156px]
                        lg:h-[156px]
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
                                                    src={item.img}
                                                    alt={item.label}
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-col justify-around  h-full py-2">
                                                {/* Label */}
                                                <h3 className="font-display text-[20px] sm:text-[22px] lg:text-[20px] xl:text-[22px] font-bold tracking-[-0.025em] leading-tight text-black">
                                                    {item.label}
                                                </h3>

                                                {/* Description */}
                                                <p className="text-[14px] sm:text-[15px] leading-[1.5] text-black/70 max-w-[500px]">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </RevealDiv>
                                ))}
                        </div>

                        {/* ═══════════════ RIGHT — WHITE CARDS ═══════════════ */}

                        <div className="flex flex-col gap-4">
                            {detail.audience
                                .filter((item) => item.tone === "white")
                                .map((item, i) => (
                                    <RevealDiv
                                        key={item.label}
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
                                                    src={item.img}
                                                    alt={item.label}
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-col justify-center">
                                                {/* Label */}
                                                <h3 className="font-display text-[20px] sm:text-[22px] lg:text-[20px] xl:text-[22px] font-bold tracking-[-0.025em] leading-[1.08] text-black">
                                                    {item.label}
                                                </h3>

                                                {/* Description */}
                                                <p className="mt-3 text-[13px] sm:text-[14px] leading-[1.5] text-black/55 max-w-[500px]">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </RevealDiv>
                                ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ THE PROBLEM ═══════════════ */}
            <section className="bg-[#F5F5F2] border-y border-black/[0.06] py-20 sm:py-24">
                <div className="mx-auto max-w-[1240px] px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
                        <RevealDiv>
                            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                                THE PROBLEM
                            </p>
                            <h2 className="font-display text-[clamp(2rem,4vw,2.9rem)] font-bold tracking-[-0.045em] leading-[1.05] text-black">
                                {detail.problemTitle}
                            </h2>
                        </RevealDiv>
                        <RevealDiv delay={100}>
                            <div className="space-y-5">
                                {detail.problemBody.map((para, i) => (
                                    <p
                                        key={i}
                                        className="text-[17px] leading-[1.5] text-black/60"
                                    >
                                        {para}
                                    </p>
                                ))}
                            </div>
                        </RevealDiv>
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
                                            Start unlocking your potential by
                                            learning cutting-edge tools,
                                            building real-world expertise, and
                                            developing critical skills needed to
                                            thrive in the dynamic field of AI,
                                            data science, and next-generation
                                            technology. Whether you're starting
                                            your career, switching industries,
                                            or scaling your business, this
                                            program equips you with the
                                            practical knowledge to stay ahead in
                                            an ever-evolving digital landscape.
                                            {` ${course.title}.`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </RevealDiv>
                </div>

                {/* ═══════════════ WHAT YOU WILL LEARN ═══════════════ */}
                <div
                    id="learning"
                    className="sticky top-0 z-[2] mx-auto max-w-[1240px] px-6 pb-20"
                >
                    <RevealDiv>
                        <div className="rounded-[22px] bg-white border border-black/[0.04] shadow-[0_12px_40px_rgba(152,44,220,0.06)] p-8 sm:p-10 lg:p-12">
                            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-12 items-start">
                                <div className="flex flex-col items-start">
                                    <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                                        LEARNING OUTCOMES
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

                                    <p className="mt-6 max-w-[260px] text-[13px] sm:text-[14px] leading-[1.6] font-medium text-black/55">
                                        {detail.finalProject.intro}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {detail.outcomes.map((outcome, i) => (
                                        <RevealDiv key={i} delay={i * 50}>
                                            <div
                                                className={`min-h-[202px] rounded-[17px] p-5 flex flex-col hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,.08)] transition-all duration-300 cursor-default ${
                                                    i % 2 === 1
                                                        ? "bg-[#cdbdff]"
                                                        : "border border-black/[0.08] bg-white"
                                                }`}
                                            >
                                                <span className="text-sm font-semibold text-black/30 mb-5">
                                                    {String(i + 1).padStart(
                                                        2,
                                                        "0",
                                                    )}
                                                </span>
                                                <h3
                                                    className={`text-[20px]  leading-[1.1] ${i % 2 === 1 ? "text-black" : "text-[#765bc4]"}`}
                                                >
                                                    {outcome}
                                                </h3>
                                            </div>
                                        </RevealDiv>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </RevealDiv>
                </div>
            </div>

            {/* ═══════════════ HOW IT WORKS ═══════════════ */}
            <section id="how-it-works" className="bg-ink py-20 sm:py-24">
                <div className="mx-auto max-w-[1240px] px-6">
                    <RevealDiv>
                        <div className="text-center mb-12">
                            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                                HOW IT WORKS
                            </p>
                            <h2 className="font-display text-[clamp(2rem,4vw,2.7rem)] font-bold tracking-[-0.04em] text-black">
                                How it works
                            </h2>
                        </div>
                    </RevealDiv>

                    <div
                        ref={timelineRef}
                        className="relative mx-auto max-w-[1080px]"
                    >
                        <div
                            aria-hidden="true"
                            className="absolute left-4 top-0 bottom-0 w-px bg-[linear-gradient(to_bottom,rgba(152,44,220,0.45),rgba(152,44,220,0.16)_20%,rgba(152,44,220,0.16)_80%,rgba(152,44,220,0.45))] lg:left-1/2 lg:-translate-x-1/2"
                        />
                        <div className="space-y-8 lg:space-y-14">
                            {detail.howItWorks.map((row, i) => {
                                const isLeft = i % 2 === 0;
                                return (
                                    <div key={i} className="relative">
                                        <span
                                            aria-hidden="true"
                                            className="absolute left-4 top-8 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] font-mono text-[11px] font-bold text-white shadow-[0_0_0_5px_rgba(152,44,220,0.14),0_6px_16px_rgba(152,44,220,0.28)] lg:left-1/2"
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </span>

                                        <div
                                            className={`pl-11 lg:pl-0 lg:w-[calc(50%-3rem)] ${
                                                isLeft
                                                    ? "lg:mr-auto"
                                                    : "lg:ml-auto"
                                            }`}
                                        >
                                            <div className="timeline-card group relative h-full overflow-hidden rounded-3xl border border-black/[0.06] bg-white/60 backdrop-blur-md p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#982cdc]/30 hover:shadow-[0_18px_45px_rgba(152,44,220,0.15)]">
                                                <span
                                                    aria-hidden="true"
                                                    className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,#982cdc,#eec369)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                                                />
                                                <div className="flex items-start gap-4">
                                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(60deg,#982cdc,#eec369)] font-mono text-[13px] font-bold text-white shadow-[0_6px_16px_rgba(152,44,220,0.3)] transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                                                        {String(i + 1).padStart(
                                                            2,
                                                            "0",
                                                        )}
                                                    </span>
                                                    <div>
                                                        <p className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-[#982cdc]/20 bg-[#982cdc]/[0.08] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#7b1fb0]">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                                                            {row.label}
                                                        </p>
                                                        <p className="text-[15.5px] leading-[1.6] text-black/70">
                                                            {row.value}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ MASTER THESE TOOLS ═══════════════ */}
            <section
                id="tools"
                className="bg-ink border-y border-black/[0.06] overflow-hidden"
            >
                <RevealDiv>
                    <div className="py-16 sm:py-20 text-center">
                        <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                            TOOLS
                        </p>
                        <h2 className="font-display text-[clamp(2rem,4vw,2.7rem)] font-bold tracking-[-0.04em] text-black">
                            Master These Tools
                        </h2>
                        <p className="mt-3 text-[15px] text-black/45 max-w-xl mx-auto">
                            {detail.toolsNote}
                        </p>
                    </div>
                </RevealDiv>

                <div className="relative overflow-hidden border-y border-black/[0.06] py-10 sm:py-12 group/marquee">
                    <div className="flex w-max animate-[marquee_30s_linear_infinite] group-hover/marquee:[animation-play-state:paused] items-center">
                        {[0, 1].map((set) => (
                            <div
                                key={set}
                                className="flex items-center shrink-0"
                            >
                                {detail.tools.map((tool, i) => (
                                    <span
                                        key={`${set}-${tool.name}`}
                                        className="flex items-center"
                                    >
                                        {tool.logo ? (
                                            <span className="flex items-center cursor-default group/tool">
                                                <img
                                                    src={tool.logo}
                                                    alt={tool.name}
                                                    className="
                                                        w-10 h-10
                                                        sm:w-12 sm:h-12
                                                        object-contain
                                                        opacity-70
                                                        group-hover/tool:opacity-100
                                                        transition-all
                                                        duration-300
                                                        group-hover/tool:scale-110
                                                    "
                                                />
                                            </span>
                                        ) : (
                                            <span className="text-[22px] sm:text-[26px] font-bold tracking-[-0.04em] text-black/20 hover:text-violet/40 transition-colors duration-300 cursor-default">
                                                {tool.name}
                                            </span>
                                        )}

                                        {i < detail.tools.length - 1 && (
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
                            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                                CURRICULUM
                            </p>
                            <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-bold tracking-[-0.04em] text-black">
                                Course Curriculum
                            </h2>
                        </div>
                    </RevealDiv>

                    <RevealDiv delay={100}>
                        <div className="rounded-[20px] border border-black/[0.08] bg-white/60 backdrop-blur-sm overflow-hidden">
                            {detail.modules.map((mod, i) => {
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
                                                    if (next.has(i))
                                                        next.delete(i);
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
                                                            {mod.lectures.map(
                                                                (lec) => (
                                                                    <div
                                                                        key={
                                                                            lec.num
                                                                        }
                                                                        className="flex min-h-[66px] items-center justify-between rounded-[10px] bg-white px-5 border border-black/[0.04] hover:border-violet/20 hover:shadow-[0_4px_16px_rgba(152,44,220,.06)] transition-all duration-300"
                                                                    >
                                                                        <div>
                                                                            <p className="text-[11px] font-semibold text-[#765bc4]">
                                                                                Lecture
                                                                                -{" "}
                                                                                {
                                                                                    lec.num
                                                                                }
                                                                            </p>
                                                                            <p className="mt-1 text-[16px] font-medium text-black">
                                                                                {
                                                                                    lec.title
                                                                                }
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
                                                                ),
                                                            )}
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

            {/* ═══════════════ THE FINAL PROJECT ═══════════════ */}
            <section
                id="final-project"
                className="bg-[#F5F5F2] border-y border-black/[0.06] py-20 sm:py-24"
            >
                <div className="mx-auto max-w-[1240px] px-6">
                    <RevealDiv>
                        <div className="max-w-[720px] mb-12">
                            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                                THE FINAL PROJECT
                            </p>
                            <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-bold tracking-[-0.04em] text-black">
                                The Final Project
                            </h2>
                            <p className="mt-4 text-[17px] leading-[1.5] text-black/60">
                                {detail.finalProject.intro}
                            </p>
                        </div>
                    </RevealDiv>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {detail.finalProject.tracks.map((track, i) => (
                            <RevealDiv key={i} delay={(i % 3) * 60}>
                                <div className="h-full min-h-[150px] rounded-[18px] bg-white border border-black/[0.05] p-6 flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(152,44,220,0.08)] transition-all duration-300">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
                                        Track {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div>
                                        <h3 className="text-[17px] font-bold text-black mb-1.5">
                                            {track.title}
                                        </h3>
                                        <p className="text-[14.5px] leading-[1.45] text-black/55">
                                            {track.desc}
                                        </p>
                                    </div>
                                </div>
                            </RevealDiv>
                        ))}
                    </div>

                    <RevealDiv delay={120}>
                        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 rounded-[18px] bg-white border border-black/[0.05] px-6 sm:px-8 py-6">
                            <div className="flex-1">
                                <p className="mb-1.5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                                    Grading & outcome
                                </p>
                                <p className="text-[15px] leading-[1.5] text-black/70">
                                    {detail.finalProject.grading}
                                </p>
                                {detail.finalProject.leave && (
                                    <p className="mt-2 text-[15px] leading-[1.5] text-black/70">
                                        <span className="font-semibold text-black">
                                            You leave with:
                                        </span>{" "}
                                        {detail.finalProject.leave}
                                    </p>
                                )}
                            </div>
                            {detail.finalProject.cta && (
                                <Link
                                    href="/contact"
                                    className="shrink-0 inline-flex items-center justify-center rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(152,44,220,.25)] hover:shadow-[0_10px_28px_rgba(152,44,220,.38)] hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    {detail.finalProject.cta}
                                </Link>
                            )}
                            {!detail.finalProject.cta && (
                                <Link
                                    href="/contact"
                                    className="shrink-0 inline-flex items-center justify-center rounded-full border border-violet/25 px-7 py-3.5 text-sm font-semibold text-violet hover:bg-violet/5 transition-all duration-300"
                                >
                                    Enquire Now
                                </Link>
                            )}
                        </div>
                    </RevealDiv>
                </div>
            </section>

            {/* ═══════════════ YOUR INSTRUCTOR ═══════════════ */}
            <section id="instructor" className="bg-ink py-20 sm:py-24">
                <div className="mx-auto max-w-[1240px] px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center">
                        <RevealDiv>
                            <div className="relative overflow-hidden rounded-[22px] border border-black/[0.04] shadow-[0_16px_48px_rgba(152,44,220,0.12)]">
                                <img
                                    src="/assets/images/team-1.webp"
                                    alt={detail.instructor.name}
                                    className="w-full aspect-[4/5] object-cover"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 pt-16">
                                    <h3 className="font-display text-[22px] font-bold text-white">
                                        {detail.instructor.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-white/70">
                                        {detail.instructor.tagline}
                                    </p>
                                </div>
                            </div>
                        </RevealDiv>

                        <RevealDiv delay={100}>
                            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                                YOUR INSTRUCTOR
                            </p>
                            <h2 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-bold tracking-[-0.04em] leading-[1.08] text-black">
                                Learn directly from people who actually use
                                these tools daily
                            </h2>
                            <p className="mt-5 text-[16.5px] leading-[1.6] text-black/60">
                                {detail.instructor.bio}
                            </p>
                            <ul className="mt-7 space-y-3.5">
                                {detail.instructor.points.map((point, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-3 text-[15px] leading-[1.5] text-black/75"
                                    >
                                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] text-white shadow-[0_2px_8px_rgba(152,44,220,.25)]">
                                            <svg
                                                className="w-3.5 h-3.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2.5}
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m4.5 12.75 6 6 9-13.5"
                                                />
                                            </svg>
                                        </span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </RevealDiv>
                    </div>
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

            {/* ═══════════════ PRICING ═══════════════ */}
            <section
                id="pricing"
                className="bg-[#F5F5F2] border-y border-black/[0.06] py-20 sm:py-24"
            >
                <div className="mx-auto max-w-[1240px] px-6">
                    <RevealDiv>
                        <div className="text-center mb-12">
                            <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                                PRICING_
                            </p>
                            <h2 className="font-display text-[clamp(2rem,4vw,2.7rem)] font-bold tracking-[-0.04em] text-black">
                                Pricing
                            </h2>
                            <p className="mt-3 text-[15px] text-black/45 max-w-xl mx-auto">
                                {typeof course.emi === "string"
                                    ? course.emi
                                    : course.emi
                                      ? "No-cost EMI available — contact us for the payment plan."
                                      : "Contact us for the current batch pricing and instalment options."}
                            </p>
                        </div>
                    </RevealDiv>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-5 items-start max-w-[1000px] mx-auto">
                        <RevealDiv>
                            <div className="h-full rounded-[22px] bg-white border border-black/[0.05] shadow-[0_12px_40px_rgba(152,44,220,0.08)] p-8 sm:p-10">
                                <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                                    Course fee
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <span className="font-display text-[38px] sm:text-[44px] font-bold tracking-[-0.03em] text-black">
                                        {course.price}
                                    </span>
                                </div>
                                <p className="mt-2 text-sm text-black/45">
                                    {typeof course.classesPerWeek === "number"
                                        ? `${course.classesPerWeek} classes a week · ${course.duration}`
                                        : `${course.duration} · ${course.hours}`}
                                </p>
                                <div className="mt-8 flex flex-col gap-3">
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-8 py-4 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(152,44,220,.25)] hover:shadow-[0_10px_28px_rgba(152,44,220,.38)] hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        Enquire & Reserve a Seat
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center rounded-full border border-black/[0.08] px-8 py-4 text-sm font-semibold text-black/70 hover:bg-black/[0.02] transition-all duration-300"
                                    >
                                        Get a Call Back
                                    </Link>
                                </div>
                                <p className="mt-6 text-[13.5px] text-black/50">
                                    {detail.teamPricing}
                                </p>
                            </div>
                        </RevealDiv>

                        <RevealDiv delay={100}>
                            <div className="rounded-[22px] bg-white border border-black/[0.05] p-8 sm:p-10">
                                <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#982cdc] animate-pulse" />
                                    What is included
                                </p>
                                <ul className="space-y-3.5">
                                    {detail.pricingIncludes.map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-3 text-[15px] leading-[1.5] text-black/70"
                                        >
                                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] text-white shadow-[0_2px_8px_rgba(152,44,220,.25)]">
                                                <svg
                                                    className="w-3.5 h-3.5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2.5}
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m4.5 12.75 6 6 9-13.5"
                                                    />
                                                </svg>
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </RevealDiv>
                    </div>

                    <RevealDiv delay={120}>
                        <p className="mt-8 max-w-[1000px] mx-auto flex items-start gap-3 rounded-[16px] border border-lime/30 bg-lime/[0.08] px-6 py-4 text-[14.5px] leading-relaxed text-black/70">
                            <svg
                                className="mt-0.5 w-5 h-5 shrink-0 text-[#765bc4]"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                                />
                            </svg>
                            {detail.guarantee}
                        </p>
                    </RevealDiv>
                </div>
            </section>

            {/* ═══════════════ FAQ ═══════════════ */}

            <FaqSection faqs={detail.faqs} />
        </PublicLayout>
    );
}
