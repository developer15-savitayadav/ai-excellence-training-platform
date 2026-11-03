import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowRight, BookOpen, Compass, Heart, HeartOff, Search, Star } from 'lucide-react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import PageHeader from '../../Components/dashboard/PageHeader';
import ConfirmDialog from '../../Components/dashboard/ConfirmDialog';
import { inputCls } from '../../Components/dashboard/Form';

export default function Wishlist({ courses }) {
    const [query, setQuery] = useState('');
    const [removing, setRemoving] = useState(null);
    const [enrolling, setEnrolling] = useState(null);

    const term = query.trim().toLowerCase();
    const filtered = term
        ? courses.filter(
              (c) =>
                  c.title.toLowerCase().includes(term) ||
                  (c.category || '').toLowerCase().includes(term) ||
                  (c.instructor || '').toLowerCase().includes(term),
          )
        : courses;

    const remove = (course) => {
        router.delete(`/wishlist/${course.slug}`, {
            preserveScroll: true,
            onSuccess: () => setRemoving(null),
        });
    };

    const enroll = (course) => {
        setEnrolling(course.id);
        router.post(
            `/courses/${course.slug}/enroll`,
            {},
            { onFinish: () => setEnrolling(null) },
        );
    };

    return (
        <DashboardLayout title="Wishlist">
            <Head title="Wishlist" />

            <div className="space-y-6">
                <PageHeader
                    eyebrow="Saved"
                    title="Wishlist"
                    description="Courses you have saved for later. Enrol whenever you are ready."
                    actions={
                        <Link
                            href="/courses"
                            className="inline-flex h-10 items-center gap-2 rounded-xl bg-body px-3.5 text-sm font-semibold text-white hover:bg-body/90"
                        >
                            <Compass className="h-4 w-4" /> Browse catalogue
                        </Link>
                    }
                />

                {courses.length > 0 && (
                    <div className="relative rounded-2xl border border-black/[0.07] bg-white p-3">
                        <Search className="pointer-events-none absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search saved courses"
                            className={`${inputCls} pl-10`}
                        />
                    </div>
                )}

                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/[0.07] bg-white px-6 py-16 text-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                            <Heart className="h-6 w-6" />
                        </span>
                        <div>
                            <p className="font-display font-semibold text-body">
                                {courses.length === 0 ? 'Your wishlist is empty' : 'No saved courses match your search'}
                            </p>
                            <p className="mt-1 text-sm text-muted">
                                {courses.length === 0
                                    ? 'Tap the heart on any course to save it here for later.'
                                    : 'Try a different search term.'}
                            </p>
                        </div>
                        {courses.length === 0 && (
                            <Link href="/courses" className="mt-1 inline-flex h-9 items-center rounded-lg bg-body px-3.5 text-xs font-semibold text-white">
                                Explore courses
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        {filtered.map((course) => (
                            <article
                                key={course.id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white transition-all hover:-translate-y-0.5 hover:border-black/[0.14] hover:shadow-[0_18px_40px_-28px_rgba(35,35,30,0.4)]"
                            >
                                <div className="relative h-32 overflow-hidden bg-gradient-to-br from-violet/20 via-lilac/40 to-lime/20">
                                    {course.image ? (
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
                                            {course.category || 'Course'}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setRemoving(course)}
                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-danger backdrop-blur transition-colors hover:bg-white"
                                            aria-label={`Remove ${course.title} from wishlist`}
                                        >
                                            <HeartOff className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col p-4">
                                    <h3 className="line-clamp-2 font-display text-base font-semibold text-body">{course.title}</h3>
                                    {course.tagline && <p className="mt-1 line-clamp-2 text-xs text-muted">{course.tagline}</p>}

                                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
                                        <span className="inline-flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-lime text-lime" /> {course.rating > 0 ? course.rating.toFixed(1) : 'New'}
                                        </span>
                                        <span>{course.level || 'All levels'}</span>
                                        <span>{course.duration || 'Self-paced'}</span>
                                    </div>

                                    <div className="mt-auto flex items-center justify-between gap-2 border-t border-black/[0.06] pt-4">
                                        <span className="text-sm font-semibold text-body">{course.price || 'Contact us'}</span>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/courses/${course.slug}`}
                                                className="inline-flex h-9 items-center gap-1 rounded-lg border border-black/[0.1] px-2.5 text-xs font-semibold text-body hover:bg-black/[0.03]"
                                            >
                                                Details <ArrowRight className="h-3.5 w-3.5" />
                                            </Link>
                                            {course.enrolled ? (
                                                <Link
                                                    href={`/learn/${course.slug}`}
                                                    className="inline-flex h-9 items-center gap-1 rounded-lg bg-emerald-600 px-2.5 text-xs font-semibold text-white hover:bg-emerald-700"
                                                >
                                                    <BookOpen className="h-3.5 w-3.5" /> Continue
                                                </Link>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => enroll(course)}
                                                    disabled={enrolling === course.id}
                                                    className="inline-flex h-9 items-center gap-1 rounded-lg bg-body px-2.5 text-xs font-semibold text-white hover:bg-body/90 disabled:opacity-60"
                                                >
                                                    {enrolling === course.id ? 'Enrolling…' : 'Enrol'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            <ConfirmDialog
                open={!!removing}
                onClose={() => setRemoving(null)}
                onConfirm={() => remove(removing)}
                title="Remove from wishlist?"
                description="You can always save it again later."
                confirmLabel="Remove"
                tone="warning"
            >
                <p>
                    <strong className="text-body">{removing?.title}</strong> will be removed from your wishlist.
                </p>
            </ConfirmDialog>
        </DashboardLayout>
    );
}
