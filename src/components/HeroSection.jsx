import React, { useState, useEffect, useRef } from 'react';
import ProfileCard from '../ProfileCard';

function Typewriter({ words, delay = 120, deleteDelay = 800, writeDelay = 2000 }) {
    const [currentWordIdx, setCurrentWordIdx] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const wordsRef = useRef(words);
    useEffect(() => {
        wordsRef.current = words;
    }, [words]);

    const activeWord = wordsRef.current[currentWordIdx];
    const isBlinking = currentText === activeWord || currentText === '';

    useEffect(() => {
        let timer;
        
        const tick = () => {
            if (isDeleting) {
                setCurrentText(prev => prev.slice(0, -1));
            } else {
                setCurrentText(activeWord.slice(0, currentText.length + 1));
            }
        };

        if (!isDeleting && currentText === activeWord) {
            timer = setTimeout(() => setIsDeleting(true), writeDelay);
        } else if (isDeleting && currentText === '') {
            setIsDeleting(false);
            setCurrentWordIdx(prev => (prev + 1) % wordsRef.current.length);
            timer = setTimeout(tick, deleteDelay);
        } else {
            timer = setTimeout(tick, isDeleting ? delay / 2 : delay);
        }

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIdx, delay, deleteDelay, writeDelay, activeWord]);

    return (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span className="typewriter-text">{currentText || '\u200b'}</span>
            <span className={`typewriter-cursor ${isBlinking ? 'blinking' : ''}`} />
        </span>
    );
}

