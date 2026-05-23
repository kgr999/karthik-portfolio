import React, { useRef, useState } from 'react';
import './ProfileCard.css';

export default function ProfileCard({ videoSrc, cloneStatus = 'active' }) {
    const videoRef = useRef(null);
    const cardRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) { 
            videoRef.current.pause(); 
        } else { 
            videoRef.current.play(); 
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleCardClick = (e) => {
        // Prevent toggle if clicking on control buttons directly
        if (e.target.closest('.avatar-hud-bottom')) return;

        if (!videoRef.current) return;
        if (isMuted) {
            videoRef.current.muted = false;
            setIsMuted(false);
            if (!isPlaying) {
                videoRef.current.play();
                setIsPlaying(true);
            }
        } else {
            togglePlay();
        }
    };

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
        cardRef.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    };

    return (
        <div className="avatar-card-outer" ref={cardRef}
            onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <div className="avatar-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
                {/* Holographic grid and scanline effect */}
                <div className="avatar-hologram" />
                
                {/* HUD Framing Corner Brackets */}
                <div className="avatar-corner avatar-corner-tl" />
                <div className="avatar-corner avatar-corner-tr" />
                <div className="avatar-corner avatar-corner-bl" />
                <div className="avatar-corner avatar-corner-br" />

                {/* "Tap to Interact" Pulsing Overlay */}
                {isMuted && (
                    <div className="avatar-unmute-overlay">
                        <div className="avatar-unmute-btn">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                            </svg>
                            <span>Tap to Interact</span>
                        </div>
                    </div>
                )}

                <video ref={videoRef} className="avatar-video" src={videoSrc}
                    autoPlay loop muted playsInline />

                {/* Minimal HUD overlay */}
                <div className="avatar-hud-top">
                    <span className={`avatar-status-dot ${cloneStatus === 'loading' ? 'status-loading' : 'status-active'}`} />
                    <span className="avatar-status-text">
                        {cloneStatus === 'loading' ? 'LOADING CLONE..' : 'AI CLONE ACTIVE'}
                    </span>
                    {!isMuted && (
                        <div className="avatar-equalizer" title="Audio Active">
                            <span className="eq-bar bar1"></span>
                            <span className="eq-bar bar2"></span>
                            <span className="eq-bar bar3"></span>
                            <span className="eq-bar bar4"></span>
                        </div>
                    )}
                </div>

                {/* Bottom controls */}
                <div className="avatar-hud-bottom">
                    <button className={`avatar-ctrl-btn ${isPlaying ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); togglePlay(); }} aria-label="Play/Pause">
                        {isPlaying ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        )}
                    </button>
                    <button className={`avatar-ctrl-btn ${!isMuted ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); toggleMute(); }} aria-label="Mute/Unmute">
                        {isMuted ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
