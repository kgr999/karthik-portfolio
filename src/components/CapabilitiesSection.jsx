import React from 'react';
import LazyVideo from './LazyVideo';

export default function CapabilitiesSection() {
    return (
        <section id="capabilities" className="capabilities-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>Creative Capabilities</h2>
                </div>
                <div className="capabilities-grid-v2">
                    {/* 1. Hero Card: AI Creative Direction */}
                    <div className="cap-card-v2 hero-cap-card">
                        <div className="cap-image-wrapper aspect-16-9">
                            {/* Floating Numbering Badge */}
                            <div className="cap-media-badge-left">
                                <span className="cap-dot-indicator pulse-blue"></span>
                                <span className="cap-num">01</span>
                            </div>
                            <img className="cap-color-image" src="assets/images/capdirector.webp" alt="AI Creative Direction" loading="lazy" />
                        </div>

                        <div className="cap-card-body">
                            <h3 className="cap-title">AI Creative Direction</h3>
                            <div className="cap-focus-tags">
                                <span className="cap-focus-tag">Multimodal AI</span>
                                <span className="cap-focus-tag">Cinematic Worldbuilding</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. Content Research & Strategy */}
                    <div className="cap-card-v2">
                        <div className="cap-image-wrapper aspect-16-9">
                            {/* Floating Numbering Badge */}
                            <div className="cap-media-badge-left">
                                <span className="cap-dot-indicator"></span>
                                <span className="cap-num">02</span>
                            </div>
                            <img className="cap-color-image" src="assets/images/capstoryboarding.webp" alt="Content Research & Styling" loading="lazy" />
                        </div>

                        <div className="cap-card-body">
                            <h3 className="cap-title">Content Research & Styling</h3>
                            <div className="cap-focus-tags">
                                <span className="cap-focus-tag">Audience Insights</span>
                                <span className="cap-focus-tag">Data Analytics</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. Character Building */}
                    <div className="cap-card-v2">
                        <div className="cap-image-wrapper aspect-16-9">
                            {/* Floating Numbering Badge */}
                            <div className="cap-media-badge-left">
                                <span className="cap-dot-indicator"></span>
                                <span className="cap-num">03</span>
                            </div>
                            <img className="cap-color-image" src="assets/images/capcharbuild.webp" alt="Character Building" loading="lazy" />
                        </div>

                        <div className="cap-card-body">
                            <h3 className="cap-title">Character Building</h3>
                            <div className="cap-focus-tags">
                                <span className="cap-focus-tag">Multi-Shot Continuity</span>
                                <span className="cap-focus-tag">Asset Locking</span>
                            </div>
                        </div>
                    </div>

                    {/* 4. Storyboarding & Pre-Visuals */}
                    <div className="cap-card-v2">
                        <div className="cap-image-wrapper aspect-16-9">
                            {/* Floating Numbering Badge */}
                            <div className="cap-media-badge-left">
                                <span className="cap-dot-indicator"></span>
                                <span className="cap-num">04</span>
                            </div>
                            <img className="cap-color-image" src="assets/images/storyboarding.webp" alt="Storyboarding & Pre-Visuals" loading="lazy" />
                        </div>

                        <div className="cap-card-body">
                            <h3 className="cap-title">Storyboarding & Pre-Visuals</h3>
                            <div className="cap-focus-tags">
                                <span className="cap-focus-tag">Sequenced Layouts</span>
                                <span className="cap-focus-tag">Shot Design</span>
                            </div>
                        </div>
                    </div>

                    {/* 5. Visual Storytelling */}
                    <div className="cap-card-v2">
                        <div className="cap-image-wrapper aspect-16-9">
                            {/* Floating Numbering Badge */}
                            <div className="cap-media-badge-left">
                                <span className="cap-dot-indicator"></span>
                                <span className="cap-num">05</span>
                            </div>
                            <LazyVideo className="cap-color-image" src="assets/videos/storyboardingoutput.mp4" loop muted playsInline autoPlay />
                        </div>

                        <div className="cap-card-body">
                            <h3 className="cap-title">Visual Storytelling</h3>
                            <div className="cap-focus-tags">
                                <span className="cap-focus-tag">Composition</span>
                                <span className="cap-focus-tag">Lighting & Pacing</span>
                            </div>
                        </div>
                    </div>

                    {/* 6. AI Audio & Narration Design */}
                    <div className="cap-card-v2">
                        <div className="cap-image-wrapper aspect-16-9">
                            {/* Floating Numbering Badge */}
                            <div className="cap-media-badge-left">
                                <span className="cap-dot-indicator"></span>
                                <span className="cap-num">06</span>
                            </div>
                            <img className="cap-color-image" src="assets/images/capaudio.webp" alt="AI Audio & Narration Design" loading="lazy" />
                        </div>

                        <div className="cap-card-body">
                            <h3 className="cap-title">AI Audio & Narration Design</h3>
                            <div className="cap-focus-tags">
                                <span className="cap-focus-tag">Voice Cloning</span>
                                <span className="cap-focus-tag">Sound FX Layer</span>
                            </div>
                        </div>
                    </div>

                    {/* 7. Cinematic Video Editing */}
                    <div className="cap-card-v2">
                        <div className="cap-image-wrapper aspect-16-9">
                            {/* Floating Numbering Badge */}
                            <div className="cap-media-badge-left">
                                <span className="cap-dot-indicator"></span>
                                <span className="cap-num">07</span>
                            </div>
                            <img className="cap-color-image" src="assets/images/capvideo.webp" alt="Cinematic Video Editing" loading="lazy" />
                        </div>

                        <div className="cap-card-body">
                            <h3 className="cap-title">Video Editing (Intermediate)</h3>
                            <div className="cap-focus-tags">
                                <span className="cap-focus-tag">Pacing & Rhythm</span>
                                <span className="cap-focus-tag">Narrative Flow</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Minimalist Responsible AI Panel (Crimson Theme matched) */}
                <div className="ap-governance-box reveal-item">
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
                                <h3 className="ap-governance-title">Responsible AI & Content Governance</h3>
                                <span className="ap-governance-badge">Ethical Standards</span>
                            </div>
                            <p className="ap-governance-desc">
                                In an AI-augmented landscape, content integrity is paramount. I enforce strict safety guardrails, demographic bias checks, and intellectual property filters throughout my multimodal production pipeline to ensure all synthetic outputs remain compliant, safe, and authentically representative.
                            </p>
                        </div>
                    </div>

                    <div className="ap-governance-grid">
                        <div className="ap-governance-item">
                            <span className="ap-governance-lbl">Demographic Bias</span>
                            <span className="ap-governance-val">
                                <span className="ap-governance-dot"></span> Active Mitigation
                            </span>
                        </div>
                        <div className="ap-governance-item">
                            <span className="ap-governance-lbl">IP & Trademark Compliance</span>
                            <span className="ap-governance-val">
                                <span className="ap-governance-dot"></span> Secure Filtering
                            </span>
                        </div>
                        <div className="ap-governance-item">
                            <span className="ap-governance-lbl">Generative Provenance</span>
                            <span className="ap-governance-val">
                                <span className="ap-governance-dot"></span> Verified Metadata
                            </span>
                        </div>
                        <div className="ap-governance-item">
                            <span className="ap-governance-lbl">Content Safety Audits</span>
                            <span className="ap-governance-val">
                                <span className="ap-governance-dot"></span> Continuous Loop
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
