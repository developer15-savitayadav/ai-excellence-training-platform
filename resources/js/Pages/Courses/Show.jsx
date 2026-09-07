import { useState, useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
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
        cta: "Next batch starts [DATE] · [Classroom] · No prior coding experience needed",
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
        cta: "Summer batch: [DATES] · Winter batch: [DATES] · [Classroom] · Certificate on completion",
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
        slug: "digital-marketing-with-ai",
        duration: "3 months",
        hours: "100 hrs",
        tagline: "Learn marketing the way agencies practise it in 2026",
        price: "Contact us",
        emi: true,
    },
    {
        id: 7,
        title: "Python for Data Analytics",
        slug: "python-for-data-analytics",
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

const TOOL_LOGOS = {
    ChatGPT: "/assets/images/chatgpt.png",
    Claude: "/assets/images/claude.jpg",
    Gemini: "/assets/images/gemini.jpg",
    Midjourney: "/assets/images/midjourney.jfif",
    "Canva AI": "/assets/images/canva-ai.png",
    Python: "/assets/images/python.png",
    TensorFlow: "/assets/images/tensorflow.png",
    LangChain: "/assets/images/langchain.png",
    "Hugging Face": "/assets/images/hugging-face.png",
    "Power BI": "/assets/images/power-bi.png",
    Perplexity: "/assets/images/perplexity.jpg",
    NotebookLM: "/assets/images/notebooklm.png",
    "DALL·E": "/assets/images/dalle.png",
    "Adobe Firefly": "/assets/images/adobe-firefly.png",
    Ideogram: "/assets/images/Ideogram.png",
    ElevenLabs: "/assets/images/elevenlabs.png",
    Suno: "/assets/images/suno.png",
    Runway: "/assets/images/runway.png",
    HeyGen: "/assets/images/HeyGen.png",
    Descript: "/assets/images/descript.png",
    "Notion AI": "/assets/images/notion.png",
    Gamma: "/assets/images/Gamma.png",
    Zapier: "/assets/images/zapier.png",
    Make: "/assets/images/make.png",
    n8n: "/assets/images/n8n.png",
    Cursor: "/assets/images/cursor.png",
    "Claude Code": "/assets/images/claude-code.png",
    Replit: "/assets/images/replit.png",
    Lovable: "/assets/images/lovable.png",
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
    { name: "ChatGPT", logo: "/assets/images/chatgpt.png" },
    { name: "Claude", logo: "/assets/images/claude.jpg" },
    { name: "Gemini", logo: "/assets/images/gemini.jpg" },
    { name: "Perplexity", logo: "/assets/images/perplexity.jpg" },
    { name: "NotebookLM", logo: "/assets/images/notebooklm.png" },
    { name: "DALL·E", logo: "/assets/images/dalle.png" },
    { name: "Midjourney", logo: "/assets/images/midjourney.jfif" },
    { name: "Adobe Firefly", logo: "/assets/images/adobe-firefly.png" },
    { name: "Ideogram", logo: "/assets/images/Ideogram.png" },
    { name: "ElevenLabs", logo: "/assets/images/elevenlabs.png" },
    { name: "Suno", logo: "/assets/images/suno.png" },
    { name: "Runway", logo: "/assets/images/runway.png" },
    { name: "HeyGen", logo: "/assets/images/HeyGen.png" },
    { name: "Descript", logo: "/assets/images/descript.png" },
    { name: "Canva AI", logo: "/assets/images/canva-ai.png" },
    { name: "Gamma", logo: "/assets/images/Gamma.png" },
    { name: "Notion AI", logo: "/assets/images/notion.png" },
    { name: "Zapier", logo: "/assets/images/zapier.png" },
    { name: "Make", logo: "/assets/images/make.png" },
    { name: "n8n", logo: "/assets/images/n8n.png" },
    { name: "Cursor", logo: "/assets/images/cursor.png" },
    { name: "Claude Code", logo: "/assets/images/claude-code.png" },
    { name: "Replit", logo: "/assets/images/replit.png" },
    { name: "Lovable", logo: "/assets/images/lovable.png" },
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
        heroImage: "/assets/images/AI-tools-course.png",
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
            {
                title: "AI Fluency",
                desc: "Use ChatGPT, Claude and Gemini to save hours every day",
            },
            {
                title: "Prompt Mastery",
                desc: "Write prompts that produce the output you want — first try",
            },
            {
                title: "Personal Workflow",
                desc: "Build a personal AI workflow for your role, subject or business",
            },
            {
                title: "Content Creation",
                desc: "Create images, decks, documents and social content in minutes",
            },
            {
                title: "Memory & Grounding",
                desc: "Feed AI your own knowledge (drag-and-drop) for memory and grounded answers",
            },
            {
                title: "Safety & Verification",
                desc: "Verify AI output, spot hallucinations and stay safe",
            },
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
        toolsNote:
            "24 industry-leading tools — available on free or freemium tiers. A budget note caps your real spend.",
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
                answer: "The course runs as a live cohort at our Lucknow academy. Contact us for the schedule of the next batch.",
            },
        ],
    },
    "python-programming-foundation": {
        heroImage: "/assets/images/python-course.png",
        eyebrow:
            "6-Week Live Course · Beginner-Friendly · Certificate Included",
        trustLine:
            "Next batch starts [DATE] · [Classroom] · No prior coding experience needed",
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
            {
                title: "Core Basics",
                desc: "Installation, IDEs, variables, data types, input/output, operators",
            },
            {
                title: "Control Flow",
                desc: "Conditions, loops, patterns, problem-solving drills",
            },
            {
                title: "Data Structures",
                desc: "Strings, lists, tuples, sets, dictionaries — and when to use each",
            },
            {
                title: "Functions & Files",
                desc: "Functions, arguments, scope, built-in modules, file handling",
            },
            {
                title: "OOP & Error Handling",
                desc: "Classes, objects, inheritance, exception handling",
            },
            {
                title: "Real-World Python",
                desc: "Working with libraries (NumPy/Pandas intro), APIs basics, final project build & presentation",
            },
        ],
        howItWorks: [
            { label: "Duration", value: "6 weeks" },
            {
                label: "Schedule",
                value: "[5 days/week, 1.5–2 hrs/day] — [Batch timings]",
            },
            { label: "Mode", value: "[Classroom]" },
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
        heroImage: "/assets/images/generative-ai-prompt-engineering.png",
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
            {
                title: "LLM Foundations",
                desc: "How LLMs work, hallucinations, capabilities and limits; tour of ChatGPT, Claude, Gemini, Perplexity",
            },
            {
                title: "Prompt Engineering",
                desc: "Prompt structure, role/context/format, few-shot prompting, chain-of-thought, iteration techniques; build your prompt library",
            },
            {
                title: "Documents & Research",
                desc: "Summarization, data extraction, research with citations, report and presentation generation",
            },
            {
                title: "Creative AI",
                desc: "Image generation (Midjourney/DALL·E-class tools), voice and music, AI video basics, design tools like Canva AI and Gamma",
            },
            {
                title: "Custom Assistants",
                desc: "Build your own GPT/Claude Project on your documents; no-code automations connecting AI to email, sheets, and forms",
            },
            {
                title: "Responsible AI + Capstone",
                desc: "Detecting errors and bias, privacy, disclosure; build and present your final project",
            },
        ],
        howItWorks: [
            { label: "Duration", value: "6 weeks" },
            { label: "Schedule", value: "[Days/week and timings]" },
            { label: "Mode", value: "[Classroom]" },
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
        heroImage: "/assets/images/ai-hero-robot.png",
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
            {
                title: "AI Essentials",
                desc: "How AI tools work, what they can and can't do; hands-on with ChatGPT/Claude/Gemini for emails, proposals, reports, and research",
            },
            {
                title: "Marketing & Content",
                desc: "Social media content, ad copy, product images, brochures, and videos with AI; building a monthly content calendar in one sitting",
            },
            {
                title: "Operations & Automation",
                desc: "Automating enquiries, follow-ups, quotations, and reports; a custom AI assistant trained on your price lists, policies, or FAQs",
            },
            {
                title: "Data & Roadmap",
                desc: "Analyzing sales/customer data with AI, safety and privacy for business data, evaluating AI vendors and pricing; build your 90-day AI adoption roadmap",
            },
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
            { label: "Mode", value: "[Classroom]" },
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
        heroImage: "/assets/images/summer-winter-training-course.png",
        eyebrow:
            "45-Day Industrial Training · For B.Tech / MCA / BCA Students · AKTU-Compliant",
        trustLine:
            "Summer batch: [DATES] · Winter batch: [DATES] · [Classroom] · Certificate on completion",
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
            {
                title: "Core Concepts",
                desc: "Core concepts of your chosen track with daily hands-on labs",
            },
            {
                title: "Advanced Skills",
                desc: "Advanced topics, tools of the trade, weekly assessments, mini-projects",
            },
            {
                title: "Individual Project",
                desc: "Individual project built under mentor guidance — the project you'll submit to your college",
            },
            {
                title: "Documentation & Viva",
                desc: "Project report as per university format, presentation practice, mock viva, final demo",
            },
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
            { label: "Mode", value: "[Classroom]" },
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
                question: "Where does the training take place?",
                answer: "The training runs at our Lucknow academy in a live, classroom format. All sessions are conducted in-person with hands-on labs.",
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
    "digital-marketing-with-ai": {
        heroImage: "/assets/images/ai-hero-robot.png",
        eyebrow:
            "3-Month Professional Course · Live · Hands-On · Placement Support",
        trustLine:
            "5 days a week · Real ad budget included · Certificate + portfolio",
        whoItsForHeadline:
            "Built for people who want to master marketing the way agencies actually do it in 2026",
        whoItsForBullets: [
            "Graduates and freshers targeting agency, brand or freelance marketing roles",
            "Business owners who want to run their own digital marketing without an agency",
            "Working professionals in marketing, sales or content who want AI-powered skills",
            "Freelancers who want to offer complete digital marketing services to clients",
        ],
        audience: [
            {
                label: "Freshers & Graduates",
                desc: "Graduates and freshers targeting agency, brand or freelance marketing roles",
                img: "/assets/images/students.png",
                tone: "gold",
            },
            {
                label: "Business Owners",
                desc: "Business owners who want to run their own digital marketing without an agency",
                img: "/assets/images/shop-owners.png",
                tone: "gold",
            },
            {
                label: "Marketing Professionals",
                desc: "Working professionals in marketing, sales or content who want AI-powered skills",
                img: "/assets/images/teacher.png",
                tone: "white",
            },
            {
                label: "Freelancers",
                desc: "Freelancers who want to offer complete digital marketing services to clients",
                img: "/assets/images/job-seekers.png",
                tone: "white",
            },
        ],
        readinessNote:
            "No prior marketing experience needed. If you use social media and can write an email, you have the foundation.",
        problemTitle: "Marketing has changed. Most courses haven't.",
        problemBody: [
            "Digital marketing in 2026 is not about posting on Instagram and hoping for the best. It is AI-assisted SEO, automated ad bidding, data-driven creative testing, and full-funnel analytics. The marketers who understand this are the ones agencies fight to hire. This course makes you one of them.",
        ],
        outcomes: [
            {
                title: "Digital Ecosystem",
                desc: "Understand the full digital landscape — funnels, buyer psychology, KPIs, and how every channel fits together",
            },
            {
                title: "SEO with AI",
                desc: "Keyword research, on-page and technical SEO, AI content briefs, and GEO/AEO for AI-powered search",
            },
            {
                title: "Paid Ads Mastery",
                desc: "Meta Ads — campaign structure, audiences, creative testing, Advantage+ — and Google Ads — Search, Performance Max, AI bidding",
            },
            {
                title: "Content & Creative with AI",
                desc: "AI copywriting, image generation, short-form video, brand voice systems, and social media management",
            },
            {
                title: "Analytics & Reporting",
                desc: "GA4, Search Console, Looker Studio dashboards, and AI-assisted reporting that impresses clients and employers",
            },
            {
                title: "Live Campaign Portfolio",
                desc: "A real ad campaign with a real budget — a complete case study you can show any employer or client",
            },
        ],
        howItWorks: [
            { label: "Duration", value: "3 months" },
            { label: "Total hours", value: "100 hours" },
            { label: "Schedule", value: "5 classes a week" },
            {
                label: "Session format",
                value: "Live, instructor-led, hands-on — real campaigns, real budgets, real results",
            },
            {
                label: "Live campaign",
                value: "You run a live ad campaign with a real ad budget funded by the academy",
            },
            { label: "Class size", value: "Small, limited-seat cohorts" },
            { label: "Recordings", value: "Sessions recorded for revision" },
            {
                label: "Support",
                value: "Personal doubt-clearing and campaign review during the course",
            },
        ],
        weeks: [
            {
                week: 1,
                title: "Digital Marketing Foundations",
                topics: [
                    "The digital ecosystem — channels, funnels, buyer psychology, KPIs",
                    "Introduction to AI in marketing — tools, workflows, and the 2026 landscape",
                ],
            },
            {
                week: 2,
                title: "Websites & Landing Pages",
                topics: [
                    "WordPress fundamentals and AI site builders",
                    "Landing page design, conversion basics, and CRO essentials",
                ],
            },
            {
                week: 3,
                title: "SEO Foundations",
                topics: [
                    "Keyword research with AI tools — search volume, intent, competition analysis",
                    "On-page SEO — meta tags, heading structure, internal linking, content optimization",
                ],
            },
            {
                week: 4,
                title: "Advanced SEO with AI",
                topics: [
                    "Technical SEO — site speed, crawlability, schema markup, Core Web Vitals",
                    "AI content briefs, GEO/AEO for AI search, and competitive gap analysis",
                ],
            },
            {
                week: 5,
                title: "Content & Creative with AI",
                topics: [
                    "AI copywriting for ads, emails, and social — brand voice and tone systems",
                    "Image generation with AI, short-form video creation, and Canva AI workflows",
                ],
            },
            {
                week: 6,
                title: "Social Media Management",
                topics: [
                    "Organic strategy — platform-specific content, calendars, community management",
                    "AI scheduling tools, analytics dashboards, and performance tracking",
                ],
            },
            {
                week: 7,
                title: "Meta Ads",
                topics: [
                    "Campaign structure — objectives, ad sets, audiences, and budget allocation",
                    "Creative testing frameworks, Advantage+, and retargeting strategies",
                ],
            },
            {
                week: 8,
                title: "Google Ads",
                topics: [
                    "Search campaigns — keyword match types, ad copy, Quality Score, AI bidding",
                    "Performance Max, Keyword Planner, and cross-campaign attribution",
                ],
            },
            {
                week: 9,
                title: "Email & WhatsApp Marketing",
                topics: [
                    "Email automation — sequences, segmentation, A/B testing, deliverability",
                    "WhatsApp marketing — broadcast lists, chatbots, AI personalization",
                ],
            },
            {
                week: 10,
                title: "Analytics & Data",
                topics: [
                    "GA4 setup, events, conversions, and user journey tracking",
                    "Search Console, Looker Studio dashboards, and AI-assisted reporting",
                ],
            },
            {
                week: 11,
                title: "Live Campaign Sprint",
                topics: [
                    "Launch and manage a real ad campaign with a real budget",
                    "Optimize in real time — creative rotation, bid adjustments, audience refinement",
                ],
            },
            {
                week: 12,
                title: "Capstone & Career",
                topics: [
                    "Compile campaign case study with full-funnel metrics and ROI analysis",
                    "Portfolio review, resume building, LinkedIn optimization, and mock interviews",
                ],
            },
        ],
        finalProject: {
            intro: "A complete digital marketing campaign — from strategy to live execution — with real results you can present to any employer or client.",
            tracks: [
                {
                    title: "Agency Track",
                    desc: "Full-funnel campaign for a real or simulated brand — SEO, ads, content, analytics",
                },
                {
                    title: "Freelancer Track",
                    desc: "Client-ready marketing proposal with channel strategy, budget, and projected KPIs",
                },
                {
                    title: "Business Owner Track",
                    desc: "Marketing plan for your own business with live ad setup and conversion tracking",
                },
            ],
            grading:
                "Graded on campaign performance metrics, completeness of deliverables, and case study presentation.",
            leave: "A portfolio-ready campaign case study with real metrics, plus the full Professional career services package.",
            cta: "Enrol Now",
        },
        toolsNote:
            "24 industry-leading tools — available on free or freemium tiers. Ad budget is funded by the academy for the live campaign project.",
        instructor: {
            name: "Your Lead Instructor",
            tagline:
                "Digital Marketing Practitioner · 6+ Years Agency Experience",
            bio: "Live, in-person, taught by practitioners who run real campaigns — not by someone who just reads about marketing.",
            points: [
                "6+ years running digital marketing campaigns for agencies and brands",
                "Managed ad budgets of ₹50L+ across Meta, Google, and programmatic platforms",
                "Trained 50+ marketing professionals and students at the academy",
                "Every technique is tested on live campaigns before it reaches the classroom",
            ],
        },
        pricingIncludes: [
            "All 60 live, instructor-led sessions over 3 months",
            "Lifetime access to all session recordings",
            "The complete curriculum workbook (PDF)",
            "Real ad budget for the live campaign project",
            "Final project feedback and case study review",
            "Certificate of completion",
            "Professional career services package",
        ],
        teamPricing: "Teams of 2+ get 10% off · Teams of 5+ get 15% off",
        guarantee:
            "If you attend every session and complete the final project, and you don't feel confident running digital marketing campaigns, we'll make it right.",
        faqs: [
            {
                question: "I have zero marketing experience. Will I cope?",
                answer: "Yes — this course starts from the foundations of the digital ecosystem, funnels, and buyer psychology. No prior marketing experience is required.",
            },
            {
                question:
                    "What does the 'live campaign with real budget' mean?",
                answer: "You will run an actual ad campaign on Meta or Google using a real ad budget provided by the academy. You manage the campaign, optimize it, and present the results — just like you would at an agency.",
            },
            {
                question: "Will I learn both SEO and paid ads?",
                answer: "Yes. The course covers organic search (SEO with AI), paid search (Google Ads), paid social (Meta Ads), email marketing, and analytics — the full stack.",
            },
            {
                question: "What tools will I use?",
                answer: "Google Ads, Meta Ads Manager, GA4, Search Console, Looker Studio, SEMrush, ChatGPT/Claude for copy, Midjourney/DALL-E for creatives, Canva AI, Mailchimp, WordPress, and more.",
            },
            {
                question: "Will I get a certificate?",
                answer: "Yes — you earn a certificate of completion after finishing the campaign case study, graded on performance metrics and deliverables.",
            },
            {
                question: "Can this help me get a marketing job?",
                answer: "Yes. You graduate with a live campaign case study, a complete portfolio, and the Professional career services package including resume building, LinkedIn optimization, mock interviews, and job referrals.",
            },
            {
                question: "Do I need a laptop?",
                answer: "Yes. You need a laptop with a browser for running ads, managing campaigns, and using analytics tools. A smartphone is helpful but not sufficient.",
            },
            {
                question:
                    "How is this different from free YouTube marketing courses?",
                answer: "Structure, accountability, a live campaign with real money, and career services. You don't just watch — you build, launch, optimize, and present results that go on your resume.",
            },
        ],
        heroCta: "Enrol Now",
        heroCtaSecondary: "Download Syllabus",
    },
    "python-for-data-analytics": {
        heroImage: "/assets/images/python-course.png",
        eyebrow:
            "3-Month Professional Course · Live · Hands-On · Placement Support",
        trustLine:
            "5 days a week · Certificate + GitHub portfolio · Career services included",
        whoItsForHeadline:
            "The fastest route into data analyst and business analyst roles",
        whoItsForBullets: [
            "Graduates from any stream who want to break into data analytics",
            "Commerce and finance professionals looking to add analytical skills",
            "Freshers targeting data analyst, business analyst, or MIS roles",
            "Working professionals who want to move from spreadsheets to Python and dashboards",
        ],
        audience: [
            {
                label: "Freshers & Graduates",
                desc: "Graduates from any stream who want to break into data analytics",
                img: "/assets/images/students.png",
                tone: "gold",
            },
            {
                label: "Commerce & Finance Pros",
                desc: "Commerce and finance professionals looking to add analytical skills",
                img: "/assets/images/teacher.png",
                tone: "gold",
            },
            {
                label: "Career Switchers",
                desc: "Working professionals who want to move from spreadsheets to Python and dashboards",
                img: "/assets/images/job-seekers.png",
                tone: "white",
            },
            {
                label: "MIS & Analyst Aspirants",
                desc: "Freshers targeting data analyst, business analyst, or MIS roles",
                img: "/assets/images/exam-aspirants.png",
                tone: "white",
            },
        ],
        readinessNote:
            "No prior coding experience needed. If you can use Excel, you can learn Python for data analytics.",
        problemTitle: "Excel is not enough anymore.",
        problemBody: [
            "Every job description for analyst roles now asks for Python, SQL, and dashboards. The candidates who can clean data in Pandas, query databases in SQL, and present insights in Power BI are the ones getting callbacks. This course takes you from Excel to all three — in three months, with real projects on your GitHub.",
        ],
        outcomes: [
            {
                title: "Python for Data",
                desc: "Python fundamentals, data types, loops, functions — applied specifically to data work, not web dev",
            },
            {
                title: "Pandas & NumPy",
                desc: "Data manipulation, filtering, grouping, merging, pivot tables — the analyst's daily toolkit",
            },
            {
                title: "SQL for Analytics",
                desc: "SELECT, JOINs, subqueries, window functions, CTEs — query real databases like a pro",
            },
            {
                title: "Data Cleaning",
                desc: "Handle missing values, duplicates, inconsistent formats, and messy real-world datasets",
            },
            {
                title: "Visualization & Dashboards",
                desc: "Matplotlib, Seaborn, and Power BI — from raw charts to interactive dashboards that drive decisions",
            },
            {
                title: "Statistics for Analysts",
                desc: "Descriptive statistics, distributions, correlation, hypothesis testing — the math behind the insights",
            },
        ],
        howItWorks: [
            { label: "Duration", value: "3 months" },
            { label: "Total hours", value: "96 hours" },
            { label: "Schedule", value: "5 classes a week" },
            {
                label: "Session format",
                value: "Live, instructor-led, hands-on — code along with real datasets every session",
            },
            { label: "Class size", value: "Small, limited-seat cohorts" },
            { label: "Recordings", value: "Sessions recorded for revision" },
            {
                label: "Support",
                value: "Personal doubt-clearing and project review during the course",
            },
        ],
        weeks: [
            {
                week: 1,
                title: "Python Foundations",
                topics: [
                    "Installation, IDEs, variables, data types, operators, input/output",
                    "Strings, lists, tuples, sets, dictionaries — and when to use each",
                ],
            },
            {
                week: 2,
                title: "Python Control Flow & Functions",
                topics: [
                    "Conditions, loops, list comprehensions, function definitions",
                    "File handling — reading CSVs, writing output files, error handling",
                ],
            },
            {
                week: 3,
                title: "Introduction to Pandas",
                topics: [
                    "DataFrames, Series, indexing, selecting, filtering, sorting",
                    "Reading CSV and Excel files, inspecting data with describe() and info()",
                ],
            },
            {
                week: 4,
                title: "Pandas Deep Dive",
                topics: [
                    "Groupby, aggregation, pivot tables, melt, merge, and join",
                    "Handling missing values, duplicates, and data type conversions",
                ],
            },
            {
                week: 5,
                title: "NumPy Essentials",
                topics: [
                    "Arrays, broadcasting, vectorized operations, indexing, slicing",
                    "Statistical functions — mean, median, std, percentiles, random sampling",
                ],
            },
            {
                week: 6,
                title: "SQL Foundations",
                topics: [
                    "SELECT, WHERE, ORDER BY, GROUP BY, HAVING, aggregate functions",
                    "INNER, LEFT, RIGHT, FULL joins — querying related tables",
                ],
            },
            {
                week: 7,
                title: "Advanced SQL",
                topics: [
                    "Subqueries, CTEs, window functions, CASE statements",
                    "DATE functions, string functions, and real-world query patterns",
                ],
            },
            {
                week: 8,
                title: "Data Cleaning & Transformation",
                topics: [
                    "Real-world messy datasets — fixing inconsistencies, standardizing formats",
                    "Feature engineering basics — creating new columns, binning, encoding",
                ],
            },
            {
                week: 9,
                title: "Descriptive Statistics",
                topics: [
                    "Mean, median, mode, variance, standard deviation, distributions",
                    "Correlation, scatter plots, and identifying patterns in data",
                ],
            },
            {
                week: 10,
                title: "Visualization with Matplotlib & Seaborn",
                topics: [
                    "Bar charts, line charts, histograms, box plots, heatmaps",
                    "Customizing plots — titles, labels, legends, color palettes, subplots",
                ],
            },
            {
                week: 11,
                title: "Power BI Dashboards",
                topics: [
                    "Power BI Desktop — importing data, transforming data, building relationships",
                    "Creating interactive dashboards with slicers, filters, and DAX basics",
                ],
            },
            {
                week: 12,
                title: "Capstone Project & Career",
                topics: [
                    "End-to-end analysis project — from raw data to dashboard and presentation",
                    "Portfolio review, GitHub setup, resume building, and mock interviews",
                ],
            },
        ],
        finalProject: {
            intro: "An end-to-end data analysis project — from raw dataset to clean data, insights, and an interactive dashboard — ready for your GitHub and resume.",
            tracks: [
                {
                    title: "Business Analytics",
                    desc: "Analyze a real business dataset — sales, revenue, customer behavior — and present actionable insights",
                },
                {
                    title: "Finance Analytics",
                    desc: "Financial data analysis — budgeting, forecasting, expense categorization with visualizations",
                },
                {
                    title: "Marketing Analytics",
                    desc: "Campaign performance analysis — conversion funnels, channel attribution, ROI metrics",
                },
            ],
            grading:
                "Graded on data quality, analysis depth, visualization clarity, and presentation.",
            leave: "A portfolio of analysis projects and dashboards on GitHub, plus the full Professional career services package.",
            cta: "Enrol Now",
        },
        toolsNote:
            "24 industry-leading tools — available on free or freemium tiers.",
        instructor: {
            name: "Your Lead Instructor",
            tagline:
                "Data Analytics Practitioner · 5+ Years Industry Experience",
            bio: "Live, in-person, taught by practitioners who work with data daily — not by someone who just teaches from slides.",
            points: [
                "5+ years working with data analytics, Python, SQL, and dashboards in industry",
                "Built analytics pipelines for e-commerce, finance, and marketing teams",
                "Trained 40+ professionals and students in data analytics at the academy",
                "Every project uses real-world datasets, not toy examples",
            ],
        },
        pricingIncludes: [
            "All 60 live, instructor-led sessions over 3 months",
            "Lifetime access to all session recordings",
            "The complete curriculum workbook (PDF)",
            "Real-world datasets for every project",
            "Final project feedback and dashboard review",
            "Certificate of completion",
            "Professional career services package",
        ],
        teamPricing: "Teams of 2+ get 10% off · Teams of 5+ get 15% off",
        guarantee:
            "If you attend every session and complete the final project, and you don't feel confident working with data in Python, SQL, and Power BI, we'll make it right.",
        faqs: [
            {
                question:
                    "I come from a non-technical background. Can I learn this?",
                answer: "Yes. The course starts from Python basics and assumes no coding experience. If you can use Excel, you can learn Python for data analytics.",
            },
            {
                question:
                    "What's the difference between this and the Applied Machine Learning course?",
                answer: "This course focuses on data analysis — cleaning, exploring, visualizing, and presenting data. The ML course goes further into predictive modeling, algorithms, and deployment.",
            },
            {
                question: "Will I learn SQL too?",
                answer: "Yes. SQL is a core part of the curriculum — you'll learn to query databases, write complex joins, use window functions, and build analytical queries.",
            },
            {
                question: "What jobs can I get after this course?",
                answer: "Data Analyst, Business Analyst, MIS Executive, Reporting Analyst, Junior BI Analyst — roles that require Python, SQL, and dashboarding skills.",
            },
            {
                question: "Will I work on real datasets?",
                answer: "Yes. Every project uses real-world datasets from e-commerce, finance, marketing, and healthcare — not toy CSVs with perfect data.",
            },
            {
                question: "Will I get a certificate?",
                answer: "Yes — you earn a certificate of completion after finishing the capstone project, graded on analysis quality and dashboard presentation.",
            },
            {
                question: "Do I need a powerful laptop?",
                answer: "No. Any laptop that runs Python and a browser will work. Power BI Desktop requires Windows, but all other tools work on any OS.",
            },
            {
                question: "Can this help me get a job?",
                answer: "Yes. You graduate with a GitHub portfolio of analysis projects and the full Professional career services package — resume building, LinkedIn optimization, mock interviews, and job referrals.",
            },
        ],
        heroCta: "Enrol Now",
        heroCtaSecondary: "Download Syllabus",
    },
    "applied-machine-learning": {
        heroImage: "/assets/images/ai-hero-robot.png",
        eyebrow:
            "4-Month Professional Course · Live · Hands-On · From Data to Deployed Model",
        trustLine:
            "Prerequisite: Python Foundation or entrance test · Certificate + deployed capstone",
        whoItsForHeadline: "From data to deployed model in four months",
        whoItsForBullets: [
            "Graduates and freshers who want to break into machine learning and data science roles",
            "Analysts and developers who want to move from descriptive analytics to predictive modeling",
            "Career changers with Python skills who want hands-on ML experience",
            "Students preparing for placements in AI/ML or data science tracks",
        ],
        audience: [
            {
                label: "Freshers & Graduates",
                desc: "Graduates and freshers who want to break into machine learning and data science roles",
                img: "/assets/images/students.png",
                tone: "gold",
            },
            {
                label: "Analysts & Developers",
                desc: "Analysts and developers who want to move from descriptive analytics to predictive modeling",
                img: "/assets/images/teacher.png",
                tone: "gold",
            },
            {
                label: "Career Changers",
                desc: "Career changers with Python skills who want hands-on ML experience",
                img: "/assets/images/job-seekers.png",
                tone: "white",
            },
            {
                label: "Placement Aspirants",
                desc: "Students preparing for placements in AI/ML or data science tracks",
                img: "/assets/images/exam-aspirants.png",
                tone: "white",
            },
        ],
        readinessNote:
            "You need solid Python fundamentals — variables, loops, functions, Pandas basics. Take our Python Foundation course or pass the entrance test.",
        problemTitle: "Knowing Python is not the same as building models.",
        problemBody: [
            "Most Python courses stop at loops and functions. Most data science courses stop at Jupyter notebooks. This course starts where those end — you learn to clean data, engineer features, train models, evaluate them properly, and deploy them as working applications. That is what employers actually test for.",
        ],
        outcomes: [
            {
                title: "Data Wrangling",
                desc: "Pandas, NumPy, cleaning messy data, feature engineering — preparing data for modeling",
            },
            {
                title: "Visualization",
                desc: "Matplotlib, Seaborn, exploratory data analysis that reveals patterns and outliers",
            },
            {
                title: "SQL for Data",
                desc: "Querying databases, joins, aggregations, and subqueries for data extraction",
            },
            {
                title: "Supervised Learning",
                desc: "Linear regression, logistic regression, decision trees, random forest, XGBoost, SVMs",
            },
            {
                title: "Unsupervised Learning",
                desc: "K-Means clustering, hierarchical clustering, PCA, dimensionality reduction",
            },
            {
                title: "Model Deployment",
                desc: "Streamlit, Flask, model serialization, building and sharing working ML applications",
            },
            {
                title: "Capstone Project",
                desc: "An end-to-end ML project — from raw data to a deployed model on your GitHub",
            },
        ],
        howItWorks: [
            { label: "Duration", value: "4 months" },
            { label: "Total hours", value: "128 hours" },
            { label: "Schedule", value: "5 classes a week" },
            {
                label: "Session format",
                value: "Live, instructor-led, hands-on — code along with real datasets every session",
            },
            {
                label: "Prerequisite",
                value: "Python Foundation course or entrance test",
            },
            { label: "Class size", value: "Small, limited-seat cohorts" },
            { label: "Recordings", value: "Sessions recorded for revision" },
            {
                label: "Support",
                value: "Personal doubt-clearing and project review during the course",
            },
        ],
        weeks: [
            {
                week: 1,
                title: "Math Intuition & Data Foundations",
                topics: [
                    "Statistics essentials — mean, variance, standard deviation, distributions",
                    "Probability basics, Bayes' theorem, and their relevance to ML",
                ],
            },
            {
                week: 2,
                title: "Python for Data Science",
                topics: [
                    "NumPy arrays, broadcasting, vectorized operations",
                    "Pandas review — DataFrames, groupby, merge, pivot — applied to ML datasets",
                ],
            },
            {
                week: 3,
                title: "Data Cleaning & Feature Engineering",
                topics: [
                    "Handling missing values, outliers, and inconsistent data types",
                    "Feature creation, encoding categorical variables, scaling numerical features",
                ],
            },
            {
                week: 4,
                title: "Visualization & EDA",
                topics: [
                    "Matplotlib and Seaborn for exploratory data analysis",
                    "Distribution plots, correlation heatmaps, pair plots, and identifying patterns",
                ],
            },
            {
                week: 5,
                title: "SQL for Data Work",
                topics: [
                    "SELECT, JOINs, GROUP BY, HAVING, subqueries, CTEs",
                    "Window functions and analytical queries for feature extraction",
                ],
            },
            {
                week: 6,
                title: "Introduction to Machine Learning",
                topics: [
                    "What ML is, types of learning — supervised, unsupervised, reinforcement",
                    "Train-test split, cross-validation, overfitting, underfitting, bias-variance tradeoff",
                ],
            },
            {
                week: 7,
                title: "Linear & Logistic Regression",
                topics: [
                    "Linear regression — cost function, gradient descent, evaluation metrics",
                    "Logistic regression — sigmoid, decision boundary, confusion matrix, ROC-AUC",
                ],
            },
            {
                week: 8,
                title: "Decision Trees & Ensembles",
                topics: [
                    "Decision trees — Gini, entropy, pruning, feature importance",
                    "Random forest, bagging, boosting — AdaBoost, Gradient Boosting, XGBoost",
                ],
            },
            {
                week: 9,
                title: "Model Evaluation & Tuning",
                topics: [
                    "Metrics — accuracy, precision, recall, F1, RMSE, MAE, R²",
                    "Grid search, random search, hyperparameter tuning, learning curves",
                ],
            },
            {
                week: 10,
                title: "Unsupervised Learning",
                topics: [
                    "K-Means clustering — elbow method, silhouette score",
                    "Hierarchical clustering, PCA, dimensionality reduction techniques",
                ],
            },
            {
                week: 11,
                title: "Support Vector Machines & Advanced Topics",
                topics: [
                    "SVMs — kernel trick, margin, support vectors",
                    "Naive Bayes, KNN, ensemble stacking, and when to use which model",
                ],
            },
            {
                week: 12,
                title: "Feature Engineering Mastery",
                topics: [
                    "Advanced feature engineering — text features, date features, interaction terms",
                    "Feature selection methods — mutual information, recursive feature elimination",
                ],
            },
            {
                week: 13,
                title: "Model Serialization & Pipelines",
                topics: [
                    "Saving and loading models with joblib and pickle",
                    "Building sklearn pipelines for reproducible workflows",
                ],
            },
            {
                week: 14,
                title: "Deployment with Streamlit",
                topics: [
                    "Building interactive ML web apps with Streamlit",
                    "User inputs, model prediction, displaying results, and deploying to Streamlit Cloud",
                ],
            },
            {
                week: 15,
                title: "Deployment with Flask",
                topics: [
                    "Building REST APIs with Flask for model serving",
                    "Request handling, JSON responses, and deploying to a cloud platform",
                ],
            },
            {
                week: 16,
                title: "Capstone Project & Career",
                topics: [
                    "Complete end-to-end ML project — data to deployed model",
                    "Portfolio review, GitHub optimization, resume building, mock interviews",
                ],
            },
        ],
        finalProject: {
            intro: "A deployed machine learning application — from raw data through model training to a live web app — hosted on your GitHub and ready for interviews.",
            tracks: [
                {
                    title: "Predictive Analytics",
                    desc: "Predict house prices, customer churn, or loan default with a deployed Streamlit app",
                },
                {
                    title: "Classification",
                    desc: "Spam detection, disease prediction, or fraud detection with a Flask API",
                },
                {
                    title: "Recommendation System",
                    desc: "Product or content recommendation engine with a working interface",
                },
            ],
            grading:
                "Graded on data handling, model performance, code quality, deployment functionality, and presentation.",
            leave: "A deployed capstone model and a GitHub portfolio, plus the full Professional career services package.",
            cta: "Enrol Now",
        },
        toolsNote:
            "24 industry-leading tools — available on free or freemium tiers. You will deploy your capstone to Streamlit Cloud or a similar free platform.",
        instructor: {
            name: "Your Lead Instructor",
            tagline:
                "ML Engineer & Trainer · 5+ Years Building Production Models",
            bio: "Live, in-person, taught by practitioners who deploy ML models in production — not by someone who only teaches from textbooks.",
            points: [
                "5+ years building and deploying machine learning models in industry",
                "Experience with supervised learning, NLP, and recommendation systems",
                "Trained 30+ professionals and students in ML at the academy",
                "Every technique is tested on real datasets before it reaches the classroom",
            ],
        },
        pricingIncludes: [
            "All 80 live, instructor-led sessions over 4 months",
            "Lifetime access to all session recordings",
            "The complete curriculum workbook (PDF)",
            "Real-world datasets for every project",
            "Final project feedback and deployment review",
            "Certificate of completion",
            "Professional career services package",
        ],
        teamPricing: "Teams of 2+ get 10% off · Teams of 5+ get 15% off",
        guarantee:
            "If you attend every session and complete the final project, and you don't feel confident building and deploying ML models, we'll make it right.",
        faqs: [
            {
                question: "What are the prerequisites for this course?",
                answer: "Solid Python fundamentals — variables, loops, functions, and basic Pandas. Either complete our Python Foundation course or pass our entrance test.",
            },
            {
                question: "Is this course more about theory or practice?",
                answer: "Practice. You write code every session. Math intuition is covered where needed, but the focus is on building, evaluating, and deploying real models.",
            },
            {
                question: "Will I deploy a real model?",
                answer: "Yes. Your capstone project is a fully deployed ML application — a Streamlit app or Flask API — live on the internet and on your GitHub.",
            },
            {
                question: "What kind of models will I build?",
                answer: "Regression, classification, clustering, ensemble methods, and recommendation systems — the core algorithms used in industry.",
            },
            {
                question: "Can this help me get an ML job?",
                answer: "Yes. You graduate with a deployed capstone, a GitHub portfolio, and the full Professional career services package including resume building and job referrals.",
            },
            {
                question: "How does this differ from the Advanced Diploma?",
                answer: "This is a focused 4-month Professional course on ML specifically. The Advanced Diploma is a 6-month Career program that covers ML plus deep learning, NLP, generative AI, and deployment in depth.",
            },
            {
                question: "Will I learn deep learning?",
                answer: "This course focuses on classical ML and deployment. Deep learning (neural networks, TensorFlow, CNNs) is covered in the Advanced Diploma in AI & ML.",
            },
            {
                question: "Do I need a powerful laptop?",
                answer: "No. Scikit-learn models run on any laptop. If you train large neural networks later, cloud platforms can help, but this course does not require a GPU.",
            },
        ],
        heroCta: "Enrol Now",
        heroCtaSecondary: "Download Syllabus",
    },
    "advanced-diploma-ai-ml": {
        heroImage: "/assets/images/ai-hero-robot.png",
        eyebrow:
            "6-Month Career Program · Flagship Course · Live · Placement Support",
        trustLine:
            "5 days a week, 2 hours a day · 7 deployed projects · Full career services",
        whoItsForHeadline:
            "Six months. Seven deployed projects. A portfolio that gets you interviews.",
        whoItsForBullets: [
            "Freshers and career changers who want to become AI/ML engineers, data scientists or AI developers",
            "Graduates ready to put in the work for a serious career transformation",
            "Developers who want to add ML and deep learning to their skill set",
            "Students who want the strongest possible portfolio before entering the job market",
        ],
        audience: [
            {
                label: "Freshers & Career Changers",
                desc: "Freshers and career changers who want to become AI/ML engineers, data scientists or AI developers",
                img: "/assets/images/students.png",
                tone: "gold",
            },
            {
                label: "Graduates",
                desc: "Graduates ready to put in the work for a serious career transformation",
                img: "/assets/images/exam-aspirants.png",
                tone: "gold",
            },
            {
                label: "Developers",
                desc: "Developers who want to add ML and deep learning to their skill set",
                img: "/assets/images/teacher.png",
                tone: "white",
            },
            {
                label: "Job Seekers",
                desc: "Students who want the strongest possible portfolio before entering the job market",
                img: "/assets/images/job-seekers.png",
                tone: "white",
            },
        ],
        readinessNote:
            "No prior ML experience required. Basic Python is helpful — we review the essentials in Month 1. This course demands consistency: 5 days a week, every week.",
        problemTitle:
            "This is not a certificate course. This is a career program.",
        problemBody: [
            "Six months of daily practice, seven deployed projects, and a portfolio that proves you can do the work. Most AI courses give you a certificate and a Jupyter notebook. This one gives you deployed models on GitHub, a capstone project, interview prep, and job referrals. The difference shows up on your resume and in your interviews.",
        ],
        outcomes: [
            {
                title: "Programming & Data Foundations",
                desc: "Python deep-dive, Git and GitHub, Jupyter, Pandas, NumPy, SQL — the full foundation",
            },
            {
                title: "Statistics & Data Analysis",
                desc: "Descriptive and inferential statistics, hypothesis testing, EDA, visualization, Power BI",
            },
            {
                title: "Core Machine Learning",
                desc: "Regression, classification, decision trees, random forest, XGBoost, clustering, model evaluation, feature engineering",
            },
            {
                title: "Deep Learning",
                desc: "Neural networks, TensorFlow/Keras, CNNs for computer vision, RNNs, transfer learning",
            },
            {
                title: "NLP & Generative AI",
                desc: "Text processing, embeddings, transformers, LLM APIs, RAG systems, LangChain, building AI agents, fine-tuning basics",
            },
            {
                title: "Deployment & MLOps",
                desc: "Streamlit, FastAPI, Hugging Face Spaces, cloud basics, MLOps introduction, CI/CD concepts",
            },
            {
                title: "Capstone Portfolio",
                desc: "6 graded projects + 1 capstone, all deployed and live on your GitHub",
            },
        ],
        howItWorks: [
            { label: "Duration", value: "6 months" },
            { label: "Total hours", value: "220 hours" },
            { label: "Schedule", value: "5 days a week, 2 hours a day" },
            {
                label: "Session format",
                value: "Live, instructor-led, hands-on — every session includes coding",
            },
            { label: "Class size", value: "Small, limited-seat cohorts" },
            { label: "Recordings", value: "Sessions recorded for revision" },
            {
                label: "Doubt-clearing",
                value: "Daily doubt-clearing lab access, 10 AM – 7 PM",
            },
        ],
        monthlyJourney: [
            {
                month: 1,
                title: "Programming & Data Foundations",
                hours: "40 hrs",
                topics: "Python deep-dive, Git and GitHub, Jupyter, Pandas, NumPy, SQL",
                detail: [
                    "Python refresher — data types, control flow, functions, OOP, error handling",
                    "Git and GitHub — version control, branches, pull requests, portfolio setup",
                    "Jupyter Notebooks — workflow, markdown, magic commands",
                    "Pandas — DataFrames, indexing, groupby, merge, pivot, apply",
                    "NumPy — arrays, broadcasting, vectorized operations",
                    "SQL — SELECT, JOINs, subqueries, window functions, CTEs",
                ],
            },
            {
                month: 2,
                title: "Statistics & Data Analysis",
                hours: "36 hrs",
                topics: "Descriptive and inferential statistics, hypothesis testing, EDA, visualization, Power BI",
                detail: [
                    "Descriptive statistics — central tendency, dispersion, distributions",
                    "Inferential statistics — sampling, confidence intervals, p-values",
                    "Hypothesis testing — t-tests, chi-square, ANOVA",
                    "EDA — univariate, bivariate, multivariate analysis with Matplotlib and Seaborn",
                    "Power BI — data import, transformations, DAX basics, interactive dashboards",
                ],
            },
            {
                month: 3,
                title: "Core Machine Learning",
                hours: "40 hrs",
                topics: "Regression, classification, decision trees, random forest, XGBoost, clustering, model evaluation, feature engineering",
                detail: [
                    "Linear and logistic regression — cost functions, gradient descent, evaluation",
                    "Decision trees, random forest, gradient boosting, XGBoost",
                    "Model evaluation — confusion matrix, ROC-AUC, precision, recall, F1, RMSE",
                    "Hyperparameter tuning — grid search, random search, cross-validation",
                    "Clustering — K-Means, hierarchical, DBSCAN, PCA",
                    "Feature engineering — encoding, scaling, selection, transformation",
                ],
            },
            {
                month: 4,
                title: "Deep Learning",
                hours: "40 hrs",
                topics: "Neural networks, TensorFlow/Keras, CNNs for computer vision, RNNs, transfer learning",
                detail: [
                    "Neural network fundamentals — perceptrons, activation functions, backpropagation",
                    "TensorFlow and Keras — building, training, and evaluating neural networks",
                    "CNNs — convolution, pooling, architectures (VGG, ResNet), image classification",
                    "RNNs and LSTMs — sequence data, time series, text classification",
                    "Transfer learning — using pre-trained models, fine-tuning, data augmentation",
                ],
            },
            {
                month: 5,
                title: "NLP & Generative AI",
                hours: "40 hrs",
                topics: "Text processing, embeddings, transformers, LLM APIs, RAG systems, LangChain, building AI agents, fine-tuning basics",
                detail: [
                    "Text preprocessing — tokenization, stemming, lemmatization, TF-IDF",
                    "Word embeddings — Word2Vec, GloVe, sentence transformers",
                    "Transformers — attention mechanism, BERT, GPT architecture",
                    "LLM APIs — OpenAI, Anthropic, prompt engineering for production",
                    "RAG systems — document loading, chunking, vector stores, retrieval",
                    "LangChain — chains, agents, tools, building AI applications",
                ],
            },
            {
                month: 6,
                title: "Deployment, Capstone & Career",
                hours: "24 hrs",
                topics: "Streamlit, FastAPI, Hugging Face Spaces, cloud basics, MLOps introduction, capstone project, portfolio build, interview preparation",
                detail: [
                    "Streamlit — interactive ML apps, user inputs, visualization, deployment",
                    "FastAPI — REST APIs for model serving, request handling, JSON responses",
                    "Hugging Face Spaces — model hosting, Gradio interfaces",
                    "Cloud basics — AWS/GCP essentials for ML deployment",
                    "MLOps introduction — experiment tracking, model versioning, CI/CD concepts",
                    "Capstone project — end-to-end from data to deployed application",
                ],
            },
        ],
        weeks: [
            {
                week: 1,
                title: "Month 1 — Python Deep-Dive",
                topics: [
                    "Variables, data types, control flow, functions, OOP, error handling",
                ],
            },
            {
                week: 2,
                title: "Month 1 — Git, Jupyter & Pandas",
                topics: [
                    "Git/GitHub workflow, Jupyter Notebooks, Pandas DataFrames, indexing, filtering",
                ],
            },
            {
                week: 3,
                title: "Month 1 — Pandas Advanced & NumPy",
                topics: [
                    "Groupby, merge, pivot, apply — NumPy arrays, broadcasting, vectorized ops",
                ],
            },
            {
                week: 4,
                title: "Month 1 — SQL & Foundations Wrap",
                topics: [
                    "SELECT, JOINs, subqueries, window functions, CTEs — Month 1 project",
                ],
            },
            {
                week: 5,
                title: "Month 2 — Descriptive Statistics",
                topics: [
                    "Central tendency, dispersion, distributions, visual summaries",
                ],
            },
            {
                week: 6,
                title: "Month 2 — Inferential Statistics",
                topics: [
                    "Sampling, confidence intervals, p-values, t-tests, chi-square",
                ],
            },
            {
                week: 7,
                title: "Month 2 — EDA & Visualization",
                topics: [
                    "Matplotlib, Seaborn, univariate/bivariate analysis, correlation",
                ],
            },
            {
                week: 8,
                title: "Month 2 — Power BI & Statistics Wrap",
                topics: ["Power BI dashboards, DAX basics, Month 2 project"],
            },
            {
                week: 9,
                title: "Month 3 — Regression Models",
                topics: [
                    "Linear regression, logistic regression, evaluation metrics",
                ],
            },
            {
                week: 10,
                title: "Month 3 — Trees & Ensembles",
                topics: [
                    "Decision trees, random forest, XGBoost, gradient boosting",
                ],
            },
            {
                week: 11,
                title: "Month 3 — Model Evaluation & Tuning",
                topics: [
                    "Grid search, cross-validation, learning curves, metrics deep-dive",
                ],
            },
            {
                week: 12,
                title: "Month 3 — Clustering & Feature Engineering",
                topics: [
                    "K-Means, PCA, encoding, scaling, feature selection — Month 3 project",
                ],
            },
            {
                week: 13,
                title: "Month 4 — Neural Network Foundations",
                topics: [
                    "Perceptrons, activation functions, backpropagation, TensorFlow/Keras intro",
                ],
            },
            {
                week: 14,
                title: "Month 4 — CNNs for Computer Vision",
                topics: [
                    "Convolution, pooling, VGG, ResNet, image classification",
                ],
            },
            {
                week: 15,
                title: "Month 4 — RNNs & Sequence Models",
                topics: [
                    "RNNs, LSTMs, time series forecasting, text classification",
                ],
            },
            {
                week: 16,
                title: "Month 4 — Transfer Learning & DL Wrap",
                topics: [
                    "Pre-trained models, fine-tuning, data augmentation — Month 4 project",
                ],
            },
            {
                week: 17,
                title: "Month 5 — Text Processing & Embeddings",
                topics: [
                    "Tokenization, TF-IDF, Word2Vec, sentence transformers",
                ],
            },
            {
                week: 18,
                title: "Month 5 — Transformers & LLM APIs",
                topics: [
                    "Attention mechanism, BERT, GPT, OpenAI/Anthropic API integration",
                ],
            },
            {
                week: 19,
                title: "Month 5 — RAG Systems",
                topics: [
                    "Document loading, chunking, vector stores, retrieval-augmented generation",
                ],
            },
            {
                week: 20,
                title: "Month 5 — LangChain & AI Agents",
                topics: [
                    "Chains, agents, tools, building AI applications — Month 5 project",
                ],
            },
            {
                week: 21,
                title: "Month 6 — Streamlit & FastAPI",
                topics: ["Interactive ML apps, REST APIs for model serving"],
            },
            {
                week: 22,
                title: "Month 6 — Hugging Face & Cloud",
                topics: ["Model hosting, Gradio, AWS/GCP basics, MLOps intro"],
            },
            {
                week: 23,
                title: "Month 6 — Capstone Sprint",
                topics: ["End-to-end capstone — data to deployed application"],
            },
            {
                week: 24,
                title: "Month 6 — Portfolio & Career",
                topics: [
                    "GitHub portfolio, resume building, LinkedIn, mock interviews, placement prep",
                ],
            },
        ],
        finalProject: {
            intro: "A deployed, end-to-end AI/ML application — from raw data through model training to a live web interface — hosted on your GitHub and ready for interviews.",
            tracks: [
                {
                    title: "Computer Vision",
                    desc: "Image classification or object detection with a deployed Streamlit app",
                },
                {
                    title: "NLP",
                    desc: "Text classification, sentiment analysis, or chatbot with a FastAPI backend",
                },
                {
                    title: "Predictive Analytics",
                    desc: "Customer churn, demand forecasting, or fraud detection with a deployed interface",
                },
                {
                    title: "Generative AI",
                    desc: "RAG application or AI agent with document understanding and LLM integration",
                },
                {
                    title: "Recommendation System",
                    desc: "Product or content recommendation engine with a working web interface",
                },
            ],
            grading:
                "Graded on code quality, model performance, deployment functionality, documentation, and presentation.",
            leave: "6 graded projects + 1 capstone, all deployed and live on your GitHub.",
            cta: "Apply Now",
        },
        toolsNote:
            "24 industry-leading tools — available on free or freemium tiers. Cloud platforms offer free tiers sufficient for the course projects.",
        instructor: {
            name: "Your Lead Instructor",
            tagline:
                "AI/ML Engineer & Trainer · 6+ Years Building Production Systems",
            bio: "Live, in-person, taught by practitioners who build and deploy AI systems — not by someone who only teaches from textbooks.",
            points: [
                "6+ years building machine learning and AI systems in industry",
                "Experience across computer vision, NLP, and generative AI applications",
                "Trained 60+ professionals and students in AI/ML at the academy",
                "Every technique is tested on real projects before it reaches the classroom",
            ],
        },
        pricingIncludes: [
            "All 120 live, instructor-led sessions over 6 months",
            "Lifetime access to all session recordings",
            "The complete curriculum workbook (PDF)",
            "Real-world datasets for every project",
            "6 graded projects + 1 capstone with deployment",
            "Certificate of completion",
            "Full career services package — resume building, LinkedIn and GitHub optimization, 5+ mock interviews, 20 hours of aptitude and communication training, priority job referrals",
            "Lifetime batch re-attendance",
            "Daily doubt-clearing lab access, 10 AM – 7 PM",
        ],
        teamPricing: "Teams of 2+ get 10% off · Teams of 5+ get 15% off",
        guarantee:
            "If you attend every session, complete all 7 projects, and you don't feel ready for an AI/ML role, we'll make it right.",
        faqs: [
            {
                question: "What are the prerequisites?",
                answer: "Basic Python knowledge — variables, loops, functions. We review the essentials in Month 1, but you should be comfortable writing simple Python programs.",
            },
            {
                question:
                    "Is this the same as the Applied Machine Learning course?",
                answer: "No. The Applied ML course is 4 months and covers classical ML and deployment. This is a 6-month Career program that adds deep learning, NLP, generative AI, LangChain, and full career services.",
            },
            {
                question: "Will I really build 7 deployed projects?",
                answer: "Yes. Every month includes a graded project, and the final month includes a capstone. All 7 are deployed and live on your GitHub by the time you graduate.",
            },
            {
                question: "What career services are included?",
                answer: "1-on-1 resume building, LinkedIn and GitHub optimization, 5+ mock interviews, 20 hours of aptitude and communication training, and priority job referrals to hiring partners.",
            },
            {
                question: "Can I attend if I miss sessions?",
                answer: "Every session is recorded, and you get lifetime batch re-attendance. However, this course demands daily consistency — missing regularly will make it harder to keep up.",
            },
            {
                question: "What jobs can I target after this course?",
                answer: "AI/ML Engineer, Data Scientist, ML Developer, AI Developer, Junior NLP Engineer — roles that require hands-on ML, deep learning, and deployment skills.",
            },
            {
                question: "Is the daily doubt-clearing lab in-person?",
                answer: "Yes. The lab runs 10 AM – 7 PM daily at our Lucknow academy — walk in anytime for instant help from instructors and peers.",
            },
            {
                question: "Do I need a powerful laptop?",
                answer: "A mid-range laptop (8GB RAM, dual-core processor) is sufficient for most of the course. For deep learning training, we use cloud platforms with free GPU tiers.",
            },
            {
                question: "What is lifetime batch re-attendance?",
                answer: "After completing the course, you can re-attend any future batch of the same course — for free, forever. Great for revision or catching topics you missed.",
            },
            {
                question:
                    "How is this different from online Udemy/Coursera courses?",
                answer: "Live instruction, daily doubt-clearing, graded projects, deployment practice, career services, and job referrals. A recorded course can't correct your code, review your project, or prepare you for interviews.",
            },
        ],
        heroCta: "Apply Now",
        heroCtaSecondary: "Download Syllabus",
    },
    "ai-digital-marketing-specialist": {
        heroImage: "/assets/images/ai-hero-robot.png",
        eyebrow:
            "6-Month Career Program · Live · Multi-Campaign Portfolio · Placement Support",
        trustLine:
            "5 days a week · Multiple live campaigns · Full career services package",
        whoItsForHeadline: "Become the marketer agencies are competing to hire",
        whoItsForBullets: [
            "Graduates and professionals who want a complete, career-grade marketing education",
            "Marketers who want AI-driven content systems, automation, and performance analytics",
            "Freelancers building an agency-level portfolio with multi-campaign case studies",
            "Career switchers targeting senior marketing, growth, or performance roles",
        ],
        audience: [
            {
                label: "Graduates & Professionals",
                desc: "Graduates and professionals who want a complete, career-grade marketing education",
                img: "/assets/images/students.png",
                tone: "gold",
            },
            {
                label: "AI-Powered Marketers",
                desc: "Marketers who want AI-driven content systems, automation, and performance analytics",
                img: "/assets/images/teacher.png",
                tone: "gold",
            },
            {
                label: "Freelancers & Agency Builders",
                desc: "Freelancers building an agency-level portfolio with multi-campaign case studies",
                img: "/assets/images/job-seekers.png",
                tone: "white",
            },
            {
                label: "Career Switchers",
                desc: "Career switchers targeting senior marketing, growth, or performance roles",
                img: "/assets/images/shop-owners.png",
                tone: "white",
            },
        ],
        readinessNote:
            "No prior marketing experience required. This course covers everything from the foundations to advanced campaign management — with AI at its core.",
        problemTitle:
            "Marketing talent is everywhere. Marketing skill is rare.",
        problemBody: [
            "Every graduate knows how to post on Instagram. Very few know how to build a full-funnel campaign, manage a ₹1L+ ad budget, set up marketing automation, analyze attribution across channels, and present results that drive business decisions. That gap is where the careers and the money are. This course closes it.",
        ],
        outcomes: [
            {
                title: "Full-Stack Marketing",
                desc: "SEO, paid ads (Meta + Google), content, email, WhatsApp, social media — the complete digital marketing stack",
            },
            {
                title: "Advanced Paid Media",
                desc: "Multi-platform ad management, budget optimization, A/B testing at scale, and attribution modeling",
            },
            {
                title: "Marketing Automation",
                desc: "Email sequences, lead scoring, CRM integration, chatbots, and automated campaign workflows",
            },
            {
                title: "AI Content Systems",
                desc: "AI-driven content production pipelines, brand voice consistency, and scalable content strategies",
            },
            {
                title: "Performance Analytics",
                desc: "GA4, multi-touch attribution, Looker Studio dashboards, and AI-assisted performance reporting",
            },
            {
                title: "Multi-Campaign Portfolio",
                desc: "Multiple live campaigns across platforms with real results — a portfolio that demonstrates real skill",
            },
            {
                title: "Client & Campaign Management",
                desc: "Brief writing, client communication, reporting cadences, and agency workflow management",
            },
        ],
        howItWorks: [
            { label: "Duration", value: "6 months" },
            { label: "Total hours", value: "200 hours" },
            { label: "Schedule", value: "5 classes a week" },
            {
                label: "Session format",
                value: "Live, instructor-led, hands-on — real campaigns, real budgets, real results",
            },
            {
                label: "Live campaigns",
                value: "Multiple live ad campaigns with real budgets across Meta, Google, and other platforms",
            },
            { label: "Class size", value: "Small, limited-seat cohorts" },
            { label: "Recordings", value: "Sessions recorded for revision" },
            {
                label: "Support",
                value: "Personal doubt-clearing, campaign review, and career guidance during the course",
            },
        ],
        weeks: [
            {
                week: 1,
                title: "Digital Marketing Foundations & Ecosystem",
                topics: [
                    "Digital landscape, funnels, buyer psychology, KPIs",
                    "AI in marketing — tools, workflows, and the 2026 landscape",
                ],
            },
            {
                week: 2,
                title: "Websites, Landing Pages & CRO",
                topics: [
                    "WordPress and AI site builders",
                    "Landing page design, conversion rate optimization, A/B testing basics",
                ],
            },
            {
                week: 3,
                title: "SEO Foundations with AI",
                topics: [
                    "Keyword research, on-page SEO, content optimization",
                    "AI content briefs, search intent mapping",
                ],
            },
            {
                week: 4,
                title: "Advanced SEO & Technical",
                topics: [
                    "Technical SEO — site speed, schema, crawlability",
                    "GEO/AEO for AI search, competitive analysis",
                ],
            },
            {
                week: 5,
                title: "Content & Creative with AI",
                topics: [
                    "AI copywriting for ads, emails, social",
                    "Image generation, video creation, Canva AI workflows",
                ],
            },
            {
                week: 6,
                title: "Social Media Strategy & Management",
                topics: [
                    "Platform-specific content strategy, calendars",
                    "Community management, AI scheduling tools",
                ],
            },
            {
                week: 7,
                title: "Meta Ads Foundations",
                topics: [
                    "Campaign structure, objectives, audiences, budgets",
                    "Ad creative testing, pixel setup, conversion events",
                ],
            },
            {
                week: 8,
                title: "Meta Ads Advanced",
                topics: [
                    "Advantage+, retargeting, lookalike audiences",
                    "Campaign optimization, scaling, attribution",
                ],
            },
            {
                week: 9,
                title: "Google Ads — Search & Shopping",
                topics: [
                    "Keyword match types, ad copy, Quality Score",
                    "Shopping campaigns, product feed optimization",
                ],
            },
            {
                week: 10,
                title: "Google Ads — PMax & Display",
                topics: [
                    "Performance Max campaigns, audience signals",
                    "Display and YouTube ads, cross-campaign strategy",
                ],
            },
            {
                week: 11,
                title: "Email Marketing Automation",
                topics: [
                    "Sequences, segmentation, A/B testing, deliverability",
                    "CRM integration, lead scoring, welcome flows",
                ],
            },
            {
                week: 12,
                title: "WhatsApp & Conversational Marketing",
                topics: [
                    "WhatsApp broadcast, chatbot setup, AI personalization",
                    "Conversational funnels, lead qualification bots",
                ],
            },
            {
                week: 13,
                title: "Marketing Automation Workflows",
                topics: [
                    "Multi-channel automation — email + WhatsApp + ads",
                    "Lead nurture sequences, retargeting automation",
                ],
            },
            {
                week: 14,
                title: "AI Content Production Systems",
                topics: [
                    "Building scalable content pipelines with AI",
                    "Brand voice systems, content calendars, repurposing",
                ],
            },
            {
                week: 15,
                title: "Analytics — GA4 & Search Console",
                topics: [
                    "GA4 events, conversions, user journeys",
                    "Search Console, organic performance tracking",
                ],
            },
            {
                week: 16,
                title: "Analytics — Looker Studio & Attribution",
                topics: [
                    "Looker Studio dashboards, cross-channel reporting",
                    "Multi-touch attribution, AI-assisted analysis",
                ],
            },
            {
                week: 17,
                title: "Live Campaign 1 — Meta",
                topics: [
                    "Launch and manage a live Meta ad campaign",
                    "Optimize — creative rotation, bid strategy, audience refinement",
                ],
            },
            {
                week: 18,
                title: "Live Campaign 1 — Results & Analysis",
                topics: [
                    "Analyze campaign performance, extract insights",
                    "Build campaign case study with full-funnel metrics",
                ],
            },
            {
                week: 19,
                title: "Live Campaign 2 — Google",
                topics: [
                    "Launch and manage a live Google Ads campaign",
                    "Optimize — keyword management, bid adjustments, Quality Score",
                ],
            },
            {
                week: 20,
                title: "Live Campaign 2 — Results & Analysis",
                topics: [
                    "Cross-campaign comparison, attribution analysis",
                    "Present findings with data-driven recommendations",
                ],
            },
            {
                week: 21,
                title: "Live Campaign 3 — Multi-Channel",
                topics: [
                    "Orchestrate a multi-channel campaign across Meta + Google + email",
                    "Budget allocation, channel-specific creative, unified tracking",
                ],
            },
            {
                week: 22,
                title: "Client Management & Reporting",
                topics: [
                    "Brief writing, client communication, reporting cadences",
                    "Agency workflow, project management, stakeholder presentations",
                ],
            },
            {
                week: 23,
                title: "Portfolio Compilation & Case Studies",
                topics: [
                    "Compile all campaign results into a professional portfolio",
                    "Case study writing — problem, strategy, execution, results",
                ],
            },
            {
                week: 24,
                title: "Career Services & Interview Prep",
                topics: [
                    "Resume building, LinkedIn optimization, GitHub portfolio",
                    "Mock interviews, job referrals, placement preparation",
                ],
            },
        ],
        finalProject: {
            intro: "A multi-campaign portfolio demonstrating end-to-end digital marketing skill — from strategy through execution to measurable results — with professional case studies.",
            tracks: [
                {
                    title: "Agency Track",
                    desc: "Full-funnel multi-platform campaigns for a simulated brand — strategy, execution, analytics, reporting",
                },
                {
                    title: "Growth Track",
                    desc: "Growth marketing experiments — A/B tests, conversion optimization, retention campaigns with real metrics",
                },
                {
                    title: "Freelancer Track",
                    desc: "Client-ready campaign portfolio — proposals, execution, results, and testimonials",
                },
            ],
            grading:
                "Graded on campaign performance, portfolio completeness, case study quality, and presentation.",
            leave: "A multi-campaign portfolio with real results, plus the full Career-tier services package including 5+ mock interviews, aptitude and communication training, and priority placement referrals.",
            cta: "Apply Now",
        },
        toolsNote:
            "24 industry-leading tools — available on free or freemium tiers. Ad budgets for live campaigns are funded by the academy.",
        instructor: {
            name: "Your Lead Instructor",
            tagline:
                "Senior Marketing Strategist · 8+ Years Agency & Brand Experience",
            bio: "Live, in-person, taught by practitioners who have managed multi-crore marketing budgets — not by someone who just teaches theory.",
            points: [
                "8+ years in digital marketing — agency, brand, and freelance experience",
                "Managed ad budgets of ₹1Cr+ across Meta, Google, and programmatic platforms",
                "Specialist in AI-powered marketing systems and automation",
                "Trained 80+ marketing professionals and students at the academy",
            ],
        },
        pricingIncludes: [
            "All 120 live, instructor-led sessions over 6 months",
            "Lifetime access to all session recordings",
            "The complete curriculum workbook (PDF)",
            "Real ad budget for multiple live campaigns",
            "Multi-campaign portfolio review and case study feedback",
            "Certificate of completion",
            "Full Career services package — 5+ mock interviews, aptitude and communication training, priority placement referrals",
            "Lifetime batch re-attendance",
        ],
        teamPricing: "Teams of 2+ get 10% off · Teams of 5+ get 15% off",
        guarantee:
            "If you attend every session, complete all live campaigns, and you don't feel ready for a career in digital marketing, we'll make it right.",
        faqs: [
            {
                question:
                    "How is this different from the 3-month Digital Marketing course?",
                answer: "The 3-month course covers the full stack in a focused format. This 6-month Career program extends it with advanced paid media, marketing automation, AI content systems, multiple live campaigns, client management training, and the full Career-tier services package.",
            },
            {
                question: "Will I run multiple live campaigns?",
                answer: "Yes. You run at least 3 live campaigns across Meta and Google with real ad budgets. Each campaign is analyzed, optimized, and presented as a case study in your portfolio.",
            },
            {
                question: "What career services are included?",
                answer: "Resume building, LinkedIn optimization, GitHub portfolio setup, 5+ mock interviews, 20 hours of aptitude and communication training, and priority job referrals to hiring partners.",
            },
            {
                question: "Will I learn marketing automation?",
                answer: "Yes. The course covers email automation, WhatsApp chatbots, CRM integration, lead scoring, and multi-channel automation workflows — skills that separate junior from mid-level marketers.",
            },
            {
                question: "What jobs can I target after this course?",
                answer: "Digital Marketing Specialist, Performance Marketing Executive, Growth Marketing Manager, Marketing Automation Specialist, Agency Account Manager — roles that require multi-channel expertise and campaign management skills.",
            },
            {
                question: "Do I need prior marketing experience?",
                answer: "No. The course starts from foundations and builds progressively. Whether you're a fresh graduate or a professional switching careers, the curriculum is designed to take you from zero to career-ready.",
            },
            {
                question: "Is the daily schedule manageable?",
                answer: "5 days a week, 2 hours a day — it's structured like a job. This is a Career program, so the commitment mirrors a full-time role. The investment pays off in placement readiness.",
            },
            {
                question: "What is lifetime batch re-attendance?",
                answer: "After completing the course, you can re-attend any future batch of the same course — for free, forever. Great for revision, catching new tools, or reinforcing skills.",
            },
        ],
        heroCta: "Apply Now",
        heroCtaSecondary: "Download Syllabus",
    },
    "data-science-ai-career-track": {
        heroImage: "/assets/images/ai-hero-robot.png",
        eyebrow:
            "9-Month Career Track · Internship Included · Flagship Program · Placement Support",
        trustLine:
            "Complete AI/ML curriculum + 3-month internship · Certificate + experience letter",
        whoItsForHeadline:
            "Graduate with a portfolio, an internship certificate and an experience letter",
        whoItsForBullets: [
            "Students who want the strongest possible start — real work experience on their CV before their first job application",
            "Freshers who know they need internships but can't find one on their own",
            "Career changers who want both deep technical skills and professional experience",
            "Graduates competing with NCR candidates who already have internships on their resumes",
        ],
        audience: [
            {
                label: "Students & Freshers",
                desc: "Students who want the strongest possible start — real work experience on their CV before their first job application",
                img: "/assets/images/students.png",
                tone: "gold",
            },
            {
                label: "Internship Seekers",
                desc: "Freshers who know they need internships but can't find one on their own",
                img: "/assets/images/exam-aspirants.png",
                tone: "gold",
            },
            {
                label: "Career Changers",
                desc: "Career changers who want both deep technical skills and professional experience",
                img: "/assets/images/job-seekers.png",
                tone: "white",
            },
            {
                label: "Regional Competitors",
                desc: "Graduates competing with NCR candidates who already have internships on their resumes",
                img: "/assets/images/teacher.png",
                tone: "white",
            },
        ],
        readinessNote:
            "Basic Python knowledge recommended. This is a 9-month commitment — 6 months of intensive learning followed by 3 months of supervised internship work.",
        problemTitle:
            "Lucknow freshers compete with NCR candidates who often already have internships.",
        problemBody: [
            "When a recruiter sees two resumes — one from Delhi with a 3-month internship at a startup, and one from Lucknow with only coursework — they pick Delhi every time. This track closes that gap. You complete the full Advanced Diploma curriculum, then spend 3 months working on live projects under supervision, and graduate with an experience letter, not just a certificate.",
        ],
        outcomes: [
            {
                title: "Full AI/ML Stack",
                desc: "The complete Advanced Diploma curriculum — Python, data analysis, ML, deep learning, NLP, generative AI, deployment",
            },
            {
                title: "Real Work Experience",
                desc: "3 months working on live client or academy projects under supervision — with an experience letter to prove it",
            },
            {
                title: "Advanced MLOps",
                desc: "Docker, cloud deployment (AWS/GCP basics), experiment tracking, and production ML workflows",
            },
            {
                title: "Professional Skills",
                desc: "Business communication, client-handling, presentation skills, and stakeholder management",
            },
            {
                title: "Portfolio & Internship Certificate",
                desc: "7+ deployed projects, an internship completion certificate, and an experience letter",
            },
            {
                title: "Priority Placement Queue",
                desc: "Priority access to job referrals and placement support — ahead of standard batch candidates",
            },
        ],
        howItWorks: [
            {
                label: "Duration",
                value: "9 months (6 months curriculum + 3 months internship)",
            },
            { label: "Total hours", value: "320 hours" },
            { label: "Schedule", value: "5 days a week" },
            {
                label: "Months 1–6",
                value: "Complete Advanced Diploma in AI & ML curriculum",
            },
            {
                label: "Months 7–9",
                value: "Live internship — client projects, MLOps, professional skills",
            },
            {
                label: "Deliverables",
                value: "Portfolio + internship certificate + experience letter",
            },
            { label: "Class size", value: "Small, limited-seat cohorts" },
            { label: "Recordings", value: "Sessions recorded for revision" },
        ],
        monthlyJourney: [
            {
                month: 1,
                title: "Programming & Data Foundations",
                hours: "40 hrs",
                topics: "Python deep-dive, Git and GitHub, Jupyter, Pandas, NumPy, SQL",
                detail: "Same as Advanced Diploma Month 1 — the complete foundation for everything that follows.",
            },
            {
                month: 2,
                title: "Statistics & Data Analysis",
                hours: "36 hrs",
                topics: "Descriptive and inferential statistics, hypothesis testing, EDA, visualization, Power BI",
                detail: "Same as Advanced Diploma Month 2 — the analytical backbone of your skill set.",
            },
            {
                month: 3,
                title: "Core Machine Learning",
                hours: "40 hrs",
                topics: "Regression, classification, decision trees, random forest, XGBoost, clustering, model evaluation, feature engineering",
                detail: "Same as Advanced Diploma Month 3 — classical ML algorithms and evaluation.",
            },
            {
                month: 4,
                title: "Deep Learning",
                hours: "40 hrs",
                topics: "Neural networks, TensorFlow/Keras, CNNs for computer vision, RNNs, transfer learning",
                detail: "Same as Advanced Diploma Month 4 — neural networks and computer vision.",
            },
            {
                month: 5,
                title: "NLP & Generative AI",
                hours: "40 hrs",
                topics: "Text processing, embeddings, transformers, LLM APIs, RAG systems, LangChain, building AI agents, fine-tuning basics",
                detail: "Same as Advanced Diploma Month 5 — NLP, LLMs, and generative AI.",
            },
            {
                month: 6,
                title: "Deployment & Capstone",
                hours: "24 hrs",
                topics: "Streamlit, FastAPI, Hugging Face Spaces, cloud basics, MLOps intro, capstone project",
                detail: "Same as Advanced Diploma Month 6 — deployment and your first capstone.",
            },
            {
                month: 7,
                title: "Internship — Live Projects",
                hours: "40 hrs",
                topics: "Working on live client or academy projects under mentor supervision",
                detail: [
                    "Assignment to a supervised project team — real client or academy data",
                    "Daily standups, sprint planning, and code reviews",
                    "Applying ML/AI skills to production-quality problems",
                    "Documentation and process discipline",
                ],
            },
            {
                month: 8,
                title: "Advanced MLOps & Cloud",
                hours: "40 hrs",
                topics: "Docker, AWS/GCP basics, experiment tracking, production ML workflows",
                detail: [
                    "Docker — containerizing ML applications, Dockerfiles, image management",
                    "Cloud basics — AWS Sagemaker or GCP Vertex AI introduction",
                    "Experiment tracking — MLflow, Weights & Biases basics",
                    "Production ML — monitoring, retraining, CI/CD for models",
                ],
            },
            {
                month: 9,
                title: "Professional Skills & Placement",
                hours: "20 hrs",
                topics: "Business communication, client handling, portfolio finalization, placement queue",
                detail: [
                    "Business communication — writing briefs, reports, and presenting findings",
                    "Client-handling skills — managing expectations, status updates, delivery",
                    "Portfolio finalization — GitHub cleanup, case study compilation",
                    "Experience letter, internship certificate, and priority placement queue",
                ],
            },
        ],
        weeks: [
            {
                week: 1,
                title: "Month 1 — Python Deep-Dive",
                topics: [
                    "Variables, data types, control flow, functions, OOP, error handling",
                ],
            },
            {
                week: 2,
                title: "Month 1 — Git, Jupyter & Pandas",
                topics: [
                    "Git/GitHub workflow, Jupyter Notebooks, Pandas DataFrames",
                ],
            },
            {
                week: 3,
                title: "Month 1 — Pandas Advanced & NumPy",
                topics: ["Groupby, merge, pivot — NumPy arrays, broadcasting"],
            },
            {
                week: 4,
                title: "Month 1 — SQL & Foundations Wrap",
                topics: ["SELECT, JOINs, window functions — Month 1 project"],
            },
            {
                week: 5,
                title: "Month 2 — Statistics Foundations",
                topics: ["Central tendency, dispersion, distributions"],
            },
            {
                week: 6,
                title: "Month 2 — Inferential Statistics",
                topics: ["Sampling, confidence intervals, hypothesis testing"],
            },
            {
                week: 7,
                title: "Month 2 — EDA & Visualization",
                topics: ["Matplotlib, Seaborn, correlation analysis"],
            },
            {
                week: 8,
                title: "Month 2 — Power BI & Statistics Wrap",
                topics: ["Dashboards, DAX — Month 2 project"],
            },
            {
                week: 9,
                title: "Month 3 — Regression Models",
                topics: ["Linear and logistic regression, evaluation metrics"],
            },
            {
                week: 10,
                title: "Month 3 — Trees & Ensembles",
                topics: ["Decision trees, random forest, XGBoost"],
            },
            {
                week: 11,
                title: "Month 3 — Model Evaluation & Tuning",
                topics: ["Grid search, cross-validation, learning curves"],
            },
            {
                week: 12,
                title: "Month 3 — Clustering & Feature Eng",
                topics: ["K-Means, PCA, encoding, scaling — Month 3 project"],
            },
            {
                week: 13,
                title: "Month 4 — Neural Networks",
                topics: ["Perceptrons, backpropagation, TensorFlow/Keras"],
            },
            {
                week: 14,
                title: "Month 4 — CNNs",
                topics: ["Convolution, pooling, image classification"],
            },
            {
                week: 15,
                title: "Month 4 — RNNs & Sequences",
                topics: ["LSTMs, time series, text classification"],
            },
            {
                week: 16,
                title: "Month 4 — Transfer Learning",
                topics: ["Pre-trained models, fine-tuning — Month 4 project"],
            },
            {
                week: 17,
                title: "Month 5 — Text & Embeddings",
                topics: ["Tokenization, TF-IDF, Word2Vec, transformers"],
            },
            {
                week: 18,
                title: "Month 5 — LLMs & APIs",
                topics: ["GPT, BERT, OpenAI/Anthropic API integration"],
            },
            {
                week: 19,
                title: "Month 5 — RAG & LangChain",
                topics: ["Vector stores, retrieval, chains, agents"],
            },
            {
                week: 20,
                title: "Month 5 — AI Agents & GenAI Wrap",
                topics: ["Building AI applications — Month 5 project"],
            },
            {
                week: 21,
                title: "Month 6 — Streamlit & FastAPI",
                topics: ["ML apps, REST APIs, model serving"],
            },
            {
                week: 22,
                title: "Month 6 — Cloud & MLOps Intro",
                topics: ["Hugging Face Spaces, Docker intro, cloud basics"],
            },
            {
                week: 23,
                title: "Month 6 — Capstone Sprint",
                topics: ["End-to-end capstone project"],
            },
            {
                week: 24,
                title: "Month 6 — Portfolio & Review",
                topics: ["GitHub cleanup, portfolio presentation"],
            },
            {
                week: 25,
                title: "Month 7 — Internship Kickoff",
                topics: [
                    "Project assignment, team onboarding, sprint planning",
                ],
            },
            {
                week: 26,
                title: "Month 7 — Live Project Work",
                topics: ["Daily standups, feature development, code reviews"],
            },
            {
                week: 27,
                title: "Month 7 — Project Delivery",
                topics: ["Testing, documentation, client presentation prep"],
            },
            {
                week: 28,
                title: "Month 7 — Project Review",
                topics: ["Client feedback, iteration, retrospective"],
            },
            {
                week: 29,
                title: "Month 8 — Docker Deep-Dive",
                topics: [
                    "Containerizing ML apps, Docker Compose, image management",
                ],
            },
            {
                week: 30,
                title: "Month 8 — Cloud for ML",
                topics: ["AWS Sagemaker / GCP Vertex AI, cloud deployment"],
            },
            {
                week: 31,
                title: "Month 8 — MLOps Workflows",
                topics: ["MLflow, experiment tracking, model versioning"],
            },
            {
                week: 32,
                title: "Month 8 — Production ML",
                topics: [
                    "Monitoring, retraining, CI/CD for ML — Month 8 project",
                ],
            },
            {
                week: 33,
                title: "Month 9 — Business Communication",
                topics: [
                    "Writing briefs, reports, presenting findings to stakeholders",
                ],
            },
            {
                week: 34,
                title: "Month 9 — Client Handling",
                topics: [
                    "Managing expectations, status updates, delivery discipline",
                ],
            },
            {
                week: 35,
                title: "Month 9 — Portfolio Finalization",
                topics: [
                    "GitHub cleanup, case study compilation, resume update",
                ],
            },
            {
                week: 36,
                title: "Month 9 — Placement Prep",
                topics: [
                    "Experience letter, internship certificate, priority placement queue",
                ],
            },
        ],
        finalProject: {
            intro: "Multiple deployed projects across 6 months of learning, plus a supervised internship project delivered to a real client or the academy — with an experience letter to prove it.",
            tracks: [
                {
                    title: "AI/ML Engineer Track",
                    desc: "End-to-end ML pipeline — data to deployment — on a live project with production-quality code",
                },
                {
                    title: "Data Science Track",
                    desc: "Advanced analytics and modeling on a real dataset, with business recommendations and a deployed dashboard",
                },
                {
                    title: "GenAI Track",
                    desc: "RAG system or AI agent built and deployed for a real use case, with LLM integration and evaluation",
                },
            ],
            grading:
                "Graded on technical quality, deployment functionality, project impact, professional conduct during internship, and final presentation.",
            leave: "A portfolio of 7+ deployed projects, an internship completion certificate, an experience letter, and the full Career-tier services package with priority placement.",
            cta: "Apply Now",
        },
        toolsNote:
            "24 industry-leading tools — available on free or freemium tiers. Cloud platforms offer free tiers for internship and capstone projects.",
        instructor: {
            name: "Your Lead Instructor",
            tagline:
                "Senior AI/ML Engineer & Trainer · 7+ Years Industry Experience",
            bio: "Live, in-person, taught by practitioners who build production AI systems and manage real projects — not by someone who only teaches from slides.",
            points: [
                "7+ years building ML and AI systems across industry and consulting",
                "Experience managing projects and mentoring junior engineers",
                "Specialist in end-to-end ML pipelines, deployment, and MLOps",
                "Trained 100+ professionals and students in AI/ML at the academy",
            ],
        },
        pricingIncludes: [
            "All 180 live, instructor-led sessions over 9 months",
            "Lifetime access to all session recordings",
            "The complete Advanced Diploma curriculum workbook (PDF)",
            "Real-world datasets for every project",
            "7+ graded projects with deployment",
            "Supervised internship with live project work",
            "Internship completion certificate",
            "Experience letter",
            "Full Career services package — resume building, LinkedIn and GitHub optimization, 5+ mock interviews, 20 hours of aptitude and communication training, priority job referrals",
            "Lifetime batch re-attendance",
            "Daily doubt-clearing lab access, 10 AM – 7 PM",
        ],
        teamPricing: "Teams of 2+ get 10% off · Teams of 5+ get 15% off",
        guarantee:
            "If you complete the full 9 months — curriculum, internship, and all projects — and you don't feel ready for an AI/ML role, we'll make it right.",
        faqs: [
            {
                question: "How is this different from the Advanced Diploma?",
                answer: "The Advanced Diploma is 6 months of curriculum. This track includes all 6 months of curriculum PLUS 3 months of supervised internship, MLOps training, professional skills, and an experience letter.",
            },
            {
                question: "What does the internship involve?",
                answer: "Months 7–9 involve working on live client or academy projects under mentor supervision. You participate in daily standups, sprint planning, code reviews, and project delivery — just like at a real company.",
            },
            {
                question: "Will I get an experience letter?",
                answer: "Yes. You receive both an internship completion certificate and an experience letter after completing Months 7–9. These go on your resume and LinkedIn.",
            },
            {
                question: "Why is this better than finding my own internship?",
                answer: "Finding a quality ML internship on your own is extremely competitive, especially from Lucknow. This track guarantees you supervised, meaningful project work with a certificate and experience letter — no application stress.",
            },
            {
                question: "What is the priority placement queue?",
                answer: "Career Track graduates get priority access to job referrals and placement support — ahead of standard batch candidates. You're first in line when hiring partners have openings.",
            },
            {
                question: "Can I work while doing this course?",
                answer: "Months 1–6 are intensive (5 days/week, 2 hours/day). Months 7–9 are more flexible but still require daily engagement. Full-time commitment is strongly recommended.",
            },
            {
                question: "What jobs can I target after this track?",
                answer: "AI/ML Engineer, Data Scientist, ML Developer, AI Developer, NLP Engineer, MLOps Engineer — you have both the technical skills AND the professional experience that recruiters look for.",
            },
            {
                question: "Is the experience letter recognized by employers?",
                answer: "Yes. Our experience letters are on official academy letterhead and detail your role, projects, and duration. They are recognized by employers as valid professional experience.",
            },
            {
                question: "What is the total time commitment?",
                answer: "9 months — approximately 320 hours total. Months 1–6 are structured learning. Months 7–9 are internship work with some additional training sessions.",
            },
            {
                question: "Do I need a powerful laptop?",
                answer: "A mid-range laptop (8GB RAM) is sufficient for most of the course. For deep learning training and cloud deployment, we provide access to cloud platforms with free GPU tiers.",
            },
        ],
        heroCta: "Apply Now",
        heroCtaSecondary: "Download Syllabus",
    },
};

