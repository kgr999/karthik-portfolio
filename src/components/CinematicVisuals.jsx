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

    const showreelVideos = [
        { id: 1, src: "assets/videos/pfv1.mp4", glow: "#A78BFA" },
        { id: 2, src: "assets/videos/pfv7.mp4", glow: "#00f0ff" },
        { id: 3, src: "assets/videos/pfv6.mp4", glow: "#34D399" },
        { id: 4, src: "assets/videos/pfv2.mp4", glow: "#F87171" },
        { id: 5, src: "assets/videos/pfv8.mp4", glow: "#93C5FD" },
        { id: 6, src: "assets/videos/pfv5.mp4", glow: "#FBBF24" }
    ];

    const activeVideo = showreelVideos.find((v) => v.id === hoveredId);

    return (
        <>
            {/* Cinematic Self-Visuals Section */}
            <section id="self-visuals" style={{ position: 'relative' }}>
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
                                            muted={true} 
                                            playsInline 
                                            autoPlay 
                                            forcePause={isPaused}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Floating/Centered Unmuted Preview Window */}
                <AnimatePresence>
                    {activeVideo && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-40%' }}
                            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
                            exit={{ opacity: 0, scale: 0.9, x: '-50%', y: '-40%' }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="cinema-preview-window"
                            style={{
                                '--glow-color': activeVideo.glow
                            }}
                        >
                            <video
                                src={activeVideo.src}
                                autoPlay
                                loop
                                playsInline
                                muted={false}
                                controls={false}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </>
    );
}
