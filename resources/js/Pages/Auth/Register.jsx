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
        <div className="mt-2">
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
            <p className="text-xs text-muted mt-1">
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

    return (
        <AuthLayout>
            <Head title="Create Account" />

            <div className="text-center mb-8">
                <h1 className="font-display text-3xl font-bold text-body">Create Your Account</h1>
                <p className="text-muted mt-2">Start your AI learning journey today</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-body mb-1.5">
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
                        className="w-full rounded-xl border border-black/[0.12] bg-black/[0.04] px-4 py-3 text-body placeholder:text-muted/50 outline-none transition-colors focus:border-lime/50 focus:ring-1 focus:ring-lime/30"
                        placeholder="Jane Smith"
                    />
                    {displayErrors.name && (
                        <p className="mt-1.5 text-sm text-danger">{displayErrors.name}</p>
                    )}
                </div>

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
                        autoComplete="new-password"
                        required
                        className="w-full rounded-xl border border-black/[0.12] bg-black/[0.04] px-4 py-3 text-body placeholder:text-muted/50 outline-none transition-colors focus:border-lime/50 focus:ring-1 focus:ring-lime/30"
                        placeholder="Min. 8 characters"
                    />
                    <PasswordStrengthBar password={data.password} />
                    {displayErrors.password && (
                        <p className="mt-1.5 text-sm text-danger">{displayErrors.password}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-body mb-1.5">
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
                        className="w-full rounded-xl border border-black/[0.12] bg-black/[0.04] px-4 py-3 text-body placeholder:text-muted/50 outline-none transition-colors focus:border-lime/50 focus:ring-1 focus:ring-lime/30"
                        placeholder="Repeat your password"
                    />
                    {displayErrors.password_confirmation && (
                        <p className="mt-1.5 text-sm text-danger">{displayErrors.password_confirmation}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-body mb-3">I am a...</label>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => setData('role', 'student')}
                            className={`rounded-xl border-2 p-5 text-left transition-all ${
                                data.role === 'student'
                                    ? 'border-lime bg-lime/[0.06] shadow-[0_0_30px_-8px_rgba(238,195,105,.2)]'
                                    : 'border-black/[0.12] bg-black/[0.02] hover:border-black/20'
                            }`}
                        >
                            <div className="text-2xl mb-2">🎓</div>
                            <div className="font-display font-semibold text-body">Student</div>
                            <div className="text-xs text-muted mt-1">I want to learn AI</div>
                        </button>
                        <button
                            type="button"
                            onClick={() => setData('role', 'instructor')}
                            className={`rounded-xl border-2 p-5 text-left transition-all ${
                                data.role === 'instructor'
                                    ? 'border-violet bg-violet/[0.06] shadow-[0_0_30px_-8px_rgba(152,44,220,.2)]'
                                    : 'border-black/[0.12] bg-black/[0.02] hover:border-black/20'
                            }`}
                        >
                            <div className="text-2xl mb-2">📚</div>
                            <div className="font-display font-semibold text-body">Instructor</div>
                            <div className="text-xs text-muted mt-1">I want to teach AI</div>
                        </button>
                    </div>
                    {displayErrors.role && (
                        <p className="mt-1.5 text-sm text-danger">{displayErrors.role}</p>
                    )}
                </div>

                <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={data.terms}
                            onChange={(e) => setData('terms', e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-black/20 bg-black/[0.04] text-lime focus:ring-lime/30"
                        />
                        <span className="text-sm text-muted">
                            I agree to the{' '}
                            <Link href="/terms" className="text-violet hover:text-lime transition-colors">
                                Terms of Service
                            </Link>{' '}
                            and{' '}
                            <Link href="/privacy" className="text-violet hover:text-lime transition-colors">
                                Privacy Policy
                            </Link>
                        </span>
                    </label>
                    {displayErrors.terms && (
                        <p className="mt-1.5 text-sm text-danger">{displayErrors.terms}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={processing}
                    className="w-full"
                >
                    {processing ? 'Creating account...' : 'Create Account'}
                </Button>
            </form>

            <p className="text-center text-sm text-muted mt-8">
                Already have an account?{' '}
                <Link href="/login" className="text-violet font-semibold hover:text-lime transition-colors">
                    Sign in
                </Link>
            </p>
        </AuthLayout>
    );
}
