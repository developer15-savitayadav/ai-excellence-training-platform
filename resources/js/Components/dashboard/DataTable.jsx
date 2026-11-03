import { ChevronDown, ChevronUp, Inbox } from 'lucide-react';

export default function DataTable({
    columns = [],
    rows = [],
    rowKey = 'id',
    sort,
    direction = 'desc',
    onSort,
    emptyTitle = 'Nothing here yet',
    emptyText = 'Records will appear here once they are created.',
    emptyAction = null,
    footer = null,
}) {
    return (
        <div className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                    <thead>
                        <tr className="border-b border-black/[0.07] bg-black/[0.02]">
                            {columns.map((col) => {
                                const active = sort === col.key;
                                return (
                                    <th
                                        key={col.key}
                                        scope="col"
                                        className={`whitespace-nowrap px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted ${col.className || ''}`}
                                    >
                                        {col.sortable && onSort ? (
                                            <button
                                                type="button"
                                                onClick={() => onSort(col.key)}
                                                className={`inline-flex items-center gap-1 transition-colors hover:text-body ${active ? 'text-body' : ''}`}
                                            >
                                                {col.label}
                                                {active ? (
                                                    direction === 'asc' ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />
                                                ) : (
                                                    <ChevronDown className="h-3.5 w-3.5 opacity-30" />
                                                )}
                                            </button>
                                        ) : (
                                            col.label
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr
                                key={typeof rowKey === 'function' ? rowKey(row) : row[rowKey] ?? index}
                                className="border-b border-black/[0.05] transition-colors last:border-0 hover:bg-black/[0.015]"
                            >
                                {columns.map((col) => (
                                    <td key={col.key} className={`px-4 py-3.5 align-middle ${col.cellClassName || ''}`}>
                                        {col.render ? col.render(row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {rows.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/[0.04] text-muted">
                        <Inbox className="h-6 w-6" />
                    </span>
                    <div>
                        <p className="font-display font-semibold text-body">{emptyTitle}</p>
                        <p className="mt-1 text-sm text-muted">{emptyText}</p>
                    </div>
                    {emptyAction}
                </div>
            )}

            {footer && <div className="border-t border-black/[0.06] px-4 py-3">{footer}</div>}
        </div>
    );
}
