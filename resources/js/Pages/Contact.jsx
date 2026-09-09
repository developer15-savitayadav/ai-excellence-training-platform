import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import PublicLayout from '../Layouts/PublicLayout';
import Button from '../Components/ui/Button';
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
const AUDIENCE_OPTIONS = [
    'Student',
    'Professional',
    'Business Owner',
    'College or Corporate',
];

const PROGRAMS = [
    'AI Tools Mastery',
    'Python Programming Foundation',
    'Generative AI & Prompt Engineering',
    'AI for Business Owners & Professionals',
    'Summer / Winter Training',
    'Digital Marketing with AI',
    'Python for Data Analytics',
    'Applied Machine Learning',
    'Advanced Diploma in AI & Machine Learning',
    'AI-Powered Digital Marketing Specialist',
    'Data Science & AI Career Track',
    'Not sure yet',
];

const BATCH_TIMINGS = [
    'Weekday Morning (9 AM \u2013 12 PM)',
    'Weekday Afternoon (1 PM \u2013 4 PM)',
    'Weekday Evening (5 PM \u2013 8 PM)',
    'Weekend (Sat \u2013 Sun)',
    'Flexible / No preference',
];

const CONTACT_INFO = [
    {
        label: 'Visit Us',
        value: '6V 272 Sector 6 Gomti Nagar Vistar, Lucknow – Uttar Pradesh, India',
        href: null,
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
        ),
    },
    {
        label: 'Call Us',
        value: '[Phone]',
        href: 'tel:[Phone]',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
        ),
    },
    {
        label: 'WhatsApp',
        value: '[Number]',
        href: 'https://wa.me/[Number]',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
        ),
    },
    {
        label: 'Email',
        value: 'admission@aiexecellenceacademy.com',
        href: 'mailto:[Email]',
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        ),
    },
];

