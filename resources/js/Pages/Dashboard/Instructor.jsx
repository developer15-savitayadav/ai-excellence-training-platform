import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    BookOpen,
    GraduationCap,
    Star,
    Users,
} from 'lucide-react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import PageHeader from '../../Components/dashboard/PageHeader';
import StatCard from '../../Components/dashboard/StatCard';
import Panel from '../../Components/dashboard/Panel';
import { HorizontalBars, LineChart } from '../../Components/dashboard/Charts';
import StatusPill from '../../Components/dashboard/StatusPill';
import Avatar from '../../Components/ui/Avatar';
import ProgressBar from '../../Components/ui/ProgressBar';

function timeAgo(iso) {
    if (!iso) return '—';
    const seconds = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export default function Instructor({ dashboard, preview = false }) {
    const { instructor, stats, charts, courses, recentEnrollments } = dashboard;

    return (
        <DashboardLayout title="Instructor Dashboard">
            <Head title="Instructor Dashboard" />

            <div className="space-y-6">
                {preview && (
                    <div className="rounded-xl border border-amber-300/60 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-800">
                        Admin preview — showing the instructor workspace for {instructor.name}.
                    </div>
                )}

                <PageHeader
                    eyebrow="Teaching workspace"
                    title={`Hello, ${instructor.name?.split(' ')[0] || 'Instructor'}`}
                    description={`${instructor.title || 'Instructor'}${instructor.specialization ? ` · ${instructor.specialization}` : ''}`}
                    actions={
                        <Link
                            href="/instructor/dashboard#courses"
                            className="inline-flex h-10 items-center gap-2 rounded-xl bg-body px-3.5 text-sm font-semibold text-white transition-colors hover:bg-body/90"
                        >
                            <BookOpen className="h-4 w-4" /> My courses
                        </Link>
                    }
                />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <StatCard key={stat.id} stat={stat} />
                    ))}
                </div>

                <div className="grid gap-5 xl:grid-cols-3">
                    <Panel
                        className="xl:col-span-2"
                        title="Enrolment trend"
                        description="New enrolments and completions across your courses."
                    >
                        <LineChart
                            labels={charts.months}
                            height={240}
                            series={[
                                { name: 'Enrolments', data: charts.enrollments, color: '#982cdc' },
                                { name: 'Completions', data: charts.completions, color: '#34d399' },
                            ]}
                        />
                    </Panel>

                    <div className="space-y-5">
                        <Panel title="Instructor profile" description="Public teaching profile.">
                            <div className="flex items-center gap-3">
                                <Avatar name={instructor.name} src={instructor.avatar} size="lg" />
                                <div className="min-w-0">
                                    <p className="font-display font-semibold text-body">{instructor.name}</p>
                                    <p className="text-xs text-muted">{instructor.title || 'Instructor'}</p>
                                    <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-body">
                                        <Star className="h-3.5 w-3.5 fill-lime text-lime" />
                                        {instructor.rating ? instructor.rating.toFixed(1) : 'New'}
                                    </p>
                                </div>
                            </div>
                            {instructor.specialization && (
                                <p className="mt-4 text-sm text-muted">{instructor.specialization}</p>
                            )}
                            {instructor.slug && (
                                <Link href={`/instructors/${instructor.slug}`} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-violet hover:underline">
                                    View public profile <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            )}
                        </Panel>

                        <Panel title="Students per course" description="Where your learners are concentrated.">
                            <HorizontalBars data={charts.courseDistribution} />
                        </Panel>
                    </div>
                </div>

                <div id="courses" className="scroll-mt-24">
                    <Panel
                        title="My courses"
                        description="Performance for each course you teach."
                        bodyClassName="p-0"
                        action={
                            <Link href="/admin/courses" className="inline-flex items-center gap-1 text-xs font-semibold text-violet hover:underline">
                                Manage catalogue <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        }
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[680px] text-left text-sm">
                                <thead>
                                    <tr className="border-b border-black/[0.06] bg-black/[0.02] text-[11px] uppercase tracking-[0.12em] text-muted">
                                        <th className="px-5 py-3 font-semibold">Course</th>
                                        <th className="px-4 py-3 font-semibold">Status</th>
                                        <th className="px-4 py-3 font-semibold">Students</th>
                                        <th className="px-4 py-3 font-semibold">Rating</th>
                                        <th className="px-4 py-3 font-semibold">Level</th>
                                        <th className="px-4 py-3" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course) => (
                                        <tr key={course.id} className="border-b border-black/[0.05] last:border-0 hover:bg-black/[0.015]">
                                            <td className="px-5 py-3.5">
                                                <p className="font-medium text-body">{course.title}</p>
                                                <p className="text-xs text-muted">{course.category || 'Uncategorised'}</p>
                                            </td>
                                            <td className="px-4 py-3.5"><StatusPill status={course.status} /></td>
                                            <td className="px-4 py-3.5 font-semibold text-body">{course.enrollments}</td>
                                            <td className="px-4 py-3.5 text-muted">{course.rating ? course.rating.toFixed(1) : '—'}</td>
                                            <td className="px-4 py-3.5 text-muted">{course.level || '—'}</td>
                                            <td className="px-4 py-3.5 text-right">
                                                <Link href={`/courses/${course.slug}`} className="text-xs font-semibold text-violet hover:underline">View</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {courses.length === 0 && <p className="py-10 text-center text-sm text-muted">No courses are assigned to you yet.</p>}
                        </div>
                    </Panel>
                </div>

                <div id="students" className="scroll-mt-24">
                    <Panel title="Recent students" description="Latest learners joining your courses." bodyClassName="p-0">
                        <ul className="divide-y divide-black/[0.05]">
                            {recentEnrollments.map((e) => (
                                <li key={e.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
                                    <Avatar name={e.student} size="sm" />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-body">{e.student}</p>
                                        <p className="truncate text-xs text-muted">{e.course}</p>
                                    </div>
                                    <div className="w-32 shrink-0">
                                        <ProgressBar value={e.progress} showLabel />
                                    </div>
                                    <StatusPill status={e.status} />
                                    <span className="w-20 shrink-0 text-right text-[11px] text-muted">{timeAgo(e.createdAt)}</span>
                                </li>
                            ))}
                        </ul>
                        {recentEnrollments.length === 0 && <p className="py-10 text-center text-sm text-muted">No students yet.</p>}
                    </Panel>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    {[
                        { label: 'Unique learners', value: stats[0]?.value ?? 0, icon: Users },
                        { label: 'Published courses', value: courses.filter((c) => c.status === 'published').length, icon: BookOpen },
                        { label: 'Active certificates', value: stats[2]?.value ?? 0, icon: Award },
                    ].map((item) => (
                        <div key={item.label} className="flex items-center gap-3 rounded-2xl border border-black/[0.07] bg-white p-4">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet/[0.07] text-violet">
                                <item.icon className="h-5 w-5" />
                            </span>
                            <div>
                                <p className="font-display text-lg font-bold text-body">{item.value}</p>
                                <p className="text-xs text-muted">{item.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-center gap-2 rounded-2xl border border-black/[0.07] bg-white px-4 py-3 text-xs text-muted">
                    <GraduationCap className="h-4 w-4 text-violet" />
                    Student progress updates are reflected here in real time.
                </div>
            </div>
        </DashboardLayout>
    );
}
