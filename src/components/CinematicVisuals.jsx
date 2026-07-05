import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LazyVideo from './LazyVideo';

export default function CinematicVisuals({
    midjourneyExpanded,
    setMidjourneyExpanded,
    seedanceExpanded,
    setSeedanceExpanded
}) {
    const [hoveredId, setHoveredId] = useState(null);
    const [activeVideo, setActiveVideo] = useState(null); // Lightbox/Theater state

    const showreelVideos = [
        { id: 1, src: "assets/videos/pfv1.mp4", glow: "#A78BFA", title: "Neon Dream", genre: "SCI-FI CINEMATIC" },
        { id: 2, src: "assets/videos/pfv7.mp4", glow: "#00f0ff", title: "Cyber Runner", genre: "ACTION TRAILER" },
        { id: 3, src: "assets/videos/pfv6.mp4", glow: "#34D399", title: "Prismara", genre: "FASHION EDITORIAL" },
        { id: 4, src: "assets/videos/pfv2.mp4", glow: "#F87171", title: "Lost Realm", genre: "FANTASY WORLD" },
        { id: 5, src: "assets/videos/pfv8.mp4", glow: "#93C5FD", title: "Echoes of Time", genre: "DRAMA NARRATIVE" },
        { id: 6, src: "assets/videos/pfv5.mp4", glow: "#FBBF24", title: "Velocity", genre: "BRAND COMMERCIAL" }
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
                                    className="cinema-card" 
                                    data-glow={item.glow}
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    onClick={() => setActiveVideo(item)}
                                    style={{
                                        filter: isGrayscaled ? 'grayscale(100%) brightness(0.4)' : 'none',
                                        transition: 'filter 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                                        transform: hoveredId === item.id ? 'scale(1.025) translateY(-5px)' : 'scale(1)',
                                        borderColor: hoveredId === item.id ? item.glow : 'rgba(255, 255, 255, 0.08)',
                                        boxShadow: hoveredId === item.id ? `0 15px 45px ${item.glow}33` : 'none',
                                        zIndex: hoveredId === item.id ? 10 : 1,
                                        cursor: 'pointer'
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
                                        <div className={`cinema-hud-overlay ${hoveredId === item.id ? 'active' : ''}`} style={{ justifyContent: 'flex-end' }}>
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

            {/* Cinematic Theater Lightbox */}
            <AnimatePresence>
                {activeVideo && (
                    <motion.div 
                        className="theater-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveVideo(null)}
                    >
                        <motion.div 
                            className="theater-content"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{ '--theater-glow': activeVideo.glow }}
                        >
                            {/* Close Button */}
                            <button className="theater-close-btn" onClick={() => setActiveVideo(null)} aria-label="Close">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>

                            {/* Large Video Player */}
                            <div className="theater-video-wrapper">
                                <video 
                                    className="theater-video"
                                    src={activeVideo.src}
                                    autoPlay
                                    controls
                                    loop
                                    playsInline
                                    controlsList="nodownload"
                                />
                            </div>

                            {/* Info Banner inside Lightbox */}
                            <div className="theater-info-bar">
                                <div className="theater-info-text">
                                    <span className="theater-genre" style={{ color: activeVideo.glow }}>{activeVideo.genre}</span>
                                    <h3 className="theater-title">{activeVideo.title}</h3>
                                </div>
                                <div className="theater-audio-badge">
                                    <div className="cinema-hud-audio-visualizer" style={{ '--card-glow': activeVideo.glow }}>
                                        <div className="bar bar-1"></div>
                                        <div className="bar bar-2"></div>
                                        <div className="bar bar-3"></div>
                                    </div>
                                    <span className="audio-label">DOLBY AUDIO ON</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
