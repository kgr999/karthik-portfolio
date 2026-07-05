import React, { useState } from 'react';
import LazyVideo from './LazyVideo';

export default function CinematicVisuals({
    midjourneyExpanded,
    setMidjourneyExpanded,
    seedanceExpanded,
    setSeedanceExpanded
}) {
    const [hoveredId, setHoveredId] = useState(null);

    const showreelVideos = [
        { id: 1, src: "assets/videos/pfv1.mp4", glow: "#A78BFA", size: "normal" },
        { id: 2, src: "assets/videos/pfv7.mp4", glow: "#00f0ff", size: "wide" },
        { id: 3, src: "assets/videos/pfv6.mp4", glow: "#34D399", size: "wide" },
        { id: 4, src: "assets/videos/pfv2.mp4", glow: "#F87171", size: "normal" },
        { id: 5, src: "assets/videos/pfv8.mp4", glow: "#93C5FD", size: "normal" },
        { id: 6, src: "assets/videos/pfv5.mp4", glow: "#FBBF24", size: "wide" }
    ];

    return (
        <>
            {/* Cinematic Self-Visuals Section */}
            <section id="self-visuals">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>Multi-Genre Showreel</h2>
                    </div>
                    <div className="cinema-grid reveal-item" style={{ gap: '20px', marginTop: '40px' }}>
                        {showreelVideos.map((item) => {
                            const isPaused = hoveredId !== null && hoveredId !== item.id;
                            const isGrayscaled = hoveredId !== null && hoveredId !== item.id;
                            return (
                                <div 
                                    key={item.id} 
                                    className={`cinema-card ${item.size === 'wide' ? 'cinema-wide' : 'cinema-normal'}`} 
                                    data-glow={item.glow}
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    style={{
                                        filter: isGrayscaled ? 'grayscale(100%) brightness(0.4)' : 'none',
                                        transition: 'filter 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                                        transform: hoveredId === item.id ? 'scale(1.025)' : 'scale(1)',
                                        zIndex: hoveredId === item.id ? 10 : 1,
                                    }}
                                >
                                    <div className="cinema-video-wrapper">
                                        <LazyVideo 
                                            className="cinema-video" 
                                            src={item.src} 
                                            loop 
                                            muted={hoveredId !== item.id} 
                                            playsInline 
                                            autoPlay 
                                            forcePause={isPaused}
                                        />
                                        {hoveredId === item.id && (
                                            <div className="cinema-sound-badge">
                                                <svg className="sound-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                                                </svg>
                                                <span>AUDIO ON</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
