import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { CalendarRange, Download, FileSpreadsheet, RotateCcw } from 'lucide-react';
import DashboardLayout from '../../../Layouts/DashboardLayout';
import PageHeader from '../../../Components/dashboard/PageHeader';
import StatCard from '../../../Components/dashboard/StatCard';
import Panel from '../../../Components/dashboard/Panel';
import DataTable from '../../../Components/dashboard/DataTable';
import StatusPill from '../../../Components/dashboard/StatusPill';
import { LineChart, BarChart, DonutChart, HorizontalBars } from '../../../Components/dashboard/Charts';
import { Field, inputCls } from '../../../Components/dashboard/Form';
import ProgressBar from '../../../Components/ui/ProgressBar';

const EXPORTS = [
    { type: 'students', label: 'Students' },
    { type: 'enrollments', label: 'Enrolments' },
    { type: 'certificates', label: 'Certificates' },
    { type: 'enquiries', label: 'Enquiries' },
];

export default function Index({ range, stats, charts, courses, recentEnrollments }) {
    const [from, setFrom] = useState(range.from);
    const [to, setTo] = useState(range.to);

    const applyRange = (e) => {
        e.preventDefault();
        router.get('/admin/reports', { from, to }, { preserveState: true, preserveScroll: true, replace: true });
    };

    const resetRange = () => {
        router.get('/admin/reports', {}, { preserveScroll: true, replace: true });
    };

    const exportUrl = (type) => `/admin/reports/export/${type}?from=${encodeURIComponent(range.from)}&to=${encodeURIComponent(range.to)}`;

    const courseRows = courses.map((c) => ({
        ...c,
        avgProgress: Number(c.avgProgress) || 0,
    }));

    const courseColumns = [
        {
            key: 'title',
            label: 'Course',
            render: (row) => (
                <div className="min-w-0">
                    <p className="truncate font-medium text-body">{row.title}</p>
                    <p className="text-xs capitalize text-muted">{row.category || '—'}</p>
                </div>
            ),
        },
        { key: 'enrollments', label: 'Enrolments', render: (row) => <span className="font-semibold text-body">{row.enrollments}</span> },
        { key: 'certificates', label: 'Certificates', render: (row) => <span className="text-muted">{row.certificates}</span> },
        {
            key: 'avgProgress',
            label: 'Avg. progress',
            render: (row) => (
                <div className="w-32">
                    <ProgressBar value={row.avgProgress} showLabel />
                </div>
            ),
        },
    ];

    const recentColumns = [
        {
            key: 'student',
            label: 'Student',
            render: (row) => (
                <div className="min-w-0">
                    <p className="truncate font-medium text-body">{row.student}</p>
                    <p className="truncate text-xs text-muted">{row.course}</p>
                </div>
            ),
        },
        {
            key: 'progress',
            label: 'Progress',
            render: (row) => (
                <div className="w-28">
                    <ProgressBar value={row.progress} showLabel />
                </div>
            ),
        },
        { key: 'status', label: 'Status', render: (row) => <StatusPill status={row.status} /> },
        { key: 'enrolledAt', label: 'Enrolled', render: (row) => <span className="text-xs text-muted">{row.enrolledAt || '—'}</span> },
    ];

    return (
        <DashboardLayout title="Reports">
            <Head title="Reports" />

            <div className="space-y-6">
                <PageHeader
                    eyebrow="Analytics"
                    title="Reports"
                    description={`Performance for ${formatDate(range.from)} – ${formatDate(range.to)}. Every figure is calculated from live records.`}
                    actions={
                        <a
                            href="/admin/dashboard"
                            className="inline-flex h-10 items-center gap-2 rounded-xl border border-black/[0.1] bg-white px-3.5 text-sm font-semibold text-body hover:bg-black/[0.03]"
                        >
                            Back to dashboard
                        </a>
                    }
                />

                <div className="rounded-2xl border border-black/[0.07] bg-white p-4">
                    <form onSubmit={applyRange} className="flex flex-col gap-3 lg:flex-row lg:items-end">
                        <div className="flex items-center gap-2 text-muted">
                            <CalendarRange className="h-4 w-4" />
                            <span className="text-xs font-semibold uppercase tracking-[0.12em]">Date range</span>
                        </div>
                        <Field label="From" className="lg:w-48">
                            <input type="date" value={from} max={to} onChange={(e) => setFrom(e.target.value)} className={inputCls} />
                        </Field>
                        <Field label="To" className="lg:w-48">
                            <input type="date" value={to} min={from} onChange={(e) => setTo(e.target.value)} className={inputCls} />
                        </Field>
                        <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
                            <button
                                type="submit"
                                className="inline-flex h-11 items-center gap-2 rounded-xl bg-body px-4 text-sm font-semibold text-white hover:bg-body/90"
                            >
                                Apply range
                            </button>
                            <button
                                type="button"
                                onClick={resetRange}
                                className="inline-flex h-11 items-center gap-2 rounded-xl border border-black/[0.1] px-4 text-sm font-semibold text-body hover:bg-black/[0.03]"
                            >
                                <RotateCcw className="h-4 w-4" /> Reset
                            </button>
                        </div>
                    </form>

                    <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-black/[0.06] pt-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                            <Download className="h-3.5 w-3.5" /> Export CSV
                        </span>
                        {EXPORTS.map((item) => (
                            <a
                                key={item.type}
                                href={exportUrl(item.type)}
                                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-black/[0.1] bg-white px-3 text-xs font-semibold text-body hover:border-violet/40 hover:text-violet"
                            >
                                <FileSpreadsheet className="h-3.5 w-3.5" /> {item.label}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard stat={{ label: 'New students', value: stats.students, icon: 'users', accent: 'violet', hint: 'Registered in range' }} />
                    <StatCard stat={{ label: 'Enrolments', value: stats.enrollments, icon: 'layers', accent: 'sky', hint: `${stats.completions} completed` }} />
                    <StatCard stat={{ label: 'Certificates issued', value: stats.certificates, icon: 'award', accent: 'gold', hint: `${stats.activeCertificates} currently active` }} />
                    <StatCard stat={{ label: 'Completion rate', value: stats.completionRate, suffix: '%', decimals: 1, icon: 'target', accent: 'emerald', hint: 'Of enrolments in range' }} />
                </div>

                <div className="grid gap-6 xl:grid-cols-3">
                    <Panel
                        title="Growth trend"
                        description="Students, enrolments and certificates issued per month"
                        className="xl:col-span-2"
                    >
                        {charts.months.length ? (
                            <LineChart
                                labels={charts.months}
                                series={[
                                    { name: 'Enrolments', data: charts.enrollments, color: '#982cdc' },
                                    { name: 'Completions', data: charts.completions, color: '#34d399' },
                                    { name: 'Certificates', data: charts.certificates, color: '#eec369' },
                                ]}
                            />
                        ) : (
                            <p className="py-10 text-center text-sm text-muted">No monthly data in this range.</p>
                        )}
                    </Panel>

                    <Panel title="Enrolment outcomes" description="Status mix for the selected range">
                        <DonutChart
                            data={charts.statuses}
                            centerLabel="enrolments"
                            centerValue={stats.enrollments}
                        />
                        <div className="mt-6 border-t border-black/[0.06] pt-4">
                            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Enquiry pipeline</p>
                            <HorizontalBars data={charts.enquiryStatuses.map((e, i) => ({ ...e, color: ['#38bdf8', '#f59e0b', '#34d399', '#8b8a82'][i] }))} />
                        </div>
                    </Panel>
                </div>

                <div className="grid gap-6 xl:grid-cols-3">
                    <Panel title="New students" description="Monthly registrations" className="xl:col-span-1">
                        {charts.months.length ? (
                            <BarChart labels={charts.months} values={charts.students} color="#982cdc" height={200} />
                        ) : (
                            <p className="py-10 text-center text-sm text-muted">No data.</p>
                        )}
                    </Panel>

                    <Panel title="Certificates" description={`${stats.revokedCertificates} revoked in this range`} className="xl:col-span-2">
                        <div className="grid gap-4 sm:grid-cols-3">
                            <MiniStat label="Issued" value={stats.certificates} tone="violet" />
                            <MiniStat label="Active" value={stats.activeCertificates} tone="emerald" />
                            <MiniStat label="Revoked" value={stats.revokedCertificates} tone="rose" />
                        </div>
                        {charts.months.length ? (
                            <div className="mt-5">
                                <BarChart labels={charts.months} values={charts.certificates} color="#eec369" height={180} />
                            </div>
                        ) : (
                            <p className="py-8 text-center text-sm text-muted">No certificate data.</p>
                        )}
                    </Panel>
                </div>

                <Panel title="Course performance" description="Top courses by enrolments in the selected range" bodyClassName="p-0">
                    <DataTable
                        columns={courseColumns}
                        rows={courseRows}
                        rowKey="id"
                        emptyTitle="No course activity"
                        emptyText="No enrolments were recorded for this range."
                    />
                </Panel>

                <Panel title="Recent enrolments" description="Latest activity in the selected range" bodyClassName="p-0">
                    <DataTable
                        columns={recentColumns}
                        rows={recentEnrollments}
                        rowKey="id"
                        emptyTitle="No recent enrolments"
                        emptyText="Enrolments in this range will show up here."
                    />
                </Panel>
            </div>
        </DashboardLayout>
    );
}

function MiniStat({ label, value, tone }) {
    const tones = {
        violet: 'bg-violet/[0.07] text-violet',
        emerald: 'bg-emerald-50 text-emerald-700',
        rose: 'bg-rose-50 text-rose-600',
    };

    return (
        <div className="rounded-xl border border-black/[0.07] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{label}</p>
            <p className="mt-1.5 font-display text-2xl font-bold text-body">{value}</p>
            <span className={`mt-2 inline-block h-1.5 w-10 rounded-full ${tones[tone]}`} />
        </div>
    );
}

function formatDate(value) {
    if (!value) return '—';
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
}
