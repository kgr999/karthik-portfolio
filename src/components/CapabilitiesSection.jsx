import React from 'react';
import LazyVideo from './LazyVideo';

export default function CapabilitiesSection() {
    const capabilities = [
        {
            type: 'image',
            src: 'assets/images/capdirector.webp',
            alt: 'AI Creative Direction',
            title: 'AI Creative Direction',
            tags: ['Multimodal AI', 'Cinematic Worldbuilding'],
            isHero: true
        },
        {
            type: 'image',
            src: 'assets/images/capcharbuild.webp',
            alt: 'Character Building',
            title: 'Character Building',
            tags: ['Multi-Shot Continuity', 'Asset Locking']
        },
        {
            type: 'image',
            src: 'assets/images/storyboarding.webp',
            alt: 'Storyboarding & Pre-Visuals',
            title: 'Storyboarding & Pre-Visuals',
            tags: ['Sequenced Layouts', 'Shot Design']
        },
        {
            type: 'video',
            src: 'assets/videos/storyboardingoutput.mp4',
            alt: 'Visual Storytelling',
            title: 'Visual Storytelling',
            tags: ['Composition', 'Lighting & Pacing']
        },
        {
            type: 'image',
            src: 'assets/images/capaudio.webp',
            alt: 'AI Audio & Narration Design',
            title: 'AI Audio & Narration Design',
            tags: ['Voice Cloning', 'Sound FX Layer']
        },
        {
            type: 'image',
            src: 'assets/images/capvideo.webp',
            alt: 'Cinematic Video Editing',
            title: 'Video Editing',
            tags: ['Pacing & Rhythm', 'Narrative Flow']
        }
    ];

    const renderCard = (cap, index, groupKey) => (
        <div 
            key={`${groupKey}-${index}`} 
            className={`cap-card-v2 ${cap.isHero ? 'hero-cap-card' : ''}`}
        >
            <div className="cap-image-wrapper aspect-16-9">
                {cap.type === 'video' ? (
                    <LazyVideo 
                        className="cap-color-image" 
                        src={cap.src} 
                        loop 
                        muted 
                        playsInline 
                        autoPlay 
                    />
                ) : (
                    <img 
                        className="cap-color-image" 
                        src={cap.src} 
                        alt={cap.alt} 
                        loading="lazy" 
                    />
                )}
            </div>

            <div className="cap-card-body">
                <h3 className="cap-title">{cap.title}</h3>
                <div className="cap-focus-tags">
                    {cap.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="cap-focus-tag">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <section id="capabilities" className="capabilities-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>Creative Capabilities</h2>
                </div>
                
                <div className="capabilities-marquee-container">
                    <div className="capabilities-marquee-track">
                        <div className="capabilities-marquee-group">
                            {capabilities.map((cap, idx) => renderCard(cap, idx, 'g1'))}
                        </div>
                        <div className="capabilities-marquee-group" aria-hidden="true">
                            {capabilities.map((cap, idx) => renderCard(cap, idx, 'g2'))}
                        </div>
                    </div>
                </div>

                {/* Minimalist Responsible AI Panel (Crimson Theme matched) */}
                <div className="ap-governance-box reveal-item">
                    {/* Corner Accent Bezels for HUD look */}
                    <div className="ap-governance-bezel tl"></div>
                    <div className="ap-governance-bezel tr"></div>
                    <div className="ap-governance-bezel bl"></div>
                    <div className="ap-governance-bezel br"></div>
                    
                    <div className="ap-governance-container">
                        <div className="ap-governance-header">
                            <div className="ap-governance-icon">
                                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                    <path d="M12 8v8"/>
                                    <path d="M9 11h6"/>
                                </svg>
                            </div>
                            <div className="ap-governance-header-info">
                                <div className="ap-governance-header-row">
                                    <h3 className="ap-governance-title">Responsible AI & Ethical Video Generation</h3>
                                    <span className="ap-governance-badge">Ethical Standards</span>
                                </div>
                                <p className="ap-governance-desc">
                                    In generative AI filmmaking, creative control must walk hand-in-hand with ethical responsibility. I adhere to a rigorous Responsible AI framework, utilizing licensed foundation models, auditing synthetic assets for demographic bias, and ensuring proper creative attribution. By combining advanced video generation with strict ethical guidelines, I protect artistic integrity while producing inclusive, safe, and transparent cinematic content.
                                </p>
                            </div>
                        </div>

                        <div className="ap-governance-grid">
                            <div className="ap-governance-item">
                                <div className="ap-governance-item-header">
                                    <span className="ap-governance-lbl">Responsible AI Framework</span>
                                    <span className="ap-governance-code">[SYS.01]</span>
                                </div>
                                <span className="ap-governance-val">
                                    <span className="ap-governance-dot"></span> Ethically Trained Models
                                </span>
                                <div className="ap-governance-bar">
                                    <div className="ap-governance-bar-fill" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                            <div className="ap-governance-item">
                                <div className="ap-governance-item-header">
                                    <span className="ap-governance-lbl">Representation & Diversity</span>
                                    <span className="ap-governance-code">[SYS.02]</span>
                                </div>
                                <span className="ap-governance-val">
                                    <span className="ap-governance-dot"></span> Demographic Bias Scans
                                </span>
                                <div className="ap-governance-bar">
                                    <div className="ap-governance-bar-fill" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                            <div className="ap-governance-item">
                                <div className="ap-governance-item-header">
                                    <span className="ap-governance-lbl">Attribution & Creative IP</span>
                                    <span className="ap-governance-code">[SYS.03]</span>
                                </div>
                                <span className="ap-governance-val">
                                    <span className="ap-governance-dot"></span> Respectful Synthesis Loops
                                </span>
                                <div className="ap-governance-bar">
                                    <div className="ap-governance-bar-fill" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                            <div className="ap-governance-item">
                                <div className="ap-governance-item-header">
                                    <span className="ap-governance-lbl">Cinematic Safety & Ethics</span>
                                    <span className="ap-governance-code">[SYS.04]</span>
                                </div>
                                <span className="ap-governance-val">
                                    <span className="ap-governance-dot"></span> Content Integrity Audits
                                </span>
                                <div className="ap-governance-bar">
                                    <div className="ap-governance-bar-fill" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
