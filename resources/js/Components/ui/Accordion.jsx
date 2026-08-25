import { useState, useRef, useEffect, useCallback } from 'react';

function AccordionItem({ item, isOpen, onToggle }) {
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);

    const updateHeight = useCallback(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        }
    }, []);

    useEffect(() => {
        updateHeight();
    }, [item.answer, updateHeight]);

    useEffect(() => {
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, [updateHeight]);

    const number = String(item.id).padStart(2, '0');

    return (
        <div className="border-b border-black/[0.08]">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center gap-4 py-5 text-left"
                aria-expanded={isOpen}
            >
                <span className="font-mono text-sm text-muted">{number}</span>

                <span className="flex-1 font-display text-base font-semibold text-body">
                    {item.question}
                </span>

                <span
                    className={[
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/[0.12] text-sm text-muted transition-transform duration-200',
                        isOpen && 'rotate-180',
                    ]
                        .filter(Boolean)
                        .join(' ')}
                    aria-hidden="true"
                >
                    {isOpen ? '−' : '+'}
                </span>
            </button>

            <div
                className="overflow-hidden transition-[height] duration-300 ease"
                style={{ height: isOpen ? height : 0 }}
                aria-hidden={!isOpen}
            >
                <div ref={contentRef} className="pb-5 pl-10 pr-8 text-sm leading-relaxed text-muted">
                    {item.answer}
                </div>
            </div>
        </div>
    );
}

export default function Accordion({ items = [], oneOpen = true }) {
    const [openId, setOpenId] = useState(null);

    const toggle = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <div className="w-full">
            {items.map((item) => (
                <AccordionItem
                    key={item.id}
                    item={item}
                    isOpen={openId === item.id}
                    onToggle={() => toggle(item.id)}
                />
            ))}
        </div>
    );
}
