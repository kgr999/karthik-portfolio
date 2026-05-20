import React, { useEffect, useState } from 'react';
import LightRays from './LightRays';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { initPortfolio } from './portfolio-logic';

const mockVideos = [
    { id: 1, title: "Fresh Groceries", subtitle: "Delivered in 10 mins", bg: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", icon: "📦" },
    { id: 2, title: "Hot Biryani", subtitle: "Free delivery today", bg: "linear-gradient(135deg, #d31027 0%, #ea720c 100%)", icon: "🍛" },
    { id: 3, title: "Cab Booking", subtitle: "Lowest fare guaranteed", bg: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)", icon: "🚗" }
];

const mockPosters = [
    { id: 1, title: "Summer Sale", desc: "Up to 50% Off on everything", bg: "linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)", badge: "HOT" },
    { id: 2, title: "Weekend Feast", desc: "Buy 1 Get 1 Free on all orders", bg: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)", badge: "50% OFF" },
    { id: 3, title: "Eco Mobility", desc: "Zero emissions, zero stress rides", bg: "linear-gradient(135deg, #00b4db 0%, #0083b0 100%)", badge: "NEW" }
];

export default function App() {
    const [locIdx, setLocIdx] = useState(0);
    const [creativeType, setCreativeType] = useState('video');
    const [creativeIdx, setCreativeIdx] = useState(0);
    const locations = [
        { city: "Bengaluru", lang: "Kannada" },
        { city: "Delhi", lang: "Hindi" },
        { city: "Mumbai", lang: "Marathi" },
        { city: "Chennai", lang: "Tamil" },
        { city: "Assam", lang: "Assamese" },
        { city: "Kerala", lang: "Malayalam" },
        { city: "AP/Telangana", lang: "Telugu" },
        { city: "West Bengal", lang: "Bengali" }
    ];

    useEffect(() => {
        initPortfolio();
        const interval = setInterval(() => {
            setLocIdx((prev) => (prev + 1) % locations.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: -1, opacity: 0.15 }}>
            </div>





            <nav>
                <div className="nav-inner">
                    <div className="logo-wrapper">
                        <a href="#" className="logo-text">KARTHIK G RAJ</a>
                    </div>
                    <div className="nav-links">
                        <a href="#capabilities">Capabilities</a>
                        <a href="#visuals">Visuals</a>
                        <a href="#contact">Contact</a>
                    </div>
                    <div className="nav-actions">
                        <a href="#" className="resume-btn" download>Resume</a>
                        <button className="menu-toggle" aria-label="Toggle Menu">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className="mobile-menu">
                <div className="mobile-menu-inner">
                    <a href="#capabilities">Capabilities</a>
                    <a href="#visuals">Visuals</a>
                    <a href="#contact">Contact</a>
                </div>
            </div>

            <main>
                {/* 1. Hero Section */}
                <section id="hero" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.5 }}>
                        <LightRays
                            raysOrigin="top-center"
                            raysColor="#0084ff"
                            raysSpeed={1.7}
                            lightSpread={2}
                            rayLength={1.2}
                            followMouse={true}
                            mouseInfluence={0.4}
                            noiseAmount={0.23}
                            distortion={0.05}
                            className="custom-rays"
                            pulsating
                            saturation={2}
                        />
                    </div>
                    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                        <div className="hero-content">
                            <p className="hero-label reveal-text">Gen AI Visual Director</p>
                            <h1 className="reveal-text">Architecting<br /><span>Human Attention.</span></h1>
                            <p className="hero-sub reveal-text">Pioneering high-retention visual narratives through the intersection
                                of generative AI and human-led creative strategy.</p>
                            <div className="hero-cta reveal-item">
                                <a href="#capabilities" className="main-btn">View Capabilities</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. Creative Capabilities */}
                <section id="capabilities">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-heading reveal-text">Creative Systems</h2>
                            <p className="section-desc reveal-text">The intersection of creative intelligence, storytelling, and
                                execution.</p>
                        </div>
                        <div className="capabilities-grid reveal-item" id="capabilities-grid-animated">
                            <div className="cap-card">
                                <h3>YouTube Video Editing</h3>
                                <p>High-end cinematic editing focused on long-form narrative retention.</p>
                                <div className="card-progress"><div className="card-progress-fill"></div></div>
                            </div>
                            <div className="cap-card">
                                <h3>Short Form Video Editing</h3>
                                <p>Dynamic, high-impact vertical content engineered for the algorithm.</p>
                                <div className="card-progress"><div className="card-progress-fill"></div></div>
                            </div>
                            <div className="cap-card">
                                <h3>Storyboarding</h3>
                                <p>Visual planning and narrative mapping for complex production cycles.</p>
                                <div className="card-progress"><div className="card-progress-fill"></div></div>
                            </div>
                            <div className="cap-card">
                                <h3>Content Research</h3>
                                <p>Data-driven storytelling and deep content analysis for digital systems.</p>
                                <div className="card-progress"><div className="card-progress-fill"></div></div>
                            </div>
                            <div className="cap-card">
                                <h3>AI Creative Workflows</h3>
                                <p>Bespoke automation and generative pipelines for next-gen production.</p>
                                <div className="card-progress"><div className="card-progress-fill"></div></div>
                            </div>
                            <div className="cap-card">
                                <h3>Creative Direction</h3>
                                <p>Holistic visual strategy and creative leadership for AI-first brands.</p>
                                <div className="card-progress"><div className="card-progress-fill"></div></div>
                            </div>
                            <div className="cap-card">
                                <h3>Visual Storytelling</h3>
                                <p>The craft of moving pixels to evoke emotion and drive conversion.</p>
                                <div className="card-progress"><div className="card-progress-fill"></div></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 10. Creative Ecosystem (Stacking Cards) */}
                <section id="tech-stack">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-heading reveal-text">My Creative Stack</h2>
                        </div>

                        <div style={{ maxWidth: '850px', margin: '60px auto 0 auto' }}>
                            <ScrollStack
                                useWindowScroll={true}
                                itemDistance={120}
                                itemScale={0.03}
                                itemStackDistance={35}
                                stackPosition="15%"
                                scaleEndPosition="8%"
                                baseScale={0.9}
                                rotationAmount={0}
                            >
                                {/* 01 Creative Intelligence */}
                                <ScrollStackItem itemClassName="eco-category">
                                    <div className="eco-header">
                                        <span className="eco-num">01</span>
                                        <h3 className="eco-title" style={{ fontSize: '1.25rem' }}>Creative Intelligence</h3>
                                    </div>
                                    <div className="eco-chips" style={{ gap: '12px' }}>
                                        <div className="eco-chip" data-glow="#10a37f" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/openai.svg"
                                                alt="ChatGPT" className="eco-logo eco-logo-invert" style={{ width: '24px', height: '24px' }} />
                                            <span>ChatGPT</span>
                                        </div>
                                        <div className="eco-chip" data-glow="#d97757" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/claude-color.svg"
                                                alt="Claude" className="eco-logo" style={{ width: '24px', height: '24px' }} />
                                            <span>Claude</span>
                                        </div>
                                        <div className="eco-chip" data-glow="#4285f4" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/gemini-color.svg"
                                                alt="Gemini" className="eco-logo" style={{ width: '24px', height: '24px' }} />
                                            <span>Gemini</span>
                                        </div>
                                    </div>
                                </ScrollStackItem>

                                {/* 02 Creative Direction */}
                                <ScrollStackItem itemClassName="eco-category">
                                    <div className="eco-header">
                                        <span className="eco-num">02</span>
                                        <h3 className="eco-title" style={{ fontSize: '1.25rem' }}>Creative Direction</h3>
                                    </div>
                                    <div className="eco-chips" style={{ gap: '12px' }}>
                                        <div className="eco-chip eco-chip-text" data-glow="#faff00" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2">
                                                <rect x="2" y="2" width="20" height="20" rx="2" />
                                                <line x1="6" y1="6" x2="6" y2="6.01" />
                                                <line x1="6" y1="10" x2="6" y2="10.01" />
                                                <line x1="6" y1="14" x2="6" y2="14.01" />
                                                <line x1="10" y1="6" x2="18" y2="6" />
                                                <line x1="10" y1="10" x2="18" y2="10" />
                                                <line x1="10" y1="14" x2="18" y2="14" />
                                            </svg>
                                            <span>Storyboarding</span>
                                        </div>
                                        <div className="eco-chip eco-chip-text" data-glow="#faff00" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2">
                                                <path d="M12 20h9" />
                                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                                            </svg>
                                            <span>Narrative Design</span>
                                        </div>
                                        <div className="eco-chip eco-chip-text" data-glow="#faff00" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2">
                                                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                                                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                                                <circle cx="10" cy="13" r="2" />
                                                <path d="m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22" />
                                            </svg>
                                            <span>Visual Storytelling</span>
                                        </div>
                                        <div className="eco-chip eco-chip-text" data-glow="#faff00" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="2" y1="12" x2="22" y2="12" />
                                                <path
                                                    d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                            </svg>
                                            <span>Concept Development</span>
                                        </div>
                                    </div>
                                </ScrollStackItem>

                                {/* 03 Platforms & Workflows */}
                                <ScrollStackItem itemClassName="eco-category">
                                    <div className="eco-header">
                                        <span className="eco-num">03</span>
                                        <h3 className="eco-title" style={{ fontSize: '1.25rem' }}>Platforms & Workflows</h3>
                                    </div>
                                    <div className="eco-chips" style={{ gap: '12px' }}>
                                        <div className="eco-chip" data-glow="#ff4154" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/fal-color.svg"
                                                alt="Fal AI" className="eco-logo" style={{ width: '24px', height: '24px' }} />
                                            <span>Fal AI</span>
                                        </div>
                                        <div className="eco-chip" data-glow="#a855f7" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://www.google.com/s2/favicons?domain=openart.ai&sz=128" alt="OpenArt"
                                                className="eco-logo" style={{ width: '24px', height: '24px' }} />
                                            <span>OpenArt</span>
                                        </div>
                                        <div className="eco-chip" data-glow="#4ade80" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/comfyui-color.svg"
                                                alt="ComfyUI" className="eco-logo" style={{ width: '24px', height: '24px' }} />
                                            <span>ComfyUI</span>
                                        </div>
                                        <div className="eco-chip" data-glow="#60a5fa" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://www.google.com/s2/favicons?domain=higgsfield.ai&sz=128"
                                                alt="Higgsfield AI" className="eco-logo" style={{ width: '24px', height: '24px' }} />
                                            <span>Higgsfield AI</span>
                                        </div>
                                    </div>
                                </ScrollStackItem>

                                {/* 04 Video Generation */}
                                <ScrollStackItem itemClassName="eco-category">
                                    <div className="eco-header">
                                        <span className="eco-num">04</span>
                                        <h3 className="eco-title" style={{ fontSize: '1.25rem' }}>Video Generation</h3>
                                    </div>
                                    <div className="eco-chips" style={{ gap: '12px' }}>
                                        <div className="eco-chip" data-glow="#3b82f6" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/kling-color.svg"
                                                alt="Kling AI" className="eco-logo" style={{ width: '24px', height: '24px' }} />
                                            <span>Kling AI</span>
                                        </div>
                                        <div className="eco-chip" data-glow="#4285f4" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/google-color.svg"
                                                alt="Veo 3.1" className="eco-logo" style={{ width: '24px', height: '24px' }} />
                                            <span>Veo 3.1</span>
                                        </div>
                                        <div className="eco-chip" data-glow="#818cf8" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://www.google.com/s2/favicons?domain=seedance.ai&sz=128" alt="Seedance"
                                                className="eco-logo" style={{ width: '24px', height: '24px' }} />
                                            <span>Seedance</span>
                                        </div>
                                        <div className="eco-chip" data-glow="#c084fc" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/runway.svg"
                                                alt="Runway" className="eco-logo eco-logo-invert" style={{ width: '24px', height: '24px' }} />
                                            <span>Runway</span>
                                        </div>
                                    </div>
                                </ScrollStackItem>

                                {/* 05 Image Generation */}
                                <ScrollStackItem itemClassName="eco-category">
                                    <div className="eco-header">
                                        <span className="eco-num">05</span>
                                        <h3 className="eco-title" style={{ fontSize: '1.25rem' }}>Image Generation</h3>
                                    </div>
                                    <div className="eco-chips" style={{ gap: '12px' }}>
                                        <div className="eco-chip" data-glow="#10a37f" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/openai.svg"
                                                alt="GPT Image" className="eco-logo eco-logo-invert" style={{ width: '24px', height: '24px' }} />
                                            <span>GPT Image</span>
                                        </div>
                                        <div className="eco-chip" data-glow="#a855f7" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/flux.svg"
                                                alt="Flux" className="eco-logo eco-logo-invert" style={{ width: '24px', height: '24px' }} />
                                            <span>Flux</span>
                                        </div>
                                        <div className="eco-chip" data-glow="#fbbf24" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/nanobanana-color.svg"
                                                alt="NanoBanana" className="eco-logo" style={{ width: '24px', height: '24px' }} />
                                            <span>NanoBanana</span>
                                        </div>
                                        <div className="eco-chip" data-glow="#ffffff" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/midjourney.svg"
                                                alt="Midjourney" className="eco-logo eco-logo-invert" style={{ width: '24px', height: '24px' }} />
                                            <span>Midjourney</span>
                                        </div>
                                    </div>
                                </ScrollStackItem>

                                {/* 06 AI Avatars */}
                                <ScrollStackItem itemClassName="eco-category">
                                    <div className="eco-header">
                                        <span className="eco-num">06</span>
                                        <h3 className="eco-title" style={{ fontSize: '1.25rem' }}>AI Avatars</h3>
                                    </div>
                                    <div className="eco-chips" style={{ gap: '12px' }}>
                                        <div className="eco-chip" data-glow="#06b6d4" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://www.google.com/s2/favicons?domain=heygen.com&sz=128" alt="HeyGen"
                                                className="eco-logo" style={{ width: '24px', height: '24px' }} />
                                            <span>HeyGen</span>
                                        </div>
                                        <div className="eco-chip" data-glow="#3b82f6" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/kling-color.svg"
                                                alt="Kling AI Avatar" className="eco-logo" style={{ width: '24px', height: '24px' }} />
                                            <span>Kling AI Avatar</span>
                                        </div>
                                    </div>
                                </ScrollStackItem>

                                {/* 07 Audio Generation */}
                                <ScrollStackItem itemClassName="eco-category">
                                    <div className="eco-header">
                                        <span className="eco-num">07</span>
                                        <h3 className="eco-title" style={{ fontSize: '1.25rem' }}>Audio Generation</h3>
                                    </div>
                                    <div className="eco-chips" style={{ gap: '12px' }}>
                                        <div className="eco-chip" data-glow="#fbbf24" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/elevenlabs.svg"
                                                alt="ElevenLabs" className="eco-logo eco-logo-invert" style={{ width: '24px', height: '24px' }} />
                                            <span>ElevenLabs</span>
                                        </div>
                                        <div className="eco-chip" data-glow="#f472b6" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/suno.svg"
                                                alt="Suno" className="eco-logo eco-logo-invert" style={{ width: '24px', height: '24px' }} />
                                            <span>Suno</span>
                                        </div>
                                    </div>
                                </ScrollStackItem>

                                {/* 08 Post Production */}
                                <ScrollStackItem itemClassName="eco-category">
                                    <div className="eco-header">
                                        <span className="eco-num">08</span>
                                        <h3 className="eco-title" style={{ fontSize: '1.25rem' }}>Post Production</h3>
                                    </div>
                                    <div className="eco-chips" style={{ gap: '12px' }}>
                                        <div className="eco-chip" data-glow="#9999ff" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/adobe-color.svg"
                                                alt="Premiere Pro" className="eco-logo" style={{ width: '24px', height: '24px' }} />
                                            <span>Premiere Pro</span>
                                        </div>
                                        <div className="eco-chip" data-glow="#9999ff" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/adobe-color.svg"
                                                alt="After Effects" className="eco-logo" style={{ width: '24px', height: '24px' }} />
                                            <span>After Effects</span>
                                        </div>
                                        <div className="eco-chip" data-glow="#ff6f3c" style={{ padding: '10px 22px', fontSize: '0.95rem' }}>
                                            <img src="https://www.google.com/s2/favicons?domain=blackmagicdesign.com&sz=128"
                                                alt="DaVinci Resolve" className="eco-logo" style={{ width: '24px', height: '24px' }} />
                                            <span>DaVinci Resolve</span>
                                        </div>
                                    </div>
                                </ScrollStackItem>
                            </ScrollStack>
                        </div>
                    </div>
                </section>

                {/* 4.5. Cinematic Self-Visuals Section */}
                <section id="self-visuals">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-heading reveal-text">Cinematic Self-Visuals</h2>
                            <p className="section-desc reveal-text">Exploring the boundaries of identity inside generative,
                                high-fidelity worlds.</p>
                        </div>
                        <div className="cinema-grid reveal-item">
                            {/* Top Ultrawide Video */}
                            <div className="cinema-card ultrawide" data-glow="#A78BFA">
                                <div className="cinema-video-wrapper">
                                    <video className="cinema-video" src="assets/videos/helicopter.mp4" loop muted playsInline
                                        autoPlay></video>
                                    <div className="cinema-overlay">
                                        <span className="cinema-badge">Gen-4 Turbo</span>
                                    </div>
                                </div>
                                <div className="cinema-content">
                                    <span className="cinema-index">01 / WIDESCREEN FRONTIER</span>
                                    <h3 className="cinema-title">Ultrawide Horizon</h3>
                                    <p className="cinema-description">An expansive 21:9 cinematic exploration generated with
                                        state-of-the-art AI video models. Blending scale, atmosphere, and high-fidelity
                                        storytelling into a unified visual experience.</p>
                                </div>
                            </div>

                            {/* Existing 16:9 Videos */}
                            <div className="cinema-card" data-glow="#4DA3FF">
                                <div className="cinema-video-wrapper">
                                    <video className="cinema-video" src="assets/videos/isro.mov" loop muted playsInline
                                        autoPlay></video>
                                    <div className="cinema-overlay">
                                        <span className="cinema-badge">Kling V3 Pro</span>
                                    </div>
                                </div>
                                <div className="cinema-content">
                                    <span className="cinema-index">02 / CINEMATIC ENVIRONMENTS</span>
                                    <h3 className="cinema-title">Inside the Mission</h3>
                                    <p className="cinema-description">A cinematic AI-generated visual featuring myself inside an
                                        ISRO-inspired mission control environment, focused on futuristic space operations and
                                        immersive storytelling.</p>
                                </div>
                            </div>
                            <div className="cinema-card" data-glow="#93C5FD">
                                <div className="cinema-video-wrapper">
                                    <video className="cinema-video" src="assets/videos/underwater.mp4" loop muted playsInline
                                        autoPlay></video>
                                    <div className="cinema-overlay">
                                        <span className="cinema-badge">Seedance 2.0</span>
                                    </div>
                                </div>
                                <div className="cinema-content">
                                    <span className="cinema-index">03 / IMMERSIVE VISUALS</span>
                                    <h3 className="cinema-title">Lost in Blue</h3>
                                    <p className="cinema-description">An atmospheric underwater self-visual exploring emotion,
                                        silence, and cinematic worldbuilding through AI-generated environments</p>
                                </div>
                            </div>

                            {/* Bottom Ultrawide Video */}
                            <div className="cinema-card ultrawide" data-glow="#F87171">
                                <div className="cinema-video-wrapper">
                                    <video className="cinema-video" src="assets/videos/supra.mp4" loop muted playsInline
                                        autoPlay></video>
                                    <div className="cinema-overlay">
                                        <span className="cinema-badge">Gen-4 Turbo</span>
                                    </div>
                                </div>
                                <div className="cinema-content">
                                    <span className="cinema-index">04 / EXPANSIVE VISIONS</span>
                                    <h3 className="cinema-title">The Anamorphic Frame</h3>
                                    <p className="cinema-description">A deep-dive into ultra-widescreen aspect ratios, bringing the
                                        immersive feel of traditional cinema lenses into AI-generated motion design.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Visual Systems Gallery */}
                <section id="visuals">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-heading reveal-text">Visual Systems</h2>
                            <p className="section-desc reveal-text">Cinematic poster showcase and design experiments.</p>
                        </div>
                        <div className="visual-gallery">
                            {/* Project 1 */}
                            <div className="visual-item reveal-item">
                                {/* Top: Large Ultrawide Shot 1 */}
                                <div className="visual-media" style={{ marginBottom: '24px' }}>
                                    <img src="assets/images/n1.png" alt="Neural Frontiers - Shot 1" className="visual-image" />
                                </div>

                                {/* Bottom: Redesigned row with details on the left and n2.png smaller on the right */}
                                <div className="visual-details-layout" style={{
                                    display: 'flex',
                                    flexWrap: 'wrap-reverse',
                                    gap: '40px',
                                    alignItems: 'center',
                                    marginTop: '16px'
                                }}>
                                    {/* Parallel Left: Campaign Details */}
                                    <div className="visual-info" style={{ flex: '1.2', minWidth: '320px' }}>
                                        <span className="visual-tag" style={{ fontSize: '0.85rem', color: 'var(--accent)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                            CAMPAIGN 01 / Concept Product - Nandini Masala Majjige
                                        </span>
                                        <h3 className="visual-title" style={{ fontSize: '2.25rem', fontWeight: '800', margin: '12px 0', color: '#FFF' }}>
                                            Neural Frontiers
                                        </h3>
                                        <p className="visual-description" style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-muted)' }}>
                                            A cinematic exploration of latent diffusion models bridging human psychology and generative landscapes. Bridging latent spaces with real-world emotional response, this system pioneers highly immersive, high-retention visual strategy.
                                        </p>
                                    </div>

                                    {/* Parallel Right: n2.png (smaller in size) */}
                                    <div className="visual-media" style={{
                                        flex: '0.8',
                                        minWidth: '280px',
                                        maxWidth: '440px',
                                        aspectRatio: '1152 / 928',
                                        margin: 0,
                                        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5)'
                                    }}>
                                        <img src="assets/images/n2.png" alt="Neural Frontiers - Shot 2" className="visual-image" style={{ objectFit: 'cover' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* ═══════════════════════════════════════════════════════ */}
                {/* EXPERIENCE JOURNEY — Retro-Futuristic Creative OS        */}
                {/* ═══════════════════════════════════════════════════════ */}
                <section id="experience-journey">
                    <div className="container">
                        <div className="section-header xp-windows-header">
                            <h2 className="section-heading reveal-text">Experience Journey</h2>
                            <p className="section-desc reveal-text">A cinematic evolution from AI systems to immersive creative technology.</p>
                        </div>

                        <div className="xp-windows-container">

                            {/* ─── WINDOW 1: AdMitra (Fal.ai Inspired) ─── */}
                            <div className="xp-interface-window xp-window-fal reveal-item" data-theme="ai">
                                <div className="xp-window-header">
                                    <div className="xp-window-controls">
                                        <span></span><span></span><span></span>
                                    </div>
                                    <div className="xp-window-title">
                                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                        www.admitra.in
                                    </div>
                                </div>
                                <div className="xp-window-body">
                                    {/* AdMitra Navigation Sidebar */}
                                    <div className="xp-window-sidebar" style={{ width: '240px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'rgba(6, 6, 8, 0.85)' }}>
                                        <div className="xp-sidebar-brand" style={{ paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" style={{ display: 'block' }}>
                                                    <path d="M12 2L3 20H8.5L12 11.5L15.5 20H21L12 2Z" fill="#3B82F6" />
                                                    <path d="M12 11.5L9.5 16.5H14.5L12 11.5Z" fill="#1D4ED8" opacity="0.6" />
                                                </svg>
                                                <span style={{ fontSize: '16px', fontWeight: '800', letterSpacing: '1px', color: '#FFF', fontFamily: "'Space Grotesk', sans-serif" }}>
                                                    ADMITRA
                                                </span>
                                            </div>
                                        </div>
                                        <div className="xp-sidebar-nav" style={{ overflowY: 'auto', flex: '1', display: 'flex', flexDirection: 'column', gap: '4px', paddingRight: '4px' }}>

                                            {/* 1. Storyboard to Videos */}
                                            <div className="xp-nav-item active" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', color: '#3B82F6', background: 'rgba(59, 130, 246, 0.12)', fontWeight: '600', cursor: 'pointer' }}>
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ color: 'inherit' }}><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" /></svg>
                                                Storyboard to Videos
                                            </div>

                                            {/* 2. Storyboard to Posters */}
                                            <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ color: 'inherit' }}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm-4.44-6.19l-2.28 2.72-1.62-1.95L6.5 17h11l-3.94-4.19z" /></svg>
                                                Storyboard to Posters
                                            </div>

                                            {/* 3. Partner Marketing (Expanded Header) */}
                                            <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px 4px 12px', borderRadius: '6px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', fontWeight: '600', cursor: 'pointer' }}>
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                                                Partner Marketing
                                                <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none" style={{ marginLeft: 'auto', opacity: 0.6 }}><polyline points="18 15 12 9 6 15"></polyline></svg>
                                            </div>

                                            {/* Submenu Group for Partner Marketing */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', paddingLeft: '24px', marginBottom: '4px' }}>
                                                {/* Campaigns */}
                                                <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '5px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>
                                                    Campaigns
                                                </div>
                                                {/* Analytics */}
                                                <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '5px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                                                    Analytics
                                                </div>
                                            </div>

                                            {/* 4. Meta Marketing */}
                                            <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ color: 'inherit' }}><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" /></svg>
                                                Meta Marketing
                                            </div>

                                            {/* 5. Projects */}
                                            <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', cursor: 'pointer' }}>
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="13" height="13" rx="2" ry="2" /><rect x="8" y="8" width="13" height="13" rx="2" ry="2" opacity="0.6" /></svg>
                                                Projects
                                            </div>

                                            {/* 6. Your Brand (Header) */}
                                            <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 12px 4px 12px', borderRadius: '6px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', fontWeight: '600', marginTop: '8px' }}>
                                                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><line x1="9" y1="22" x2="9" y2="16" /><line x1="15" y1="22" x2="15" y2="16" /><line x1="9" y1="16" x2="15" y2="16" /><path d="M8 6h2v2H8V6zm4 0h2v2h-2V6zm-4 4h2v2H8v-2zm4 0h2v2h-2v-2z" /></svg>
                                                Your Brand
                                                <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none" style={{ marginLeft: 'auto', opacity: 0.6 }}><polyline points="18 15 12 9 6 15"></polyline></svg>
                                            </div>

                                            {/* Submenu Group for Your Brand */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', paddingLeft: '24px' }}>
                                                {/* Products */}
                                                <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '5px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2" ry="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="3" y1="14" x2="21" y2="14" /><rect x="9" y="6" width="6" height="2" rx="0.5" /></svg>
                                                    Products
                                                </div>
                                                {/* Target Audience */}
                                                <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '5px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                                    Target Audience
                                                </div>
                                                {/* Brand Kits */}
                                                <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '5px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
                                                    Brand Kits
                                                </div>
                                                {/* Environments */}
                                                <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '5px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 20 9 10 13 16 16 11 21 20 3 20" /></svg>
                                                    Environments
                                                </div>
                                                {/* Avatars */}
                                                <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '5px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
                                                    Avatars
                                                </div>
                                                {/* Voices */}
                                                <div className="xp-nav-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', borderRadius: '5px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
                                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" /><path d="M19 10v1a7 7 0 0 1-14 0v-1" /><line x1="12" y1="18" x2="12" y2="22" /></svg>
                                                    Voices
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* AdMitra Workspace Main Dashboard */}
                                    <div className="xp-window-main">
                                        {/* Left Side: Professional Experience Details & Clients */}
                                        <div className="xp-left-pane">
                                            <div>
                                                <div className="xp-main-header" style={{ marginBottom: '16px' }}>
                                                    <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#fff', marginBottom: '6px' }}>Generative AI Intern</h3>
                                                    <p style={{ fontSize: '0.85rem', color: '#3B82F6', fontFamily: 'monospace', fontWeight: '600' }}>
                                                        Bengaluru · AdMitra Pvt. Ltd. &nbsp;|&nbsp; <span style={{ color: 'rgba(255,255,255,0.5)' }}>February 2026 – May 2026</span>
                                                    </p>
                                                </div>
                                                <div className="xp-main-desc" style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.75)' }}>
                                                    <p style={{ marginBottom: '14px' }}>Led end-to-end AI-powered creative operations for hyperlocal advertising campaigns across video and poster formats at scale. Translated brand strategy into structured storyboards, localized narratives, and multi-language AI-generated campaign assets.</p>
                                                    <p>Managed high-volume creative production workflows delivering 100+ localized creatives monthly. Collaborated directly with founders and brand stakeholders to streamline campaign execution.</p>
                                                </div>
                                            </div>

                                            {/* Key Clients logos bar embedded in details */}
                                            <div className="xp-client-brands" style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                                <p className="xp-brands-title" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '1.5px', marginBottom: '10px' }}>
                                                    KEY CAMPAIGN CLIENTS
                                                </p>
                                                <div className="xp-brands-logos" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                                    <div className="xp-brand-logo-btn" style={{ borderColor: 'rgba(59, 130, 246, 0.2)', background: 'rgba(59, 130, 246, 0.05)' }}>
                                                        <img src="https://logo.clearbit.com/montraelectric.com" onError={(e) => { e.target.style.display = 'none'; }} className="xp-brand-logo-btn-icon" alt="Montra Electric" />
                                                        <span style={{ color: '#FFF' }}>Montra Electric</span>
                                                    </div>
                                                    <div className="xp-brand-logo-btn" style={{ borderColor: 'rgba(59, 130, 246, 0.2)', background: 'rgba(59, 130, 246, 0.05)' }}>
                                                        <img src="https://logo.clearbit.com/amperevehicles.com" onError={(e) => { e.target.style.display = 'none'; }} className="xp-brand-logo-btn-icon" alt="Ampere Electric" />
                                                        <span style={{ color: '#FFF' }}>Ampere Electric</span>
                                                    </div>
                                                    <div className="xp-brand-logo-btn" style={{ borderColor: 'rgba(59, 130, 246, 0.2)', background: 'rgba(59, 130, 246, 0.05)' }}>
                                                        <img src="https://logo.clearbit.com/lincolnpharma.com" onError={(e) => { e.target.style.display = 'none'; }} className="xp-brand-logo-btn-icon" alt="Lincoln Pharma" />
                                                        <span style={{ color: '#FFF' }}>Lincoln Pharma</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side: High-fidelity Hyperlocal Targeting telemetry (demographic indicator) */}
                                        <div style={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '20px' }}>
                                            <div className="xp-floating-panel" style={{
                                                width: '100%',
                                                maxWidth: '340px',
                                                background: 'rgba(6, 6, 8, 0.65)',
                                                backdropFilter: 'blur(20px)',
                                                border: '1px solid rgba(59, 130, 246, 0.25)',
                                                borderRadius: '12px',
                                                padding: '24px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '20px',
                                                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}>
                                                {/* Header / Telemetry scanner active status */}
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div style={{ color: '#3B82F6', fontWeight: '800', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                                        <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 10px #3B82F6', animation: 'pulse 1.5s infinite' }}></span>
                                                        Hyperlocal Engine
                                                    </div>
                                                    <span style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'monospace' }}>SYS_ACTIVE</span>
                                                </div>

                                                 {/* Toggle buttons for Videos / Posters */}
                                                 <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
                                                     <button 
                                                         onClick={() => { setCreativeType('video'); setCreativeIdx(0); }} 
                                                         style={{ 
                                                             flex: 1, 
                                                             background: creativeType === 'video' ? 'rgba(59, 130, 246, 0.2)' : 'transparent', 
                                                             border: creativeType === 'video' ? '1px solid #3B82F6' : '1px solid rgba(255,255,255,0.1)', 
                                                             borderRadius: '6px', 
                                                             padding: '6px 12px', 
                                                             color: '#fff', 
                                                             fontSize: '0.7rem', 
                                                             fontWeight: '600', 
                                                             cursor: 'pointer',
                                                             transition: 'all 0.3s ease',
                                                             boxShadow: creativeType === 'video' ? '0 0 10px rgba(59, 130, 246, 0.3)' : 'none'
                                                         }}
                                                     >
                                                         Video Ads (9:16)
                                                     </button>
                                                     <button 
                                                         onClick={() => { setCreativeType('poster'); setCreativeIdx(0); }} 
                                                         style={{ 
                                                             flex: 1, 
                                                             background: creativeType === 'poster' ? 'rgba(59, 130, 246, 0.2)' : 'transparent', 
                                                             border: creativeType === 'poster' ? '1px solid #3B82F6' : '1px solid rgba(255,255,255,0.1)', 
                                                             borderRadius: '6px', 
                                                             padding: '6px 12px', 
                                                             color: '#fff', 
                                                             fontSize: '0.7rem', 
                                                             fontWeight: '600', 
                                                             cursor: 'pointer',
                                                             transition: 'all 0.3s ease',
                                                             boxShadow: creativeType === 'poster' ? '0 0 10px rgba(59, 130, 246, 0.3)' : 'none'
                                                         }}
                                                     >
                                                         Poster Ads (4:5)
                                                     </button>
                                                 </div>

                                                 {/* Interactive Creative Previewer Viewport */}
                                                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                                     {(() => {
                                                         const currentCreative = creativeType === 'video' ? mockVideos[creativeIdx] : mockPosters[creativeIdx];
                                                         return (
                                                             <>
                                                                 <div style={{
                                                                     width: creativeType === 'video' ? '125px' : '150px',
                                                                     aspectRatio: creativeType === 'video' ? '9/16' : '4/5',
                                                                     background: currentCreative.bg,
                                                                     borderRadius: '12px',
                                                                     border: '2px solid rgba(255, 255, 255, 0.15)',
                                                                     boxShadow: '0 8px 24px rgba(0,0,0,0.6), inset 0 0 15px rgba(255,255,255,0.15)',
                                                                     position: 'relative',
                                                                     overflow: 'hidden',
                                                                     display: 'flex',
                                                                     flexDirection: 'column',
                                                                     justifyContent: 'center',
                                                                     alignItems: 'center',
                                                                     padding: '16px',
                                                                     transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                                                 }}>
                                                                     {/* Creative Icon & Content */}
                                                                     <div style={{ textAlign: 'center' }}>
                                                                         <div style={{ fontSize: creativeType === 'video' ? '2rem' : '1.8rem', marginBottom: '8px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}>
                                                                             {creativeType === 'video' ? currentCreative.icon : '✨'}
                                                                         </div>
                                                                         <h5 style={{ color: '#fff', fontSize: '0.8rem', fontWeight: '800', margin: '0 0 4px 0', textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
                                                                             {currentCreative.title}
                                                                         </h5>
                                                                         <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.6rem', margin: 0, lineHeight: '1.3', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                                                                             {creativeType === 'video' ? currentCreative.subtitle : currentCreative.desc}
                                                                         </p>
                                                                     </div>
                                                                 </div>

                                                                 {/* Creative arrow selector controls */}
                                                                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                                                                     <button 
                                                                         onClick={() => setCreativeIdx((prev) => (prev - 1 + 3) % 3)}
                                                                         style={{
                                                                             background: 'rgba(255,255,255,0.05)',
                                                                             border: '1px solid rgba(255,255,255,0.1)',
                                                                             borderRadius: '50%',
                                                                             width: '26px',
                                                                             height: '26px',
                                                                             display: 'flex',
                                                                             alignItems: 'center',
                                                                             justifyContent: 'center',
                                                                             color: '#fff',
                                                                             cursor: 'pointer',
                                                                             transition: 'all 0.2s',
                                                                         }}
                                                                         onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'; e.currentTarget.style.borderColor = '#3B82F6'; }}
                                                                         onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                                                                     >
                                                                         <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                                                     </button>

                                                                     <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace', fontWeight: 'bold', minWidth: '85px', textAlign: 'center' }}>
                                                                         CREATIVE {creativeIdx + 1}
                                                                     </span>

                                                                     <button 
                                                                         onClick={() => setCreativeIdx((prev) => (prev + 1) % 3)}
                                                                         style={{
                                                                             background: 'rgba(255,255,255,0.05)',
                                                                             border: '1px solid rgba(255,255,255,0.1)',
                                                                             borderRadius: '50%',
                                                                             width: '26px',
                                                                             height: '26px',
                                                                             display: 'flex',
                                                                             alignItems: 'center',
                                                                             justifyContent: 'center',
                                                                             color: '#fff',
                                                                             cursor: 'pointer',
                                                                             transition: 'all 0.2s',
                                                                         }}
                                                                         onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)'; e.currentTarget.style.borderColor = '#3B82F6'; }}
                                                                         onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                                                                     >
                                                                         <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                                                     </button>
                                                                 </div>
                                                             </>
                                                         );
                                                     })()}
                                                 </div>

                                                {/* Location & Language Grid */}
                                                <div style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: '1.2fr 0.8fr',
                                                    gap: '16px',
                                                    borderTop: '1px solid rgba(255,255,255,0.08)',
                                                    paddingTop: '16px'
                                                }}>
                                                    <div>
                                                        <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', letterSpacing: '0.8px', marginBottom: '4px' }}>Target Location</span>
                                                        <span style={{ fontSize: '1rem', color: '#FFF', fontWeight: '700', display: 'block' }}>{locations[locIdx].city}</span>
                                                    </div>
                                                    <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '16px' }}>
                                                        <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', display: 'block', letterSpacing: '0.8px', marginBottom: '4px' }}>Local Dialect</span>
                                                        <span style={{ fontSize: '1rem', color: '#3B82F6', fontWeight: '800', display: 'block' }}>{locations[locIdx].lang}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ─── WINDOW 2: Freelance (DaVinci Resolve Inspired) ─── */}
                            <div className="xp-interface-window xp-window-davinci reveal-item" data-theme="video">
                                <div className="xp-window-header">
                                    <div className="xp-window-controls"><span></span><span></span><span></span></div>
                                    <div className="xp-window-title">
                                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                                        Freelance_Edits.drp
                                    </div>
                                </div>
                                <div className="xp-window-body">
                                    <div className="xp-window-top">
                                        <div className="xp-media-pool">
                                            <h4><svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line></svg> Media Pool</h4>
                                            <div className="xp-pool-grid">
                                                <div className="xp-pool-item xp-pool-placeholder"><span>Drop media</span></div>
                                                <div className="xp-pool-item xp-pool-placeholder"><span>Drop media</span></div>
                                                <div className="xp-pool-item xp-pool-placeholder"><span>Drop media</span></div>
                                                <div className="xp-pool-item xp-pool-placeholder"><span>Drop media</span></div>
                                                <div className="xp-pool-item xp-pool-placeholder"><span>Drop media</span></div>
                                                <div className="xp-pool-item xp-pool-placeholder"><span>Drop media</span></div>
                                            </div>
                                        </div>
                                        <div className="xp-preview-monitor">
                                            <div className="xp-monitor-inner">
                                                <h3>Freelance Video Editor</h3>
                                                <p>Independent · Remote</p>
                                                <div className="xp-monitor-desc">
                                                    <p>Crafted cinematic edits, short-form storytelling, and motion-heavy social content for diverse digital platforms. Engineered customized workflows focusing on audience retention and high-fidelity output.</p>
                                                </div>
                                            </div>
                                            <div className="xp-monitor-controls">
                                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><polygon points="11 19 2 12 11 5 11 19"></polygon><polygon points="22 19 13 12 22 5 22 19"></polygon></svg>
                                                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><polygon points="13 19 22 12 13 5 13 19"></polygon><polygon points="2 19 11 12 2 5 2 19"></polygon></svg>
                                            </div>
                                        </div>
                                        <div className="xp-inspector">
                                            <h4>
                                                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                                Inspector
                                            </h4>
                                            <div className="xp-slider-group">
                                                <label>Retention</label><div className="xp-slider"><div className="xp-slider-fill" style={{ width: '90%' }}></div></div>
                                            </div>
                                            <div className="xp-slider-group">
                                                <label>Cinematic</label><div className="xp-slider"><div className="xp-slider-fill" style={{ width: '85%' }}></div></div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* DaVinci-style multi-track timeline */}
                                    <div className="xp-window-timeline xp-dvr-timeline">
                                        <div className="xp-timeline-header">
                                            <span className="xp-tc">01:00:39:02</span>
                                            <div className="xp-dvr-tabs">
                                                <span>Media</span><span className="active">Edit</span><span>Color</span><span>Fairlight</span><span>Deliver</span>
                                            </div>
                                        </div>
                                        <div className="xp-dvr-tracks">
                                            <div className="xp-dvr-labels">
                                                <span>V4</span><span>V3</span><span>V2</span><span>V1</span><span>A1</span><span>A2</span><span>A3</span>
                                            </div>
                                            <div className="xp-dvr-track-area">
                                                <div className="xp-dvr-row"><div className="xp-clip xp-clip-gray" style={{ left: '8%', width: '4%' }}></div><div className="xp-clip xp-clip-gray" style={{ left: '14%', width: '3%' }}></div></div>
                                                <div className="xp-dvr-row"><div className="xp-clip xp-clip-purple" style={{ left: '30%', width: '12%' }}>TRI...</div><div className="xp-clip xp-clip-purple" style={{ left: '44%', width: '8%' }}>ap...</div><div className="xp-clip xp-clip-purple" style={{ left: '54%', width: '8%' }}>TRI-8</div></div>
                                                <div className="xp-dvr-row"><div className="xp-clip xp-clip-teal" style={{ left: '24%', width: '10%' }}>Tra...</div><div className="xp-clip xp-clip-teal" style={{ left: '36%', width: '8%' }}>Tex...</div><div className="xp-clip xp-clip-teal" style={{ left: '46%', width: '6%' }}>Inst</div><div className="xp-clip xp-clip-teal" style={{ left: '54%', width: '6%' }}>TRI-8</div></div>
                                                <div className="xp-dvr-row"><div className="xp-clip xp-clip-blue" style={{ left: '2%', width: '18%' }}>P100...</div><div className="xp-clip xp-clip-blue" style={{ left: '22%', width: '6%' }}>P1...</div><div className="xp-clip xp-clip-blue" style={{ left: '30%', width: '6%' }}>P100</div><div className="xp-clip xp-clip-blue" style={{ left: '38%', width: '6%' }}>P...</div><div className="xp-clip xp-clip-lblue" style={{ left: '46%', width: '18%' }}>Gradient BG</div><div className="xp-clip xp-clip-blue" style={{ left: '66%', width: '8%' }}>P1000141</div><div className="xp-clip xp-clip-blue" style={{ left: '76%', width: '20%' }}>P1000159</div></div>
                                                <div className="xp-dvr-row xp-dvr-audio"><div className="xp-clip xp-clip-agreen" style={{ left: '2%', width: '12%' }}></div><div className="xp-clip xp-clip-agreen" style={{ left: '76%', width: '20%' }}></div></div>
                                                <div className="xp-dvr-row xp-dvr-audio"><div className="xp-clip xp-clip-agreen" style={{ left: '16%', width: '8%' }}></div><div className="xp-clip xp-clip-agreen" style={{ left: '26%', width: '6%' }}></div><div className="xp-clip xp-clip-agreen" style={{ left: '34%', width: '4%' }}></div><div className="xp-clip xp-clip-agreen" style={{ left: '40%', width: '4%' }}></div><div className="xp-clip xp-clip-agreen" style={{ left: '46%', width: '4%' }}></div><div className="xp-clip xp-clip-agreen" style={{ left: '52%', width: '4%' }}></div><div className="xp-clip xp-clip-agreen" style={{ left: '58%', width: '6%' }}></div><div className="xp-clip xp-clip-agreen" style={{ left: '66%', width: '8%' }}></div></div>
                                                <div className="xp-dvr-row xp-dvr-audio"><div className="xp-clip xp-clip-dgreen" style={{ left: '2%', width: '12%' }}>Tri-8 Open</div><div className="xp-clip xp-clip-dgreen" style={{ left: '16%', width: '16%' }}>Gazing Out</div><div className="xp-clip xp-clip-dgreen" style={{ left: '34%', width: '30%' }}>All That Was</div><div className="xp-clip xp-clip-dgreen" style={{ left: '66%', width: '30%' }}>Fooled Again V2</div></div>
                                                <div className="xp-dvr-scrubber"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ─── WINDOW 3: Snap AR (Lens Studio Inspired) ─── */}
                            <div className="xp-interface-window xp-window-lens reveal-item" data-theme="ar">
                                <div className="xp-window-header">
                                    <div className="xp-window-controls">
                                        <span></span><span></span><span></span>
                                    </div>
                                    <div className="xp-window-title">
                                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19c0-2.21 2.239-4 5-4s5 1.79 5 4v1.662"></path></svg>
                                        Snap_AR_Creator.lsproj
                                    </div>
                                </div>
                                <div className="xp-window-body">
                                    <div className="xp-window-sidebar xp-hierarchy">
                                        <div className="xp-snap-brand">
                                            <img src="https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg" alt="Snapchat" width="32" height="32" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
                                        </div>
                                        <h4>Objects</h4>
                                        <ul>
                                            <li><svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" style={{ display: 'inline', marginRight: '6px' }}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg> Camera</li>
                                            <li><svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" style={{ display: 'inline', marginRight: '6px' }}><circle cx="12" cy="12" r="4"></circle><path d="M2 12h3M19 12h3M12 2v3M12 19v3"></path></svg> Face Mesh <span></span></li>
                                            <li><svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" style={{ display: 'inline', marginRight: '6px' }}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline></svg> Holographic <span></span></li>
                                        </ul>
                                    </div>
                                    <div className="xp-window-main xp-3d-viewport">
                                        <div className="xp-snap-camera-frame">
                                            <div className="xp-snap-camera-inner">
                                                <svg viewBox="0 0 24 24" width="32" height="32" stroke="rgba(255,234,77,0.3)" strokeWidth="1.5" fill="none"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                                                <span className="xp-snap-label">Lens Preview</span>
                                            </div>
                                            <div className="xp-snap-corner tl"></div>
                                            <div className="xp-snap-corner tr"></div>
                                            <div className="xp-snap-corner bl"></div>
                                            <div className="xp-snap-corner br"></div>
                                        </div>
                                        <div className="xp-viewport-overlay">
                                            <h3>Snap AR Lens Creator</h3>
                                            <p>Snap Inc. · Creator Program</p>
                                            <div className="xp-viewport-desc">
                                                <p>Pioneered interactive AR experiences through Snap's Lens Studio. Leveraged spatial computing and face-tracking to design immersive lenses.</p>
                                            </div>
                                        </div>
                                        <canvas className="xp-node-canvas" data-theme="ar-holographic"></canvas>
                                    </div>
                                    <div className="xp-window-sidebar xp-inspector">
                                        <h4>Components</h4>
                                        <div className="xp-comp-box"><svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" style={{ display: 'inline', marginRight: '4px' }}><circle cx="12" cy="12" r="4"></circle><path d="M2 12h3M19 12h3"></path></svg> Face Tracker</div>
                                        <div className="xp-comp-box"><svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" style={{ display: 'inline', marginRight: '4px' }}><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline></svg> GenAI Material</div>
                                        <div className="xp-comp-box"><svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" style={{ display: 'inline', marginRight: '4px' }}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> Script</div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                {/* 8. Certifications */}
                <section id="certs">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-heading reveal-text">Certifications</h2>
                            <p className="section-desc reveal-text">Professionally verified credentials in AI and Creative
                                Technology.</p>
                        </div>
                        <div className="cert-grid reveal-item">
                            <div className="cert-card">
                                <div className="cert-logo-wrapper">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                                        alt="Google Logo" className="cert-provider-logo"
                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }} />
                                    <div className="logo-fallback" style={{ display: 'none' }}>G</div>
                                </div>
                                <div className="cert-content">
                                    <div className="cert-main">
                                        <span>Google</span>
                                        <h4>AI Essentials</h4>
                                        <p>Specialized in generative AI workflows, prompt engineering, and ethical
                                            implementation.</p>
                                    </div>
                                    <div className="cert-footer">
                                        <a href="https://coursera.org/verify/professional-cert/FYMT0W2FGSDM" target="_blank"
                                            className="cert-btn">View Credential ↗</a>
                                    </div>
                                </div>
                                <div className="cert-bg-preview">
                                    <img src="assets/images/cert-google.png" alt="Google Certificate Preview" />
                                </div>
                            </div>

                            <div className="cert-card">
                                <div className="cert-logo-wrapper">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ed/University_of_Michigan_Logo.png"
                                        alt="U-Michigan Logo" className="cert-provider-logo"
                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }} />
                                    <div className="logo-fallback" style={{ display: 'none' }}>M</div>
                                </div>
                                <div className="cert-content">
                                    <div className="cert-main">
                                        <span>University of Michigan</span>
                                        <h4>AI Basics and Tools for Creativity</h4>
                                        <p>Exploration of latent diffusion models and the intersection of creative research and
                                            AI.</p>
                                    </div>
                                    <div className="cert-footer">
                                        <a href="https://coursera.org/verify/O0S4GJF3H4BS" target="_blank" className="cert-btn">View
                                            Credential ↗</a>
                                    </div>
                                </div>
                                <div className="cert-bg-preview">
                                    <img src="assets/images/cert-michigan.png" alt="U-Michigan Certificate Preview" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* 11. Contact Section */}
                <section id="contact">
                    <div className="container">
                        <p className="contact-label reveal-text">Start a Conversation</p>
                        <a href="mailto:hello@karthikgraj.in" className="contact-mail reveal-text">hello@karthikgraj.in</a>
                    </div>
                </section>
            </main>

            <footer>
                <div className="container">
                    <p>© 2026 KARTHIK G RAJ // GEN AI VISUAL DIRECTOR</p>
                </div>
            </footer>



        </>
    );
}
