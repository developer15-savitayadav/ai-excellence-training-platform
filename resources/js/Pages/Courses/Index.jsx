import { useState } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';

const SHORT_TERM = [
  { id: 1, title: 'AI Tools Mastery', slug: 'ai-tools-mastery', duration: '4 weeks', hours: '32 hrs', tagline: 'Work Smarter with AI — no coding required', price: 'Contact us' },
  { id: 2, title: 'Python Programming Foundation', slug: 'python-programming-foundation', duration: '6 weeks', hours: '48 hrs', tagline: 'The one skill every AI and data career starts with', price: 'Contact us' },
  { id: 3, title: 'Generative AI & Prompt Engineering', slug: 'generative-ai-prompt-engineering', duration: '6 weeks', hours: '48 hrs', tagline: 'The most in-demand AI skill of 2026', price: 'Contact us' },
  { id: 4, title: 'AI for Business Owners & Professionals', slug: 'ai-for-business', duration: '4 weeks', hours: '24 hrs', tagline: 'Run your business smarter in four weekends', price: 'Contact us', badge: 'Weekend' },
  { id: 5, title: 'Summer / Winter Training (AKTU-Compliant)', slug: 'summer-winter-training', duration: '45 days', hours: '60 hrs', tagline: 'Industrial training that satisfies your college', price: 'Contact us', badge: 'AKTU' },
];

const PROFESSIONAL = [
  { id: 6, title: 'Digital Marketing with AI — Professional', slug: 'digital-marketing-ai', duration: '3 months', hours: '100 hrs', tagline: 'Learn marketing the way agencies practise it in 2026', price: 'Contact us', emi: true },
  { id: 7, title: 'Python for Data Analytics', slug: 'python-data-analytics', duration: '3 months', hours: '96 hrs', tagline: 'Turn raw data into decisions', price: 'Contact us', emi: true },
  { id: 8, title: 'Applied Machine Learning', slug: 'applied-machine-learning', duration: '4 months', hours: '128 hrs', tagline: 'From data to deployed model in four months', price: 'Contact us', emi: true },
];

const CAREER = [
  { id: 9, title: 'Advanced Diploma in AI & Machine Learning', slug: 'advanced-diploma-ai-ml', duration: '6 months', hours: '220 hrs', tagline: 'Six months. Seven deployed projects. A portfolio that gets you interviews.', price: 'Contact us', emi: true, flagship: true },
  { id: 10, title: 'AI-Powered Digital Marketing Specialist', slug: 'ai-digital-marketing-specialist', duration: '6 months', hours: '200 hrs', tagline: 'Become the marketer agencies are competing to hire', price: 'Contact us', emi: true },
  { id: 11, title: 'Data Science & AI Career Track', slug: 'data-science-ai-career-track', duration: '9 months', hours: '320 hrs', tagline: 'Graduate with a portfolio, an internship certificate and an experience letter', price: 'Contact us', emi: true },
];

const BUNDLES = [
  { title: 'Fresher Combo', courses: 'Python Foundation + Advanced Diploma in AI & ML', note: 'Bundled savings — contact us for pricing' },
  { title: 'Marketer Combo', courses: 'Generative AI + Digital Marketing with AI', note: 'Bundled savings — contact us for pricing' },
];

