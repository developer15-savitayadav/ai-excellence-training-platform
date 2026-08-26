import { useState } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';

const COURSES = {
  'ai-tools-mastery': {
    title: 'AI Tools Mastery',
    subtitle: 'Work Smarter with AI',
    tagline: 'Use AI confidently in your work, studies and business — no coding required.',
    duration: '4 weeks',
    hours: '32 hrs',
    schedule: '3 classes a week',
    price: 'Contact us',
    level: 'Beginner',
    tier: 'short-term',
    forWhom: 'Students, teachers, shop owners, job-seekers, homemakers and government exam aspirants. If you have used WhatsApp, you can do this course.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=900&q=80',
    learning: [
      'How AI really works — what large language models can and cannot do',
      'ChatGPT, Claude and Gemini — hands-on comparison and when to use which',
      'Writing with AI — emails, applications, reports, social media posts, translation',
      'AI for images, video and presentations — Canva AI, image generators, slide decks',
      'AI for study and exams — notes, summaries, mock questions, doubt solving',
      'AI for small business — invoices, catalogues, WhatsApp marketing, customer replies',
      'Staying safe — spotting hallucinations and verifying AI output',
    ],
    takeaway: 'Your own Personal AI Toolkit document and three real tasks from your own work or study, completed with AI.',
    upgrade: 'Your full course fee is adjusted against any Professional or Career program if you enrol within 60 days.',
    cta: 'Enrol Now',
    ctaNote: 'New batch starts every month',
  },
  'python-programming-foundation': {
    title: 'Python Programming Foundation',
    subtitle: 'The Skill Every AI Career Starts With',
    tagline: 'The one skill every AI and data career starts with.',
    duration: '6 weeks',
    hours: '48 hrs',
    schedule: '4 classes a week',
    price: 'Contact us',
    level: 'Beginner',
    tier: 'short-term',
    forWhom: 'Freshers, BCA/B.Tech/BSc students, and anyone planning to move into AI, data analytics or machine learning.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80',
    learning: [
      'Setup, IDE, variables, data types and operators',
      'Control flow, loops and functions',
      'Data structures — lists, dictionaries, sets, tuples',
      'File handling, exceptions and modules',
      'Object-oriented programming — classes, objects, inheritance',
      'Introduction to NumPy and Pandas',
      'Mini project and debugging practice',
    ],
    takeaway: 'Two mini projects on your own GitHub profile — for example, an expense tracker and a data-cleaning tool.',
    upgrade: 'This course is the recommended prerequisite for our Advanced Diploma and Career Track. Enrol in either within 60 days and your full course fee is adjusted against the fee.',
    cta: 'Enrol Now',
  },
  'generative-ai-prompt-engineering': {
    title: 'Generative AI & Prompt Engineering',
    subtitle: 'The Most In-Demand AI Skill of 2026',
    tagline: 'The most in-demand AI skill of 2026 — taught properly, in person, in Lucknow.',
    duration: '6 weeks',
    hours: '48 hrs',
    price: 'Contact us',
    level: 'Intermediate',
    tier: 'short-term',
    forWhom: 'Working professionals, marketers, content creators, freelancers and anyone who wants to build and sell AI-powered workflows.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
    learning: [
      'LLM foundations — tokens, context windows, temperature, why models hallucinate',
      'Prompt engineering — zero-shot, few-shot, chain-of-thought, role prompting, output control',
      'Building custom GPTs and Claude Projects for specific workflows',
      'RAG concepts — document Q&A and company knowledge bases',
      'AI automation — Zapier, Make.com, n8n and no-code agent workflows',
      'Monetisation — freelancing on Upwork and Fiverr, pricing AI services, winning clients',
    ],
    takeaway: 'One deployed custom AI assistant and a freelance portfolio page ready to share with clients.',
    cta: 'Enrol Now',
    ctaNote: 'Limited to 25 seats per batch',
  },
  'ai-for-business': {
    title: 'AI for Business Owners & Professionals',
    subtitle: 'Weekend Batch',
    tagline: 'Run your business smarter in four weekends.',
    duration: '4 weeks',
    hours: '24 hrs',
    schedule: 'Weekend batches',
    price: 'Contact us',
    level: 'Beginner',
    tier: 'short-term',
    badge: 'Weekend',
    forWhom: 'Shop owners, clinic and institute owners, agency founders, consultants, managers and senior professionals who want practical AI results without taking time off during the week.',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=900&q=80',
    learning: [
      'Hands-on use of AI for customer communication, marketing content, WhatsApp and email campaigns',
      'Documents and reports, data summaries, and day-to-day decision support',
      'Built around your own business — bring your real tasks to class',
    ],
    takeaway: 'A working AI system for at least three recurring tasks in your business.',
    cta: 'Reserve a Weekend Seat',
  },
  'summer-winter-training': {
    title: 'Summer / Winter Training',
    subtitle: 'AKTU-Compliant',
    tagline: 'Industrial training that satisfies your college and actually teaches you something.',
    duration: '45 days',
    hours: '60 hrs',
    schedule: 'June–July and December–January',
    price: 'Contact us',
    level: 'Beginner',
    tier: 'short-term',
    badge: 'AKTU',
    forWhom: 'Engineering and degree students from AKTU-affiliated colleges who need a 4–6 week industrial training certificate.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=900&q=80',
    tracks: ['AI/ML', 'Python', 'Data Science', 'Digital Marketing with AI'],
    collegeServices: [
      'Official training letter on enrolment',
      'Project report in the prescribed format',
      'Viva preparation and support',
      'Stamped completion certificate',
    ],
    cta: 'Register for the Next Cycle',
    collegeNote: 'We partner directly with training and placement departments for on-campus or in-house batches.',
  },
  'digital-marketing-ai': {
    title: 'Digital Marketing with AI — Professional',
    subtitle: 'Professional Certificate',
    tagline: 'Learn marketing the way agencies practise it in 2026 — and run a live campaign with a real budget.',
    duration: '3 months',
    hours: '100 hrs',
    schedule: '5 classes a week',
    price: 'Contact us',
    emi: true,
    level: 'Beginner to Intermediate',
    tier: 'professional',
    forWhom: 'Graduates, freshers, business owners and anyone targeting agency, brand or freelance marketing roles.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    learning: [
      'Foundations — the digital ecosystem, funnels, buyer psychology, KPIs',
      'Websites and landing pages — WordPress, AI site builders, conversion basics',
      'SEO with AI — keyword research, on-page and technical SEO, AI content briefs, GEO/AEO for AI search',
      'Content and creative with AI — copywriting, image generation, short-form video, brand voice',
      'Meta Ads — campaign structure, audiences, creative testing, Advantage+',
      'Google Ads — Search, Performance Max, Keyword Planner, AI bidding',
      'Social media management — organic strategy, calendars, AI scheduling tools',
      'Email and WhatsApp marketing — automation, sequences, AI personalisation',
      'Analytics — GA4, Search Console, Looker Studio dashboards, AI-assisted reporting',
    ],
    difference: 'You run a live ad campaign with a real ad budget funded by the academy, and graduate with a complete case study you can show any employer or client.',
    careerServices: ['GitHub/portfolio setup', '1-on-1 ATS resume building', 'LinkedIn optimisation', '2 mock interviews', 'Job referrals to hiring partners', 'Lifetime batch re-attendance'],
    cta: 'Enrol Now',
    ctaNote: 'Book a Free Demo Class',
  },
  'python-data-analytics': {
    title: 'Python for Data Analytics',
    subtitle: 'Professional Certificate',
    tagline: 'Turn raw data into decisions — the fastest route into analyst roles.',
    duration: '3 months',
    hours: '96 hrs',
    price: 'Contact us',
    emi: true,
    level: 'Beginner',
    tier: 'professional',
    forWhom: 'Graduates from any stream, commerce and finance professionals, and freshers targeting data analyst, business analyst or MIS roles.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
    learning: [
      'Python for data work, Pandas and NumPy',
      'Data cleaning and transformation',
      'SQL for data queries',
      'Visualisation with Matplotlib and Power BI',
      'Descriptive statistics',
      'Dashboards and business reporting',
    ],
    takeaway: 'A portfolio of analysis projects and dashboards on GitHub, plus the full Professional career services package.',
    cta: 'Enrol Now',
  },
  'applied-machine-learning': {
    title: 'Applied Machine Learning',
    subtitle: 'Professional Certificate',
    tagline: 'From data to deployed model in four months.',
    duration: '4 months',
    hours: '128 hrs',
    price: 'Contact us',
    emi: true,
    level: 'Intermediate',
    tier: 'professional',
    prerequisite: 'Python Foundation or our entrance test',
    forWhom: 'Graduates with Python fundamentals who want to build and deploy machine learning models.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80',
    learning: [
      'Math intuition — statistics, probability and linear algebra essentials, without heavy theory',
      'Data wrangling — Pandas, NumPy, cleaning, feature engineering',
      'Visualisation — Matplotlib, Seaborn, Power BI basics',
      'SQL for data work',
      'Supervised learning — regression, classification, trees, ensembles',
      'Unsupervised learning — clustering, PCA, recommendation systems',
      'Model evaluation, tuning and deployment with Streamlit and Flask',
      'Capstone project',
    ],
    takeaway: 'A deployed capstone model and a GitHub portfolio, plus the full Professional career services package.',
    cta: 'Enrol Now',
    ctaNote: 'Take the Free Entrance Test',
  },
  'advanced-diploma-ai-ml': {
    title: 'Advanced Diploma in AI & Machine Learning',
    subtitle: 'FLAGSHIP Program',
    tagline: 'Six months. Seven deployed projects. A portfolio that gets you interviews.',
    duration: '6 months',
    hours: '220 hrs',
    schedule: '5 days a week, 2 hours a day',
    price: 'Contact us',
    emi: true,
    level: 'Beginner to Advanced',
    tier: 'career',
    flagship: true,
    forWhom: 'Freshers and career changers who want to become AI/ML engineers, data scientists or AI developers — and are ready to put in the work.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80',
    months: [
      { month: 'Month 1', title: 'Programming & Data Foundations', hours: '40 hrs', topics: 'Python deep-dive, Git and GitHub, Jupyter, Pandas, NumPy, SQL' },
      { month: 'Month 2', title: 'Statistics & Data Analysis', hours: '36 hrs', topics: 'Descriptive and inferential statistics, hypothesis testing, EDA, visualisation, Power BI' },
      { month: 'Month 3', title: 'Core Machine Learning', hours: '40 hrs', topics: 'Regression, classification, decision trees, random forest, XGBoost, clustering, model evaluation, feature engineering' },
      { month: 'Month 4', title: 'Deep Learning', hours: '40 hrs', topics: 'Neural networks, TensorFlow/Keras, CNNs for computer vision, RNNs, transfer learning' },
      { month: 'Month 5', title: 'NLP & Generative AI', hours: '40 hrs', topics: 'Text processing, embeddings, transformers, LLM APIs, RAG systems, LangChain, building AI agents, fine-tuning basics' },
      { month: 'Month 6', title: 'Deployment, Capstone & Career', hours: '24 hrs', topics: 'Streamlit, FastAPI, Hugging Face Spaces, cloud basics, MLOps introduction, capstone project, portfolio build, interview preparation' },
    ],
    takeaway: '6 graded projects + 1 capstone, all deployed and live on your GitHub.',
    included: [
      'Full career services package — 1-on-1 resume building, LinkedIn and GitHub optimisation, 5+ mock interviews, 20 hours of aptitude and communication training, priority job referrals',
      'Lifetime batch re-attendance',
      'Daily doubt-clearing lab access, 10 AM – 7 PM',
    ],
    cta: 'Apply Now',
    ctaNote: 'Book a Campus Visit',
  },
  'ai-digital-marketing-specialist': {
    title: 'AI-Powered Digital Marketing Specialist',
    subtitle: 'Career Program',
    tagline: 'Become the marketer agencies are competing to hire.',
    duration: '6 months',
    hours: '200 hrs',
    price: 'Contact us',
    emi: true,
    level: 'Intermediate',
    tier: 'career',
    forWhom: 'Graduates and professionals who want a complete, career-grade marketing education with AI at its core — and placement support to match.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
    learning: [
      'Everything in our Digital Marketing with AI Professional program',
      'Advanced paid media strategies',
      'Marketing automation at scale',
      'AI-driven content systems',
      'Performance analytics and attribution',
      'Client and campaign management',
      'Multiple live campaigns across platforms',
    ],
    takeaway: 'A multi-campaign portfolio with real results, plus the full Career-tier services package including 5+ mock interviews, aptitude and communication training, and priority placement referrals.',
    cta: 'Apply Now',
  },
  'data-science-ai-career-track': {
    title: 'Data Science & AI Career Track',
    subtitle: 'With Internship',
    tagline: 'Graduate with a portfolio, an internship certificate and an experience letter.',
    duration: '9 months',
    hours: '320 hrs',
    price: 'Contact us',
    emi: true,
    level: 'Beginner to Advanced',
    tier: 'career',
    forWhom: 'Students who want the strongest possible start — real work experience on their CV before their first job application.',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=900&q=80',
    phases: [
      { label: 'Months 1–6', title: 'Advanced Diploma in AI & ML Curriculum', desc: 'The complete Advanced Diploma in AI & Machine Learning curriculum — programming, statistics, ML, deep learning, NLP, deployment.' },
      { label: 'Months 7–9', title: 'In-house Internship', items: ['Three months working on live client or academy projects under supervision', 'Advanced MLOps, Docker, and cloud deployment (AWS/GCP basics)', 'Business communication and client-handling training', 'Internship completion certificate and experience letter', 'Priority placement queue'] },
    ],
    whyItMatters: 'Lucknow freshers compete with NCR candidates who often already have internships. An experience letter closes that gap.',
    cta: 'Apply Now',
    ctaNote: 'Limited seats per cohort',
  },
};

