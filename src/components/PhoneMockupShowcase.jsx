import React, { useState, useRef } from 'react';
import './PhoneMockupShowcase.css';

const reels = [
    { id: 'yaksha', src: '/assets/videos/yaksha.MP4', poster: '/assets/images/yaksha_poster.png' },
    { id: 'tiger', src: '/assets/videos/tiger.MP4', poster: '/assets/images/tiger_poster.png' },
    { id: 'toxic', src: '/assets/videos/toxic.MP4', poster: '/assets/images/toxic_poster.png' },
];

function PhoneDevice({ reel, index }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const handlePlayPause = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play().catch(() => {});
            setIsPlaying(true);
        }
    };

    const handleVideoEnd = () => {
        setIsPlaying(false);
    };

    return (
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
                            src={reel.src}
                            poster={reel.poster}
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
                                aria-label={`Play reel ${index + 1}`}
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
                                aria-label={`Pause reel ${index + 1}`}
                            />
                        )}
                    </div>
                </div>

                <div className="phone-home-bar" />
            </div>

            <div className="phone-glow-shadow" />
        </div>
    );
}

export default function PhoneMockupShowcase() {
    return (
        <section id="phone-mockup-showcase" className="phone-mockup-section">
            <div className="container">
                <div className="phone-mockup-wrapper reveal-item">
                    {reels.map((reel, idx) => (
                        <PhoneDevice key={reel.id} reel={reel} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
