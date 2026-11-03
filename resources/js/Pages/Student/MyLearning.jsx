import { useMemo, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    BookOpen,
    CheckCircle2,
    Clock3,
    Compass,
    Download,
    Play,
    Search,
    Trash2,
} from 'lucide-react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import PageHeader from '../../Components/dashboard/PageHeader';
import StatCard from '../../Components/dashboard/StatCard';
import Panel from '../../Components/dashboard/Panel';
import StatusPill from '../../Components/dashboard/StatusPill';
import ConfirmDialog from '../../Components/dashboard/ConfirmDialog';
import ProgressBar from '../../Components/ui/ProgressBar';
import { inputCls } from '../../Components/dashboard/Form';

const FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'In progress' },
    { key: 'completed', label: 'Completed' },
    { key: 'dropped', label: 'Dropped' },
];

export default function MyLearning({ enrollments, stats }) {
    const [filter, setFilter] = useState('all');
    const [query, setQuery] = useState('');
    const [leaving, setLeaving] = useState(null);
    const [completing, setCompleting] = useState(null);

    const filtered = useMemo(() => {
        const term = query.trim().toLowerCase();
        return enrollments.filter((e) => {
            const matchesFilter = filter === 'all' || e.status === filter;
            const matchesQuery =
                term === '' ||
                (e.course?.title || '').toLowerCase().includes(term) ||
                (e.course?.category || '').toLowerCase().includes(term) ||
                (e.course?.instructor || '').toLowerCase().includes(term);
            return matchesFilter && matchesQuery;
        });
    }, [enrollments, filter, query]);

    const markComplete = (enrollment) => {
        setCompleting(enrollment.id);
        router.patch(
            `/enrollments/${enrollment.id}`,
            { progress: 100, status: 'completed' },
            {
                preserveScroll: true,
                onFinish: () => setCompleting(null),
            },
        );
    };

    const leaveCourse = () => {
        router.delete(`/enrollments/${leaving.id}`, {
            preserveScroll: true,
            onSuccess: () => setLeaving(null),
        });
    };

    return (
        <DashboardLayout title="My Learning">
            <Head title="My Learning" />

            <div className="space-y-6">
                <PageHeader
                    eyebrow="Learning"
                    title="My Learning"
                    description="Every course you are enrolled in, with live progress and your next step."
                    actions={
                        <Link
                            href="/courses"
                            className="inline-flex h-10 items-center gap-2 rounded-xl bg-body px-3.5 text-sm font-semibold text-white hover:bg-body/90"
                        >
                            <Compass className="h-4 w-4" /> Find a course
                        </Link>
                    }
                />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard stat={{ label: 'Enrolled courses', value: stats.total, icon: 'book', accent: 'violet', hint: 'Across the catalogue' }} />
                    <StatCard stat={{ label: 'In progress', value: stats.active, icon: 'clock', accent: 'sky', hint: 'Keep the momentum' }} />
                    <StatCard stat={{ label: 'Completed', value: stats.completed, icon: 'check', accent: 'emerald', hint: 'Certificates available' }} />
                    <StatCard stat={{ label: 'Hours learned', value: stats.hours, icon: 'target', accent: 'gold', hint: 'Tracked across courses' }} />
                </div>

                <div className="flex flex-col gap-3 rounded-2xl border border-black/[0.07] bg-white p-3 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search your courses"
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
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-violet/[0.07] text-violet">
                            <BookOpen className="h-6 w-6" />
                        </span>
                        <div>
                            <p className="font-display font-semibold text-body">
                                {enrollments.length === 0 ? 'No courses yet' : 'No courses match your filters'}
                            </p>
                            <p className="mt-1 text-sm text-muted">
                                {enrollments.length === 0
                                    ? 'Explore the catalogue and enrol in your first course.'
                                    : 'Try a different filter or search term.'}
                            </p>
                        </div>
                        {enrollments.length === 0 && (
                            <Link href="/courses" className="mt-1 inline-flex h-9 items-center rounded-lg bg-body px-3.5 text-xs font-semibold text-white">
                                Explore courses
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {filtered.map((e) => {
                            const course = e.course;
                            return (
                                <article
                                    key={e.id}
                                    className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white transition-all hover:-translate-y-0.5 hover:border-black/[0.14] hover:shadow-[0_18px_40px_-28px_rgba(35,35,30,0.4)]"
                                >
                                    <div className="relative h-32 overflow-hidden bg-gradient-to-br from-violet/20 via-lilac/40 to-lime/20">
                                        {course?.image ? (
                                            <img
                                                src={course.image}
                                                alt=""
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                                onError={(ev) => {
                                                    ev.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        ) : null}
                                        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
                                            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-body backdrop-blur">
                                                {course?.category || 'Course'}
                                            </span>
                                            <StatusPill status={e.status} />
                                        </div>
                                    </div>

                                    <div className="flex flex-1 flex-col p-4">
                                        <h3 className="line-clamp-2 font-display text-base font-semibold text-body">
                                            {course?.title || 'Course removed'}
                                        </h3>
                                        <p className="mt-1 text-xs text-muted">
                                            {[course?.instructor, course?.duration, course?.level].filter(Boolean).join(' · ') || 'Self-paced'}
                                        </p>

                                        <div className="mt-4 space-y-1.5">
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-muted">{e.progress}% complete</span>
                                                <span className="inline-flex items-center gap-1 text-muted">
                                                    <Clock3 className="h-3 w-3" /> {e.hoursCompleted} hrs
                                                </span>
                                            </div>
                                            <ProgressBar value={e.progress} />
                                        </div>

                                        <p className="mt-3 text-[11px] text-muted">
                                            {e.status === 'completed'
                                                ? `Completed ${e.completedAt || ''}`
                                                : e.lastAccessedAt
                                                  ? `Last active ${e.lastAccessedAt}`
                                                  : 'Not started yet'}
                                        </p>

                                        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-black/[0.06] pt-4">
                                            {course && e.status !== 'dropped' && (
                                                <Link
                                                    href={`/learn/${course.slug}`}
                                                    className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-body px-3 text-xs font-semibold text-white hover:bg-body/90"
                                                >
                                                    {e.progress > 0 ? (
                                                        <>
                                                            <Play className="h-3.5 w-3.5" /> Resume
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Play className="h-3.5 w-3.5" /> Start course
                                                        </>
                                                    )}
                                                </Link>
                                            )}

                                            {e.certificate && (
                                                <a
                                                    href={`/certificates/${e.certificate.uuid}/download`}
                                                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-black/[0.1] px-2.5 text-xs font-semibold text-body hover:bg-black/[0.03]"
                                                    title={`Download certificate ${e.certificate.code}`}
                                                >
                                                    <Download className="h-3.5 w-3.5" /> Certificate
                                                </a>
                                            )}

                                            {e.status === 'active' && e.progress < 100 && (
                                                <button
                                                    type="button"
                                                    onClick={() => markComplete(e)}
                                                    disabled={completing === e.id}
                                                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-emerald-200 px-2.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 disabled:opacity-60"
                                                    title="Mark this course as complete"
                                                >
                                                    <CheckCircle2 className="h-3.5 w-3.5" /> {completing === e.id ? 'Saving…' : 'Complete'}
                                                </button>
                                            )}

                                            <button
                                                type="button"
                                                onClick={() => setLeaving(e)}
                                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.1] text-muted hover:border-rose-200 hover:bg-rose-50 hover:text-danger"
                                                aria-label={`Leave ${course?.title || 'course'}`}
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}

                <Panel title="Earn certificates as you go" description="Complete a course to unlock a verified certificate automatically.">
                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7ecd2] text-[#a47a22]">
                                <Award className="h-5 w-5" />
                            </span>
                            <p className="text-sm text-muted">
                                Your certificates are signed, downloadable and publicly verifiable.
                            </p>
                        </div>
                        <Link
                            href="/my-certificates"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-violet hover:underline"
                        >
                            View certificates <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </Panel>
            </div>

            <ConfirmDialog
                open={!!leaving}
                onClose={() => setLeaving(null)}
                onConfirm={leaveCourse}
                title="Leave this course?"
                description="You will lose access to the lessons. Completed certificates are kept."
                confirmLabel="Leave course"
            >
                <p>
                    You will be removed from{' '}
                    <strong className="text-body">{leaving?.course?.title || 'this course'}</strong>. You can re-enrol later.
                </p>
            </ConfirmDialog>
        </DashboardLayout>
    );
}
