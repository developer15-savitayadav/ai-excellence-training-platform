import { useState } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '../Layouts/PublicLayout';
import Button from '../Components/ui/Button';
import Card from '../Components/ui/Card';
import Badge from '../Components/ui/Badge';
import Accordion from '../Components/ui/Accordion';

function EyeBrow({ children, color = 'violet' }) {
    return (
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-black/70 backdrop-blur-sm">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${color === 'lime' ? 'bg-[#eec369]' : 'bg-[#982cdc]'}`} />
            {children}
        </p>
    );
}

const PLANS = [
    {
        name: 'Free',
        monthlyPrice: 0,
        annualPrice: 0,
        features: [
            { text: '2 course enrollments', included: true },
            { text: 'Community forum access', included: true },
            { text: 'Basic certificates', included: true },
            { text: 'Limited lab environments', included: true },
            { text: 'Hands-on projects', included: false },
            { text: 'Priority support', included: false },
            { text: 'Learning analytics', included: false },
            { text: 'Team features', included: false },
        ],
        buttonVariant: 'secondary',
        buttonLabel: 'Get Started',
    },
    {
        name: 'Individual',
        monthlyPrice: 29,
        annualPrice: 23,
        popular: true,
        features: [
            { text: 'Unlimited course access', included: true },
            { text: 'All hands-on labs', included: true },
            { text: 'Verified certificates', included: true },
            { text: 'Priority support', included: true },
            { text: 'Learning analytics', included: true },
            { text: 'Downloadable resources', included: true },
            { text: 'Team features', included: false },
            { text: 'Custom learning paths', included: false },
        ],
        buttonVariant: 'primary',
        buttonLabel: 'Start Learning',
    },
    {
        name: 'Team',
        monthlyPrice: 79,
        annualPrice: 63,
        features: [
            { text: 'Everything in Individual', included: true },
            { text: 'Custom AI curriculum designed with your team', included: true },
            { text: 'Dedicated account manager', included: true },
            { text: 'Advanced analytics and compliance reporting', included: true },
            { text: 'Priority 24/7 phone and chat support', included: true },
            { text: 'On-site workshops and training sessions', included: true },
            { text: 'Custom integrations with your existing LMS', included: true },
            { text: 'SOC 2 Type II compliance and data residency options', included: true },
        ],
        buttonVariant: 'secondary',
        buttonLabel: 'Get Started',
    },
    {
        name: 'Pro',
        monthlyPrice: 149,
        annualPrice: 119,
        features: [
            { text: 'Everything in Team', included: true },
            { text: 'Unlimited team members', included: true },
            { text: 'SSO & SCIM provisioning', included: true },
            { text: 'Custom course creation', included: true },
            { text: 'API access & integrations', included: true },
            { text: 'On-site training sessions', included: true },
            { text: 'Dedicated success manager', included: true },
            { text: 'Custom SLA', included: true },
        ],
        buttonVariant: 'primary',
        buttonLabel: 'Go Pro',
    },
];

const ENTERPRISE_POINTS = [
    'Unlimited learners across your organization',
    'Custom AI curriculum designed with your team',
    'Dedicated infrastructure and private cloud deployment',
    'Advanced analytics and compliance reporting',
    'Priority 24/7 phone and chat support',
    'On-site workshops and training sessions',
    'Custom integrations with your existing LMS',
    'SOC 2 Type II compliance and data residency options',
];

const FAQS = [
    {
        id: 1,
        question: 'Can I switch plans at any time?',
        answer: "Absolutely. You can upgrade or downgrade your plan at any time from your account settings. When upgrading, you'll be prorated for the remainder of your billing cycle. When downgrading, the new rate applies at the next billing date.",
    },
    {
        id: 2,
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and wire transfers for Team and Pro plans. Enterprise customers can also pay via purchase order with NET 30 terms.',
    },
    {
        id: 3,
        question: 'Is there a refund policy?',
        answer: "Yes. We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied within the first 30 days, contact us for a full refund — no questions asked.",
    },
    {
        id: 4,
        question: 'How much do I save with annual billing?',
        answer: 'Annual billing saves you 20% compared to monthly billing. For example, the Individual plan costs $29/mo monthly but only $23/mo when billed annually ($276/year vs $348/year — saving you $72).',
    },
    {
        id: 5,
        question: 'Do you offer student or nonprofit discounts?',
        answer: 'Yes! We offer 50% off Individual plans for verified students and accredited nonprofit organizations. Contact our support team with proof of eligibility to get your discount code.',
    },
];

