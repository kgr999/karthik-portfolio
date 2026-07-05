import React, { useState, useEffect } from 'react';

export default function FeaturedProjects() {
    // Console tab state (null at start, 'montra', or 'lincoln')
    const [activeProject, setActiveProject] = useState(null);
    const [flippedCard, setFlippedCard] = useState(null);

    // Responsive view state
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1024px)');
        const handleMatch = (e) => setIsMobile(e.matches);
        
        setIsMobile(mediaQuery.matches);
        
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleMatch);
            return () => mediaQuery.removeEventListener('change', handleMatch);
        } else {
            mediaQuery.addListener(handleMatch);
            return () => mediaQuery.removeListener(handleMatch);
        }
    }, []);
    // Tab states within each project
    const [montraTab, setMontraTab] = useState('vis');
    const [lincolnTab, setLincolnTab] = useState('avatar');
    const [dieselTab, setDieselTab] = useState('strategy');
    // Video modal states
    const [montraModalOpen, setMontraModalOpen] = useState(false);
    const [lincolnModalOpen, setLincolnModalOpen] = useState(false);
    const [reelModalOpen, setReelModalOpen] = useState(false);

    const closeCaseStudies = () => {
        // 1. Instantly collapse the active case study deck to make close action immediate
        setActiveProject(null);

        // 2. Wait a tiny tick for DOM reflow, then smoothly glide to the selector deck
        setTimeout(() => {
            const target = document.getElementById('featured-projects');
            if (target) {
                if (window.lenis) {
                    window.lenis.scrollTo(target, { 
                        offset: 240,
                        duration: 1.2
                    });
                } else {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }, 50);
    };

    // Brand tools
    const montraTools = [
        { name: 'Kling V3 Pro', glow: '#D4A574' },
        { name: 'Seedance 2.0', glow: '#D4A574' },
        { name: 'ElevenLabs', glow: '#D4A574' },
        { name: 'DaVinci Resolve', glow: '#D4A574' },
        { name: 'Topaz Video AI', glow: '#D4A574' }
    ];
    const lincolnTools = [
        { name: 'HeyGen', glow: '#8B9DC3' },
        { name: 'Kling', glow: '#8B9DC3' },
        { name: 'ElevenLabs', glow: '#8B9DC3' }
    ];

    const dieselTools = [
        { name: 'DaVinci Resolve', glow: '#C47D7D' },
        { name: 'ElevenLabs', glow: '#C47D7D' },
        { name: 'CapCut', glow: '#C47D7D' },
        { name: 'Instagram Creator Suite', glow: '#C47D7D' }
    ];
    // Bullet points for clipboard copy
    const montraAllBullets = [
        "I directed and produced the keynote launch video for Montra Electric's Eviator Range, managing the creative process from initial storyboard to big-screen delivery.",
        "I generated realistic AI video assets using Kling and Seedance 2.0 to display the two vehicle variants in action.",
        "I integrated custom voiceovers using ElevenLabs, keeping the narration perfectly paced and natural.",
        "I polished the visual flow, pacing, and color grading in DaVinci Resolve.",
        "I upscaled the final render using Topaz Video AI to ensure it looked crisp and sharp on large event screens."
    ];

    const lincolnAllBullets = [
        "I generated regional AI avatar presenters with HeyGen, ensuring realistic lip-syncing for local target audiences.",
        "I crafted dynamic b-roll sequences using Kling to elevate the narrative energy and pacing.",
        "I synced multi-character ElevenLabs narration to give each avatar a distinct, high-quality voice.",
        "I delivered the full 15-minute launch campaign in a 48-hour sprint, pivoting a live venue launch into a digital experience."
    ];

    const montraFullText = `Project: Montra Electric Eviator Launch Video Production\nRole: Launch Video\nTools: Kling V3 Pro, Seedance 2.0, ElevenLabs, DaVinci Resolve, Topaz Video AI\n\nKey Contribution: I brought Montra Electric's new EV range to life, producing a premium reveal video for their keynote event. I led the end-to-end creative production—generating AI video scenes, directing localized voiceovers, and upscaling the final edit for a massive large-venue projection.\n\nProduction Deliverables:\n${montraAllBullets.map(b => '• ' + b).join('\n')}`;

    const lincolnFullText = `Project: Lincoln Pharma Pa12 Launch Drama\nRole: Presentation Drama\nTools: HeyGen, Kling, ElevenLabs\n\nKey Contribution: I stepped up to co-create a 15-minute product launch video for an international pharmaceutical campaign in just two days. Under this tight deadline, I was responsible for generating realistic lip-synced avatars, directing video action scenes, and aligning multi-character voiceovers.\n\nProduction Deliverables:\n${lincolnAllBullets.map(b => '• ' + b).join('\n')}`;

    // Helper Render functions for DRY card definitions
    const renderMontraCard = () => (
        <div 
            className="fp-dashboard-card compact-card animated-fade-in" 
            style={{ '--card-accent': '#D4A574', '--card-glow-opacity': 'rgba(212, 165, 116, 0.04)' }}
        >
            <div className="fp-visual-container">
                {/* Widescreen Keynote Video Card */}
                <div 
                    className="cinema-card play-trigger-card" 
                    data-glow="#D4A574" 
                    style={{ width: '100%', cursor: 'pointer' }}
                    onClick={() => {
                        if (isMobile) {
                            window.open('https://drive.google.com/file/d/1VA9r9yJDKCBJL8w8rgXPP3wsYS2S_VYO/view?usp=sharing', '_blank');
                        } else {
                            setMontraModalOpen(true);
                        }
                    }}
                >
                    <div className="cinema-video-wrapper">
                        <img
                            className="cinema-video"
                            src="/assets/images/eviatorlaunchphoto.webp"
                            alt="Montra Electric Eviator Launch Video Production"
                            style={{ objectPosition: 'center' }}
                            loading="lazy"
                        />
                        
                        <div className="fp-play-overlay">
                            <div className="fp-play-button-ring" style={{ '--ring-accent': '#D4A574', '--ring-glow': 'rgba(212, 165, 116, 0.4)' }}>
                                <span className="fp-play-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '0.9em', height: '0.9em' }}>
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </span>
                            </div>
                            <span className="fp-play-label" style={{ '--label-accent': '#D4A574' }}>Play Case Video</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Interactive specs, pipeline, tools, actions */}
            <div className="fp-content-container">
                <div className="fp-card-header">
                    <div className="fp-header-meta">
                        <h3 className="fp-project-title">Montra Electric Eviator Launch</h3>
                    </div>
                    <span className="fp-role-tag" style={{ '--role-accent': '#D4A574' }}>Launch Video</span>
                </div>

                {!isMobile && (
                    <p className="fp-contribution-pitch">
                        I had the privilege of bringing Montra Electric's new EV range to life, producing a premium reveal video for their keynote event. I led the creative journey from initial storyboarding to upscaling the final cut for massive venue screens.
                    </p>
                )}

                <div className="fp-hud-metadata" style={{ '--hud-accent': '#D4A574' }}>
                    <div className="fp-hud-item">
                        <span className="fp-hud-lbl">Duration</span>
                        <span className="fp-hud-val">Keynote Reveal</span>
                    </div>
                    <div className="fp-hud-item">
                        <span className="fp-hud-lbl">Aspect Ratio</span>
                        <span className="fp-hud-val">16:9 Cinema</span>
                    </div>
                    <div className="fp-hud-item">
                        <span className="fp-hud-lbl">Languages</span>
                        <span className="fp-hud-val">7 Regional Languages</span>
                    </div>
                </div>

                <div className="fp-pipeline-tabs">
                    <button 
                        className={`fp-tab-btn ${montraTab === 'vis' ? 'active' : ''}`}
                        onClick={() => setMontraTab('vis')}
                        style={{ '--tab-accent': '#D4A574' }}
                    >
                        📽️ Narrative & Video
                    </button>
                    <button 
                        className={`fp-tab-btn ${montraTab === 'post' ? 'active' : ''}`}
                        onClick={() => setMontraTab('post')}
                        style={{ '--tab-accent': '#D4A574' }}
                    >
                        🎧 Audio & Post
                    </button>
                    <button 
                        className={`fp-tab-btn ${montraTab === 'metrics' ? 'active' : ''}`}
                        onClick={() => setMontraTab('metrics')}
                        style={{ '--tab-accent': '#D4A574' }}
                    >
                        🚀 Final Output
                    </button>
                </div>

                <div className="fp-pipeline-content">
                    {montraTab === 'vis' && (
                        <div className="fp-deliverables-group animated-fade-in">
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#D4A574' }}>▸</span>
                                <span>Produced the keynote launch video for Montra Electric's Eviator Range, managing storyboard to delivery.</span>
                            </div>
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#D4A574' }}>▸</span>
                                <span>Generated high-fidelity AI video assets using Kling and Seedance 2.0 for vehicle variant visuals.</span>
                            </div>
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#D4A574' }}>▸</span>
                                <span>Dubbed the keynote presentation and directed narrations in 7 other regional Indian languages.</span>
                            </div>
                        </div>
                    )}
                    {montraTab === 'post' && (
                        <div className="fp-deliverables-group animated-fade-in">
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#D4A574' }}>▸</span>
                                <span>Orchestrated realistic audio narration with clean, pacing AI voiceovers using ElevenLabs.</span>
                            </div>
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#D4A574' }}>▸</span>
                                <span>Executed professional color grading, audio layout, and pacing cuts in DaVinci Resolve.</span>
                            </div>
                        </div>
                    )}
                    {montraTab === 'metrics' && (
                        <div className="fp-deliverables-group animated-fade-in">
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#D4A574' }}>▸</span>
                                <span>Upscaled final video assets to guarantee sharp, high-resolution outputs using Topaz Video AI.</span>
                            </div>
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#D4A574' }}>▸</span>
                                <span>Successfully delivered high-end video assets for elite corporate keynote display.</span>
                            </div>
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#D4A574' }}>▸</span>
                                <span>Iterated on AI outputs through multiple refinement cycles to ensure quality standards and brand guideline compliance.</span>
                            </div>
                        </div>
                    )}
                </div>



                <div className="fp-action-row">
                    <button 
                        className="fp-copy-details-btn" 
                        style={{ '--accent-color': '#D4A574' }}
                        onClick={() => window.open('https://admitra.in/customer-stories/montra-eviator-launch', '_blank')}
                    >
                        🔗 More Info
                    </button>
                </div>
            </div>
        </div>
    );

    const renderLincolnCard = () => (
        <div 
            className="fp-dashboard-card compact-card animated-fade-in" 
            style={{ '--card-accent': '#8B9DC3', '--card-glow-opacity': 'rgba(139, 157, 195, 0.04)' }}
        >
            <div className="fp-visual-container">
                <div 
                    className="cinema-card play-trigger-card" 
                    data-glow="#8B9DC3" 
                    style={{ width: '100%', cursor: 'pointer' }}
                    onClick={() => {
                        if (isMobile) {
                            window.open('https://drive.google.com/file/d/1hdDxSZyTSEW6ctVFJLjQhcH185_DUWbl/view?usp=sharing', '_blank');
                        } else {
                            setLincolnModalOpen(true);
                        }
                    }}
                >
                    <div className="cinema-video-wrapper">
                        <img
                            className="cinema-video"
                            src="/assets/images/lincolnpharmaphoto.webp"
                            alt="Lincoln Pharma Pa12 Launch Drama"
                            style={{ objectPosition: 'center' }}
                            loading="lazy"
                        />
                        
                        <div className="fp-play-overlay">
                            <div className="fp-play-button-ring" style={{ '--ring-accent': '#8B9DC3', '--ring-glow': 'rgba(139, 157, 195, 0.4)' }}>
                                <span className="fp-play-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '0.9em', height: '0.9em' }}>
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </span>
                            </div>
                            <span className="fp-play-label" style={{ '--label-accent': '#8B9DC3' }}>Play Case Video</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Interactive specs, pipeline, tools, actions */}
            <div className="fp-content-container">
                <div className="fp-card-header">
                    <div className="fp-header-meta">
                        <h3 className="fp-project-title">Lincoln Pharma Pa12 Launch</h3>
                    </div>
                    <span className="fp-role-tag" style={{ '--role-accent': '#8B9DC3' }}>Presentation Drama</span>
                </div>

                {!isMobile && (
                    <p className="fp-contribution-pitch">
                        When a major international launch needed a 15-minute product campaign in just 48 hours, I stepped up to co-create it. I shaped the narrative pacing, directed the AI-generated regional avatars, and aligned multi-character voiceovers to deliver under pressure.
                    </p>
                )}

                <div className="fp-hud-metadata" style={{ '--hud-accent': '#8B9DC3' }}>
                    <div className="fp-hud-item">
                        <span className="fp-hud-lbl">Duration</span>
                        <span className="fp-hud-val">15-Min Longform</span>
                    </div>
                    <div className="fp-hud-item">
                        <span className="fp-hud-lbl">Timeline</span>
                        <span className="fp-hud-val">48-Hour Sprint</span>
                    </div>
                    <div className="fp-hud-item">
                        <span className="fp-hud-lbl">Audio Format</span>
                        <span className="fp-hud-val">Multi-Voice</span>
                    </div>
                </div>

                <div className="fp-pipeline-tabs">
                    <button 
                        className={`fp-tab-btn ${lincolnTab === 'avatar' ? 'active' : ''}`}
                        onClick={() => setLincolnTab('avatar')}
                        style={{ '--tab-accent': '#8B9DC3' }}
                    >
                        📽️ Avatar & Directing
                    </button>
                    <button 
                        className={`fp-tab-btn ${lincolnTab === 'voice' ? 'active' : ''}`}
                        onClick={() => setLincolnTab('voice')}
                        style={{ '--tab-accent': '#8B9DC3' }}
                    >
                        🎧 Voice & Pacing
                    </button>
                    <button 
                        className={`fp-tab-btn ${lincolnTab === 'metrics' ? 'active' : ''}`}
                        onClick={() => setLincolnTab('metrics')}
                        style={{ '--tab-accent': '#8B9DC3' }}
                    >
                        🚀 Campaign Output
                    </button>
                </div>

                <div className="fp-pipeline-content">
                    {lincolnTab === 'avatar' && (
                        <div className="fp-deliverables-group animated-fade-in">
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#8B9DC3' }}>▸</span>
                                <span>Generated AI avatar videos using HeyGen to create lip-synced characters for target regional markets.</span>
                            </div>
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#8B9DC3' }}>▸</span>
                                <span>Produced custom b-roll layouts and video action movements in Kling to match scripting.</span>
                            </div>
                        </div>
                    )}
                    {lincolnTab === 'voice' && (
                        <div className="fp-deliverables-group animated-fade-in">
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#8B9DC3' }}>▸</span>
                                <span>Orchestrated high-fidelity multi-voice dialogue and storytelling narration inside ElevenLabs.</span>
                            </div>
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#8B9DC3' }}>▸</span>
                                <span>Aligned dialogue spacing, pacing, and post-production timeline layout perfectly.</span>
                            </div>
                        </div>
                    )}
                    {lincolnTab === 'metrics' && (
                        <div className="fp-deliverables-group animated-fade-in">
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#8B9DC3' }}>▸</span>
                                <span>Delivered complete 15-minute presentation in under 48 hours to successfully pivot campaign.</span>
                            </div>
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#8B9DC3' }}>▸</span>
                                <span>International pharmaceutical campaign launched successfully with high technical clarity.</span>
                            </div>
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#8B9DC3' }}>▸</span>
                                <span>Collaborated with technical teams on AI workflow capabilities, developing content policies and quality guardrails.</span>
                            </div>
                        </div>
                    )}
                </div>



                <div className="fp-action-row">
                    <button 
                        className="fp-copy-details-btn" 
                        style={{ '--accent-color': '#8B9DC3' }}
                        onClick={() => window.open('https://admitra.in/customer-stories/lincoln-pa12-drama', '_blank')}
                    >
                        🔗 More Info
                    </button>
                </div>
            </div>
        </div>
    );

    const renderDieselCard = () => (
        <div 
            className="fp-dashboard-card compact-card animated-fade-in" 
            style={{ '--card-accent': '#C47D7D', '--card-glow-opacity': 'rgba(196, 125, 125, 0.04)' }}
        >
            <div className="fp-visual-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="sim-phone-container">
                    <a 
                        className="sim-phone-mockup" 
                        href="https://www.instagram.com/reel/DYPaSyiKxhg/?igsh=MTZyaXQ4ajRpcW93Zg=="
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ 
                            width: '165px', 
                            height: '293px',
                            borderRadius: '28px',
                            border: '4px solid #1c1c24',
                            background: '#09090b',
                            boxShadow: '0 15px 45px rgba(196, 125, 125, 0.25), 0 10px 30px rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(255,255,255,0.1)',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {/* Status Bar */}
                        <div style={{
                            height: '18px',
                            padding: '0 12px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '0.52rem',
                            color: '#fff',
                            zIndex: 15,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
                            pointerEvents: 'none',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                        }}>
                            <span style={{ fontWeight: '700' }}>9:41</span>
                            {/* Dynamic Island / Notch */}
                            <div style={{ width: '38px', height: '9px', background: '#000', borderRadius: '5px', position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '3px' }}></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                <svg width="7" height="6" viewBox="0 0 10 8" fill="currentColor"><path d="M0 3h2v4H0zm3-2h2v6H3zm3-1h2v7H6z"/></svg>
                                <svg width="9" height="6" viewBox="0 0 14 8" fill="none" stroke="currentColor" strokeWidth="1"><rect x="1" y="1" width="10" height="6" rx="1.5" /><rect x="2" y="2" width="6" height="4" fill="currentColor" /><path d="M12 3v2" strokeLinecap="round" /></svg>
                            </div>
                        </div>

                        {/* Screen Image with overlay */}
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <img
                                src="/assets/images/instaviral.webp"
                                alt="Diesel Drama Instagram Reel"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                loading="lazy"
                            />

                            {/* Simulated Instagram overlay UI */}
                            <div className="sim-insta-ui" style={{
                                position: 'absolute',
                                bottom: '8px',
                                left: '8px',
                                right: '8px',
                                zIndex: 10,
                                pointerEvents: 'none',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end'
                            }}>
                                {/* Left description text */}
                                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '2px', maxWidth: '78%' }}>
                                    <span style={{ fontSize: '0.52rem', fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '3px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                                        @montra_escv
                                        <svg viewBox="0 0 24 24" width="7" height="7" fill="#3897f0" style={{ flexShrink: 0 }}><path d="M12.002 2.005c-5.522 0-10 4.477-10 10s4.478 10 10 10 10-4.477 10-10-4.478-10-10-10zm-1.25 13.75l-3.5-3.5 1.41-1.41 2.09 2.08 4.59-4.58 1.41 1.41-6 6z" /></svg>
                                    </span>
                                    <span style={{ fontSize: '0.45rem', color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.9)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>The "Diesel Drama" Reel</span>
                                    <span style={{ fontSize: '0.4rem', color: 'rgba(255,255,255,0.72)', textShadow: '0 1px 2px rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                                        <svg viewBox="0 0 24 24" width="6" height="6" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
                                        Original Audio
                                    </span>
                                </div>

                                {/* Right vertical action bar */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', color: '#fff' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5px' }}>
                                        <svg viewBox="0 0 24 24" width="9" height="9" fill="currentColor" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))' }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                        <span style={{ fontSize: '0.34rem', fontWeight: '800', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>36k</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5px' }}>
                                        <svg viewBox="0 0 24 24" width="9" height="9" fill="currentColor" style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))' }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                        <span style={{ fontSize: '0.34rem', fontWeight: '800', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>412</span>
                                    </div>
                                    {/* Mini spinning vinyl disc */}
                                    <div className="spinning-disc-icon" style={{
                                        width: '12px',
                                        height: '12px',
                                        borderRadius: '50%',
                                        border: '1px solid rgba(255,255,255,0.4)',
                                        boxShadow: '0 0 4px rgba(0,0,0,0.6)',
                                        marginTop: '2px'
                                    }}></div>
                                </div>
                            </div>

                            {/* Glow play indicator */}
                            <div className="fp-play-overlay" style={{ background: 'rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                                <div className="fp-play-button-ring" style={{ '--ring-accent': '#C47D7D', '--ring-glow': 'rgba(196, 125, 125, 0.6)', width: '38px', height: '38px', minWidth: '38px' }}>
                                    <span className="fp-play-icon" style={{ fontSize: '0.9rem', transform: 'translateY(-1px)' }}>🔗</span>
                                </div>
                                <span className="fp-play-label" style={{ '--label-accent': '#C47D7D', fontSize: '0.62rem', fontWeight: '800', letterSpacing: '1px' }}>VIEW REEL</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            {/* Right: Interactive specs, pipeline, tools, actions */}
            <div className="fp-content-container">
                <div className="fp-card-header">
                    <div className="fp-header-meta">
                        <h3 className="fp-project-title">The "Diesel Drama" Reel</h3>
                    </div>
                    <span className="fp-role-tag" style={{ '--role-accent': '#C47D7D' }}>Diesel Drama</span>
                </div>

                {!isMobile && (
                    <p className="fp-contribution-pitch">
                        I crafted this high-impact reel campaign to connect with audiences through organic, relatable storytelling. By pacing the visual hooks just right and designing dynamic narrative layouts, we sparked viral engagement that drew over 2.5 million views.
                    </p>
                )}

                <div className="fp-hud-metadata" style={{ '--hud-accent': '#C47D7D' }}>
                    <div className="fp-hud-item">
                        <span className="fp-hud-lbl">Views</span>
                        <span className="fp-hud-val">2.5M+ Views</span>
                    </div>
                    <div className="fp-hud-item">
                        <span className="fp-hud-lbl">Likes</span>
                        <span className="fp-hud-val">36k+ Likes</span>
                    </div>
                    <div className="fp-hud-item">
                        <span className="fp-hud-lbl">Format</span>
                        <span className="fp-hud-val">9:16 Vertical</span>
                    </div>
                </div>

                {/* Translation Spectrum Indicator */}
                <div className="fp-lang-spectrum" style={{ margin: '14px 0' }}>
                    <span className="fp-lang-title" style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Active Translation Matrix (7 Languages)</span>
                    <div className="fp-lang-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {['Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Marathi', 'Gujarati'].map((lang, idx) => (
                            <span key={idx} className="fp-lang-pill" style={{
                                fontSize: '0.58rem',
                                padding: '3px 7px',
                                borderRadius: '4px',
                                background: 'rgba(196, 125, 125, 0.05)',
                                border: '1px solid rgba(196, 125, 125, 0.2)',
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontWeight: '700',
                                letterSpacing: '0.5px',
                                transition: 'all 0.3s ease',
                                cursor: 'default'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(196, 125, 125, 0.2)';
                                e.target.style.borderColor = '#C47D7D';
                                e.target.style.color = '#fff';
                                e.target.style.boxShadow = '0 0 10px rgba(196, 125, 125, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(196, 125, 125, 0.05)';
                                e.target.style.borderColor = 'rgba(196, 125, 125, 0.2)';
                                e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                                e.target.style.boxShadow = 'none';
                            }}
                            >
                                {lang}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="fp-pipeline-tabs">
                    <button 
                        className={`fp-tab-btn ${dieselTab === 'strategy' ? 'active' : ''}`}
                        onClick={() => setDieselTab('strategy')}
                        style={{ '--tab-accent': '#C47D7D' }}
                    >
                        🎯 Strategy & Hook
                    </button>
                    <button 
                        className={`fp-tab-btn ${dieselTab === 'voice' ? 'active' : ''}`}
                        onClick={() => setDieselTab('voice')}
                        style={{ '--tab-accent': '#C47D7D' }}
                    >
                        🗣️ Localization & Voice
                    </button>
                    <button 
                        className={`fp-tab-btn ${dieselTab === 'metrics' ? 'active' : ''}`}
                        onClick={() => setDieselTab('metrics')}
                        style={{ '--tab-accent': '#C47D7D' }}
                    >
                        📈 Viral Reach & Metrics
                    </button>
                </div>

                <div className="fp-pipeline-content">
                    {dieselTab === 'strategy' && (
                        <div className="fp-deliverables-group animated-fade-in">
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#C47D7D' }}>▸</span>
                                <span>Engineered high-impact visual hooks in the first 3 seconds to capture user attention and reduce drop-off rates on Instagram.</span>
                            </div>
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#C47D7D' }}>▸</span>
                                <span>Structured a rapid-pacing narrative layout tailored specifically for short-form viral consumption.</span>
                            </div>
                        </div>
                    )}
                    {dieselTab === 'voice' && (
                        <div className="fp-deliverables-group animated-fade-in">
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#C47D7D' }}>▸</span>
                                <span>Engineered a multi-lingual translation matrix to deploy the campaign across 7 regional Indian languages.</span>
                            </div>
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#C47D7D' }}>▸</span>
                                <span>Synced localized voiceovers and background score to ensure a culturally relevant and high-energy feel.</span>
                            </div>
                        </div>
                    )}
                    {dieselTab === 'metrics' && (
                        <div className="fp-deliverables-group animated-fade-in">
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#C47D7D' }}>▸</span>
                                <span>Generated 2.5M+ views organically through optimized platform tagging, keyword targeting, and timing strategies.</span>
                            </div>
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#C47D7D' }}>▸</span>
                                <span>Achieved high user interaction with 36k+ likes, comments, and shares, building brand affinity.</span>
                            </div>
                        </div>
                    )}
                </div>



                <div className="fp-action-row">
                    <button 
                        className="fp-copy-details-btn" 
                        style={{ '--accent-color': '#C47D7D' }}
                        onClick={() => window.open('https://www.instagram.com/reel/DYPaSyiKxhg/?igsh=MTZyaXQ4ajRpcW93Zg==', '_blank')}
                    >
                        🔗 Open Reel ↗
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <section id="featured-projects" style={{ position: 'relative' }}>
            {/* Ambient Background Glow Maps that adapt to active console tab */}
            <div 
                className="fp-glow-orb active-orb" 
                style={{ 
                    top: '30%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)',
                    '--orb-glow': isMobile ? 'rgba(212, 165, 116, 0.05)' : (activeProject === 'montra' ? '#D4A574' : activeProject === 'lincoln' ? '#8B9DC3' : activeProject === 'diesel' ? '#C47D7D' : 'rgba(255,255,255,0.05)'),
                    opacity: isMobile ? 0.08 : (activeProject ? 0.12 : 0.05)
                }}
            ></div>

            <div className="container" style={{ position: 'relative', zIndex: 5 }}>
                <div className="section-header text-center">
                    <h2 className="section-heading reveal-text" style={{ marginBottom: '15px' }}>Commercial Projects</h2>
                    <p className="section-desc" style={{ maxWidth: '600px', margin: '0 auto 30px auto', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.4)', lineHeight: '1.45' }}>
                        Produced by AdMitra. All assets are IP of AdMitra and respective clients. Shared strictly for professional demonstration.
                    </p>
                </div>

                {isMobile ? (
                    /* Three Case Studies displayed stacked directly on mobile/tablet viewports */
                    <div className="fp-dashboard-list" style={{ display: 'flex', flexDirection: 'column', gap: '54px', margin: '0 auto', maxWidth: '980px' }}>
                        {renderMontraCard()}
                        {renderLincolnCard()}
                        {renderDieselCard()}
                    </div>
                ) : (
                    /* Interactive Console Viewport for Desktop viewports */
                    activeProject === null ? (
                        <div className="fp-launcher-deck animated-fade-in">
                            {/* Launcher Pod 1: Montra Electric */}
                            <div className={`fp-flip-card${flippedCard === 'montra' ? ' flipped' : ''}`}>
                                <div className="fp-flip-card-inner">
                                    {/* FRONT */}
                                    <div className="fp-flip-card-front fp-launcher-pod premium-pod" style={{ '--pod-theme': '#D4A574', '--pod-theme-glow': 'rgba(212, 165, 116, 0.15)' }}>
                                        <div className="fp-pod-thumbnail-bg" style={{ backgroundImage: 'url(/assets/images/eviatorlaunchphoto.webp)' }}></div>
                                        <div className="fp-pod-gradient-overlay"></div>
                                        <div className="fp-pod-content">
                                            <div className="fp-pod-body">
                                                <h3 className="fp-pod-title">Montra Electric Eviator</h3>
                                                <span className="fp-pod-role-pill" style={{ '--role-theme': '#D4A574' }}>Launch Video</span>
                                                <p className="fp-pod-desc">
                                                    Brought Montra Electric's new EV range to life with a high-energy reveal video for their keynote launch. I directed the AI visual generation and managed the final edits, upscaling every frame to look stunning on the stadium-sized screen.
                                                </p>
                                                <div className="fp-pod-stats-hud" style={{ '--hud-border': 'rgba(212, 165, 116, 0.15)' }}>
                                                    <div className="fp-pod-hud-col">
                                                        <span className="fp-pod-hud-lbl">Project Scope</span>
                                                        <span className="fp-pod-hud-val">Premium EV Reveal</span>
                                                    </div>
                                                    <div className="fp-pod-hud-col">
                                                        <span className="fp-pod-hud-lbl">Deliverable</span>
                                                        <span className="fp-pod-hud-val">Keynote Event Screen</span>
                                                    </div>
                                                    <div className="fp-pod-hud-col">
                                                        <span className="fp-pod-hud-lbl">Narration</span>
                                                        <span className="fp-pod-hud-val">7 Regional Languages</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="fp-pod-footer">
                                                <span className="fp-pod-action-btn" style={{ '--btn-theme': '#D4A574' }} onClick={(e) => { e.stopPropagation(); setFlippedCard('montra'); }}>
                                                    Inspect Case Study <span className="fp-pod-arrow">➔</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* BACK */}
                                    <div className="fp-flip-card-back" style={{ '--pod-theme': '#D4A574' }}>
                                        <div className="fp-pod-thumbnail-bg" style={{ backgroundImage: 'url(/assets/images/eviatorlaunchphoto.webp)' }}></div>
                                        <div className="fp-flip-back-overlay"></div>
                                        <div className="fp-flip-back-content">
                                            <h4 className="fp-flip-back-title">Montra Electric Eviator</h4>
                                            <div className="fp-flip-play-ring" onClick={() => window.open('https://drive.google.com/file/d/1VA9r9yJDKCBJL8w8rgXPP3wsYS2S_VYO/view?usp=sharing', '_blank')}>
                                                <span className="fp-flip-play-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '0.9em', height: '0.9em' }}>
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <span className="fp-flip-play-label">Watch in New Tab ↗</span>
                                            <span className="fp-flip-back-btn" onClick={(e) => { e.stopPropagation(); setFlippedCard(null); }}>✕ Back</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Launcher Pod 2: Lincoln Pharma */}
                            <div className={`fp-flip-card${flippedCard === 'lincoln' ? ' flipped' : ''}`}>
                                <div className="fp-flip-card-inner">
                                    {/* FRONT */}
                                    <div className="fp-flip-card-front fp-launcher-pod premium-pod" style={{ '--pod-theme': '#8B9DC3', '--pod-theme-glow': 'rgba(139, 157, 195, 0.15)' }}>
                                        <div className="fp-pod-thumbnail-bg" style={{ backgroundImage: 'url(/assets/images/lincolnpharmaphoto.webp)' }}></div>
                                        <div className="fp-pod-gradient-overlay"></div>
                                        <div className="fp-pod-content">
                                            <div className="fp-pod-body">
                                                <h3 className="fp-pod-title">Lincoln Pharma Pa12</h3>
                                                <span className="fp-pod-role-pill" style={{ '--role-theme': '#8B9DC3' }}>Presentation Drama</span>
                                                <p className="fp-pod-desc">
                                                    When Lincoln Pharma needed a 15-minute campaign video in just 48 hours, I stepped in to make it happen. I directed the AI avatars, staged the virtual scenes, and synced localized voiceovers to deliver a polished product launch drama right on time.
                                                </p>
                                                <div className="fp-pod-stats-hud" style={{ '--hud-border': 'rgba(139, 157, 195, 0.15)' }}>
                                                    <div className="fp-pod-hud-col">
                                                        <span className="fp-pod-hud-lbl">Project Scope</span>
                                                        <span className="fp-pod-hud-val">Pharma Campaign</span>
                                                    </div>
                                                    <div className="fp-pod-hud-col">
                                                        <span className="fp-pod-hud-lbl">Timeline</span>
                                                        <span className="fp-pod-hud-val">48-Hour Sprint</span>
                                                    </div>
                                                    <div className="fp-pod-hud-col">
                                                        <span className="fp-pod-hud-lbl">Deliverable</span>
                                                        <span className="fp-pod-hud-val">15-Min Launch Video</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="fp-pod-footer">
                                                <span className="fp-pod-action-btn" style={{ '--btn-theme': '#8B9DC3' }} onClick={(e) => { e.stopPropagation(); setFlippedCard('lincoln'); }}>
                                                    Inspect Case Study <span className="fp-pod-arrow">➔</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* BACK */}
                                    <div className="fp-flip-card-back" style={{ '--pod-theme': '#8B9DC3' }}>
                                        <div className="fp-pod-thumbnail-bg" style={{ backgroundImage: 'url(/assets/images/lincolnpharmaphoto.webp)' }}></div>
                                        <div className="fp-flip-back-overlay"></div>
                                        <div className="fp-flip-back-content">
                                            <h4 className="fp-flip-back-title">Lincoln Pharma Pa12</h4>
                                            <div className="fp-flip-play-ring" onClick={() => window.open('https://drive.google.com/file/d/1hdDxSZyTSEW6ctVFJLjQhcH185_DUWbl/view?usp=sharing', '_blank')}>
                                                <span className="fp-flip-play-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '0.9em', height: '0.9em' }}>
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <span className="fp-flip-play-label">Watch in New Tab ↗</span>
                                            <span className="fp-flip-back-btn" onClick={(e) => { e.stopPropagation(); setFlippedCard(null); }}>✕ Back</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Launcher Pod 3: Montra e-SCV */}
                            <div className={`fp-flip-card${flippedCard === 'diesel' ? ' flipped' : ''}`}>
                                <div className="fp-flip-card-inner">
                                    {/* FRONT */}
                                    <div className="fp-flip-card-front fp-launcher-pod premium-pod" style={{ '--pod-theme': '#C47D7D', '--pod-theme-glow': 'rgba(196, 125, 125, 0.15)' }}>
                                        <div className="fp-pod-thumbnail-bg" style={{ backgroundImage: 'url(/assets/images/instaviral.webp)' }}></div>
                                        <div className="fp-pod-gradient-overlay"></div>
                                        <div className="fp-pod-content">
                                            <div className="fp-pod-body">
                                                <h3 className="fp-pod-title">Montra e-SCV</h3>
                                                <span className="fp-pod-role-pill" style={{ '--role-theme': '#C47D7D' }}>Diesel Drama</span>
                                                <p className="fp-pod-desc">
                                                    I crafted this social campaign to connect with audiences through quick, relatable visual storytelling. By mixing high-impact hooks with a fast narrative pace, the reel went viral, drawing in over 2.5 million views completely organically.
                                                </p>
                                                <div className="fp-pod-stats-hud" style={{ '--hud-border': 'rgba(196, 125, 125, 0.15)' }}>
                                                    <div className="fp-pod-hud-col">
                                                        <span className="fp-pod-hud-lbl">Views</span>
                                                        <span className="fp-pod-hud-val">2.5M+ Views</span>
                                                    </div>
                                                    <div className="fp-pod-hud-col">
                                                        <span className="fp-pod-hud-lbl">Likes</span>
                                                        <span className="fp-pod-hud-val">36k+ Likes</span>
                                                    </div>
                                                    <div className="fp-pod-hud-col">
                                                        <span className="fp-pod-hud-lbl">Format</span>
                                                        <span className="fp-pod-hud-val">9:16 Vertical</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="fp-pod-footer">
                                                <span className="fp-pod-action-btn" style={{ '--btn-theme': '#C47D7D' }} onClick={(e) => { e.stopPropagation(); setFlippedCard('diesel'); }}>
                                                    Inspect Case Study <span className="fp-pod-arrow">➔</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* BACK */}
                                    <div className="fp-flip-card-back" style={{ '--pod-theme': '#C47D7D' }}>
                                        <div className="fp-pod-thumbnail-bg" style={{ backgroundImage: 'url(/assets/images/instaviral.webp)' }}></div>
                                        <div className="fp-flip-back-overlay"></div>
                                        <div className="fp-flip-back-content">
                                            <h4 className="fp-flip-back-title">Montra e-SCV</h4>
                                            <div className="fp-flip-play-ring" onClick={() => window.open('https://www.instagram.com/reel/DYPaSyiKxhg/?igsh=MTZyaXQ4ajRpcW93Zg==', '_blank')}>
                                                <span className="fp-flip-play-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '0.9em', height: '0.9em' }}>
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <span className="fp-flip-play-label">Watch on Instagram ↗</span>
                                            <span className="fp-flip-back-btn" onClick={(e) => { e.stopPropagation(); setFlippedCard(null); }}>✕ Back</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="fp-console-active animated-fade-in">
                            {/* Space-Age Console Navigation Bar */}
                            <div className="fp-console-nav" style={{ justifyContent: 'flex-end' }}>
                                {/* Return/Minimize Case Button */}
                                <button className="fp-close-case-btn" style={{ border: '1px solid #ff2222', boxShadow: '0 0 8px rgba(255, 34, 34, 0.2)' }} onClick={closeCaseStudies}>
                                    ✕ Close Case
                                </button>
                            </div>

                            {/* Console Viewport Card */}
                            <div className="fp-console-card-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '54px' }}>
                                {activeProject === 'montra' ? (
                                    <>
                                        {renderMontraCard()}
                                        {renderLincolnCard()}
                                        {renderDieselCard()}
                                    </>
                                ) : activeProject === 'lincoln' ? (
                                    <>
                                        {renderLincolnCard()}
                                        {renderMontraCard()}
                                        {renderDieselCard()}
                                    </>
                                ) : (
                                    <>
                                        {renderDieselCard()}
                                        {renderMontraCard()}
                                        {renderLincolnCard()}
                                    </>
                                )}

                                {/* Bottom Return Button */}
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                    <button 
                                        className="fp-close-case-btn" 
                                        style={{ border: '1px solid #ff2222', boxShadow: '0 0 8px rgba(255, 34, 34, 0.2)' }} 
                                        onClick={closeCaseStudies}
                                    >
                                        ✕ Close Case Studies
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>

            {/* Premium Full-screen Video Modal - Montra Eviator */}
            {montraModalOpen && (
                <div className="fp-video-modal" onClick={() => setMontraModalOpen(false)}>
                    <div className="fp-modal-backdrop"></div>
                    <div className="fp-modal-player-container" onClick={(e) => e.stopPropagation()} style={{ '--theme-glow': '#D4A574' }}>
                        {/* High-Tech Telemetry Header */}
                        <div className="fp-modal-telemetry-header">
                            <div className="fp-telemetry-header-left">
                                <span className="fp-telemetry-dot pulsing-cyan" style={{ background: '#D4A574', boxShadow: '0 0 8px #D4A574' }}></span>
                                <span className="fp-telemetry-title">Video Feed // Montra Electric Eviator</span>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <a 
                                    href="https://drive.google.com/file/d/1VA9r9yJDKCBJL8w8rgXPP3wsYS2S_VYO/view?usp=sharing" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="fp-telemetry-drive-link"
                                    style={{ color: '#D4A574', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}
                                >
                                    ▲ Open in Drive ↗
                                </a>
                                <button className="fp-telemetry-close-btn" onClick={() => setMontraModalOpen(false)}>
                                    ✕ Close
                                </button>
                            </div>
                        </div>
                        <div className="fp-modal-iframe-wrapper">
                            <iframe
                                src="https://drive.google.com/file/d/1VA9r9yJDKCBJL8w8rgXPP3wsYS2S_VYO/preview"
                                className="fp-modal-iframe"
                                allow="autoplay"
                                allowFullScreen
                                title="Montra Electric Eviator Launch Video Preview"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}

            {/* Premium Full-screen Video Modal - Lincoln Pharma */}
            {lincolnModalOpen && (
                <div className="fp-video-modal" onClick={() => setLincolnModalOpen(false)}>
                    <div className="fp-modal-backdrop"></div>
                    <div className="fp-modal-player-container" onClick={(e) => e.stopPropagation()} style={{ '--theme-glow': '#8B9DC3' }}>
                        {/* High-Tech Telemetry Header */}
                        <div className="fp-modal-telemetry-header">
                            <div className="fp-telemetry-header-left">
                                <span className="fp-telemetry-dot pulsing-green" style={{ background: '#8B9DC3', boxShadow: '0 0 8px #8B9DC3' }}></span>
                                <span className="fp-telemetry-title">Video Feed // Lincoln Pharma Pa12</span>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <a 
                                    href="https://drive.google.com/file/d/1hdDxSZyTSEW6ctVFJLjQhcH185_DUWbl/view?usp=sharing" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="fp-telemetry-drive-link"
                                    style={{ color: '#8B9DC3', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}
                                >
                                    ▲ Open in Drive ↗
                                </a>
                                <button className="fp-telemetry-close-btn" onClick={() => setLincolnModalOpen(false)}>
                                    ✕ Close
                                </button>
                            </div>
                        </div>
                        <div className="fp-modal-iframe-wrapper">
                            <iframe
                                src="https://drive.google.com/file/d/1hdDxSZyTSEW6ctVFJLjQhcH185_DUWbl/preview"
                                className="fp-modal-iframe"
                                allow="autoplay"
                                allowFullScreen
                                title="Lincoln Pharma Pa12 Launch Video Preview"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
