import { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';
import Button from '../../Components/ui/Button';

function GoogleIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );
}

function GitHubIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
    );
}

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const { props } = usePage();
    const pageErrors = props.errors || {};

    const [validationErrors, setValidationErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!data.email.trim()) {
            errs.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errs.email = 'Please enter a valid email address.';
        }
        if (!data.password) {
            errs.password = 'Password is required.';
        }
        return errs;
    };

    const submit = (e) => {
        e.preventDefault();
        const clientErrors = validate();
        setValidationErrors(clientErrors);
        if (Object.keys(clientErrors).length > 0) return;

        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    const displayErrors = { ...validationErrors, ...pageErrors };

    return (
        <AuthLayout>
            <Head title="Sign In" />

            <div className="text-center mb-8">
                <h1 className="font-display text-3xl font-bold text-body">Welcome Back</h1>
                <p className="text-muted mt-2">Sign in to your Cortex Academy account</p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg px-4 py-3">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-body mb-1.5">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        autoComplete="username"
                        required
                        className="w-full rounded-xl border border-black/[0.12] bg-black/[0.04] px-4 py-3 text-body placeholder:text-muted/50 outline-none transition-colors focus:border-lime/50 focus:ring-1 focus:ring-lime/30"
                        placeholder="you@example.com"
                    />
                    {displayErrors.email && (
                        <p className="mt-1.5 text-sm text-danger">{displayErrors.email}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-body mb-1.5">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="current-password"
                        required
                        className="w-full rounded-xl border border-black/[0.12] bg-black/[0.04] px-4 py-3 text-body placeholder:text-muted/50 outline-none transition-colors focus:border-lime/50 focus:ring-1 focus:ring-lime/30"
                        placeholder="Enter your password"
                    />
                    {displayErrors.password && (
                        <p className="mt-1.5 text-sm text-danger">{displayErrors.password}</p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="h-4 w-4 rounded border-black/20 bg-black/[0.04] text-lime focus:ring-lime/30"
                        />
                        <span className="text-sm text-muted">Remember me</span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href="/forgot-password"
                            className="text-sm text-violet hover:text-lime transition-colors"
                        >
                            Forgot password?
                        </Link>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={processing}
                    className="w-full"
                >
                    {processing ? 'Signing in...' : 'Sign In'}
                </Button>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-black/[0.08]" />
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-ink px-4 text-sm text-muted">or continue with</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl border border-black/[0.12] bg-black/[0.04] px-4 py-3 text-sm font-medium text-body transition-all hover:border-black/20 hover:bg-black/[0.08]"
                >
                    <GoogleIcon />
                    Google
                </button>
                <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl border border-black/[0.12] bg-black/[0.04] px-4 py-3 text-sm font-medium text-body transition-all hover:border-black/20 hover:bg-black/[0.08]"
                >
                    <GitHubIcon />
                    GitHub
                </button>
            </div>

            <p className="text-center text-sm text-muted mt-8">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-violet font-semibold hover:text-lime transition-colors">
                    Sign up
                </Link>
            </p>
        </AuthLayout>
    );
}
