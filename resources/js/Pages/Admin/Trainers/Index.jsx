import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { Filter, Pencil, Plus, Search, Star, Trash2 } from 'lucide-react';
import DashboardLayout from '../../../Layouts/DashboardLayout';
import PageHeader from '../../../Components/dashboard/PageHeader';
import StatCard from '../../../Components/dashboard/StatCard';
import DataTable from '../../../Components/dashboard/DataTable';
import Pagination from '../../../Components/dashboard/Pagination';
import StatusPill from '../../../Components/dashboard/StatusPill';
import Dialog from '../../../Components/dashboard/Dialog';
import ConfirmDialog from '../../../Components/dashboard/ConfirmDialog';
import { Field, inputCls, selectCls, textareaCls } from '../../../Components/dashboard/Form';
import Avatar from '../../../Components/ui/Avatar';

const emptyForm = {
    name: '',
    email: '',
    user_id: '',
    specialization: '',
    title: '',
    bio: '',
    avatar: '',
    rating: '',
    years_experience: '',
    status: 'active',
};

export default function Index({ trainers, filters, users, stats }) {
    const [q, setQ] = useState(filters.q || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [editing, setEditing] = useState(null);
    const [creating, setCreating] = useState(false);
    const [deleting, setDeleting] = useState(null);

    const form = useForm({ ...emptyForm });

    const applyFilters = (next = {}) => {
        router.get(
            '/admin/trainers',
            { q, status, sort: filters.sort, direction: filters.direction, ...next },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const sortBy = (key) => {
        const direction = filters.sort === key && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get(
            '/admin/trainers',
            { q, status, sort: key, direction },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const openCreate = () => {
        setCreating(true);
        form.setData({ ...emptyForm });
        form.clearErrors();
    };

    const openEdit = (trainer) => {
        setEditing(trainer);
        form.setData({
            name: trainer.name || '',
            email: trainer.email || '',
            user_id: trainer.userId || '',
            specialization: trainer.specialization || '',
            title: trainer.title || '',
            bio: trainer.bio || '',
            avatar: trainer.avatar || '',
            rating: trainer.rating ?? '',
            years_experience: trainer.yearsExperience ?? '',
            status: trainer.status || 'active',
        });
        form.clearErrors();
    };

    const close = () => {
        setCreating(false);
        setEditing(null);
        form.reset();
    };

    const save = (e) => {
        e.preventDefault();
        const options = {
            preserveScroll: true,
            onSuccess: () => close(),
        };

        if (editing) {
            form.patch(`/admin/trainers/${editing.slug}`, options);
        } else {
            form.post('/admin/trainers', options);
        }
    };

    const confirmDelete = () => {
        router.delete(`/admin/trainers/${deleting.slug}`, {
            preserveScroll: true,
            onSuccess: () => setDeleting(null),
        });
    };

    const columns = [
        {
            key: 'name',
            label: 'Trainer',
            sortable: true,
            render: (row) => (
                <div className="flex items-center gap-3">
                    <Avatar name={row.name} src={row.avatar} size="sm" />
                    <div className="min-w-0">
                        <p className="truncate font-medium text-body">{row.name}</p>
                        <p className="truncate text-xs text-muted">{row.title || row.specialization || 'Instructor'}</p>
                    </div>
                </div>
            ),
        },
        { key: 'email', label: 'Email', render: (row) => <span className="text-xs text-muted">{row.email || '—'}</span> },
        { key: 'specialization', label: 'Specialisation', render: (row) => <span className="text-muted">{row.specialization || '—'}</span> },
        { key: 'courses', label: 'Courses', render: (row) => <span className="font-semibold text-body">{row.courses}</span> },
        { key: 'students', label: 'Students', render: (row) => <span className="font-semibold text-body">{row.students}</span> },
        {
            key: 'rating',
            label: 'Rating',
            sortable: true,
            render: (row) => (
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-body">
                    <Star className="h-3.5 w-3.5 fill-lime text-lime" />
                    {row.rating ? row.rating.toFixed(1) : '—'}
                </span>
            ),
        },
        { key: 'status', label: 'Status', render: (row) => <StatusPill status={row.status} /> },
        {
            key: 'actions',
            label: '',
            className: 'text-right',
            cellClassName: 'text-right',
            render: (row) => (
                <div className="flex items-center justify-end gap-1">
                    <button type="button" onClick={() => openEdit(row)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-black/[0.05] hover:text-body" aria-label={`Edit ${row.name}`}>
                        <Pencil className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => setDeleting(row)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-rose-50 hover:text-danger" aria-label={`Delete ${row.name}`}>
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <DashboardLayout title="Trainers">
            <Head title="Trainers" />

            <div className="space-y-6">
                <PageHeader
                    eyebrow="People"
                    title="Trainers"
                    description="Manage instructors, their profiles and course assignments."
                    actions={
                        <button
                            type="button"
                            onClick={openCreate}
                            className="inline-flex h-10 items-center gap-2 rounded-xl bg-body px-3.5 text-sm font-semibold text-white transition-colors hover:bg-body/90"
                        >
                            <Plus className="h-4 w-4" /> Add trainer
                        </button>
                    }
                />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard stat={{ label: 'Total trainers', value: stats.total, icon: 'graduation', accent: 'violet', hint: 'All instructor profiles' }} />
                    <StatCard stat={{ label: 'Active trainers', value: stats.active, icon: 'activity', accent: 'emerald', hint: 'Available for courses' }} />
                    <StatCard stat={{ label: 'Assigned courses', value: stats.courses, icon: 'book', accent: 'sky', hint: 'Courses with a trainer' }} />
                    <StatCard stat={{ label: 'Average rating', value: stats.avgRating, decimals: 2, icon: 'trending', accent: 'gold', hint: 'Across all trainers' }} />
                </div>

                <div className="flex flex-col gap-3 rounded-2xl border border-black/[0.07] bg-white p-3 sm:flex-row sm:items-center">
                    <form onSubmit={(e) => { e.preventDefault(); applyFilters(); }} className="relative flex-1">
                        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search trainers by name, email or specialisation" className={`${inputCls} pl-10`} />
                    </form>

                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 shrink-0 text-muted" />
                        <select value={status} onChange={(e) => { setStatus(e.target.value); applyFilters({ status: e.target.value }); }} className={`${selectCls} w-auto min-w-[140px]`}>
                            <option value="all">All statuses</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <DataTable columns={columns} rows={trainers.data} rowKey="id" sort={filters.sort} direction={filters.direction} onSort={sortBy} emptyTitle="No trainers found" emptyText="Add your first trainer to start assigning courses." footer={<Pagination paginator={trainers} />} />

                <Dialog
                    open={creating || !!editing}
                    onClose={close}
                    title={editing ? `Edit ${editing.name}` : 'Add a trainer'}
                    description="Trainer profiles appear on the public instructors page."
                    footer={
                        <>
                            <button type="button" onClick={close} className="h-10 rounded-xl border border-black/[0.1] px-4 text-sm font-semibold text-body hover:bg-black/[0.03]">Cancel</button>
                            <button type="submit" form="trainer-form" disabled={form.processing} className="h-10 rounded-xl bg-body px-4 text-sm font-semibold text-white hover:bg-body/90 disabled:opacity-60">
                                {form.processing ? 'Saving…' : editing ? 'Save changes' : 'Add trainer'}
                            </button>
                        </>
                    }
                >
                    <form id="trainer-form" onSubmit={save} className="grid gap-4 sm:grid-cols-2">
                        <Field label="Full name" required error={form.errors.name}>
                            <input className={inputCls} value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
                        </Field>
                        <Field label="Email" error={form.errors.email}>
                            <input type="email" className={inputCls} value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} />
                        </Field>
                        <Field label="Linked user account" error={form.errors.user_id} hint="Optional. Links this profile to a login.">
                            <select className={selectCls} value={form.data.user_id} onChange={(e) => form.setData('user_id', e.target.value)}>
                                <option value="">No linked account</option>
                                {users.map((u) => (
                                    <option key={u.id} value={u.id}>{u.name} — {u.email}</option>
                                ))}
                            </select>
                        </Field>
                        <Field label="Professional title" error={form.errors.title}>
                            <input className={inputCls} value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} placeholder="e.g. Senior AI Engineer" />
                        </Field>
                        <Field label="Specialisation" error={form.errors.specialization}>
                            <input className={inputCls} value={form.data.specialization} onChange={(e) => form.setData('specialization', e.target.value)} placeholder="e.g. Machine Learning" />
                        </Field>
                        <Field label="Avatar URL" error={form.errors.avatar}>
                            <input className={inputCls} value={form.data.avatar} onChange={(e) => form.setData('avatar', e.target.value)} placeholder="https://…" />
                        </Field>
                        <Field label="Rating (0–5)" error={form.errors.rating}>
                            <input type="number" min="0" max="5" step="0.1" className={inputCls} value={form.data.rating} onChange={(e) => form.setData('rating', e.target.value)} />
                        </Field>
                        <Field label="Years of experience" error={form.errors.years_experience}>
                            <input type="number" min="0" max="60" className={inputCls} value={form.data.years_experience} onChange={(e) => form.setData('years_experience', e.target.value)} />
                        </Field>
                        <Field label="Status" error={form.errors.status}>
                            <select className={selectCls} value={form.data.status} onChange={(e) => form.setData('status', e.target.value)}>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </Field>
                        <Field label="Short bio" error={form.errors.bio} className="sm:col-span-2">
                            <textarea rows={4} className={textareaCls} value={form.data.bio} onChange={(e) => form.setData('bio', e.target.value)} />
                        </Field>
                    </form>
                </Dialog>

                <ConfirmDialog
                    open={!!deleting}
                    onClose={() => setDeleting(null)}
                    onConfirm={confirmDelete}
                    title={`Remove ${deleting?.name || 'trainer'}?`}
                    description="Courses assigned to this trainer will become unassigned."
                    confirmLabel="Delete trainer"
                >
                    <p><strong className="text-body">{deleting?.name}</strong> will no longer appear in the trainer directory.</p>
                </ConfirmDialog>
            </div>
        </DashboardLayout>
    );
}
