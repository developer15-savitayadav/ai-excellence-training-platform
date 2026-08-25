import { useState } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '../Layouts/PublicLayout';
import Button from '../Components/ui/Button';
import Badge from '../Components/ui/Badge';

function EyeBrow({ children, color = 'violet' }) {
    return (
        <p className={`font-mono text-xs uppercase tracking-[0.08em] text-${color} mb-3`}>
            {children}
        </p>
    );
}

const SUBJECTS = [
    'General Inquiry',
    'Course Information',
    'Enterprise Pricing',
    'Technical Support',
    'Partnership',
    'Bug Report',
];

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!data.name.trim()) errs.name = 'Name is required.';
        if (!data.email.trim()) {
            errs.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errs.email = 'Please enter a valid email address.';
        }
        if (!data.subject) errs.subject = 'Please select a subject.';
        if (!data.message.trim()) {
            errs.message = 'Message is required.';
        } else if (data.message.trim().length < 10) {
            errs.message = 'Message must be at least 10 characters.';
        }
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const clientErrors = validate();
        setErrors(clientErrors);
        if (Object.keys(clientErrors).length > 0) return;

        setSubmitted(true);
    };

    const handleChange = (field) => (e) => {
        setData((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    return (
        <PublicLayout>
            <section className="relative overflow-hidden pt-[120px] pb-[120px] max-lg:pb-[72px]">
                <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-violet/15 blur-[120px] pointer-events-none" />
                <div className="absolute top-10 right-0 h-[400px] w-[400px] rounded-full bg-lime/10 blur-[100px] pointer-events-none" />

                <div className="relative z-10 mx-auto max-w-[1240px] px-6">
                    <div className="text-center mb-16">
                        <EyeBrow>CONTACT_</EyeBrow>
                        <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight text-body">
                            Get in Touch
                        </h2>
                        <p className="text-muted text-lg mt-4 max-w-xl mx-auto">
                            Have a question or want to learn more? We&apos;d love to hear from you.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-10">
                        {/* Form */}
                        <div className="lg:col-span-3">
                            <div className="bg-panel border border-black/[0.08] rounded-2xl p-8">
                                {submitted ? (
                                    <div className="text-center py-12">
                                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
                                            <span className="text-3xl">✓</span>
                                        </div>
                                        <h3 className="font-display text-2xl font-semibold text-body">
                                            Message Sent!
                                        </h3>
                                        <p className="text-muted mt-2 max-w-sm mx-auto">
                                            Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                                        </p>
                                        <Button
                                            variant="secondary"
                                            className="mt-6"
                                            onClick={() => {
                                                setSubmitted(false);
                                                setData({ name: '', email: '', subject: '', message: '' });
                                            }}
                                        >
                                            Send Another Message
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-body mb-1.5">
                                                Name
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                value={data.name}
                                                onChange={handleChange('name')}
                                                className="w-full rounded-xl border border-black/[0.12] bg-black/[0.04] px-4 py-3 text-body placeholder:text-muted/50 outline-none transition-colors focus:border-lime/50 focus:ring-1 focus:ring-lime/30"
                                                placeholder="Your full name"
                                            />
                                            {errors.name && <p className="mt-1.5 text-sm text-danger">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-body mb-1.5">
                                                Email
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={handleChange('email')}
                                                className="w-full rounded-xl border border-black/[0.12] bg-black/[0.04] px-4 py-3 text-body placeholder:text-muted/50 outline-none transition-colors focus:border-lime/50 focus:ring-1 focus:ring-lime/30"
                                                placeholder="you@example.com"
                                            />
                                            {errors.email && <p className="mt-1.5 text-sm text-danger">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-body mb-1.5">
                                                Subject
                                            </label>
                                            <select
                                                id="subject"
                                                value={data.subject}
                                                onChange={handleChange('subject')}
                                                className="w-full rounded-xl border border-black/[0.12] bg-black/[0.04] px-4 py-3 text-body outline-none transition-colors focus:border-lime/50 focus:ring-1 focus:ring-lime/30 appearance-none"
                                            >
                                                <option value="" className="bg-panel text-muted">Select a subject</option>
                                                {SUBJECTS.map((s) => (
                                                    <option key={s} value={s} className="bg-panel text-body">{s}</option>
                                                ))}
                                            </select>
                                            {errors.subject && <p className="mt-1.5 text-sm text-danger">{errors.subject}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-body mb-1.5">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                rows={5}
                                                value={data.message}
                                                onChange={handleChange('message')}
                                                className="w-full rounded-xl border border-black/[0.12] bg-black/[0.04] px-4 py-3 text-body placeholder:text-muted/50 outline-none transition-colors focus:border-lime/50 focus:ring-1 focus:ring-lime/30 resize-none"
                                                placeholder="Tell us how we can help..."
                                            />
                                            {errors.message && <p className="mt-1.5 text-sm text-danger">{errors.message}</p>}
                                        </div>

                                        <Button type="submit" className="w-full">
                                            Send Message
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-panel border border-black/[0.08] rounded-2xl p-7">
                                <h3 className="font-display text-lg font-semibold text-body mb-5">
                                    Contact Information
                                </h3>
                                <div className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <span className="text-lg">📍</span>
                                        <div>
                                            <div className="text-sm font-medium text-body">Address</div>
                                            <div className="text-sm text-muted mt-0.5">
                                                123 Innovation Drive<br />
                                                San Francisco, CA 94105
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-lg">✉️</span>
                                        <div>
                                            <div className="text-sm font-medium text-body">Email</div>
                                            <a href="mailto:hello@cortexacademy.com" className="text-sm text-violet hover:text-lime transition-colors mt-0.5 block">
                                                hello@cortexacademy.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-lg">📞</span>
                                        <div>
                                            <div className="text-sm font-medium text-body">Phone</div>
                                            <a href="tel:+15551234567" className="text-sm text-violet hover:text-lime transition-colors mt-0.5 block">
                                                +1 (555) 123-4567
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-lg">🕐</span>
                                        <div>
                                            <div className="text-sm font-medium text-body">Office Hours</div>
                                            <div className="text-sm text-muted mt-0.5">Mon–Fri 9am–6pm PST</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-panel border border-black/[0.08] rounded-2xl p-7">
                                <h3 className="font-display text-lg font-semibold text-body mb-4">
                                    Follow Us
                                </h3>
                                <div className="flex gap-3">
                                    {[
                                        { name: 'Twitter', href: '#', icon: '𝕏' },
                                        { name: 'LinkedIn', href: '#', icon: 'in' },
                                        { name: 'GitHub', href: '#', icon: '⌘' },
                                        { name: 'YouTube', href: '#', icon: '▶' },
                                    ].map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.12] bg-black/[0.04] text-sm font-semibold text-body transition-all hover:border-lime/30 hover:bg-lime/[0.06]"
                                            title={social.name}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="rounded-2xl border border-black/[0.08] overflow-hidden h-48 bg-gradient-to-br from-violet/20 via-panel to-lime/10 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-3xl mb-2">🗺️</div>
                                    <div className="font-mono text-xs text-muted">San Francisco, CA</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
