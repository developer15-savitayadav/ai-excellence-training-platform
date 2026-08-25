import { useState, useEffect, useCallback, createContext, useContext, useRef } from 'react';

const TOAST_EVENT = 'cortex-academy:toast';

const accentMap = {
    success: 'border-l-lime',
    error: 'border-l-danger',
    info: 'border-l-violet',
};

let toastId = 0;

export function useToast() {
    return {
        show(message, type = 'success') {
            window.dispatchEvent(
                new CustomEvent(TOAST_EVENT, {
                    detail: { id: ++toastId, message, type },
                })
            );
        },
    };
}

function ToastItem({ toast, onDismiss }) {
    const [visible, setVisible] = useState(false);
    const [leaving, setLeaving] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLeaving(true);
            setTimeout(() => onDismiss(toast.id), 300);
        }, 4000);
        return () => clearTimeout(timer);
    }, [toast.id, onDismiss]);

    return (
        <div
            className={[
                'pointer-events-auto min-w-[320px] rounded-xl border border-black/[0.08] bg-panel p-4 shadow-lg',
                'border-l-[3px]',
                accentMap[toast.type] || accentMap.info,
                'transition-all duration-300 ease',
                visible && !leaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
            ]
                .filter(Boolean)
                .join(' ')}
            role="alert"
        >
            <div className="flex items-start gap-3">
                <p className="flex-1 text-sm leading-relaxed text-body">{toast.message}</p>

                <button
                    type="button"
                    onClick={() => {
                        setLeaving(true);
                        setTimeout(() => onDismiss(toast.id), 300);
                    }}
                    className="shrink-0 text-muted transition-colors duration-150 hover:text-body"
                    aria-label="Dismiss"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default function ToastContainer() {
    const [toasts, setToasts] = useState([]);
    const dismiss = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    useEffect(() => {
        function handleToast(e) {
            setToasts((prev) => [...prev, e.detail]);
        }
        window.addEventListener(TOAST_EVENT, handleToast);
        return () => window.removeEventListener(TOAST_EVENT, handleToast);
    }, []);

    if (toasts.length === 0) return null;

    return (
        <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {toasts.map((t) => (
                <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
            ))}
        </div>
    );
}
