export const inputCls =
    'h-11 w-full rounded-xl border border-black/[0.1] bg-white px-3.5 text-sm text-body placeholder:text-muted/70 outline-none transition-colors focus:border-violet focus:ring-2 focus:ring-violet/15 disabled:bg-black/[0.02]';

export const selectCls =
    'h-11 w-full rounded-xl border border-black/[0.1] bg-white px-3.5 text-sm text-body outline-none transition-colors focus:border-violet focus:ring-2 focus:ring-violet/15';

export const textareaCls =
    'w-full rounded-xl border border-black/[0.1] bg-white px-3.5 py-2.5 text-sm text-body placeholder:text-muted/70 outline-none transition-colors focus:border-violet focus:ring-2 focus:ring-violet/15';

export function Field({ label, htmlFor, error, hint, required, children, className = '' }) {
    return (
        <div className={`space-y-1.5 ${className}`}>
            {label && (
                <label htmlFor={htmlFor} className="block text-xs font-semibold text-body">
                    {label}
                    {required && <span className="ml-0.5 text-danger">*</span>}
                </label>
            )}
            {children}
            {hint && !error && <p className="text-[11px] text-muted">{hint}</p>}
            {error && <p className="text-[11px] font-medium text-danger">{error}</p>}
        </div>
    );
}

export function Toggle({ checked, onChange, label }) {
    return (
        <label className="inline-flex cursor-pointer items-center gap-2.5">
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-violet' : 'bg-black/15'}`}
            >
                <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-[22px]' : 'translate-x-0.5'}`}
                />
            </button>
            {label && <span className="text-sm text-body">{label}</span>}
        </label>
    );
}
