import React, { useState, useEffect, useRef } from 'react';
import './DeadMansMap.css';

export default function DeadMansMap() {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeMarker, setActiveMarker] = useState(null);
    const modalVideoRef = useRef(null);

    const markers = [
        {
            id: 'combat',
            label: 'Operation I',
            title: 'The Shattered Cove',
            desc: 'Combat Mode — HUD, Environments, Character Design',
            videoSrc: '/assets/videos/game_combat.mp4',
            tags: ['Combat HUD', 'Environment Design', 'Character Art', 'Visual FX'],
            coords: '12°34\'N  45°67\'W'
        },
        {
            id: 'story',
            label: 'Operation II',
            title: 'The Drowned Cathedral',
            desc: 'Story Mode — Cinematic Narrative & Worldbuilding',
            videoSrc: '/assets/videos/game_story.mp4',
            tags: ['Cinematic Sequences', 'Worldbuilding', 'Narrative Design', 'Lighting'],
            coords: '33°12\'S  78°45\'E'
        }
    ];

    const openModal = (marker) => {
        setActiveMarker(marker);
        setModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setModalOpen(false);
        document.body.style.overflow = '';
        if (modalVideoRef.current) {
            modalVideoRef.current.pause();
            modalVideoRef.current.currentTime = 0;
        }
        setTimeout(() => setActiveMarker(null), 500);
    };

    // Close modal on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && modalOpen) closeModal();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [modalOpen]);

    // Autoplay modal video when opened
    useEffect(() => {
        if (modalOpen && modalVideoRef.current) {
            modalVideoRef.current.play().catch(() => {});
        }
    }, [modalOpen, activeMarker]);

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
                            {/* N-S axis */}
                            <line x1="50" y1="5" x2="50" y2="95" stroke="#8b7755" strokeWidth="0.3" opacity="0.3" />
                            {/* E-W axis */}
                            <line x1="5" y1="50" x2="95" y2="50" stroke="#8b7755" strokeWidth="0.3" opacity="0.3" />
                            {/* North pointer */}
                            <polygon points="50,8 46,35 54,35" fill="#8b2500" opacity="0.5" />
                            <polygon points="50,8 46,35 50,30" fill="#8b2500" opacity="0.3" />
                            {/* South pointer */}
                            <polygon points="50,92 46,65 54,65" fill="#8b7755" opacity="0.3" />
                            {/* Cardinal labels */}
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
                                    className="deadmans-marker"
                                    onClick={() => openModal(marker)}
                                >
                                    {/* Video Preview */}
                                    <div className="deadmans-marker-preview">
                                        {/* X mark overlay */}
                                        <div className="deadmans-x-glow"></div>
                                        <span className="deadmans-x-mark">✕</span>

                                        {/* Looping silent preview video */}
                                        <video
                                            className="deadmans-marker-video"
                                            src={marker.videoSrc}
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                            onMouseEnter={(e) => e.target.play().catch(() => {})}
                                            onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                                        />

                                        {/* Play button */}
                                        <div className="deadmans-play-icon">
                                            <svg viewBox="0 0 24 24">
                                                <polygon points="8,5 19,12 8,19" />
                                            </svg>
                                        </div>
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

            {/* ═══ Fullscreen Cinematic Modal ═══ */}
            <div
                className={`deadmans-modal-overlay ${modalOpen ? 'active' : ''}`}
                onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
            >
                {/* Letterbox bars */}
                <div className="deadmans-modal-letterbox-top"></div>
                <div className="deadmans-modal-letterbox-bottom"></div>

                {/* Close button */}
                <button className="deadmans-modal-close" onClick={closeModal}>✕</button>

                {/* Video */}
                {activeMarker && (
                    <div className="deadmans-modal-video-container">
                        <video
                            ref={modalVideoRef}
                            className="deadmans-modal-video"
                            src={activeMarker.videoSrc}
                            controls
                            playsInline
                        />
                    </div>
                )}

                {/* Title label */}
                {activeMarker && (
                    <p className="deadmans-modal-title">{activeMarker.title}</p>
                )}
            </div>
        </section>
    );
}
