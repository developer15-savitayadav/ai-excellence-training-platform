import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    BadgeCheck,
    CalendarDays,
    Clock,
    Fingerprint,
    GraduationCap,
    LockKeyhole,
    Search,
    ShieldAlert,
    ShieldCheck,
    ShieldX,
    Sparkles,
    UserRound,
} from 'lucide-react';
import PublicLayout from '../../Layouts/PublicLayout';
import Button from '../../Components/ui/Button';

const STATES = {
    valid: {
        icon: BadgeCheck,
        title: 'Certificate verified',
        text: 'This certificate is authentic, active and was issued by the academy.',
        tone: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        badge: 'Valid',
        badgeClass: 'bg-emerald-600',
    },
    revoked: {
        icon: ShieldX,
        title: 'Certificate revoked',
        text: 'This certificate was issued but has since been revoked. It is no longer a valid credential.',
        tone: 'text-rose-700 bg-rose-50 border-rose-200',
        badge: 'Revoked',
        badgeClass: 'bg-rose-600',
    },
    expired: {
        icon: Clock,
        title: 'Certificate expired',
        text: 'This certificate is authentic, but its validity period has ended.',
        tone: 'text-amber-700 bg-amber-50 border-amber-200',
        badge: 'Expired',
        badgeClass: 'bg-amber-500',
    },
    invalid: {
        icon: ShieldAlert,
        title: 'Certificate could not be validated',
        text: 'The record failed our integrity check. The stored data does not match its signature, so we cannot confirm it.',
        tone: 'text-rose-700 bg-rose-50 border-rose-200',
        badge: 'Invalid',
        badgeClass: 'bg-rose-600',
    },
    not_found: {
        icon: ShieldX,
        title: 'No certificate found',
        text: 'We could not find a certificate with that code. Check for typos and try again.',
        tone: 'text-rose-700 bg-rose-50 border-rose-200',
        badge: 'Not found',
        badgeClass: 'bg-rose-600',
    },
};

