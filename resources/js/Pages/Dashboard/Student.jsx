import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    BookOpen,
    CheckCircle2,
    Clock3,
    Download,
    ExternalLink,
    Flame,
    Heart,
    Search,
    Sparkles,
    Star,
} from 'lucide-react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import PageHeader from '../../Components/dashboard/PageHeader';
import StatCard from '../../Components/dashboard/StatCard';
import Panel from '../../Components/dashboard/Panel';
import StatusPill from '../../Components/dashboard/StatusPill';
import ProgressBar from '../../Components/ui/ProgressBar';
import Avatar from '../../Components/ui/Avatar';

function timeAgo(iso) {
    if (!iso) return '—';
    const seconds = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

const activityIcons = {
    enrollment: BookOpen,
    completion: CheckCircle2,
    certificate: Award,
};

export default function Student({ dashboard }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const { stats, enrollments, certificates, notifications, recommendations, wishlist, recentActivity } = dashboard;
    const wishlistIds = new Set(wishlist.map((c) => c.id));

    const toggleWishlist = (course) => {
        if (wishlistIds.has(course.id)) {
            router.delete(`/wishlist/${course.slug}`, { preserveScroll: true });
        } else {
            router.post(`/wishlist/${course.slug}`, {}, { preserveScroll: true });
        }
    };

    const firstName = user?.name?.split(' ')[0] || 'there';
    const activeEnrollments = enrollments.filter((e) => e.status !== 'dropped');

    return (
        <DashboardLayout title="Dashboard">
            <Head title="Student Dashboard" />

            <div className="space-y-6">
                <PageHeader
                    eyebrow={new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                    title={`Welcome back, ${firstName}`}
                    description="Pick up where you left off, track your progress and collect your certificates."
                    actions={
                        <Link
                            href="/courses"
                            className="inline-flex h-10 items-center gap-2 rounded-xl bg-body px-3.5 text-sm font-semibold text-white transition-colors hover:bg-body/90"
                        >
                            <Search className="h-4 w-4" /> Browse courses
                        </Link>
                    }
                />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <StatCard key={stat.id} stat={stat} />
                    ))}
                </div>

                <div className="grid gap-5 xl:grid-cols-3">
                    <div className="space-y-5 xl:col-span-2">
                        <Panel
                            title="Continue learning"
                            description="Your enrolled courses and current progress."
                            action={<Link href="/my-learning" className="inline-flex items-center gap-1 text-xs font-semibold text-violet hover:underline">All courses <ArrowRight className="h-3.5 w-3.5" /></Link>}
                            bodyClassName="p-4 sm:p-5"
                        >
                            <div className="grid gap-3 md:grid-cols-2">
                                {activeEnrollments.slice(0, 4).map((e) => (
                                    <article key={e.id} className="group rounded-xl border border-black/[0.07] p-4 transition-colors hover:border-black/[0.14]">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">{e.course?.category || 'Course'}</p>
                                                <h3 className="mt-1 line-clamp-2 font-display text-sm font-semibold text-body">{e.course?.title}</h3>
                                            </div>
                                            <StatusPill status={e.status} />
                                        </div>

                                        <div className="mt-4 space-y-1.5">
                                            <div className="flex items-center justify-between text-xs text-muted">
                                                <span>{e.progress}% complete</span>
                                                <span>{e.hoursCompleted} hrs</span>
                                            </div>
                                            <ProgressBar value={e.progress} />
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <span className="text-[11px] text-muted">
                                                {e.lastAccessedAt ? `Active ${e.lastAccessedAt}` : 'Not started yet'}
                                            </span>
                                            <Link
                                                href={e.course ? `/learn/${e.course.slug}` : '/my-learning'}
                                                className="inline-flex items-center gap-1 text-xs font-semibold text-violet hover:underline"
                                            >
                                                {e.progress > 0 ? 'Resume' : 'Start'} <ArrowRight className="h-3.5 w-3.5" />
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                            {activeEnrollments.length === 0 && (
                                <div className="flex flex-col items-center gap-3 py-10 text-center">
                                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-violet/[0.07] text-violet">
                                        <BookOpen className="h-6 w-6" />
                                    </span>
                                    <div>
                                        <p className="font-display font-semibold text-body">No courses yet</p>
                                        <p className="mt-1 text-sm text-muted">Browse the catalogue and enrol in your first course.</p>
                                    </div>
                                    <Link href="/courses" className="mt-1 inline-flex h-9 items-center rounded-lg bg-body px-3 text-xs font-semibold text-white">Explore courses</Link>
                                </div>
                            )}
                        </Panel>

                        <Panel
                            title="Certificates"
                            description="Your verified achievements."
                            action={<Link href="/my-certificates" className="inline-flex items-center gap-1 text-xs font-semibold text-violet hover:underline">All certificates <ArrowRight className="h-3.5 w-3.5" /></Link>}
                            bodyClassName="p-0"
                        >
                            <ul className="divide-y divide-black/[0.05]">
                                {certificates.slice(0, 4).map((c) => (
                                    <li key={c.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f7ecd2] text-[#a47a22]">
                                            <Award className="h-5 w-5" />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-body">{c.courseName}</p>
                                            <p className="text-xs text-muted">
                                                {c.code} · issued {c.issuedAt}
                                            </p>
                                        </div>
                                        <StatusPill status={c.status} />
                                        {c.status === 'active' ? (
                                            <a
                                                href={c.downloadUrl}
                                                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-black/[0.1] px-2.5 text-xs font-semibold text-body hover:bg-black/[0.03]"
                                            >
                                                <Download className="h-3.5 w-3.5" /> PDF
                                            </a>
                                        ) : (
                                            <span className="text-xs text-muted">Unavailable</span>
                                        )}
                                        <a
                                            href={c.verifyUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-violet hover:underline"
                                        >
                                            Verify <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            {certificates.length === 0 && (
                                <div className="px-5 py-10 text-center">
                                    <Award className="mx-auto h-8 w-8 text-muted/40" />
                                    <p className="mt-2 text-sm text-muted">Complete a course to earn your first certificate.</p>
                                </div>
                            )}
                        </Panel>

                        <Panel title="Recommended for you" description="Popular courses you have not started yet.">
                            <div className="grid gap-3 sm:grid-cols-2">
                                {recommendations.map((course) => (
                                    <article key={course.id} className="relative overflow-hidden rounded-xl border border-black/[0.07] p-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0">
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-muted">{course.category || 'Course'}</p>
                                                <h3 className="mt-1 line-clamp-2 font-display text-sm font-semibold text-body">{course.title}</h3>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => toggleWishlist(course)}
                                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                                    wishlistIds.has(course.id) ? 'bg-rose-50 text-danger' : 'bg-black/[0.04] text-muted hover:text-danger'
                                                }`}
                                                aria-label={wishlistIds.has(course.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                                            >
                                                <Heart className={`h-4 w-4 ${wishlistIds.has(course.id) ? 'fill-current' : ''}`} />
                                            </button>
                                        </div>
                                        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
                                            <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-lime text-lime" /> {course.rating?.toFixed(1) || 'New'}</span>
                                            <span>{course.level || 'All levels'}</span>
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-sm font-semibold text-body">{course.price || 'Contact us'}</span>
                                            <Link href={`/courses/${course.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-violet hover:underline">
                                                View <ArrowRight className="h-3.5 w-3.5" />
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                            {recommendations.length === 0 && (
                                <p className="py-6 text-center text-sm text-muted">You are enrolled in all available courses. Well done!</p>
                            )}
                        </Panel>
                    </div>

                    <div className="space-y-5">
                        <Panel
                            title="Notifications"
                            description="Latest updates about your learning."
                            action={<Link href="/notifications" className="text-xs font-semibold text-violet hover:underline">View all</Link>}
                            bodyClassName="p-0"
                        >
                            <ul className="divide-y divide-black/[0.05]">
                                {notifications.slice(0, 5).map((n) => (
                                    <li key={n.id} className={`px-4 py-3 ${n.read ? '' : 'bg-violet/[0.03]'}`}>
                                        <div className="flex items-start gap-2.5">
                                            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${n.read ? 'bg-black/15' : 'bg-violet'}`} />
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-body">{n.title}</p>
                                                <p className="mt-0.5 line-clamp-2 text-xs text-muted">{n.message}</p>
                                                <p className="mt-1 text-[10px] text-muted">{timeAgo(n.createdAt)}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            {notifications.length === 0 && <p className="px-4 py-8 text-center text-sm text-muted">No notifications yet.</p>}
                        </Panel>

                        <Panel title="Activity" description="Your recent learning milestones.">
                            <ol className="space-y-4">
                                {recentActivity.slice(0, 6).map((item) => {
                                    const Icon = activityIcons[item.type] || Flame;
                                    return (
                                        <li key={item.id} className="flex items-start gap-3">
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/[0.04] text-muted">
                                                <Icon className="h-4 w-4" />
                                            </span>
                                            <div className="min-w-0">
                                                <p className="text-sm leading-snug text-body">{item.description}</p>
                                                <p className="mt-0.5 text-[11px] text-muted">{timeAgo(item.createdAt)}</p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ol>
                            {recentActivity.length === 0 && <p className="py-6 text-center text-sm text-muted">Activity will appear as you learn.</p>}
                        </Panel>

                        <Panel title="Wishlist" description="Saved for later." action={<Link href="/wishlist" className="text-xs font-semibold text-violet hover:underline">Manage</Link>}>
                            <ul className="space-y-3">
                                {wishlist.slice(0, 3).map((course) => (
                                    <li key={course.id} className="flex items-center gap-3">
                                        <Avatar name={course.instructor || course.title} size="sm" />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-body">{course.title}</p>
                                            <p className="truncate text-xs text-muted">{course.instructor || course.category}</p>
                                        </div>
                                        <Link href={`/courses/${course.slug}`} className="text-xs font-semibold text-violet hover:underline">View</Link>
                                    </li>
                                ))}
                            </ul>
                            {wishlist.length === 0 && <p className="py-4 text-center text-sm text-muted">Save courses you want to take later.</p>}
                        </Panel>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2 rounded-2xl border border-black/[0.07] bg-white px-4 py-3 text-xs text-muted">
                    <Sparkles className="h-4 w-4 text-lime" />
                    Keep your streak going — small, consistent sessions beat cramming.
                </div>
            </div>
        </DashboardLayout>
    );
}