const SEO_META = {
    "python-programming-foundation": {
        title: "Python Programming Course – 6 Weeks Live",
        description:
            "Learn Python from zero in 6 weeks. Live classes, daily practice, real projects & certificate. No coding background needed. Batch starts [DATE].",
    },
    "generative-ai-prompt-engineering": {
        title: "Generative AI & Prompt Engineering Course",
        description:
            "Master ChatGPT, Claude & AI tools in 6 weeks. Hands-on labs, custom assistants, automation & capstone project. No coding required.",
    },
    "ai-for-business": {
        title: "AI for Business Owners – Weekend Program",
        description:
            "4-weekend AI program for business owners & professionals. Automate marketing, operations & customer replies. Sat–Sun only. [City] & online.",
    },
    "summer-winter-training": {
        title: "45-Day Summer/Winter Training (AKTU)",
        description:
            "AKTU-compliant 45-day industrial training for B.Tech/MCA/BCA. Certificate, live project, report & viva prep. Summer & winter batches.",
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

    const normalizedOutcomes = outcomes.map((o) =>
        typeof o === "string" ? { title: o, desc: null } : o,
    );

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
        outcomes: normalizedOutcomes,
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
        heroCtaSecondaryHref:
            override.heroCtaSecondaryHref ||
            `/assets/docx/${course.slug}-curriculum.pdf`,
        heroImage:
            override.heroImage ||
            course.image ||
            HERO_IMAGES[course.slug] ||
            "/assets/images/ai-hero-robot.png",
    };
}

