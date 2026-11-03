import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    BookOpen,
    CalendarDays,
    Download,
    Layers,
    MessageSquare,
    Plus,
    Sparkles,
    Users,
} from 'lucide-react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import PageHeader from '../../Components/dashboard/PageHeader';
import StatCard from '../../Components/dashboard/StatCard';
import Panel from '../../Components/dashboard/Panel';
import { DonutChart, HorizontalBars, LineChart } from '../../Components/dashboard/Charts';
import StatusPill from '../../Components/dashboard/StatusPill';
import Avatar from '../../Components/ui/Avatar';

function timeAgo(iso) {
    if (!iso) return '—';
    const seconds = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function EmptyRow({ children }) {
    return <p className="py-8 text-center text-sm text-muted">{children}</p>;
}

export default function Admin({ dashboard }) {
    const { stats, secondary, charts, coursePerformance, latestEnrollments, latestEnquiries, recentActivity } = dashboard;

    return (
        <DashboardLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                <PageHeader
                    eyebrow={new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                    title="Platform overview"
                    description="Live enrolment, learner and certification activity across the academy."
                    actions={
                        <>
                            <Link
                                href="/admin/reports"
                                className="inline-flex h-10 items-center gap-2 rounded-xl border border-black/[0.1] bg-white px-3.5 text-sm font-semibold text-body transition-colors hover:bg-black/[0.03]"
                            >
                                <Download className="h-4 w-4" /> Reports
                            </Link>
                            <Link
                                href="/admin/certificates"
                                className="inline-flex h-10 items-center gap-2 rounded-xl bg-body px-3.5 text-sm font-semibold text-white transition-colors hover:bg-body/90"
                            >
                                <Award className="h-4 w-4" /> Issue certificate
                            </Link>
                        </>
                    }
                />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <StatCard key={stat.id} stat={stat} />
                    ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {secondary.map((stat) => (
                        <StatCard key={stat.label} stat={stat} compact />
                    ))}
                </div>

                <div className="grid gap-5 xl:grid-cols-3">
                    <Panel
                        className="xl:col-span-2"
                        title="Growth & outcomes"
                        description="Enrolments, completions and certificates over the last 12 months."
                        action={
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet/[0.07] px-2.5 py-1 text-[11px] font-semibold text-violet">
                                <Sparkles className="h-3.5 w-3.5" /> Live data
                            </span>
                        }
                    >
                        <LineChart
                            labels={charts.months}
                            height={260}
                            series={[
                                { name: 'Enrolments', data: charts.enrollments, color: '#982cdc' },
                                { name: 'Completions', data: charts.completions, color: '#34d399' },
                                { name: 'Certificates', data: charts.certificates, color: '#eec369' },
                            ]}
                        />
                    </Panel>

                    <div className="space-y-5">
                        <Panel title="Certificate health" description="Current certificate statuses.">
                            <DonutChart
                                data={charts.certificateStatus}
                                size={150}
                                thickness={18}
                                centerLabel="total"
                            />
                        </Panel>
                        <Panel title="Course tiers" description="Published catalogue mix.">
                            <HorizontalBars data={charts.tiers} />
                        </Panel>
                    </div>
                </div>

                <div className="grid gap-5 xl:grid-cols-3">
                    <Panel
                        className="xl:col-span-2"
                        title="Course performance"
                        description="Top courses ranked by enrolments."
                        action={
                            <Link href="/admin/courses" className="inline-flex items-center gap-1 text-xs font-semibold text-violet hover:underline">
                                All courses <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        }
                        bodyClassName="p-0"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[640px] text-left text-sm">
                                <thead>
                                    <tr className="border-b border-black/[0.06] bg-black/[0.02] text-[11px] uppercase tracking-[0.12em] text-muted">
                                        <th className="px-5 py-3 font-semibold">Course</th>
                                        <th className="px-4 py-3 font-semibold">Instructor</th>
                                        <th className="px-4 py-3 font-semibold">Enrolments</th>
                                        <th className="px-4 py-3 font-semibold">Avg. progress</th>
                                        <th className="px-4 py-3 font-semibold">Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coursePerformance.map((course) => (
                                        <tr key={course.id} className="border-b border-black/[0.05] last:border-0 hover:bg-black/[0.015]">
                                            <td className="px-5 py-3.5">
                                                <p className="font-medium text-body">{course.title}</p>
                                                <p className="text-xs text-muted">{course.category || 'Uncategorised'}</p>
                                            </td>
                                            <td className="px-4 py-3.5 text-muted">{course.instructor || '—'}</td>
                                            <td className="px-4 py-3.5 font-semibold text-body">{course.enrollments}</td>
                                            <td className="px-4 py-3.5">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-black/[0.06]">
                                                        <div className="h-full rounded-full bg-violet" style={{ width: `${Math.min(100, course.avgProgress)}%` }} />
                                                    </div>
                                                    <span className="text-xs text-muted">{course.avgProgress}%</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-muted">{course.rating ? course.rating.toFixed(1) : '—'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {coursePerformance.length === 0 && <EmptyRow>No course data yet.</EmptyRow>}
                        </div>
                    </Panel>

                    <Panel
                        title="Recent activity"
                        description="Latest platform events."
                        action={<Link href="/admin/reports" className="text-xs font-semibold text-violet hover:underline">Reports</Link>}
                    >
                        <ol className="relative space-y-4 before:absolute before:bottom-1 before:left-[7px] before:top-1 before:w-px before:bg-black/[0.08]">
                            {recentActivity.slice(0, 8).map((item) => (
                                <li key={item.id} className="relative flex gap-3 pl-6">
                                    <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-violet shadow-[0_0_0_1px_rgba(152,44,220,0.25)]" />
                                    <div className="min-w-0">
                                        <p className="text-sm leading-snug text-body">{item.description}</p>
                                        <p className="mt-0.5 text-[11px] text-muted">{timeAgo(item.createdAt)}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        {recentActivity.length === 0 && <EmptyRow>No activity recorded yet.</EmptyRow>}
                    </Panel>
                </div>

                <div className="grid gap-5 xl:grid-cols-2">
                    <Panel
                        title="Latest enrolments"
                        description="Most recent student course registrations."
                        action={<Link href="/admin/enrollments" className="inline-flex items-center gap-1 text-xs font-semibold text-violet hover:underline">Manage <ArrowRight className="h-3.5 w-3.5" /></Link>}
                        bodyClassName="p-0"
                    >
                        <ul className="divide-y divide-black/[0.05]">
                            {latestEnrollments.map((e) => (
                                <li key={e.id} className="flex items-center gap-3 px-5 py-3.5">
                                    <Avatar name={e.student} size="sm" />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-body">{e.student}</p>
                                        <p className="truncate text-xs text-muted">{e.course}</p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <StatusPill status={e.status} />
                                        <p className="mt-1 text-[11px] text-muted">{timeAgo(e.createdAt)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {latestEnrollments.length === 0 && <EmptyRow>No enrolments yet.</EmptyRow>}
                    </Panel>

                    <Panel
                        title="Latest enquiries"
                        description="Prospective students needing follow-up."
                        action={<Link href="/admin/enquiries" className="inline-flex items-center gap-1 text-xs font-semibold text-violet hover:underline">Inbox <ArrowRight className="h-3.5 w-3.5" /></Link>}
                        bodyClassName="p-0"
                    >
                        <ul className="divide-y divide-black/[0.05]">
                            {latestEnquiries.map((e) => (
                                <li key={e.id} className="flex items-center gap-3 px-5 py-3.5">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                        <MessageSquare className="h-4 w-4" />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-body">{e.name}</p>
                                        <p className="truncate text-xs text-muted">{e.program || 'General enquiry'}</p>
                                    </div>
                                    <div className="shrink-0 text-right">
                                        <StatusPill status={e.status} />
                                        <p className="mt-1 text-[11px] text-muted">{timeAgo(e.createdAt)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        {latestEnquiries.length === 0 && <EmptyRow>No enquiries yet.</EmptyRow>}
                    </Panel>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { href: '/admin/courses', label: 'Create a course', desc: 'Add to the catalogue', icon: BookOpen },
                        { href: '/admin/students', label: 'Manage students', desc: 'Roles & access', icon: Users },
                        { href: '/admin/enrollments', label: 'Enrol a student', desc: 'Assign a course', icon: Layers },
                        { href: '/admin/reports', label: 'Download reports', desc: 'CSV exports', icon: CalendarDays },
                    ].map((action) => (
                        <Link
                            key={action.href}
                            href={action.href}
                            className="group flex items-center gap-3 rounded-2xl border border-dashed border-black/[0.12] bg-white/60 p-4 transition-colors hover:border-violet/40 hover:bg-white"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] text-muted transition-colors group-hover:bg-violet/[0.08] group-hover:text-violet">
                                <action.icon className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-sm font-semibold text-body">{action.label}</span>
                                <span className="block text-xs text-muted">{action.desc}</span>
                            </span>
                            <Plus className="ml-auto h-4 w-4 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
