import { AlertTriangle } from 'lucide-react';
import Dialog from './Dialog';

export default function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title = 'Are you sure?',
    description = 'This action cannot be undone.',
    confirmLabel = 'Confirm',
    processing = false,
    tone = 'danger',
    children,
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            title={title}
            description={description}
            size="sm"
            footer={
                <>
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-10 rounded-xl border border-black/[0.1] px-4 text-sm font-semibold text-body transition-colors hover:bg-black/[0.04]"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={processing}
                        className={`h-10 rounded-xl px-4 text-sm font-semibold text-white transition-colors disabled:opacity-60 ${
                            tone === 'danger' ? 'bg-danger hover:bg-danger/90' : 'bg-body hover:bg-body/90'
                        }`}
                    >
                        {processing ? 'Working…' : confirmLabel}
                    </button>
                </>
            }
        >
            <div className="flex items-start gap-3">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tone === 'danger' ? 'bg-rose-50 text-danger' : 'bg-amber-50 text-amber-600'}`}>
                    <AlertTriangle className="h-5 w-5" />
                </span>
                <div className="text-sm text-muted">{children || <p>{description}</p>}</div>
            </div>
        </Dialog>
    );
}
