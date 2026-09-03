import { useState, useMemo } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthLayout from '../../Layouts/AuthLayout';
import Button from '../../Components/ui/Button';

function getPasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
}

function PasswordStrengthBar({ password }) {
    const score = useMemo(() => getPasswordStrength(password), [password]);
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const colors = ['', 'bg-danger', 'bg-amber-500', 'bg-amber-400', 'bg-lime', 'bg-lime'];

    if (!password) return null;

    return (
        <div className="mt-1">
            <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                            i < score ? colors[score] : 'bg-black/[0.08]'
                        }`}
                    />
                ))}
            </div>
            <p className="text-xs text-muted mt-0.5">
                {labels[score]}
            </p>
        </div>
    );
}

export default function Register() {
    const { data, setData, post, processing, errors: serverErrors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
        terms: false,
    });

    const { props } = usePage();
    const pageErrors = props.errors || {};

    const [validationErrors, setValidationErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!data.name.trim()) errs.name = 'Name is required.';
        if (!data.email.trim()) {
            errs.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errs.email = 'Please enter a valid email address.';
        }
        if (!data.password) {
            errs.password = 'Password is required.';
        } else if (data.password.length < 8) {
            errs.password = 'Password must be at least 8 characters.';
        }
        if (data.password !== data.password_confirmation) {
            errs.password_confirmation = 'Passwords do not match.';
        }
        if (!data.role) errs.role = 'Please select a role.';
        if (!data.terms) errs.terms = 'You must agree to the terms.';
        return errs;
    };

    const submit = (e) => {
        e.preventDefault();
        const clientErrors = validate();
        setValidationErrors(clientErrors);
        if (Object.keys(clientErrors).length > 0) return;

        post('/register', {
            onFinish: () => setData('password', '', 'password_confirmation', ''),
        });
    };

    const displayErrors = { ...validationErrors, ...pageErrors };

    const inputClass =
        'h-10 w-full rounded-xl border border-black/10 bg-white px-4 text-[15px] text-body placeholder:text-muted/50 shadow-[0_1px_2px_rgba(0,0,0,0.03)] outline-none transition-all focus:border-violet/50 focus:ring-2 focus:ring-violet/10';

    return (
        <AuthLayout>
            <Head title="Create Account" />

            <div className="mb-3">
                <h1 className="font-display text-[1.6rem] sm:text-[1.75rem] font-bold tracking-[-0.035em] text-body">
                    Create your account
                </h1>
                <p className="mt-1 text-sm text-muted">
                    Start your AI learning journey today.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                        <label htmlFor="name" className="mb-1 block text-sm font-medium text-body">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            autoComplete="name"
                            required
                            className={inputClass}
                            placeholder="Jane Smith"
                        />
                        {displayErrors.name && (
                            <p className="mt-1 text-sm text-danger">{displayErrors.name}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium text-body">
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
                            className={inputClass}
                            placeholder="you@example.com"
                        />
                        {displayErrors.email && (
                            <p className="mt-1 text-sm text-danger">{displayErrors.email}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm font-medium text-body">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            autoComplete="new-password"
                            required
                            className={inputClass}
                            placeholder="Min. 8 characters"
                        />
                        <PasswordStrengthBar password={data.password} />
                        {displayErrors.password && (
                            <p className="mt-1 text-sm text-danger">{displayErrors.password}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password_confirmation"
                            className="mb-1 block text-sm font-medium text-body"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            autoComplete="new-password"
                            required
                            className={inputClass}
                            placeholder="Repeat your password"
                        />
                        {displayErrors.password_confirmation && (
                            <p className="mt-1 text-sm text-danger">
                                {displayErrors.password_confirmation}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-body">I am a...</label>
                    <div className="grid grid-cols-2 gap-2.5">
                        <button
                            type="button"
                            onClick={() => setData('role', 'student')}
                            className={`rounded-xl border-2 p-3 text-left transition-all ${
                                data.role === 'student'
                                    ? 'border-violet bg-violet/[0.05] shadow-[0_0_30px_-8px_rgba(152,44,220,.18)]'
                                    : 'border-black/10 bg-white hover:border-black/20 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]'
                            }`}
                        >
                            <div className="mb-0.5 text-base">🎓</div>
                            <div className="font-display font-semibold text-body text-sm">Student</div>
                            <div className="mt-0.5 text-[11px] text-muted">I want to learn AI</div>
                        </button>
                        <button
                            type="button"
                            onClick={() => setData('role', 'instructor')}
                            className={`rounded-xl border-2 p-3 text-left transition-all ${
                                data.role === 'instructor'
                                    ? 'border-violet bg-violet/[0.05] shadow-[0_0_30px_-8px_rgba(152,44,220,.18)]'
                                    : 'border-black/10 bg-white hover:border-black/20 hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]'
                            }`}
                        >
                            <div className="mb-0.5 text-base">📚</div>
                            <div className="font-display font-semibold text-body text-sm">Instructor</div>
                            <div className="mt-0.5 text-[11px] text-muted">I want to teach AI</div>
                        </button>
                    </div>
                    {displayErrors.role && (
                        <p className="mt-1 text-sm text-danger">{displayErrors.role}</p>
                    )}
                </div>

                <div>
                    <label className="flex cursor-pointer items-start gap-3">
                        <input
                            type="checkbox"
                            checked={data.terms}
                            onChange={(e) => setData('terms', e.target.checked)}
                            className="mt-0.5 h-4 w-4 rounded border-black/20 bg-white text-violet focus:ring-violet/30"
                        />
                        <span className="text-sm text-muted">
                            I agree to the{' '}
                            <Link href="/terms" className="text-violet hover:text-violet/70 transition-colors">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link
                                href="/privacy"
                                className="text-violet hover:text-violet/70 transition-colors"
                            >
                                Privacy Policy
                            </Link>
                        </span>
                    </label>
                    {displayErrors.terms && (
                        <p className="mt-1 text-sm text-danger">{displayErrors.terms}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={processing}
                    className="h-11 w-full text-base"
                >
                    {processing ? 'Creating account...' : 'Create Account'}
                </Button>
            </form>

            <p className="mt-3 text-center text-sm text-muted">
                Already have an account?{' '}
                <Link
                    href="/login"
                    className="font-semibold text-violet transition-colors hover:text-violet/70"
                >
                    Sign in
                </Link>
            </p>
        </AuthLayout>
    );
}