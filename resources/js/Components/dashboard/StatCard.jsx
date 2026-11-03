import {
    Activity,
    Award,
    BookOpen,
    CheckCircle2,
    Clock3,
    GraduationCap,
    Layers,
    MessageSquare,
    Sparkles,
    Target,
    TrendingUp,
    UserX,
    Users,
} from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';

export const statIcons = {
    users: Users,
    book: BookOpen,
    graduation: GraduationCap,
    award: Award,
    activity: Activity,
    userX: UserX,
    layers: Layers,
    target: Target,
    message: MessageSquare,
    clock: Clock3,
    check: CheckCircle2,
    trending: TrendingUp,
    sparkles: Sparkles,
};

const accents = {
    violet: {
        wrap: 'bg-violet/[0.08] text-violet',
        glow: 'from-violet/[0.10]',
        bar: 'bg-violet',
    },
    lime: {
        wrap: 'bg-lime/20 text-[#9a7420]',
        glow: 'from-lime/[0.18]',
        bar: 'bg-lime',
    },
    sky: {
        wrap: 'bg-sky-100 text-sky-600',
        glow: 'from-sky-200/40',
        bar: 'bg-sky-500',
    },
    emerald: {
        wrap: 'bg-emerald-100 text-emerald-600',
        glow: 'from-emerald-200/40',
        bar: 'bg-emerald-500',
    },
    rose: {
        wrap: 'bg-rose-100 text-rose-600',
        glow: 'from-rose-200/40',
        bar: 'bg-rose-500',
    },
    amber: {
        wrap: 'bg-amber-100 text-amber-600',
        glow: 'from-amber-200/40',
        bar: 'bg-amber-500',
    },
    gold: {
        wrap: 'bg-[#f7ecd2] text-[#a47a22]',
        glow: 'from-[#eec369]/30',
        bar: 'bg-[#eec369]',
    },
};

export default function StatCard({ stat, compact = false, className = '' }) {
    const Icon = statIcons[stat.icon] || TrendingUp;
    const accent = accents[stat.accent] || accents.violet;

    return (
        <div
            className={[
                'group relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white',
                'transition-all duration-300 hover:-translate-y-0.5 hover:border-black/[0.14] hover:shadow-[0_18px_40px_-26px_rgba(35,35,30,0.45)]',
                compact ? 'p-4' : 'p-5',
                className,
            ].join(' ')}
        >
            <div className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br to-transparent ${accent.glow}`} />

            <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                        {stat.label}
                    </p>
                    <p className="mt-2 font-display text-[1.65rem] font-bold leading-none text-body">
                        <AnimatedNumber value={stat.value} suffix={stat.suffix || ''} decimals={stat.decimals || 0} />
                    </p>
                    {stat.hint && <p className="mt-2 text-xs text-muted">{stat.hint}</p>}
                </div>

                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accent.wrap}`}>
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
            </div>

            {stat.trend != null && (
                <div className="relative mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>+{stat.trend}</span>
                    <span className="font-normal text-muted">{stat.trendLabel}</span>
                </div>
            )}
        </div>
    );
}