export default function Pricing() {
    const [annual, setAnnual] = useState(false);

    return (
        <PublicLayout>
            {/* ── Hero ─────────────────────────────────────────── */}
            <section className="relative overflow-hidden pt-[120px] pb-[80px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 h-[500px] w-[700px] rounded-full bg-violet/15 blur-[120px] pointer-events-none" />

                <div className="relative z-10 mx-auto max-w-[1240px] px-6 text-center">
                    <EyeBrow>PRICING_</EyeBrow>
                    <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight text-body">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-muted text-lg mt-4 max-w-xl mx-auto">
                        Start free, upgrade when you're ready. No hidden fees, no surprises.
                    </p>

                    {/* Monthly / Annual toggle */}
                    <div className="mt-10 inline-flex items-center gap-3 bg-panel border border-white/[0.08] rounded-full p-1.5">
                        <button
                            onClick={() => setAnnual(false)}
                            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                                !annual ? 'bg-lime text-black' : 'text-muted hover:text-body'
                            }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setAnnual(true)}
                            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all flex items-center gap-2 ${
                                annual ? 'bg-lime text-black' : 'text-muted hover:text-body'
                            }`}
                        >
                            Annual
                            <Badge variant="lime" className="text-[10px] px-2 py-0.5">
                                Save 20%
                            </Badge>
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Plans ────────────────────────────────────────── */}
            <section className="max-w-[1240px] mx-auto px-6 pb-[120px] max-lg:pb-[72px] -mt-2">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {PLANS.map((plan) => {
                        const price = annual ? plan.annualPrice : plan.monthlyPrice;
                        return (
                            <div
                                key={plan.name}
                                className={`relative rounded-2xl p-7 flex flex-col ${
                                    plan.popular
                                        ? 'bg-panel border-2 border-lime shadow-[0_0_60px_-12px_rgba(238,195,105,.15)]'
                                        : 'bg-panel border border-white/[0.08]'
                                }`}
                            >
                                {plan.popular && (
                                    <Badge variant="lime" className="absolute -top-3 left-6">
                                        MOST POPULAR
                                    </Badge>
                                )}
                                {plan.popular && (
                                    <div className="absolute inset-x-0 top-0 h-24 rounded-t-2xl bg-gradient-to-b from-lime/[0.06] to-transparent pointer-events-none" />
                                )}

                                <div className="relative">
                                    <div className="font-display text-lg font-semibold text-body">
                                        {plan.name}
                                    </div>
                                    <div className="flex items-baseline gap-1 mt-3">
                                        {price === 0 ? (
                                            <span className="font-mono text-3xl font-bold text-body">$0</span>
                                        ) : (
                                            <>
                                                <span className="font-mono text-3xl font-bold text-body">
                                                    ${price}
                                                </span>
                                                <span className="text-sm text-muted">/mo</span>
                                            </>
                                        )}
                                    </div>
                                    {annual && price > 0 && (
                                        <p className="text-xs text-muted mt-1">
                                            Billed ${price * 12}/year
                                        </p>
                                    )}
                                </div>

                                <ul className="mt-6 space-y-3 flex-1">
                                    {plan.features.map((feature) => (
                                        <li
                                            key={feature.text}
                                            className="flex items-start gap-2.5 text-sm"
                                        >
                                            <span
                                                className={`mt-0.5 ${
                                                    feature.included ? 'text-lime' : 'text-muted/40'
                                                }`}
                                            >
                                                {feature.included ? '✓' : '✕'}
                                            </span>
                                            <span
                                                className={
                                                    feature.included ? 'text-body/80' : 'text-muted/50'
                                                }
                                            >
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant={plan.buttonVariant}
                                    className="w-full mt-6"
                                    href={
                                        plan.name === 'Free'
                                            ? '/register'
                                            : plan.name === 'Pro'
                                              ? '/contact'
                                              : '/register'
                                    }
                                >
                                    {plan.buttonLabel}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ── Enterprise ───────────────────────────────────── */}
            <section className="bg-surface/50">
                <div className="max-w-[1240px] mx-auto px-6 py-[120px] max-lg:py-[72px]">
                    <div className="bg-panel border border-white/[0.08] rounded-2xl p-8 md:p-12">
                        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
                            <div className="flex-1">
                                <Badge variant="violet" className="mb-4">
                                    ENTERPRISE
                                </Badge>
                                <h3 className="font-display text-3xl font-semibold text-body">
                                    Enterprise
                                </h3>
                                <p className="text-muted text-lg mt-3 max-w-lg">
                                    Custom AI training solutions for large organizations.
                                    Scalable, secure, and designed to upskill your entire
                                    workforce.
                                </p>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Button href="/contact">Contact Sales</Button>
                                    <Button variant="secondary" href="/contact">
                                        Request Demo
                                    </Button>
                                </div>
                            </div>

                            <div className="flex-1 grid sm:grid-cols-2 gap-4">
                                {ENTERPRISE_POINTS.map((point) => (
                                    <div key={point} className="flex items-start gap-2.5 text-sm">
                                        <span className="text-lime mt-0.5">✓</span>
                                        <span className="text-body/80">{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FAQ ──────────────────────────────────────────── */}
            <section className="max-w-[1240px] mx-auto px-6 py-[120px] max-lg:py-[72px]">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <EyeBrow>FAQ</EyeBrow>
                        <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] font-semibold text-body">
                            Billing Questions
                        </h2>
                    </div>
                    <Accordion items={FAQS} />
                </div>
            </section>
        </PublicLayout>
    );
}
