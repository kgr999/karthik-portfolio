import React from 'react';
import ProfileCard from '../ProfileCard';

export default function HeroSection({
    isMobile,
    isInitialized,
    isInitializing,
    robotState,
    cloneStatus,
    handleInitialize
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
                        <p className="hero-label hero-reveal-text">AI Creative Director & Storyteller</p>
                        <h1 className="hero-reveal-text">
                            <span className="hero-word">Engineering</span><br />
                            <span className="hero-word">Human</span> <span className="hero-word"><span>Attention.</span></span>
                        </h1>
                        {/* Glassmorphic About Me Dossier Panel */}
                        <div className="hero-dossier-card hero-reveal-item" style={{ marginTop: '24px' }}>
                            <p className="hero-sub" style={{ margin: 0, marginTop: 0, maxWidth: 'none', color: 'rgba(255, 255, 255, 0.95)', fontSize: 'clamp(1.25rem, 1.65vw, 1.45rem)', lineHeight: '1.45' }}>
                                I direct and produce multimodal AI content from microdramas to narrative driven ads using state-of-the-art generative AI platforms
                            </p>

                            <div className="dossier-actions" style={{ marginTop: '16px' }}>
                                <a
                                    href="/KarthikGRaj_AI_Creative_Resume.pdf"
                                    download="KarthikGRaj_AI_Creative_Resume.pdf"
                                    className="dossier-resume-btn"
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '6px' }}>
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                    </svg>
                                    DOWNLOAD RESUME
                                </a>
                            </div>
                        </div>

                        <div className="hero-cta hero-reveal-item desktop-only-cta" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '24px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', width: 'max-content' }}>
                                <button className={`init-btn ${robotState === 'stage-idle' && !isInitializing && !isInitialized ? 'shimmering' : ''}`} onClick={handleInitialize}>
                                    <span className="init-btn-glow"></span>
                                    <span className="init-btn-sweep"></span>
                                    <span className="init-btn-loading-bar"></span>
                                    <span className="init-btn-status-node"></span>
                                    <span className="init-btn-text">ACCESS PORTFOLIO</span>
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
                                color: '#3b82f6',
                                textTransform: 'uppercase',
                                opacity: 0.85
                            }}>
                                SCROLL TO ENTER
                            </span>
                            <div className="scroll-hint-arrow" style={{
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                                    <path d="M1 1L7 7L13 1" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero AI Assistant Robot Aero */}
                <div className={`aero-hero-robot ${robotState}`} style={isMobile ? {
                    opacity: isInitialized ? 0 : '',
                    visibility: isInitialized ? 'hidden' : '',
                    transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), visibility 0.6s cubic-bezier(0.25, 1, 0.5, 1)'
                } : {}}>
                    <div className="aero-body-wrapper">
                        {/* Waving/Pointing Arm (Right Arm) */}
                        <div className="aero-arm-right">
                            <svg viewBox="0 0 40 100" className="aero-arm-svg">
                                <path d="M15,12 L15,62" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
                                <circle cx="15" cy="12" r="5.5" fill="#151518" stroke="var(--accent)" strokeWidth="2" />
                                <circle cx="15" cy="62" r="3.5" fill="#151518" stroke="var(--accent)" strokeWidth="1.5" />
                                <g className="aero-hand-group">
                                    <path d="M11,66 C7,70 8,78 13,82 C18,80 19,72 16,67" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
                                    <circle cx="13" cy="74" r="2" fill="var(--accent)" />
                                </g>
                            </svg>
                        </div>

                        {/* Torso & Core */}
                        <div className="aero-torso">
                            <div className="aero-chest">
                                <div className="aero-core-pulse"></div>
                                <div className="aero-core"></div>
                            </div>
                        </div>

                        {/* Head & Face Visor */}
                        <div className="aero-head">
                            <div className="aero-antenna">
                                <div className="aero-antenna-line"></div>
                                <div className="aero-antenna-tip"></div>
                            </div>
                            <div className="aero-visor">
                                <div className="aero-eye left"></div>
                                <div className="aero-eye right"></div>
                            </div>
                            <div className="aero-ears">
                                <div className="aero-ear left"></div>
                                <div className="aero-ear right"></div>
                            </div>
                        </div>

                        {/* Left Arm */}
                        <div className="aero-arm-left">
                            <svg viewBox="0 0 40 100" className="aero-arm-svg">
                                <path d="M25,12 L25,62" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
                                <circle cx="25" cy="12" r="5.5" fill="#151518" stroke="var(--accent)" strokeWidth="2" />
                                <circle cx="25" cy="62" r="3.5" fill="#151518" stroke="var(--accent)" strokeWidth="1.5" />
                                <g className="aero-hand-group">
                                    <path d="M29,66 C33,70 32,78 27,82 C22,80 21,72 24,67" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
                                    <circle cx="27" cy="74" r="2" fill="var(--accent)" />
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
