import React, { useState } from 'react';
import './VintageCinemaShowcase.css';

export default function VintageCinemaShowcase() {
    const [isPlaying, setIsPlaying] = useState(false);

    const videoSrc = '/assets/videos/5oclock.mp4';
    const posterSrc = '/assets/images/5oclock_poster.jpg';
    const title = "5 O'Clock";
    const categoryHeader = 'RETRO CINEMA';

    const handlePlayInline = (e) => {
        e.stopPropagation();
        setIsPlaying(true);
    };

    const handleCloseInline = (e) => {
        e.stopPropagation();
        setIsPlaying(false);
    };

    return (
        <section id="vintage-cinema-section" className="vintage-cinema-section">
            <div className="container">
                {/* 35mm Film Strip Container */}
                <div className="vintage-film-strip reveal-item">
                    {/* Top Sprocket Track */}
                    <div className="vintage-sprocket-track top-track">
                        <span className="sprocket-label">KODAK 35mm</span>
                        <div className="sprocket-holes">
                            <span className="hole"></span>
                            <span className="hole"></span>
                            <span className="hole"></span>
                            <span className="hole"></span>
                            <span className="hole"></span>
                            <span className="hole"></span>
                            <span className="hole"></span>
                        </div>
                        <span className="sprocket-frame-num">#05</span>
                    </div>

                    {/* Center Film Frame (In-Between Video Preview) */}
                    <div className={`vintage-film-frame ${isPlaying ? 'is-playing' : ''}`}>
                        {/* Video Screen Container */}
                        <div className="vintage-screen-container">
                            {isPlaying ? (
                                <div className="vintage-inline-video-wrapper">
                                    <video
                                        className="vintage-screen-video"
                                        src={videoSrc}
                                        poster={posterSrc}
                                        controls
                                        autoPlay
                                        playsInline
                                        controlsList="nodownload"
                                    />
                                    <button
                                        className="vintage-inline-close-btn"
                                        onClick={handleCloseInline}
                                        title="Close film screen"
                                        aria-label="Close inline video"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* Instant Poster Image */}
                                    <img
                                        src={posterSrc}
                                        alt={title}
                                        className="vintage-poster-img"
                                        loading="lazy"
                                        decoding="async"
                                    />

                                    {/* Hover Video Preview */}
                                    <video
                                        src={videoSrc}
                                        poster={posterSrc}
                                        className="vintage-hover-video"
                                        muted
                                        loop
                                        playsInline
                                        preload="none"
                                        onMouseEnter={(e) => e.target.play().catch(() => { })}
                                        onMouseLeave={(e) => e.target.pause()}
                                    />

                                    {/* Vintage Sepia & Vignette Overlay */}
                                    <div className="vintage-film-overlay"></div>

                                    {/* Play Button Overlay */}
                                    <button
                                        className="vintage-play-btn-overlay"
                                        onClick={handlePlayInline}
                                        aria-label={`Play ${title}`}
                                    >
                                        <div className="vintage-play-icon-wrapper">
                                            <div className="vintage-play-glow-ring"></div>
                                            <div className="vintage-play-icon">
                                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                                    <polygon points="8,5 19,12 8,19" />
                                                </svg>
                                            </div>
                                        </div>
                                        <span className="vintage-play-text">PLAY FILM</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Bottom Sprocket Track */}
                    <div className="vintage-sprocket-track bottom-track">
                        <span className="sprocket-label">RETRO REEL</span>
                        <div className="sprocket-holes">
                            <span className="hole"></span>
                            <span className="hole"></span>
                            <span className="hole"></span>
                            <span className="hole"></span>
                            <span className="hole"></span>
                            <span className="hole"></span>
                            <span className="hole"></span>
                        </div>
                        <span className="sprocket-frame-num">5 O'CLOCK</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
