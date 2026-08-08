import React, { useRef, useState, useEffect } from 'react';
import './AIMicrodramaShowcase.css';

/* ═══════════════════════════════════════════════════════════
   SHOW DATA — Multi-Show Streaming Catalog
   ═══════════════════════════════════════════════════════════ */
const SHOWS = [
    {
        id: 'brahmyodhha',
        title: 'BrahmYodhha',
        badge: 'PRODUCED',
        badgeType: 'produced',
        studioLabel: 'WOW TV',
        logoSrc: '/assets/images/kukutv-icon.webp',
        cardBgSrc: '/assets/images/by_thumb.jpg',
        posterSrc: null,
        totalCount: 45,
        tags: ['AI MICRODRAMA', 'PRODUCED END-TO-END'],
        description: "BrahmYodhha follows Kashyap, a young man residing in a tranquil village near Kashmir, who discovers his extraordinary destiny after inheriting a mystical divine trident gifted by his father.\n\n I handled pre-production and post-production for most of the episodes (excluding sound design) with Creative Producer approval for Kuku's WowTV unit.",
        status: 'IN PRODUCTION',
        episodes: [
            {
                id: 1,
                numLabel: 'EPISODE 01',
                title: 'Kaal Asur',
                duration: '02:12',
                status: 'Playing',
                videoSrc: '/assets/videos/ep1_by.mp4',
                thumbSrc: '/assets/images/by_thumb.jpg',
                isLocked: false
            }
        ]
    },
    {
        id: 'the-riverborn',
        title: 'The Riverborn',
        badge: 'INDEPENDENT',
        badgeType: 'independent',
        studioLabel: 'INDEPENDENT',
        cardBgSrc: '/assets/images/rb_poster.webp',
        posterSrc: '/assets/images/rb_poster.webp',
        tags: ['AI MICRODRAMA', 'MYTHO FICTION', '1080x1920 PORTRAIT'],
        description: 'An independent 6-episode mytho-fiction microdrama series imagined and written by me. Produced entirely through generative AI video pipelines, the project is actively in production.',
        status: 'IN PRODUCTION',
        episodes: [
            {
                id: 1,
                numLabel: 'EPISODE 01',
                title: 'The Awakening',
                duration: '01:11',
                status: 'Playing',
                videoSrc: '/assets/videos/rb_ep1.MP4',
                thumbSrc: '/assets/images/rb_poster.webp',
                isLocked: false
            },
            {
                id: 2,
                numLabel: 'EPISODE 02',
                title: 'Ancient Currents',
                duration: '02:15',
                status: 'Rendering',
                isLocked: true
            },
            {
                id: 3,
                numLabel: 'EPISODE 03',
                title: 'Whispers of the Deep',
                duration: '--:--',
                status: 'In Storyboard',
                isLocked: true
            },
            {
                id: 4,
                numLabel: 'EPISODE 04',
                title: 'Rituals of Clay',
                duration: '--:--',
                status: 'Planned',
                isLocked: true
            },
            {
                id: 5,
                numLabel: 'EPISODE 05',
                title: 'The Silent Silt',
                duration: '--:--',
                status: 'Planned',
                isLocked: true
            },
            {
                id: 6,
                numLabel: 'EPISODE 06',
                title: 'Riverborn Legacy',
                duration: '--:--',
                status: 'Planned',
                isLocked: true
            }
        ]
    },
    {
        id: 'sarbadal',
        title: 'Sarbadal',
        badge: 'PRODUCED',
        badgeType: 'produced',
        studioLabel: 'KUKU TV',
        logoSrc: '/assets/images/kukutv-logo.webp',
        cardBgSrc: '/assets/images/sb_thumb.jpg',
        posterSrc: null,
        totalCount: 52,
        tags: ['AI MICRODRAMA', 'PRODUCED END-TO-END'],
        description: "Sarbadal is an AI microdrama adaptation inspired by Thomas Mann’s classic German novella, \"The Transposed Heads\"\n\nHandled end-to-end production across pre-production and post-production (excluding sound design) under Creative Producer approval for Kuku TV",
        status: 'IN PRODUCTION',
        episodes: [
            {
                id: 1,
                numLabel: 'EPISODE 01',
                title: 'Bali Parichay',
                duration: '01:24',
                status: 'Playing',
                videoSrc: '/assets/videos/ep1_sb.MP4',
                thumbSrc: '/assets/images/sb_thumb.jpg',
                isLocked: false
            }
        ]
    }
];

