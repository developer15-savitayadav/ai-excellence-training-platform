const colorMap = {
    lime: 'bg-lime/15 text-lime',
    violet: 'bg-violet/15 text-violet',
    success: 'bg-success/15 text-success',
    danger: 'bg-danger/15 text-danger',
    muted: 'bg-black/[0.08] text-muted',
    info: 'bg-violet/15 text-violet',
    warning: 'bg-amber-400/15 text-amber-400',
};

export default function Badge({ variant = 'lime', className = '', children }) {
    return (
        <span
            className={[
                'inline-flex items-center rounded-full px-3 py-1 font-mono text-xs font-medium',
                colorMap[variant] || colorMap.lime,
                className,
            ]
                .filter(Boolean)
                .join(' ')}
        >
            {children}
        </span>
    );
}
