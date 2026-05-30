import React, { useState } from 'react';

const ToolLogoImage = ({ src, alt, size, className, fallback }) => {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return fallback;
    }

    return (
        <img
            src={src}
            alt={alt}
            style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain' }}
            className={className}
            onError={() => setFailed(true)}
            loading="lazy"
        />
    );
};

export const renderToolIcon = (tool, size = 16) => {
    const isMedium = size > 20;
    const borderRadius = isMedium ? 5 : 3;
    const fontSize = isMedium ? 11 : 8;

    // Handle special case for Nanobanana URL (which is an HTML landing page)
    if (tool.logo === "https://imgbin.com/free-png/nano-banana") {
        return renderToolIcon({ ...tool, logo: undefined, svg: 'nanobanana' }, size);
    }

    if (tool.logo) {
        // Define fallback (what to render if the logo fails to load)
        const fallbackElement = tool.svg ? (
            renderToolIcon({ ...tool, logo: undefined }, size)
        ) : tool.customBadge ? (
            renderToolIcon({ ...tool, logo: undefined }, size)
        ) : (
            <span className="tool-logo-icon" style={{ fontSize: `${fontSize}px` }}>🛠️</span>
        );

        return (
            <ToolLogoImage
                src={tool.logo}
                alt={tool.name}
                size={size}
                className={`tool-logo-img ${tool.name === 'Midjourney' || tool.name === 'ChatGPT' || tool.name === 'GPT Image' || tool.name === 'Runway' || tool.name === 'Gen-4 Turbo' || tool.name === 'ElevenLabs' ? 'eco-logo-invert' : ''}`}
                fallback={fallbackElement}
            />
        );
    }

    if (tool.customBadge) {
        return (
            <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: `${borderRadius}px`,
                fontSize: `${fontSize}px`,
                fontWeight: '900',
                background: tool.bg || '#08080c',
                color: tool.color || '#ffffff',
                border: `1px solid ${tool.color || 'rgba(255,255,255,0.15)'}`,
                lineHeight: 1,
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                flexShrink: 0
            }}>
                {tool.customBadge}
            </span>
        );
    }

    switch (tool.svg) {
        case 'storyboard':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tool-logo-svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
                </svg>
            );
        case 'narrative':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tool-logo-svg">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                    <path d="M6 6h10M6 10h10" />
                </svg>
            );
        case 'visual':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tool-logo-svg">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m22 12-4-4v8l4-4ZM2 12h16" />
                </svg>
            );
        case 'concept':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="tool-logo-svg">
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                    <path d="M9 18h6M10 22h4" />
                </svg>
            );
        case 'nanobanana':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <defs>
                        <linearGradient id="banana-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fef08a" />
                            <stop offset="70%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#d97706" />
                        </linearGradient>
                        <filter id="banana-glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="1" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
                    <path
                        d="M21.97 3.74a1 1 0 0 0-1-.22c-2.73.84-5.36 2.1-7.75 3.73A19.46 19.46 0 0 0 7.9 11.8c-1.37 1.77-2.6 3.7-3.6 5.8a1 1 0 0 0 .54 1.34c1.93.88 3.96 1.48 6.03 1.78a16.66 16.66 0 0 0 8-1.54c2.14-1.12 4.07-2.6 5.75-4.4a1 1 0 0 0-.25-1.55c-1.95-1.07-3.64-2.5-5-4.22a15.86 15.86 0 0 1-2.53-5.38 1 1 0 0 0-.87-.89Z"
                        fill="url(#banana-grad)"
                        filter="url(#banana-glow)"
                    />
                    <path
                        d="M21.97 3.74c-.2-.06-.41-.09-.63-.09-.5 0-.96.25-1.22.68-.46.77-.97 1.51-1.52 2.22-.16.21-.13.51.08.67.21.16.51.13.67-.08.58-.75 1.12-1.53 1.61-2.34.18-.3.14-.68-.06-.86c-.19-.18-.46-.22-.55-.2z"
                        fill="#ca8a04"
                    />
                </svg>
            );
        case 'seedance':
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                    <defs>
                        <linearGradient id="seed-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#22d3ee" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                    </defs>
                    <circle cx="12" cy="12" r="10" stroke="url(#seed-grad)" strokeWidth="1.5" opacity="0.35" />
                    <path
                        d="M10 8.5v7l6-3.5-6-3.5z"
                        fill="url(#seed-grad)"
                        stroke="url(#seed-grad)"
                        strokeWidth="1"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12 3a9 9 0 0 1 9 9"
                        stroke="url(#seed-grad)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M12 21a9 9 0 0 1-9-9"
                        stroke="url(#seed-grad)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            );
        default:
            return <span className="tool-logo-icon" style={{ fontSize: `${fontSize}px` }}>🛠️</span>;
    }
};

export const renderCategoryIcon = (num) => {
    switch (num) {
        case "01": // CREATIVE INTELLIGENCE (Brain/Intellect outline SVG)
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-4.12 2.5 2.5 0 0 1 0-4.88 2.5 2.5 0 0 1 0-4.12A2.5 2.5 0 0 1 9.5 2Z" />
                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-4.12 2.5 2.5 0 0 0 0-4.88 2.5 2.5 0 0 0 0-4.12A2.5 2.5 0 0 0 14.5 2Z" />
                </svg>
            );
        case "02": // CREATIVE DIRECTION (Camera/Compass/Director SVG)
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 8-6 4 6 4V8Z" />
                    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                </svg>
            );
        case "03": // PLATFORMS & WORKFLOWS (Layers SVG)
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                </svg>
            );
        case "04": // IMAGE GENERATION (Palette/Image SVG)
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.34863 19.5 5.2341 20.3341 4.79377 20.8A1 1 0 0 0 4.74 22H12Z" />
                    <circle cx="7.5" cy="10.5" r="1.5" fill="currentColor" />
                    <circle cx="11.5" cy="7.5" r="1.5" fill="currentColor" />
                    <circle cx="16.5" cy="9.5" r="1.5" fill="currentColor" />
                    <circle cx="15.5" cy="14.5" r="1.5" fill="currentColor" />
                </svg>
            );
        case "05": // VIDEO GENERATION (Film SVG)
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18" />
                    <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5" />
                </svg>
            );
        case "06": // AI AVATARS (User Profile SVG)
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            );
        case "07": // AUDIO GENERATION (Volume/Waves SVG)
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5v14M22 9v6M7 8v8M2 10v4" />
                </svg>
            );

        default:
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
            );
    }
};