const SLUG_TO_PREV_NEXT = {
  'ai-tools-mastery': { prev: null, next: 'python-programming-foundation' },
  'python-programming-foundation': { prev: 'ai-tools-mastery', next: 'generative-ai-prompt-engineering' },
  'generative-ai-prompt-engineering': { prev: 'python-programming-foundation', next: 'ai-for-business' },
  'ai-for-business': { prev: 'generative-ai-prompt-engineering', next: 'summer-winter-training' },
  'summer-winter-training': { prev: 'ai-for-business', next: 'digital-marketing-ai' },
  'digital-marketing-ai': { prev: 'summer-winter-training', next: 'python-data-analytics' },
  'python-data-analytics': { prev: 'digital-marketing-ai', next: 'applied-machine-learning' },
  'applied-machine-learning': { prev: 'python-data-analytics', next: 'advanced-diploma-ai-ml' },
  'advanced-diploma-ai-ml': { prev: 'applied-machine-learning', next: 'ai-digital-marketing-specialist' },
  'ai-digital-marketing-specialist': { prev: 'advanced-diploma-ai-ml', next: 'data-science-ai-career-track' },
  'data-science-ai-career-track': { prev: 'ai-digital-marketing-specialist', next: null },
};

const TIER_LABELS = { 'short-term': { label: 'Short-Term', color: 'bg-green-50 text-green-700 border-green-200' }, professional: { label: 'Professional', color: 'bg-[#982cdc]/10 text-[#982cdc] border-[#982cdc]/20' }, career: { label: 'Career Program', color: 'bg-[#eec369]/10 text-[#d4a843] border-[#eec369]/20' } };

