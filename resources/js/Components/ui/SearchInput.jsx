import { forwardRef } from 'react';

const SearchInput = forwardRef(function SearchInput(
    { value, onChange, placeholder = 'Search...', className = '' },
    ref
) {
    return (
        <div className={['relative', className].filter(Boolean).join(' ')}>
            <svg
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
            </svg>

            <input
                ref={ref}
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="h-12 w-full rounded-full border border-black/[0.08] bg-panel pl-12 pr-5 text-[0.9375rem] text-body placeholder-muted outline-none transition-all duration-150 focus:border-violet focus:ring-1 focus:ring-violet/30"
            />
        </div>
    );
});

export default SearchInput;