export default function Contact() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        email: '',
        audience: '',
        program: '',
        batchTiming: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(() => false);

    const handleChange = (field) => (e) => {
        setData(field, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                setSubmitted(true);
            },
        });
    };

    const inputClass =
        'w-full rounded-xl border border-black/10 bg-[#f5f5f2] px-4 py-3 text-black placeholder:text-black/30 outline-none transition-colors focus:border-[#982cdc] focus:ring-2 focus:ring-[#982cdc]/10';

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
                    <div className="inline-flex items-center ">
                        
                         <EyeBrow>
                            Get in Touch
                         </EyeBrow>
                    </div>

                    <h1 className="font-display text-[clamp(2.1rem,3.8vw,3.2rem)] font-bold tracking-[-0.035em] leading-[1.08]">
                        <span className="text-black">
                            Let&apos;s Talk About Your{" "}
                        </span>
                        <span className="bg-[linear-gradient(90deg,#eec369,#982cdc)] bg-clip-text text-transparent">
                            AI Future
                        </span>
                    </h1>

                    <p className="text-muted text-lg mt-5 max-w-xl leading-relaxed">
                        Walk in, call, or message us. A counsellor will understand your
                        background and goals and recommend the right program &mdash;
                        honestly, even if that means a shorter course than you expected.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/contact" className="rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(152,44,220,.25)] hover:shadow-[0_10px_28px_rgba(152,44,220,.38)] hover:-translate-y-0.5 transition-all duration-300">
                            Send a Message
                        </Link>
                        <Link href="tel:[Phone]" className="rounded-full bg-surface px-7 py-3.5 text-sm font-semibold text-white hover:bg-surface/80 hover:-translate-y-0.5 transition-all duration-300">
                            Call Us Now
                        </Link>
                    </div>
                </div>


            </section>

            {/* ═══════════════ CONTACT CONTENT ═══════════════ */}
            <section className="relative">
                <div className="max-w-[1240px] mx-auto px-6 pb-[120px] max-lg:pb-[72px]">
                    <div className="grid lg:grid-cols-5 gap-10">
                        {/* ═══ FORM ═══ */}
                        <div className="lg:col-span-3">
                            <div className="bg-white border border-black/5 rounded-2xl p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
                                {submitted ? (
                                    <div className="text-center py-16">
                                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-lime/10 border border-lime/20">
                                            <svg className="w-8 h-8 text-lime" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        <h3 className="font-display text-2xl font-bold text-body">
                                            Counselling Session Booked!
                                        </h3>
                                        <p className="text-muted mt-3 max-w-sm mx-auto">
                                            Thank you for your interest. Our counsellor will
                                            reach out to you shortly to discuss the right
                                            program for your goals.
                                        </p>
                                        <button
                                            className="mt-8 rounded-full border border-black/10 bg-white px-6 py-2.5 text-sm font-semibold text-black transition-all hover:bg-black hover:text-white"
                                            onClick={() => {
                                                setSubmitted(false);
                                                reset();
                                            }}
                                        >
                                            Submit Another Enquiry
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-8">
                                            <h2 className="font-display text-xl font-semibold text-body mb-1">
                                                Book a Free Counselling Session
                                            </h2>
                                            <p className="text-muted text-sm">
                                                Fill in your details and we&apos;ll match you with the right program.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            {/* Row 1: Name + Phone */}
                                            <div className="grid sm:grid-cols-2 gap-5">
                                                <div>
                                                    <label htmlFor="name" className="block text-sm font-semibold text-body mb-1.5">
                                                        Name
                                                    </label>
                                                    <input
                                                        id="name"
                                                        type="text"
                                                        value={data.name}
                                                        onChange={handleChange('name')}
                                                        className={inputClass}
                                                        placeholder="Your full name"
                                                    />
                                                    {errors.name && (
                                                        <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label htmlFor="phone" className="block text-sm font-semibold text-body mb-1.5">
                                                        Phone
                                                    </label>
                                                    <input
                                                        id="phone"
                                                        type="tel"
                                                        value={data.phone}
                                                        onChange={handleChange('phone')}
                                                        className={inputClass}
                                                        placeholder="+91 XXXXX XXXXX"
                                                    />
                                                    {errors.phone && (
                                                        <p className="mt-1.5 text-sm text-red-500">{errors.phone}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Row 2: Email */}
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-semibold text-body mb-1.5">
                                                    Email
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    value={data.email}
                                                    onChange={handleChange('email')}
                                                    className={inputClass}
                                                    placeholder="you@example.com"
                                                />
                                                {errors.email && (
                                                    <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
                                                )}
                                            </div>

                                            {/* Row 3: I am a + Program */}
                                            <div className="grid sm:grid-cols-2 gap-5">
                                                <div>
                                                    <label htmlFor="audience" className="block text-sm font-semibold text-body mb-1.5">
                                                        I am a
                                                    </label>
                                                    <select
                                                        id="audience"
                                                        value={data.audience}
                                                        onChange={handleChange('audience')}
                                                        className={`${inputClass} appearance-none`}
                                                    >
                                                        <option value="">Select one</option>
                                                        {AUDIENCE_OPTIONS.map((opt) => (
                                                            <option key={opt} value={opt}>
                                                                {opt}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.audience && (
                                                        <p className="mt-1.5 text-sm text-red-500">{errors.audience}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label htmlFor="program" className="block text-sm font-semibold text-body mb-1.5">
                                                        Program of Interest
                                                    </label>
                                                    <select
                                                        id="program"
                                                        value={data.program}
                                                        onChange={handleChange('program')}
                                                        className={`${inputClass} appearance-none`}
                                                    >
                                                        <option value="">Select a program</option>
                                                        {PROGRAMS.map((p) => (
                                                            <option key={p} value={p}>
                                                                {p}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.program && (
                                                        <p className="mt-1.5 text-sm text-red-500">{errors.program}</p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Row 4: Preferred Batch Timing */}
                                            <div>
                                                <label htmlFor="batchTiming" className="block text-sm font-semibold text-body mb-1.5">
                                                    Preferred Batch Timing
                                                </label>
                                                <select
                                                    id="batchTiming"
                                                    value={data.batchTiming}
                                                    onChange={handleChange('batchTiming')}
                                                    className={`${inputClass} appearance-none`}
                                                >
                                                    <option value="">Select preferred timing</option>
                                                    {BATCH_TIMINGS.map((t) => (
                                                        <option key={t} value={t}>
                                                            {t}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Row 5: Message */}
                                            <div>
                                                <label htmlFor="message" className="block text-sm font-semibold text-body mb-1.5">
                                                    Message
                                                </label>
                                                <textarea
                                                    id="message"
                                                    rows={4}
                                                    value={data.message}
                                                    onChange={handleChange('message')}
                                                    className={`${inputClass} resize-none`}
                                                    placeholder="Tell us about your background, goals, or any questions you have..."
                                                />
                                                {errors.message && (
                                                    <p className="mt-1.5 text-sm text-red-500">{errors.message}</p>
                                                )}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="w-full rounded-full bg-[linear-gradient(60deg,#982cdc,#eec369)] py-3.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(152,44,220,.25)] transition-all hover:shadow-[0_8px_24px_rgba(152,44,220,.35)] hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                                            >
                                                {processing
                                                    ? 'Submitting...'
                                                    : 'Book a Free Counselling Session'}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* ═══ CONTACT INFO ═══ */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Contact cards */}
                            <div className="bg-white border border-black/5 rounded-2xl p-7 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
                                <h3 className="font-display text-lg font-semibold text-body mb-5">
                                    Contact Information
                                </h3>
                                <div className="space-y-4">
                                    {CONTACT_INFO.map((item) => (
                                        <div key={item.label} className="flex items-start gap-3.5">
                                            <div className="w-10 h-10 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center shrink-0 text-violet">
                                                {item.icon}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-xs font-mono uppercase tracking-wider text-muted mb-0.5">
                                                    {item.label}
                                                </div>
                                                {item.href ? (
                                                    <a
                                                        href={item.href}
                                                        className="text-sm font-medium text-body hover:text-violet transition-colors block"
                                                        target={item.href.startsWith('http') ? '_blank' : undefined}
                                                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                    >
                                                        {item.value}
                                                    </a>
                                                ) : (
                                                    <div className="text-sm font-medium text-body">
                                                        {item.value}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="bg-white border border-black/5 rounded-2xl p-7 shadow-[0_8px_30px_rgba(0,0,0,.03)]">
                                <div className="flex items-start gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-lime/10 border border-lime/20 flex items-center justify-center shrink-0 text-lime">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-xs font-mono uppercase tracking-wider text-muted mb-0.5">
                                            Hours
                                        </div>
                                        <div className="text-sm font-medium text-body">
                                            Monday to Sunday
                                        </div>
                                        <div className="text-sm text-muted">
                                            9 AM &ndash; 8 PM
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Google Map */}
                            <div className="rounded-2xl border border-black/5 overflow-hidden h-48 bg-white shadow-[0_8px_30px_rgba(0,0,0,.03)]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113896.79595909263!2d80.94617345!3d26.84669375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd166cb3b2b3%3A0x2c7483b0d4dc4b57!2sGomti%20Nagar%2C%20Lucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1724598765432!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="AI Excellence Academy - Gomti Nagar, Lucknow"
                                    className="w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
