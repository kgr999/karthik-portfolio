import React from 'react';
import LazyVideo from './LazyVideo';

export default function CinematicVisuals({
    midjourneyExpanded,
    setMidjourneyExpanded,
    seedanceExpanded,
    setSeedanceExpanded
}) {
    return (
        <>
            {/* Cinematic Self-Visuals Section */}
            <section id="self-visuals">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>Cinematic Self-Visuals</h2>
                    </div>
                    <div className="cinema-grid reveal-item" style={{ gap: '20px', marginTop: '40px' }}>
                        {/* Top Ultrawide Video */}
                        <div className="cinema-card ultrawide" data-glow="#A78BFA">
                            <div className="cinema-video-wrapper">
                                <LazyVideo className="cinema-video" src="assets/videos/helicopter.mp4" loop muted playsInline autoPlay />
                                <div className="cinema-overlay">
                                    <span className="cinema-badge">
                                        <span className="badge-dot" style={{ background: '#A78BFA', boxShadow: '0 0 8px #A78BFA' }}></span>
                                        Gen-4 Turbo
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Existing 16:9 Videos */}
                        <div className="cinema-card" data-glow="#4DA3FF">
                            <div className="cinema-video-wrapper">
                                <LazyVideo className="cinema-video" src="assets/videos/isro.mp4" loop muted playsInline autoPlay />
                                <div className="cinema-overlay">
                                    <span className="cinema-badge">
                                        <span className="badge-dot" style={{ background: '#00f0ff', boxShadow: '0 0 8px #00f0ff' }}></span>
                                        Kling V3 Pro
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="cinema-card" data-glow="#93C5FD">
                            <div className="cinema-video-wrapper">
                                <LazyVideo className="cinema-video" src="assets/videos/underwater.mp4" loop muted playsInline autoPlay />
                                <div className="cinema-overlay">
                                    <span className="cinema-badge">
                                        <span className="badge-dot" style={{ background: '#93C5FD', boxShadow: '0 0 8px #93C5FD' }}></span>
                                        Seedance 2.0
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Ultrawide Video */}
                        <div className="cinema-card ultrawide" data-glow="#F87171">
                            <div className="cinema-video-wrapper">
                                <LazyVideo className="cinema-video" src="assets/videos/supra.mp4" loop muted playsInline autoPlay />
                                <div className="cinema-overlay">
                                    <span className="cinema-badge">
                                        <span className="badge-dot" style={{ background: '#F87171', boxShadow: '0 0 8px #F87171' }}></span>
                                        Gen-4 Turbo
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cinematic Prompting Section */}
            <section id="cinematic-prompting">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>Cinematic Prompting</h2>
                    </div>

                    <div className="prompting-grid reveal-item">
                        {/* Midjourney Image Column */}
                        <div className="prompting-card-wrapper">
                            <div className="cinema-card" data-glow="#8B5CF6" style={{ width: '100%' }}>
                                <div className="cinema-video-wrapper">
                                    <img className="cinema-video" src="assets/images/midjouneycinematic.webp" alt="Midjourney Cinematic Prompting" style={{ objectPosition: 'center' }} loading="lazy" />
                                    <div className="cinema-overlay">
                                        <span className="cinema-badge">
                                            <span className="badge-dot" style={{ background: '#8B5CF6', boxShadow: '0 0 8px #8B5CF6' }}></span>
                                            Midjourney v6
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="prompt-details-box">
                                <h3 className="prompt-tool-title">2010s Cyberpunk Film</h3>
                                <div className={`prompt-code-panel ${midjourneyExpanded ? 'expanded' : 'collapsed'}`} style={{ '--prompt-accent': '#8B5CF6' }}>
                                    <div className="prompt-code-header">
                                        <span>PROMPT COMMAND</span>
                                        <div className="prompt-actions">
                                            <span className="prompt-toggle-btn" onClick={() => setMidjourneyExpanded(!midjourneyExpanded)}>
                                                {midjourneyExpanded ? 'Show Less' : 'Show More'}
                                            </span>
                                            <span className="prompt-action-divider">|</span>
                                            <span className="prompt-copy-btn" onClick={(e) => {
                                                navigator.clipboard.writeText('Grounded 2010s cyberpunk film. Inside a moving futuristic train, daytime. A teenage boy and girl sit together in front of a large window, static medium shot, eye level, 50mm anamorphic lens. The girl stares blankly toward camera with a distant expression; the boy sits quietly beside her, looking slightly downward. Short dark hair loosely frames her face in soft daylight. Both wear layered casual streetwear worn jackets, muted urban colors. Posture is quiet and emo, emotional distance. Cinematic atmosphere, dramatic lighting, volumetric dust particles, real shadows, hyperrealistic details, cool color palette, high fidelity, 8k, photorealistic --ar 21:9 --style raw --v 6.0 --s 50');
                                                const orig = e.target.textContent;
                                                e.target.textContent = 'COPIED!';
                                                setTimeout(() => { e.target.textContent = orig; }, 2000);
                                            }}>Copy</span>
                                        </div>
                                    </div>
                                    <div className="prompt-code-body">
                                        <code className="prompt-code-text">
                                            Grounded 2010s cyberpunk film. Inside a moving futuristic train, daytime. A teenage boy and girl sit together in front of a large window, static medium shot, eye level, 50mm anamorphic lens. The girl stares blankly toward camera with a distant expression; the boy sits quietly beside her, looking slightly downward. Short dark hair loosely frames her face in soft daylight. Both wear layered casual streetwear worn jackets, muted urban colors. Posture is quiet and emo, emotional distance. Cinematic atmosphere, dramatic lighting, volumetric dust particles, real shadows, hyperrealistic details, cool color palette, high fidelity, 8k, photorealistic --ar 21:9 --style raw --v 6.0 --s 50
                                        </code>
                                        {!midjourneyExpanded && <div className="prompt-code-fade"></div>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Seedance Video Column */}
                        <div className="prompting-card-wrapper">
                            <div className="cinema-card" data-glow="#00F0FF" style={{ width: '100%' }}>
                                <div className="cinema-video-wrapper">
                                    <LazyVideo className="cinema-video" src="assets/videos/midseedance.mp4" loop muted playsInline autoPlay />
                                    <div className="cinema-overlay">
                                        <span className="cinema-badge">
                                            <span className="badge-dot" style={{ background: '#00F0FF', boxShadow: '0 0 8px #00F0FF' }}></span>
                                            Seedance 2.0
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="prompt-details-box">
                                <h3 className="prompt-tool-title">Rain Chase</h3>
                                <div className={`prompt-code-panel ${seedanceExpanded ? 'expanded' : 'collapsed'}`} style={{ '--prompt-accent': '#00F0FF' }}>
                                    <div className="prompt-code-header">
                                        <span>MOTION DIRECTIVE</span>
                                        <div className="prompt-actions">
                                            <span className="prompt-toggle-btn" onClick={() => setSeedanceExpanded(!seedanceExpanded)}>
                                                {seedanceExpanded ? 'Show Less' : 'Show More'}
                                            </span>
                                            <span className="prompt-action-divider">|</span>
                                            <span className="prompt-copy-btn" onClick={(e) => {
                                                navigator.clipboard.writeText('A high-speed car chase on a rain-drenched highway at night. Two muscle cars weave through heavy traffic at 140mph, headlights slicing through the downpour. One car clips a semi-truck sending sparks showering across six lanes. The camera is mounted on the hood of the lead car, rain hammering the lens. Neon highway signs blur overhead. The pursuing car fishtails through a gap between two buses. Tires hydroplane on standing water. Hyper-realistic, motion blur, reflections on wet asphalt, 8k, Michael Mann cinematography.');
                                                const orig = e.target.textContent;
                                                e.target.textContent = 'COPIED!';
                                                setTimeout(() => { e.target.textContent = orig; }, 2000);
                                            }}>Copy</span>
                                        </div>
                                    </div>
                                    <div className="prompt-code-body">
                                        <code className="prompt-code-text">
                                            A high-speed car chase on a rain-drenched highway at night. Two muscle cars weave through heavy traffic at 140mph, headlights slicing through the downpour. One car clips a semi-truck sending sparks showering across six lanes. The camera is mounted on the hood of the lead car, rain hammering the lens. Neon highway signs blur overhead. The pursuing car fishtails through a gap between two buses. Tires hydroplane on standing water. Hyper-realistic, motion blur, reflections on wet asphalt, 8k, Michael Mann cinematography.
                                        </code>
                                        {!seedanceExpanded && <div className="prompt-code-fade"></div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
