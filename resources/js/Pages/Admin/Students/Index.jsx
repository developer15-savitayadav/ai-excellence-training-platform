import { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import {
    Filter,
    MoreHorizontal,
    Pencil,
    Search,
    Trash2,
    UserCheck,
    UserPlus,
    UserX,
    Users,
} from 'lucide-react';
import DashboardLayout from '../../../Layouts/DashboardLayout';
import PageHeader from '../../../Components/dashboard/PageHeader';
import StatCard from '../../../Components/dashboard/StatCard';
import DataTable from '../../../Components/dashboard/DataTable';
import Pagination from '../../../Components/dashboard/Pagination';
import StatusPill from '../../../Components/dashboard/StatusPill';
import Dialog from '../../../Components/dashboard/Dialog';
import ConfirmDialog from '../../../Components/dashboard/ConfirmDialog';
import { Field, inputCls, selectCls, textareaCls, Toggle } from '../../../Components/dashboard/Form';
import Avatar from '../../../Components/ui/Avatar';

export default function Index({ students, filters, stats }) {
    const [q, setQ] = useState(filters.q || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [editing, setEditing] = useState(null);
    const [deleting, setDeleting] = useState(null);

    const form = useForm({
        name: '',
        email: '',
        phone: '',
        role: 'student',
        is_active: true,
        bio: '',
    });

    const applyFilters = (next = {}) => {
        router.get(
            '/admin/students',
            {
                q,
                status,
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
            '/admin/students',
            { q, status, sort: key, direction },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const openEdit = (student) => {
        setEditing(student);
        form.setData({
            name: student.name || '',
            email: student.email || '',
            phone: student.phone || '',
            role: student.role || 'student',
            is_active: !!student.isActive,
            bio: student.bio || '',
        });
        form.clearErrors();
    };

    const save = (e) => {
        e.preventDefault();
        form.patch(`/admin/students/${editing.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setEditing(null);
                form.reset();
            },
        });
    };

    const confirmDelete = () => {
        router.delete(`/admin/students/${deleting.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleting(null),
        });
    };

    const columns = [
        {
            key: 'name',
            label: 'Student',
            sortable: true,
            render: (row) => (
                <div className="flex items-center gap-3">
                    <Avatar name={row.name} src={row.avatar} size="sm" />
                    <div className="min-w-0">
                        <p className="truncate font-medium text-body">{row.name}</p>
                        <p className="truncate text-xs text-muted">{row.email}</p>
                    </div>
                </div>
            ),
        },
        { key: 'phone', label: 'Phone', render: (row) => <span className="text-muted">{row.phone || '—'}</span> },
        { key: 'role', label: 'Role', render: (row) => <StatusPill status={row.role} /> },
        { key: 'enrollments', label: 'Courses', render: (row) => <span className="font-semibold text-body">{row.enrollments}</span> },
        { key: 'certificates', label: 'Certificates', render: (row) => <span className="font-semibold text-body">{row.certificates}</span> },
        { key: 'isActive', label: 'Status', render: (row) => <StatusPill status={row.isActive ? 'active' : 'inactive'} /> },
        { key: 'createdAt', label: 'Joined', sortable: true, render: (row) => <span className="text-xs text-muted">{row.createdAt || '—'}</span> },
        {
            key: 'actions',
            label: '',
            className: 'text-right',
            cellClassName: 'text-right',
            render: (row) => (
                <div className="flex items-center justify-end gap-1">
                    <button
                        type="button"
                        onClick={() => openEdit(row)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-black/[0.05] hover:text-body"
                        aria-label={`Edit ${row.name}`}
                    >
                        <Pencil className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setDeleting(row)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-rose-50 hover:text-danger"
                        aria-label={`Delete ${row.name}`}
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <DashboardLayout title="Students">
            <Head title="Students" />

            <div className="space-y-6">
                <PageHeader
                    eyebrow="People"
                    title="Students"
                    description="Manage learner accounts, access and course participation."
                    actions={
                        <span className="inline-flex items-center gap-1.5 rounded-xl border border-black/[0.08] bg-white px-3 py-2 text-xs text-muted">
                            <Users className="h-4 w-4" /> {stats.total} total students
                        </span>
                    }
                />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard stat={{ label: 'Total students', value: stats.total, icon: 'users', accent: 'violet', hint: 'All registered learners' }} />
                    <StatCard stat={{ label: 'Active', value: stats.active, icon: 'check', accent: 'emerald', hint: 'Can sign in' }} />
                    <StatCard stat={{ label: 'Inactive', value: stats.inactive, icon: 'userX', accent: 'rose', hint: 'Suspended accounts' }} />
                    <StatCard stat={{ label: 'New this month', value: stats.new, icon: 'trending', accent: 'sky', hint: 'Recent registrations' }} />
                </div>

                <div className="flex flex-col gap-3 rounded-2xl border border-black/[0.07] bg-white p-3 sm:flex-row sm:items-center">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            applyFilters();
                        }}
                        className="relative flex-1"
                    >
                        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search by name, email or phone"
                            className={`${inputCls} pl-10`}
                        />
                    </form>

                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 shrink-0 text-muted" />
                        <select
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
                                applyFilters({ status: e.target.value });
                            }}
                            className={`${selectCls} w-auto min-w-[140px]`}
                        >
                            <option value="all">All statuses</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    rows={students.data}
                    rowKey="id"
                    sort={filters.sort}
                    direction={filters.direction}
                    onSort={sortBy}
                    emptyTitle="No students match your filters"
                    emptyText="Try clearing the search or changing the status filter."
                    footer={<Pagination paginator={students} />}
                />

                <Dialog
                    open={!!editing}
                    onClose={() => setEditing(null)}
                    title={editing ? `Edit ${editing.name}` : 'Edit student'}
                    description="Changes take effect immediately."
                    footer={
                        <>
                            <button type="button" onClick={() => setEditing(null)} className="h-10 rounded-xl border border-black/[0.1] px-4 text-sm font-semibold text-body hover:bg-black/[0.03]">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="student-edit-form"
                                disabled={form.processing}
                                className="h-10 rounded-xl bg-body px-4 text-sm font-semibold text-white hover:bg-body/90 disabled:opacity-60"
                            >
                                {form.processing ? 'Saving…' : 'Save changes'}
                            </button>
                        </>
                    }
                >
                    <form id="student-edit-form" onSubmit={save} className="grid gap-4 sm:grid-cols-2">
                        <Field label="Full name" required error={form.errors.name}>
                            <input className={inputCls} value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} />
                        </Field>
                        <Field label="Email" required error={form.errors.email}>
                            <input type="email" className={inputCls} value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} />
                        </Field>
                        <Field label="Phone" error={form.errors.phone}>
                            <input className={inputCls} value={form.data.phone} onChange={(e) => form.setData('phone', e.target.value)} />
                        </Field>
                        <Field label="Role" error={form.errors.role}>
                            <select className={selectCls} value={form.data.role} onChange={(e) => form.setData('role', e.target.value)}>
                                <option value="student">Student</option>
                                <option value="instructor">Instructor</option>
                                <option value="admin">Administrator</option>
                            </select>
                        </Field>
                        <Field label="Bio" error={form.errors.bio} className="sm:col-span-2">
                            <textarea rows={3} className={textareaCls} value={form.data.bio} onChange={(e) => form.setData('bio', e.target.value)} />
                        </Field>
                        <div className="sm:col-span-2">
                            <Toggle checked={form.data.is_active} onChange={(v) => form.setData('is_active', v)} label="Account is active" />
                        </div>
                    </form>
                </Dialog>

                <ConfirmDialog
                    open={!!deleting}
                    onClose={() => setDeleting(null)}
                    onConfirm={confirmDelete}
                    title={`Remove ${deleting?.name || 'student'}?`}
                    description="This permanently deletes the account and related enrolments."
                    confirmLabel="Delete student"
                >
                    <p>
                        <strong className="text-body">{deleting?.name}</strong> will lose access immediately. Their certificates keep their snapshot data but the account link is removed.
                    </p>
                </ConfirmDialog>
            </div>
        </DashboardLayout>
    );
}