function fmt(d) {
    if (!d) return null;
    const date = new Date(`${d}T00:00:00`);
    if (Number.isNaN(date.getTime())) return d;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Verify({ issuer, searched = '', result = null }) {
    const { data, setData, post, processing, errors } = useForm({ code: searched || '' });
    const state = result ? STATES[result.state] || STATES.not_found : null;
    const cert = result?.certificate;
    const verified = result && ['valid', 'expired', 'revoked'].includes(result.state);

    const submit = (e) => {
        e.preventDefault();
        post('/verify');
    };

    return (
        <PublicLayout>
            <Head title="Verify a Certificate" />

            <div className="mx-auto max-w-3xl space-y-8 px-4 py-14 sm:px-6 sm:py-20">
                <div className="text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                        <ShieldCheck className="h-3.5 w-3.5 text-violet" /> Official verification portal
                    </span>
                    <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-body sm:text-4xl">
                        Verify a Certificate
                    </h1>
                    <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
                        Enter the certificate code printed on the credential, or scan its QR code, to confirm it was
                        issued by {issuer}.
                    </p>
                </div>

                <form onSubmit={submit} className="rounded-2xl border border-black/[0.08] bg-white p-4 sm:p-5">
                    <label htmlFor="code" className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                        Certificate code
                    </label>
                    <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                        <div className="relative flex-1">
                            <Fingerprint className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                            <input
                                id="code"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                placeholder="AIEA-2026-XXXXXXXXXX"
                                autoComplete="off"
                                spellCheck={false}
                                aria-invalid={!!errors.code}
                                className="h-12 w-full rounded-xl border border-black/[0.12] bg-white pl-11 pr-4 font-mono text-sm uppercase tracking-wide text-body outline-none transition-colors placeholder:text-muted/60 focus:border-violet focus:ring-2 focus:ring-violet/15"
                            />
                        </div>
                        <Button type="submit" disabled={processing} className="h-12 sm:px-6">
                            <Search className="mr-2 h-4 w-4" />
                            {processing ? 'Checking…' : 'Verify certificate'}
                        </Button>
                    </div>
                    {errors.code && <p className="mt-2 text-xs font-medium text-danger">{errors.code}</p>}
                    <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted">
                        <LockKeyhole className="h-3 w-3" /> Verification is free, public and does not require an account.
                    </p>
                </form>

                {state && result && (
                    <div className="space-y-5" role="status" aria-live="polite">
                        <div className={`relative overflow-hidden rounded-2xl border p-5 sm:p-6 ${state.tone}`}>
                            <div className="flex items-start gap-4">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/70">
                                    <state.icon className="h-6 w-6" />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="font-display text-lg font-semibold">{state.title}</p>
                                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${state.badgeClass}`}>
                                            {state.badge}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm opacity-90">{state.text}</p>
                                    {result.state === 'revoked' && cert?.revokedReason && (
                                        <p className="mt-2 rounded-lg bg-white/60 px-3 py-2 text-sm">
                                            <span className="font-semibold">Reason:</span> {cert.revokedReason}
                                        </p>
                                    )}
                                    {result.state === 'invalid' && (
                                        <p className="mt-2 rounded-lg bg-white/60 px-3 py-2 text-xs">
                                            If you received this certificate from us, please contact {issuer} before relying on it.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {searched && (
                            <p className="text-center text-xs text-muted">
                                Checked code <span className="font-mono font-semibold text-body">{searched}</span>
                            </p>
                        )}

                        {verified && cert && (
                            <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white">
                                <div className="border-b border-black/[0.06] bg-black/[0.015] px-5 py-4">
                                    <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                                        <GraduationCap className="h-4 w-4 text-violet" /> Certificate record
                                    </p>
                                </div>

                                <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                                    <Detail icon={UserRound} label="Awarded to" value={cert.studentName} />
                                    <Detail icon={GraduationCap} label="Course" value={cert.courseTitle} />
                                    <Detail icon={CalendarDays} label="Issued on" value={fmt(cert.issuedAt)} />
                                    <Detail icon={CalendarDays} label="Valid until" value={fmt(cert.expiresAt) || 'No expiry'} />
                                    <Detail icon={Clock} label="Duration" value={cert.duration || 'Self-paced'} />
                                    <Detail icon={Sparkles} label="Result" value={cert.grade || (cert.score != null ? `${cert.score}%` : null)} />
                                    <Detail icon={UserRound} label="Instructor" value={cert.instructorName} />
                                    <Detail icon={Fingerprint} label="Certificate code" value={cert.code} mono />
                                </div>

                                <div className="border-t border-black/[0.06] bg-black/[0.015] px-5 py-4 text-xs text-muted sm:px-6">
                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                                        <span className="inline-flex items-center gap-1.5">
                                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> HMAC signature verified
                                        </span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <LockKeyhole className="h-3.5 w-3.5" /> Issued by {issuer}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap items-center justify-center gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setData('code', '');
                                    router.visit('/verify');
                                }}
                                className="inline-flex h-10 items-center gap-2 rounded-xl border border-black/[0.1] bg-white px-4 text-sm font-semibold text-body hover:bg-black/[0.03]"
                            >
                                <Search className="h-4 w-4" /> Verify another code
                            </button>
                            <Link
                                href="/contact"
                                className="inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-violet hover:underline"
                            >
                                Need help? Contact us
                            </Link>
                        </div>
                    </div>
                )}

                <div className="grid gap-4 rounded-2xl border border-black/[0.07] bg-white p-5 sm:grid-cols-3">
                    <TrustItem icon={ShieldCheck} title="Signed records" text="Details are protected by an HMAC signature, so tampering is detectable." />
                    <TrustItem icon={CalendarDays} title="Live status" text="Revocations and expiries are reflected immediately." />
                    <TrustItem icon={UserRound} title="Minimal data" text="Only the details needed to confirm the credential are shown." />
                </div>
            </div>
        </PublicLayout>
    );
}

function Detail({ icon: Icon, label, value, mono }) {
    if (!value && value !== 0) return null;
    return (
        <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/[0.04] text-muted">
                <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{label}</p>
                <p className={`mt-0.5 break-words text-sm font-semibold text-body ${mono ? 'font-mono text-xs' : ''}`}>{value}</p>
            </div>
        </div>
    );
}

function TrustItem({ icon: Icon, title, text }) {
    return (
        <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet/[0.07] text-violet">
                <Icon className="h-4 w-4" />
            </span>
            <div>
                <p className="text-sm font-semibold text-body">{title}</p>
                <p className="mt-0.5 text-xs text-muted">{text}</p>
            </div>
        </div>
    );
}
