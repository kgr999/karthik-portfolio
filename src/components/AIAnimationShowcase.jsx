import React, { useState, useRef } from 'react';
import LazyVideo from './LazyVideo';

export default function AIAnimationShowcase() {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef(null);

    const pipelineTags = [
        { name: 'Runway Gen-3 Alpha', category: 'Frame Generation' },
        { name: 'Luma Dream Machine', category: 'Camera Motion' },
        { name: 'Midjourney v6.1', category: 'Character & World Art' },
        { name: 'ComfyUI ControlNet', category: 'Motion Rigging' },
        { name: 'ElevenLabs Audio', category: 'Neural Voice & SFX' },
        { name: 'RIFE 60FPS', category: 'Frame Interpolation' }
    ];

    const techSpecs = [
        {
            number: '01',
            title: 'Motion & Camera Trajectory',
            description: 'Precise prompt-based camera movements, dolly zooms, and fluid physical motion control without temporal warping.'
        },
        {
            number: '02',
            title: 'Character & Lighting Consistency',
            description: 'Advanced LoRA & ControlNet pipelines to retain visual character identity across multiple scenes and lighting setups.'
        },
        {
            number: '03',
            title: 'Neural Audio & Foley Design',
            description: 'Multi-track AI sound design, spatial audio synthesis, and beat-locked soundtrack generation for 4K cinematic delivery.'
        }
    ];

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <section id="ai-animations" className="ai-animations-section" style={{ padding: '90px 0', position: 'relative', background: 'var(--bg, #000000)', zIndex: 2 }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                
                {/* Section Header */}
                <div className="section-header text-center" style={{ marginBottom: '45px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '5px 14px',
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        marginBottom: '14px'
                    }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E50914', boxShadow: '0 0 10px #E50914' }} />
                        <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>
                            FEATURED SHOWCASE REEL
                        </span>
                    </div>

                    <h2 className="section-heading reveal-text" style={{ marginBottom: '10px', fontSize: '2.4rem', fontWeight: '900', letterSpacing: '-0.5px' }}>
                        AI Cinematic Animations
                    </h2>
                </div>

                {/* 16:9 Widescreen Theater Player */}
                <div className="ai-animation-theater" style={{
                    position: 'relative',
                    width: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: '#08080a',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(229, 9, 20, 0.08)',
                    marginBottom: '40px'
                }}>
                    {/* Widescreen Video Frame Container */}
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        paddingTop: '56.25%', /* 16:9 Aspect Ratio */
                        background: '#040406'
                    }}>
                        <div style={{ position: 'absolute', inset: 0 }}>
                            <LazyVideo 
                                ref={videoRef}
                                src="/assets/videos/dieseldrama_comp.mp4"
                                loop
                                muted={isMuted}
                                playsInline
                                autoPlay
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>

                        {/* Top Ambient Vignette & HUD Info */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            padding: '24px 28px',
                            background: 'linear-gradient(to bottom, rgba(8, 8, 10, 0.85) 0%, rgba(8, 8, 10, 0) 100%)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            zIndex: 3,
                            pointerEvents: 'none'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{
                                    fontFamily: 'var(--font-mono, monospace)',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    padding: '4px 10px',
                                    borderRadius: '6px',
                                    background: 'rgba(229, 9, 20, 0.25)',
                                    border: '1px solid rgba(229, 9, 20, 0.5)',
                                    color: '#ffffff',
                                    letterSpacing: '1px'
                                }}>
                                    4K CINEMATIC REEL
                                </span>
                                <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-mono, monospace)' }}>
                                    RUNTIME // 01:45
                                </span>
                            </div>

                            {/* Live Badge */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: 'rgba(0, 0, 0, 0.5)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00ff80', boxShadow: '0 0 8px #00ff80' }} />
                                <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#fff', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                    HD STEREO
                                </span>
                            </div>
                        </div>

                        {/* Interactive Bottom Control Bar Overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '24px 28px',
                            background: 'linear-gradient(to top, rgba(8, 8, 10, 0.95) 0%, rgba(8, 8, 10, 0) 100%)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            zIndex: 3
                        }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0' }}>
                                    Generative Animation & FX Masterclass Reel
                                </h3>
                                <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.65)', margin: 0 }}>
                                    Full Multi-Model Pipeline Showcase (1-2 Min Clip)
                                </p>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {/* Play/Pause Toggle Button */}
                                <button 
                                    onClick={togglePlay}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.12)',
                                        border: '1px solid rgba(255, 255, 255, 0.25)',
                                        borderRadius: '30px',
                                        padding: '8px 18px',
                                        color: '#ffffff',
                                        fontSize: '0.8rem',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        backdropFilter: 'blur(10px)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {isPlaying ? '⏸ Pause' : '▶ Play Reel'}
                                </button>

                                {/* Mute/Unmute Toggle Button */}
                                <button 
                                    onClick={toggleMute}
                                    style={{
                                        background: isMuted ? 'rgba(255, 255, 255, 0.08)' : 'rgba(229, 9, 20, 0.3)',
                                        border: isMuted ? '1px solid rgba(255, 255, 255, 0.18)' : '1px solid rgba(229, 9, 20, 0.6)',
                                        borderRadius: '30px',
                                        padding: '8px 18px',
                                        color: '#ffffff',
                                        fontSize: '0.8rem',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        backdropFilter: 'blur(10px)',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {isMuted ? '🔇 Unmute Audio' : '🔊 Mute Audio'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pipeline Tools Cloud Bar */}
                <div style={{ marginBottom: '45px', textAlign: 'center' }}>
                    <h4 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'rgba(255, 255, 255, 0.5)', marginBottom: '14px', fontFamily: 'var(--font-mono, monospace)' }}>
                        AI PRODUCTION PIPELINE & STACK USED
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
                        {pipelineTags.map((tag, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 14px',
                                borderRadius: '8px',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.08)'
                            }}>
                                <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#ffffff' }}>{tag.name}</span>
                                <span style={{ fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.45)', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 6px', borderRadius: '4px' }}>
                                    {tag.category}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3 Technical Specs / Highlights Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '24px'
                }}>
                    {techSpecs.map((spec, index) => (
                        <div key={index} style={{
                            padding: '24px 26px',
                            borderRadius: '14px',
                            background: '#0c0c0e',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                            transition: 'all 0.3s ease'
                        }}>
                            <div style={{
                                fontFamily: 'var(--font-mono, monospace)',
                                fontSize: '0.82rem',
                                fontWeight: '800',
                                color: 'var(--accent, #E50914)',
                                marginBottom: '10px',
                                letterSpacing: '1px'
                            }}>
                                {spec.number} // PIPELINE CAPABILITY
                            </div>
                            <h4 style={{ fontSize: '1.08rem', fontWeight: '700', color: '#ffffff', margin: '0 0 8px 0' }}>
                                {spec.title}
                            </h4>
                            <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.55, margin: 0 }}>
                                {spec.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