function CourseTier({ label, subtitle, courses, accent }) {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className={`h-2 w-2 rounded-full ${accent}`} />
          <h3 className="text-xl font-bold text-black">{label}</h3>
        </div>
        <p className="text-sm text-black/50 ml-5">{subtitle}</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-[0_8px_30px_rgba(0,0,0,.03)]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5">
                <th className="text-left px-5 py-3.5 font-semibold text-black/70 text-xs uppercase tracking-wider">Course</th>
                <th className="text-left px-5 py-3.5 font-semibold text-black/70 text-xs uppercase tracking-wider">Duration</th>
                <th className="text-left px-5 py-3.5 font-semibold text-black/70 text-xs uppercase tracking-wider hidden sm:table-cell">Hours</th>
                <th className="text-right px-5 py-3.5 font-semibold text-black/70 text-xs uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, i) => (
                <tr key={course.id} className={`group ${i < courses.length - 1 ? 'border-b border-black/[0.03]' : ''} hover:bg-[#f5f5f2] transition-colors`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/courses/${course.slug}`} className="font-semibold text-black group-hover:text-[#982cdc] transition-colors leading-tight">
                        {course.title}
                      </Link>
                      {course.badge && (
                        <span className="shrink-0 rounded-full bg-[#982cdc]/10 px-2 py-0.5 text-[10px] font-semibold text-[#982cdc]">{course.badge}</span>
                      )}
                      {course.flagship && (
                        <span className="shrink-0 rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-2 py-0.5 text-[10px] font-bold text-white">Flagship</span>
                      )}
                    </div>
                    <p className="text-xs text-black/40 mt-0.5">{course.tagline}</p>
                  </td>
                  <td className="px-5 py-4 text-black/60 whitespace-nowrap">{course.duration}</td>
                  <td className="px-5 py-4 text-black/60 whitespace-nowrap hidden sm:table-cell">{course.hours}</td>
                  <td className="px-5 py-4 text-right">
                    <Link href={`/courses/${course.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-[#982cdc] hover:text-[#eec369] transition-colors">
                      Details
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function CoursesIndex() {
  return (
    <PublicLayout>
      <section className="min-h-screen bg-[#f5f5f2]">
        {/* Hero */}
        <div className="relative pt-[140px] pb-[80px] max-lg:pt-[120px] max-lg:pb-[60px]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 left-[10%] w-[440px] h-[260px] rounded-full bg-[#982cdc]/[0.07] blur-[110px]" />
            <div className="absolute -bottom-28 right-[6%] w-[400px] h-[240px] rounded-full bg-[#eec369]/[0.05] blur-[110px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1240px] px-6 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#982cdc] mb-3">COURSES_</p>
            <h1 className="text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.03em] text-black leading-tight">
              Find the right program<br className="hidden sm:block" /> for your goal
            </h1>
            <p className="text-black/60 text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
              Whether you have four weeks or nine months, whether you are a complete beginner or a working professional,
              there is a path here. Not sure where to start?
            </p>
            <div className="mt-6 inline-flex items-center gap-3 bg-white border border-black/5 rounded-full px-6 py-3 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
              <span className="text-lg">📞</span>
              <span className="text-sm text-black/70">Take our free <strong className="text-black">15-minute career counselling session</strong> and we will guide you.</span>
              <Link href="/contact" className="shrink-0 rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-4 py-1.5 text-xs font-semibold text-white transition-all hover:shadow-[0_4px_12px_rgba(152,44,220,.25)]">
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* Course Tiers */}
        <div className="mx-auto max-w-[1240px] px-6 pb-16 space-y-14">
          <CourseTier
            label="Short-Term Courses"
            subtitle="4–6 weeks · Beginner-friendly · Fee fully adjustable if you upgrade within 60 days"
            courses={SHORT_TERM}
            accent="bg-green-400"
          />

          <CourseTier
            label="Professional Certificates"
            subtitle="3–4 months · Portfolio + career services · No-cost EMI"
            courses={PROFESSIONAL}
            accent="bg-[#982cdc]"
          />

          <CourseTier
            label="Career Programs"
            subtitle="6–9 months · Full career services · Lifetime re-attendance · No-cost EMI"
            courses={CAREER}
            accent="bg-[#eec369]"
          />
        </div>

        {/* Popular Bundles */}
        <div className="mx-auto max-w-[1240px] px-6 pb-16">
          <div className="bg-white border border-black/5 rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#982cdc] mb-2">BUNDLES_</p>
            <h2 className="text-xl font-bold text-black mb-6">Popular Bundles</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {BUNDLES.map((bundle) => (
                <div key={bundle.title} className="border border-black/5 rounded-xl p-5 bg-[#f5f5f2]">
                  <h3 className="font-bold text-black mb-1">{bundle.title}</h3>
                  <p className="text-sm text-black/60 mb-2">{bundle.courses}</p>
                  <p className="text-xs text-black/40">{bundle.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto max-w-[1240px] px-6 pb-20">
          <div className="text-center">
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-black mb-3">
              Still not sure which course is right for you?
            </h2>
            <p className="text-black/50 max-w-lg mx-auto mb-8">
              Book a free career counselling session. We'll help you pick the right path based on your background and goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(152,44,220,.25)] transition-all hover:shadow-[0_8px_24px_rgba(152,44,220,.35)]">
                Book Free Counselling
              </Link>
              <Link href="/offline-courses" className="rounded-full border border-black/10 bg-white px-7 py-3 text-sm font-semibold text-black transition-all hover:bg-black hover:text-white">
                View Offline Batches
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
