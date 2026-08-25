import { Head, Link, router } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';
import Button from '../../Components/ui/Button';

const CERTIFICATE_DATA = {
    id: 'cert_001',
    code: 'CAX-7F3K-9M2P',
    studentName: 'Alex Chen',
    courseName: 'Deep Learning Fundamentals',
    completionDate: '2024-11-15',
    duration: '24 hours',
    score: 94,
    instructorName: 'Dr. Sarah Mitchell',
    platformDirector: 'Maya Rodriguez',
};

function CertificateContent({ cert }) {
    const formattedDate = new Date(cert.completionDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="bg-panel border border-black/[0.08] rounded-2xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-lime to-violet" />

            <div className="p-12 text-center">
                <div className="font-display font-bold text-2xl text-body mb-8">
                    Cortex <span className="text-lime">Academy</span>
                </div>

                <div className="border border-lime/20 rounded-xl p-10 relative">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-lime/40 rounded-tl-xl" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-lime/40 rounded-tr-xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-lime/40 rounded-bl-xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-lime/40 rounded-br-xl" />

                    <h1 className="font-display text-3xl font-bold text-body tracking-tight">
                        Certificate of Completion
                    </h1>

                    <p className="text-muted mt-6 text-sm">This is to certify that</p>

                    <p className="text-2xl font-display font-semibold text-lime mt-3">
                        {cert.studentName}
                    </p>

                    <p className="text-muted mt-3 text-sm">has successfully completed the course</p>

                    <p className="text-xl font-display font-semibold text-body mt-2">
                        {cert.courseName}
                    </p>

                    <div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t border-black/[0.08]">
                        <div className="text-center">
                            <p className="text-sm text-muted">Completion Date</p>
                            <p className="font-mono text-sm text-body mt-1">{formattedDate}</p>
                        </div>
                        <div className="h-8 w-px bg-black/[0.12]" />
                        <div className="text-center">
                            <p className="text-sm text-muted">Duration</p>
                            <p className="font-mono text-sm text-body mt-1">{cert.duration}</p>
                        </div>
                        <div className="h-8 w-px bg-black/[0.12]" />
                        <div className="text-center">
                            <p className="text-sm text-muted">Final Score</p>
                            <p className="font-mono text-sm text-lime mt-1">{cert.score}%</p>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-black/[0.06]">
                        <p className="font-mono text-xs text-muted">
                            Verification Code: {cert.code}
                        </p>
                        <p className="font-mono text-xs text-muted/60 mt-1">
                            Verify at cortexacademy.com/certificate/{cert.code}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-16 mt-10">
                    <div className="text-center">
                        <div className="w-48 border-b border-black/[0.20] mb-2" />
                        <p className="font-display text-sm font-semibold text-body">{cert.instructorName}</p>
                        <p className="text-xs text-muted mt-1">Instructor</p>
                    </div>
                    <div className="text-center">
                        <div className="w-48 border-b border-black/[0.20] mb-2" />
                        <p className="font-display text-sm font-semibold text-body">{cert.platformDirector}</p>
                        <p className="text-xs text-muted mt-1">Platform Director</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Show({ certificate, verified }) {
    if (verified) {
        const isValid = certificate !== undefined && certificate !== null;
        const cert = isValid ? certificate : null;

        return (
            <PublicLayout>
                <Head title="Verify Certificate" />

                <div className="min-h-screen flex items-center justify-center px-6 py-20">
                    <div className="max-w-lg w-full text-center space-y-8">
                        <div
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                                isValid
                                    ? 'bg-success/10 text-success border border-success/20'
                                    : 'bg-danger/10 text-danger border border-danger/20'
                            }`}
                        >
                            {isValid ? '✓ Verified' : '✗ Not Found'}
                        </div>

                        <h1 className="font-display text-2xl font-semibold text-body">
                            Certificate Verification
                        </h1>

                        {isValid ? (
                            <>
                                <div className="bg-panel border border-black/[0.08] rounded-2xl p-8 text-left space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted">Student</span>
                                        <span className="font-display font-semibold text-body">{cert.studentName}</span>
                                    </div>
                                    <div className="h-px bg-black/[0.08]" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted">Course</span>
                                        <span className="font-display font-semibold text-body">{cert.courseName}</span>
                                    </div>
                                    <div className="h-px bg-black/[0.08]" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted">Completed</span>
                                        <span className="font-mono text-sm text-body">{cert.completionDate}</span>
                                    </div>
                                    <div className="h-px bg-black/[0.08]" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted">Score</span>
                                        <span className="font-mono text-sm text-lime font-semibold">{cert.score}%</span>
                                    </div>
                                    <div className="h-px bg-black/[0.08]" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted">Verification Code</span>
                                        <span className="font-mono text-sm text-violet">{cert.code}</span>
                                    </div>
                                </div>

                                <p className="text-xs text-muted/60">
                                    This certificate was issued by Cortex Academy and can be verified at any time.
                                </p>
                            </>
                        ) : (
                            <p className="text-muted">
                                No certificate was found with the provided verification code. Please double-check the code and try again.
                            </p>
                        )}

                        <Button href="/" className="mt-4">
                            Back to Home
                        </Button>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    const cert = certificate || CERTIFICATE_DATA;

    return (
        <PublicLayout>
            <Head title={`Certificate — ${cert.courseName}`} />

            <div className="max-w-3xl mx-auto px-6 py-20 space-y-8">
                <CertificateContent cert={cert} />

                <div className="flex items-center justify-center gap-4">
                    <Button
                        onClick={() => alert('PDF download coming soon!')}
                    >
                        Download PDF
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => alert('Share feature coming soon!')}
                    >
                        Share
                    </Button>
                </div>

                <div className="text-center">
                    <Link
                        href="/"
                        className="text-sm text-muted hover:text-body transition-colors"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
}