export default function HeroSection({
    isMobile,
    isInitialized,
    isInitializing,
    robotState,
    cloneStatus,
    handleInitialize,
    theme
}) {
    return (
        <section
            id="hero"
            style={{
                position: 'relative',
                overflow: isMobile ? 'visible' : 'hidden',
                opacity: isMobile && isInitialized ? 0 : 1,
                visibility: isMobile && isInitialized ? 'hidden' : 'visible',
                transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                pointerEvents: isMobile && isInitialized ? 'none' : 'auto'
            }}
        >
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="hero-grid">
                    <div className="hero-content">
                        <p className="hero-label hero-reveal-text">AI Creative Producer</p>
                        <h1 className="hero-reveal-text" style={{ minHeight: '130px' }}>
                            <span className="hero-word">I Make AI</span><br />
                            <span className="hero-typewriter-container">
                                <Typewriter words={["MicroDrama", "Short films", "Ads"]} />
                            </span>
                        </h1>

                        <div className="hero-cta hero-reveal-item desktop-only-cta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '24px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: 'max-content' }}>
                                <button className={`init-btn ${robotState === 'stage-idle' && !isInitializing && !isInitialized ? 'shimmering' : ''}`} onClick={handleInitialize}>
                                    <span className="init-btn-glow"></span>
                                    <span className="init-btn-sweep"></span>
                                    <span className="init-btn-loading-bar"></span>
                                    <span className="init-btn-status-node"></span>
                                    <span className="init-btn-text">View Portfolio</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="hero-avatar-wrapper">
                        <ProfileCard imgSrc="/assets/images/karthik_avatar.webp" cloneStatus={cloneStatus} />
                    </div>
                    <div className="hero-cta hero-reveal-item mobile-only-cta" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        maxWidth: '280px',
                        margin: '0 auto',
                        opacity: isInitialized ? 0 : 1,
                        visibility: isInitialized ? 'hidden' : 'visible',
                        transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                    }}>
                        <div className="scroll-hint-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                            <span className="scroll-hint-text" style={{
                                fontSize: '0.72rem',
                                fontWeight: '700',
                                letterSpacing: '3px',
                                color: 'var(--accent)',
                                textTransform: 'uppercase',
                                opacity: 0.85
                            }}>
                                {theme === 'kuku' ? 'LOADING.. SCROLL UP' : 'SCROLL TO ENTER'}
                            </span>
                            <div className="scroll-hint-arrow" style={{
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                                    <path d="M1 1L7 7L13 1" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero AI Studio Spotlight */}
                {!isMobile && (
                    <div className={`aero-hero-robot ${robotState}`}>
                        <div className="studio-light-wrapper" style={{ width: '80px', height: '100px', overflow: 'visible' }}>
                            {/* Stand (Stationary at the bottom) */}
                            <div className="spotlight-stand">
                                <svg viewBox="0 0 80 60" width="100%" height="100%">
                                    <path d="M 25 55 L 40 40 L 55 55" stroke="#aa771c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                                    <path d="M 40 40 L 40 25" stroke="#b38728" strokeWidth="3" strokeLinecap="round" fill="none" />
                                    <path d="M 20 20 C 20 40, 60 40, 60 20" stroke="#e5c060" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                                </svg>
                            </div>

                            {/* Sweeping Group (Head + Beams rotate together) */}
                            <div className="spotlight-sweeping-group">
                                {/* Golden Light Beam Cone & Ray Shafts */}
                                <div className="studio-beams">
                                    <svg viewBox="0 0 350 350" className="studio-beams-svg">
                                        <defs>
                                            <linearGradient id="gold-beam-grad" x1="0.5" y1="1" x2="0.5" y2="0">
                                                <stop offset="0%" stopColor="#FCF6BA" stopOpacity="0.4" />
                                                <stop offset="25%" stopColor="#b38728" stopOpacity="0.22" />
                                                <stop offset="65%" stopColor="#aa771c" stopOpacity="0.05" />
                                                <stop offset="100%" stopColor="#aa771c" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        {/* Cone representing the main volume of light beam pointing straight up from lens */}
                                        <path d="M 175 350 L 50 20 A 180 180 0 0 1 300 20 Z" fill="url(#gold-beam-grad)" className="beam-cone-vol" />
                                        
                                        {/* Sharp golden rays pulsing/shimmering inside the beam */}
                                        <line x1="175" y1="350" x2="70" y2="40" stroke="#FCF6BA" strokeWidth="2" opacity="0.15" className="beam-ray ray-1" />
                                        <line x1="175" y1="350" x2="130" y2="15" stroke="#FCF6BA" strokeWidth="3" opacity="0.12" className="beam-ray ray-2" />
                                        <line x1="175" y1="350" x2="220" y2="15" stroke="#b38728" strokeWidth="2" opacity="0.22" className="beam-ray ray-3" />
                                        <line x1="175" y1="350" x2="280" y2="40" stroke="#FCF6BA" strokeWidth="1.5" opacity="0.15" className="beam-ray ray-4" />
                                    </svg>
                                </div>

                                {/* Spotlight Head/Casing */}
                                <div className="spotlight-head">
                                    <svg viewBox="0 0 80 80" width="100%" height="100%">
                                        <g>
                                            {/* Handle at back */}
                                            <path d="M 40 68 C 32 68, 32 76, 40 76" fill="none" stroke="#7a5813" strokeWidth="2" />
                                            {/* Casing */}
                                            <rect x="25" y="27" width="30" height="36" rx="5" fill="#141414" stroke="#e5c060" strokeWidth="2" />
                                            {/* Lens collar */}
                                            <rect x="21" y="20" width="38" height="7" rx="1.5" fill="#aa771c" />
                                            {/* Lens glass surface */}
                                            <ellipse cx="40" cy="20" rx="19" ry="3.5" fill="#FCF6BA" />
                                            
                                            {/* Cooling fins details */}
                                            <line x1="30" y1="33" x2="30" y2="58" stroke="#7a5813" strokeWidth="1.2" />
                                            <line x1="40" y1="33" x2="40" y2="58" stroke="#7a5813" strokeWidth="1.2" />
                                            <line x1="50" y1="33" x2="50" y2="58" stroke="#7a5813" strokeWidth="1.2" />
                                            
                                            {/* Barn doors (tilted panels open wide) */}
                                            {/* Left door */}
                                            <path d="M 21 20 L 3 5 L 10 -3 L 25 20" fill="#141414" stroke="#b38728" strokeWidth="1.2" />
                                            {/* Right door */}
                                            <path d="M 59 20 L 77 5 L 70 -3 L 55 20" fill="#141414" stroke="#b38728" strokeWidth="1.2" />
                                            
                                            {/* Bulb core glow */}
                                            <circle cx="40" cy="20" r="7" fill="#ffffff" filter="drop-shadow(0 0 6px #FCF6BA)" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
