import { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    BookOpen,
    ExternalLink,
    Filter,
    Pencil,
    Plus,
    Search,
    Star,
    Trash2,
} from 'lucide-react';
import DashboardLayout from '../../../Layouts/DashboardLayout';
import PageHeader from '../../../Components/dashboard/PageHeader';
import StatCard from '../../../Components/dashboard/StatCard';
import DataTable from '../../../Components/dashboard/DataTable';
import Pagination from '../../../Components/dashboard/Pagination';
import StatusPill from '../../../Components/dashboard/StatusPill';
import Dialog from '../../../Components/dashboard/Dialog';
import ConfirmDialog from '../../../Components/dashboard/ConfirmDialog';
import { Field, inputCls, selectCls, textareaCls } from '../../../Components/dashboard/Form';

const emptyForm = {
    title: '',
    slug: '',
    tagline: '',
    description: '',
    category: '',
    instructor_id: '',
    status: 'draft',
    tier: 'short-term',
    level: '',
    duration: '',
    hours: '',
    schedule: '',
    price: 'Contact us',
    original_price: '',
    rating: '',
    review_count: '',
    lesson_count: '',
    image: '',
    for_whom: '',
    prerequisite: '',
    takeaway: '',
    sort_order: 0,
};

export default function Index({ courses, filters, instructors, categories, stats }) {
    const [q, setQ] = useState(filters.q || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [tier, setTier] = useState(filters.tier || 'all');
    const [category, setCategory] = useState(filters.category || 'all');
    const [creating, setCreating] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [learningText, setLearningText] = useState('');
    const [includedText, setIncludedText] = useState('');

    const form = useForm({ ...emptyForm });

    const applyFilters = (next = {}) => {
        router.get(
            '/admin/courses',
            {
                q,
                status,
                tier,
                category,
                sort: filters.sort,
                direction: filters.direction,
                ...next,
            },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const sortBy = (key) => {
        const direction = filters.sort === key && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get(
            '/admin/courses',
            { q, status, tier, category, sort: key, direction },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const openCreate = () => {
        setCreating(true);
        form.setData({ ...emptyForm });
        form.clearErrors();
        setLearningText('');
        setIncludedText('');
    };

    const openEdit = (course) => {
        setEditing(course);
        form.setData({
            title: course.title || '',
            slug: course.slug || '',
            tagline: course.tagline || '',
            description: course.description || '',
            category: course.category || '',
            instructor_id: course.instructorId || '',
            status: course.status || 'draft',
            tier: course.tier || 'short-term',
            level: course.level || '',
            duration: course.duration || '',
            hours: course.hours || '',
            schedule: course.schedule || '',
            price: course.price || 'Contact us',
            original_price: course.originalPrice || '',
            rating: course.rating || '',
            review_count: course.reviewCount || '',
            lesson_count: course.lessonCount || '',
            image: course.image || '',
            for_whom: course.forWhom || '',
            prerequisite: course.prerequisite || '',
            takeaway: course.takeaway || '',
            sort_order: course.sortOrder || 0,
        });
        form.clearErrors();
        setLearningText((course.learning || []).join('\n'));
        setIncludedText((course.included || []).join('\n'));
    };

    const close = () => {
        setCreating(false);
        setEditing(null);
        form.reset();
        setLearningText('');
        setIncludedText('');
    };

    const save = (e) => {
        e.preventDefault();
        form.transform((data) => ({
            ...data,
            learning: learningText.split('\n').map((line) => line.trim()).filter(Boolean),
            included: includedText.split('\n').map((line) => line.trim()).filter(Boolean),
        }));

        const options = { preserveScroll: true, onSuccess: () => close() };
        if (editing) {
            form.patch(`/admin/courses/${editing.slug}`, options);
        } else {
            form.post('/admin/courses', options);
        }
    };

    const updateStatus = (course, nextStatus) => {
        router.patch(`/admin/courses/${course.slug}/status`, { status: nextStatus }, { preserveScroll: true });
    };

    const confirmDelete = () => {
        router.delete(`/admin/courses/${deleting.slug}`, {
            preserveScroll: true,
            onSuccess: () => setDeleting(null),
        });
    };

    const columns = [
        {
            key: 'title',
            label: 'Course',
            sortable: true,
            render: (row) => (
                <div className="min-w-0">
                    <p className="truncate font-medium text-body">{row.title}</p>
                    <p className="truncate text-xs text-muted">{row.category || 'Uncategorised'} · {row.level || 'All levels'}</p>
                </div>
            ),
        },
        { key: 'instructor', label: 'Trainer', render: (row) => <span className="text-muted">{row.instructor || 'Unassigned'}</span> },
        { key: 'tier', label: 'Tier', render: (row) => <span className="text-xs capitalize text-muted">{row.tier.replace('-', ' ')}</span> },
        { key: 'price', label: 'Price', sortable: true, render: (row) => <span className="font-medium text-body">{row.price}</span> },
        { key: 'enrollments', label: 'Enrolments', render: (row) => <span className="font-semibold text-body">{row.enrollments}</span> },
        { key: 'certificates', label: 'Certificates', render: (row) => <span className="text-muted">{row.certificates}</span> },
        {
            key: 'rating',
            label: 'Rating',
            sortable: true,
            render: (row) => (
                <span className="inline-flex items-center gap-1 text-sm text-body">
                    <Star className="h-3.5 w-3.5 fill-lime text-lime" />
                    {row.rating ? row.rating.toFixed(1) : '—'}
                </span>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (row) => (
                <select
                    value={row.status}
                    onChange={(e) => updateStatus(row, e.target.value)}
                    className="h-8 rounded-lg border border-black/[0.1] bg-white px-2 text-xs font-semibold capitalize text-body outline-none focus:border-violet"
                    aria-label={`Set status for ${row.title}`}
                >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                </select>
            ),
        },
        {
            key: 'actions',
            label: '',
            className: 'text-right',
            cellClassName: 'text-right',
            render: (row) => (
                <div className="flex items-center justify-end gap-1">
                    <Link href={`/courses/${row.slug}`} target="_blank" className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-black/[0.05] hover:text-body" aria-label={`View ${row.title}`}>
                        <ExternalLink className="h-4 w-4" />
                    </Link>
                    <button type="button" onClick={() => openEdit(row)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-black/[0.05] hover:text-body" aria-label={`Edit ${row.title}`}>
                        <Pencil className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => setDeleting(row)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-rose-50 hover:text-danger" aria-label={`Delete ${row.title}`}>
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <DashboardLayout title="Courses">
            <Head title="Courses" />

            <div className="space-y-6">
                <PageHeader
                    eyebrow="Catalogue"
                    title="Courses"
                    description="Create, publish and manage the academy course catalogue."
                    actions={
                        <button type="button" onClick={openCreate} className="inline-flex h-10 items-center gap-2 rounded-xl bg-body px-3.5 text-sm font-semibold text-white transition-colors hover:bg-body/90">
                            <Plus className="h-4 w-4" /> New course
                        </button>
                    }
                />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard stat={{ label: 'Total courses', value: stats.total, icon: 'book', accent: 'violet', hint: 'Across all tiers' }} />
                    <StatCard stat={{ label: 'Published', value: stats.published, icon: 'check', accent: 'emerald', hint: 'Visible on the site' }} />
                    <StatCard stat={{ label: 'Drafts', value: stats.draft, icon: 'activity', accent: 'amber', hint: 'Not yet published' }} />
                    <StatCard stat={{ label: 'Enrolments', value: stats.enrollments, icon: 'layers', accent: 'sky', hint: 'All time' }} />
                </div>

                <div className="flex flex-col gap-3 rounded-2xl border border-black/[0.07] bg-white p-3 lg:flex-row lg:items-center">
                    <form onSubmit={(e) => { e.preventDefault(); applyFilters(); }} className="relative flex-1">
                        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses by title, slug or category" className={`${inputCls} pl-10`} />
                    </form>

                    <div className="flex flex-wrap items-center gap-2">
                        <Filter className="h-4 w-4 shrink-0 text-muted" />
                        <select value={status} onChange={(e) => { setStatus(e.target.value); applyFilters({ status: e.target.value }); }} className={`${selectCls} w-auto min-w-[130px]`}>
                            <option value="all">All statuses</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                        </select>
                        <select value={tier} onChange={(e) => { setTier(e.target.value); applyFilters({ tier: e.target.value }); }} className={`${selectCls} w-auto min-w-[130px]`}>
                            <option value="all">All tiers</option>
                            <option value="short-term">Short term</option>
                            <option value="professional">Professional</option>
                            <option value="career">Career</option>
                        </select>
                        <select value={category} onChange={(e) => { setCategory(e.target.value); applyFilters({ category: e.target.value }); }} className={`${selectCls} w-auto min-w-[150px]`}>
                            <option value="all">All categories</option>
                            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    rows={courses.data}
                    rowKey="id"
                    sort={filters.sort}
                    direction={filters.direction}
                    onSort={sortBy}
                    emptyTitle="No courses found"
                    emptyText="Adjust your filters or create a new course."
                    footer={<Pagination paginator={courses} />}
                />

                <Dialog
                    open={creating || !!editing}
                    onClose={close}
                    size="xl"
                    title={editing ? `Edit ${editing.title}` : 'Create a course'}
                    description="Course details feed the public catalogue, dashboards and certificates."
                    footer={
                        <>
                            <button type="button" onClick={close} className="h-10 rounded-xl border border-black/[0.1] px-4 text-sm font-semibold text-body hover:bg-black/[0.03]">Cancel</button>
                            <button type="submit" form="course-form" disabled={form.processing} className="h-10 rounded-xl bg-body px-4 text-sm font-semibold text-white hover:bg-body/90 disabled:opacity-60">
                                {form.processing ? 'Saving…' : editing ? 'Save changes' : 'Create course'}
                            </button>
                        </>
                    }
                >
                    <form id="course-form" onSubmit={save} className="grid gap-4 sm:grid-cols-2">
                        <Field label="Title" required error={form.errors.title} className="sm:col-span-2">
                            <input className={inputCls} value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} />
                        </Field>
                        <Field label="Slug" error={form.errors.slug} hint="Leave blank to generate from the title.">
                            <input className={inputCls} value={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} placeholder="ai-tools-mastery" />
                        </Field>
                        <Field label="Category" error={form.errors.category}>
                            <input className={inputCls} value={form.data.category} onChange={(e) => form.setData('category', e.target.value)} placeholder="AI & Automation" />
                        </Field>
                        <Field label="Tagline" error={form.errors.tagline} className="sm:col-span-2">
                            <input className={inputCls} value={form.data.tagline} onChange={(e) => form.setData('tagline', e.target.value)} />
                        </Field>
                        <Field label="Description" error={form.errors.description} className="sm:col-span-2">
                            <textarea rows={3} className={textareaCls} value={form.data.description} onChange={(e) => form.setData('description', e.target.value)} />
                        </Field>
                        <Field label="Trainer" error={form.errors.instructor_id}>
                            <select className={selectCls} value={form.data.instructor_id} onChange={(e) => form.setData('instructor_id', e.target.value)}>
                                <option value="">Unassigned</option>
                                {instructors.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
                            </select>
                        </Field>
                        <Field label="Tier" required error={form.errors.tier}>
                            <select className={selectCls} value={form.data.tier} onChange={(e) => form.setData('tier', e.target.value)}>
                                <option value="short-term">Short term</option>
                                <option value="professional">Professional</option>
                                <option value="career">Career</option>
                            </select>
                        </Field>
                        <Field label="Status" required error={form.errors.status}>
                            <select className={selectCls} value={form.data.status} onChange={(e) => form.setData('status', e.target.value)}>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </Field>
                        <Field label="Level" error={form.errors.level}>
                            <input className={inputCls} value={form.data.level} onChange={(e) => form.setData('level', e.target.value)} placeholder="Beginner" />
                        </Field>
                        <Field label="Duration" error={form.errors.duration}>
                            <input className={inputCls} value={form.data.duration} onChange={(e) => form.setData('duration', e.target.value)} placeholder="6 weeks" />
                        </Field>
                        <Field label="Hours" error={form.errors.hours}>
                            <input className={inputCls} value={form.data.hours} onChange={(e) => form.setData('hours', e.target.value)} placeholder="48 hrs" />
                        </Field>
                        <Field label="Schedule" error={form.errors.schedule}>
                            <input className={inputCls} value={form.data.schedule} onChange={(e) => form.setData('schedule', e.target.value)} placeholder="Weekday evenings" />
                        </Field>
                        <Field label="Price" required error={form.errors.price}>
                            <input className={inputCls} value={form.data.price} onChange={(e) => form.setData('price', e.target.value)} placeholder="Contact us" />
                        </Field>
                        <Field label="Original price" error={form.errors.original_price}>
                            <input type="number" min="0" step="0.01" className={inputCls} value={form.data.original_price} onChange={(e) => form.setData('original_price', e.target.value)} />
                        </Field>
                        <Field label="Rating (0–5)" error={form.errors.rating}>
                            <input type="number" min="0" max="5" step="0.1" className={inputCls} value={form.data.rating} onChange={(e) => form.setData('rating', e.target.value)} />
                        </Field>
                        <Field label="Review count" error={form.errors.review_count}>
                            <input type="number" min="0" className={inputCls} value={form.data.review_count} onChange={(e) => form.setData('review_count', e.target.value)} />
                        </Field>
                        <Field label="Lesson count" error={form.errors.lesson_count}>
                            <input type="number" min="0" className={inputCls} value={form.data.lesson_count} onChange={(e) => form.setData('lesson_count', e.target.value)} />
                        </Field>
                        <Field label="Sort order" error={form.errors.sort_order}>
                            <input type="number" min="0" className={inputCls} value={form.data.sort_order} onChange={(e) => form.setData('sort_order', e.target.value)} />
                        </Field>
                        <Field label="Image URL" error={form.errors.image} className="sm:col-span-2">
                            <input className={inputCls} value={form.data.image} onChange={(e) => form.setData('image', e.target.value)} placeholder="https://…" />
                        </Field>
                        <Field label="Learning outcomes" hint="One outcome per line. Used in the learner player." error={form.errors.learning} className="sm:col-span-2">
                            <textarea rows={4} className={textareaCls} value={learningText} onChange={(e) => setLearningText(e.target.value)} />
                        </Field>
                        <Field label="What is included" hint="One item per line." error={form.errors.included} className="sm:col-span-2">
                            <textarea rows={3} className={textareaCls} value={includedText} onChange={(e) => setIncludedText(e.target.value)} />
                        </Field>
                        <Field label="For whom" error={form.errors.for_whom}>
                            <textarea rows={2} className={textareaCls} value={form.data.for_whom} onChange={(e) => form.setData('for_whom', e.target.value)} />
                        </Field>
                        <Field label="Prerequisite" error={form.errors.prerequisite}>
                            <input className={inputCls} value={form.data.prerequisite} onChange={(e) => form.setData('prerequisite', e.target.value)} />
                        </Field>
                        <Field label="Key takeaway" error={form.errors.takeaway} className="sm:col-span-2">
                            <textarea rows={2} className={textareaCls} value={form.data.takeaway} onChange={(e) => form.setData('takeaway', e.target.value)} />
                        </Field>
                    </form>
                </Dialog>

                <ConfirmDialog
                    open={!!deleting}
                    onClose={() => setDeleting(null)}
                    onConfirm={confirmDelete}
                    title={`Delete ${deleting?.title || 'course'}?`}
                    description="Enrolments and certificates keep snapshot data, but the course is removed from the catalogue."
                    confirmLabel="Delete course"
                >
                    <p>This action cannot be undone. Consider archiving instead if students are still enrolled.</p>
                </ConfirmDialog>
            </div>
        </DashboardLayout>
    );
}
