import { Head } from '@inertiajs/react';
import PublicLayout from '../Layouts/PublicLayout';
import Button from '../Components/ui/Button';

export default function NotFound() {
    return (
        <PublicLayout>
            <Head title="404 — Page Not Found" />

            <div className="min-h-[80vh] flex items-center justify-center px-6">
                <div className="text-center relative">
                    <span className="font-display text-[8rem] font-bold text-black/[0.06] leading-none select-none">
                        404
                    </span>

                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <h1 className="font-display text-2xl font-semibold text-body">
                            Page Not Found
                        </h1>
                        <p className="text-muted mt-3 max-w-md">
                            The page you're looking for doesn't exist or has been moved.
                        </p>

                        <div className="flex items-center gap-4 mt-8">
                            <Button href="/">
                                Go Home
                            </Button>
                            <Button href="/courses" variant="secondary">
                                Browse Courses
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