const HERO_IMAGES = {
    "ai-tools-mastery": "/assets/images/ai-hero-robot.png",
    "python-programming-foundation": "/assets/images/python-course.png",
    "generative-ai-prompt-engineering":
        "/assets/images/generative-ai-prompt-engineering.png",
    "ai-for-business": "/assets/images/ai-hero-robot.png",
    "summer-winter-training":
        "/assets/images/summer-winter-training-course.png",
    "digital-marketing-with-ai": "/assets/images/ai-hero-robot.png",
    "python-for-data-analytics": "/assets/images/python-course.png",
    "applied-machine-learning": "/assets/images/ai-hero-robot.png",
    "advanced-diploma-ai-ml": "/assets/images/ai-hero-robot.png",
    "ai-digital-marketing-specialist": "/assets/images/ai-hero-robot.png",
    "data-science-ai-career-track": "/assets/images/ai-hero-robot.png",
};

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
    const seo = SEO_META[slug] || {};

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
            <Head title={seo.title}>{seo.description && <meta name="description" content={seo.description} />}</Head>
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
                                <h1 className="font-display text-[clamp(2.1rem,3.8vw,2.8rem)] font-bold tracking-[-0.035em] leading-[1.08]">
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
                                    {detail.heroCtaSecondaryHref.startsWith(
                                        "/assets/",
                                    ) ? (
                                        <a
                                            href={detail.heroCtaSecondaryHref}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-full bg-surface px-7 py-3.5 text-sm font-semibold text-white hover:bg-surface/80 hover:-translate-y-0.5 transition-all duration-300"
                                        >
                                            {detail.heroCtaSecondary}
                                        </a>
                                    ) : (
                                        <Link
                                            href={detail.heroCtaSecondaryHref}
                                            className="rounded-full bg-surface px-7 py-3.5 text-sm font-semibold text-white hover:bg-surface/80 hover:-translate-y-0.5 transition-all duration-300"
                                        >
                                            {detail.heroCtaSecondary}
                                        </Link>
                                    )}
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
                                src={detail.heroImage}
                                alt={course.title}
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
                                            <p className="font-display text-[16px] sm:text-[16px] font-medium leading-[1.45] text-white/95 max-w-[34ch]">
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
                                            <div className="w-[100px] h-[136px] sm:w-[105px] sm:h-[136px] shrink-0 rounded-[13px] overflow-hidden">
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
                                                    className={`text-[20px] font-bold leading-[1.1] ${i % 2 === 1 ? "text-black" : "text-[#765bc4]"}`}
                                                >
                                                    {outcome.title}
                                                </h3>
                                                {outcome.desc && (
                                                    <p className="mt-2 text-[14px] leading-[1.5] text-black/55">
                                                        {outcome.desc}
                                                    </p>
                                                )}
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

                <div className="relative overflow-hidden border-y border-black/[0.06] py-6 sm:py-6 group/marquee">
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
                                                        w-full h-full grayscale 
                                                        sm:w-20 sm:h-20
                                                        object-contain
                                                        opacity-70
                                                        group-hover/tool:opacity-100
                                                        transition-all
                                                        duration-300
                                                        group-hover/tool:scale-110 hover:grayscale-0
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
                                    src="/assets/images/instructor.jpeg"
                                    alt={detail.instructor.name}
                                    className="w-full h-[500px] aspect-[4/5] object-cover"
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
