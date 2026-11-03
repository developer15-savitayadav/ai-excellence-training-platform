import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Eye, Filter, Mail, Phone, Search, Trash2 } from 'lucide-react';
import DashboardLayout from '../../../Layouts/DashboardLayout';
import PageHeader from '../../../Components/dashboard/PageHeader';
import StatCard from '../../../Components/dashboard/StatCard';
import DataTable from '../../../Components/dashboard/DataTable';
import Pagination from '../../../Components/dashboard/Pagination';
import StatusPill from '../../../Components/dashboard/StatusPill';
import Dialog from '../../../Components/dashboard/Dialog';
import ConfirmDialog from '../../../Components/dashboard/ConfirmDialog';
import { selectCls, inputCls } from '../../../Components/dashboard/Form';

const STATUSES = ['new', 'contacted', 'enrolled', 'closed'];

export default function Index({ enquiries, filters, stats }) {
    const [q, setQ] = useState(filters.q || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [viewing, setViewing] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [updating, setUpdating] = useState(null);

    const applyFilters = (next = {}) => {
        router.get(
            '/admin/enquiries',
            { q, status, sort: filters.sort, direction: filters.direction, ...next },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const sortBy = (key) => {
        const direction = filters.sort === key && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get(
            '/admin/enquiries',
            { q, status, sort: key, direction },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const updateStatus = (row, nextStatus) => {
        setUpdating(row.id);
        router.patch(
            `/admin/enquiries/${row.id}`,
            { status: nextStatus },
            {
                preserveScroll: true,
                onFinish: () => setUpdating(null),
                onSuccess: () => setViewing((v) => (v && v.id === row.id ? { ...v, status: nextStatus } : v)),
            },
        );
    };

    const confirmDelete = () => {
        router.delete(`/admin/enquiries/${deleting.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleting(null),
        });
    };

    const columns = [
        {
            key: 'name',
            label: 'Enquiry',
            sortable: true,
            render: (row) => (
                <div className="min-w-0">
                    <p className="truncate font-medium text-body">{row.name}</p>
                    <p className="flex items-center gap-1 truncate text-xs text-muted">
                        <Mail className="h-3 w-3 shrink-0" /> {row.email}
                    </p>
                </div>
            ),
        },
        {
            key: 'phone',
            label: 'Phone',
            render: (row) => (
                <span className="flex items-center gap-1.5 whitespace-nowrap text-xs text-muted">
                    <Phone className="h-3 w-3" /> {row.phone || '—'}
                </span>
            ),
        },
        {
            key: 'program',
            label: 'Program',
            sortable: true,
            render: (row) => (
                <div className="min-w-0 max-w-[200px]">
                    <p className="truncate text-body">{row.program || 'General'}</p>
                    <p className="truncate text-xs text-muted">{row.batchTiming || 'Flexible'}</p>
                </div>
            ),
        },
        {
            key: 'audience',
            label: 'Audience',
            render: (row) => <span className="text-xs capitalize text-muted">{row.audience || '—'}</span>,
        },
        {
            key: 'status',
            label: 'Status',
            sortable: true,
            render: (row) => (
                <div className="flex items-center gap-2">
                    <StatusPill status={row.status} />
                    {updating === row.id && <span className="text-[10px] text-muted">saving…</span>}
                </div>
            ),
        },
        {
            key: 'createdAt',
            label: 'Received',
            sortable: true,
            render: (row) => <span className="whitespace-nowrap text-xs text-muted">{row.createdAtLabel}</span>,
        },
        {
            key: 'actions',
            label: '',
            className: 'text-right',
            cellClassName: 'text-right',
            render: (row) => (
                <div className="flex items-center justify-end gap-1">
                    <button
                        type="button"
                        onClick={() => setViewing(row)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-black/[0.05] hover:text-body"
                        aria-label={`View enquiry from ${row.name}`}
                    >
                        <Eye className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setDeleting(row)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-rose-50 hover:text-danger"
                        aria-label={`Delete enquiry from ${row.name}`}
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <DashboardLayout title="Enquiries">
            <Head title="Enquiries" />

            <div className="space-y-6">
                <PageHeader
                    eyebrow="Pipeline"
                    title="Enquiries"
                    description="Every contact form submission, ready to be triaged and converted into an enrolment."
                />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard stat={{ label: 'Total enquiries', value: stats.total, icon: 'message', accent: 'violet', hint: 'All time' }} />
                    <StatCard stat={{ label: 'New', value: stats.new, icon: 'activity', accent: 'sky', hint: 'Awaiting first contact' }} />
                    <StatCard stat={{ label: 'In conversation', value: stats.contacted, icon: 'clock', accent: 'amber', hint: 'Contacted, not yet enrolled' }} />
                    <StatCard stat={{ label: 'Converted', value: stats.enrolled, icon: 'check', accent: 'emerald', hint: 'Became students' }} />
                </div>

                <div className="flex flex-col gap-3 rounded-2xl border border-black/[0.07] bg-white p-3 lg:flex-row lg:items-center">
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
                            placeholder="Search name, email, phone, program or message"
                            className={`${inputCls} pl-10`}
                        />
                    </form>

                    <div className="flex flex-wrap items-center gap-2">
                        <Filter className="h-4 w-4 shrink-0 text-muted" />
                        <select
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
                                applyFilters({ status: e.target.value });
                            }}
                            className={`${selectCls} w-auto min-w-[150px]`}
                        >
                            <option value="all">All statuses</option>
                            {STATUSES.map((s) => (
                                <option key={s} value={s} className="capitalize">
                                    {s[0].toUpperCase() + s.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    rows={enquiries.data}
                    rowKey="id"
                    sort={filters.sort}
                    direction={filters.direction}
                    onSort={sortBy}
                    emptyTitle="No enquiries found"
                    emptyText="New contact form submissions will appear here."
                    footer={<Pagination paginator={enquiries} />}
                />

                <Dialog
                    open={!!viewing}
                    onClose={() => setViewing(null)}
                    title={viewing ? `Enquiry from ${viewing.name}` : 'Enquiry'}
                    description={viewing?.createdAtLabel}
                    footer={
                        <>
                            <button
                                type="button"
                                onClick={() => setViewing(null)}
                                className="h-10 rounded-xl border border-black/[0.1] px-4 text-sm font-semibold text-body hover:bg-black/[0.03]"
                            >
                                Close
                            </button>
                            {viewing && (
                                <a
                                    href={`mailto:${viewing.email}`}
                                    className="inline-flex h-10 items-center gap-2 rounded-xl bg-body px-4 text-sm font-semibold text-white hover:bg-body/90"
                                >
                                    <Mail className="h-4 w-4" /> Reply by email
                                </a>
                            )}
                        </>
                    }
                >
                    {viewing && (
                        <div className="space-y-5">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Detail label="Email" value={viewing.email} />
                                <Detail label="Phone" value={viewing.phone || '—'} />
                                <Detail label="Audience" value={viewing.audience || '—'} className="capitalize" />
                                <Detail label="Program" value={viewing.program || 'General'} />
                                <Detail label="Preferred batch" value={viewing.batchTiming || 'Flexible'} />
                                <Detail label="Status" value={<StatusPill status={viewing.status} />} />
                            </div>

                            <div>
                                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Message</p>
                                <p className="whitespace-pre-line rounded-xl bg-black/[0.025] p-4 text-sm text-body">
                                    {viewing.message || 'No message provided.'}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">Update status</p>
                                <div className="flex flex-wrap gap-2">
                                    {STATUSES.map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            disabled={viewing.status === s || updating === viewing.id}
                                            onClick={() => updateStatus(viewing, s)}
                                            className={`h-9 rounded-lg px-3 text-xs font-semibold capitalize transition-colors disabled:opacity-50 ${
                                                viewing.status === s
                                                    ? 'bg-body text-white'
                                                    : 'border border-black/[0.1] text-muted hover:border-black/20 hover:text-body'
                                            }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </Dialog>

                <ConfirmDialog
                    open={!!deleting}
                    onClose={() => setDeleting(null)}
                    onConfirm={confirmDelete}
                    title="Delete enquiry?"
                    description="This permanently removes the enquiry and its message."
                    confirmLabel="Delete enquiry"
                >
                    <p>
                        <strong className="text-body">{deleting?.name}</strong>'s enquiry will be permanently deleted.
                    </p>
                </ConfirmDialog>
            </div>
        </DashboardLayout>
    );
}

function Detail({ label, value, className = '' }) {
    return (
        <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">{label}</p>
            <div className={`mt-1 text-sm text-body ${className}`}>{value}</div>
        </div>
    );
}
