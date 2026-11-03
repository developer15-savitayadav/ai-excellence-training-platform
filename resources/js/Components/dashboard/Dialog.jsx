import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Dialog({ open, onClose, title, description, children, footer, size = 'lg' }) {
    useEffect(() => {
        if (!open) return;

        const onKey = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    if (!open) return null;

    const sizeCls = {
        sm: 'max-w-md',
        md: 'max-w-xl',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    }[size] || 'max-w-2xl';

    return (
        <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-body/40 backdrop-blur-[2px]" onClick={onClose} />

            <div className={`relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl ${sizeCls}`}>
                <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-black/[0.07] bg-white/95 px-5 py-4 backdrop-blur sm:px-6">
                    <div>
                        <h2 className="font-display text-lg font-semibold text-body">{title}</h2>
                        {description && <p className="mt-0.5 text-xs text-muted">{description}</p>}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-black/[0.05] hover:text-body"
                        aria-label="Close dialog"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="px-5 py-5 sm:px-6">{children}</div>

                {footer && (
                    <div className="flex flex-wrap items-center justify-end gap-2.5 border-t border-black/[0.07] bg-black/[0.015] px-5 py-4 sm:px-6">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
