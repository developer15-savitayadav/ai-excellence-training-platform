const map = {
    active: { label: 'Active', className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15' },
    completed: { label: 'Completed', className: 'bg-violet/[0.08] text-violet ring-violet/15' },
    dropped: { label: 'Dropped', className: 'bg-rose-50 text-rose-600 ring-rose-600/15' },
    revoked: { label: 'Revoked', className: 'bg-rose-50 text-rose-600 ring-rose-600/15' },
    expired: { label: 'Expired', className: 'bg-amber-50 text-amber-700 ring-amber-600/15' },
    published: { label: 'Published', className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15' },
    draft: { label: 'Draft', className: 'bg-black/[0.05] text-muted ring-black/10' },
    archived: { label: 'Archived', className: 'bg-black/[0.05] text-muted ring-black/10' },
    new: { label: 'New', className: 'bg-sky-50 text-sky-700 ring-sky-600/15' },
    contacted: { label: 'Contacted', className: 'bg-amber-50 text-amber-700 ring-amber-600/15' },
    enrolled: { label: 'Enrolled', className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15' },
    closed: { label: 'Closed', className: 'bg-black/[0.05] text-muted ring-black/10' },
    inactive: { label: 'Inactive', className: 'bg-black/[0.05] text-muted ring-black/10' },
    admin: { label: 'Admin', className: 'bg-violet/[0.08] text-violet ring-violet/15' },
    instructor: { label: 'Instructor', className: 'bg-sky-50 text-sky-700 ring-sky-600/15' },
    student: { label: 'Student', className: 'bg-black/[0.05] text-body ring-black/10' },
};

export default function StatusPill({ status, label, className = '' }) {
    const meta = map[status] || { label: label || status || '—', className: 'bg-black/[0.05] text-muted ring-black/10' };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ring-1 ring-inset ${meta.className} ${className}`}
        >
            {label || meta.label}
        </span>
    );
}
