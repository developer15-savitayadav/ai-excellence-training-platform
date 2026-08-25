const heightMap = { sm: 'h-1.5', md: 'h-[6px]' };

export default function ProgressBar({
    value = 0,
    max,
    className = '',
    showLabel = false,
    height = 'sm',
}) {
    const percentage = max && max > 0 ? Math.min(100, (value / max) * 100) : value;
    const clamped = Math.max(0, Math.min(100, percentage));

    return (
        <div className={className}>
            {showLabel && (
                <div className="mb-1.5 text-right font-mono text-xs text-muted">
                    {Math.round(clamped)}%
                </div>
            )}

            <div className={`w-full rounded-full bg-black/[0.08] ${heightMap[height] || heightMap.sm}`}>
                <div
                    className="h-full rounded-full bg-lime transition-all duration-[400ms] ease"
                    style={{ width: `${clamped}%` }}
                />
            </div>
        </div>
    );
}
