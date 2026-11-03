import { useMemo, useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    Award,
    BadgeCheck,
    Ban,
    Download,
    ExternalLink,
    Filter,
    Plus,
    Search,
    ShieldX,
    Sparkles,
} from 'lucide-react';
import DashboardLayout from '../../../Layouts/DashboardLayout';
import PageHeader from '../../../Components/dashboard/PageHeader';
import StatCard from '../../../Components/dashboard/StatCard';
import DataTable from '../../../Components/dashboard/DataTable';
import Pagination from '../../../Components/dashboard/Pagination';
import StatusPill from '../../../Components/dashboard/StatusPill';
import Dialog from '../../../Components/dashboard/Dialog';
import ConfirmDialog from '../../../Components/dashboard/ConfirmDialog';
import Panel from '../../../Components/dashboard/Panel';
import { Field, inputCls, selectCls } from '../../../Components/dashboard/Form';

function today() {
    return new Date().toISOString().slice(0, 10);
}

export default function Index({ certificates, filters, courses, students, eligibleEnrollments, stats }) {
    const [q, setQ] = useState(filters.q || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [course, setCourse] = useState(filters.course || 'all');
    const [issuingOpen, setIssuingOpen] = useState(false);
    const [revoking, setRevoking] = useState(null);
    const [enrollmentId, setEnrollmentId] = useState('');
    const [quickIssuing, setQuickIssuing] = useState(false);
    const [revokeReason, setRevokeReason] = useState('');

    const manualForm = useForm({
        student_name: '',
        student_email: '',
        course_id: '',
        course_title: '',
        duration: '',
        score: '',
        grade: '',
        instructor_name: '',
        issued_at: today(),
        expires_at: '',
    });

    const applyFilters = (next = {}) => {
        router.get(
            '/admin/certificates',
            { q, status, course, sort: filters.sort, direction: filters.direction, ...next },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const sortBy = (key) => {
        const direction = filters.sort === key && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get(
            '/admin/certificates',
            { q, status, course, sort: key, direction },
            { preserveState: true, preserveScroll: true, replace: true },
        );
    };

    const openIssue = () => {
        manualForm.reset();
        manualForm.clearErrors();
        manualForm.setData({ ...manualForm.data, issued_at: today() });
        setIssuingOpen(true);
    };

    const submitManual = (e) => {
        e.preventDefault();
        manualForm.post('/admin/certificates', {
            preserveScroll: true,
            onSuccess: () => {
                setIssuingOpen(false);
                manualForm.reset();
            },
        });
    };

    const issueFromEnrollment = (e) => {
        e.preventDefault();
        if (!enrollmentId) return;

        setQuickIssuing(true);
        router.post(
            '/admin/certificates',
            { enrollment_id: enrollmentId },
            {
                preserveScroll: true,
                onSuccess: () => setEnrollmentId(''),
                onFinish: () => setQuickIssuing(false),
            },
        );
    };

    const confirmRevoke = () => {
        router.patch(
            `/admin/certificates/${revoking.uuid}/revoke`,
            { reason: revokeReason },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setRevoking(null);
                    setRevokeReason('');
                },
            },
        );
    };

    const selectCourse = (value) => {
        const match = courses.find((c) => String(c.id) === String(value));
        manualForm.setData({
            ...manualForm.data,
            course_id: value,
            course_title: match?.title || manualForm.data.course_title,
        });
    };

    const selectStudent = (value) => {
        const match = students.find((s) => String(s.id) === String(value));
        manualForm.setData({
            ...manualForm.data,
            student_name: match?.name || manualForm.data.student_name,
            student_email: match?.email || manualForm.data.student_email,
        });
    };

    const columns = useMemo(
        () => [
            {
                key: 'code',
                label: 'Certificate',
                sortable: true,
                render: (row) => (
                    <div className="min-w-0">
                        <p className="font-mono text-xs font-semibold tracking-wide text-body">{row.code}</p>
                        <p className="mt-0.5 text-[11px] text-muted">Issued {row.issuedAt}</p>
                    </div>
                ),
            },
            {
                key: 'student_name',
                label: 'Student',
                sortable: true,
                render: (row) => (
                    <div className="min-w-0">
                        <p className="truncate font-medium text-body">{row.studentName}</p>
                        <p className="truncate text-xs text-muted">{row.studentEmail || '—'}</p>
                    </div>
                ),
            },
            {
                key: 'course_title',
                label: 'Course',
                sortable: true,
                render: (row) => (
                    <div className="min-w-0 max-w-[220px]">
                        <p className="truncate text-body">{row.courseTitle}</p>
                        <p className="truncate text-xs text-muted">{row.duration || 'Self-paced'}</p>
                    </div>
                ),
            },
            {
                key: 'result',
                label: 'Result',
                render: (row) => (
                    <div className="flex items-center gap-2 text-xs text-muted">
                        {row.grade && <span className="font-semibold text-body">{row.grade}</span>}
                        {row.score != null && <span>{row.score}%</span>}
                        {!row.grade && row.score == null && <span>—</span>}
                    </div>
                ),
            },
            {
                key: 'status',
                label: 'Status',
                render: (row) => (
                    <div className="space-y-1">
                        <StatusPill status={row.status} />
                        {row.status === 'revoked' && row.revokedReason && (
                            <p className="max-w-[160px] truncate text-[11px] text-muted" title={row.revokedReason}>
                                {row.revokedReason}
                            </p>
                        )}
                    </div>
                ),
            },
            {
                key: 'verifications',
                label: 'Verifications',
                render: (row) => (
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                        <BadgeCheck className="h-3.5 w-3.5" /> {row.verifications}
                    </span>
                ),
            },
            {
                key: 'actions',
                label: '',
                className: 'text-right',
                cellClassName: 'text-right',
                render: (row) => (
                    <div className="flex items-center justify-end gap-1">
                        <a
                            href={row.downloadUrl}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-black/[0.05] hover:text-body"
                            aria-label={`Download certificate ${row.code}`}
                        >
                            <Download className="h-4 w-4" />
                        </a>
                        <Link
                            href={row.verifyUrl}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-black/[0.05] hover:text-body"
                            aria-label={`Verify certificate ${row.code}`}
                        >
                            <ExternalLink className="h-4 w-4" />
                        </Link>
                        {row.status !== 'revoked' && (
                            <button
                                type="button"
                                onClick={() => {
                                    setRevoking(row);
                                    setRevokeReason('');
                                }}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-rose-50 hover:text-danger"
                                aria-label={`Revoke certificate ${row.code}`}
                            >
                                <Ban className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                ),
            },
        ],
        [],
    );

    return (
        <DashboardLayout title="Certificates">
            <Head title="Certificates" />

            <div className="space-y-6">
                <PageHeader
                    eyebrow="Credentials"
                    title="Certificates"
                    description="Issue, download, verify and revoke signed certificates. Every certificate is linked to a real student and course record."
                    actions={
                        <button
                            type="button"
                            onClick={openIssue}
                            className="inline-flex h-10 items-center gap-2 rounded-xl bg-body px-3.5 text-sm font-semibold text-white hover:bg-body/90"
                        >
                            <Plus className="h-4 w-4" /> Issue certificate
                        </button>
                    }
                />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard stat={{ label: 'Total issued', value: stats.total, icon: 'award', accent: 'violet', hint: 'All certificates on record' }} />
                    <StatCard stat={{ label: 'Active', value: stats.active, icon: 'check', accent: 'emerald', hint: 'Valid and verifiable' }} />
                    <StatCard stat={{ label: 'Revoked', value: stats.revoked, icon: 'userX', accent: 'rose', hint: 'Withdrawn credentials' }} />
                    <StatCard stat={{ label: 'Awaiting issuance', value: stats.eligible, icon: 'sparkles', accent: 'gold', hint: 'Completed enrolments without a certificate' }} />
                </div>

                {eligibleEnrollments.length > 0 && (
                    <Panel
                        title="Ready to issue"
                        description="Learners who finished a course and do not yet have an active certificate."
                    >
                        <form onSubmit={issueFromEnrollment} className="flex flex-col gap-3 lg:flex-row lg:items-end">
                            <Field label="Completed enrolment" className="flex-1">
                                <select value={enrollmentId} onChange={(e) => setEnrollmentId(e.target.value)} className={selectCls}>
                                    <option value="">Select a completed enrolment</option>
                                    {eligibleEnrollments.map((e) => (
                                        <option key={e.id} value={e.id}>
                                            {e.studentName} — {e.courseTitle} ({e.progress}%)
                                        </option>
                                    ))}
                                </select>
                            </Field>
                            <button
                                type="submit"
                                disabled={!enrollmentId || quickIssuing}
                                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-violet px-4 text-sm font-semibold text-white hover:bg-violet/90 disabled:opacity-50"
                            >
                                <Sparkles className="h-4 w-4" /> {quickIssuing ? 'Issuing…' : 'Issue certificate'}
                            </button>
                        </form>
                    </Panel>
                )}

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
                            placeholder="Search by code, student or course"
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
                            className={`${selectCls} w-auto min-w-[140px]`}
                        >
                            <option value="all">All statuses</option>
                            <option value="active">Active</option>
                            <option value="revoked">Revoked</option>
                            <option value="expired">Expired</option>
                        </select>
                        <select
                            value={course}
                            onChange={(e) => {
                                setCourse(e.target.value);
                                applyFilters({ course: e.target.value });
                            }}
                            className={`${selectCls} w-auto min-w-[180px]`}
                        >
                            <option value="all">All courses</option>
                            {courses.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <DataTable
                    columns={columns}
                    rows={certificates.data}
                    rowKey="uuid"
                    sort={filters.sort}
                    direction={filters.direction}
                    onSort={sortBy}
                    emptyTitle="No certificates found"
                    emptyText="Issue a certificate or adjust your filters."
                    footer={<Pagination paginator={certificates} />}
                />

                <Dialog
                    open={issuingOpen}
                    onClose={() => setIssuingOpen(false)}
                    title="Issue a certificate"
                    description="Creates a signed, publicly verifiable credential."
                    size="lg"
                    footer={
                        <>
                            <button
                                type="button"
                                onClick={() => setIssuingOpen(false)}
                                className="h-10 rounded-xl border border-black/[0.1] px-4 text-sm font-semibold text-body hover:bg-black/[0.03]"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="issue-certificate-form"
                                disabled={manualForm.processing}
                                className="h-10 rounded-xl bg-body px-4 text-sm font-semibold text-white hover:bg-body/90 disabled:opacity-60"
                            >
                                {manualForm.processing ? 'Issuing…' : 'Issue certificate'}
                            </button>
                        </>
                    }
                >
                    <form id="issue-certificate-form" onSubmit={submitManual} className="grid gap-4 sm:grid-cols-2">
                        <Field label="Existing student (optional)" hint="Fills the name and email below." className="sm:col-span-2">
                            <select className={selectCls} value="" onChange={(e) => selectStudent(e.target.value)}>
                                <option value="">Enter manually</option>
                                {students.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name} — {s.email}
                                    </option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Student name" required error={manualForm.errors.student_name}>
                            <input
                                value={manualForm.data.student_name}
                                onChange={(e) => manualForm.setData('student_name', e.target.value)}
                                className={inputCls}
                                placeholder="e.g. Amina Yusuf"
                            />
                        </Field>
                        <Field label="Student email" error={manualForm.errors.student_email}>
                            <input
                                type="email"
                                value={manualForm.data.student_email}
                                onChange={(e) => manualForm.setData('student_email', e.target.value)}
                                className={inputCls}
                                placeholder="student@example.com"
                            />
                        </Field>

                        <Field label="Course" error={manualForm.errors.course_id}>
                            <select className={selectCls} value={manualForm.data.course_id} onChange={(e) => selectCourse(e.target.value)}>
                                <option value="">No linked course</option>
                                {courses.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.title}
                                    </option>
                                ))}
                            </select>
                        </Field>
                        <Field label="Course title" required error={manualForm.errors.course_title}>
                            <input
                                value={manualForm.data.course_title}
                                onChange={(e) => manualForm.setData('course_title', e.target.value)}
                                className={inputCls}
                                placeholder="Certificate course title"
                            />
                        </Field>

                        <Field label="Duration" error={manualForm.errors.duration}>
                            <input
                                value={manualForm.data.duration}
                                onChange={(e) => manualForm.setData('duration', e.target.value)}
                                className={inputCls}
                                placeholder="e.g. 12 weeks"
                            />
                        </Field>
                        <Field label="Instructor" error={manualForm.errors.instructor_name}>
                            <input
                                value={manualForm.data.instructor_name}
                                onChange={(e) => manualForm.setData('instructor_name', e.target.value)}
                                className={inputCls}
                                placeholder="Lead instructor"
                            />
                        </Field>

                        <Field label="Score (%)" error={manualForm.errors.score}>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={manualForm.data.score}
                                onChange={(e) => manualForm.setData('score', e.target.value)}
                                className={inputCls}
                                placeholder="Optional"
                            />
                        </Field>
                        <Field label="Grade" error={manualForm.errors.grade}>
                            <input
                                value={manualForm.data.grade}
                                onChange={(e) => manualForm.setData('grade', e.target.value)}
                                className={inputCls}
                                placeholder="e.g. A"
                            />
                        </Field>

                        <Field label="Issued on" required error={manualForm.errors.issued_at}>
                            <input
                                type="date"
                                max={today()}
                                value={manualForm.data.issued_at}
                                onChange={(e) => manualForm.setData('issued_at', e.target.value)}
                                className={inputCls}
                            />
                        </Field>
                        <Field label="Expires on" error={manualForm.errors.expires_at} hint="Leave empty for no expiry.">
                            <input
                                type="date"
                                value={manualForm.data.expires_at}
                                onChange={(e) => manualForm.setData('expires_at', e.target.value)}
                                className={inputCls}
                            />
                        </Field>
                    </form>
                </Dialog>

                <Dialog
                    open={!!revoking}
                    onClose={() => {
                        setRevoking(null);
                        setRevokeReason('');
                    }}
                    title="Revoke certificate"
                    description={revoking ? `${revoking.code} — ${revoking.studentName}` : ''}
                    size="sm"
                    footer={
                        <>
                            <button
                                type="button"
                                onClick={() => {
                                    setRevoking(null);
                                    setRevokeReason('');
                                }}
                                className="h-10 rounded-xl border border-black/[0.1] px-4 text-sm font-semibold text-body hover:bg-black/[0.03]"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmRevoke}
                                disabled={revokeReason.trim().length < 3}
                                className="flex h-10 items-center gap-2 rounded-xl bg-danger px-4 text-sm font-semibold text-white hover:bg-danger/90 disabled:opacity-50"
                            >
                                <ShieldX className="h-4 w-4" /> Revoke
                            </button>
                        </>
                    }
                >
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 rounded-xl bg-rose-50 p-3 text-sm text-rose-700">
                            <Ban className="mt-0.5 h-4 w-4 shrink-0" />
                            <p>The public verification page will immediately report this certificate as revoked. This cannot be undone.</p>
                        </div>
                        <Field label="Reason for revocation" required>
                            <textarea
                                rows={3}
                                value={revokeReason}
                                onChange={(e) => setRevokeReason(e.target.value)}
                                className="w-full rounded-xl border border-black/[0.1] px-3.5 py-2.5 text-sm text-body outline-none focus:border-violet focus:ring-2 focus:ring-violet/15"
                                placeholder="Explain why this certificate is being revoked"
                            />
                        </Field>
                    </div>
                </Dialog>
            </div>
        </DashboardLayout>
    );
}
