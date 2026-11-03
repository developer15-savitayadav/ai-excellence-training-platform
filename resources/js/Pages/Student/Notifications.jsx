import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    Award,
    Bell,
    BellOff,
    BookOpen,
    CheckCheck,
    ExternalLink,
    Info,
    MailOpen,
    Trash2,
} from 'lucide-react';
import DashboardLayout from '../../Layouts/DashboardLayout';
import PageHeader from '../../Components/dashboard/PageHeader';
import Pagination from '../../Components/dashboard/Pagination';
import ConfirmDialog from '../../Components/dashboard/ConfirmDialog';

const typeMeta = {
    enrollment: { icon: BookOpen, className: 'bg-sky-50 text-sky-600' },
    certificate: { icon: Award, className: 'bg-[#f7ecd2] text-[#a47a22]' },
    system: { icon: Info, className: 'bg-violet/[0.08] text-violet' },
};

export default function Notifications({ notifications, unread }) {
    const [deleting, setDeleting] = useState(null);
    const [busy, setBusy] = useState(null);

    const markRead = (n) => {
        setBusy(n.id);
        router.patch(`/notifications/${n.id}/read`, {}, { preserveScroll: true, onFinish: () => setBusy(null) });
    };

    const markAll = () => {
        router.post('/notifications/read-all', {}, { preserveScroll: true });
    };

    const remove = () => {
        router.delete(`/notifications/${deleting.id}`, {
            preserveScroll: true,
            onSuccess: () => setDeleting(null),
        });
    };

    const items = notifications.data || [];

    return (
        <DashboardLayout title="Notifications">
            <Head title="Notifications" />

            <div className="space-y-6">
                <PageHeader
                    eyebrow="Inbox"
                    title="Notifications"
                    description={unread > 0 ? `You have ${unread} unread notification${unread === 1 ? '' : 's'}.` : 'You are all caught up.'}
                    actions={
                        unread > 0 ? (
                            <button
                                type="button"
                                onClick={markAll}
                                className="inline-flex h-10 items-center gap-2 rounded-xl bg-body px-3.5 text-sm font-semibold text-white hover:bg-body/90"
                            >
                                <CheckCheck className="h-4 w-4" /> Mark all as read
                            </button>
                        ) : null
                    }
                />

                {items.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/[0.07] bg-white px-6 py-16 text-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/[0.04] text-muted">
                            <BellOff className="h-6 w-6" />
                        </span>
                        <div>
                            <p className="font-display font-semibold text-body">No notifications</p>
                            <p className="mt-1 text-sm text-muted">
                                Enrolment confirmations and certificate updates will appear here.
                            </p>
                        </div>
                        <Link href="/courses" className="mt-1 inline-flex h-9 items-center rounded-lg bg-body px-3.5 text-xs font-semibold text-white">
                            Browse courses
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
                        <ul className="divide-y divide-black/[0.06]">
                            {items.map((n) => {
                                const meta = typeMeta[n.type] || { icon: Bell, className: 'bg-black/[0.04] text-muted' };
                                const Icon = meta.icon;

                                return (
                                    <li
                                        key={n.id}
                                        className={`flex flex-col gap-3 px-4 py-4 transition-colors sm:flex-row sm:items-start sm:px-5 ${
                                            n.read ? '' : 'bg-violet/[0.025]'
                                        }`}
                                    >
                                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${meta.className}`}>
                                            <Icon className="h-5 w-5" />
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <p className="text-sm font-semibold text-body">{n.title}</p>
                                                {!n.read && (
                                                    <span className="rounded-full bg-violet px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                                                        New
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mt-1 text-sm text-muted">{n.message}</p>
                                            <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-muted">
                                                <span>{n.createdAtLabel}</span>
                                                {n.actionUrl && (
                                                    <button
                                                        type="button"
                                                        onClick={() => markRead(n)}
                                                        disabled={busy === n.id}
                                                        className="inline-flex items-center gap-1 font-semibold text-violet hover:underline disabled:opacity-60"
                                                    >
                                                        Open <ExternalLink className="h-3 w-3" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-1 sm:flex-col sm:items-end">
                                            {!n.read && (
                                                <button
                                                    type="button"
                                                    onClick={() => markRead(n)}
                                                    disabled={busy === n.id}
                                                    className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-black/[0.1] px-2.5 text-[11px] font-semibold text-muted hover:bg-black/[0.03] hover:text-body disabled:opacity-60"
                                                >
                                                    <MailOpen className="h-3.5 w-3.5" /> Mark read
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => setDeleting(n)}
                                                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-rose-50 hover:text-danger"
                                                aria-label="Delete notification"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        {notifications.total > notifications.per_page && (
                            <div className="border-t border-black/[0.06] px-4 py-3 sm:px-5">
                                <Pagination paginator={notifications} />
                            </div>
                        )}
                    </div>
                )}
            </div>

            <ConfirmDialog
                open={!!deleting}
                onClose={() => setDeleting(null)}
                onConfirm={remove}
                title="Delete notification?"
                description="This notification will be permanently removed."
                confirmLabel="Delete"
            >
                <p>
                    <strong className="text-body">{deleting?.title}</strong> will be deleted from your inbox.
                </p>
            </ConfirmDialog>
        </DashboardLayout>
    );
}
