import { useId, useMemo } from 'react';

const PALETTE = ['#982cdc', '#eec369', '#34d399', '#38bdf8', '#fb7185', '#f59e0b'];

function niceMax(value) {
    if (value <= 4) return 4;
    const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
    return Math.ceil(value / magnitude) * magnitude;
}

export function LineChart({ labels = [], series = [], height = 220, showLegend = true }) {
    const id = useId().replace(/:/g, '');
    const max = Math.max(1, ...series.flatMap((s) => s.data || []));
    const ceiling = niceMax(max);
    const width = 640;
    const pad = { top: 14, right: 12, bottom: 26, left: 34 };
    const innerW = width - pad.left - pad.right;
    const innerH = height - pad.top - pad.bottom;
    const step = labels.length > 1 ? innerW / (labels.length - 1) : innerW;

    const pointsFor = (data) =>
        data.map((value, i) => {
            const x = pad.left + step * i;
            const y = pad.top + innerH - (value / ceiling) * innerH;
            return [x, y];
        });

    const line = (pts) => pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
    const area = (pts) =>
        pts.length
            ? `${line(pts)} L${pts[pts.length - 1][0]},${pad.top + innerH} L${pts[0][0]},${pad.top + innerH} Z`
            : '';

    const ticks = [0, 0.25, 0.5, 0.75, 1];

    return (
        <div>
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Trend chart">
                {ticks.map((t) => {
                    const y = pad.top + innerH - t * innerH;
                    return (
                        <g key={t}>
                            <line x1={pad.left} x2={width - pad.right} y1={y} y2={y} stroke="rgba(35,35,30,0.08)" strokeDasharray="3 4" />
                            <text x={pad.left - 8} y={y + 3} textAnchor="end" className="fill-[#8b8a82]" fontSize="10">
                                {Math.round(ceiling * t)}
                            </text>
                        </g>
                    );
                })}

                {labels.map((label, i) => (
                    <text
                        key={`${label}-${i}`}
                        x={pad.left + step * i}
                        y={height - 6}
                        textAnchor="middle"
                        className="fill-[#8b8a82]"
                        fontSize="10"
                    >
                        {label}
                    </text>
                ))}

                {series.map((s, index) => {
                    const pts = pointsFor(s.data || []);
                    const color = s.color || PALETTE[index % PALETTE.length];
                    return (
                        <g key={s.name || index}>
                            <path d={area(pts)} fill={`url(#grad-${id}-${index})`} opacity={index === 0 ? 0.55 : 0.2} />
                            <path d={line(pts)} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            {pts.map(([x, y], i) => (
                                <circle key={i} cx={x} cy={y} r="2.6" fill="white" stroke={color} strokeWidth="1.8">
                                    <title>{`${s.name || 'Value'}: ${s.data[i]} · ${labels[i]}`}</title>
                                </circle>
                            ))}
                        </g>
                    );
                })}

                <defs>
                    {series.map((s, index) => {
                        const color = s.color || PALETTE[index % PALETTE.length];
                        return (
                            <linearGradient key={index} id={`grad-${id}-${index}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={color} />
                                <stop offset="100%" stopColor={color} stopOpacity="0" />
                            </linearGradient>
                        );
                    })}
                </defs>
            </svg>

            {showLegend && (
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {series.map((s, index) => (
                        <span key={s.name || index} className="inline-flex items-center gap-2 text-xs text-muted">
                            <span
                                className="h-2 w-2 rounded-full"
                                style={{ background: s.color || PALETTE[index % PALETTE.length] }}
                            />
                            {s.name}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export function BarChart({ labels = [], values = [], color = '#982cdc', height = 220, suffix = '' }) {
    const max = niceMax(Math.max(1, ...values));
    const width = 640;
    const pad = { top: 14, right: 12, bottom: 28, left: 34 };
    const innerW = width - pad.left - pad.right;
    const innerH = height - pad.top - pad.bottom;
    const slot = labels.length ? innerW / labels.length : innerW;
    const barW = Math.min(38, slot * 0.55);

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Bar chart">
            {[0, 0.5, 1].map((t) => {
                const y = pad.top + innerH - t * innerH;
                return (
                    <g key={t}>
                        <line x1={pad.left} x2={width - pad.right} y1={y} y2={y} stroke="rgba(35,35,30,0.08)" strokeDasharray="3 4" />
                        <text x={pad.left - 8} y={y + 3} textAnchor="end" className="fill-[#8b8a82]" fontSize="10">
                            {Math.round(max * t)}
                        </text>
                    </g>
                );
            })}

            {values.map((value, i) => {
                const h = Math.max(2, (value / max) * innerH);
                const x = pad.left + slot * i + (slot - barW) / 2;
                const y = pad.top + innerH - h;
                return (
                    <g key={i}>
                        <rect x={x} y={y} width={barW} height={h} rx="6" fill={color} opacity={0.9}>
                            <title>{`${labels[i]}: ${value}${suffix}`}</title>
                        </rect>
                        <text x={x + barW / 2} y={height - 8} textAnchor="middle" className="fill-[#8b8a82]" fontSize="10">
                            {labels[i]}
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

export function DonutChart({ data = [], size = 180, thickness = 20, centerLabel, centerValue }) {
    const total = data.reduce((sum, d) => sum + (Number(d.value) || 0), 0);
    const radius = (size - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    return (
        <div className="flex flex-col items-center gap-5 sm:flex-row">
            <div className="relative shrink-0" style={{ width: size, height: size }}>
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="rgba(35,35,30,0.07)"
                        strokeWidth={thickness}
                    />
                    {total > 0 &&
                        data.map((d, i) => {
                            const value = Number(d.value) || 0;
                            const length = (value / total) * circumference;
                            const dash = `${length} ${circumference - length}`;
                            const el = (
                                <circle
                                    key={i}
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={radius}
                                    fill="none"
                                    stroke={d.color || PALETTE[i % PALETTE.length]}
                                    strokeWidth={thickness}
                                    strokeDasharray={dash}
                                    strokeDashoffset={-offset}
                                    strokeLinecap="butt"
                                >
                                    <title>{`${d.label}: ${value}`}</title>
                                </circle>
                            );
                            offset += length;
                            return el;
                        })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-display text-2xl font-bold text-body">
                        {centerValue ?? total}
                    </span>
                    {centerLabel && <span className="text-[11px] uppercase tracking-wider text-muted">{centerLabel}</span>}
                </div>
            </div>

            <ul className="w-full space-y-2.5">
                {data.map((d, i) => (
                    <li key={d.label} className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex min-w-0 items-center gap-2 text-muted">
                            <span
                                className="h-2.5 w-2.5 shrink-0 rounded-full"
                                style={{ background: d.color || PALETTE[i % PALETTE.length] }}
                            />
                            <span className="truncate">{d.label}</span>
                        </span>
                        <span className="font-semibold text-body">
                            {d.value}
                            {total > 0 && (
                                <span className="ml-1.5 text-xs font-normal text-muted">
                                    {Math.round((d.value / total) * 100)}%
                                </span>
                            )}
                        </span>
                    </li>
                ))}
                {!data.length && <li className="text-sm text-muted">No data yet.</li>}
            </ul>
        </div>
    );
}

export function HorizontalBars({ data = [], color = '#982cdc' }) {
    const max = Math.max(1, ...data.map((d) => Number(d.value) || 0));

    return (
        <ul className="space-y-4">
            {data.map((d, i) => (
                <li key={`${d.label}-${i}`}>
                    <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                        <span className="truncate text-body">{d.label}</span>
                        <span className="shrink-0 font-semibold text-body">{d.value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-black/[0.06]">
                        <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                                width: `${Math.max(2, ((Number(d.value) || 0) / max) * 100)}%`,
                                background: d.color || color,
                            }}
                        />
                    </div>
                </li>
            ))}
            {!data.length && <li className="text-sm text-muted">No data yet.</li>}
        </ul>
    );
}

export function Sparkline({ values = [], color = '#982cdc', width = 120, height = 36 }) {
    const points = useMemo(() => {
        if (!values.length) return '';
        const max = Math.max(...values, 1);
        const step = values.length > 1 ? width / (values.length - 1) : width;
        return values
            .map((v, i) => `${i === 0 ? 'M' : 'L'}${i * step},${height - (v / max) * (height - 4) - 2}`)
            .join(' ');
    }, [values, width, height]);

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="h-9 w-full" aria-hidden="true">
            <path d={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