export default function CourseShow({ slug: propSlug }) {
  const slug = propSlug || (typeof window !== 'undefined' ? window.location.pathname.split('/courses/')[1] : '');
  const course = COURSES[slug];
  const nav = SLUG_TO_PREV_NEXT[slug] || { prev: null, next: null };
  const [openFaq, setOpenFaq] = useState(null);

  if (!course) {
    return (
      <PublicLayout>
        <section className="min-h-screen bg-[#f5f5f2] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black mb-3">Course Not Found</h1>
            <Link href="/courses" className="text-sm text-[#982cdc] hover:text-[#eec369] transition-colors">← Back to Courses</Link>
          </div>
        </section>
      </PublicLayout>
    );
  }

  const tier = TIER_LABELS[course.tier];
  const prevCourse = nav.prev ? COURSES[nav.prev] : null;
  const nextCourse = nav.next ? COURSES[nav.next] : null;

  return (
    <PublicLayout>
      <section className="min-h-screen bg-[#f5f5f2]">
        {/* Hero */}
        <div className="relative pt-[140px] pb-[80px] max-lg:pt-[120px] max-lg:pb-[60px]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 left-[10%] w-[440px] h-[260px] rounded-full bg-[#982cdc]/[0.07] blur-[110px]" />
            <div className="absolute -bottom-28 right-[6%] w-[400px] h-[240px] rounded-full bg-[#eec369]/[0.05] blur-[110px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1050px] px-6">
            <nav className="flex items-center gap-2 text-sm text-black/40 mb-8">
              <Link href="/" className="hover:text-black/70 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/courses" className="hover:text-black/70 transition-colors">Courses</Link>
              <span>/</span>
              <span className="text-black/60">{course.title}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`rounded-full px-3 py-1 text-[10px] font-semibold border ${tier.color}`}>{tier.label}</span>
                  <span className="rounded-full bg-black/5 px-3 py-1 text-[10px] font-semibold text-black/50">{course.duration} · {course.hours}</span>
                  {course.badge && <span className="rounded-full bg-[#982cdc]/10 px-3 py-1 text-[10px] font-semibold text-[#982cdc]">{course.badge}</span>}
                  {course.emi && <span className="rounded-full bg-green-50 px-3 py-1 text-[10px] font-semibold text-green-700 border border-green-200">No-cost EMI</span>}
                </div>

                <h1 className="text-[clamp(2rem,4vw,3rem)] font-bold text-black leading-tight mb-2">
                  {course.title}
                </h1>
                {course.subtitle && <p className="text-[#982cdc] font-semibold text-lg mb-3">{course.subtitle}</p>}
                <p className="text-black/60 text-lg leading-relaxed">{course.tagline}</p>

                <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-black/50">
                  {course.schedule && <span>📅 {course.schedule}</span>}
                  {course.prerequisite && <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">Prerequisite: {course.prerequisite}</span>}
                </div>
              </div>

              {/* Enroll Card */}
              <div className="lg:w-[340px] shrink-0">
                <div className="lg:sticky lg:top-24 bg-white border border-black/5 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
                  <div className="mb-5">
                    <span className="font-mono text-2xl font-bold text-black">{course.price}</span>
                    {course.emi && <p className="text-xs text-green-600 mt-1">No-cost EMI available</p>}
                  </div>
                  <Link href="/contact" className="block w-full rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] py-3 text-center text-sm font-semibold text-white shadow-[0_4px_16px_rgba(152,44,220,.25)] transition-all hover:shadow-[0_8px_24px_rgba(152,44,220,.35)]">
                    {course.cta}
                  </Link>
                  {course.ctaNote && <p className="text-xs text-black/40 text-center mt-3">{course.ctaNote}</p>}
                  <div className="mt-5 pt-5 border-t border-black/5 space-y-2.5 text-sm text-black/50">
                    <div className="flex items-center gap-2"><span>⏱</span>{course.duration} · {course.hours}</div>
                    {course.level && <div className="flex items-center gap-2"><span>📊</span>{course.level}</div>}
                    {course.emi && <div className="flex items-center gap-2"><span>💳</span>No-cost EMI available</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-[1050px] px-6 pb-20">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-12">
              {/* Who it's for */}
              <div className="bg-white border border-black/5 rounded-2xl p-7 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
                <h2 className="text-lg font-bold text-black mb-3">Who it's for</h2>
                <p className="text-black/60 leading-relaxed">{course.forWhom}</p>
              </div>

              {/* Month-by-month (Career Programs) */}
              {course.months && (
                <div>
                  <h2 className="text-xl font-bold text-black mb-5">Month-by-month journey</h2>
                  <div className="space-y-4">
                    {course.months.map((m) => (
                      <div key={m.month} className="bg-white border border-black/5 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="rounded-full bg-[#982cdc]/10 px-3 py-1 text-[10px] font-bold text-[#982cdc]">{m.month}</span>
                          <span className="text-xs text-black/40">{m.hours}</span>
                        </div>
                        <h3 className="font-bold text-black mb-1.5">{m.title}</h3>
                        <p className="text-sm text-black/50 leading-relaxed">{m.topics}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Phases (Career Track) */}
              {course.phases && (
                <div>
                  <h2 className="text-xl font-bold text-black mb-5">Program Structure</h2>
                  <div className="space-y-4">
                    {course.phases.map((p) => (
                      <div key={p.label} className="bg-white border border-black/5 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="rounded-full bg-[#982cdc]/10 px-3 py-1 text-[10px] font-bold text-[#982cdc]">{p.label}</span>
                        </div>
                        <h3 className="font-bold text-black mb-2">{p.title}</h3>
                        {p.desc && <p className="text-sm text-black/50 leading-relaxed">{p.desc}</p>}
                        {p.items && (
                          <ul className="space-y-1.5 mt-2">
                            {p.items.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-sm text-black/50">
                                <span className="text-[#982cdc] mt-0.5 shrink-0">✓</span>{item}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                  {course.whyItMatters && (
                    <div className="mt-4 bg-[#eec369]/10 border border-[#eec369]/20 rounded-xl p-5">
                      <p className="text-sm text-black/70 leading-relaxed"><strong className="text-black">Why this matters:</strong> {course.whyItMatters}</p>
                    </div>
                  )}
                </div>
              )}

              {/* What you will learn */}
              {course.learning && (
                <div>
                  <h2 className="text-xl font-bold text-black mb-5">What you will learn</h2>
                  <div className="bg-white border border-black/5 rounded-2xl p-7 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
                    <ul className="space-y-3">
                      {course.learning.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-black/60">
                          <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-[#982cdc]/10 flex items-center justify-center text-[10px] font-bold text-[#982cdc]">{i + 1}</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tracks (AKTU) */}
              {course.tracks && (
                <div className="bg-white border border-black/5 rounded-2xl p-7 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
                  <h2 className="text-lg font-bold text-black mb-3">Tracks available</h2>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {course.tracks.map((t) => (
                      <span key={t} className="rounded-full bg-[#982cdc]/10 px-3 py-1 text-xs font-semibold text-[#982cdc]">{t}</span>
                    ))}
                  </div>
                  {course.collegeServices && (
                    <>
                      <h3 className="font-bold text-black text-sm mb-3">Everything your college requires, included:</h3>
                      <ul className="space-y-1.5">
                        {course.collegeServices.map((s) => (
                          <li key={s} className="flex items-center gap-2 text-sm text-black/60"><span className="text-green-500">✓</span>{s}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  {course.collegeNote && <p className="text-xs text-black/40 mt-4">{course.collegeNote}</p>}
                </div>
              )}

              {/* Difference (Live Campaign) */}
              {course.difference && (
                <div className="bg-[linear-gradient(60deg,#982cdc,#eec369)] rounded-2xl p-7 text-white">
                  <h2 className="text-lg font-bold mb-2">The difference you will not find elsewhere in Lucknow</h2>
                  <p className="text-white/80 leading-relaxed text-sm">{course.difference}</p>
                </div>
              )}

              {/* Career Services */}
              {course.careerServices && (
                <div>
                  <h2 className="text-xl font-bold text-black mb-5">Career services included</h2>
                  <div className="bg-white border border-black/5 rounded-2xl p-7 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
                    <ul className="space-y-2">
                      {course.careerServices.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm text-black/60"><span className="text-[#eec369]">✓</span>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* You walk away with */}
              {course.takeaway && (
                <div className="bg-white border border-black/5 rounded-2xl p-7 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
                  <h2 className="text-lg font-bold text-black mb-3">You walk away with</h2>
                  <p className="text-black/60 leading-relaxed text-sm">{course.takeaway}</p>
                </div>
              )}

              {/* Included (Career Programs) */}
              {course.included && (
                <div className="bg-white border border-black/5 rounded-2xl p-7 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
                  <h2 className="text-lg font-bold text-black mb-3">Everything included</h2>
                  <ul className="space-y-2">
                    {course.included.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-black/60"><span className="text-[#982cdc] mt-0.5 shrink-0">✓</span>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Upgrade benefit */}
              {course.upgrade && (
                <div className="bg-[#eec369]/10 border border-[#eec369]/20 rounded-2xl p-6">
                  <h3 className="font-bold text-black mb-2">Upgrade benefit</h3>
                  <p className="text-sm text-black/60 leading-relaxed">{course.upgrade}</p>
                </div>
              )}

              {/* CTA bottom */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-black/5 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
                <div>
                  <p className="font-bold text-black">{course.cta}</p>
                  {course.ctaNote && <p className="text-xs text-black/40 mt-0.5">{course.ctaNote}</p>}
                </div>
                <Link href="/contact" className="rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(152,44,220,.2)] transition-all hover:shadow-[0_6px_18px_rgba(152,44,220,.3)]">
                  {course.cta}
                </Link>
              </div>

              {/* Nav prev/next */}
              <div className="flex items-center justify-between pt-6 border-t border-black/5">
                {prevCourse ? (
                  <Link href={`/courses/${nav.prev}`} className="group flex items-center gap-2 text-sm text-black/40 hover:text-[#982cdc] transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                    <span className="group-hover:underline">{prevCourse.title}</span>
                  </Link>
                ) : <span />}
                {nextCourse ? (
                  <Link href={`/courses/${nav.next}`} className="group flex items-center gap-2 text-sm text-black/40 hover:text-[#982cdc] transition-colors">
                    <span className="group-hover:underline">{nextCourse.title}</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                  </Link>
                ) : <span />}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 space-y-5">
                <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
                  <h3 className="font-bold text-black text-sm mb-3">Course Overview</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-black/40">Duration</span><span className="font-semibold text-black">{course.duration}</span></div>
                    <div className="flex justify-between"><span className="text-black/40">Hours</span><span className="font-semibold text-black">{course.hours}</span></div>
                    {course.level && <div className="flex justify-between"><span className="text-black/40">Level</span><span className="font-semibold text-black">{course.level}</span></div>}
                    <div className="flex justify-between"><span className="text-black/40">Fee</span><span className="font-semibold text-black">{course.price}</span></div>
                  </div>
                </div>

                <Link href="/contact" className="block w-full rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] py-3 text-center text-sm font-semibold text-white shadow-[0_4px_16px_rgba(152,44,220,.25)] transition-all hover:shadow-[0_8px_24px_rgba(152,44,220,.35)]">
                  {course.cta}
                </Link>

                <div className="bg-white border border-black/5 rounded-2xl p-6 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
                  <h3 className="font-bold text-black text-sm mb-3">Need guidance?</h3>
                  <p className="text-xs text-black/50 mb-3">Book a free 15-minute career counselling session.</p>
                  <Link href="/contact" className="block w-full rounded-full border border-black/10 bg-white py-2.5 text-center text-xs font-semibold text-black transition-all hover:bg-black hover:text-white">
                    Book Free Session
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
