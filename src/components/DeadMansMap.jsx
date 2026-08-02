import React, { useState } from 'react';
import './DeadMansMap.css';

export default function DeadMansMap() {
    const [playingId, setPlayingId] = useState(null);

    const markers = [
        {
            id: 'pirate-real',
            label: 'Showcase I',
            title: 'GraveTide — Cinematic Teaser',
            desc: 'Atmospheric Worldbuilding & Visual Effects — Real Footage & AI Art Direction',
            videoSrc: '/assets/videos/piratereal_compressed.mp4',
            posterSrc: '/assets/images/piratereal_thumb.jpg',
            tags: ['Cinematic Teaser', 'AI Art Direction', 'Atmospheric VFX', 'Worldbuilding'],
            coords: "12°34'N  45°67'W",
            aspectRatio: '16 / 9'
        },
        {
            id: 'pirate-game',
            label: 'Showcase II',
            title: 'GraveTide — Game Mechanics & World',
            desc: 'Pirate Soulslike Gameplay — Combat Systems, Environment & HUD',
            videoSrc: '/assets/videos/pirategame_compressed.mp4',
            posterSrc: '/assets/images/pirategame_thumb.jpg',
            tags: ['Game Development', 'Combat HUD', 'Soulslike Mechanics', 'Lighting & VFX'],
            coords: "33°12'S  78°45'E",
            aspectRatio: '1620 / 1080'
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
        <section id="dead-mans-map" className="deadmans-map-section">
            <div className="container">
                {/* The Parchment Map */}
                <div className="deadmans-parchment reveal-item">
                    {/* Fog Particles */}
                    <div className="deadmans-fog">
                        <div className="deadmans-fog-wisp"></div>
                        <div className="deadmans-fog-wisp"></div>
                        <div className="deadmans-fog-wisp"></div>
                    </div>

                    {/* Compass Rose */}
                    <div className="deadmans-compass">
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="48" stroke="#8b7755" strokeWidth="0.5" opacity="0.4" />
                            <circle cx="50" cy="50" r="38" stroke="#8b7755" strokeWidth="0.3" opacity="0.3" />
                            <line x1="50" y1="5" x2="50" y2="95" stroke="#8b7755" strokeWidth="0.3" opacity="0.3" />
                            <line x1="5" y1="50" x2="95" y2="50" stroke="#8b7755" strokeWidth="0.3" opacity="0.3" />
                            <polygon points="50,8 46,35 54,35" fill="#8b2500" opacity="0.5" />
                            <polygon points="50,8 46,35 50,30" fill="#8b2500" opacity="0.3" />
                            <polygon points="50,92 46,65 54,65" fill="#8b7755" opacity="0.3" />
                            <text x="50" y="4" textAnchor="middle" fill="#8b7755" fontSize="5" fontFamily="IM Fell English, serif" opacity="0.5">N</text>
                            <text x="50" y="99" textAnchor="middle" fill="#8b7755" fontSize="5" fontFamily="IM Fell English, serif" opacity="0.3">S</text>
                            <text x="98" y="52" textAnchor="end" fill="#8b7755" fontSize="5" fontFamily="IM Fell English, serif" opacity="0.3">E</text>
                            <text x="3" y="52" textAnchor="start" fill="#8b7755" fontSize="5" fontFamily="IM Fell English, serif" opacity="0.3">W</text>
                        </svg>
                    </div>

                    {/* Coordinate Annotations */}
                    <span className="deadmans-coords top-left">lat. 12°34'N · lon. 45°67'W</span>
                    <span className="deadmans-coords bottom-right">— here be dragons —</span>

                    {/* Dotted route line between markers */}
                    <div className="deadmans-route-line"></div>

                    {/* Map Content */}
                    <div className="deadmans-map-content">
                        {/* Map Header */}
                        <div className="deadmans-map-header">
                            <h3 className="deadmans-map-title">GraveTide</h3>
                            <p className="deadmans-map-subtitle">A Pirate Soulslike — Built with AI</p>
                            <div className="deadmans-divider"></div>
                        </div>

                        {/* Treasure Markers */}
                        <div className="deadmans-markers-grid">
                            {markers.map((marker) => (
                                <div
                                    key={marker.id}
                                    className={`deadmans-marker ${playingId === marker.id ? 'is-playing' : ''}`}
                                >
                                    {/* Video Preview with Poster Thumbnail or Inline Video */}
                                    <div 
                                        className={`deadmans-marker-preview ${playingId === marker.id ? 'is-playing' : ''}`}
                                        style={{ aspectRatio: marker.aspectRatio }}
                                    >
                                        {playingId === marker.id ? (
                                            <div className="deadmans-inline-video-wrapper">
                                                <video
                                                    className="deadmans-grid-video"
                                                    src={marker.videoSrc}
                                                    poster={marker.posterSrc}
                                                    controls
                                                    autoPlay
                                                    playsInline
                                                    controlsList="nodownload"
                                                />
                                                <button 
                                                    className="deadmans-inline-close-btn"
                                                    onClick={handleCloseInline}
                                                    title="Return to preview"
                                                    aria-label="Close inline video"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                {/* Thumbnail Poster Image */}
                                                <img 
                                                    src={marker.posterSrc} 
                                                    alt={marker.title}
                                                    className="deadmans-marker-thumbnail"
                                                    loading="lazy"
                                                />

                                                {/* X mark overlay */}
                                                <div className="deadmans-x-glow"></div>
                                                <span className="deadmans-x-mark">✕</span>

                                                {/* Play button overlay */}
                                                <button 
                                                    className="deadmans-play-btn-overlay"
                                                    onClick={(e) => handlePlayInline(e, marker.id)}
                                                    aria-label={`Play ${marker.title}`}
                                                >
                                                    <div className="deadmans-play-icon">
                                                        <svg viewBox="0 0 24 24">
                                                            <polygon points="8,5 19,12 8,19" />
                                                        </svg>
                                                    </div>
                                                    <span className="deadmans-play-text">PLAY VIDEO</span>
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    {/* Info Panel */}
                                    <div className="deadmans-marker-info">
                                        <p className="deadmans-marker-label">{marker.label}</p>
                                        <h4 className="deadmans-marker-title">{marker.title}</h4>
                                        <p className="deadmans-marker-desc">{marker.desc}</p>
                                        <div className="deadmans-marker-tags">
                                            {marker.tags.map((tag, idx) => (
                                                <span key={idx} className="deadmans-marker-tag">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sea creature illustration */}
                    <div className="deadmans-sea-creature">🐙</div>
                </div>
            </div>
        </section>
    );
}


