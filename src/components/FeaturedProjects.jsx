import React, { useState } from 'react';

export default function FeaturedProjects() {
    // Console tab state (null at start, 'montra', or 'lincoln')
    const [activeProject, setActiveProject] = useState(null);

    // Tab states within each project
    const [montraTab, setMontraTab] = useState('vis');
    const [lincolnTab, setLincolnTab] = useState('avatar');

    // Video modal states
    const [montraModalOpen, setMontraModalOpen] = useState(false);
    const [lincolnModalOpen, setLincolnModalOpen] = useState(false);
    const [reelModalOpen, setReelModalOpen] = useState(false);

    // Brand tools
    const montraTools = [
        { name: 'Kling V3 Pro', glow: '#00F0FF' },
        { name: 'Seedance 2.0', glow: '#00D2FF' },
        { name: 'ElevenLabs', glow: '#fbbf24' },
        { name: 'DaVinci Resolve', glow: '#05FF99' },
        { name: 'Topaz Video AI', glow: '#0084ff' }
    ];

    const lincolnTools = [
        { name: 'HeyGen', glow: '#05FF99' },
        { name: 'Kling', glow: '#05FF99' },
        { name: 'ElevenLabs', glow: '#fbbf24' }
    ];

    // Bullet points for clipboard copy
    const montraAllBullets = [
        "Produced the keynote launch video for Montra Electric's Eviator Range, managing the project from storyboard to big-screen delivery.",
        "Generated high-fidelity AI video assets using Kling and Seedance 2.0, ensuring a realistic and bold presentation of two new vehicle variants.",
        "Integrated realistic audio narration by creating and pacing AI-generated voiceovers using ElevenLabs.",
        "Executed professional post-production in DaVinci Resolve, handling color grading, pacing, and seamless visual flow.",
        "Upscaled and enhanced final video quality using Topaz Video AI to guarantee sharp, high-resolution output for large-venue event screens."
    ];

    const lincolnAllBullets = [
        "Generated AI avatar videos using HeyGen to create realistic, lip-synced characters tailored for specific regional target markets.",
        "Produced action sequences and b-roll using Kling to handle dynamic video movements and narrative pacing.",
        "Created AI voiceovers and narration using ElevenLabs, ensuring high-quality audio that perfectly synced with the visual avatars.",
        "Delivered a 15-minute long-form video under an aggressive 2-day deadline, successfully pivoting a live event into a digital launch."
    ];

    const montraFullText = `Project: Montra Electric Eviator Launch Video Production\nRole: AI Video Producer & Editor\nTools: Kling V3 Pro, Seedance 2.0, ElevenLabs, DaVinci Resolve, Topaz Video AI\n\nKey Contribution: Successfully delivered a premium product reveal video for a major EV brand's keynote event. Handled end-to-end production—from generating raw AI video and syncing voiceovers to editing, color grading, and upscaling assets for high-resolution large-screen projection.\n\nProduction Deliverables:\n${montraAllBullets.map(b => '• ' + b).join('\n')}`;

    const lincolnFullText = `Project: Lincoln Pharma Pa12 Launch Drama\nRole: AI Video & Audio Specialist\nTools: HeyGen, Kling, ElevenLabs\n\nKey Contribution: Co-created a 15-minute product launch video for an international pharmaceutical campaign under a tight 2-day deadline. Responsible for generating realistic lip-synced avatars (HeyGen), directing video action sequences (Kling), and syncing multi-character voiceovers (ElevenLabs).\n\nProduction Deliverables:\n${lincolnAllBullets.map(b => '• ' + b).join('\n')}`;

    return (
        <section id="featured-projects" style={{ position: 'relative' }}>
            {/* Ambient Background Glow Maps that adapt to active console tab */}
            <div 
                className="fp-glow-orb active-orb" 
                style={{ 
                    top: '30%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)',
                    '--orb-glow': activeProject === 'montra' ? '#00F0FF' : activeProject === 'lincoln' ? '#05FF99' : 'rgba(255,255,255,0.05)',
                    opacity: activeProject ? 0.12 : 0.05
                }}
            ></div>

            <div className="container" style={{ position: 'relative', zIndex: 5 }}>
                <div className="section-header text-center">
                    <span className="section-subtitle" style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.4)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>[ SELECTED COMMERCIAL CASES ]</span>
                    <h2 className="section-heading reveal-text" style={{ marginBottom: '15px' }}>Featured Projects</h2>
                    <p className="section-desc" style={{ maxWidth: '600px', margin: '0 auto 45px auto', fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.5)', lineHeight: '1.5' }}>
                        Produced by AdMitra for their clients. All visual assets, trademarks, and final video content are the intellectual property of AdMitra and other clients. Shared in this portfolio strictly as a demonstration of my professional role as a Gen AI Creative.
                    </p>
                </div>

                {/* 1. START STATE: Collapsed Dual Launcher Deck */}
                {activeProject === null ? (
                    <div className="fp-launcher-deck animated-fade-in">
                        {/* Launcher Pod 1: Montra Electric (Cyan Theme) */}
                        <div 
                            className="fp-launcher-pod premium-pod"
                            style={{ 
                                '--pod-theme': '#00F0FF', 
                                '--pod-theme-glow': 'rgba(0, 240, 255, 0.15)'
                            }}
                            onClick={() => setActiveProject('montra')}
                        >
                            {/* Visual Thumbnail Background & Overlay */}
                            <div 
                                className="fp-pod-thumbnail-bg" 
                                style={{ backgroundImage: 'url(/assets/images/eviatorlaunchphoto.png)' }}
                            ></div>
                            <div className="fp-pod-gradient-overlay"></div>

                            {/* Card Content Wrapper */}
                            <div className="fp-pod-content">
                                <div className="fp-pod-header">
                                    <div className="fp-pod-header-left">
                                        <span className="fp-pod-num">01</span>
                                        <span className="fp-pod-category-badge" style={{ '--badge-theme': '#00F0FF' }}>[ COMMERCIAL CAMPAIGN ]</span>
                                    </div>
                                    <div className="fp-pod-status">
                                        <span className="fp-pod-dot pulsing-cyan" style={{ background: '#00F0FF', boxShadow: '0 0 10px #00F0FF' }}></span>
                                        SYSTEM READY
                                    </div>
                                </div>

                                <div className="fp-pod-body">
                                    <h3 className="fp-pod-title">Montra Electric Eviator</h3>
                                    <span className="fp-pod-role-pill" style={{ '--role-theme': '#00F0FF' }}>AI Video Producer & Editor</span>
                                    <p className="fp-pod-desc">
                                        Produced the keynote launch reveal video. Managed end-to-end production—from generating raw Kling V3 AI footage to big-screen event projection.
                                    </p>

                                    {/* Stats HUD Panel */}
                                    <div className="fp-pod-stats-hud" style={{ '--hud-border': 'rgba(0, 240, 255, 0.15)' }}>
                                        <div className="fp-pod-hud-col">
                                            <span className="fp-pod-hud-lbl">BRAND SCOPE</span>
                                            <span className="fp-pod-hud-val">Premium EV Reveal</span>
                                        </div>
                                        <div className="fp-pod-hud-col">
                                            <span className="fp-pod-hud-lbl">DELIVERABLE</span>
                                            <span className="fp-pod-hud-val">Keynote Projection</span>
                                        </div>
                                        <div className="fp-pod-hud-col">
                                            <span className="fp-pod-hud-lbl">NARRATION</span>
                                            <span className="fp-pod-hud-val">Multilanguage</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="fp-pod-footer">
                                    <div className="fp-pod-mini-tools">
                                        <span className="fp-pod-tool-capsule">Kling V3</span>
                                        <span className="fp-pod-tool-capsule">Seedance 2.0</span>
                                        <span className="fp-pod-tool-capsule">DaVinci Resolve</span>
                                        <span className="fp-pod-tool-capsule">+2 More</span>
                                    </div>
                                    <span className="fp-pod-action-btn" style={{ '--btn-theme': '#00F0FF' }}>
                                        INSPECT CASE STUDY <span className="fp-pod-arrow">➔</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Launcher Pod 2: Lincoln Pharma (Light Green Theme) */}
                        <div 
                            className="fp-launcher-pod premium-pod"
                            style={{ 
                                '--pod-theme': '#05FF99', 
                                '--pod-theme-glow': 'rgba(5, 255, 153, 0.15)'
                            }}
                            onClick={() => setActiveProject('lincoln')}
                        >
                            {/* Visual Thumbnail Background & Overlay */}
                            <div 
                                className="fp-pod-thumbnail-bg" 
                                style={{ backgroundImage: 'url(/assets/images/lincolnpharmaphoto.png)' }}
                            ></div>
                            <div className="fp-pod-gradient-overlay"></div>

                            {/* Card Content Wrapper */}
                            <div className="fp-pod-content">
                                <div className="fp-pod-header">
                                    <div className="fp-pod-header-left">
                                        <span className="fp-pod-num">02</span>
                                        <span className="fp-pod-category-badge" style={{ '--badge-theme': '#05FF99' }}>[ AGILE SPRINT CAMPAIGN ]</span>
                                    </div>
                                    <div className="fp-pod-status">
                                        <span className="fp-pod-dot pulsing-green" style={{ background: '#05FF99', boxShadow: '0 0 10px #05FF99' }}></span>
                                        SYSTEM READY
                                    </div>
                                </div>

                                <div className="fp-pod-body">
                                    <h3 className="fp-pod-title">Lincoln Pharma Pa12</h3>
                                    <span className="fp-pod-role-pill" style={{ '--role-theme': '#05FF99' }}>AI Video & Audio Specialist</span>
                                    <p className="fp-pod-desc">
                                        Co-created a 15-minute product launch presentation drama under an aggressive 48-hour deadline. Managed voice narrations and dynamic b-rolls.
                                    </p>

                                    {/* Stats HUD Panel */}
                                    <div className="fp-pod-stats-hud" style={{ '--hud-border': 'rgba(5, 255, 153, 0.15)' }}>
                                        <div className="fp-pod-hud-col">
                                            <span className="fp-pod-hud-lbl">BRAND SCOPE</span>
                                            <span className="fp-pod-hud-val">Pharma Launch</span>
                                        </div>
                                        <div className="fp-pod-hud-col">
                                            <span className="fp-pod-hud-lbl">DEADLINE</span>
                                            <span className="fp-pod-hud-val">48-Hour Sprint</span>
                                        </div>
                                        <div className="fp-pod-hud-col">
                                            <span className="fp-pod-hud-lbl">DELIVERABLE</span>
                                            <span className="fp-pod-hud-val">15-Min Longform</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="fp-pod-footer">
                                    <div className="fp-pod-mini-tools">
                                        <span className="fp-pod-tool-capsule">HeyGen Avatars</span>
                                        <span className="fp-pod-tool-capsule">Kling AI</span>
                                        <span className="fp-pod-tool-capsule">ElevenLabs</span>
                                    </div>
                                    <span className="fp-pod-action-btn" style={{ '--btn-theme': '#05FF99' }}>
                                        INSPECT CASE STUDY <span className="fp-pod-arrow">➔</span>
                                     </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* 2. OPEN STATE: Interactive Telemetry Console Viewport */
                    <div className="fp-console-active animated-fade-in">
                        {/* Space-Age Console Navigation & Selector Bar */}
                        <div className="fp-console-nav">
                            <div className="fp-console-selectors">
                                <button 
                                    className={`fp-console-nav-item ${activeProject === 'montra' ? 'active' : ''}`}
                                    onClick={() => setActiveProject('montra')}
                                    style={{ '--nav-theme': '#00F0FF' }}
                                >
                                    <span className="fp-nav-num">01</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px rgba(0, 240, 255, 0.6))' }}>
                                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#00F0FF"/>
                                        </svg>
                                        <span className="fp-nav-name">Montra Electric</span>
                                    </span>
                                    <span className="fp-nav-dot" style={{ background: '#00F0FF', boxShadow: '0 0 8px #00F0FF' }}></span>
                                </button>
                                <button 
                                    className={`fp-console-nav-item ${activeProject === 'lincoln' ? 'active' : ''}`}
                                    onClick={() => setActiveProject('lincoln')}
                                    style={{ '--nav-theme': '#05FF99' }}
                                >
                                    <span className="fp-nav-num">02</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="#05FF99" style={{ filter: 'drop-shadow(0 0 4px rgba(5, 255, 153, 0.6))' }}>
                                            <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
                                        </svg>
                                        <span className="fp-nav-name">Lincoln Pharma</span>
                                    </span>
                                    <span className="fp-nav-dot" style={{ background: '#05FF99', boxShadow: '0 0 8px #05FF99' }}></span>
                                </button>
                            </div>

                            {/* Return/Minimize Case Button */}
                            <button className="fp-close-case-btn" onClick={() => setActiveProject(null)}>
                                ✕ CLOSE CASE
                            </button>
                        </div>

                        {/* Console Viewport Card */}
                        <div className="fp-console-card-wrapper">
                            {activeProject === 'montra' ? (
                                <>
                                    <div 
                                        className="fp-dashboard-card compact-card animated-fade-in" 
                                        style={{ '--card-accent': '#00F0FF', '--card-glow-opacity': 'rgba(0, 240, 255, 0.04)' }}
                                    >
                                        <div className="fp-visual-container">
                                            {/* Widescreen Keynote Video Card */}
                                            <div 
                                                className="cinema-card play-trigger-card" 
                                                data-glow="#00F0FF" 
                                                style={{ width: '100%', cursor: 'pointer' }}
                                                onClick={() => setMontraModalOpen(true)}
                                            >
                                                <div className="cinema-video-wrapper">
                                                    <img
                                                        className="cinema-video"
                                                        src="/assets/images/eviatorlaunchphoto.png"
                                                        alt="Montra Electric Eviator Launch Video Production"
                                                        style={{ objectPosition: 'center' }}
                                                        loading="lazy"
                                                    />
                                                    
                                                    <div className="fp-play-overlay">
                                                        <div className="fp-play-button-ring" style={{ '--ring-accent': '#00F0FF', '--ring-glow': 'rgba(0, 240, 255, 0.4)' }}>
                                                            <span className="fp-play-icon">▶</span>
                                                        </div>
                                                        <span className="fp-play-label" style={{ '--label-accent': '#00F0FF' }}>PLAY CASE VIDEO</span>
                                                    </div>

                                                    <div className="cinema-overlay">
                                                        <span className="cinema-badge" style={{ borderColor: 'rgba(0, 240, 255, 0.25)' }}>
                                                            <span className="badge-dot" style={{ background: '#00F0FF', boxShadow: '0 0 8px #00F0FF' }}></span>
                                                            KEYNOTE CAMPAIGN
                                                        </span>
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
                                            <span className="fp-role-tag" style={{ '--role-accent': '#00F0FF' }}>AI Video Producer & Editor</span>
                                        </div>

                                        <p className="fp-contribution-pitch">
                                            Successfully delivered a premium product reveal video for a major EV brand's keynote event. Managed end-to-end production—from storyboarding to upscaling final assets for large-venue screens.
                                        </p>

                                        <div className="fp-hud-metadata" style={{ '--hud-accent': '#00F0FF' }}>
                                            <div className="fp-hud-item">
                                                <span className="fp-hud-lbl">DURATION</span>
                                                <span className="fp-hud-val">Keynote Reveal</span>
                                            </div>
                                            <div className="fp-hud-item">
                                                <span className="fp-hud-lbl">ASPECT</span>
                                                <span className="fp-hud-val">16:9 Cinema</span>
                                            </div>
                                            <div className="fp-hud-item">
                                                <span className="fp-hud-lbl">NARRATION</span>
                                                <span className="fp-hud-val">Multilanguage</span>
                                            </div>
                                        </div>

                                        <div className="fp-pipeline-tabs">
                                            <button 
                                                className={`fp-tab-btn ${montraTab === 'vis' ? 'active' : ''}`}
                                                onClick={() => setMontraTab('vis')}
                                                style={{ '--tab-accent': '#00F0FF' }}
                                            >
                                                📽️ Narrative & Video
                                            </button>
                                            <button 
                                                className={`fp-tab-btn ${montraTab === 'post' ? 'active' : ''}`}
                                                onClick={() => setMontraTab('post')}
                                                style={{ '--tab-accent': '#00F0FF' }}
                                            >
                                                🎧 Audio & Post
                                            </button>
                                            <button 
                                                className={`fp-tab-btn ${montraTab === 'metrics' ? 'active' : ''}`}
                                                onClick={() => setMontraTab('metrics')}
                                                style={{ '--tab-accent': '#00F0FF' }}
                                            >
                                                🚀 Final Output
                                            </button>
                                        </div>

                                        <div className="fp-pipeline-content">
                                            {montraTab === 'vis' && (
                                                <div className="fp-deliverables-group animated-fade-in">
                                                    <div className="fp-bullet-item">
                                                        <span className="fp-bullet-icon" style={{ '--fp-accent': '#00F0FF' }}>▸</span>
                                                        <span>Produced the keynote launch video for Montra Electric's Eviator Range, managing storyboard to delivery.</span>
                                                    </div>
                                                    <div className="fp-bullet-item">
                                                        <span className="fp-bullet-icon" style={{ '--fp-accent': '#00F0FF' }}>▸</span>
                                                        <span>Generated high-fidelity AI video assets using Kling and Seedance 2.0 for vehicle variant visuals.</span>
                                                    </div>
                                                    <div className="fp-bullet-item">
                                                        <span className="fp-bullet-icon" style={{ '--fp-accent': '#00F0FF' }}>▸</span>
                                                        <span>Dubbed the keynote presentation and directed narrations in 7 other regional Indian languages.</span>
                                                    </div>
                                                </div>
                                            )}
                                            {montraTab === 'post' && (
                                                <div className="fp-deliverables-group animated-fade-in">
                                                    <div className="fp-bullet-item">
                                                        <span className="fp-bullet-icon" style={{ '--fp-accent': '#00F0FF' }}>▸</span>
                                                        <span>Orchestrated realistic audio narration with clean, pacing AI voiceovers using ElevenLabs.</span>
                                                    </div>
                                                    <div className="fp-bullet-item">
                                                        <span className="fp-bullet-icon" style={{ '--fp-accent': '#00F0FF' }}>▸</span>
                                                        <span>Executed professional color grading, audio layout, and pacing cuts in DaVinci Resolve.</span>
                                                    </div>
                                                </div>
                                            )}
                                            {montraTab === 'metrics' && (
                                                <div className="fp-deliverables-group animated-fade-in">
                                                    <div className="fp-bullet-item">
                                                        <span className="fp-bullet-icon" style={{ '--fp-accent': '#00F0FF' }}>▸</span>
                                                        <span>Upscaled final video assets to guarantee sharp, high-resolution outputs using Topaz Video AI.</span>
                                                    </div>
                                                    <div className="fp-bullet-item">
                                                        <span className="fp-bullet-icon" style={{ '--fp-accent': '#00F0FF' }}>▸</span>
                                                        <span>Successfully delivered high-end video assets for elite corporate keynote display.</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="fp-tech-row">
                                            <span className="fp-tech-label">TOOLS UTILIZED:</span>
                                            <div className="fp-tools-grid">
                                                {montraTools.map((tool, i) => (
                                                    <span key={i} className="fp-tool-capsule-v2" style={{ '--tool-glow': tool.glow }}>
                                                        {tool.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="fp-action-row">
                                            <button 
                                                className="fp-copy-details-btn" 
                                                style={{ '--accent-color': '#00F0FF' }}
                                                onClick={() => window.open('https://drive.google.com/file/d/1VA9r9yJDKCBJL8w8rgXPP3wsYS2S_VYO/view?usp=sharing', '_blank')}
                                            >
                                                🔗 More Info
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                            ) : (
                                <div 
                                    className="fp-dashboard-card compact-card reverse animated-fade-in" 
                                    style={{ '--card-accent': '#05FF99', '--card-glow-opacity': 'rgba(5, 255, 153, 0.04)' }}
                                >
                                    {/* Left: Interactive specs, pipeline, tools, actions */}
                                    <div className="fp-content-container">
                                        <div className="fp-card-header">
                                            <div className="fp-header-meta">
                                                <h3 className="fp-project-title">Lincoln Pharma Pa12 Launch</h3>
                                            </div>
                                            <span className="fp-role-tag" style={{ '--role-accent': '#05FF99' }}>AI Video & Audio Specialist</span>
                                        </div>

                                        <p className="fp-contribution-pitch">
                                            Co-created a 15-minute product launch video for an international campaign under an aggressive 2-day deadline. Managed narrative pacing, avatar directorship, and multi-voice alignment.
                                        </p>

                                        <div className="fp-hud-metadata" style={{ '--hud-accent': '#05FF99' }}>
                                            <div className="fp-hud-item">
                                                <span className="fp-hud-lbl">DURATION</span>
                                                <span className="fp-hud-val">15-Min Longform</span>
                                            </div>
                                            <div className="fp-hud-item">
                                                <span className="fp-hud-lbl">DEADLINE</span>
                                                <span className="fp-hud-val">48-Hour Sprint</span>
                                            </div>
                                            <div className="fp-hud-item">
                                                <span className="fp-hud-lbl">SENSORY</span>
                                                <span className="fp-hud-val">Multi-Voice</span>
                                            </div>
                                        </div>

                                        <div className="fp-pipeline-tabs">
                                            <button 
                                                className={`fp-tab-btn ${lincolnTab === 'avatar' ? 'active' : ''}`}
                                                onClick={() => setLincolnTab('avatar')}
                                                style={{ '--tab-accent': '#05FF99' }}
                                            >
                                                📽️ Avatar & Directing
                                            </button>
                                            <button 
                                                className={`fp-tab-btn ${lincolnTab === 'voice' ? 'active' : ''}`}
                                                onClick={() => setLincolnTab('voice')}
                                                style={{ '--tab-accent': '#05FF99' }}
                                            >
                                                🎧 Voice & Pacing
                                            </button>
                                            <button 
                                                className={`fp-tab-btn ${lincolnTab === 'metrics' ? 'active' : ''}`}
                                                onClick={() => setLincolnTab('metrics')}
                                                style={{ '--tab-accent': '#05FF99' }}
                                            >
                                                🚀 Campaign Output
                                            </button>
                                        </div>

                                        <div className="fp-pipeline-content">
                                            {lincolnTab === 'avatar' && (
                                                <div className="fp-deliverables-group animated-fade-in">
                                                    <div className="fp-bullet-item">
                                                        <span className="fp-bullet-icon" style={{ '--fp-accent': '#05FF99' }}>▸</span>
                                                        <span>Generated AI avatar videos using HeyGen to create lip-synced characters for target regional markets.</span>
                                                    </div>
                                                    <div className="fp-bullet-item">
                                                        <span className="fp-bullet-icon" style={{ '--fp-accent': '#05FF99' }}>▸</span>
                                                        <span>Produced custom b-roll layouts and video action movements in Kling to match scripting.</span>
                                                    </div>
                                                </div>
                                            )}
                                            {lincolnTab === 'voice' && (
                                                <div className="fp-deliverables-group animated-fade-in">
                                                    <div className="fp-bullet-item">
                                                        <span className="fp-bullet-icon" style={{ '--fp-accent': '#05FF99' }}>▸</span>
                                                        <span>Orchestrated high-fidelity multi-voice dialogue and storytelling narration inside ElevenLabs.</span>
                                                    </div>
                                                    <div className="fp-bullet-item">
                                                        <span className="fp-bullet-icon" style={{ '--fp-accent': '#05FF99' }}>▸</span>
                                                        <span>Aligned dialogue spacing, pacing, and post-production timeline layout perfectly.</span>
                                                    </div>
                                                </div>
                                            )}
                                            {lincolnTab === 'metrics' && (
                                                <div className="fp-deliverables-group animated-fade-in">
                                                    <div className="fp-bullet-item">
                                                        <span className="fp-bullet-icon" style={{ '--fp-accent': '#05FF99' }}>▸</span>
                                                        <span>Delivered complete 15-minute presentation in under 48 hours to successfully pivot campaign.</span>
                                                    </div>
                                                    <div className="fp-bullet-item">
                                                        <span className="fp-bullet-icon" style={{ '--fp-accent': '#05FF99' }}>▸</span>
                                                        <span>International pharmaceutical campaign launched successfully with high technical clarity.</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="fp-tech-row">
                                            <span className="fp-tech-label">TOOLS UTILIZED:</span>
                                            <div className="fp-tools-grid">
                                                {lincolnTools.map((tool, i) => (
                                                    <span key={i} className="fp-tool-capsule-v2" style={{ '--tool-glow': tool.glow }}>
                                                        {tool.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="fp-action-row">
                                            <button 
                                                className="fp-copy-details-btn" 
                                                style={{ '--accent-color': '#05FF99' }}
                                                onClick={() => window.open('https://drive.google.com/file/d/1hdDxSZyTSEW6ctVFJLjQhcH185_DUWbl/view?usp=sharing', '_blank')}
                                            >
                                                🔗 More Info
                                            </button>
                                        </div>
                                    </div>

                                    {/* Right: Widescreen mockup visual with play trigger */}
                                    <div className="fp-visual-container">
                                        <div 
                                            className="cinema-card play-trigger-card" 
                                            data-glow="#05FF99" 
                                            style={{ width: '100%', cursor: 'pointer' }}
                                            onClick={() => setLincolnModalOpen(true)}
                                        >
                                            <div className="cinema-video-wrapper">
                                                <img
                                                    className="cinema-video"
                                                    src="/assets/images/lincolnpharmaphoto.png"
                                                    alt="Lincoln Pharma Pa12 Launch Drama"
                                                    style={{ objectPosition: 'center' }}
                                                    loading="lazy"
                                                />
                                                
                                                <div className="fp-play-overlay">
                                                    <div className="fp-play-button-ring" style={{ '--ring-accent': '#05FF99', '--ring-glow': 'rgba(5, 255, 153, 0.4)' }}>
                                                        <span className="fp-play-icon">▶</span>
                                                    </div>
                                                    <span className="fp-play-label" style={{ '--label-accent': '#05FF99' }}>PLAY CASE VIDEO</span>
                                                </div>

                                                <div className="cinema-overlay">
                                                    <span className="cinema-badge" style={{ borderColor: 'rgba(5, 255, 153, 0.25)' }}>
                                                        <span className="badge-dot" style={{ background: '#05FF99', boxShadow: '0 0 8px #05FF99' }}></span>
                                                        GLOBAL DIGITAL LAUNCH
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* 3. SPECULATIVE INSTAGRAM VIRAL CAMPAIGN SECTION (Renders below projects at all times) */}
                <div 
                    className="fp-speculative-reel-section" 
                    style={{ 
                        marginTop: '80px',
                        position: 'relative',
                        zIndex: 10
                    }}
                >
                    {/* section header for this standalone block */}
                    <div className="section-header text-center" style={{ marginBottom: '40px' }}>
                        <span className="section-subtitle" style={{ display: 'block', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.4)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>[ SPECULATIVE CAMPAIGN ]</span>
                        <h2 className="section-heading reveal-text" style={{ fontSize: '2.0rem', marginBottom: '15px', color: '#ff007f', textShadow: '0 0 15px rgba(255, 0, 127, 0.15)' }}>Instagram Viral Reels</h2>
                    </div>

                    <div className="fp-launcher-pod-group" style={{ margin: '0 auto', maxWidth: '900px' }}>
                        <div 
                            className="fp-launcher-pod premium-pod full-width-pod"
                            style={{ 
                                '--pod-theme': '#ff007f', 
                                '--pod-theme-glow': 'rgba(255, 0, 127, 0.15)',
                                borderBottomLeftRadius: '0px',
                                borderBottomRightRadius: '0px',
                                cursor: 'pointer'
                            }}
                            onClick={() => setReelModalOpen(true)}
                        >
                            {/* Visual Thumbnail Background & Overlay */}
                            <div 
                                className="fp-pod-thumbnail-bg" 
                                style={{ 
                                    backgroundImage: 'url(/assets/images/instaviral.png)',
                                    opacity: 0.15,
                                    transform: 'scale(1.05)',
                                    backgroundPosition: 'center 30%'
                                }}
                            ></div>
                            <div className="fp-pod-gradient-overlay" style={{ background: 'linear-gradient(to right, rgba(10,10,12,0.95) 40%, rgba(10,10,12,0.4) 100%)' }}></div>

                            {/* Left Column: Pod Content */}
                            <div className="fp-pod-content" style={{ zIndex: 5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', gap: '12px' }}>
                                <div className="fp-pod-header" style={{ marginBottom: '4px' }}>
                                    <div className="fp-pod-header-left">
                                        <span className="fp-pod-num" style={{ color: '#ff007f' }}>03</span>
                                        <span className="fp-pod-category-badge" style={{ '--badge-theme': '#ff007f' }}>[ INSTAGRAM VIRAL CAMPAIGN ]</span>
                                    </div>
                                </div>

                                <div className="fp-pod-body" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <h3 className="fp-pod-title" style={{ fontSize: '1.6rem', fontWeight: '900', letterSpacing: '-0.5px', margin: '0' }}>The "Diesel Drama" Viral Reel</h3>
                                    <span className="fp-pod-role-pill" style={{ '--role-theme': '#ff007f', display: 'inline-block', alignSelf: 'flex-start' }}>AI Video Specialist & Storyteller</span>
                                    <p className="fp-pod-desc" style={{ fontSize: '0.86rem', lineHeight: '1.45', opacity: 0.8, margin: '6px 0 12px 0' }}>
                                        Single-handedly translated, dubbed, and edited the keynote launch reveal in 7 regional Indian languages. Tailored distinct visual cut sequences for North and South Indian campaigns based on regional preferences, posted on the official @montraelectricscv page.
                                    </p>

                                    {/* Stats HUD Panel */}
                                    <div className="fp-pod-stats-hud" style={{ '--hud-border': 'rgba(255, 0, 127, 0.15)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                                        <div className="fp-pod-hud-col">
                                            <span className="fp-pod-hud-lbl">VIRAL METRIC</span>
                                            <span className="fp-pod-hud-val" style={{ color: '#00FF80', fontWeight: '900' }}>1.2M+ Views</span>
                                        </div>
                                        <div className="fp-pod-hud-col">
                                            <span className="fp-pod-hud-lbl">ENGAGEMENT</span>
                                            <span className="fp-pod-hud-val" style={{ color: '#00FF80' }}>33k+ Likes</span>
                                        </div>
                                        <div className="fp-pod-hud-col">
                                            <span className="fp-pod-hud-lbl">RATIO FORMAT</span>
                                            <span className="fp-pod-hud-val">9:16 Vertical</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Standalone 9:16 Preview Card */}
                            <div style={{ zIndex: 5, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <a 
                                    className="cinema-card play-trigger-card" 
                                    data-glow="#ff007f" 
                                    href="https://www.instagram.com/reel/DYPaSyiKxhg/?igsh=MTZyaXQ4ajRpcW93Zg=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ 
                                        width: '150px', 
                                        aspectRatio: '9/16',
                                        borderRadius: '16px',
                                        border: '2px solid rgba(255, 0, 127, 0.35)',
                                        boxShadow: '0 12px 36px rgba(255, 0, 127, 0.2), 0 8px 24px rgba(0, 0, 0, 0.6)',
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                                        position: 'relative',
                                        display: 'block'
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.05) translateY(-4px)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 0, 127, 0.7)';
                                        e.currentTarget.style.boxShadow = '0 16px 40px rgba(255, 0, 127, 0.35), 0 12px 30px rgba(0, 0, 0, 0.8)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'none';
                                        e.currentTarget.style.borderColor = 'rgba(255, 0, 127, 0.35)';
                                        e.currentTarget.style.boxShadow = '0 12px 36px rgba(255, 0, 127, 0.2), 0 8px 24px rgba(0, 0, 0, 0.6)';
                                    }}
                                >
                                    <div className="cinema-video-wrapper" style={{ width: '100%', height: '100%', position: 'relative', paddingTop: 0 }}>
                                        <img
                                            src="/assets/images/instaviral.png"
                                            alt="Diesel Drama Instagram Reel"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            loading="lazy"
                                        />
                                        <div className="fp-play-overlay" style={{ background: 'rgba(0,0,0,0.45)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                                            <div className="fp-play-button-ring" style={{ '--ring-accent': '#ff007f', '--ring-glow': 'rgba(255, 0, 127, 0.5)', width: '36px', height: '36px', minWidth: '36px' }}>
                                                <span className="fp-play-icon" style={{ fontSize: '0.8rem', transform: 'translateY(-1px)' }}>🔗</span>
                                            </div>
                                            <span className="fp-play-label" style={{ '--label-accent': '#ff007f', fontSize: '0.6rem', letterSpacing: '0.5px' }}>VIEW REEL</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Multilanguage separate banner image attached below as extension */}
                        <div 
                            className="multilanguage-banner-card"
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open("https://www.instagram.com/reel/DYPaSyiKxhg/?igsh=MTZyaXQ4ajRpcW93Zg==", "_blank");
                            }}
                        >
                            <div style={{ position: 'relative', width: '100%' }}>
                                <img
                                    src="/assets/images/multilanguage.png"
                                    alt="Multilanguage Regional Showcase"
                                    style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                                    loading="lazy"
                                />
                                <div 
                                    className="multilanguage-overlay" 
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(to top, rgba(10,10,12,0.6) 0%, rgba(10,10,12,0) 60%)',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        justifyContent: 'center',
                                        padding: '12px',
                                        pointerEvents: 'none'
                                    }}
                                >
                                    <span style={{ color: '#ff007f', fontSize: '0.72rem', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                                        🔗 VIEW INSTAGRAM REEL SHOWCASE
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Full-screen Video Modal - Montra Eviator */}
            {montraModalOpen && (
                <div className="fp-video-modal" onClick={() => setMontraModalOpen(false)}>
                    <div className="fp-modal-backdrop"></div>
                    <div className="fp-modal-player-container" onClick={(e) => e.stopPropagation()} style={{ '--theme-glow': '#00F0FF' }}>
                        {/* High-Tech Telemetry Header */}
                        <div className="fp-modal-telemetry-header">
                            <div className="fp-telemetry-header-left">
                                <span className="fp-telemetry-dot pulsing-cyan" style={{ background: '#00F0FF', boxShadow: '0 0 8px #00F0FF' }}></span>
                                <span className="fp-telemetry-title">[ CONSOLE FEED ] // MONTRA EVIATOR REVEAL</span>
                            </div>
                            <button className="fp-telemetry-close-btn" onClick={() => setMontraModalOpen(false)}>
                                ✕ DISCONNECT
                            </button>
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
                    <div className="fp-modal-player-container" onClick={(e) => e.stopPropagation()} style={{ '--theme-glow': '#05FF99' }}>
                        {/* High-Tech Telemetry Header */}
                        <div className="fp-modal-telemetry-header">
                            <div className="fp-telemetry-header-left">
                                <span className="fp-telemetry-dot pulsing-green" style={{ background: '#05FF99', boxShadow: '0 0 8px #05FF99' }}></span>
                                <span className="fp-telemetry-title">[ CONSOLE FEED ] // LINCOLN PHARMA LAUNCH</span>
                            </div>
                            <button className="fp-telemetry-close-btn" onClick={() => setLincolnModalOpen(false)}>
                                ✕ DISCONNECT
                            </button>
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

            {/* Premium Full-screen Video Modal - Instagram Reel (Diesel Drama) */}
            {reelModalOpen && (
                <div className="fp-video-modal" onClick={() => setReelModalOpen(false)}>
                    <div className="fp-modal-backdrop"></div>
                    <div 
                        className="fp-modal-player-container" 
                        onClick={(e) => e.stopPropagation()} 
                        style={{ 
                            '--theme-glow': '#ff007f', 
                            maxWidth: '320px',
                            height: '75vh',
                            borderRadius: '32px',
                            border: '4px solid rgba(255, 255, 255, 0.15)',
                            background: '#09090b',
                            boxShadow: '0 0 50px rgba(255, 0, 127, 0.25), 0 20px 40px rgba(0,0,0,0.8)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <button 
                            className="fp-modal-close-btn" 
                            onClick={() => setReelModalOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: 'rgba(0,0,0,0.6)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: '#fff',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                fontSize: '0.72rem',
                                zIndex: 100,
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            ✕ CLOSE
                        </button>
                        
                        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                            <video 
                                src="/assets/videos/montraelectricmob.mp4" 
                                controls 
                                autoPlay 
                                loop 
                                playsInline
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            ></video>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
