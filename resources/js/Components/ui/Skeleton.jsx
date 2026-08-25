const variantClasses = {
    text: 'h-4 w-3/4 rounded',
    card: 'h-48 rounded-[16px]',
    avatar: 'w-10 h-10 rounded-full',
    image: 'h-64 rounded-[16px]',
};

export default function Skeleton({ className = '', variant = 'text' }) {
    return (
        <div
            className={[
                'animate-pulse bg-black/[0.06]',
                variantClasses[variant] || variantClasses.text,
                className,
            ]
                .filter(Boolean)
                .join(' ')}
            aria-hidden="true"
        />
    );
}
