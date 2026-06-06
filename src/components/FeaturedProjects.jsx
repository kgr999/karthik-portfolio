import React, { useState, useEffect } from 'react';

export default function FeaturedProjects() {
    // Console tab state (null at start, 'montra', or 'lincoln')
    const [activeProject, setActiveProject] = useState(null);

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

    // Helper Render functions for DRY card definitions
    const renderMontraCard = () => (
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
                            <div className="fp-play-button-ring" style={{ '--ring-accent': '#00F0FF', '--ring-glow': 'rgba(0, 240, 255, 0.4)' }}>
                                <span className="fp-play-icon">▶</span>
                            </div>
                            <span className="fp-play-label" style={{ '--label-accent': '#00F0FF' }}>Play Case Video</span>
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
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#00F0FF' }}>▸</span>
                                <span>Iterated on AI outputs through multiple refinement cycles to ensure quality standards and brand guideline compliance.</span>
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
            style={{ '--card-accent': '#05FF99', '--card-glow-opacity': 'rgba(5, 255, 153, 0.04)' }}
        >
            <div className="fp-visual-container">
                <div 
                    className="cinema-card play-trigger-card" 
                    data-glow="#05FF99" 
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
                            <div className="fp-play-button-ring" style={{ '--ring-accent': '#05FF99', '--ring-glow': 'rgba(5, 255, 153, 0.4)' }}>
                                <span className="fp-play-icon">▶</span>
                            </div>
                            <span className="fp-play-label" style={{ '--label-accent': '#05FF99' }}>Play Case Video</span>
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
                    <span className="fp-role-tag" style={{ '--role-accent': '#05FF99' }}>AI Video & Audio Specialist</span>
                </div>

                <p className="fp-contribution-pitch">
                    Co-created a 15-minute product launch video for an international campaign under an aggressive 2-day deadline. Managed narrative pacing, avatar directorship, and multi-voice alignment.
                </p>

                <div className="fp-hud-metadata" style={{ '--hud-accent': '#05FF99' }}>
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
                            <div className="fp-bullet-item">
                                <span className="fp-bullet-icon" style={{ '--fp-accent': '#05FF99' }}>▸</span>
                                <span>Collaborated with technical teams on AI workflow capabilities, developing content policies and quality guardrails.</span>
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
                        onClick={() => window.open('https://admitra.in/customer-stories/lincoln-pa12-drama', '_blank')}
                    >
                        🔗 More Info
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
                    '--orb-glow': isMobile ? 'rgba(0, 240, 255, 0.05)' : (activeProject === 'montra' ? '#00F0FF' : activeProject === 'lincoln' ? '#05FF99' : 'rgba(255,255,255,0.05)'),
                    opacity: isMobile ? 0.08 : (activeProject ? 0.12 : 0.05)
                }}
            ></div>

            <div className="container" style={{ position: 'relative', zIndex: 5 }}>
                <div className="section-header text-center">
                    <h2 className="section-heading reveal-text" style={{ marginBottom: '15px' }}>Featured Projects</h2>
                    <p className="section-desc" style={{ maxWidth: '600px', margin: '0 auto 30px auto', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.4)', lineHeight: '1.45' }}>
                        Produced by AdMitra. All visual assets and final video content are the intellectual property of AdMitra and their respective clients. Shared strictly as a professional role demonstration.
                    </p>
                </div>

                {isMobile ? (
                    /* Both Case Studies displayed stacked directly on mobile/tablet viewports */
                    <div className="fp-dashboard-list" style={{ display: 'flex', flexDirection: 'column', gap: '54px', margin: '0 auto', maxWidth: '980px' }}>
                        {renderMontraCard()}
                        {renderLincolnCard()}
                    </div>
                ) : (
                    /* Interactive Console Viewport for Desktop viewports */
                    activeProject === null ? (
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
                                    style={{ backgroundImage: 'url(/assets/images/eviatorlaunchphoto.webp)' }}
                                ></div>
                                <div className="fp-pod-gradient-overlay"></div>

                                {/* Card Content Wrapper */}
                                <div className="fp-pod-content">
                                    <div className="fp-pod-header">
                                        <div className="fp-pod-header-left">
                                            <span className="fp-pod-num">01</span>
                                            <span className="fp-pod-category-badge" style={{ '--badge-theme': '#00F0FF' }}>Launch Video Production</span>
                                        </div>
                                    </div>

                                    <div className="fp-pod-body">
                                        <h3 className="fp-pod-title">Montra Electric Eviator</h3>
                                        <span className="fp-pod-role-pill" style={{ '--role-theme': '#00F0FF' }}>AI Video Producer & Editor</span>
                                        <p className="fp-pod-desc">
                                            Produced the official reveal video for Montra Electric's Eviator range. Managed the entire pipeline—from generating Kling V3 AI scenes to post-production, upscaling, and final large-screen projection.
                                        </p>

                                        {/* Stats HUD Panel */}
                                        <div className="fp-pod-stats-hud" style={{ '--hud-border': 'rgba(0, 240, 255, 0.15)' }}>
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
                                        <div className="fp-pod-mini-tools">
                                            <span className="fp-pod-tool-capsule">Kling V3</span>
                                            <span className="fp-pod-tool-capsule">Seedance 2.0</span>
                                            <span className="fp-pod-tool-capsule">DaVinci Resolve</span>
                                            <span className="fp-pod-tool-capsule">+2 More</span>
                                        </div>
                                        <span className="fp-pod-action-btn" style={{ '--btn-theme': '#00F0FF' }}>
                                            Inspect Case Study <span className="fp-pod-arrow">➔</span>
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
                                    style={{ backgroundImage: 'url(/assets/images/lincolnpharmaphoto.webp)' }}
                                ></div>
                                <div className="fp-pod-gradient-overlay"></div>

                                {/* Card Content Wrapper */}
                                <div className="fp-pod-content">
                                    <div className="fp-pod-header">
                                        <div className="fp-pod-header-left">
                                            <span className="fp-pod-num">02</span>
                                            <span className="fp-pod-category-badge" style={{ '--badge-theme': '#05FF99' }}>Rapid Sprint Production</span>
                                        </div>
                                    </div>

                                    <div className="fp-pod-body">
                                        <h3 className="fp-pod-title">Lincoln Pharma Pa12</h3>
                                        <span className="fp-pod-role-pill" style={{ '--role-theme': '#05FF99' }}>AI Video & Audio Specialist</span>
                                        <p className="fp-pod-desc">
                                            Produced a 15-minute regional launch presentation drama within an aggressive 2-day timeline, managing AI-synthesized regional avatars, Kling AI b-roll, and ElevenLabs audio narration.
                                        </p>

                                        {/* Stats HUD Panel */}
                                        <div className="fp-pod-stats-hud" style={{ '--hud-border': 'rgba(5, 255, 153, 0.15)' }}>
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
                                        <div className="fp-pod-mini-tools">
                                            <span className="fp-pod-tool-capsule">HeyGen Avatars</span>
                                            <span className="fp-pod-tool-capsule">Kling AI</span>
                                            <span className="fp-pod-tool-capsule">ElevenLabs</span>
                                        </div>
                                        <span className="fp-pod-action-btn" style={{ '--btn-theme': '#05FF99' }}>
                                            Inspect Case Study <span className="fp-pod-arrow">➔</span>
                                        </span>
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
                                    </>
                                ) : (
                                    <>
                                        {renderLincolnCard()}
                                        {renderMontraCard()}
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

                {/* 3. SPECULATIVE INSTAGRAM VIRAL CAMPAIGN SECTION (Renders below projects at all times) */}
                <div 
                    className="fp-speculative-reel-section" 
                    style={{ 
                        marginTop: '80px',
                        position: 'relative',
                        zIndex: 10
                    }}
                >
                    <div className="section-header text-center" style={{ marginBottom: '40px' }}>
                        <h2 className="section-heading reveal-text" style={{ fontSize: isMobile ? '1.4rem' : '2.0rem', marginBottom: '15px', color: '#ff007f', textShadow: '0 0 15px rgba(255, 0, 127, 0.15)' }}>Viral Distribution</h2>
                    </div>

                    <div className="fp-launcher-pod-group" style={{ margin: '0 auto', maxWidth: '900px' }}>
                        <div 
                            className="fp-launcher-pod premium-pod full-width-pod"
                            style={{ 
                                '--pod-theme': '#ff007f', 
                                '--pod-theme-glow': 'rgba(255, 0, 127, 0.15)',
                                cursor: 'default'
                            }}
                        >
                            {/* Visual Thumbnail Background & Overlay */}
                            <div 
                                className="fp-pod-thumbnail-bg" 
                                style={{ 
                                    backgroundImage: 'url(/assets/images/instaviral.webp)',
                                    opacity: 0.12,
                                    transform: 'scale(1.05)',
                                    backgroundPosition: 'center 30%'
                                }}
                            ></div>
                            <div className="fp-pod-gradient-overlay" style={{ background: 'linear-gradient(to right, rgba(10,10,12,0.96) 45%, rgba(10,10,12,0.4) 100%)' }}></div>

                            {/* Left Column: Pod Content */}
                            <div className="fp-pod-content" style={{ zIndex: 5, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', gap: '14px' }}>


                                <div className="fp-pod-body" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <h3 className="fp-pod-title" style={{ fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-0.5px', margin: '0', color: '#FFF' }}>The "Diesel Drama" Viral Reel</h3>
                                    <span className="fp-pod-role-pill" style={{ '--role-theme': '#ff007f', display: 'inline-block', alignSelf: 'flex-start', fontSize: '0.72rem', letterSpacing: '1px' }}>AI Video Specialist & Storyteller</span>
                                    <p className="fp-pod-desc" style={{ fontSize: '0.86rem', lineHeight: '1.45', opacity: 0.8, margin: '4px 0 8px 0' }}>
                                        Designed and produced the viral reel campaign to maximize organic regional engagement. Engineered high-impact visual hooks, dynamic pacing, and custom narrative layouts, driving over 1.2 million views and high user interaction.
                                    </p>

                                    {/* Interactive Translation Spectrum Widget */}
                                    <div className="fp-lang-spectrum" style={{ margin: '4px 0' }}>
                                        <span className="fp-lang-title" style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Active Translation Matrix (7 Languages)</span>
                                        <div className="fp-lang-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                            {['Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Marathi', 'Gujarati'].map((lang, idx) => (
                                                <span key={idx} className="fp-lang-pill" style={{
                                                    fontSize: '0.58rem',
                                                    padding: '3px 7px',
                                                    borderRadius: '4px',
                                                    background: 'rgba(255, 0, 127, 0.05)',
                                                    border: '1px solid rgba(255, 0, 127, 0.2)',
                                                    color: 'rgba(255, 255, 255, 0.8)',
                                                    fontWeight: '700',
                                                    letterSpacing: '0.5px',
                                                    transition: 'all 0.3s ease',
                                                    cursor: 'default'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.background = 'rgba(255, 0, 127, 0.2)';
                                                    e.target.style.borderColor = '#ff007f';
                                                    e.target.style.color = '#fff';
                                                    e.target.style.boxShadow = '0 0 10px rgba(255, 0, 127, 0.4)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.background = 'rgba(255, 0, 127, 0.05)';
                                                    e.target.style.borderColor = 'rgba(255, 0, 127, 0.2)';
                                                    e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                                                    e.target.style.boxShadow = 'none';
                                                }}
                                                >
                                                    {lang}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Stats HUD Panel - Glass Dashboard Widgets */}
                                    <div className="fp-pod-stats-hud" style={{ '--hud-border': 'none', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '6px' }}>
                                        <div className="fp-pod-hud-col glass-hud">
                                            <span className="fp-pod-hud-lbl" style={{ fontSize: '0.55rem', letterSpacing: '0.5px', color: 'rgba(255,255,255,0.45)', textTransform: 'none', marginBottom: '2px', display: 'block' }}>Views</span>
                                            <span className="fp-pod-hud-val" style={{ color: '#00FF80', fontWeight: '900', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#00FF80', boxShadow: '0 0 6px #00FF80' }}></span>
                                                1.2M+
                                            </span>
                                        </div>
                                        <div className="fp-pod-hud-col glass-hud">
                                            <span className="fp-pod-hud-lbl" style={{ fontSize: '0.55rem', letterSpacing: '0.5px', color: 'rgba(255,255,255,0.45)', textTransform: 'none', marginBottom: '2px', display: 'block' }}>Likes</span>
                                            <span className="fp-pod-hud-val" style={{ color: '#ff007f', fontWeight: '900', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" style={{ filter: 'drop-shadow(0 0 3px rgba(255,0,127,0.6))' }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                                                33k+
                                            </span>
                                        </div>
                                        <div className="fp-pod-hud-col glass-hud">
                                            <span className="fp-pod-hud-lbl" style={{ fontSize: '0.55rem', letterSpacing: '0.5px', color: 'rgba(255,255,255,0.45)', textTransform: 'none', marginBottom: '2px', display: 'block' }}>Format</span>
                                            <span className="fp-pod-hud-val" style={{ color: '#00F0FF', fontWeight: '900', fontSize: '1.05rem' }}>9:16 Vertical</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: High-Fidelity Phone Mockup */}
                            <div style={{ zIndex: 5, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0' }}>
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
                                            boxShadow: '0 15px 45px rgba(255, 0, 127, 0.25), 0 10px 30px rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(255,255,255,0.1)',
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
                                                        <span style={{ fontSize: '0.34rem', fontWeight: '800', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>33k</span>
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
                                                <div className="fp-play-button-ring" style={{ '--ring-accent': '#ff007f', '--ring-glow': 'rgba(255, 0, 127, 0.6)', width: '38px', height: '38px', minWidth: '38px' }}>
                                                    <span className="fp-play-icon" style={{ fontSize: '0.9rem', transform: 'translateY(-1px)' }}>🔗</span>
                                                </div>
                                                <span className="fp-play-label" style={{ '--label-accent': '#ff007f', fontSize: '0.62rem', fontWeight: '800', letterSpacing: '1px' }}>VIEW REEL</span>
                                            </div>
                                        </div>
                                    </a>
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
                                <span className="fp-telemetry-title">Video Feed // Montra Electric Eviator</span>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <a 
                                    href="https://drive.google.com/file/d/1VA9r9yJDKCBJL8w8rgXPP3wsYS2S_VYO/view?usp=sharing" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="fp-telemetry-drive-link"
                                    style={{ color: '#00F0FF', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}
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
                    <div className="fp-modal-player-container" onClick={(e) => e.stopPropagation()} style={{ '--theme-glow': '#05FF99' }}>
                        {/* High-Tech Telemetry Header */}
                        <div className="fp-modal-telemetry-header">
                            <div className="fp-telemetry-header-left">
                                <span className="fp-telemetry-dot pulsing-green" style={{ background: '#05FF99', boxShadow: '0 0 8px #05FF99' }}></span>
                                <span className="fp-telemetry-title">Video Feed // Lincoln Pharma Pa12</span>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <a 
                                    href="https://drive.google.com/file/d/1hdDxSZyTSEW6ctVFJLjQhcH185_DUWbl/view?usp=sharing" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="fp-telemetry-drive-link"
                                    style={{ color: '#05FF99', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px' }}
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
