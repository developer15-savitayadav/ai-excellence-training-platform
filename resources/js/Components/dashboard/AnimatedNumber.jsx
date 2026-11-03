import { useEffect, useRef, useState } from 'react';

function prefersReducedMotion() {
    if (typeof window === 'undefined') return false;
    return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export default function AnimatedNumber({ value = 0, duration = 900, decimals = 0, suffix = '', prefix = '', className = '' }) {
    const target = Number(value) || 0;
    const [display, setDisplay] = useState(target);
    const frame = useRef(null);
    const fromRef = useRef(target);

    useEffect(() => {
        if (prefersReducedMotion()) {
            setDisplay(target);
            return;
        }

        const from = fromRef.current;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(from + (target - from) * eased);

            if (progress < 1) {
                frame.current = requestAnimationFrame(tick);
            } else {
                fromRef.current = target;
            }
        };

        frame.current = requestAnimationFrame(tick);
        return () => frame.current && cancelAnimationFrame(frame.current);
    }, [target, duration]);

    const formatted = display.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });

    return (
        <span className={className}>
            {prefix}
            {formatted}
            {suffix}
        </span>
    );
}
