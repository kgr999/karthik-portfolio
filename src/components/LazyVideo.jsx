import React, { useState, useEffect, useRef } from 'react';

export default function LazyVideo({
    src,
    poster,
    className,
    autoPlay = true,
    loop = true,
    muted = true,
    playsInline = true,
    style = {},
    forcePause = false,
    ...props
}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const videoRef = useRef(null);

    // Dynamically pause/play when forcePause updates
    useEffect(() => {
        const videoEl = videoRef.current;
        if (!videoEl) return;

        if (forcePause) {
            videoEl.pause();
        } else if (isIntersecting && autoPlay && videoEl.paused) {
            videoEl.play().catch(() => {});
        }
    }, [forcePause, isIntersecting, autoPlay]);

    // Sync the muted DOM property directly to avoid React's muted attribute bug
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = muted;
        }
    }, [muted]);

    useEffect(() => {
        const videoEl = videoRef.current;
        if (!videoEl) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    // Once visible, load the video source
                    observer.unobserve(videoEl);
                }
            },
            {
                rootMargin: '100px', // Start loading 100px before it enters viewport
                threshold: 0.01,
            }
        );

        observer.observe(videoEl);

        return () => {
            if (videoEl) {
                observer.unobserve(videoEl);
            }
        };
    }, []);

    // Also control playing and pausing when visible/invisible to save CPU
    useEffect(() => {
        const videoEl = videoRef.current;
        if (!videoEl || !isIntersecting) return;

        const playObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (autoPlay && videoEl.paused) {
                        videoEl.play().catch((err) => {
                            console.log('Autoplay check:', err);
                        });
                    }
                } else {
                    if (!videoEl.paused) {
                        videoEl.pause();
                    }
                }
            },
            {
                threshold: 0.1,
            }
        );

        playObserver.observe(videoEl);

        return () => {
            if (videoEl) {
                playObserver.unobserve(videoEl);
            }
        };
    }, [isIntersecting, autoPlay]);

    return (
        <div 
            className={`lazy-video-container ${className || ''}`}
            style={{ 
                position: 'relative', 
                overflow: 'hidden',
                background: '#000',
                ...style 
            }}
        >
            {isIntersecting && !isLoaded && (
                <div className="lazy-video-loader">
                    <span className="lazy-video-spinner"></span>
                </div>
            )}
            <video
                ref={videoRef}
                src={isIntersecting ? src : undefined}
                poster={poster}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: style.objectFit || 'cover',
                    opacity: isLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    display: 'block'
                }}
                loop={loop}
                muted={muted}
                playsInline={playsInline}
                preload="metadata"
                controlsList="nodownload"
                disablePictureInPicture
                disableRemotePlayback
                onLoadedData={() => setIsLoaded(true)}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                {...props}
            />
        </div>
    );
}
