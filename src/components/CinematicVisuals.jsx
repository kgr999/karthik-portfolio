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
        { id: 1, src: "assets/videos/pfv1.mp4", glow: "#A78BFA", title: "Neon Dream", genre: "SCI-FI CINEMATIC" },
        { id: 2, src: "assets/videos/pfv7.mp4", glow: "#00f0ff", title: "Cyber Runner", genre: "ACTION TRAILER" },
        { id: 3, src: "assets/videos/pfv6.mp4", glow: "#34D399", title: "Prismara", genre: "FASHION EDITORIAL" },
        { id: 4, src: "assets/videos/pfv2.mp4", glow: "#F87171", title: "Lost Realm", genre: "FANTASY WORLD" },
        { id: 5, src: "assets/videos/pfv8.mp4", glow: "#93C5FD", title: "Echoes of Time", genre: "DRAMA NARRATIVE" },
        { id: 6, src: "assets/videos/pfv5.mp4", glow: "#FBBF24", title: "Velocity", genre: "BRAND COMMERCIAL" }
    ];

    const handleMouseMove = (e, glowColor) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12; // max 12 deg tilt
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
        
        card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.03, 1.03, 1.03)`;
        card.style.boxShadow = `0 15px 45px ${glowColor}40`; // 25% opacity glow
        card.style.borderColor = glowColor;
    };

    const handleMouseLeave = (e) => {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.boxShadow = 'none';
        card.style.borderColor = 'rgba(255, 255, 255, 0.08)';
    };

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
                                    className="cinema-card" 
                                    data-glow={item.glow}
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    onMouseLeave={(e) => {
                                        setHoveredId(null);
                                        handleMouseLeave(e);
                                    }}
                                    onMouseMove={(e) => handleMouseMove(e, item.glow)}
                                    style={{
                                        filter: isGrayscaled ? 'grayscale(100%) brightness(0.4)' : 'none',
                                        transition: 'filter 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease',
                                        zIndex: hoveredId === item.id ? 10 : 1,
                                    }}
                                >
                                    <div className="cinema-video-wrapper" style={{ '--card-glow': item.glow }}>
                                        <LazyVideo 
                                            className="cinema-video" 
                                            src={item.src} 
                                            loop 
                                            muted={hoveredId !== item.id} 
                                            playsInline 
                                            autoPlay 
                                            forcePause={isPaused}
                                        />
                                        {/* Cinematic HUD Overlay */}
                                        <div className={`cinema-hud-overlay ${hoveredId === item.id ? 'active' : ''}`}>
                                            <div className="cinema-hud-info">
                                                <span className="cinema-hud-genre">{item.genre}</span>
                                                <h4 className="cinema-hud-title">{item.title}</h4>
                                            </div>
                                            {hoveredId === item.id && (
                                                <div className="cinema-hud-audio-visualizer">
                                                    <div className="bar bar-1"></div>
                                                    <div className="bar bar-2"></div>
                                                    <div className="bar bar-3"></div>
                                                </div>
                                            )}
                                        </div>
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
