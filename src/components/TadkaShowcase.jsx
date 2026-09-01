import React, { useState } from 'react';
import './TadkaShowcase.css';

export default function TadkaShowcase() {
    const [playingId, setPlayingId] = useState(null);

    const items = [
        {
            id: 'tadka-mp',
            label: 'Motion Poster',
            videoSrc: '/assets/videos/tadkamp.mp4',
            posterSrc: '/assets/images/tadkamp_poster.jpg'
        },
        {
            id: 'tadka-promo',
            label: 'Spec Commercial Ad',
            videoSrc: '/assets/videos/tadkapromo.mp4',
            posterSrc: '/assets/images/tadkapromo_poster.jpg'
        }
    ];

    const handlePlayInline = (e, id) => {
        e.stopPropagation();
        setPlayingId(id);
    };

    const handleCloseInline = (e) => {
        e.stopPropagation();
        setPlayingId(null);
    };

    return (
        <section id="tadka-showcase" className="tadka-section">
            <div className="tadka-ambient-glow"></div>

            <div className="container">
                {/* Main Glass Stage */}
                <div className="tadka-stage reveal-item">
                    <div className="tadka-stage-glow"></div>

                    {/* Section Header */}
                    <div className="tadka-header text-center">
                        <div className="tadka-logo-wrapper">
                            <img
                                src="/assets/images/tadkanobg.png"
                                alt="JioHotstar Tadka App Logo"
                                className="tadka-logo-img"
                                loading="lazy"
                            />
                        </div>
                        <span className="tadka-subtitle">
                            JioHotstar's Tadka App • 100% Generative AI Showcase
                        </span>
                        <div className="tadka-divider"></div>
                    </div>

                    {/* Showcase Cards Grid */}
                    <div className="tadka-grid">
                        {items.map((item) => {
                            const isPlaying = playingId === item.id;

                            return (
                                <div key={item.id} className={`tadka-card ${isPlaying ? 'is-playing' : ''}`}>
                                    {/* Video Container */}
                                    <div className={`tadka-video-wrapper ${isPlaying ? 'is-playing' : ''}`}>
                                        {isPlaying ? (
                                            <div className="tadka-inline-video-wrapper">
                                                <video
                                                    className="tadka-grid-video"
                                                    src={item.videoSrc}
                                                    poster={item.posterSrc}
                                                    controls
                                                    autoPlay
                                                    playsInline
                                                    controlsList="nodownload"
                                                />
                                                <button
                                                    className="tadka-inline-close-btn"
                                                    onClick={handleCloseInline}
                                                    title="Return to preview"
                                                    aria-label="Close inline video"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                {/* Instant Image Poster Thumbnail */}
                                                <img
                                                    src={item.posterSrc}
                                                    alt={`${item.label} Thumbnail`}
                                                    className="tadka-preview-poster"
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                                {/* Video Preview on Hover */}
                                                <video
                                                    src={item.videoSrc}
                                                    poster={item.posterSrc}
                                                    className="tadka-preview-video"
                                                    muted
                                                    loop
                                                    playsInline
                                                    preload="none"
                                                    onMouseEnter={(e) => e.target.play().catch(() => {})}
                                                    onMouseLeave={(e) => e.target.pause()}
                                                />
                                                <div className="tadka-preview-overlay"></div>

                                                <span className="tadka-badge">
                                                    <span className="tadka-badge-bar"></span>
                                                    {item.label}
                                                </span>

                                                <button
                                                    className="tadka-play-btn-overlay"
                                                    onClick={(e) => handlePlayInline(e, item.id)}
                                                    aria-label={`Play ${item.label}`}
                                                >
                                                    <div className="tadka-play-icon-wrapper">
                                                        <div className="tadka-play-glow-ring"></div>
                                                        <div className="tadka-play-icon">
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                                <path d="M8 5v14l11-7z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <span className="tadka-play-text">WATCH PREVIEW</span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
