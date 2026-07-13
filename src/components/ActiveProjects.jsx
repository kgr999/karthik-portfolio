import React, { useRef, useState, useEffect } from 'react';

export default function ActiveProjects({ revealed = false }) {
    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);
    const [showVideo, setShowVideo] = useState(false);
    const [timecodes, setTimecodes] = useState(['00:00:00:00', '00:00:00:00']);

    useEffect(() => {
        if (!revealed) return;

        const timer = setTimeout(() => {
            setShowVideo(true);
            if (videoRef1.current) {
                videoRef1.current.play().catch(err => console.log("Video 1 play failed:", err));
            }
            if (videoRef2.current) {
                videoRef2.current.play().catch(err => console.log("Video 2 play failed:", err));
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [revealed]);

    // Live timecode counter once videos are playing
    useEffect(() => {
        if (!showVideo) return;
        const interval = setInterval(() => {
            const codes = [videoRef2, videoRef1].map(ref => {
                if (ref.current && !ref.current.paused) {
                    const t = ref.current.currentTime;
                    const h = String(Math.floor(t / 3600)).padStart(2, '0');
                    const m = String(Math.floor((t % 3600) / 60)).padStart(2, '0');
                    const s = String(Math.floor(t % 60)).padStart(2, '0');
                    const f = String(Math.floor((t % 1) * 24)).padStart(2, '0');
                    return `${h}:${m}:${s}:${f}`;
                }
                return '00:00:00:00';
            });
            setTimecodes(codes);
        }, 42); // ~24fps update rate
        return () => clearInterval(interval);
    }, [showVideo]);

    const activeProjects = [
        {
            id: 2,
            title: "Rain & Cookie",
            category: "AI Microdrama",
            styleTag: "3D Cartoon Style",
            status: "Animating",
            badge: "WIP // 3D PROD",
            statusColor: "#05FF99",
            statusColorOp: "rgba(5, 255, 153, 0.2)",
            cardGlow: "rgba(5, 255, 153, 0.06)",
            cardBorderHover: "rgba(5, 255, 153, 0.3)",
            imageSrc: "/assets/images/film2.webp",
            videoSrc: "/assets/videos/film2prev.mp4",
            ref: videoRef2,
            tcIndex: 0
        },
        {
            id: 1,
            title: "The Second Shift",
            category: "AI Microdrama",
            styleTag: "Realistic Fiction",
            status: "Generating",
            badge: "WIP // AI PROD",
            statusColor: "#EAB308",
            statusColorOp: "rgba(234, 179, 8, 0.2)",
            cardGlow: "rgba(234, 179, 8, 0.06)",
            cardBorderHover: "rgba(234, 179, 8, 0.3)",
            imageSrc: "/assets/images/film1.webp",
            videoSrc: "/assets/videos/film1prev.mp4",
            ref: videoRef1,
            tcIndex: 1
        }
    ];

    return (
        <section id="active-projects" className="ap-section">
            {/* Cinematic ambient background */}
            <div className="ap-ambient-layer">
                <div className="ap-ambient-flare ap-flare-1"></div>
                <div className="ap-ambient-flare ap-flare-2"></div>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 5 }}>
                {/* Section Heading */}
                <div className="ap-section-heading">
                    <span className="ap-heading-eyebrow">What I'm Directing Right Now</span>
                    <h2 className="ap-heading-main section-heading reveal-text">Now in Production</h2>
                </div>

                {/* Film Slate Status Bar */}
                <div className="ap-slate-header">
                    <div className="ap-slate-left">
                        <div className="ap-slate-clapper">
                            <div className="ap-clapper-stripes">
                                <span></span><span></span><span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>
                    <div className="ap-slate-right">
                        <div className="ap-slate-meta-pill">
                            <span className="ap-rec-dot"></span>
                            <span className="ap-rec-text">IN PRODUCTION</span>
                        </div>
                    </div>
                </div>

                {/* Cinema Monitor Bay */}
                <div className="ap-monitor-bay">
                    {activeProjects.map((project, idx) => (
                        <div
                            key={project.id}
                            className="ap-monitor-unit"
                            style={{
                                '--theme-color': project.statusColor,
                                '--theme-color-op': project.statusColorOp,
                                '--card-glow': project.cardGlow,
                                '--card-border-hover': project.cardBorderHover
                            }}
                        >
                            {/* Monitor Viewport */}
                            <div className="ap-viewport">
                                {/* Film grain overlay */}
                                <div className="ap-film-grain"></div>

                                {/* Scanline overlay */}
                                <div className="ap-scanlines"></div>

                                {/* Letterbox bars */}
                                <div className={`ap-letterbox ap-letterbox-top ${showVideo ? 'ap-letterbox-retract' : ''}`}></div>
                                <div className={`ap-letterbox ap-letterbox-bottom ${showVideo ? 'ap-letterbox-retract' : ''}`}></div>

                                {/* Preview Image */}
                                <img
                                    src={project.imageSrc}
                                    alt={project.title}
                                    className={`ap-preview-img ${showVideo ? 'ap-preview-fadeout' : ''}`}
                                    width="600"
                                    height="350"
                                    loading="lazy"
                                    decoding="async"
                                />

                                {/* Video */}
                                <video
                                    ref={project.ref}
                                    src={project.videoSrc}
                                    loop
                                    muted
                                    playsInline
                                    className="ap-viewport-video"
                                />

                                {/* Vignette */}
                                <div className="ap-vignette"></div>

                                {/* Anamorphic lens flare */}
                                <div className="ap-lens-flare"></div>

                                {/* Corner Registration Marks */}
                                <div className="ap-reg-mark ap-reg-tl"></div>
                                <div className="ap-reg-mark ap-reg-tr"></div>
                                <div className="ap-reg-mark ap-reg-bl"></div>
                                <div className="ap-reg-mark ap-reg-br"></div>

                                {/* HUD Overlays */}

                                <div className="ap-hud-bottom">
                                    <div className="ap-hud-tc">{timecodes[project.tcIndex]}</div>
                                    <div className="ap-hud-status-pill">
                                        <span className="ap-hud-status-dot"></span>
                                        <span>{project.status}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Monitor Bezel Info Strip */}
                            <div className="ap-bezel-strip">
                                <div className="ap-bezel-info">
                                    <div className="ap-bezel-meta">
                                        <span className="ap-bezel-category">{project.category}</span>
                                        <span className="ap-bezel-style">// {project.styleTag}</span>
                                    </div>
                                    <h3 className="ap-bezel-title">{project.title}</h3>
                                </div>
                                <div className="ap-bezel-badge">
                                    <span className="ap-badge-pulse-dot"></span>
                                    <span className="ap-badge-text">{project.badge}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
