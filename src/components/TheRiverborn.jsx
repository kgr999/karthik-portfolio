import React, { useRef, useState, useEffect } from 'react';
import './TheRiverborn.css';

export default function TheRiverborn() {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [activeEp, setActiveEp] = useState(1);
    const [isNearViewport, setIsNearViewport] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    
    const episodes = [
        {
            id: 1,
            numLabel: "EPISODE 01",
            title: "The Awakening",
            duration: "01:24",
            status: "Playing",
            videoSrc: "/assets/videos/rb_ep1.MP4",
            thumbSrc: "/assets/images/rb_poster.webp",
            isLocked: false
        },
        {
            id: 2,
            numLabel: "EPISODE 02",
            title: "Ancient Currents",
            duration: "02:15",
            status: "Rendering",
            isLocked: true
        },
        {
            id: 3,
            numLabel: "EPISODE 03",
            title: "Whispers of the Deep",
            duration: "--:--",
            status: "In Storyboard",
            isLocked: true
        },
        {
            id: 4,
            numLabel: "EPISODE 04",
            title: "Rituals of Clay",
            duration: "--:--",
            status: "Planned",
            isLocked: true
        },
        {
            id: 5,
            numLabel: "EPISODE 05",
            title: "The Silent Silt",
            duration: "--:--",
            status: "Planned",
            isLocked: true
        },
        {
            id: 6,
            numLabel: "EPISODE 06",
            title: "Riverborn Legacy",
            duration: "--:--",
            status: "Planned",
            isLocked: true
        }
    ];

    const currentEpisode = episodes.find(ep => ep.id === activeEp) || episodes[0];

    // Handle play/pause toggle
    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(err => {
                console.log("Play failed:", err);
            });
        }
    };

    // Smooth volume fade transition
    const fadeVolume = (targetVolume, duration = 400) => {
        if (!videoRef.current) return;
        const startVolume = videoRef.current.volume;
        const steps = 10;
        const intervalTime = duration / steps;
        const volumeStep = (targetVolume - startVolume) / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            if (!videoRef.current) {
                clearInterval(timer);
                return;
            }
            videoRef.current.volume = Math.max(0, Math.min(1, videoRef.current.volume + volumeStep));
            currentStep++;
            if (currentStep >= steps) {
                videoRef.current.volume = targetVolume;
                clearInterval(timer);
            }
        }, intervalTime);
    };

    // Toggle mute/unmute
    const toggleMute = (e) => {
        e.stopPropagation(); // Avoid triggering video play/pause
        if (!videoRef.current) return;
        
        if (isMuted) {
            // Unmute smoothly
            videoRef.current.muted = false;
            videoRef.current.volume = 0;
            fadeVolume(0.5, 300);
            setIsMuted(false);
        } else {
            // Mute smoothly then lock
            fadeVolume(0, 200);
            setTimeout(() => {
                if (videoRef.current) videoRef.current.muted = true;
            }, 200);
            setIsMuted(true);
        }
    };

    // Track video time progress
    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        const current = videoRef.current.currentTime;
        const total = videoRef.current.duration || 1;
        setProgress((current / total) * 100);
    };

    // Seek to a specific progress position (like Netflix slider)
    const handleSliderChange = (e) => {
        if (!videoRef.current) return;
        const newProgress = parseFloat(e.target.value);
        const duration = videoRef.current.duration || 0;
        if (duration > 0) {
            videoRef.current.currentTime = (newProgress / 100) * duration;
            setProgress(newProgress);
        }
    };

    // Hide controls on hover timeout
    useEffect(() => {
        if (!isPlaying) {
            setShowControls(true);
            return;
        }

        const timer = setTimeout(() => {
            setShowControls(false);
        }, 2200);

        return () => clearTimeout(timer);
    }, [isPlaying, showControls]);

    // Handle mouse movement to show controls
    const handleMouseMove = () => {
        setShowControls(true);
    };

    // Keep play state in sync
    useEffect(() => {
        if (videoRef.current) {
            setIsPlaying(!videoRef.current.paused);
            setIsMuted(videoRef.current.muted);
        }
    }, [activeEp]);

    // Pause video when scrolled out of view to optimize performance and save CPU
    useEffect(() => {
        const videoEl = videoRef.current;
        if (!videoEl) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting && !videoEl.paused) {
                    videoEl.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(videoEl);
        return () => {
            if (videoEl) observer.unobserve(videoEl);
        };
    }, []);

    // Check if section is scrolled near viewport to pre-buffer the video
    useEffect(() => {
        const videoEl = videoRef.current;
        if (!videoEl) return;

        const loadObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsNearViewport(true);
                }
            },
            { 
                rootMargin: '350px', // Pre-load 350px before entering viewport
                threshold: 0.01 
            }
        );

        loadObserver.observe(videoEl);
        return () => {
            if (videoEl) loadObserver.unobserve(videoEl);
        };
    }, []);

    return (
        <section id="active-projects" className="rb-section">
            <div className="rb-ambient-glow"></div>
            
            <div className="rb-container">
                <div className="section-header text-center" style={{ marginBottom: '50px' }}>
                    <span className="section-subtitle" style={{ display: 'block', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
                        Personal AI Microdrama Series
                    </span>
                    <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>
                        The Riverborn
                    </h2>
                </div>

                <div className="rb-grid">
                    {/* Column 1: Portrait Poster (Fully Seen) */}
                    <div className="rb-poster-col reveal-item">
                        <div className="rb-poster-wrapper">
                            <img 
                                src="/assets/images/rb_poster.webp" 
                                alt="The Riverborn AI Microdrama Poster" 
                                className="rb-poster-img"
                                width="400"
                                height="600"
                                loading="lazy"
                            />
                            <div className="rb-poster-overlay">
                                <span className="rb-poster-status">IN PRODUCTION</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Mobile App Player (Tadka/KukuTV Mockup) */}
                    <div className="rb-player-col reveal-item">
                        <div 
                            className="rb-phone-mockup"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => isPlaying && setShowControls(false)}
                            onClick={togglePlay}
                        >
                            <div className="rb-phone-island">
                                <div className="rb-phone-camera"></div>
                            </div>

                            <div className="rb-phone-screen">
                                <video
                                    ref={videoRef}
                                    src={isNearViewport ? currentEpisode.videoSrc : undefined}
                                    preload={isNearViewport ? "metadata" : "none"}
                                    className="rb-video"
                                    loop
                                    muted={isMuted}
                                    playsInline
                                    onTimeUpdate={handleTimeUpdate}
                                    onPlay={() => {
                                        setIsPlaying(true);
                                        setIsBuffering(false);
                                    }}
                                    onPause={() => setIsPlaying(false)}
                                    onWaiting={() => setIsBuffering(true)}
                                    onPlaying={() => setIsBuffering(false)}
                                    onCanPlay={() => setIsBuffering(false)}
                                />

                                {/* Cinematic Loading Spinner when buffering */}
                                {isBuffering && (
                                    <div className="rb-loading-spinner-container">
                                        <div className="rb-loading-spinner"></div>
                                    </div>
                                )}

                                {/* Big Center Play Button (when paused and not buffering) */}
                                {!isPlaying && !isBuffering && (
                                    <div className="rb-center-play">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                )}

                                {/* Phone overlay controls */}
                                <div className={`rb-phone-overlay ${showControls ? '' : 'hidden'}`}>
                                    <div className="rb-phone-overlay-top" style={{ justifyContent: 'flex-end' }}>
                                        <button className="rb-mute-btn" onClick={toggleMute} aria-label="Toggle sound">
                                            {isMuted ? (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                                    <path d="M9 9v6a3 3 0 0 0 3 3h1.586l4.707 4.707A1 1 0 0 0 20 22V4a1 1 0 0 0-1.707-.707L13.586 8H12a3 3 0 0 0-3 1z"></path>
                                                </svg>
                                            ) : (
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                                </svg>
                                            )}
                                        </button>
                                    </div>

                                    <div className="rb-phone-overlay-bottom">
                                        <span className="rb-episode-num">{currentEpisode.numLabel}</span>
                                        <span className="rb-episode-name">{currentEpisode.title}</span>
                                        <input 
                                            type="range"
                                            className="rb-phone-slider"
                                            aria-label="Episode playback progress"
                                            min="0"
                                            max="100"
                                            step="0.1"
                                            value={progress}
                                            onChange={handleSliderChange}
                                            onClick={(e) => e.stopPropagation()}
                                            style={{
                                                '--slider-progress': `${progress}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Series Info & Episodes Playlist */}
                    <div className="rb-info-col reveal-item">
                        <div className="rb-series-details">
                            <div className="rb-tags-row">
                                <span className="rb-tag accent-tag">AI MICRODRAMA</span>
                                <span className="rb-tag">MYTHO FICTION</span>
                                <span className="rb-tag">1080x1920 PORTRAIT</span>
                            </div>
                            
                            <p className="rb-desc">
                                A personal 6-episode mytho-fiction microdrama series imagined and written by me. Produced entirely through generative AI video pipelines, the project is actively in production.
                            </p>
                        </div>

                        <div className="rb-playlist-container">
                            <div className="rb-playlist-header">
                                <div className="rb-playlist-title">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#e50914' }}>
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="9" y1="3" x2="9" y2="21"></line>
                                        <line x1="15" y1="3" x2="15" y2="21"></line>
                                        <line x1="3" y1="9" x2="21" y2="9"></line>
                                        <line x1="3" y1="15" x2="21" y2="15"></line>
                                    </svg>
                                    <span>Episode Index</span>
                                </div>
                                <span className="rb-playlist-count">6 Episodes</span>
                            </div>

                            <div className="rb-episodes-feed">
                                {episodes.map((ep) => {
                                    const isActive = activeEp === ep.id;
                                    
                                    if (ep.isLocked) {
                                        return (
                                            <div key={ep.id} className="rb-ep-card locked">
                                                <div className="rb-ep-thumb-box">
                                                    <div className="rb-ep-thumb" style={{ background: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(255,255,255,0.15)' }}>
                                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                
                                                <div className="rb-ep-details">
                                                    <div className="rb-ep-header">
                                                        <span className="rb-ep-num-label">{ep.numLabel}</span>
                                                        <span className="rb-badge badge-locked">{ep.status}</span>
                                                    </div>
                                                    <span className="rb-ep-title">{ep.title}</span>
                                                </div>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div 
                                            key={ep.id} 
                                            className={`rb-ep-card ${isActive ? 'active' : ''}`}
                                            onClick={() => setActiveEp(ep.id)}
                                        >
                                            <div className="rb-ep-thumb-box">
                                                <img src={ep.thumbSrc} alt={ep.title} className="rb-ep-thumb" width="160" height="90" loading="lazy" />
                                                <div className="rb-ep-thumb-overlay">
                                                    {isActive ? (
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                            <rect x="6" y="4" width="4" height="16"></rect>
                                                            <rect x="14" y="4" width="4" height="16"></rect>
                                                        </svg>
                                                    ) : (
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                            <path d="M8 5v14l11-7z" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="rb-ep-details">
                                                <div className="rb-ep-header">
                                                    <span className="rb-ep-num-label">{ep.numLabel}</span>
                                                    {isActive ? (
                                                        <span className="rb-badge badge-playing">PLAYING</span>
                                                    ) : (
                                                        <span className="rb-ep-duration">{ep.duration}</span>
                                                    )}
                                                </div>
                                                <span className="rb-ep-title">{ep.title}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
