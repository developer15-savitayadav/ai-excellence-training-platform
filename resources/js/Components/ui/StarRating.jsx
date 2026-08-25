export default function StarRating({ rating = 0, size = 'md', showValue = false }) {
    const clamped = Math.max(0, Math.min(5, rating));
    const fullStars = Math.floor(clamped);
    const hasHalf = clamped - fullStars >= 0.25 && clamped - fullStars < 0.75;
    const roundedUp = clamped - fullStars >= 0.75;
    const totalFull = roundedUp ? fullStars + 1 : fullStars;
    const empty = 5 - totalFull - (hasHalf ? 1 : 0);

    const sizeClass = size === 'sm' ? 'text-sm' : 'text-base';

    return (
        <span className={`inline-flex items-center gap-0.5 ${sizeClass}`}>
            {Array.from({ length: totalFull }).map((_, i) => (
                <span key={`f${i}`} className="text-amber-400" aria-hidden="true">
                    ★
                </span>
            ))}

            {hasHalf && (
                <span className="relative inline-block text-muted" aria-hidden="true">
                    <span className="absolute inset-0 overflow-hidden text-muted">☆</span>
                    <span className="text-amber-400" style={{ clipPath: 'inset(0 50% 0 0)' }}>
                        ★
                    </span>
                </span>
            )}

            {Array.from({ length: empty }).map((_, i) => (
                <span key={`e${i}`} className="text-muted" aria-hidden="true">
                    ☆
                </span>
            ))}

            <span className="sr-only">{clamped} out of 5 stars</span>

            {showValue && (
                <span className="ml-1 font-mono text-xs text-muted">{clamped.toFixed(1)}</span>
            )}
        </span>
    );
}
