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
                            <img className="cap-color-image" src="assets/images/capcharbuild.png" alt="Character Building" loading="lazy" />
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
            </div>
        </section>
    );
}
