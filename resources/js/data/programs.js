/* ── Course catalog data: categories, programs, bundles ── */

export const CATEGORIES = [
    {
        id: "short-term",
        anchor: "short-term",
        eyebrow: "SHORT_TERM_COURSES_",
        shortName: "Short-Term Courses",
        title: "Short-Term Courses — Start Fast",
        meta: [
            "4–6 weeks",
            "Beginner-friendly",
            "Fee fully adjustable if you upgrade within 60 days",
        ],
        accent: "lime",
    },
    {
        id: "certificates",
        anchor: "professional-certificates",
        eyebrow: "PROFESSIONAL_CERTIFICATES_",
        shortName: "Professional Certificates",
        title: "Professional Certificates — Build a Skill Employers Pay For",
        meta: ["3–4 months", "Portfolio + career services", "No-cost EMI"],
        accent: "violet",
    },
    {
        id: "career",
        anchor: "career-programs",
        eyebrow: "CAREER_PROGRAMS_",
        shortName: "Career Programs",
        title: "Career Programs — Our Flagship, Placement-Backed Tracks",
        meta: [
            "6–9 months",
            "Full career services",
            "Lifetime re-attendance",
            "No-cost EMI",
        ],
        accent: "success",
    },
];

export const PROGRAMS = [
    /* ═══════════════ SHORT-TERM COURSES ═══════════════ */
    {
        slug: "ai-tools-mastery",
        categoryId: "short-term",
        title: "AI Tools Mastery — Work Smarter with AI",
        tagline:
            "Use AI confidently in your work, studies and business — no coding required.",
        flagship: false,
        facts: [
            { label: "Duration", value: "4 weeks" },
            { label: "Total hours", value: "32 hours" },
            { label: "Schedule", value: "3 classes a week" },
            { label: "Fee", value: "Contact us for pricing" },
        ],
        audience:
            "Students, teachers, shop owners, job-seekers, homemakers and government exam aspirants. If you have used WhatsApp, you can do this course.",
        learn: [
            "How AI really works — what large language models can and cannot do",
            "ChatGPT, Claude and Gemini — hands-on comparison and when to use which",
            "Writing with AI — emails, applications, reports, social media posts, translation",
            "AI for images, video and presentations — Canva AI, image generators, slide decks",
            "AI for study and exams — notes, summaries, mock questions, doubt solving",
            "AI for small business — invoices, catalogues, WhatsApp marketing, customer replies",
            "Staying safe — spotting hallucinations and verifying AI output",
        ],
        outcome:
            "Your own Personal AI Toolkit document and three real tasks from your own work or study, completed with AI.",
        upgradeBenefit:
            "Your full course fee is adjusted against any Professional or Career program if you enrol within 60 days.",
        batchNote: "New batch starts every month",
        ctas: [{ label: "Enrol Now", href: "/contact" }],
    },
    {
        slug: "python-programming-foundation",
        categoryId: "short-term",
        title: "Python Programming Foundation",
        tagline: "The one skill every AI and data career starts with.",
        flagship: false,
        facts: [
            { label: "Duration", value: "6 weeks" },
            { label: "Total hours", value: "48 hours" },
            { label: "Schedule", value: "4 classes a week" },
            { label: "Fee", value: "Contact us for pricing" },
        ],
        audience:
            "Freshers, BCA/B.Tech/BSc students, and anyone planning to move into AI, data analytics or machine learning.",
        learn: [
            "Setup, IDE, variables, data types and operators",
            "Control flow, loops and functions",
            "Data structures — lists, dictionaries, sets, tuples",
            "File handling, exceptions and modules",
            "Object-oriented programming — classes, objects, inheritance",
            "Introduction to NumPy and Pandas",
            "Mini project and debugging practice",
        ],
        outcome:
            "Two mini projects on your own GitHub profile — for example, an expense tracker and a data-cleaning tool.",
        upgradeBenefit:
            "This course is the recommended prerequisite for our Advanced Diploma and Career Track. Enrol in either within 60 days and your full course fee is adjusted against the fee.",
        ctas: [{ label: "Enrol Now", href: "/contact" }],
    },
    {
        slug: "generative-ai-prompt-engineering",
        categoryId: "short-term",
        title: "Generative AI & Prompt Engineering",
        tagline:
            "The most in-demand AI skill of 2026 — taught properly, in person, in Lucknow.",
        flagship: false,
        facts: [
            { label: "Duration", value: "6 weeks" },
            { label: "Total hours", value: "48 hours" },
            { label: "Fee", value: "Contact us for pricing" },
        ],
        audience:
            "Working professionals, marketers, content creators, freelancers and anyone who wants to build and sell AI-powered workflows.",
        learn: [
            "LLM foundations — tokens, context windows, temperature, why models hallucinate",
            "Prompt engineering — zero-shot, few-shot, chain-of-thought, role prompting, output control",
            "Building custom GPTs and Claude Projects for specific workflows",
            "RAG concepts — document Q&A and company knowledge bases",
            "AI automation — Zapier, Make.com, n8n and no-code agent workflows",
            "Monetisation — freelancing on Upwork and Fiverr, pricing AI services, winning clients",
        ],
        outcome:
            "One deployed custom AI assistant and a freelance portfolio page ready to share with clients.",
        seatsNote: "Limited to 25 seats per batch",
        ctas: [{ label: "Enrol Now", href: "/contact" }],
    },
    {
        slug: "ai-business-owners-weekend",
        categoryId: "short-term",
        title: "AI for Business Owners & Professionals (Weekend)",
        tagline: "Run your business smarter in four weekends.",
        flagship: false,
        facts: [
            { label: "Duration", value: "4 weeks" },
            { label: "Total hours", value: "24 hours" },
            { label: "Schedule", value: "Weekend batches" },
            { label: "Fee", value: "Contact us for pricing" },
        ],
        audience:
            "Shop owners, clinic and institute owners, agency founders, consultants, managers and senior professionals who want practical AI results without taking time off during the week.",
        learnProse:
            "Hands-on use of AI for customer communication, marketing content, WhatsApp and email campaigns, documents and reports, data summaries, and day-to-day decision support — built around your own business.",
        outcome:
            "A working AI system for at least three recurring tasks in your business.",
        ctas: [{ label: "Reserve a Weekend Seat", href: "/contact" }],
    },
    {
        slug: "summer-winter-training-aktu",
        categoryId: "short-term",
        title: "Summer / Winter Training — AKTU-Compliant",
        tagline:
            "Industrial training that satisfies your college and actually teaches you something.",
        flagship: false,
        facts: [
            { label: "Duration", value: "45 days" },
            { label: "Total hours", value: "60 hours" },
            { label: "Cycles", value: "June–July and December–January" },
            { label: "Fee", value: "Contact us for pricing" },
        ],
        audience:
            "Engineering and degree students from AKTU-affiliated colleges who need a 4–6 week industrial training certificate.",
        tracks: ["AI/ML", "Python", "Data Science", "Digital Marketing with AI"],
        collegeIncludes: [
            "Official training letter on enrolment",
            "Project report in the prescribed format",
            "Viva preparation and support",
            "Stamped completion certificate",
        ],
        collegePartnersNote:
            "For colleges and T&P cells: we partner directly with training and placement departments for on-campus or in-house batches. See our College Partnerships page.",
        ctas: [{ label: "Register for the Next Cycle", href: "/contact" }],
    },

    /* ═══════════════ PROFESSIONAL CERTIFICATES ═══════════════ */
    {
        slug: "digital-marketing-with-ai-professional",
        categoryId: "certificates",
        title: "Digital Marketing with AI — Professional",
        tagline:
            "Learn marketing the way agencies practise it in 2026 — and run a live campaign with a real budget.",
        flagship: false,
        facts: [
            { label: "Duration", value: "3 months" },
            { label: "Total hours", value: "100 hours" },
            { label: "Schedule", value: "5 classes a week" },
            { label: "Fee", value: "Contact us for pricing" },
        ],
        emiNote: "No-cost EMI available — contact us for the payment plan.",
        audience:
            "Graduates, freshers, business owners and anyone targeting agency, brand or freelance marketing roles.",
        learn: [
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
        differentiator: {
            title: "The difference you will not find elsewhere in Lucknow",
            text: "You run a live ad campaign with a real ad budget funded by the academy, and graduate with a complete case study you can show any employer or client.",
        },
        careerServices: [
            "GitHub/portfolio setup",
            "1-on-1 ATS resume building",
            "LinkedIn optimisation",
            "2 mock interviews",
            "Job referrals to hiring partners",
            "Lifetime batch re-attendance",
        ],
        ctas: [
            { label: "Enrol Now", href: "/contact" },
            { label: "Book a Free Demo Class", href: "/contact" },
        ],
    },
    {
        slug: "python-data-analytics",
        categoryId: "certificates",
        title: "Python for Data Analytics",
        tagline: "Turn raw data into decisions — the fastest route into analyst roles.",
        flagship: false,
        facts: [
            { label: "Duration", value: "3 months" },
            { label: "Total hours", value: "96 hours" },
            { label: "Fee", value: "Contact us for pricing" },
        ],
        emiNote: "No-cost EMI available.",
        audience:
            "Graduates from any stream, commerce and finance professionals, and freshers targeting data analyst, business analyst or MIS roles.",
        learnProse:
            "Python for data work, Pandas and NumPy, data cleaning and transformation, SQL, visualisation with Matplotlib and Power BI, descriptive statistics, dashboards and business reporting.",
        outcome:
            "A portfolio of analysis projects and dashboards on GitHub, plus the full Professional career services package.",
        ctas: [{ label: "Enrol Now", href: "/contact" }],
    },
    {
        slug: "applied-machine-learning",
        categoryId: "certificates",
        title: "Applied Machine Learning",
        tagline: "From data to deployed model in four months.",
        flagship: false,
        facts: [
            { label: "Duration", value: "4 months" },
            { label: "Total hours", value: "128 hours" },
            { label: "Fee", value: "Contact us for pricing" },
        ],
        emiNote: "No-cost EMI available — contact us for the payment plan.",
        prerequisite: "Python Foundation or our entrance test",
        audience:
            "Freshers and professionals moving into data science and ML roles who want job-ready, applied skills.",
        learn: [
            "Math intuition — statistics, probability and linear algebra essentials, without heavy theory",
            "Data wrangling — Pandas, NumPy, cleaning, feature engineering",
            "Visualisation — Matplotlib, Seaborn, Power BI basics",
            "SQL for data work",
            "Supervised learning — regression, classification, trees, ensembles",
            "Unsupervised learning — clustering, PCA, recommendation systems",
            "Model evaluation, tuning and deployment with Streamlit and Flask",
            "Capstone project",
        ],
        outcome:
            "A deployed capstone model and a GitHub portfolio, plus the full Professional career services package.",
        ctas: [
            { label: "Enrol Now", href: "/contact" },
            { label: "Take the Free Entrance Test", href: "/contact" },
        ],
    },

    /* ═══════════════ CAREER PROGRAMS ═══════════════ */
    {
        slug: "advanced-diploma-ai-machine-learning",
        categoryId: "career",
        title: "Advanced Diploma in AI & Machine Learning",
        tagline:
            "Six months. Seven deployed projects. A portfolio that gets you interviews.",
        flagship: true,
        facts: [
            { label: "Duration", value: "6 months" },
            { label: "Total hours", value: "220 hours" },
            { label: "Schedule", value: "5 days a week, 2 hours a day" },
            { label: "Fee", value: "Contact us for pricing" },
        ],
        emiNote: "No-cost EMI available — contact us for the payment plan.",
        audience:
            "Freshers and career changers who want to become AI/ML engineers, data scientists or AI developers — and are ready to put in the work.",
        timeline: [
            {
                period: "Month 1",
                title: "Programming & Data Foundations",
                hours: "40 hrs",
                topics: [
                    "Python deep-dive",
                    "Git and GitHub",
                    "Jupyter",
                    "Pandas",
                    "NumPy",
                    "SQL",
                ],
            },
            {
                period: "Month 2",
                title: "Statistics & Data Analysis",
                hours: "36 hrs",
                topics: [
                    "Descriptive and inferential statistics",
                    "Hypothesis testing",
                    "EDA",
                    "Visualisation",
                    "Power BI",
                ],
            },
            {
                period: "Month 3",
                title: "Core Machine Learning",
                hours: "40 hrs",
                topics: [
                    "Regression",
                    "Classification",
                    "Decision trees",
                    "Random forest",
                    "XGBoost",
                    "Clustering",
                    "Model evaluation",
                    "Feature engineering",
                ],
            },
            {
                period: "Month 4",
                title: "Deep Learning",
                hours: "40 hrs",
                topics: [
                    "Neural networks",
                    "TensorFlow/Keras",
                    "CNNs for computer vision",
                    "RNNs",
                    "Transfer learning",
                ],
            },
            {
                period: "Month 5",
                title: "NLP & Generative AI",
                hours: "40 hrs",
                topics: [
                    "Text processing",
                    "Embeddings",
                    "Transformers",
                    "LLM APIs",
                    "RAG systems",
                    "LangChain",
                    "Building AI agents",
                    "Fine-tuning basics",
                ],
            },
            {
                period: "Month 6",
                title: "Deployment, Capstone & Career",
                hours: "24 hrs",
                topics: [
                    "Streamlit",
                    "FastAPI",
                    "Hugging Face Spaces",
                    "Cloud basics",
                    "MLOps introduction",
                    "Capstone project",
                    "Portfolio build",
                    "Interview preparation",
                ],
            },
        ],
        outcome:
            "6 graded projects + 1 capstone, all deployed and live on your GitHub.",
        includes: [
            "Full career services package — 1-on-1 resume building, LinkedIn and GitHub optimisation, 5+ mock interviews, 20 hours of aptitude and communication training, priority job referrals",
            "Lifetime batch re-attendance",
            "Daily doubt-clearing lab access, 10 AM – 7 PM",
        ],
        ctas: [
            { label: "Apply Now", href: "/contact" },
            { label: "Book a Campus Visit", href: "/contact" },
        ],
    },
    {
        slug: "ai-digital-marketing-specialist",
        categoryId: "career",
        title: "AI-Powered Digital Marketing Specialist",
        tagline: "Become the marketer agencies are competing to hire.",
        flagship: false,
        facts: [
            { label: "Duration", value: "6 months" },
            { label: "Total hours", value: "200 hours" },
            { label: "Fee", value: "Contact us for pricing" },
        ],
        emiNote: "No-cost EMI available.",
        audience:
            "Graduates and professionals who want a complete, career-grade marketing education with AI at its core — and placement support to match.",
        learnProse:
            "Everything in our Digital Marketing with AI Professional program, extended with advanced paid media, marketing automation, AI-driven content systems, performance analytics, client and campaign management, and multiple live campaigns across platforms.",
        outcome:
            "A multi-campaign portfolio with real results, plus the full Career-tier services package including 5+ mock interviews, aptitude and communication training, and priority placement referrals.",
        ctas: [{ label: "Apply Now", href: "/contact" }],
    },
    {
        slug: "data-science-ai-career-track",
        categoryId: "career",
        title: "Data Science & AI Career Track — with Internship",
        tagline:
            "Graduate with a portfolio, an internship certificate and an experience letter.",
        flagship: false,
        facts: [
            { label: "Duration", value: "9 months" },
            { label: "Total hours", value: "320 hours" },
            { label: "Fee", value: "Contact us for pricing" },
        ],
        emiNote: "No-cost EMI available — contact us for the payment plan.",
        audience:
            "Students who want the strongest possible start — real work experience on their CV before their first job application.",
        structure: [
            {
                period: "Months 1–6",
                title: "Advanced Diploma Curriculum",
                points: [
                    "The complete Advanced Diploma in AI & Machine Learning curriculum",
                ],
            },
            {
                period: "Months 7–9",
                title: "In-House Internship",
                points: [
                    "Three months working on live client or academy projects under supervision",
                    "Advanced MLOps, Docker, and cloud deployment (AWS/GCP basics)",
                    "Business communication and client-handling training",
                    "Internship completion certificate and experience letter",
                    "Priority placement queue",
                ],
            },
        ],
        whyMatters:
            "Lucknow freshers compete with NCR candidates who often already have internships. An experience letter closes that gap.",
        seatsNote: "Limited seats per cohort",
        ctas: [{ label: "Apply Now", href: "/contact" }],
    },
];

export const BUNDLES = [
    {
        id: "fresher-combo",
        name: "Fresher Combo",
        parts: [
            "Python Programming Foundation",
            "Advanced Diploma in AI & Machine Learning",
        ],
        note: "Bundled savings",
        pricing: "Contact us for pricing",
        accent: "lime",
    },
    {
        id: "marketer-combo",
        name: "Marketer Combo",
        parts: [
            "Generative AI & Prompt Engineering",
            "Digital Marketing with AI — Professional",
        ],
        note: "Bundled savings",
        pricing: "Contact us for pricing",
        accent: "violet",
    },
];

/* ── Helpers ── */

export function getCategory(categoryId) {
    return CATEGORIES.find((c) => c.id === categoryId);
}

export function programDuration(program) {
    return program.facts.find((f) => f.label === "Duration")?.value ?? "";
}

export function programHours(program) {
    const raw =
        program.facts.find((f) => f.label === "Total hours")?.value ?? "";
    const num = parseInt(raw, 10);
    return Number.isNaN(num) ? raw : `${num} hrs`;
}

export function programHoursNumber(program) {
    return parseInt(
        program.facts.find((f) => f.label === "Total hours")?.value ?? "0",
        10
    );
}

export function categoryTotals(categoryId) {
    const list = PROGRAMS.filter((p) => p.categoryId === categoryId);
    return {
        count: list.length,
        hours: list.reduce((sum, p) => sum + programHoursNumber(p), 0),
    };
}

export function getProgram(slug) {
    return PROGRAMS.find((p) => p.slug === slug);
}

export function relatedPrograms(program, count = 3) {
    const sameCategory = PROGRAMS.filter(
        (p) => p.categoryId === program.categoryId && p.slug !== program.slug
    );
    const others = PROGRAMS.filter(
        (p) => p.categoryId !== program.categoryId && p.slug !== program.slug
    );
    return [...sameCategory, ...others].slice(0, count);
}
