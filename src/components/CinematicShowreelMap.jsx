import React, { useState } from 'react';
import './CinematicShowreelMap.css';

export default function CinematicShowreelMap() {
    const [playingId, setPlayingId] = useState(null);

    const markers = [
        {
            id: 'indradev-ramayana',
            categoryHeader: 'MYTHOLOGICAL EPIC',
            title: 'Indradev from Ramayana',
            videoSrc: '/assets/videos/indradevramayana.MP4',
            posterSrc: '/assets/images/indradev_poster.jpg',
            aspectRatio: '16 / 9'
        },
        {
            id: 'jungle-book',
            categoryHeader: 'WORLD BUILDING',
            title: 'The Jungle Macbook',
            videoSrc: '/assets/videos/junglebookmacbook.MP4',
            posterSrc: '/assets/images/junglebook_poster.jpg',
            aspectRatio: '16 / 9'
        }
    ];

    const handlePlayInline = (e, markerId) => {
        e.stopPropagation();
        setPlayingId(markerId);
    };

    const handleCloseInline = (e) => {
        e.stopPropagation();
        setPlayingId(null);
    };

    return (
        <section id="cinematic-showreel-map" className="cinematic-map-section">
            <div className="container">
                {/* Clean Stage Container */}
                <div className="cinematic-parchment reveal-item">
                    {/* Glowing Top Edge Wire */}
                    <div className="cinematic-stage-glow"></div>

                    {/* Ambient Glow */}
                    <div className="cinematic-map-glow"></div>

                    {/* Map Content */}
                    <div className="cinematic-map-content">
                        {/* Showcase Cards Grid */}
                        <div className="cinematic-markers-grid">
                            {markers.map((marker) => {
                                const isPlaying = playingId === marker.id;

                                return (
                                    <div
                                        key={marker.id}
                                        className={`cinematic-marker ${isPlaying ? 'is-playing' : ''}`}
                                    >
                                        {/* Category Header Right Above Preview */}
                                        <div className="cinematic-card-top-header">
                                            <span className="cinematic-card-category-badge">
                                                <span className="cinematic-badge-bar"></span>
                                                {marker.categoryHeader}
                                            </span>
                                        </div>

                                        {/* Video Preview Container */}
                                        <div
                                            className={`cinematic-marker-preview ${isPlaying ? 'is-playing' : ''}`}
                                            style={{ aspectRatio: marker.aspectRatio }}
                                        >
                                            {isPlaying ? (
                                                <div className="cinematic-inline-video-wrapper">
                                                    <video
                                                        className="cinematic-grid-video"
                                                        src={marker.videoSrc}
                                                        poster={marker.posterSrc}
                                                        controls
                                                        autoPlay
                                                        playsInline
                                                        controlsList="nodownload"
                                                    />
                                                    <button
                                                        className="cinematic-inline-close-btn"
                                                        onClick={handleCloseInline}
                                                        title="Return to preview"
                                                        aria-label="Close inline video"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    {/* Instant Poster Image */}
                                                    <img
                                                        src={marker.posterSrc}
                                                        alt={marker.title}
                                                        className="cinematic-marker-thumbnail"
                                                        loading="eager"
                                                    />

                                                    {/* Hover Motion Video */}
                                                    <video
                                                        src={marker.videoSrc}
                                                        poster={marker.posterSrc}
                                                        className="cinematic-hover-video"
                                                        muted
                                                        loop
                                                        playsInline
                                                        preload="metadata"
                                                        onMouseEnter={(e) => e.target.play().catch(() => { })}
                                                        onMouseLeave={(e) => e.target.pause()}
                                                    />

                                                    {/* Overlay Gradient */}
                                                    <div className="cinematic-preview-overlay"></div>

                                                    {/* Play button overlay */}
                                                    <button
                                                        className="cinematic-play-btn-overlay"
                                                        onClick={(e) => handlePlayInline(e, marker.id)}
                                                        aria-label={`Play ${marker.title}`}
                                                    >
                                                        <div className="cinematic-play-icon-wrapper">
                                                            <div className="cinematic-play-glow-ring"></div>
                                                            <div className="cinematic-play-icon">
                                                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                                                    <polygon points="8,5 19,12 8,19" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <span className="cinematic-play-text">PLAY VIDEO</span>
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        {/* Info Panel Below Preview */}
                                        <div className="cinematic-marker-info">
                                            <h4 className="cinematic-marker-title">{marker.title}</h4>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
