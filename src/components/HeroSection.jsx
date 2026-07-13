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
                opacity: !isMobile && isInitialized ? 0 : 1,
                visibility: !isMobile && isInitialized ? 'hidden' : 'visible',
                transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                pointerEvents: !isMobile && isInitialized ? 'none' : 'auto'
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
                                {theme === 'kuku' ? 'LOADING.. SCROLL UP' : 'SEE MY WORK'}
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

                {/* Spotlight removed */}
            </div>
        </section>
    );
}
