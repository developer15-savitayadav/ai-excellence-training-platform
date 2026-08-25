import { forwardRef } from 'react';
import { Link } from '@inertiajs/react';

const variants = {
    primary:
        'gradient-bg text-white font-semibold shadow-[0_8px_24px_-10px_rgba(152,44,220,.55)] hover:brightness-110 hover:-translate-y-[1px]',
    secondary:
        'border border-black/16 bg-transparent hover:border-black/40 hover:bg-black/[0.04]',
    ghost: 'bg-transparent hover:bg-black/[0.06]',
    danger: 'bg-danger text-white hover:bg-danger/90',
};

const Button = forwardRef(function Button(
    { variant = 'primary', size = 'md', href, className = '', children, ...rest },
    ref
) {
    const classes = [
        'inline-flex items-center justify-center rounded-full font-semibold transition-all duration-150',
        'h-12 px-6 text-[0.9375rem]',
        size === 'sm' && 'h-10 px-4 text-[0.8125rem]',
        size === 'lg' && 'h-14 px-8 text-base',
        variants[variant] || variants.primary,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    if (href) {
        return (
            <Link ref={ref} href={href} className={classes} {...rest}>
                {children}
            </Link>
        );
    }

    return (
        <button ref={ref} className={classes} {...rest}>
            {children}
        </button>
    );
});

export default Button;
