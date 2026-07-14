import React, { useState } from 'react';
import LazyVideo from './LazyVideo';

export default function CommercialAds() {
    const [hoveredId, setHoveredId] = useState(null);

    const commercialProjects = [
        {
            id: 'diesel-drama',
            title: 'Montra Electric : Diesel Drama',
            category: 'Viral Instagram Campaign',
            videoSrc: '/assets/videos/dieseldrama_comp.mp4',
            externalLink: 'https://www.instagram.com/reel/DYPaSyiKxhg/?igsh=MTZyaXQ4ajRpcW93Zg==',
            tags: ['Viral Campaign', '2.5M+ Views', '7 Languages', 'Organic Reach'],
            badgeText: '2.5M+ VIEWS',
            isLive: true
        },
        {
            id: 'matiks-game',
            title: 'Matiks Game',
            category: 'Commercial Campaign',
            videoSrc: '/assets/videos/amperemob.mp4',
            tags: ['Gaming Commercial', 'Cinematic Worldbuilding', 'AI VFX'],
            badgeText: 'IN PRODUCTION',
            isLive: false
        }
    ];

    return (
        <section id="commercial-ads" className="commercial-ads-section" style={{ padding: '80px 0', position: 'relative', background: 'var(--bg, #000000)', zIndex: 2 }}>
            <div className="container">
                <div className="section-header text-center" style={{ marginBottom: '45px' }}>
                    <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>Commercial Ads</h2>
                </div>

                <div className="commercial-ads-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                    gap: '32px',
                    maxWidth: '960px',
                    margin: '0 auto'
                }}>
                    {commercialProjects.map((ad) => {
                        const isHovered = hoveredId === ad.id;
                        const CardWrapper = ad.isLive ? 'a' : 'div';
                        const wrapperProps = ad.isLive ? {
                            href: ad.externalLink,
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            style: { textDecoration: 'none', color: 'inherit', outline: 'none', borderBottom: 'none' }
                        } : {};

                        return (
                            <CardWrapper 
                                key={ad.id} 
                                {...wrapperProps}
                                className="commercial-ad-card reveal-item"
                                onMouseEnter={() => setHoveredId(ad.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                style={{
                                    position: 'relative',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    background: '#0c0c0e',
                                    border: isHovered ? '1px solid rgba(255, 255, 255, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)',
                                    boxShadow: isHovered 
                                        ? '0 25px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 255, 255, 0.05)' 
                                        : '0 20px 40px rgba(0, 0, 0, 0.4)',
                                    transform: isHovered ? 'translateY(-8px) scale(1.015)' : 'translateY(0) scale(1)',
                                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease',
                                    cursor: ad.isLive ? 'pointer' : 'default',
                                    display: 'block',
                                    textDecoration: 'none',
                                    color: 'inherit'
                                }}
                            >
                                {/* 16:9 Aspect Ratio Container */}
                                <div className="commercial-ad-media-wrapper" style={{
                                    position: 'relative',
                                    width: '100%',
                                    paddingTop: '56.25%', /* 16:9 Aspect Ratio */
                                    overflow: 'hidden',
                                    background: '#050507'
                                }}>
                                    {/* Video Stream: Crisp preview for Montra, blurred for in-production spots */}
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        filter: ad.isLive 
                                            ? (isHovered ? 'brightness(1) contrast(1.08)' : 'brightness(0.85) contrast(1.05)')
                                            : (isHovered ? 'blur(10px) brightness(0.55) saturate(1.2)' : 'blur(16px) brightness(0.4) saturate(1.2)'),
                                        transform: isHovered 
                                            ? (ad.isLive ? 'scale(1.06)' : 'scale(1.2)') 
                                            : (ad.isLive ? 'scale(1)' : 'scale(1.15)'),
                                        transition: 'filter 0.4s ease, transform 0.4s ease',
                                        pointerEvents: 'none'
                                    }}>
                                        <LazyVideo 
                                            src={ad.videoSrc}
                                            loop
                                            muted
                                            playsInline
                                            autoPlay
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>

                                    {/* Dark Gradient Overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: ad.isLive 
                                            ? 'linear-gradient(to top, rgba(12, 12, 14, 0.88) 0%, rgba(12, 12, 14, 0.15) 55%, rgba(12, 12, 14, 0.2) 100%)'
                                            : 'radial-gradient(circle at center, rgba(12, 12, 14, 0.3) 0%, rgba(12, 12, 14, 0.85) 100%)',
                                        pointerEvents: 'none',
                                        transition: 'opacity 0.4s ease'
                                    }} />

                                    {/* Glassmorphism HUD Overlay */}
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '20px',
                                        zIndex: 2,
                                        textAlign: 'center'
                                    }}>
                                        {/* Status / Metric Badge */}
                                        <div style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: ad.isLive ? '7px 18px' : '6px 16px',
                                            borderRadius: '30px',
                                            background: ad.isLive 
                                                ? 'linear-gradient(135deg, rgba(229, 9, 20, 0.92) 0%, rgba(178, 7, 16, 0.92) 100%)'
                                                : 'rgba(10, 10, 14, 0.75)',
                                            backdropFilter: 'blur(12px)',
                                            border: ad.isLive 
                                                ? '1px solid rgba(255, 80, 90, 0.6)'
                                                : '1px solid rgba(255, 255, 255, 0.15)',
                                            boxShadow: ad.isLive 
                                                ? '0 0 25px rgba(229, 9, 20, 0.45)'
                                                : '0 0 20px rgba(0, 0, 0, 0.4)',
                                            marginBottom: '14px',
                                            transition: 'all 0.35s ease'
                                        }}>
                                            <span className="status-dot animate-ping" style={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                background: '#ffffff',
                                                boxShadow: '0 0 8px #ffffff'
                                            }} />
                                            <span style={{
                                                fontFamily: 'var(--font-mono, monospace)',
                                                fontSize: ad.isLive ? '0.82rem' : '0.75rem',
                                                fontWeight: '800',
                                                color: '#ffffff',
                                                letterSpacing: '1.8px',
                                                textTransform: 'uppercase'
                                            }}>
                                                {ad.isLive ? `🔥 ${ad.badgeText}` : ad.badgeText}
                                            </span>
                                        </div>

                                        {/* Viewfinder Lock / Play Graphic */}
                                        {ad.isLive ? (
                                            <div style={{
                                                width: '46px',
                                                height: '46px',
                                                borderRadius: '50%',
                                                background: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.25)',
                                                backdropFilter: 'blur(8px)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: isHovered ? '#000000' : '#ffffff',
                                                boxShadow: isHovered ? '0 0 25px rgba(255, 255, 255, 0.5)' : '0 4px 15px rgba(0, 0, 0, 0.3)',
                                                transform: isHovered ? 'scale(1.12)' : 'scale(1)',
                                                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                                                marginBottom: '6px'
                                            }}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}>
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        ) : (
                                            <div style={{ opacity: isHovered ? 0.85 : 0.6, color: 'rgba(255, 255, 255, 0.6)', marginBottom: '8px', transition: 'opacity 0.35s ease' }}>
                                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                                </svg>
                                            </div>
                                        )}
                                        <span style={{ fontSize: '0.7rem', color: isHovered ? '#ffffff' : 'rgba(255,255,255,0.45)', letterSpacing: '1px', textTransform: 'uppercase', transition: 'color 0.35s ease' }}>
                                            {ad.isLive ? 'Click to Watch Reel' : 'Preview Locked // Release Pending'}
                                        </span>
                                    </div>
                                </div>

                                {/* Card Body Footer */}
                                <div className="commercial-ad-info" style={{ padding: '22px 24px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                        <h3 style={{ fontSize: '1.18rem', fontWeight: '700', color: '#fff', margin: 0, lineHeight: 1.3, textDecoration: 'none' }}>
                                            {ad.title}
                                        </h3>
                                        <span style={{
                                            fontSize: '0.7rem',
                                            color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                                            background: isHovered ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            padding: '3px 8px',
                                            borderRadius: '4px',
                                            fontWeight: '600',
                                            whiteSpace: 'nowrap',
                                            marginLeft: '8px',
                                            transition: 'all 0.35s ease'
                                        }}>
                                            {ad.isLive ? 'LIVE REEL ↗' : '16:9 SPOT'}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', margin: '0 0 16px 0', textDecoration: 'none' }}>
                                        {ad.category}
                                    </p>

                                    {/* Tags */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                        {ad.tags.map((tag, tIdx) => {
                                            const isViewTag = tag === '2.5M+ Views';
                                            return (
                                                <span key={tIdx} style={{
                                                    fontSize: '0.72rem',
                                                    padding: '4px 10px',
                                                    borderRadius: '6px',
                                                    background: isViewTag ? 'rgba(229, 9, 20, 0.2)' : 'rgba(255,255,255,0.04)',
                                                    border: isViewTag ? '1px solid rgba(229, 9, 20, 0.5)' : '1px solid rgba(255,255,255,0.08)',
                                                    color: isViewTag ? '#ff4d58' : 'rgba(255,255,255,0.75)',
                                                    fontWeight: isViewTag ? '800' : '500'
                                                }}>
                                                    {tag}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            </CardWrapper>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
