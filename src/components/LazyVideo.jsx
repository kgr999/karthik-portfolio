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
    ...props
}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const videoRef = useRef(null);

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
                            // Autoplay could be blocked by browser policies
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
        <video
            ref={videoRef}
            src={isIntersecting ? src : undefined}
            poster={poster}
            className={className}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            style={style}
            preload="none"
            controlsList="nodownload"
            disablePictureInPicture
            disableRemotePlayback
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            {...props}
        />
    );
}
