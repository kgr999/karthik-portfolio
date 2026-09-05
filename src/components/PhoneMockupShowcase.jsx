import React, { useState, useRef, useEffect } from 'react';
import './PhoneMockupShowcase.css';

const reels = [
    { id: 'tiger', src: '/assets/videos/tiger.MP4', poster: '/assets/images/tiger_poster.png' },
    { id: 'yaksha', src: '/assets/videos/yaksha.MP4', poster: '/assets/images/yaksha_poster.png' },
    { id: 'toxic', src: '/assets/videos/toxic.MP4', poster: '/assets/images/toxic_poster.png' },
];

export default function PhoneMockupShowcase() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);
    const thumbRefs = useRef([]);

    useEffect(() => {
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            videoRef.current.load();
        }
        if (thumbRefs.current[activeIdx]) {
            thumbRefs.current[activeIdx].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest',
            });
        }
    }, [activeIdx]);

    const handlePlayPause = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play().catch(() => { });
            setIsPlaying(true);
        }
    };

    const handleVideoEnd = () => {
        setIsPlaying(false);
        setActiveIdx(prev => (prev + 1) % reels.length);
    };

    const active = reels[activeIdx];

    return (
        <section id="phone-mockup-showcase" className="phone-mockup-section">
            <div className="container">
                <div className="phone-mockup-wrapper reveal-item">

                    {/* ── Left: Thumbnail Reel Stack ── */}
                    <div className="phone-reel-stack" data-lenis-prevent>
                        {reels.map((reel, idx) => (
                            <button
                                key={reel.id}
                                ref={el => thumbRefs.current[idx] = el}
                                className={`phone-reel-thumb ${idx === activeIdx ? 'is-active' : ''}`}
                                onClick={() => setActiveIdx(idx)}
                                aria-label={`Play reel ${idx + 1}`}
                            >
                                <img src={reel.poster} alt={`Reel ${idx + 1}`} loading="lazy" decoding="async" />
                                <div className="phone-reel-thumb-overlay">
                                    <span className="phone-reel-num">{String(idx + 1).padStart(2, '0')}</span>
                                </div>
                                {idx === activeIdx && <div className="phone-reel-active-bar" />}
                            </button>
                        ))}
                    </div>

                    {/* ── Center: Phone Mockup ── */}
                    <div className="phone-mockup-device">
                        <div className="phone-shell">
                            <div className="phone-btn-vol-up" />
                            <div className="phone-btn-vol-down" />
                            <div className="phone-btn-power" />

                            <div className="phone-screen-bezel">
                                <div className="phone-dynamic-island" />

                                <div className="phone-screen">
                                    <video
                                        ref={videoRef}
                                        key={active.src}
                                        src={active.src}
                                        poster={active.poster}
                                        preload="none"
                                        playsInline
                                        loop={false}
                                        onEnded={handleVideoEnd}
                                        className="phone-screen-video"
                                    />

                                    {!isPlaying && (
                                        <button
                                            className="phone-play-overlay"
                                            onClick={handlePlayPause}
                                            aria-label="Play video"
                                        >
                                            <div className="phone-play-btn">
                                                <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                                                    <polygon points="8,5 19,12 8,19" />
                                                </svg>
                                            </div>
                                        </button>
                                    )}

                                    {isPlaying && (
                                        <button
                                            className="phone-pause-tap"
                                            onClick={handlePlayPause}
                                            aria-label="Pause video"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="phone-home-bar" />
                        </div>

                        <div className="phone-glow-shadow" />
                    </div>

                    {/* ── Right: Dot Navigator ── */}
                    <div className="phone-dot-nav">
                        {reels.map((_, idx) => (
                            <button
                                key={idx}
                                className={`phone-dot ${idx === activeIdx ? 'is-active' : ''}`}
                                onClick={() => setActiveIdx(idx)}
                                aria-label={`Go to reel ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
