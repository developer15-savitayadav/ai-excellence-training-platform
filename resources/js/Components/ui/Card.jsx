import { forwardRef } from 'react';

const Card = forwardRef(function Card({ className = '', hover = true, children, ...rest }, ref) {
    return (
        <div
            ref={ref}
            className={[
                'border border-black/[0.08] bg-panel p-7',
                hover && 'transition-all duration-[220ms] hover:-translate-y-[2px] hover:border-black/[0.18]',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
            {...rest}
        >
            {children}
        </div>
    );
});

export default Card;