export default function AIMicrodramaShowcase() {
    const videoRef = useRef(null);

    // Initial state set to null — player opens only after clicking a show button
    const [activeShowId, setActiveShowId] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const [activeEp, setActiveEp] = useState(1);
    const [isNearViewport, setIsNearViewport] = useState(false);
    const [isBuffering, setIsBuffering] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const activeShow = SHOWS.find(s => s.id === activeShowId) || null;
    const hasContent = activeShow ? activeShow.episodes.some(ep => !ep.isLocked && ep.videoSrc) : false;
    const currentEpisode = activeShow ? (activeShow.episodes.find(ep => ep.id === activeEp) || activeShow.episodes[0]) : null;

    // Switch show handler — opens the phone mockup & details when clicked
    const handleShowSwitch = (showId) => {
        if (showId === activeShowId) {
            if (videoRef.current) {
                if (videoRef.current.paused) {
                    togglePlay();
                } else {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            }
            return;
        }

        const targetShow = SHOWS.find(s => s.id === showId);
        if (!targetShow) return;

        if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
        }

        setIsTransitioning(true);
        setTimeout(() => {
            setActiveShowId(showId);
            setActiveEp(1);
            setProgress(0);
            setShowControls(true);
            setIsBuffering(false);
            setIsNearViewport(true);

            setTimeout(() => {
                setIsTransitioning(false);
                if (videoRef.current) {
                    videoRef.current.play().then(() => {
                        setIsPlaying(true);
                    }).catch(err => {
                        console.log("Autoplay on switch blocked, playing muted:", err);
                        if (videoRef.current) {
                            videoRef.current.muted = true;
                            setIsMuted(true);
                            videoRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log(e));
                        }
                    });
                }
            }, 100);
        }, 150);
    };

    // Handle play/pause toggle in-page
    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.muted = false;
            videoRef.current.volume = 0.5;
            setIsMuted(false);
            videoRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(err => {
                console.log("Play with sound failed, trying muted:", err);
                videoRef.current.muted = true;
                setIsMuted(true);
                videoRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch(e => console.log("Play failed:", e));
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
        e.stopPropagation();
        if (!videoRef.current) return;

        if (isMuted) {
            videoRef.current.muted = false;
            videoRef.current.volume = 0;
            fadeVolume(0.5, 300);
            setIsMuted(false);
        } else {
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

    // Seek to a specific progress position
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

    // Pause video when scrolled out of view
    useEffect(() => {
        const timeout = setTimeout(() => {
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
            videoRef._pauseObserver = { observer, el: videoEl };
        }, 100);

        return () => {
            clearTimeout(timeout);
            if (videoRef._pauseObserver) {
                videoRef._pauseObserver.observer.unobserve(videoRef._pauseObserver.el);
                videoRef._pauseObserver = null;
            }
        };
    }, [activeShowId, hasContent]);

    // Check if section is near viewport to pre-buffer
    useEffect(() => {
        const timeout = setTimeout(() => {
            const videoEl = videoRef.current;
            if (!videoEl) return;

            const loadObserver = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsNearViewport(true);
                    }
                },
                {
                    rootMargin: '350px',
                    threshold: 0.01
                }
            );

            loadObserver.observe(videoEl);
            videoRef._loadObserver = { observer: loadObserver, el: videoEl };
        }, 100);

        return () => {
            clearTimeout(timeout);
            if (videoRef._loadObserver) {
                videoRef._loadObserver.observer.unobserve(videoRef._loadObserver.el);
                videoRef._loadObserver = null;
            }
        };
    }, [activeShowId, hasContent]);

    return (
        <section id="active-projects" className="rb-section">
            <div className="rb-ambient-glow"></div>

            <div className="rb-container">
                {/* Section Header */}
                <div className="section-header text-center" style={{ marginBottom: '40px' }}>
                    <span className="section-subtitle" style={{ display: 'block', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
                        AI Microdrama Productions
                    </span>
                    <h2 className="section-heading reveal-text" style={{ marginBottom: '10px' }}>
                        {activeShow ? activeShow.title : 'Featured Showcase'}
                    </h2>
                </div>

                {/* ═══ Prominent Show Selector Navigation Cards ═══ */}
                <div className="rb-show-selector">
                    {SHOWS.map((show) => {
                        const isActive = show.id === activeShowId;
                        const showHasContent = show.episodes.some(ep => !ep.isLocked && ep.videoSrc);
                        const availableEps = show.episodes.filter(ep => !ep.isLocked).length;
                        const totalEps = show.totalCount || show.episodes.length;

                        return (
                            <button
                                key={show.id}
                                className={`rb-show-card ${isActive ? 'active' : ''} ${!showHasContent ? 'no-content' : ''}`}
                                onClick={() => handleShowSwitch(show.id)}
                                aria-label={`Select ${show.title}`}
                            >
                                {/* Poster Background or Gradient Fallback */}
                                <div className="rb-show-card-bg">
                                    {(show.cardBgSrc || show.posterSrc) ? (
                                        <img src={show.cardBgSrc || show.posterSrc} alt="" className="rb-show-card-poster" loading="lazy" />
                                    ) : (
                                        <div className="rb-show-card-gradient"></div>
                                    )}
                                    <div className="rb-card-play-orb">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                    <div className="rb-show-card-overlay"></div>
                                </div>

                                {/* Card Content */}
                                <div className="rb-show-card-content">
                                    <div className="rb-show-badge-row">
                                        {show.logoSrc ? (
                                            <img
                                                src={show.logoSrc}
                                                alt={`${show.studioLabel || show.title} Logo`}
                                                className={`rb-show-card-logo ${show.logoSrc.includes('kukutv-icon') ? 'icon-logo' : ''}`}
                                                loading="lazy"
                                            />
                                        ) : (
                                            <span className={`rb-show-badge ${show.badgeType}`}>{show.badge}</span>
                                        )}
                                    </div>
                                    <h3 className="rb-show-card-title">{show.title}</h3>
                                    <span className="rb-show-card-meta">
                                        {showHasContent
                                            ? `${availableEps} of ${totalEps} Episodes`
                                            : show.status
                                        }
                                    </span>
                                    {!isActive && (
                                        <span className="rb-show-card-cta">
                                            ▶ TAP TO PREVIEW
                                        </span>
                                    )}
                                </div>

                                {/* Active Indicator Bar */}
                                {isActive && <div className="rb-show-active-bar"></div>}
                            </button>
                        );
                    })}
                </div>

                {/* ═══ Main Streaming Player Stage (Reveals when a show is tapped) ═══ */}
                {activeShow ? (
                    <div className={`rb-show-content ${isTransitioning ? 'transitioning' : ''}`}>
                        {hasContent && currentEpisode ? (
                            <div className={`rb-grid ${!activeShow.posterSrc ? 'no-poster' : ''}`}>
                                {/* Left Column: Story & Premise (for BrahmYodhha & Sarbadal) */}
                                {!activeShow.posterSrc && (
                                    <div className="rb-story-col">
                                        <div className="rb-side-card">
                                            <div className="rb-card-header">
                                                <span className="rb-card-accent-line"></span>
                                                <span className="rb-card-category">STORY & PREMISE</span>
                                            </div>
                                            <div className="rb-tags-row" style={{ marginTop: '14px', marginBottom: '16px' }}>
                                                {activeShow.tags.map((tag, i) => (
                                                    <span key={i} className={`rb-tag ${i === 0 ? 'accent-tag' : ''}`}>{tag}</span>
                                                ))}
                                            </div>
                                            <p className="rb-desc">
                                                {activeShow.description.split('\n\n')[0]}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Column 1: Portrait Poster (only for shows with a 3D poster like The Riverborn) */}
                                {activeShow.posterSrc && (
                                    <div className="rb-poster-col">
                                        <div className="rb-poster-wrapper">
                                            <img
                                                src={activeShow.posterSrc}
                                                alt={`${activeShow.title} Poster`}
                                                className="rb-poster-img"
                                                width="400"
                                                height="600"
                                                loading="lazy"
                                            />
                                            <div className="rb-poster-overlay">
                                                <span className="rb-poster-status">{activeShow.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Center Column: Mobile App Player */}
                                <div className="rb-player-col">
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

                                            {/* Buffering Spinner */}
                                            {isBuffering && (
                                                <div className="rb-loading-spinner-container">
                                                    <div className="rb-loading-spinner"></div>
                                                </div>
                                            )}

                                            {/* Center Play Button */}
                                            {!isPlaying && !isBuffering && (
                                                <div className="rb-center-play">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            )}

                                            {/* Overlay Controls */}
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

                                {/* Right Column: Production Scope (for BrahmYodhha & Sarbadal) or Standard Info & Playlist (for poster shows) */}
                                {!activeShow.posterSrc ? (
                                    <div className="rb-production-col">
                                        <div className="rb-side-card">
                                            <div className="rb-card-header">
                                                <span className="rb-card-accent-line green-accent"></span>
                                                <span className="rb-card-category">PRODUCTION SCOPE</span>
                                            </div>
                                            <div className="rb-badge-row" style={{ marginTop: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                                                {activeShow.logoSrc ? (
                                                    <img
                                                        src={activeShow.logoSrc}
                                                        alt={`${activeShow.studioLabel || activeShow.title} Logo`}
                                                        style={{
                                                            height: activeShow.logoSrc.includes('kukutv-icon') ? '72px' : '42px',
                                                            width: 'auto',
                                                            objectFit: 'contain',
                                                            filter: 'brightness(1.1) drop-shadow(0 2px 8px rgba(0,0,0,0.6))'
                                                        }}
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <span className="rb-show-badge produced" style={{ display: 'inline-block' }}>{activeShow.studioLabel || 'PRODUCED'}</span>
                                                )}
                                            </div>
                                            <p className="rb-desc">
                                                {activeShow.description.split('\n\n')[1] || activeShow.description}
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="rb-info-col">
                                        <div className="rb-series-details">
                                            <div className="rb-tags-row">
                                                {activeShow.tags.map((tag, i) => (
                                                    <span key={i} className={`rb-tag ${i === 0 ? 'accent-tag' : ''}`}>{tag}</span>
                                                ))}
                                            </div>

                                            <p className="rb-desc" style={{ whiteSpace: 'pre-line' }}>
                                                {activeShow.description}
                                            </p>
                                        </div>

                                        {activeShow.episodes.length > 1 && (
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
                                                    <span className="rb-playlist-count">{activeShow.episodes.length} Episodes</span>
                                                </div>

                                                <div className="rb-episodes-feed">
                                                    {activeShow.episodes.map((ep) => {
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
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* ── Coming Soon Placeholder ── */
                            <div className="rb-coming-soon">
                                <div className="rb-coming-soon-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                                    </svg>
                                </div>
                                <h3 className="rb-coming-soon-title">{activeShow.title}</h3>
                                <p className="rb-coming-soon-desc">{activeShow.description}</p>
                                <div className="rb-coming-soon-badge">
                                    <span className="rb-coming-soon-dot"></span>
                                    Episodes dropping soon
                                </div>
                            </div>
                        )}
                    </div>
                ) : null}
            </div>
        </section>
    );
}
