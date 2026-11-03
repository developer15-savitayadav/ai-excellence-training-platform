import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { Filter, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import DashboardLayout from '../../../Layouts/DashboardLayout';
import PageHeader from '../../../Components/dashboard/PageHeader';
import StatCard from '../../../Components/dashboard/StatCard';
import DataTable from '../../../Components/dashboard/DataTable';
import Pagination from '../../../Components/dashboard/Pagination';
import StatusPill from '../../../Components/dashboard/StatusPill';
import Dialog from '../../../Components/dashboard/Dialog';
import ConfirmDialog from '../../../Components/dashboard/ConfirmDialog';
import { Field, inputCls, selectCls } from '../../../Components/dashboard/Form';
import Avatar from '../../../Components/ui/Avatar';
import ProgressBar from '../../../Components/ui/ProgressBar';

export default function Index({ enrollments, filters, courses, students, stats }) {
    const [q, setQ] = useState(filters.q || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [course, setCourse] = useState(filters.course || 'all');
    const [creating, setCreating] = useState(false);
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);

    const createForm = useForm({ user_id: '', course_id: '', status: 'active' });
    const editForm = useForm({ progress: 0, status: 'active' });

    const applyFilters = (next = {}) => {
        router.get(
            '/admin/enrollments',
            { q, status, course, sort: filters.sort, direction: filters.direction, ...next },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const sortBy = (key) => {
        const direction = filters.sort === key && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get(
            '/admin/enrollments',
            { q, status, course, sort: key, direction },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const openCreate = () => {
        setCreating(true);
        createForm.setData({ user_id: '', course_id: '', status: 'active' });
        createForm.clearErrors();
    };

    const openEdit = (row) => {
        setEditing(row);
        editForm.setData({ progress: row.progress, status: row.status });
        editForm.clearErrors();
    };

    const close = () => {
        setCreating(false);
        setEditing(null);
        createForm.reset();
        editForm.reset();
    };

    const create = (e) => {
        e.preventDefault();
        createForm.post('/admin/enrollments', { preserveScroll: true, onSuccess: () => close() });
    };

    const update = (e) => {
        e.preventDefault();
        editForm.patch(`/admin/enrollments/${editing.id}`, { preserveScroll: true, onSuccess: () => close() });
    };

    const confirmDelete = () => {
        router.delete(`/admin/enrollments/${deleting.id}`, { preserveScroll: true, onSuccess: () => setDeleting(null) });
    };

    const columns = [
        {
            key: 'student',
            label: 'Student',
            render: (row) => (
                <div className="flex items-center gap-3">
                    <Avatar name={row.student} src={row.avatar} size="sm" />
                    <div className="min-w-0">
                        <p className="truncate font-medium text-body">{row.student}</p>
                        <p className="truncate text-xs text-muted">{row.email}</p>
                    </div>
                </div>
            ),
        },
        {
            key: 'course',
            label: 'Course',
            render: (row) => (
                <div className="min-w-0">
                    <p className="truncate text-body">{row.course}</p>
                    <p className="text-xs text-muted">{row.courseSlug}</p>
                </div>
            ),
        },
        {
            key: 'progress',
            label: 'Progress',
            sortable: true,
            render: (row) => (
                <div className="w-32">
                    <ProgressBar value={row.progress} showLabel />
                </div>
            ),
        },
        { key: 'hoursCompleted', label: 'Hours', render: (row) => <span className="text-muted">{row.hoursCompleted}</span> },
        { key: 'status', label: 'Status', sortable: true, render: (row) => <StatusPill status={row.status} /> },
        { key: 'enrolledAt', label: 'Enrolled', sortable: true, render: (row) => <span className="text-xs text-muted">{row.enrolledAt}</span> },
        { key: 'completedAt', label: 'Completed', render: (row) => <span className="text-xs text-muted">{row.completedAt || '—'}</span> },
        {
            key: 'actions',
            label: '',
            className: 'text-right',
            cellClassName: 'text-right',
            render: (row) => (
                <div className="flex items-center justify-end gap-1">
                    <button type="button" onClick={() => openEdit(row)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-black/[0.05] hover:text-body" aria-label={`Edit ${row.student}`}>
                        <Pencil className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => setDeleting(row)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-rose-50 hover:text-danger" aria-label={`Remove ${row.student}`}>
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <DashboardLayout title="Enrolments">
            <Head title="Enrolments" />

            <div className="space-y-6">
                <PageHeader
                    eyebrow="Learning"
                    title="Enrolments"
                    description="Assign students to courses and track their completion progress."
                    actions={
                        <button type="button" onClick={openCreate} className="inline-flex h-10 items-center gap-2 rounded-xl bg-body px-3.5 text-sm font-semibold text-white hover:bg-body/90">
                            <Plus className="h-4 w-4" /> Enrol student
                        </button>
                    }
                />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard stat={{ label: 'Total enrolments', value: stats.total, icon: 'layers', accent: 'violet', hint: 'All time' }} />
                    <StatCard stat={{ label: 'In progress', value: stats.active, icon: 'clock', accent: 'sky', hint: 'Currently learning' }} />
                    <StatCard stat={{ label: 'Completed', value: stats.completed, icon: 'check', accent: 'emerald', hint: 'Eligible for certificates' }} />
                    <StatCard stat={{ label: 'Dropped', value: stats.dropped, icon: 'userX', accent: 'rose', hint: 'No longer active' }} />
                </div>

                <div className="flex flex-col gap-3 rounded-2xl border border-black/[0.07] bg-white p-3 lg:flex-row lg:items-center">
                    <form onSubmit={(e) => { e.preventDefault(); applyFilters(); }} className="relative flex-1">
                        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by student or course" className={`${inputCls} pl-10`} />
                    </form>

                    <div className="flex flex-wrap items-center gap-2">
                        <Filter className="h-4 w-4 shrink-0 text-muted" />
                        <select value={status} onChange={(e) => { setStatus(e.target.value); applyFilters({ status: e.target.value }); }} className={`${selectCls} w-auto min-w-[130px]`}>
                            <option value="all">All statuses</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="dropped">Dropped</option>
                        </select>
                        <select value={course} onChange={(e) => { setCourse(e.target.value); applyFilters({ course: e.target.value }); }} className={`${selectCls} w-auto min-w-[180px]`}>
                            <option value="all">All courses</option>
                            {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                        </select>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    rows={enrollments.data}
                    rowKey="id"
                    sort={filters.sort}
                    direction={filters.direction}
                    onSort={sortBy}
                    emptyTitle="No enrolments found"
                    emptyText="Enrol a student or adjust your filters."
                    footer={<Pagination paginator={enrollments} />}
                />

                <Dialog
                    open={creating}
                    onClose={close}
                    title="Enrol a student"
                    description="The student will immediately gain access to the course."
                    footer={
                        <>
                            <button type="button" onClick={close} className="h-10 rounded-xl border border-black/[0.1] px-4 text-sm font-semibold text-body hover:bg-black/[0.03]">Cancel</button>
                            <button type="submit" form="enrol-form" disabled={createForm.processing} className="h-10 rounded-xl bg-body px-4 text-sm font-semibold text-white hover:bg-body/90 disabled:opacity-60">
                                {createForm.processing ? 'Enrolling…' : 'Enrol student'}
                            </button>
                        </>
                    }
                >
                    <form id="enrol-form" onSubmit={create} className="grid gap-4">
                        <Field label="Student" required error={createForm.errors.user_id}>
                            <select className={selectCls} value={createForm.data.user_id} onChange={(e) => createForm.setData('user_id', e.target.value)}>
                                <option value="">Select a student</option>
                                {students.map((s) => <option key={s.id} value={s.id}>{s.name} — {s.email}</option>)}
                            </select>
                        </Field>
                        <Field label="Course" required error={createForm.errors.course_id}>
                            <select className={selectCls} value={createForm.data.course_id} onChange={(e) => createForm.setData('course_id', e.target.value)}>
                                <option value="">Select a course</option>
                                {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                            </select>
                        </Field>
                        <Field label="Initial status" error={createForm.errors.status}>
                            <select className={selectCls} value={createForm.data.status} onChange={(e) => createForm.setData('status', e.target.value)}>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                            </select>
                        </Field>
                    </form>
                </Dialog>

                <Dialog
                    open={!!editing}
                    onClose={close}
                    title={editing ? `Update ${editing.student}` : 'Update enrolment'}
                    description={editing ? `${editing.course} — ${editing.enrolledAt}` : ''}
                    footer={
                        <>
                            <button type="button" onClick={close} className="h-10 rounded-xl border border-black/[0.1] px-4 text-sm font-semibold text-body hover:bg-black/[0.03]">Cancel</button>
                            <button type="submit" form="enrolment-edit-form" disabled={editForm.processing} className="h-10 rounded-xl bg-body px-4 text-sm font-semibold text-white hover:bg-body/90 disabled:opacity-60">
                                {editForm.processing ? 'Saving…' : 'Save changes'}
                            </button>
                        </>
                    }
                >
                    <form id="enrolment-edit-form" onSubmit={update} className="grid gap-4 sm:grid-cols-2">
                        <Field label={`Progress — ${editForm.data.progress}%`} error={editForm.errors.progress} className="sm:col-span-2">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="5"
                                value={editForm.data.progress}
                                onChange={(e) => editForm.setData('progress', Number(e.target.value))}
                                className="w-full accent-violet"
                            />
                            <ProgressBar value={editForm.data.progress} className="mt-2" />
                        </Field>
                        <Field label="Status" error={editForm.errors.status} className="sm:col-span-2">
                            <select className={selectCls} value={editForm.data.status} onChange={(e) => editForm.setData('status', e.target.value)}>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="dropped">Dropped</option>
                            </select>
                        </Field>
                    </form>
                </Dialog>

                <ConfirmDialog
                    open={!!deleting}
                    onClose={() => setDeleting(null)}
                    onConfirm={confirmDelete}
                    title="Remove enrolment?"
                    description="The student loses access to the course. Certificates already issued are unaffected."
                    confirmLabel="Remove enrolment"
                >
                    <p><strong className="text-body">{deleting?.student}</strong> will be removed from <strong className="text-body">{deleting?.course}</strong>.</p>
                </ConfirmDialog>
            </div>
        </DashboardLayout>
    );
}
