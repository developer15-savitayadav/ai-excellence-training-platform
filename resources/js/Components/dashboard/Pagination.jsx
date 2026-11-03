import { Link } from '@inertiajs/react';

function cleanLabel(label) {
    return String(label)
        .replace('&laquo;', '←')
        .replace('&raquo;', '→')
        .replace('Previous', 'Previous')
        .replace('Next', 'Next');
}

export default function Pagination({ paginator, className = '' }) {
    if (!paginator || !Array.isArray(paginator.links)) return null;

    const { from, to, total, links } = paginator;
    const shown = links.filter((l) => l.label !== '&laquo; Previous' && l.label !== 'Next &raquo;');

    return (
        <div className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${className}`}>
            <p className="text-xs text-muted">
                {total > 0 ? (
                    <>Showing <span className="font-semibold text-body">{from}</span>–<span className="font-semibold text-body">{to}</span> of <span className="font-semibold text-body">{total}</span></>
                ) : (
                    'No results'
                )}
            </p>

            <div className="flex flex-wrap items-center gap-1.5">
                {links[0] && (
                    <PaginationLink link={links[0]} label="Previous" />
                )}
                {shown.map((link, i) =>
                    link.url ? (
                        <Link
                            key={`${link.label}-${i}`}
                            href={link.url}
                            preserveScroll
                            preserveState
                            className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2.5 text-sm transition-colors ${
                                link.active
                                    ? 'bg-body text-white'
                                    : 'border border-black/[0.08] text-muted hover:border-black/20 hover:text-body'
                            }`}
                        >
                            {cleanLabel(link.label)}
                        </Link>
                    ) : (
                        <span
                            key={`${link.label}-${i}`}
                            className="flex h-9 min-w-9 items-center justify-center rounded-lg px-2.5 text-sm text-muted/50"
                        >
                            {cleanLabel(link.label)}
                        </span>
                    )
                )}
                {links[links.length - 1] && (
                    <PaginationLink link={links[links.length - 1]} label="Next" />
                )}
            </div>
        </div>
    );
}

function PaginationLink({ link, label }) {
    if (!link.url) {
        return (
            <span className="flex h-9 items-center justify-center rounded-lg border border-black/[0.06] px-3 text-sm text-muted/40">
                {label}
            </span>
        );
    }

    return (
        <Link
            href={link.url}
            preserveScroll
            preserveState
            className="flex h-9 items-center justify-center rounded-lg border border-black/[0.08] px-3 text-sm text-muted transition-colors hover:border-black/20 hover:text-body"
        >
            {label}
        </Link>
    );
}
