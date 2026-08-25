import { Link } from '@inertiajs/react';
import ToastContainer from '../Components/ui/Toast';

function Logo() {
    return (
        <Link href="/" className="flex items-center justify-center gap-2 group">
            <span className="inline-block h-2.5 w-2.5 rotate-45 bg-lime transition-transform group-hover:scale-125" />
            <span className="font-display font-bold text-xl text-body">Cortex Academy</span>
        </Link>
    );
}

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-ink flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="mb-8">
                    <Logo />
                </div>
                {children}
            </div>
            <ToastContainer />
        </div>
    );
}
