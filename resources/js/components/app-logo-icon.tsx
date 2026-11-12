import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon({ className, alt = 'Logo PinjamYuk Lab RPL', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/images/app-logo.png"
            alt={alt}
            className={`object-contain select-none ${className || ''}`}
            draggable={false}
            {...props}
        />
    );
}
