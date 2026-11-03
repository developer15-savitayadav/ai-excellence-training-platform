export default function Panel({ title, description, action, className = '', bodyClassName = '', children }) {
    return (
        <section className={`rounded-2xl border border-black/[0.07] bg-white ${className}`}>
            {(title || action) && (
                <header className="flex flex-wrap items-start justify-between gap-3 border-b border-black/[0.06] px-5 py-4">
                    <div>
                        {title && <h2 className="font-display text-sm font-semibold text-body">{title}</h2>}
                        {description && <p className="mt-0.5 text-xs text-muted">{description}</p>}
                    </div>
                    {action}
                </header>
            )}
            <div className={`p-5 ${bodyClassName}`}>{children}</div>
        </section>
    );
}
