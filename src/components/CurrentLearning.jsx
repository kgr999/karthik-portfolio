import React, { useRef, useState } from 'react';

export default function CurrentLearning() {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <section id="current-learning">
            <div className="cl-container">
                <div className="section-header text-center" style={{ marginBottom: '30px' }}>
                    <span className="section-subtitle" style={{ display: 'block', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
                        Active Research & Development
                    </span>
                    <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>
                        Mastering Node based Workflows
                    </h2>

                    {/* Mobile-only status pill (shown below heading, not overlayed on the video) */}
                    <div className="cl-status-pill mobile-only">
                        <span className="cl-pulse-dot"></span>
                        <span>LEARNING THIS RIGHT NOW</span>
                    </div>
                </div>

                <div className="cl-video-card-wrapper">
                    <div className="cl-video-card reveal-item" onClick={toggleMute}>
                        {/* Video Element */}
                        <video
                            ref={videoRef}
                            src="/assets/videos/linkedinpost1.MP4"
                            loop
                            muted
                            playsInline
                            autoPlay
                            className="cl-video-element"
                        />

                        {/* Cyberpunk Scanlines & Vignette */}
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%), linear-gradient(90deg, rgba(74, 222, 128, 0.03), rgba(0, 0, 0, 0), rgba(74, 222, 128, 0.03))', backgroundSize: '100% 4px, 6px 100%', pointerEvents: 'none', opacity: 0.35 }}></div>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', boxShadow: 'inset 0 0 100px rgba(0,0,0,0.9)', pointerEvents: 'none' }}></div>

                        {/* Desktop-only status pill (shown inside video preview) */}
                        <div className="cl-status-pill desktop-only">
                            <span className="cl-pulse-dot"></span>
                            <span>LEARNING THIS RIGHT NOW</span>
                        </div>

                        {/* Bottom Right Unmute/Mute Button */}
                        <button 
                            className="cl-unmute-btn" 
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleMute();
                            }}
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? (
                                <>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <line x1="23" y1="9" x2="17" y2="15" />
                                        <line x1="17" y1="9" x2="23" y2="15" />
                                    </svg>
                                    <span>UNMUTE</span>
                                </>
                            ) : (
                                <>
                                    <div className="cl-btn-equalizer">
                                        <div className="cl-audio-bar"></div>
                                        <div className="cl-audio-bar"></div>
                                        <div className="cl-audio-bar"></div>
                                    </div>
                                    <span>MUTE</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
