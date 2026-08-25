import { forwardRef } from 'react';

const sizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
};

function getInitials(name = '') {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

const Avatar = forwardRef(function Avatar({ src, name = '', size = 'md', className = '' }, ref) {
    const sizeClass = sizeMap[size] || sizeMap.md;

    if (src) {
        return (
            <img
                ref={ref}
                src={src}
                alt={name || 'Avatar'}
                className={[sizeClass, 'rounded-full object-cover', className]
                    .filter(Boolean)
                    .join(' ')}
            />
        );
    }

    return (
        <div
            ref={ref}
            className={[
                sizeClass,
                'flex items-center justify-center rounded-full bg-violet font-semibold text-white',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
            title={name}
        >
            {getInitials(name)}
        </div>
    );
});

export default Avatar;
