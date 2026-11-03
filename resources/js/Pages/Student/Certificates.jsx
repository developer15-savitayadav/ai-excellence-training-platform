import { useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Award,
    BadgeCheck,
    CalendarDays,
    Download,
    ExternalLink,
    GraduationCap,
    Search,
    ShieldCheck,
    ShieldX,
} from 'lucide-react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import PageHeader from '../../Components/dashboard/PageHeader';
import StatCard from '../../Components/dashboard/StatCard';
import Panel from '../../Components/dashboard/Panel';
import StatusPill from '../../Components/dashboard/StatusPill';
import { inputCls } from '../../Components/dashboard/Form';

const FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'revoked', label: 'Revoked' },
    { key: 'expired', label: 'Expired' },
];

export default function Certificates({ certificates, stats }) {
    const [filter, setFilter] = useState('all');
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        const term = query.trim().toLowerCase();
        return certificates.filter((c) => {
            const matchesFilter = filter === 'all' || c.status === filter;
            const matchesQuery =
                term === '' ||
                c.courseTitle.toLowerCase().includes(term) ||
                c.code.toLowerCase().includes(term) ||
                (c.instructorName || '').toLowerCase().includes(term);
            return matchesFilter && matchesQuery;
        });
    }, [certificates, filter, query]);

    return (
        <DashboardLayout title="Certificates">
            <Head title="My Certificates" />

            <div className="space-y-6">
                <PageHeader
                    eyebrow="Achievements"
                    title="My Certificates"
                    description="Download your signed PDF certificates or share a public verification link."
                />

                <div className="grid gap-4 sm:grid-cols-3">
                    <StatCard stat={{ label: 'Certificates earned', value: stats.total, icon: 'award', accent: 'gold', hint: 'Across all courses' }} />
                    <StatCard stat={{ label: 'Active', value: stats.active, icon: 'check', accent: 'emerald', hint: 'Valid and verifiable' }} />
                    <StatCard stat={{ label: 'Revoked', value: stats.revoked, icon: 'userX', accent: 'rose', hint: 'Contact support if unexpected' }} />
                </div>

                <div className="flex flex-col gap-3 rounded-2xl border border-black/[0.07] bg-white p-3 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by course, code or instructor"
                            className={`${inputCls} pl-10`}
                        />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {FILTERS.map((f) => (
                            <button
                                key={f.key}
                                type="button"
                                onClick={() => setFilter(f.key)}
                                className={`h-10 rounded-xl px-3.5 text-sm font-semibold transition-colors ${
                                    filter === f.key
                                        ? 'bg-body text-white'
                                        : 'border border-black/[0.08] text-muted hover:border-black/20 hover:text-body'
                                }`}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/[0.07] bg-white px-6 py-16 text-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f7ecd2] text-[#a47a22]">
                            <Award className="h-6 w-6" />
                        </span>
                        <div>
                            <p className="font-display font-semibold text-body">
                                {certificates.length === 0 ? 'No certificates yet' : 'Nothing matches those filters'}
                            </p>
                            <p className="mt-1 text-sm text-muted">
                                {certificates.length === 0
                                    ? 'Complete a course and your certificate will appear here automatically.'
                                    : 'Try a different status or search term.'}
                            </p>
                        </div>
                        {certificates.length === 0 && (
                            <Link href="/my-learning" className="mt-1 inline-flex h-9 items-center rounded-lg bg-body px-3.5 text-xs font-semibold text-white">
                                Go to My Learning
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid gap-4 lg:grid-cols-2">
                        {filtered.map((c) => (
                            <article key={c.uuid} className="relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
                                <div className="h-1.5 bg-gradient-to-r from-violet via-[#eec369] to-lime" />

                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3">
                                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f7ecd2] text-[#a47a22]">
                                                <GraduationCap className="h-5 w-5" />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                                                    Certificate of completion
                                                </p>
                                                <h3 className="mt-1 line-clamp-2 font-display text-base font-semibold text-body">
                                                    {c.courseTitle}
                                                </h3>
                                            </div>
                                        </div>
                                        <StatusPill status={c.status} />
                                    </div>

                                    <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-xs sm:grid-cols-3">
                                        <div>
                                            <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Code</dt>
                                            <dd className="mt-0.5 font-mono text-[11px] font-semibold text-body">{c.code}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Issued</dt>
                                            <dd className="mt-0.5 text-body">{c.issuedAt}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Instructor</dt>
                                            <dd className="mt-0.5 truncate text-body">{c.instructorName || '—'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Duration</dt>
                                            <dd className="mt-0.5 text-body">{c.duration || 'Self-paced'}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Grade</dt>
                                            <dd className="mt-0.5 text-body">
                                                {c.grade || (c.score != null ? `${c.score}%` : 'Pass')}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Expires</dt>
                                            <dd className="mt-0.5 text-body">{c.expiresAt || 'No expiry'}</dd>
                                        </div>
                                    </dl>

                                    {c.status === 'revoked' && (
                                        <div className="mt-4 flex items-start gap-2 rounded-xl bg-rose-50 p-3 text-xs text-rose-700">
                                            <ShieldX className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                                            <p>
                                                {c.revokedReason || 'This certificate was revoked by the academy.'} Contact support
                                                if you believe this is a mistake.
                                            </p>
                                        </div>
                                    )}

                                    <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-black/[0.06] pt-4">
                                        {c.status === 'active' ? (
                                            <a
                                                href={c.downloadUrl}
                                                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-body px-3 text-xs font-semibold text-white hover:bg-body/90"
                                            >
                                                <Download className="h-3.5 w-3.5" /> Download PDF
                                            </a>
                                        ) : (
                                            <span className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-black/[0.08] px-3 text-xs font-semibold text-muted">
                                                <ShieldX className="h-3.5 w-3.5" /> Download unavailable
                                            </span>
                                        )}

                                        <a
                                            href={c.verifyUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-black/[0.1] px-3 text-xs font-semibold text-body hover:bg-black/[0.03]"
                                        >
                                            <ExternalLink className="h-3.5 w-3.5" /> Public verification
                                        </a>

                                        {c.courseSlug && (
                                            <Link
                                                href={`/courses/${c.courseSlug}`}
                                                className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-violet hover:underline"
                                            >
                                                Course page
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                <Panel title="How verification works" description="Anyone can confirm your achievement in seconds.">
                    <ul className="grid gap-4 sm:grid-cols-3">
                        <Step
                            icon={BadgeCheck}
                            title="Unique code"
                            text="Every certificate has a tamper-evident, HMAC-signed code."
                        />
                        <Step
                            icon={CalendarDays}
                            title="Live status"
                            text="The verification page always reports the current status: active, revoked or expired."
                        />
                        <Step
                            icon={ShieldCheck}
                            title="Privacy first"
                            text="Public verification shows only the details needed to confirm the credential."
                        />
                    </ul>
                </Panel>
            </div>
        </DashboardLayout>
    );
}

function Step({ icon: Icon, title, text }) {
    return (
        <li className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black/[0.04] text-muted">
                <Icon className="h-4 w-4" />
            </span>
            <div>
                <p className="text-sm font-semibold text-body">{title}</p>
                <p className="mt-0.5 text-xs text-muted">{text}</p>
            </div>
        </li>
    );
}
